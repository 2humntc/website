let touhouEvents = {};
let meetings = {};

async function loadEvents() {
  try {
    const res = await fetch('./touhou_days.json');
    touhouEvents = await res.json();
  } catch (e) {
    console.error('Failed to load touhou_days.json', e);
  }
  renderCalendar(currentYear, currentMonth);
}

function renderCalendar(year, month) {
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const cal = document.getElementById('touhou-calendar');
  if (!cal) return;

  let html = `
    <div class="cal-header">
      <button class="cal-nav-btn" onclick="changeMonth(-1)">✦</button>
      <span class="cal-title">${monthNames[month]} ${year}</span>
      <button class="cal-nav-btn" onclick="changeMonth(1)">✦</button>
    </div>
    <div class="cal-grid">
      <div class="cal-day-name">Sun</div>
      <div class="cal-day-name">Mon</div>
      <div class="cal-day-name">Tue</div>
      <div class="cal-day-name">Wed</div>
      <div class="cal-day-name">Thu</div>
      <div class="cal-day-name">Fri</div>
      <div class="cal-day-name">Sat</div>
  `;

  for (let i = 0; i < firstDay; i++) {
    html += `<div class="cal-cell empty"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${month + 1}-${d}`;
    const events = touhouEvents[key];
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    let classes = 'cal-cell';
    if (isToday) classes += ' today';
    if (events) classes += ' has-event';

    const tooltip = events ? events.map(e => e.name).join(', ') : '';

    html += `<div class="${classes}" title="${tooltip}" onclick="showDayEvents(${month + 1}, ${d})">
      <span class="cal-num">${d}</span>
      ${isToday ? `<span class="cal-dot">❤️</span>` : ''}
      ${!isToday && events ? `<span class="cal-dot">🎂</span>` : ''}
    </div>`;
  }

  html += `</div>`;

  const todayKey = `${today.getMonth() + 1}-${today.getDate()}`;
  const todayEvents = touhouEvents[todayKey];
  const todayDetailHtml = (todayEvents && month === today.getMonth() && year === today.getFullYear())
    ? `<strong>${today.getMonth() + 1}/${today.getDate()}</strong><br>` +
      todayEvents.map(e => `🎂 <b>${e.name}</b> — ${e.characters.join(', ')}`).join('<br>')
    : '';

  html += `<div id="cal-event-detail" class="cal-event-detail">${todayDetailHtml}</div>`;
  html += `<div class="cal-credit">Data: <a href="https://github.com/TouhouCalendar/TouhouCalendarBot" target="_blank">TouhouCalendarBot</a></div>`;

  cal.innerHTML = html;
}

function showDayEvents(month, day) {
  const key = `${month}-${day}`;
  const events = touhouEvents[key];
  const detail = document.getElementById('cal-event-detail');
  if (!detail) return;

  if (!events) {
    detail.innerHTML = '';
    return;
  }

  detail.innerHTML = `<strong>${month}/${day}</strong><br>` +
    events.map(e => `🎂 <b>${e.name}</b> — ${e.characters.join(', ')}`).join('<br>');
}

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function changeMonth(dir) {
  const cal = document.getElementById('touhou-calendar');
  cal.style.opacity = '0';
  cal.style.transform = dir > 0 ? 'translateX(-30px)' : 'translateX(30px)';
  setTimeout(() => {
    currentMonth += dir;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    if (currentMonth < 0)  { currentMonth = 11; currentYear--; }
    renderCalendar(currentYear, currentMonth);
    cal.style.transform = dir > 0 ? 'translateX(30px)' : 'translateX(-30px)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cal.style.opacity = '1';
        cal.style.transform = 'translateX(0)';
      });
    });
  }, 180);
}

document.addEventListener('DOMContentLoaded', () => {
  const cal = document.getElementById('touhou-calendar');
  if (cal) {
    cal.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
  }
  loadEvents();
});
