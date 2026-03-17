const createBtn = document.getElementById('createProjectBtn');
const promptField = document.getElementById('projectPrompt');

function generateTitle(prompt){
  const text = (prompt || '').trim();
  if (!text) return 'Novo Projeto';
  const cut = text.split(/[.!?]/)[0].trim();
  return cut.length > 42 ? cut.slice(0, 42).trim() + '...' : cut;
}

if (createBtn) {
  createBtn.addEventListener('click', () => {
    const prompt = promptField.value.trim();
    if (!prompt) return;
    const title = generateTitle(prompt);
    localStorage.setItem('vt_builder_first_prompt', prompt);
    localStorage.setItem('vt_builder_chat_title', title);
    window.location.href = 'chat.html';
  });
}
