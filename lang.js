const SUPPORTED = ["en", "es", "cn"];
const DEFAULT_LANG = "en";
const HTML_LANG = { en: "en", es: "es", cn: "zh-CN" };

const LANG_DIR = new URL("lang/", document.currentScript.src).href;

const cache = {};

async function loadDict(code) {
  if (cache[code]) return cache[code];
  try {
    const res = await fetch(`${LANG_DIR}${code}.json`);
    if (!res.ok) console.warn(`[lang] could not load ${res.url} (HTTP ${res.status})`);
    cache[code] = res.ok ? await res.json() : {};
  } catch (e) {
    console.warn(`[lang] failed to load ${LANG_DIR}${code}.json. Opening the page from file:// blocks fetch(); use a local server.`, e);
    cache[code] = {};
  }
  return cache[code];
}

function applyTranslations(dict) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = dict[el.dataset.i18n];
    if (typeof v === "string") el.textContent = v;
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const v = dict[el.dataset.i18nHtml];
    if (typeof v === "string") el.innerHTML = v;
  });

  document.querySelectorAll("[data-i18n-random]").forEach(el => {
    const arr = dict[el.dataset.i18nRandom];
    if (Array.isArray(arr) && arr.length) {
      el.textContent = arr[Math.floor(Math.random() * arr.length)];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    el.dataset.i18nAttr.split(",").forEach(pair => {
      const [attr, key] = pair.split(":").map(s => s.trim());
      if (typeof dict[key] === "string") el.setAttribute(attr, dict[key]);
    });
  });

  const titleKey = document.documentElement.dataset.title;
  const t = titleKey && dict[titleKey];
  if (t) document.title = Array.isArray(t) ? t[Math.floor(Math.random() * t.length)] : t;
}

window.I18N = {};
window.t = key => window.I18N[key];

async function setLanguage(code) {
  if (!SUPPORTED.includes(code)) code = DEFAULT_LANG;
  const base = await loadDict(DEFAULT_LANG);
  const dict = code === DEFAULT_LANG ? base : { ...base, ...(await loadDict(code)) };
  window.I18N = dict;
  applyTranslations(dict);
  document.documentElement.lang = HTML_LANG[code] || code;
  try { localStorage.setItem("lang", code); } catch (e) {}
}

function detectLanguage() {
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("zh")) return "cn";
  if (nav.startsWith("es")) return "es";
  return DEFAULT_LANG;
}

function initLangMenu() {
  const btn = document.getElementById("lang-btn");
  const list = document.getElementById("lang-list");
  if (!btn || !list) return;

  btn.addEventListener("click", e => {
    e.stopPropagation();
    const open = list.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  list.querySelectorAll("button[data-lang]").forEach(b => {
    b.addEventListener("click", () => {
      setLanguage(b.dataset.lang);
      list.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", () => list.classList.remove("open"));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") list.classList.remove("open");
  });
}

initLangMenu();
setLanguage(detectLanguage());