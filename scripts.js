const responses = {
    "hello": "Hi there! How can I assist you?",
    "your name": "I am personal chatbot of Shakti Singh. Feel free to ask me anything.",
    "how are you?": "I'm just a bot, but I'm doing well! How about you?",
    "bye": "Goodbye! Have a great day!",
    "who is shakti": "He is an 18 year old boy who is aiming to graduate from MIT.",
    "who is the father of shakti singh": "His name is Sanjay Singh from India. A village development officer at azamgarh district.",
    "who is the mother of shakti singh": "Her name is Manju Lata Singh. She belongs to rupwar bhagwan pur from balia in Uttar Pradesh."
};

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim().toLowerCase();
    const chatbotBody = document.getElementById("chatbot-body");
    const userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = userInput;
    chatbotBody.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    // Generate bot's response
    const botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");

    if (userInput in responses) {
        botMessage.innerText = responses[userInput];
        speak(botMessage.innerText);
    } else {
        botMessage.innerText = "Sorry, I didn't understand that. Could you rephrase?";
        speak(botMessage.innerText);
    }

    chatbotBody.appendChild(botMessage);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function speak(text) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set language for recognition
    recognition.interimResults = true;

    recognition.start();

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        transcript = transcript.replace(/\.$/, '');
        document.getElementById("user-input").value = transcript;
        sendMessage();
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error: " + event.error);
    };
}

//Signed by Shakti...
