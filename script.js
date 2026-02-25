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

function processBotResponse() {
    typingIndicator.style.display = 'block';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        typingIndicator.style.display = 'none';
        appendMessage("Thank you for asking about that. For DepEd Mandaue specific details, please visit our official portal or stay tuned for more automated updates.", 'bot');
    }, 2000);
}

function handleQuickAction(topic) {
    appendMessage(topic, 'user');
    processBotResponse();
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});