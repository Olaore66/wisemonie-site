from PIL import Image, ImageEnhance, ImageChops, ImageDraw

# Load the logo
logo_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo.png"
output_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo_shine.gif"

try:
    original = Image.open(logo_path).convert("RGBA")
except Exception as e:
    print(f"Error loading image: {e}")
    exit(1)

width, height = original.size
frames = []
total_frames = 40

# Create a "shine" mask
# It's a white band with transparency gradient
shine_width = int(width * 0.4)
shine_layer = Image.new("RGBA", (width, height), (255, 255, 255, 0))
draw = ImageDraw.Draw(shine_layer)

# We will move this shine layer across the image
# But constructing a gradient line in PIL is tricky, let's use a simpler "brighten" band
# We'll create a generic shine mask once
mask_size = (width * 2, height)
shine_mask = Image.new("L", mask_size, 0)
d_mask = ImageDraw.Draw(shine_mask)

# Draw a gradient-like band on the mask (manually)
# A slanted bar
for x in range(shine_width):
    # Opacity falls off from center (128) to edges (0)
    opacity = int(100 * (1 - abs(x - shine_width/2) / (shine_width/2)))
    # Draw logic is complex for slant, let's just do a vertical sweep for simplicity first, or slant
    # Slant: x + y
    start = x 
    d_mask.polygon([(start + 200, 0), (start + 250, 0), (start + 50, height), (start, height)], fill=opacity)


# Actually, let's try a simpler approach: 
# Just increase brightness in a moving window.
frames = []
bbox = original.getbbox() # Get non-transparent area

for i in range(total_frames):
    # 0 to 1 progress
    progress = i / total_frames
    
    # Calculate position of the shine (from left to right)
    # Shine center x
    center_x = int((width + 200) * progress) - 100
    
    # Create a frame copy
    frame = original.copy()
    
    # We want to brighten pixels near the 'center_x' and maybe slanted
    # Let's interact with pixel data directly for control (slow but fine for small logo)
    pixels = frame.load()
    
    # Shine band width
    band_w = 60
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0: continue # Skip transparency
            
            # Distance from the "shine line", let's make it slanted: x + y*0.5
            # line_pos = center_x
            # pixel_pos = x - y*0.5 (slant)
            
            p_val = x + y * 0.5 
            dist = abs(p_val - center_x)
            
            if dist < band_w:
                # Calculate boost
                factor = (band_w - dist) / band_w # 0 to 1
                boost = int(100 * factor) # Add up to 100 brightness
                
                # Apply boost (clamp to 255)
                pixels[x, y] = (min(255, r + boost), min(255, g + boost), min(255, b + boost), a)

    frames.append(frame)

# Save
frames[0].save(
    output_path,
    save_all=True,
    append_images=frames[1:],
    duration=50,
    loop=0,
    disposal=2
)
print(f"GIF saved to {output_path}")
