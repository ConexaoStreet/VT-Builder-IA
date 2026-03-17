const treeItems = [...document.querySelectorAll('.tree-item')];
const screens = {
  home: document.getElementById('screen-home'),
  catalogo: document.getElementById('screen-catalogo'),
  produto: document.getElementById('screen-produto'),
  checkout: document.getElementById('screen-checkout'),
  contato: document.getElementById('screen-contato'),
  admin: document.getElementById('screen-admin')
};

treeItems.forEach(item => {
  item.addEventListener('click', () => {
    treeItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    const key = item.dataset.screen;
    if (screens[key]) screens[key].classList.add('active');
  });
});

const sendPrompt = document.getElementById('sendPrompt');
const promptInput = document.getElementById('promptInput');
const chatThread = document.querySelector('.chat-thread');

if (sendPrompt && promptInput && chatThread) {
  sendPrompt.addEventListener('click', () => {
    const value = promptInput.value.trim();
    if (!value) return;

    const user = document.createElement('div');
    user.className = 'chat-msg user';
    user.innerHTML = `<small>Você</small><p>${value}</p>`;
    chatThread.appendChild(user);

    const ai = document.createElement('div');
    ai.className = 'chat-msg ai';
    ai.innerHTML = `<small>VT Builder IA</small><p>Entendi. Em uma versão funcional, eu aplicaria essa mudança no layout e atualizaria o preview em tempo real.</p>`;
    chatThread.appendChild(ai);

    promptInput.value = '';
    chatThread.scrollTop = chatThread.scrollHeight;
  });
}
