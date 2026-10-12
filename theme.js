const themes = {
  scarlet: { '--color-primary': '#ffc7cb', '--color-accent': '#c08090', '--color-text-dark': '#8b414a', '--color-text-deeper': '#2a1015', '--color-strip-bg': '#fff8f8', '--color-border': '#e0d0d2', '--color-author-bg': 'rgba(42, 16, 21, 0.7)', '--color-author-text': '#f5dde2' },
  sakura: { '--color-primary': '#fde8f5', '--color-accent': '#d080b0', '--color-text-dark': '#9d2f77', '--color-text-deeper': '#3a0a30', '--color-strip-bg': '#fef0fa', '--color-border': '#e8c0d8', '--color-author-bg': 'rgba(60, 10, 48, 0.7)', '--color-author-text': '#fde8f5' },
  eientei: { '--color-primary': '#d8e8c0', '--color-accent': '#7090a0', '--color-text-dark': '#498354', '--color-text-deeper': '#0a2010', '--color-strip-bg': '#f0f5ec', '--color-border': '#b8d0b8', '--color-author-bg': 'rgba(10, 32, 16, 0.7)', '--color-author-text': '#e8f5e8' },
  sanzu: { '--color-primary': '#c8d8f0', '--color-accent': '#6080c0', '--color-text-dark': '#2c47a0', '--color-text-deeper': '#0a1030', '--color-strip-bg': '#f0f4fc', '--color-border': '#b0c8e8', '--color-author-bg': 'rgba(10, 16, 48, 0.7)', '--color-author-text': '#e8eef8' },
  moriya: { '--color-primary': '#b8edc8', '--color-accent': '#009933', '--color-text-dark': '#006622', '--color-text-deeper': '#002b12', '--color-strip-bg': '#f0faf2', '--color-border': '#a8d9b5', '--color-author-bg': 'rgba(0, 43, 18, 0.75)', '--color-author-text': '#e0f7e7' },
};

function applyTheme(name) {
  const t = themes[name];
  if (!t) return;
  Object.entries(t).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  document.querySelectorAll('.theme-dot').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === name);
  });
  if(t == sakura)
  {
  document.getElementById(mains).style.backgroundImage = "url('bg/sakuraBG.png')";
  }
  localStorage.setItem('theme', name);
}

applyTheme(localStorage.getItem('theme') || 'scarlet');

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme') || 'scarlet');
  document.querySelectorAll('.theme-dot').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
});
