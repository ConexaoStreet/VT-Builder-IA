const firstPrompt = localStorage.getItem('vt_builder_first_prompt');
const chatTitle = localStorage.getItem('vt_builder_chat_title');

const firstPromptText = document.getElementById('firstPromptText');
const chatTitleEl = document.getElementById('chatTitle');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatInput = document.getElementById('chatInput');
const chatHistory = document.getElementById('chatHistory');

if (firstPrompt && firstPromptText) firstPromptText.textContent = firstPrompt;
if (chatTitle && chatTitleEl) chatTitleEl.textContent = chatTitle;

if (sendMessageBtn) {
  sendMessageBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;

    const user = document.createElement('div');
    user.className = 'msg user';
    user.innerHTML = `<small>Você</small><p>${text}</p>`;
    chatHistory.appendChild(user);

    const ai = document.createElement('div');
    ai.className = 'msg ai';
    ai.innerHTML = `<small>VT Builder IA</small><p>Entendi. Numa versão funcional real, eu aplicaria essa mudança no projeto, atualizaria o preview e criaria a nova versão dos arquivos automaticamente.</p>`;
    chatHistory.appendChild(ai);

    chatInput.value = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;
  });
}
