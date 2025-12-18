from PIL import Image, ImageSequence

# Load the static logo
logo_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo.png"
output_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo.gif"

try:
    original = Image.open(logo_path).convert("RGBA")
except Exception as e:
    print(f"Error loading image: {e}")
    exit(1)

# Settings for animation
frames = []
total_frames = 60  # 3 seconds at 20fps
amplitude = 10      # How many pixels to float up/down

width, height = original.size
# Create a larger canvas to accommodate movement
canvas_width = width
canvas_height = height + (amplitude * 2)

for i in range(total_frames):
    # Calculate offset
    import math
    # Sin wave 0 -> 1 -> 0 -> -1 -> 0
    phase = (i / total_frames) * 2 * math.pi
    offset_y = int(math.sin(phase) * amplitude) + amplitude

    # Create new frame with white background (or transparent)
    # Using white background for cleaner gif edges if not careful with transparency
    # But transparency is better for websites.
    frame = Image.new("RGBA", (canvas_width, canvas_height), (255, 255, 255, 0))
    
    # Paste logo at offset
    frame.paste(original, (0, offset_y), original)
    frames.append(frame)

# Save as GIF
frames[0].save(
    output_path,
    save_all=True,
    append_images=frames[1:],
    duration=50, # 50ms per frame = 20fps
    loop=0,
    disposal=2   # Restore to background color
)

print(f"GIF saved to {output_path}")
