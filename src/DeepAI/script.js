
// Example directly sending a text string:
(async function() {
    let input = "A celestial huntress with iridescent wings, adorned in moonlit armor, and wielding a star-studded bow.";

    const resp = await fetch('https://api.deepai.org/api/anime-portrait-generator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '0268bed7-8484-4e80-9fa9-1581aeaca508'
        },
        body: JSON.stringify({
            text: input,
            image_generator_version: 'hd'
        })
    });
    
    const data = await resp.json();
    console.log(data);
    console.log(typeof data);
    console.log(data.output_url);
})()