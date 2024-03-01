import json
import openai
import boto3


def lambda_handler(event, context):
    
    
    openai.api_key = "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"
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      temperature=0,
      messages=[
            # {"role": "system", "content": "Hello"},
            {"role": "system", "content": "Don't ask any further question"},
            {"role": "system", "content": "Don't exceed 200 words"},
            {"role": "user", "content": event['input']},
        ]
    )
    #print(response)
    text_response = response['choices'][0]['message']['content']
    return {
        'statusCode':200,
        # 'headers': {
        #     # "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        #     "Access-Control-Allow-Origin": "https://dev7793.d1wuewb93vg9qg.amplifyapp.com/",
        #     # "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
        # },
        'body': {
            'response' : text_response
        }
    }

