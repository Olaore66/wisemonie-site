from PIL import Image

input_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo.png"
output_path = "c:\\Users\\abrah\\Desktop\\moniewise_website\\images\\wisemonie_logo_transparent.png"

try:
    img = Image.open(input_path).convert("RGBA")
except Exception as e:
    print(f"Error loading image: {e}")
    exit(1)

datas = img.getdata()

new_data = []
# Threshold for white
threshold = 240

for item in datas:
    # item is (r, g, b, a)
    if item[0] > threshold and item[1] > threshold and item[2] > threshold:
        new_data.append((255, 255, 255, 0)) # Transparent
    else:
        new_data.append(item)

img.putdata(new_data)
img.save(output_path, "PNG")
print(f"Saved transparent logo to {output_path}")
