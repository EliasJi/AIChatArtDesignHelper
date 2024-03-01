

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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"
});


const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Can u hear me?"}],
});

console.log(chatCompletion.choices[0].message);



const functionName = 'openai_invoke_api';
const region = 'us-east-2';
const accessKey = 'AKIA45N3NDHGV5K3ENW3';
const secretKey = 'iy9vZC1xbuOoBYRqjSovM+w1131bDFcVfGWEvf0M';

const payload = JSON.stringify({"input":input});

const date = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
const method = 'POST';
const service = 'lambda';
const host = `lambda.${region}.amazonaws.com`;
const path = `/2015-03-31/functions/${functionName}/invocations`;

const canonicalRequest = `${method}\n${path}\n\nhost:${host}\nx-amz-date:${date}\n\nhost;x-amz-date\n${crypto.createHash('sha256').update(payload).digest('hex')}`;

const stringToSign = `AWS4-HMAC-SHA256\n${date}\n${date.substr(0, 8)}/${region}/${service}/aws4_request\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

const signingKey = getSignatureKey(secretKey, date.substr(0, 8), region, service);
const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

const authorizationHeader = `AWS4-HMAC-SHA256 Credential=${accessKey}/${date.substr(0, 8)}/${region}/${service}/aws4_request, SignedHeaders=host;x-amz-date, Signature=${signature}`;

fetch(`https://${host}${path}`, {
  method: method,
  headers: {
    'Content-Type': 'application/json',
    'X-Amz-Date': date,
    'Authorization': authorizationHeader,
    'X-Amz-Invocation-Type': 'Event' 
  },
  body: payload
})