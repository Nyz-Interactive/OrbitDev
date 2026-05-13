const vagas = [
  {id: 'v1', titulo: 'Dev Front-end Júnior', empresa: 'CodeNebula Tech', tags: ['Remoto', 'React', 'Júnior', 'CLT'], tipo: 'remoto junior', desc: 'Ajude a construir interfaces que vão pra lua! React, TypeScript e styled-components.', descCompleta: 'Produto com 50k usuários. Stack: React 18, TypeScript, Next.js, Tailwind. Benefícios: VR R$1.200, Plano saúde. CLT R$3.500-4.500.'},
  {id: 'v2', titulo: 'Estágio Back-end', empresa: 'RocketCode', tags: ['Híbrido SP', 'Node.js', 'Estágio'], tipo: 'estagio hibrido', desc: 'Primeira missão no back-end. A gente te ensina API, banco e microsserviços.', descCompleta: 'Estágio 6h/dia, bolsa R$1.800 + VT + VR. Node.js, Express, MongoDB e AWS. Mentoria 1:1 com devs sênior.'},
  {id: 'v3', titulo: 'Full Stack Júnior', empresa: 'StarCode Labs', tags: ['Remoto', 'Vue.js', 'Python', 'Júnior'], tipo: 'remoto junior', desc: 'Procuramos astronauta full stack. Vue no front, Python no back.', descCompleta: 'Produto SaaS B2B. Vue 3 + Python FastAPI + PostgreSQL. 100% remoto, horário flexível. Salário R$4.000.'},
  {id: 'v4', titulo: 'Dev Mobile Júnior', empresa: 'OrbitApps', tags: ['Remoto', 'React Native', 'Júnior'], tipo: 'remoto junior', desc: 'Crie apps que os usuários amam. React Native + Firebase.', descCompleta: 'Apps com 100k+ downloads. React Native, Expo, Firebase. PJ R$5.000.'},
  {id: 'v5', titulo: 'Estágio QA', empresa: 'GalaxyTest', tags: ['Presencial RJ', 'Estágio', 'QA'], tipo: 'estagio presencial', desc: 'Seja o guardião da qualidade. Aprenda testes automatizados.', descCompleta: 'Estágio em testes com Cypress e Jest. Bolsa R$1.600. Escritório na Barra da Tijuca.'}
];

let vagasFiltradas = [...vagas];

function renderizarVagas() {
  const container = document.getElementById('lista-vagas');
  container.innerHTML = vagasFiltradas.map(v => `
    <div class="vaga-card" data-id="${v.id}">
      <h2 class="vaga-titulo">${v.titulo}</h2>
      <p class="vaga-empresa">${v.empresa}</p>
      <div class="vaga-tags">${v.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <p class="vaga-desc">${v.desc}</p>
      <div class="vaga-botoes">
        <button class="btn btn-salvar" onclick="salvarVaga('${v.id}')">🤍 Salvar</button>
        <button class="btn btn-detalhes" onclick="verDetalhes('${v.id}')">👁️ Detalhes</button>
        <button class="btn btn-aplicar" onclick="alert('Em breve!')">🚀 Aplicar</button>
      </div>
    </div>
  `).join('');
  document.getElementById('contador').textContent = `${vagasFiltradas.length} missões`;
  carregarSalvas();
}

function salvarVaga(id) {
  let salvas = JSON.parse(localStorage.getItem('orbitdev_salvas')) || [];
  const btn = document.querySelector(`[data-id="${id}"] .btn-salvar`);
  if (salvas.includes(id)) {
    salvas = salvas.filter(i => i !== id);
    btn.innerHTML = '🤍 Salvar'; btn.classList.remove('salvo');
  } else {
    salvas.push(id);
    btn.innerHTML = '❤️ Salvo'; btn.classList.add('salvo');
  }
  localStorage.setItem('orbitdev_salvas', JSON.stringify(salvas));
}

function carregarSalvas() {
  const salvas = JSON.parse(localStorage.getItem('orbitdev_salvas')) || [];
  salvas.forEach(id => {
    const btn = document.querySelector(`[data-id="${id}"] .btn-salvar`);
    if(btn) { btn.innerHTML = '❤️ Salvo'; btn.classList.add('salvo'); }
  });
}

function filtrarVagas(tipo) {
  document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('ativo'));
  event.target.classList.add('ativo');
  document.getElementById('busca').value = '';
  
  if (tipo === 'todas') {
    vagasFiltradas = [...vagas];
  } else {
    vagasFiltradas = vagas.filter(v => v.tipo.includes(tipo));
  }
  renderizarVagas();
}

function buscarVagas() {
  const termo = document.getElementById('busca').value.toLowerCase();
  if (termo === '') {
    vagasFiltradas = [...vagas];
  } else {
    vagasFiltradas = vagas.filter(v => 
      v.titulo.toLowerCase().includes(termo) || 
      v.empresa.toLowerCase().includes(termo) ||
      v.desc.toLowerCase().includes(termo) ||
      v.tags.some(t => t.toLowerCase().includes(termo))
    );
  }
  document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('ativo'));
  renderizarVagas();
}

function limparFiltros() {
  document.getElementById('busca').value = '';
  document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('ativo'));
  document.querySelector('.btn-filtro').classList.add('ativo');
  vagasFiltradas = [...vagas];
  renderizarVagas();
}

function verDetalhes(id) {
  const vaga = vagas.find(v => v.id === id);
  document.getElementById('modal-info').innerHTML = `
    <h2>${vaga.titulo}</h2>
    <h3 style="color: #b892ff; margin: 10px 0;">${vaga.empresa}</h3>
    <div class="vaga-tags" style="margin: 20px 0;">${vaga.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    <p style="line-height: 1.8;">${vaga.descCompleta}</p>
    <button class="btn btn-aplicar" style="margin-top: 20px;" onclick="alert('Em breve!')">🚀 Aplicar pra essa missão</button>
  `;
  document.getElementById('modal').style.display = 'block';
}

function fecharModal() { document.getElementById('modal').style.display = 'none'; }

function trocarTema() {
  const tema = document.body.dataset.tema === 'claro' ? 'escuro' : 'claro';
  document.body.dataset.tema = tema;
  document.querySelector('.tema-btn').textContent = tema === 'claro' ? '☀️' : '🌙';
  localStorage.setItem('orbitdev_tema', tema);
}

window.onload = () => {
  const temaSalvo = localStorage.getItem('orbitdev_tema') || 'escuro';
  document.body.dataset.tema = temaSalvo;
  document.querySelector('.tema-btn').textContent = temaSalvo === 'claro' ? '☀️' : '🌙';
  renderizarVagas();
};
