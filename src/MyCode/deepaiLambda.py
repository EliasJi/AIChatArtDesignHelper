import json
import requests

def lambda_handler(event, context):
    
    
    r = requests.post(
        "https://api.deepai.org/api/anime-portrait-generator",
        data={
            'text': event['input'],
            'image_generator_version': 'hd',
        },
        headers={'api-key': '0268bed7-8484-4e80-9fa9-1581aeaca508'}
    )

    return {
        'statusCode': 200,
        # 'headers': {
        #     # "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        #     "Access-Control-Allow-Origin": "https://dev7793.d1wuewb93vg9qg.amplifyapp.com/",
        #     # "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
        # },
        'body': r.json()
    }
