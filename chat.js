
const STORAGE_KEY = 'vt_builder_projects_v5';
const ACTIVE_KEY = 'vt_builder_active_project_v5';

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

function renderProjectButtons(containerId, projects, activeId, closeDrawer){
  const list = document.getElementById(containerId);
  if (!list) return;
  list.innerHTML = '';

  [...projects].sort((a,b) => b.createdAt - a.createdAt).forEach(project => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = project.title;
    if (project.id === activeId) btn.classList.add('is-active');
    btn.addEventListener('click', () => {
      localStorage.setItem(ACTIVE_KEY, project.id);
      if (closeDrawer) closeDrawer();
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

function autoGrow(textarea){
  textarea.style.height = '24px';
  textarea.style.height = Math.min(textarea.scrollHeight, 220) + 'px';
}

function init(){
  const { project, projects } = getActiveProject();
  if (!project) {
    window.location.href = 'index.html';
    return;
  }

  const chatDrawer = document.getElementById('chatDrawer');
  const openDrawer = () => chatDrawer.classList.add('is-open');
  const closeDrawer = () => chatDrawer.classList.remove('is-open');

  document.getElementById('chatTitle').textContent = project.title;
  renderProjectButtons('sidebarProjectList', projects, project.id, null);
  renderProjectButtons('mobileProjectList', projects, project.id, closeDrawer);
  renderMessages(project);
  renderPreview(project);

  const input = document.getElementById('chatInput');
  autoGrow(input);
  input.addEventListener('input', () => autoGrow(input));

  const send = () => {
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
    autoGrow(input);
    renderMessages(current);
  };

  document.getElementById('sendMessageBtn').addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  const newProjectAction = () => window.location.href = 'index.html';
  document.getElementById('newProjectBtnDesktop').addEventListener('click', newProjectAction);
  document.getElementById('newProjectBtnMobile').addEventListener('click', newProjectAction);

  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  const closeChatDrawerBtn = document.getElementById('closeChatDrawerBtn');

  if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', openDrawer);
  if (closeChatDrawerBtn) closeChatDrawerBtn.addEventListener('click', closeDrawer);
  if (chatDrawer) {
    chatDrawer.addEventListener('click', (e) => {
      if (e.target === chatDrawer) closeDrawer();
    });
  }
}

init();
