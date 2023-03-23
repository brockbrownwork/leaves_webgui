import base64
from io import BytesIO
from PIL import Image

with open('base64_example.txt', 'r') as f:
    base64_image = f.read()

def save_base64_image(base64_image, output_filename):
    base64_image = base64_image.split(',')[1]  # Remove data URL prefix (if exists)
    image_data = base64.b64decode(base64_image)
    image = Image.open(BytesIO(image_data))
    image.save(output_filename)

save_base64_image(base64_image, 'output.png')
