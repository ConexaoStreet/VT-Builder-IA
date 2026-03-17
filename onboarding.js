const form = document.getElementById('builderForm');
const steps = [...document.querySelectorAll('.form-step')];
const stepLinks = [...document.querySelectorAll('.step-link')];
const nextBtn = document.getElementById('nextStep');
const prevBtn = document.getElementById('prevStep');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const summaryOutput = document.getElementById('summaryOutput');
const copySummary = document.getElementById('copySummary');

let currentStep = 1;
const totalSteps = steps.length;

function updateStepUI() {
  steps.forEach(step => step.classList.toggle('active', Number(step.dataset.step) === currentStep));
  stepLinks.forEach(link => link.classList.toggle('active', Number(link.dataset.step) === currentStep));

  const pct = Math.round((currentStep / totalSteps) * 100);
  progressBar.style.width = `${pct}%`;
  progressLabel.textContent = `${pct}%`;

  prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
  nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';

  buildSummary();
}

function formDataToObject() {
  const data = new FormData(form);
  const obj = {};
  for (const [key, value] of data.entries()) {
    if (obj[key]) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

function buildSummary() {
  const data = formDataToObject();
  const summary = {
    storeName: data.storeName || '',
    projectName: data.projectName || '',
    niche: data.niche || '',
    audience: data.audience || '',
    storeIdea: data.storeIdea || '',
    visualStyle: data.visualStyle || '',
    tone: data.tone || '',
    palette: data.palette ? (Array.isArray(data.palette) ? data.palette : [data.palette]) : [],
    visualNotes: data.visualNotes || '',
    categories: data.categories || '',
    exampleProducts: data.exampleProducts || '',
    priceRange: data.priceRange || '',
    promotions: data.promotions || '',
    salesMode: data.salesMode || '',
    whatsapp: data.whatsapp || '',
    email: data.email || '',
    instagram: data.instagram || '',
    region: data.region || '',
    waMessage: data.waMessage || '',
    structure: data.structure ? (Array.isArray(data.structure) ? data.structure : [data.structure]) : [],
    goal: data.goal || ''
  };

  summaryOutput.textContent = JSON.stringify(summary, null, 2);

  const previewStoreName = document.getElementById('previewStoreName');
  const previewStoreNiche = document.getElementById('previewStoreNiche');
  const previewPills = document.getElementById('previewPills');

  previewStoreName.textContent = summary.storeName || 'Nome da loja';
  previewStoreNiche.textContent = summary.niche || 'Nicho ainda não definido';

  previewPills.innerHTML = '';
  const pills = [
    summary.visualStyle || 'Loja premium',
    summary.salesMode || 'Mobile first',
    summary.tone || 'Dark commerce'
  ].filter(Boolean);

  pills.slice(0, 3).forEach(text => {
    const span = document.createElement('span');
    span.textContent = text;
    previewPills.appendChild(span);
  });
}

stepLinks.forEach(link => {
  link.addEventListener('click', () => {
    currentStep = Number(link.dataset.step);
    updateStepUI();
  });
});

nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps) {
    currentStep += 1;
    updateStepUI();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep -= 1;
    updateStepUI();
  }
});

form.addEventListener('input', buildSummary);
form.addEventListener('change', buildSummary);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Fluxo visual concluído. No próximo passo, isso pode ser enviado ao backend/IA para gerar o projeto real.');
});

copySummary.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(summaryOutput.textContent);
    copySummary.textContent = 'Resumo copiado';
    setTimeout(() => copySummary.textContent = 'Copiar resumo', 1400);
  } catch {
    copySummary.textContent = 'Falhou ao copiar';
    setTimeout(() => copySummary.textContent = 'Copiar resumo', 1400);
  }
});

buildSummary();
updateStepUI();
