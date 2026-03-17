
const STORAGE_KEY = 'vt_builder_projects_v4';
const ACTIVE_KEY = 'vt_builder_active_project_v4';

const defaultProjects = [
  {
    id: 'demo-clinica',
    title: 'Clínica Aurora',
    prompt: 'Crie um site institucional premium para uma clínica moderna.',
    description: 'Site institucional premium',
    createdAt: Date.now() - 30000,
    messages: []
  },
  {
    id: 'demo-burger',
    title: 'Burger Wave',
    prompt: 'Crie uma landing page forte para uma hamburgueria urbana.',
    description: 'Landing page de hamburgueria',
    createdAt: Date.now() - 20000,
    messages: []
  },
  {
    id: 'demo-fintech',
    title: 'NovaPay',
    prompt: 'Crie um site SaaS fintech moderno e elegante.',
    description: 'SaaS fintech moderno',
    createdAt: Date.now() - 10000,
    messages: []
  }
];

function getProjects(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProjects;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultProjects;
  }catch{
    return defaultProjects;
  }
}

function saveProjects(projects){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function generateTitle(prompt){
  const text = (prompt || '').trim();
  if (!text) return 'Novo Projeto';
  const firstLine = text.split(/[.!?\n]/)[0].trim();
  return firstLine.length > 40 ? firstLine.slice(0, 40).trim() + '...' : firstLine;
}

function generateDescription(prompt){
  const text = (prompt || '').trim();
  if (!text) return 'Projeto criado por IA';
  const firstLine = text.split(/[.!?\n]/)[0].trim();
  return firstLine.length > 58 ? firstLine.slice(0, 58).trim() + '...' : firstLine;
}

function renderProjects(){
  const grid = document.getElementById('projectGrid');
  const drawer = document.getElementById('drawerProjectList');
  const projects = [...getProjects()].sort((a,b) => b.createdAt - a.createdAt);

  grid.innerHTML = '';
  drawer.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-preview"></div>
      <div class="project-info">
        <strong>${project.title}</strong>
        <span>${project.description || 'Projeto criado por IA'}</span>
      </div>
    `;
    card.addEventListener('click', () => openProject(project.id));
    grid.appendChild(card);

    const item = document.createElement('button');
    item.type = 'button';
    item.textContent = project.title;
    item.addEventListener('click', () => openProject(project.id));
    drawer.appendChild(item);
  });
}

function openProject(projectId){
  localStorage.setItem(ACTIVE_KEY, projectId);
  window.location.href = 'chat.html';
}

function createProject(){
  const promptField = document.getElementById('projectPrompt');
  const prompt = promptField.value.trim();
  if (!prompt) return;

  const projects = getProjects();
  const newProject = {
    id: 'project-' + Date.now(),
    title: generateTitle(prompt),
    prompt,
    description: generateDescription(prompt),
    createdAt: Date.now(),
    messages: [
      { role: 'user', text: prompt },
      { role: 'ai', text: 'Perfeito. Vou estruturar esse projeto com base no seu comando inicial, gerar a primeira versão, criar as páginas principais e abrir o preview ao vivo para você continuar refinando pelo chat.' },
      { role: 'system', text: '✓ Título do projeto gerado\n✓ Estrutura inicial criada\n✓ Preview inicial montado\n✓ Arquivos principais adicionados' }
    ]
  };

  projects.push(newProject);
  saveProjects(projects);
  localStorage.setItem(ACTIVE_KEY, newProject.id);
  window.location.href = 'chat.html';
}

const createProjectBtn = document.getElementById('createProjectBtn');
if (createProjectBtn) createProjectBtn.addEventListener('click', createProject);

const openDrawerBtn = document.getElementById('openDrawerBtn');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (openDrawerBtn) {
  openDrawerBtn.addEventListener('click', () => mobileDrawer.classList.add('is-open'));
}
if (closeDrawerBtn) {
  closeDrawerBtn.addEventListener('click', () => mobileDrawer.classList.remove('is-open'));
}
if (mobileDrawer) {
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) mobileDrawer.classList.remove('is-open');
  });
}

renderProjects();
