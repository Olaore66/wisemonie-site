from PIL import Image

input_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo.png"
output_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo_optimized.png"

try:
    img = Image.open(input_path).convert("RGBA")
except Exception as e:
    print(f"Error loading image: {e}")
    exit(1)

# 1. Key out white background
datas = img.getdata()
new_data = []
threshold = 240
for item in datas:
    if item[0] > threshold and item[1] > threshold and item[2] > threshold:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)
img.putdata(new_data)

# 2. Crop to content (Trim whitespace)
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)
    print(f"Cropped to {bbox}")
else:
    print("Warning: Image is completely transparent")

# 3. Save
img.save(output_path, "PNG")
print(f"Saved optimized logo to {output_path}")
