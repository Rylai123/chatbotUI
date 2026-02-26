const chatContainer = document.querySelector('.chat-container');
const chatLauncher = document.getElementById('chat-launcher');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// Set Initial State
chatContainer.style.display = 'none';
chatLauncher.style.display = 'flex';

function toggleChat() {
    if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'flex';
        chatLauncher.style.display = 'none';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
        chatContainer.style.display = 'none';
        chatLauncher.style.display = 'flex';
    }
}

function appendMessage(text, senderType) {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    if (senderType === 'user') {
        newMessage.classList.add('message-sent');
    } else {
        newMessage.classList.add('message-received');
    }
    newMessage.textContent = text;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleSend() {
    const text = messageInput.value.trim();
    if (text !== '') {
        appendMessage(text, 'user');
        messageInput.value = '';
        processBotResponse();
    }
}

function handleSend() {
    const text = messageInput.value.trim();
    if (text !== '') {
        appendMessage(text, 'user');
        messageInput.value = '';
        // FIX: Pass 'text' into the function so the bot can read it
        processBotResponse(text); 
    }
}

function processBotResponse(userText) {
    typingIndicator.style.display = 'block';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        typingIndicator.style.display = 'none';

        // Convert input to lowercase for easier matching
        const input = userText.toLowerCase();
        let response = "";

        if (input.includes("enrollment")) {
            response = "For enrollment requirements, please bring your Form 138 and PSA Birth Certificate.";
        } 
        else if (input.includes("calendar")) {
            response = "The school calendar starts in August and ends in May.";
        }
        else if (input.includes("contact")) {
            response = "You may contact the Division Office at (032) 123-4567.";
        }
        else {
            // NEW: Your custom fallback message for anything else typed
            response = "Thank you for reaching out. A representative or automated system will respond to your query regarding DepEd Mandaue shortly.";
        }

        appendMessage(response, 'bot');
    }, 1500);
}

function handleQuickAction(topic) {
    appendMessage(topic, 'user');
    processBotResponse(topic);
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
