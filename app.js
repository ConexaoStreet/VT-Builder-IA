const pageButtons = [...document.querySelectorAll('.side-item')];
const previewScreens = {
  home: document.getElementById('preview-home'),
  catalog: document.getElementById('preview-catalog'),
  product: document.getElementById('preview-product'),
  about: document.getElementById('preview-about'),
  contact: document.getElementById('preview-contact')
};

pageButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    pageButtons.forEach((item) => item.classList.remove('active'));
    btn.classList.add('active');
    Object.values(previewScreens).forEach((screen) => screen.classList.remove('active'));
    const key = btn.dataset.preview;
    if (previewScreens[key]) previewScreens[key].classList.add('active');
  });
});

const sendBtn = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const chatScroll = document.getElementById('chatScroll');

if (sendBtn && chatInput && chatScroll) {
  sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;

    const user = document.createElement('div');
    user.className = 'chat-bubble user';
    user.innerHTML = `<small>Você</small><p>${text}</p>`;
    chatScroll.appendChild(user);

    const ai = document.createElement('div');
    ai.className = 'chat-bubble ai';
    ai.innerHTML = `<small>VT Builder IA</small><p>Entendi. Numa versão funcional, eu aplicaria essa mudança diretamente no projeto e atualizaria o preview e os arquivos.</p>`;
    chatScroll.appendChild(ai);

    chatInput.value = '';
    chatScroll.scrollTop = chatScroll.scrollHeight;
  });
}
