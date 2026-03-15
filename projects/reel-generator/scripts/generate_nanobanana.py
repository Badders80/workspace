#!/usr/bin/env python3
"""
Evolution Reel Generator - Gemini image generator

Uses the current Gemini image models through the Gemini API and saves
standardized local assets under the project's assets/ directory.

Usage:
    python3 scripts/generate_nanobanana.py \
        --prompt "Thoroughbred horse mid-gallop" \
        --type test \
        --label gemini-baseline

    python3 scripts/generate_nanobanana.py \
        --batch prompts/gemini_baseline_test_batch.json
"""

from __future__ import annotations

import argparse
import base64
import io
import json
import math
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import requests
from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parent.parent
ASSETS_DIR = PROJECT_ROOT / "assets"
ENV_CANDIDATES = [
    PROJECT_ROOT / ".env",
    Path("/home/evo/.env"),
]
API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
VERTEX_API_ENDPOINT = (
    "https://{host}/v1/projects/{project}/locations/{location}/"
    "publishers/google/models/{model}:generateContent"
)
OAUTH_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
ADC_CREDENTIAL_PATH = Path("/home/evo/.config/gcloud/application_default_credentials.json")
GCLOUD_DEFAULT_CONFIG = Path("/home/evo/.config/gcloud/configurations/config_default")
DEFAULT_GCP_PROJECT = "evolution-engine"
DEFAULT_GCP_LOCATION = "global"
TEXT_DIAGNOSTIC_MODEL = "gemini-2.5-flash"

DEFAULT_MODEL_PREFERENCE = [
    "gemini-3-pro-image-preview",
    "gemini-3.1-flash-image-preview",
    "gemini-2.5-flash-image",
]

SUPPORTED_IMAGE_OPTIONS = {
    "gemini-3-pro-image-preview": {
        "1:1": {"1K": (1024, 1024), "2K": (2048, 2048), "4K": (4096, 4096)},
        "3:4": {"1K": (896, 1152), "2K": (1792, 2304), "4K": (3584, 4608)},
        "4:3": {"1K": (1152, 896), "2K": (2304, 1792), "4K": (4608, 3584)},
        "9:16": {"1K": (768, 1376), "2K": (1536, 2752), "4K": (3072, 5504)},
        "16:9": {"1K": (1376, 768), "2K": (2752, 1536), "4K": (5504, 3072)},
        "3:2": {"1K": (1216, 832), "2K": (2432, 1664), "4K": (4864, 3328)},
        "2:3": {"1K": (832, 1216), "2K": (1664, 2432), "4K": (3328, 4864)},
    },
    "gemini-3.1-flash-image-preview": {
        "1:1": {"0.5K": (512, 512), "1K": (1024, 1024), "2K": (2048, 2048), "4K": (4096, 4096)},
        "3:4": {"1K": (896, 1152), "2K": (1792, 2304), "4K": (3584, 4608)},
        "4:3": {"1K": (1152, 896), "2K": (2304, 1792), "4K": (4608, 3584)},
        "9:16": {"1K": (768, 1376), "2K": (1536, 2752), "4K": (3072, 5504)},
        "16:9": {"1K": (1376, 768), "2K": (2752, 1536), "4K": (5504, 3072)},
        "3:2": {"1K": (1216, 832), "2K": (2432, 1664), "4K": (4864, 3328)},
        "2:3": {"1K": (832, 1216), "2K": (1664, 2432), "4K": (3328, 4864)},
        "21:9": {"1K": (1584, 672), "2K": (3168, 1344), "4K": (6336, 2688)},
        "9:21": {"1K": (672, 1584), "2K": (1344, 3168), "4K": (2688, 6336)},
        "1:4": {"1K": (512, 2048), "2K": (1024, 4096)},
        "4:1": {"1K": (2048, 512), "2K": (4096, 1024)},
        "1:8": {"1K": (256, 2048), "2K": (512, 4096)},
        "8:1": {"1K": (2048, 256), "2K": (4096, 512)},
    },
    "gemini-2.5-flash-image": {
        "1:1": {"1K": (1024, 1024)},
        "3:4": {"1K": (896, 1152)},
        "4:3": {"1K": (1152, 896)},
        "9:16": {"1K": (768, 1376)},
        "16:9": {"1K": (1376, 768)},
        "3:2": {"1K": (1216, 832)},
        "2:3": {"1K": (832, 1216)},
    },
}

RESULT_FILE_PREFIX = "gemini_batch_results"


def load_env_file() -> None:
    if os.getenv("GEMINI_API_KEY"):
        return

    for candidate in ENV_CANDIDATES:
        if not candidate.exists():
            continue

        for raw_line in candidate.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#"):
                continue
            if line.startswith("export "):
                line = line[len("export "):]
            if "=" not in line:
                continue

            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip("\"'")
            if key and value and key not in os.environ:
                os.environ[key] = value

        if os.getenv("GEMINI_API_KEY"):
            return


def read_gcloud_default_value(section_name: str, key_name: str) -> Optional[str]:
    if not GCLOUD_DEFAULT_CONFIG.exists():
        return None

    current_section: Optional[str] = None
    for raw_line in GCLOUD_DEFAULT_CONFIG.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or line.startswith(";"):
            continue
        if line.startswith("[") and line.endswith("]"):
            current_section = line[1:-1].strip()
            continue
        if "=" not in line or current_section != section_name:
            continue
        key, value = line.split("=", 1)
        if key.strip() == key_name:
            return value.strip()

    return None


def resolve_gcp_project(project_override: Optional[str] = None) -> str:
    return (
        project_override
        or os.getenv("GOOGLE_CLOUD_PROJECT")
        or os.getenv("VERTEXAI_PROJECT")
        or read_gcloud_default_value("core", "project")
        or DEFAULT_GCP_PROJECT
    )


def resolve_gcp_location(location_override: Optional[str] = None) -> str:
    return (
        location_override
        or os.getenv("GOOGLE_CLOUD_LOCATION")
        or os.getenv("VERTEXAI_LOCATION")
        or DEFAULT_GCP_LOCATION
    )


def should_use_vertex_ai(auth_mode: str) -> bool:
    if auth_mode == "vertex":
        return True
    if auth_mode == "developer":
        return False

    explicit = os.getenv("GOOGLE_GENAI_USE_VERTEXAI")
    if explicit:
        return explicit.lower() in {"1", "true", "yes", "on"}

    return bool(
        os.getenv("GOOGLE_CLOUD_PROJECT")
        or os.getenv("VERTEXAI_PROJECT")
        or ADC_CREDENTIAL_PATH.exists()
        or read_gcloud_default_value("core", "project")
    )


def build_image_payload(prompt: str, aspect_ratio: str, image_size: Optional[str]) -> Dict:
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": prompt,
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["Image"],
            "imageConfig": {
                "aspectRatio": aspect_ratio,
            },
        },
    }

    if image_size:
        payload["generationConfig"]["imageConfig"]["imageSize"] = image_size

    return payload


def developer_request(api_key: str, model: str, payload: Dict) -> Dict:
    response = requests.post(
        API_ENDPOINT.format(model=model),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
        json=payload,
        timeout=180,
    )

    try:
        response_json = response.json()
    except ValueError:
        response_json = {"raw_text": response.text}

    if not response.ok:
        message = response_json.get("error", {}).get("message") if isinstance(response_json, dict) else None
        if response.status_code == 429 and message and "limit: 0" in message:
            message = (
                f"{message} "
                "This API key does not currently have usable Gemini image-generation quota. "
                "Use a billed key/project with Gemini image access or switch to another provider."
            )
        raise requests.HTTPError(
            f"HTTP {response.status_code}: {message or response.text}",
            response=response,
        )

    return response_json


def find_gcloud_binary() -> Optional[str]:
    candidates = [
        shutil.which("gcloud"),
        "/home/evo/google-cloud-sdk/bin/gcloud",
        "/home/evo/.local/google-cloud-sdk/bin/gcloud",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    return None


def access_token_from_gcloud() -> Tuple[str, Optional[str], str]:
    gcloud_binary = find_gcloud_binary()
    if not gcloud_binary:
        raise RuntimeError("gcloud CLI not found")

    completed = subprocess.run(
        [gcloud_binary, "auth", "application-default", "print-access-token"],
        check=False,
        capture_output=True,
        text=True,
        timeout=60,
        env={**os.environ, "PATH": os.getenv("PATH", "/usr/bin:/bin")},
    )
    if completed.returncode != 0:
        raise RuntimeError(
            "gcloud ADC token refresh failed. "
            f"stderr: {completed.stderr.strip() or completed.stdout.strip() or 'unknown error'}"
        )

    return completed.stdout.strip(), None, "gcloud-adc"


def access_token_from_adc() -> Tuple[str, Optional[str], str]:
    if not ADC_CREDENTIAL_PATH.exists():
        raise RuntimeError(
            "ADC credential file not found. Run `gcloud auth application-default login` first."
        )

    credentials = json.loads(ADC_CREDENTIAL_PATH.read_text(encoding="utf-8"))
    credential_type = credentials.get("type")
    if credential_type != "authorized_user":
        raise RuntimeError(
            f"Unsupported ADC credential type for this lightweight client: {credential_type or 'unknown'}"
        )

    response = requests.post(
        OAUTH_TOKEN_ENDPOINT,
        data={
            "client_id": credentials["client_id"],
            "client_secret": credentials["client_secret"],
            "refresh_token": credentials["refresh_token"],
            "grant_type": "refresh_token",
        },
        timeout=60,
    )

    try:
        response_json = response.json()
    except ValueError:
        response_json = {"raw_text": response.text}

    if not response.ok:
        error_code = response_json.get("error")
        error_description = response_json.get("error_description", "")
        error_subtype = response_json.get("error_subtype", "")
        if error_code == "invalid_grant" and error_subtype == "invalid_rapt":
            raise RuntimeError(
                "ADC reauthentication required for Vertex AI. "
                "The local Google Cloud user credential is stale and now fails with invalid_rapt. "
                "Run `gcloud auth application-default login --project evolution-engine` "
                "or refresh ADC with a valid service account before retrying."
            )
        raise RuntimeError(
            "ADC refresh failed. "
            f"{error_code or 'unknown_error'}: {error_description or response.text}"
        )

    return (
        response_json["access_token"],
        credentials.get("quota_project_id"),
        "adc-authorized-user",
    )


def vertex_host_for_location(location: str) -> str:
    if location == "global":
        return "aiplatform.googleapis.com"
    return f"{location}-aiplatform.googleapis.com"


def get_vertex_access_token() -> Tuple[str, Optional[str], str]:
    env_token = os.getenv("GOOGLE_OAUTH_ACCESS_TOKEN")
    if env_token:
        return env_token, None, "env-access-token"

    gcloud_error = None
    try:
        return access_token_from_gcloud()
    except Exception as exc:
        gcloud_error = str(exc)

    try:
        return access_token_from_adc()
    except Exception as exc:
        adc_error = str(exc)
        if gcloud_error:
            raise RuntimeError(f"{adc_error} | gcloud fallback detail: {gcloud_error}") from exc
        raise


def vertex_request(
    access_token: str,
    project: str,
    location: str,
    model: str,
    payload: Dict,
    quota_project: Optional[str],
) -> Dict:
    host = vertex_host_for_location(location)
    response = requests.post(
        VERTEX_API_ENDPOINT.format(
            host=host,
            project=project,
            location=location,
            model=model,
        ),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
            "x-goog-user-project": quota_project or project,
        },
        json=payload,
        timeout=180,
    )

    try:
        response_json = response.json()
    except ValueError:
        response_json = {"raw_text": response.text}

    if not response.ok:
        message = response_json.get("error", {}).get("message") if isinstance(response_json, dict) else None
        raise requests.HTTPError(
            f"HTTP {response.status_code}: {message or response.text}",
            response=response,
        )

    return response_json


def request_text_with_developer_api(api_key: str, model: str, prompt: str) -> Dict:
    return developer_request(
        api_key=api_key,
        model=model,
        payload={"contents": [{"role": "user", "parts": [{"text": prompt}]}]},
    )


def request_text_with_vertex(
    access_token: str,
    project: str,
    location: str,
    quota_project: Optional[str],
    model: str,
    prompt: str,
) -> Dict:
    return vertex_request(
        access_token=access_token,
        project=project,
        location=location,
        model=model,
        quota_project=quota_project,
        payload={"contents": [{"role": "user", "parts": [{"text": prompt}]}]},
    )


def request_image_with_developer_api(
    api_key: str,
    model: str,
    prompt: str,
    aspect_ratio: str,
    image_size: Optional[str],
) -> Dict:
    return developer_request(
        api_key=api_key,
        model=model,
        payload=build_image_payload(prompt=prompt, aspect_ratio=aspect_ratio, image_size=image_size),
    )


def request_image_with_vertex(
    access_token: str,
    project: str,
    location: str,
    quota_project: Optional[str],
    model: str,
    prompt: str,
    aspect_ratio: str,
    image_size: Optional[str],
) -> Dict:
    return vertex_request(
        access_token=access_token,
        project=project,
        location=location,
        model=model,
        quota_project=quota_project,
        payload=build_image_payload(prompt=prompt, aspect_ratio=aspect_ratio, image_size=image_size),
    )


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "default"


def model_alias(model: str) -> str:
    return slugify(model.replace("-preview", ""))


def build_prompt(prompt: str, negative_prompt: str = "") -> str:
    if not negative_prompt:
        return prompt.strip()

    return (
        f"{prompt.strip()}\n\n"
        "Avoid the following in the image: "
        f"{negative_prompt.strip()}."
    )


def closest_image_profile(model: str, width: int, height: int) -> Tuple[str, Optional[str], Tuple[int, int]]:
    target_ratio = width / height
    options = SUPPORTED_IMAGE_OPTIONS[model]
    best_choice = None

    for aspect_ratio, size_map in options.items():
        for image_size, native_dims in size_map.items():
            native_width, native_height = native_dims
            ratio_value = native_width / native_height
            ratio_penalty = abs(math.log(target_ratio / ratio_value))

            undersize_penalty = 0.0
            if native_width < width:
                undersize_penalty += (width - native_width) / width
            if native_height < height:
                undersize_penalty += (height - native_height) / height

            oversize_penalty = (native_width * native_height) / (width * height)
            score = (ratio_penalty * 12) + (undersize_penalty * 100) + oversize_penalty

            if best_choice is None or score < best_choice["score"]:
                best_choice = {
                    "aspect_ratio": aspect_ratio,
                    "image_size": image_size,
                    "native_dims": native_dims,
                    "score": score,
                }

    if best_choice is None:
        raise RuntimeError(f"Unable to resolve image profile for model {model}")

    image_size = best_choice["image_size"]
    if model == "gemini-2.5-flash-image":
        image_size = None

    return best_choice["aspect_ratio"], image_size, best_choice["native_dims"]


def decode_image_bytes(response_json: Dict) -> Tuple[bytes, str, List[str]]:
    text_parts: List[str] = []

    for candidate in response_json.get("candidates", []):
        content = candidate.get("content", {})
        for part in content.get("parts", []):
            inline_data = part.get("inlineData") or part.get("inline_data")
            if inline_data:
                data = inline_data.get("data") or inline_data.get("bytesBase64Encoded")
                if not data:
                    continue
                mime_type = inline_data.get("mimeType") or inline_data.get("mime_type") or "image/png"
                return base64.b64decode(data), mime_type, text_parts

            if "text" in part:
                text_parts.append(part["text"])

    raise RuntimeError(
        "Gemini response did not include an image candidate. "
        f"Response keys: {list(response_json.keys())}"
    )


def normalize_image(img_bytes: bytes, target_width: int, target_height: int) -> bytes:
    image = Image.open(io.BytesIO(img_bytes))
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")

    if image.size != (target_width, target_height):
        image = ImageOps.fit(
            image,
            (target_width, target_height),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )

    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def is_quota_zero_error(error_message: str) -> bool:
    normalized = error_message.lower()
    return "http 429" in normalized and "limit: 0" in normalized


def is_invalid_rapt_error(error_message: str) -> bool:
    normalized = error_message.lower()
    return "invalid_rapt" in normalized or "reauthentication required" in normalized


def is_fatal_google_error(error_message: str) -> bool:
    return is_quota_zero_error(error_message) or is_invalid_rapt_error(error_message)


def ensure_label_root(label: str) -> Path:
    label_root = ASSETS_DIR / slugify(label)
    label_root.mkdir(parents=True, exist_ok=True)
    return label_root


def save_image(
    label: str,
    layer_type: str,
    model: str,
    requested_width: int,
    requested_height: int,
    raw_image_bytes: bytes,
) -> str:
    label_root = ensure_label_root(label)
    output_dir = label_root / layer_type
    output_dir.mkdir(parents=True, exist_ok=True)

    normalized_bytes = normalize_image(raw_image_bytes, requested_width, requested_height)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    filename = f"{model_alias(model)}_{layer_type}_{timestamp}.png"
    save_path = output_dir / filename
    save_path.write_bytes(normalized_bytes)
    return str(save_path)


def generate_image(
    prompt: str,
    negative_prompt: str = "",
    width: int = 1024,
    height: int = 1024,
    layer_type: str = "test",
    label: str = "adhoc",
    model_choice: str = "auto",
    auth_mode: str = "auto",
    project: Optional[str] = None,
    location: Optional[str] = None,
) -> Dict:
    load_env_file()
    requested_prompt = build_prompt(prompt, negative_prompt)
    models = DEFAULT_MODEL_PREFERENCE if model_choice == "auto" else [model_choice]
    errors = []
    provider = "vertex-ai" if should_use_vertex_ai(auth_mode) else "developer-api"

    api_key = os.getenv("GEMINI_API_KEY")
    cloud_project = resolve_gcp_project(project)
    cloud_location = resolve_gcp_location(location)
    access_token = None
    quota_project = None
    token_source = None

    if provider == "vertex-ai":
        try:
            access_token, quota_project, token_source = get_vertex_access_token()
        except Exception as exc:
            return {
                "success": False,
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "type": layer_type,
                "label": slugify(label),
                "provider": provider,
                "project": cloud_project,
                "location": cloud_location,
                "error": str(exc),
                "attempts": [{"provider": provider, "error": str(exc)}],
                "fatal_provider_error": True,
            }
    else:
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY not found in environment or supported .env files")

    for model in models:
        if model not in SUPPORTED_IMAGE_OPTIONS:
            return {
                "success": False,
                "error": f"Unsupported model: {model}",
            }

        aspect_ratio, image_size, native_dims = closest_image_profile(model, width, height)

        try:
            print(f"\nGenerating {layer_type} image with {model} via {provider}...")
            print(f"  Requested: {width}x{height} | Native profile: {aspect_ratio} @ {image_size or 'default'}")
            print(f"  Label: {slugify(label)}")
            print(f"  Prompt: {prompt[:120]}...")
            if provider == "vertex-ai":
                print(f"  Vertex project: {cloud_project} | location: {cloud_location} | token source: {token_source}")

            if provider == "vertex-ai":
                response_json = request_image_with_vertex(
                    access_token=access_token,
                    project=cloud_project,
                    location=cloud_location,
                    quota_project=quota_project,
                    model=model,
                    prompt=requested_prompt,
                    aspect_ratio=aspect_ratio,
                    image_size=image_size,
                )
            else:
                response_json = request_image_with_developer_api(
                    api_key=api_key,
                    model=model,
                    prompt=requested_prompt,
                    aspect_ratio=aspect_ratio,
                    image_size=image_size,
                )

            raw_image_bytes, mime_type, text_parts = decode_image_bytes(response_json)
            save_path = save_image(
                label=label,
                layer_type=layer_type,
                model=model,
                requested_width=width,
                requested_height=height,
                raw_image_bytes=raw_image_bytes,
            )

            print(f"  Saved: {save_path}")

            return {
                "success": True,
                "model": model,
                "provider": provider,
                "label": slugify(label),
                "type": layer_type,
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "path": save_path,
                "mime_type": mime_type,
                "requested_width": width,
                "requested_height": height,
                "native_width": native_dims[0],
                "native_height": native_dims[1],
                "aspect_ratio": aspect_ratio,
                "image_size": image_size,
                "project": cloud_project if provider == "vertex-ai" else None,
                "location": cloud_location if provider == "vertex-ai" else None,
                "token_source": token_source if provider == "vertex-ai" else None,
                "notes": text_parts,
                "fatal_provider_error": False,
            }
        except Exception as exc:
            errors.append({
                "provider": provider,
                "model": model,
                "error": str(exc),
            })
            print(f"  Failed with {model}: {exc}")

    fatal_provider_error = bool(errors) and all(
        is_fatal_google_error(attempt["error"]) for attempt in errors
    )

    return {
        "success": False,
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "type": layer_type,
        "label": slugify(label),
        "provider": provider,
        "project": cloud_project if provider == "vertex-ai" else None,
        "location": cloud_location if provider == "vertex-ai" else None,
        "error": "All configured Gemini image models failed",
        "attempts": errors,
        "fatal_provider_error": fatal_provider_error,
    }


def generate_batch(
    batch_file: Path,
    label_override: Optional[str],
    model_choice: str,
    delay_seconds: float,
    auth_mode: str,
    project: Optional[str],
    location: Optional[str],
) -> Tuple[List[Dict], int]:
    print(f"\nProcessing batch: {batch_file}")

    with batch_file.open("r", encoding="utf-8") as handle:
        batch = json.load(handle)

    batch_label = label_override or batch.get("label") or batch_file.stem or "adhoc"
    images = batch.get("images", [])
    results: List[Dict] = []

    for index, spec in enumerate(images, start=1):
        print(f"\n[{index}/{len(images)}]", end=" ")
        result = generate_image(
            prompt=spec["prompt"],
            negative_prompt=spec.get("negative_prompt", ""),
            width=spec.get("width", 1024),
            height=spec.get("height", 1024),
            layer_type=spec.get("type", "test"),
            label=spec.get("label", batch_label),
            model_choice=spec.get("model", model_choice),
            auth_mode=spec.get("auth_mode", auth_mode),
            project=project,
            location=location,
        )
        results.append(result)

        if result.get("fatal_provider_error"):
            print(
                "\nStopping batch early: the selected Google provider hit a fatal "
                "auth or quota error for the configured models."
            )
            break

        if index < len(images) and delay_seconds > 0:
            time.sleep(delay_seconds)

    label_root = ensure_label_root(batch_label)
    results_file = label_root / f"{RESULT_FILE_PREFIX}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    results_file.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"\nResults saved: {results_file}")
    return results, len(images)


def summarize_candidate_text(response_json: Dict) -> str:
    text_parts: List[str] = []
    for candidate in response_json.get("candidates", []):
        content = candidate.get("content", {})
        for part in content.get("parts", []):
            if "text" in part:
                text_parts.append(part["text"])
    return " ".join(text_parts).strip()


def diagnose_google(project_override: Optional[str], location_override: Optional[str]) -> Dict:
    load_env_file()

    report: Dict[str, Dict] = {
        "developer_api": {
            "gemini_api_key_present": bool(os.getenv("GEMINI_API_KEY")),
        },
        "vertex_ai": {
            "project": resolve_gcp_project(project_override),
            "location": resolve_gcp_location(location_override),
            "adc_path_exists": ADC_CREDENTIAL_PATH.exists(),
            "gcloud_available": bool(find_gcloud_binary()),
        },
    }

    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        try:
            text_response = request_text_with_developer_api(
                api_key=api_key,
                model=TEXT_DIAGNOSTIC_MODEL,
                prompt="Reply with exactly OK",
            )
            report["developer_api"]["text_generation"] = {
                "success": True,
                "model": TEXT_DIAGNOSTIC_MODEL,
                "response": summarize_candidate_text(text_response),
            }
        except Exception as exc:
            report["developer_api"]["text_generation"] = {
                "success": False,
                "model": TEXT_DIAGNOSTIC_MODEL,
                "error": str(exc),
            }

        try:
            image_response = request_image_with_developer_api(
                api_key=api_key,
                model="gemini-2.5-flash-image",
                prompt="A red square on a white background",
                aspect_ratio="1:1",
                image_size=None,
            )
            decode_image_bytes(image_response)
            report["developer_api"]["image_generation"] = {
                "success": True,
                "model": "gemini-2.5-flash-image",
            }
        except Exception as exc:
            report["developer_api"]["image_generation"] = {
                "success": False,
                "model": "gemini-2.5-flash-image",
                "error": str(exc),
                "quota_zero": is_quota_zero_error(str(exc)),
            }

    try:
        access_token, quota_project, token_source = get_vertex_access_token()
        report["vertex_ai"]["auth"] = {
            "success": True,
            "token_source": token_source,
            "quota_project": quota_project,
        }
        try:
            text_response = request_text_with_vertex(
                access_token=access_token,
                project=report["vertex_ai"]["project"],
                location=report["vertex_ai"]["location"],
                quota_project=quota_project,
                model=TEXT_DIAGNOSTIC_MODEL,
                prompt="Reply with exactly OK",
            )
            report["vertex_ai"]["text_generation"] = {
                "success": True,
                "model": TEXT_DIAGNOSTIC_MODEL,
                "response": summarize_candidate_text(text_response),
            }
        except Exception as exc:
            report["vertex_ai"]["text_generation"] = {
                "success": False,
                "model": TEXT_DIAGNOSTIC_MODEL,
                "error": str(exc),
            }
        try:
            image_response = request_image_with_vertex(
                access_token=access_token,
                project=report["vertex_ai"]["project"],
                location=report["vertex_ai"]["location"],
                quota_project=quota_project,
                model="gemini-2.5-flash-image",
                prompt="A red square on a white background",
                aspect_ratio="1:1",
                image_size=None,
            )
            decode_image_bytes(image_response)
            report["vertex_ai"]["image_generation"] = {
                "success": True,
                "model": "gemini-2.5-flash-image",
            }
        except Exception as exc:
            report["vertex_ai"]["image_generation"] = {
                "success": False,
                "model": "gemini-2.5-flash-image",
                "error": str(exc),
                "quota_zero": is_quota_zero_error(str(exc)),
            }
    except Exception as exc:
        report["vertex_ai"]["auth"] = {
            "success": False,
            "error": str(exc),
            "invalid_rapt": is_invalid_rapt_error(str(exc)),
        }

    return report


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate b-roll images with Gemini image models")
    parser.add_argument("--prompt", type=str, help="Single image prompt")
    parser.add_argument("--negative", type=str, default="", help="Negative prompt guidance")
    parser.add_argument(
        "--type",
        type=str,
        default="test",
        choices=["foreground", "midground", "background", "micro-motion", "test"],
        help="Asset layer type",
    )
    parser.add_argument("--width", type=int, default=1024, help="Target image width")
    parser.add_argument("--height", type=int, default=1024, help="Target image height")
    parser.add_argument("--label", type=str, default="adhoc", help="Output label under assets/")
    parser.add_argument(
        "--model",
        type=str,
        default="auto",
        choices=["auto", *SUPPORTED_IMAGE_OPTIONS.keys()],
        help="Gemini image model to use",
    )
    parser.add_argument(
        "--auth-mode",
        type=str,
        default="auto",
        choices=["auto", "vertex", "developer"],
        help="Google auth path to use. auto prefers Vertex/ADC when configured.",
    )
    parser.add_argument("--project", type=str, help="Override Google Cloud project for Vertex AI")
    parser.add_argument("--location", type=str, help="Override Vertex AI location (default: global)")
    parser.add_argument(
        "--diagnose-google",
        action="store_true",
        help="Run Google auth and quota diagnostics instead of generating assets",
    )
    parser.add_argument("--batch", type=Path, help="Batch JSON file")
    parser.add_argument("--delay", type=float, default=2.0, help="Delay between batch requests in seconds")

    args = parser.parse_args()

    if args.diagnose_google:
        report = diagnose_google(project_override=args.project, location_override=args.location)
        print(json.dumps(report, indent=2))
        developer_image_ok = report.get("developer_api", {}).get("image_generation", {}).get("success", False)
        vertex_image_ok = report.get("vertex_ai", {}).get("image_generation", {}).get("success", False)
        if not developer_image_ok and not vertex_image_ok:
            sys.exit(1)
        return

    if args.batch:
        results, planned_total = generate_batch(
            batch_file=args.batch,
            label_override=args.label if args.label != "adhoc" else None,
            model_choice=args.model,
            delay_seconds=args.delay,
            auth_mode=args.auth_mode,
            project=args.project,
            location=args.location,
        )
        success_count = sum(1 for result in results if result["success"])
        processed_total = len(results)
        print(f"\n{'=' * 60}")
        print(f"Processed: {processed_total}/{planned_total}")
        print(f"Successful: {success_count}/{processed_total}")
        print(f"Failed: {processed_total - success_count}")
        if success_count != processed_total or processed_total != planned_total:
            sys.exit(1)
        return

    if args.prompt:
        result = generate_image(
            prompt=args.prompt,
            negative_prompt=args.negative,
            width=args.width,
            height=args.height,
            layer_type=args.type,
            label=args.label,
            model_choice=args.model,
            auth_mode=args.auth_mode,
            project=args.project,
            location=args.location,
        )

        if result["success"]:
            print("\nImage generated successfully")
            print(f"Path: {result['path']}")
            print(f"Model: {result['model']}")
            print(f"Provider: {result['provider']}")
            return

        print(f"\nGeneration failed: {result.get('error', 'Unknown error')}")
        sys.exit(1)

    parser.print_help()
    sys.exit(1)


if __name__ == "__main__":
    main()
