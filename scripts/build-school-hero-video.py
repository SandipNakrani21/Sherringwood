"""Build a compact silent hero film from the school's original photographs."""
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / '.video-tools'))
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
sources = root / 'public/images/school/originals'
output = root / 'public/videos'
work = root / '.video-tools/render'
output.mkdir(exist_ok=True)
work.mkdir(parents=True, exist_ok=True)
photos = ['DSC_0038-2256-x-1500.jpg', 'DSC_0003-2256-x-1500.jpg', 'DSC_0031-2256-x-1500.jpg', 'img-6.webp']
clips = []
for index, photo in enumerate(photos):
    clip = work / f'hero-{index}.mp4'
    filters = 'scale=1280:800:force_original_aspect_ratio=increase,crop=1280:800,setsar=1,fade=t=in:st=0:d=0.25,fade=t=out:st=3.75:d=0.25'
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-loop', '1', '-i', str(sources / photo), '-t', '4', '-vf', filters, '-r', '24', '-c:v', 'libx264', '-preset', 'fast', '-crf', '21', '-pix_fmt', 'yuv420p', '-an', str(clip)], check=True)
    clips.append(clip)
manifest = work / 'clips.txt'
manifest.write_text('\n'.join(f"file '{str(clip).replace(chr(92), '/')}'" for clip in clips), encoding='utf-8')
destination = output / 'sherringwood-hero.mp4'
subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(manifest), '-c', 'copy', '-movflags', '+faststart', str(destination)], check=True)
print(f'{destination}: {destination.stat().st_size / 1024 / 1024:.2f} MB, 16s, 1280 x 800, silent')
