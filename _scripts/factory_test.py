import os
import subprocess
import argparse

try:
    import soundfile as sf
except ImportError:
    print("Warning: 'soundfile' library not found. Please run 'pip install soundfile'.")
    sf = None

try:
    from kokoro import KPipeline
except ImportError:
    print("Warning: 'kokoro' library not found. Please check installation.")
    KPipeline = None

def log_vram():
    """Logs current NVIDIA GPU VRAM usage if nvidia-smi is available."""
    try:
        res = subprocess.check_output(["nvidia-smi", "--query-gpu=memory.used", "--format=csv,noheader,nounits"], encoding="utf-8")
        print(f"Current VRAM Usage: {res.strip()} MiB")
    except FileNotFoundError:
        # Silently ignore if nvidia-smi is not found, as it's non-critical.
        pass
    except Exception as e:
        print(f"Failed to log VRAM: {e}")

def generate_teaser(model: str, prompt: str) -> str:
    """Generates a teaser using a local Ollama model."""
    print(f"Step 1: {model} writing teaser...")
    try:
        teaser = subprocess.check_output(["ollama", "run", model, prompt], encoding="utf-8", stderr=subprocess.PIPE).strip()
        print(f"Teaser: {teaser}")
        return teaser
    except FileNotFoundError:
        print("Error: 'ollama' command not found. Is Ollama installed and in your PATH?")
    except subprocess.CalledProcessError as e:
        print(f"Ollama call failed with an error (stderr: {e.stderr.strip()}).")
    except Exception as e:
        print(f"An unexpected error occurred during the Ollama call: {e}")

    fallback_teaser = "Evolution Stables: Where champions are born and legends race."
    print(f"Using fallback teaser: \"{fallback_teaser}\"")
    return fallback_teaser

def generate_audio(teaser: str, output_path: str):
    """Generates audio from text using Kokoro and saves it."""
    if not KPipeline or not sf:
        print("Skipping Step 2: Missing required libraries (Kokoro or soundfile).")
        return

    print("Step 2: Kokoro generating audio...")
    try:
        pipeline = KPipeline(lang_code='a')
        generator = pipeline(teaser, voice='af_heart', speed=1)
        # The generator may yield multiple times; we only need the final audio.
        final_audio = None
        for _, _, audio_chunk in generator:
            final_audio = audio_chunk

        if final_audio is not None:
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            sf.write(output_path, final_audio, 24000)
            print(f"Audio saved to {output_path} (Size: {os.path.getsize(output_path)} bytes)")
    except Exception as e:
        print(f"Kokoro audio generation failed: {e}")

def main(args):
    print("--- Factory Integration Test ---")
    log_vram()

    teaser_prompt = "Write a 1-sentence racing teaser for Evolution Stables. Short and punchy."
    teaser = generate_teaser(args.model, teaser_prompt)
    generate_audio(teaser, args.output)

    log_vram()
    print("--- Test Complete ---")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Factory integration test for AI content generation.")
    parser.add_argument("--model", type=str, default="gemma3:12b", help="Ollama model to use for teaser generation.")
    parser.add_argument("--output", type=str, default="/home/evo/_output/factory_test.wav", help="Path to save the output audio file.")
    args = parser.parse_args()
    main(args)
