
const STORAGE_KEY = 'vt_builder_projects_v4';
const ACTIVE_KEY = 'vt_builder_active_project_v4';

function getProjects(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  }catch{
    return [];
  }
}

function saveProjects(projects){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function getActiveProject(){
  const activeId = localStorage.getItem(ACTIVE_KEY);
  const projects = getProjects();
  let project = projects.find(item => item.id === activeId);

  if (!project && projects.length) {
    project = [...projects].sort((a,b) => b.createdAt - a.createdAt)[0];
    localStorage.setItem(ACTIVE_KEY, project.id);
  }

  return { project, projects };
}

function renderSidebar(projects, activeId){
  const list = document.getElementById('sidebarProjectList');
  list.innerHTML = '';

  [...projects].sort((a,b) => b.createdAt - a.createdAt).forEach(project => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = project.title;
    if (project.id === activeId) btn.classList.add('is-active');
    btn.addEventListener('click', () => {
      localStorage.setItem(ACTIVE_KEY, project.id);
      location.reload();
    });
    list.appendChild(btn);
  });
}

function renderMessages(project){
  const history = document.getElementById('chatHistory');
  history.innerHTML = '';

  project.messages.forEach(message => {
    const box = document.createElement('div');
    box.className = 'msg ' + (message.role === 'system' ? 'system' : message.role === 'user' ? 'user' : 'ai');

    const label = message.role === 'user' ? 'Você' : message.role === 'system' ? 'Sistema' : 'VT Builder IA';
    box.innerHTML = `<small>${label}</small><p>${message.text}</p>`;
    history.appendChild(box);
  });

  history.scrollTop = history.scrollHeight;
}

function renderPreview(project){
  const previewTitle = document.getElementById('previewTitle');
  const previewDesc = document.getElementById('previewDesc');
  previewTitle.textContent = project.title;
  previewDesc.textContent = project.description || project.prompt || 'Projeto criado por IA.';
}

function init(){
  const { project, projects } = getActiveProject();
  if (!project) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('chatTitle').textContent = project.title;
  renderSidebar(projects, project.id);
  renderMessages(project);
  renderPreview(project);

  const sendBtn = document.getElementById('sendMessageBtn');
  const input = document.getElementById('chatInput');

  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    const allProjects = getProjects();
    const current = allProjects.find(item => item.id === project.id);
    if (!current) return;

    current.messages.push({ role: 'user', text });
    current.messages.push({
      role: 'ai',
      text: 'Entendi. Em uma versão funcional completa, eu aplicaria essa mudança no projeto, atualizaria o preview, ajustaria os arquivos e manteria todo o histórico sincronizado automaticamente.'
    });

    saveProjects(allProjects);
    input.value = '';
    renderMessages(current);
  });

  const newProjectBtn = document.getElementById('newProjectBtn');
  if (newProjectBtn) {
    newProjectBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  const sidebar = document.getElementById('sidebar');
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', () => {
      sidebar.style.display = sidebar.style.display === 'flex' ? 'none' : 'flex';
    });
  }
}

init();
