const API_BASE = localStorage.getItem('st_server_url') || 'http://localhost:8000';
const API_KEY = localStorage.getItem('st_api_key') || '';

let currentView = 'chat';
let isConnected = false;
let messages = [];
let characters = [];
let currentCharacter = null;

function showLoading(show) {
    document.getElementById('loading-screen').classList.toggle('hidden', !show);
    document.getElementById('main-container').classList.toggle('hidden', show);
}

function updateConnectionStatus(connected, message = '') {
    isConnected = connected;
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    if (connected) {
        dot.className = 'w-3 h-3 rounded-full bg-green-500';
        text.textContent = message || 'Connected';
        messageInput.disabled = false;
        sendBtn.disabled = false;
    } else {
        dot.className = 'w-3 h-3 rounded-full bg-red-500';
        text.textContent = message || 'Not Connected';
        messageInput.disabled = true;
        sendBtn.disabled = true;
    }
}

async function checkConnection() {
    try {
        const response = await fetch(`${API_BASE}/api/version`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
            }
        });
        if (response.ok) {
            const data = await response.json();
            updateConnectionStatus(true, `Connected to ${data.version || 'SillyTavern'}`);
            return true;
        }
    } catch (error) {
        console.log('Connection check failed:', error);
    }
    updateConnectionStatus(false, 'Server not reachable');
    return false;
}

function renderMessages() {
    const container = document.getElementById('chat-container');
    const welcome = document.getElementById('welcome-message');

    if (messages.length === 0) {
        welcome.classList.remove('hidden');
        return;
    }

    welcome.classList.add('hidden');
    container.innerHTML = messages.map(msg => `
        <div class="flex ${msg.isUser ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[80%] rounded-lg px-4 py-3 ${msg.isUser ? 'bg-purple-600' : 'bg-gray-700'}">
                <p class="text-sm">${escapeHtml(msg.content)}</p>
                <span class="text-xs opacity-60 mt-1 block">${msg.timestamp}</span>
            </div>
        </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value.trim();

    if (!content || !isConnected) return;

    const userMessage = {
        isUser: true,
        content: content,
        timestamp: new Date().toLocaleTimeString()
    };

    messages.push(userMessage);
    input.value = '';
    renderMessages();

    try {
        const response = await fetch(`${API_BASE}/api聊天/生成`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
            },
            body: JSON.stringify({
                message: content,
                character_id: currentCharacter?.id
            })
        });

        if (response.ok) {
            const data = await response.json();
            const aiMessage = {
                isUser: false,
                content: data.message || data.text || '...',
                timestamp: new Date().toLocaleTimeString()
            };
            messages.push(aiMessage);
        } else {
            const aiMessage = {
                isUser: false,
                content: 'Sorry, I could not generate a response.',
                timestamp: new Date().toLocaleTimeString()
            };
            messages.push(aiMessage);
        }
    } catch (error) {
        console.error('Send message error:', error);
        const aiMessage = {
            isUser: false,
            content: 'Connection error. Please check your server settings.',
            timestamp: new Date().toLocaleTimeString()
        };
        messages.push(aiMessage);
    }

    renderMessages();
}

function switchView(view) {
    currentView = view;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('text-purple-400', btn.dataset.view === view);
        btn.classList.toggle('text-gray-400', btn.dataset.view !== view);
    });

    const settingsPanel = document.getElementById('settings-panel');
    if (view === 'settings') {
        settingsPanel.classList.remove('hidden');
    } else {
        settingsPanel.classList.add('hidden');
    }
}

function initEventListeners() {
    document.getElementById('send-btn').addEventListener('click', sendMessage);

    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
        switchView('settings');
    });

    document.getElementById('btn-close-settings').addEventListener('click', () => {
        switchView('chat');
    });

    document.getElementById('server-url').addEventListener('change', (e) => {
        localStorage.setItem('st_server_url', e.target.value);
        window.location.reload();
    });

    document.getElementById('api-key').addEventListener('change', (e) => {
        localStorage.setItem('st_api_key', e.target.value);
    });

    document.getElementById('server-url').value = API_BASE;
    document.getElementById('api-key').value = API_KEY;
}

async function init() {
    showLoading(true);
    initEventListeners();

    setTimeout(() => {
        showLoading(false);
        checkConnection();
    }, 500);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
