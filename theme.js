const themes = {
  scarlet: { '--color-primary': '#ffc7cb', '--color-accent': '#c08090', '--color-text-dark': '#8b414a', '--color-text-deeper': '#2a1015', '--color-strip-bg': '#fff8f8', '--color-border': '#e0d0d2', '--color-author-bg': 'rgba(42, 16, 21, 0.7)', '--color-author-text': '#f5dde2', '--font-family': 'Times New Roman' },
  sakura: { '--color-primary': '#fde8f5', '--color-accent': '#d080b0', '--color-text-dark': '#9d2f77', '--color-text-deeper': '#3a0a30', '--color-strip-bg': '#fef0fa', '--color-border': '#e8c0d8', '--color-author-bg': 'rgba(60, 10, 48, 0.7)', '--color-author-text': '#fde8f5', '--bg-image': 'url("bg/sakuraBG.png")', '--font-family': 'Fredoka' },
  eientei: { '--color-primary': '#d8e8c0', '--color-accent': '#7090a0', '--color-text-dark': '#498354', '--color-text-deeper': '#0a2010', '--color-strip-bg': '#f0f5ec', '--color-border': '#b8d0b8', '--color-author-bg': 'rgba(10, 32, 16, 0.7)', '--color-author-text': '#e8f5e8', '--font-family': 'Fredoka' },
  sanzu: { '--color-primary': '#c8d8f0', '--color-accent': '#6080c0', '--color-text-dark': '#2c47a0', '--color-text-deeper': '#0a1030', '--color-strip-bg': '#f0f4fc', '--color-border': '#b0c8e8', '--color-author-bg': 'rgba(10, 16, 48, 0.7)', '--color-author-text': '#e8eef8', '--font-family': 'Fredoka' },
  moriya: { '--color-primary': '#b8edc8', '--color-accent': '#009933', '--color-text-dark': '#006622', '--color-text-deeper': '#002b12', '--color-strip-bg': '#f0faf2', '--color-border': '#a8d9b5', '--color-author-bg': 'rgba(0, 43, 18, 0.75)', '--color-author-text': '#e0f7e7', '--bg-image': 'url("bg/sanaeBG.png")', '--font-family': 'Arial' },
  fusion: { '--color-primary': '#ff9933', '--color-accent': '#804d1a', '--color-text-dark': '#7a3a00', '--color-text-deeper': '#3d1a00', '--color-strip-bg': '#fff4e6', '--color-border': '#e8a870', '--color-author-bg': 'rgba(61, 26, 0, 0.75)', '--color-author-text': '#ffe8cc', '--font-family': 'Fredoka' },
  myouren: { '--color-primary': '#660066', '--color-accent': '#792079', '--color-text-dark': '#ffd633', '--color-text-deeper': '#8c408c', '--color-strip-bg': '#fff4e6', '--color-border': '#4c004c', '--color-author-bg': 'rgb(255, 204, 0, 0.75)', '--color-author-text': '#ffcc00', '--font-family': 'Fredoka' },
  shotoku: { '--color-primary': '#ffd633', '--color-accent': '#9900cc', '--color-text-dark': '#ffd633', '--color-text-deeper': '#bfa126', '--color-strip-bg': '#660066', '--color-border': '#eac42f', '--color-author-bg': 'rgb(255, 204, 0, 0.75)', '--color-author-text': '#ffcc00', '--font-family': 'Fredoka' }
};

const dotStyles = document.createElement('style');
dotStyles.textContent = Object.entries(themes).map(([name, vars]) =>
  `.theme-dot[data-theme="${name}"].active { box-shadow: 0 0 0 2px ${vars['--color-border']}; }`
).join('\n');
document.head.appendChild(dotStyles);

function applyTheme(name) {
  const t = themes[name];
  if (!t) return;
  document.documentElement.style.removeProperty('--bg-image');
  Object.entries(t).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  document.querySelectorAll('.theme-dot').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === name);
  });
  localStorage.setItem('theme', name);
}

applyTheme(localStorage.getItem('theme') || 'scarlet');

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme') || 'scarlet');
  document.querySelectorAll('.theme-dot').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
});
