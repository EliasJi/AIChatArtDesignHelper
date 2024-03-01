// @ts-nocheck



const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')
const drawChatBtn = document.querySelector('.draw-image-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'ChatGPT' ? 'green-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'You'

const sendMessage = (e) => {
  e.preventDefault()

  chatInput.placeholder = "bot is thinking...";

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)


  
  /*  Send chatgpt request */
  requestChatgptResponse(chatInput.value)


  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight

}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''


})


drawChatBtn.addEventListener('click', () => {
  
  generateAnimePortrait();


})

let currentDrawKeywords = "Name: Akira Hikari Gender: Female Age: 17 Appearance: Akira has long, flowing midnight blue hair that reaches her waist. Her eyes are a vibrant shade of emerald green, which stand out against her fair complexion. She is of average height and has a slender yet athletic build. Akira often wears a black leather jacket over a white tank top, paired with dark blue jeans and black combat boots. She also has a silver pendant necklace with a crescent moon charm. Personality: Akira is a determined and independent individual. She possesses a strong sense of justice and is always willing to stand up for what she believes in. She is intelligent and quick-witted, often using her sharp mind to strategize and find solutions to problems. Despite her serious demeanor, Akira has a caring and compassionate side, especially towards her close friends. She is fiercely loyal and will go to great lengths to protect those she cares about. Abilities: Akira is a skilled martial artist, specializing in hand-to-hand combat. She has trained in various martial arts styles, allowing her to adapt to different fighting situations. She is also proficient in using a katana, which she carries with her at all times. Akira possesses enhanced agility and reflexes, making her a formidable opponent in battle. Additionally, she has the ability to manipulate and control electricity, which she can use to create powerful electric attacks. Background: Akira comes from a family of skilled warriors who have protected their village for generations. She was trained from a young age in the art of combat, honing her skills and developing her own unique fighting style. However, tragedy struck when her village was attacked by a powerful enemy, resulting in the loss of her family and the destruction of her home. Determined to seek justice and prevent others from suffering the same fate, Akira embarks on a journey to become stronger and find the truth behind the attack. Along the way, she encounters allies and enemies, uncovering a deeper conspiracy that threatens the entire world.";

async function requestChatgptResponse(input){

  console.log("requestChatgptResponse");
  console.log(input);

  var myHeaders = new Headers();
  myHeaders.append("auth", "LSG");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "input": input
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://tok9z1zuda.execute-api.us-east-2.amazonaws.com/dev/chatgpt", requestOptions)
    .then(response => response.text())
    .then(result => receiveChatgptResponse(result))
    .catch(error => console.log('error', error));
}

async function receiveChatgptResponse(responseText){

  console.log("receiveChatgptResponse");
  console.log(responseText);
  
  const jsonObject = JSON.parse(responseText);
  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: "ChatGPT",
    text: jsonObject.body['response'],
    timestamp,
  }

  currentDrawKeywords = jsonObject.body['response'];

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight

  

  chatInput.placeholder = "Type here...";
}

async function generateAnimePortrait() {
  
  console.log("generateAnimePortrait");
  console.log(currentDrawKeywords);
  
  drawChatBtn.textContent = "Loading";

  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("auth", "LSG");
  // myHeaders.append("Access-Control-Allow-Origin", "https://dev7793.d1wuewb93vg9qg.amplifyapp.com/");
  // myHeaders.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  // myHeaders.append("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({"input":currentDrawKeywords});
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch("https://tok9z1zuda.execute-api.us-east-2.amazonaws.com/dev/deepai", requestOptions)
  .then(response => {
    // Check if the response is successful (status 200)
    
    if (response.ok) {
      const reader = response.body.getReader(); // Get the reader for the ReadableStream
      let streamData = ''; // Variable to accumulate stream data
    
      function readStream() {
        reader.read().then(({ done, value }) => {
          if (done) {
            // End of stream reached, parse accumulated data as JSON
            try {
              const jsonData = JSON.parse(streamData);
              // console.log("JSON data:", jsonData);
              // console.log(jsonData.body);
              // console.log(jsonData.body.output_url);
              const imageURL = jsonData.body['output_url'];
              
              // Set the image URL as the source for the <img> element
              const imgElement = document.getElementById('myImage');
              imgElement.src = imageURL;
              
              drawChatBtn.textContent = "Draw";
              // Now you can use 'jsonData' as needed
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
            return;
          }
    
          // Convert the chunk of data (Uint8Array) to a string and accumulate
          const chunkStr = new TextDecoder().decode(value);
          streamData += chunkStr;
    
          // Continue reading the stream
          readStream();
        }).catch(error => {
          console.error("Error reading stream:", error);
        });
      }
    
      // Start reading the stream
      readStream();
    } else {
      throw new Error('Network response was not ok.');
    }
  })

}
