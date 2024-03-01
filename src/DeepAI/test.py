import requests
input = "A celestial huntress with iridescent wings, adorned in moonlit armor, and wielding a star-studded bow.";

r = requests.post(
    "https://api.deepai.org/api/anime-portrait-generator",
    data={
        'text': input,
        'image_generator_version': 'hd',
    },
    headers={'api-key': '0268bed7-8484-4e80-9fa9-1581aeaca508'}
)
print(r.json())