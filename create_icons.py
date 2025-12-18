from PIL import Image, ImageDraw, ImageFont
import os

# Create 512x512 icon
icon_512 = Image.new('RGBA', (512, 512), (15, 23, 42, 255))
draw = ImageDraw.Draw(icon_512)
# Draw a simple AI icon
draw.ellipse([100, 100, 412, 412], fill=(0, 255, 234, 255))
# Draw robot face
draw.ellipse([180, 180, 240, 240], fill=(15, 23, 42, 255))  # Left eye
draw.ellipse([272, 180, 332, 240], fill=(15, 23, 42, 255))  # Right eye
draw.arc([200, 280, 312, 360], 0, 180, fill=(15, 23, 42, 255), width=10)
icon_512.save('icon-512.png')

# Create 192x192 icon (resize from 512x512)
icon_192 = icon_512.resize((192, 192), Image.Resampling.LANCZOS)
icon_192.save('icon-192.png')

# Create favicon (32x32)
favicon = icon_512.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('favicon.ico')

print("✅ Icons created: icon-512.png, icon-192.png, favicon.ico")
