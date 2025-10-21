// DOM Elements
const form = document.getElementById('form');
const messageInput = document.getElementById('message');
const chatLog = document.getElementById('chat-log');
const sendButton = document.getElementById('send-button');

// Textarea auto-resize
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// Handle Enter key (Submit on Enter, new line on Shift+Enter)
messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});

// Format time
function getFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Create message element
function createMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'message--user' : 'message--bot'}`;

    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${isUser ? 'user-avatar' : 'bot-avatar'}`;

    if (isUser) {
        avatar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        `;
    } else {
        avatar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        `;
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;

    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getFormattedTime();

    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(timeDiv);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

// Create typing indicator
function createTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message--bot';
    messageDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar bot-avatar';
    avatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    `;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;

    contentDiv.appendChild(typingDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Scroll to bottom with smooth animation
function scrollToBottom() {
    chatLog.scrollTo({
        top: chatLog.scrollHeight,
        behavior: 'smooth'
    });
}

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const messageText = messageInput.value.trim();

    if (!messageText) return;

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Add user message
    const userMessage = createMessage(messageText, true);
    chatLog.appendChild(userMessage);
    scrollToBottom();

    // Add typing indicator
    const typingIndicator = createTypingIndicator();
    chatLog.appendChild(typingIndicator);
    scrollToBottom();

    // Disable send button and show loading
    sendButton.classList.add('loading');
    sendButton.disabled = true;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: messageText
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Remove typing indicator
        typingIndicator.remove();

        // Add bot response
        const botMessage = createMessage(data.response, false);
        chatLog.appendChild(botMessage);
        scrollToBottom();

    } catch (error) {
        console.error('Error:', error);

        // Remove typing indicator
        typingIndicator.remove();

        // Show error message
        const errorMessage = createMessage(
            'Sorry, I encountered an error. Please try again.',
            false
        );
        chatLog.appendChild(errorMessage);
        scrollToBottom();
    } finally {
        // Re-enable send button
        sendButton.classList.remove('loading');
        sendButton.disabled = false;
        messageInput.focus();
    }
});

// Focus input on load
window.addEventListener('load', () => {
    messageInput.focus();
});

// Add parallax effect to background based on scroll
let ticking = false;

chatLog.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPercentage = chatLog.scrollTop / (chatLog.scrollHeight - chatLog.clientHeight);
            const canvasContainer = document.getElementById('canvas-container');
            if (canvasContainer) {
                canvasContainer.style.transform = `translateY(${scrollPercentage * 20}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Add subtle cursor trail effect
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (trail.length > trailLength) {
        trail.shift();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        messageInput.focus();
    }

    // Escape to blur input
    if (e.key === 'Escape') {
        messageInput.blur();
    }
});

// Add smooth reveal animation for messages
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe all messages
const observeMessages = () => {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => observer.observe(message));
};

// Initial observation
observeMessages();

// Mutation observer to watch for new messages
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.classList && node.classList.contains('message')) {
                observer.observe(node);
            }
        });
    });
});

mutationObserver.observe(chatLog, { childList: true });

// Add sound effect on message send (optional - uncomment to enable)
/*
function playSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRQ0PVKno7qxYFApCmN7yt20fBi59zPDekkALFGO56+yrWhMMQ5na8rNyIgU8k9Xxx3oqBSh+y/Dck0EPFmS45+msTRQOR5zd8bFhGQY8ktTwxnkrBil9y/Ddk0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/Dek0ALE2S56+uqWhgMQ5na8LJyIgY8k9Xxx3krBSl9y/A==');
    audio.play().catch(e => console.log('Audio play failed:', e));
}
*/

console.log('%c🚀 AI ChatBot Ready!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard shortcuts:', 'color: #4facfe; font-size: 12px;');
console.log('%c  • Ctrl/Cmd + K: Focus input', 'color: #888; font-size: 11px;');
console.log('%c  • Enter: Send message', 'color: #888; font-size: 11px;');
console.log('%c  • Shift + Enter: New line', 'color: #888; font-size: 11px;');
console.log('%c  • Escape: Blur input', 'color: #888; font-size: 11px;');
