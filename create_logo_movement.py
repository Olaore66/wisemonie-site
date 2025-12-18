from PIL import Image, ImageSequence, ImageEnhance

# Load the logo
logo_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo.png"
output_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo_movement.gif"

try:
    img = Image.open(logo_path).convert("RGBA")
except Exception as e:
    print(f"Error loading image: {e}")
    exit(1)

# 0. KEYING OUT WHITE BACKGROUND
# We need to make the source transparent first
datas = img.getdata()
new_data = []
for item in datas:
    # Check for white-ish pixels (allowing slight compression artifacts)
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0)) # Make Transparent
    else:
        new_data.append(item)
img.putdata(new_data)

width, height = img.size
pixels = img.load()

# 1. Detect Split Point (Reuse logic but look for non-transparent pixels now)
content_columns = []
for x in range(width):
    is_empty = True
    for y in range(height):
        r, g, b, a = pixels[x, y]
        # Check alpha
        if a > 0: 
            is_empty = False
            break
    if not is_empty:
        content_columns.append(x)

if not content_columns:
    print("Could not find content.")
    exit(1)

last_x = content_columns[0]
largest_gap = 0
best_split = 0

for x in content_columns:
    gap = x - last_x
    if gap > largest_gap and gap > 5:
        largest_gap = gap
        best_split = last_x + (gap // 2)
    last_x = x

if best_split == 0:
    best_split = int(width * 0.25)

# 2. Crop Parts
icon = img.crop((0, 0, best_split, height))
text = img.crop((best_split, 0, width, height))

# 3. Animate
frames = []
total_frames = 80
bounce_speed = 4
jump_height = 6

# TRANSPARENT BACKGROUND
bg_color = (0, 0, 0, 0)

for i in range(total_frames):
    import math
    
    t_icon = (i / total_frames) * bounce_speed * 2 * math.pi
    offset_y_icon = int( -abs(math.sin(t_icon)) * jump_height )
    
    slide_duration = 30
    
    if i < slide_duration:
        progress = i / slide_duration
        progress = 1 - pow(1 - progress, 3)
        slide_dist = 30
        offset_x_text = int(slide_dist * (1 - progress))
        opacity = progress
        
        if opacity < 1:
            frame_text = text.copy()
            alpha = frame_text.split()[3]
            alpha = ImageEnhance.Brightness(alpha).enhance(opacity)
            frame_text.putalpha(alpha)
        else:
            frame_text = text
    else:
        offset_x_text = 0
        frame_text = text

    # Compose Frame on Transparent Canvas
    frame = Image.new("RGBA", (width, height), bg_color)
    frame.paste(icon, (0, offset_y_icon), icon)
    
    target_x = best_split + offset_x_text
    frame.paste(frame_text, (target_x, 0), frame_text)
    
    frames.append(frame)

# Save with Transparency
frames[0].save(
    output_path,
    save_all=True,
    append_images=frames[1:],
    duration=50, 
    loop=0,
    disposal=2,
    transparency=0 # Hint that 0 (transparent) should be used
)
print(f"GIF saved to {output_path}")
