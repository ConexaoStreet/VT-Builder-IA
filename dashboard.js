const createBtn = document.getElementById('createProjectBtn');
const promptField = document.getElementById('projectPrompt');

function generateTitle(prompt){
  const text = (prompt || '').trim();
  if (!text) return 'Novo Projeto';
  const lower = text.toLowerCase();
  if (lower.includes('streetwear')) return 'Loja Streetwear Premium';
  if (lower.includes('hamburguer')) return 'Landing de Hamburgueria';
  if (lower.includes('sneaker') || lower.includes('shox') || lower.includes('tn')) return 'Loja de Sneakers';
  const cleaned = text.split(/[.!?]/)[0].slice(0, 38).trim();
  return cleaned || 'Novo Projeto';
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
