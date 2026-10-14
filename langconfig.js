const lang = {
  spain: {"Bienvenido al Club de Touhou de UMN - Twin Cities. Aún no oficial, pero muy real. LARPers y recién llegados son bienvenidos — Todos empezamos en algún lugar!"},
  china: {"歡迎光臨 俱樂部的東方明尼苏达大学,不官方, 可是非常真.欢迎新人新人欢迎! 人人開始某處"},

};

function setLang(name) {
  const t = lang[name];
  if (!t) return;
  document.getElementById('lange').innerHTML = lang[0];
  localStorage.lang('theme', name);
}

