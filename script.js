const socket = io('http://localhost:3000');

const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
let username; // Tambahkan variabel username

function setUsername() {
    const usernameInput = document.getElementById('usernameInput');
    username = usernameInput.value.trim();

    if (username) {
        socket.emit('setUsername', username);
        usernameInput.disabled = true;
        messageInput.disabled = false;
        document.querySelector('button').disabled = false;
        const button = document.querySelector('button');
        button.classList.remove('bg-blue-500');
        button.classList.add('bg-gray-500', 'cursor-not-allowed');
    }
}

function sendMessage() {
    const message = messageInput.value.trim();

    if (message && username) {
        socket.emit('chat', { user: username, message }); // Kirim pesan dengan username
        messageInput.value = '';
    }
}

socket.on('chat', (message) => {
    const newMessage = document.createElement('li');
    newMessage.textContent = `${message.user}: ${message.message}`;
    chatMessages.appendChild(newMessage);
});
