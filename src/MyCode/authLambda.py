
def lambda_handler(event, context):
    print(event)
    auth = 'Deny'
    if event['authorizationToken'] == 'LSG':
        auth = 'Allow'
    else:
        auth = 'Deny'
        
    authResponse = { 
        "principalId": "abc123", 
        "policyDocument": { 
            "Version": "2012-10-17", 
            "Statement": [
                {
                    "Action": "execute-api:Invoke", 
                    "Resource":[
                        "arn:aws:execute-api:us-east-2:887840643533:tok9z1zuda/*/*"
                    ], 
                    "Effect": auth
                    
                }
            ] 
            
        }
        
    }
    return authResponse