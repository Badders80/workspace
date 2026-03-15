#!/usr/bin/env python3
"""
Evolution Reel Generator — B-Roll Image Generator
Uses fal.ai API to generate horse racing b-roll images

Usage:
    python generate_broll.py --prompt "Thoroughbred horse mid-gallop" --type foreground
    python generate_broll.py --batch prompts/test_batch.json
"""

import os
import sys
import json
import requests
import time
from pathlib import Path
from datetime import datetime
import argparse

# Load API key from environment
FAL_API_KEY = os.getenv('FAL_API_KEY')
if not FAL_API_KEY:
    print("❌ FAL_API_KEY not found in environment")
    sys.exit(1)

# fal.ai endpoint for FLUX.1 Pro (highest quality)
FAL_ENDPOINT = "https://fal.run/fal-ai/flux-pro/v1.1"

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
ASSETS_DIR = PROJECT_ROOT / "assets"


def generate_image(prompt: str, negative_prompt: str = "", 
                   width: int = 1024, height: int = 1024,
                   layer_type: str = "test") -> dict:
    """
    Generate a single image using fal.ai FLUX.1 Pro
    
    Args:
        prompt: Main generation prompt
        negative_prompt: What to avoid
        width: Image width (default 1024)
        height: Image height (default 1024)
        layer_type: Asset category (foreground, midground, background, micro-motion, test)
    
    Returns:
        dict with 'success', 'url', 'path', 'error' keys
    """
    
    print(f"\n🎨 Generating {layer_type} image...")
    print(f"   Prompt: {prompt[:80]}...")
    
    payload = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "image_size": {
            "width": width,
            "height": height
        },
        "num_images": 1,
        "enable_safety_checker": False,  # Allow horse racing content
        "output_format": "png"
    }
    
    headers = {
        "Authorization": f"Key {FAL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        # Submit generation request
        response = requests.post(FAL_ENDPOINT, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        
        # Get image URL
        if 'images' in result and len(result['images']) > 0:
            image_url = result['images'][0]['url']
            
            # Download image
            img_response = requests.get(image_url)
            img_response.raise_for_status()
            
            # Save to assets directory
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{layer_type}_{timestamp}.png"
            save_path = ASSETS_DIR / layer_type / filename
            save_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(save_path, 'wb') as f:
                f.write(img_response.content)
            
            print(f"   ✅ Saved: {save_path}")
            
            return {
                'success': True,
                'url': image_url,
                'path': str(save_path),
                'prompt': prompt
            }
        else:
            return {
                'success': False,
                'error': 'No images returned from API',
                'result': result
            }
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return {
            'success': False,
            'error': str(e)
        }


def generate_batch(batch_file: Path) -> list:
    """
    Generate multiple images from a JSON batch file
    
    Batch file format:
    {
        "images": [
            {
                "prompt": "...",
                "negative_prompt": "...",
                "type": "foreground",
                "width": 2048,
                "height": 1080
            }
        ]
    }
    """
    
    print(f"\n📦 Processing batch: {batch_file}")
    
    with open(batch_file, 'r') as f:
        batch = json.load(f)
    
    results = []
    total = len(batch['images'])
    
    for i, spec in enumerate(batch['images'], 1):
        print(f"\n[{i}/{total}]", end=" ")
        
        result = generate_image(
            prompt=spec['prompt'],
            negative_prompt=spec.get('negative_prompt', ''),
            width=spec.get('width', 1024),
            height=spec.get('height', 1024),
            layer_type=spec.get('type', 'test')
        )
        
        results.append(result)
        
        # Rate limiting: wait 2 seconds between requests
        if i < total:
            time.sleep(2)
    
    return results


def main():
    parser = argparse.ArgumentParser(description='Generate b-roll images for Evolution Reels')
    parser.add_argument('--prompt', type=str, help='Single image prompt')
    parser.add_argument('--negative', type=str, default='', help='Negative prompt')
    parser.add_argument('--type', type=str, default='test', 
                       choices=['foreground', 'midground', 'background', 'micro-motion', 'test'],
                       help='Asset layer type')
    parser.add_argument('--width', type=int, default=1024, help='Image width')
    parser.add_argument('--height', type=int, default=1024, help='Image height')
    parser.add_argument('--batch', type=Path, help='Batch JSON file')
    
    args = parser.parse_args()
    
    if args.batch:
        # Batch mode
        results = generate_batch(args.batch)
        
        # Summary
        success_count = sum(1 for r in results if r['success'])
        print(f"\n{'='*60}")
        print(f"✅ Successful: {success_count}/{len(results)}")
        print(f"❌ Failed: {len(results) - success_count}")
        
        # Save results
        results_file = PROJECT_ROOT / "assets" / f"batch_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(results_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"📄 Results saved: {results_file}")
        
    elif args.prompt:
        # Single image mode
        result = generate_image(
            prompt=args.prompt,
            negative_prompt=args.negative,
            width=args.width,
            height=args.height,
            layer_type=args.type
        )
        
        if result['success']:
            print(f"\n✅ Image generated successfully!")
            print(f"   Path: {result['path']}")
        else:
            print(f"\n❌ Generation failed: {result.get('error', 'Unknown error')}")
            sys.exit(1)
    
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == '__main__':
    main()
