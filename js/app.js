import { calcularTMB, calcularGET, calcularMacros } from './modules/macros.js';
import { calcularGorduraNavy } from './modules/navy.js';

// Alternância de Abas
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Exibição condicional do campo de quadril para mulheres no US Navy
const selectSexoNavy = document.getElementById('sexo-navy');
const grupoQuadril = document.getElementById('grupo-quadril');

selectSexoNavy.addEventListener('change', (e) => {
  grupoQuadril.style.display = e.target.value === 'f' ? 'flex' : 'none';
});

// Manipulação do Formulário de Macros & TDEE
document.getElementById('form-macros').addEventListener('submit', (e) => {
  e.preventDefault();

  const sexo = document.getElementById('sexo-macro').value;
  const idade = parseFloat(document.getElementById('idade-macro').value);
  const peso = parseFloat(document.getElementById('peso-macro').value);
  const altura = parseFloat(document.getElementById('altura-macro').value);
  const atividade = parseFloat(document.getElementById('atividade-macro').value);
  const balanco = parseFloat(document.getElementById('objetivo-macro').value);

  const tmb = calcularTMB(sexo, peso, altura, idade);
  const get = calcularGET(tmb, atividade);
  const metaCalorica = get + balanco;
  const macros = calcularMacros(peso, metaCalorica);

  document.getElementById('val-tmb').textContent = `${Math.round(tmb)} kcal`;
  document.getElementById('val-tdee').textContent = `${Math.round(get)} kcal`;
  document.getElementById('val-meta').textContent = `${Math.round(metaCalorica)} kcal`;

  document.getElementById('val-prot').textContent = `${macros.proteina.g}g`;
  document.getElementById('val-prot-kcal').textContent = `${macros.proteina.kcal} kcal`;

  document.getElementById('val-gord').textContent = `${macros.gordura.g}g`;
  document.getElementById('val-gord-kcal').textContent = `${macros.gordura.kcal} kcal`;

  document.getElementById('val-carb').textContent = `${macros.carboidrato.g}g`;
  document.getElementById('val-carb-kcal').textContent = `${macros.carboidrato.kcal} kcal`;

  document.getElementById('resultado-macros').classList.remove('hidden');
});

// Manipulação do Formulário US Navy
document.getElementById('form-navy').addEventListener('submit', (e) => {
  e.preventDefault();

  const sexo = document.getElementById('sexo-navy').value;
  const altura = parseFloat(document.getElementById('altura-navy').value);
  const pescoco = parseFloat(document.getElementById('pescoco-navy').value);
  const cintura = parseFloat(document.getElementById('cintura-navy').value);
  const quadril = parseFloat(document.getElementById('quadril-navy')?.value || 0);

  const bf = calcularGorduraNavy(sexo, altura, pescoco, cintura, quadril);

  document.getElementById('val-bf').textContent = `${bf.toFixed(1)}%`;
  document.getElementById('resultado-navy').classList.remove('hidden');
});