
    const NORMAL_MIN = 7 * 60 + 45;
    const STORAGE_KEY = 'fleksitid_entries';
    const DAYS = ['søn','man','tir','ons','tor','fre','lør'];

    let entries = [];

    function load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) entries = JSON.parse(raw);
      } catch(e) { entries = []; }
    }

    function save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    function toMin(t) {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    }

    function fmtFlex(m) {
      const sign = m < 0 ? '-' : '+';
      const abs = Math.abs(m);
      const h = Math.floor(abs / 60);
      const min = abs % 60;
      if (h === 0) return sign + min + 'min';
      return sign + h + 't ' + String(min).padStart(2,'0') + 'min';
    }

    function fmtWorked(m) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      return h + 't ' + String(min).padStart(2,'0') + 'min';
    }

    function fmtDate(d) {
      const dt = new Date(d + 'T12:00:00');
      return DAYS[dt.getDay()] + ' ' + dt.getDate() + '.' + String(dt.getMonth()+1).padStart(2,'0') + '.' + dt.getFullYear();
    }

    function addEntry() {
      const date = document.getElementById('inp-date').value;
      const start = document.getElementById('inp-start').value;
      const end = document.getElementById('inp-end').value;
      const brk = parseInt(document.getElementById('inp-break').value) || 0;

      if (!date || !start || !end) { alert('Fyll inn dato, start og slutt.'); return; }
      if (entries.find(e => e.date === date)) { alert('Denne datoen er allerede registrert.'); return; }

      const worked = toMin(end) - toMin(start) - brk;
      if (worked <= 0) { alert('Sluttid må være etter starttid minus pause.'); return; }

      entries.push({ date, start, end, brk, worked });
      entries.sort((a, b) => a.date.localeCompare(b.date));
      save();
      render();

      // Advance date to next weekday
      const dt = new Date(date + 'T12:00:00');
      dt.setDate(dt.getDate() + (dt.getDay() === 5 ? 3 : dt.getDay() === 6 ? 2 : 1));
      document.getElementById('inp-date').value = dt.toISOString().slice(0,10);
    }

    function removeEntry(i) {
      if (!confirm('Slett denne dagen?')) return;
      entries.splice(i, 1);
      save();
      render();
    }

    function render() {
      const tbody = document.getElementById('tbody');
      const empty = document.getElementById('empty-msg');

      if (entries.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
        document.getElementById('stat-flex').textContent = '–';
        document.getElementById('stat-flex').className = 'stat-value';
        document.getElementById('stat-days').textContent = '0';
        document.getElementById('stat-avg').textContent = '–';
        document.getElementById('stat-avg').className = 'stat-value';
        const info = document.getElementById('info-bar');
        info.textContent = 'Ingen dager registrert ennå.';
        info.className = 'info-bar';
        return;
      }

      empty.style.display = 'none';
      let totalFlex = 0;
      let html = '';

      entries.forEach((e, i) => {
        const flex = e.worked - NORMAL_MIN;
        totalFlex += flex;
        const cls = flex > 0 ? 'plus' : flex < 0 ? 'minus' : 'zero';
        html += `<tr>
          <td>${fmtDate(e.date)}</td>
          <td>${e.start}</td>
          <td>${e.end}</td>
          <td>${e.brk} min</td>
          <td>${fmtWorked(e.worked)}</td>
          <td><span class="badge ${cls}">${fmtFlex(flex)}</span></td>
          <td><button class="btn-del" onclick="removeEntry(${i})">✕</button></td>
        </tr>`;
      });

      tbody.innerHTML = html;

      const absF = Math.abs(totalFlex);
      const fh = Math.floor(absF / 60);
      const fm = absF % 60;
      const flexEl = document.getElementById('stat-flex');
      flexEl.textContent = fmtFlex(totalFlex);
      flexEl.className = 'stat-value ' + (totalFlex >= 0 ? 'plus' : 'minus');

      document.getElementById('stat-days').textContent = entries.length;

      const avg = Math.round(totalFlex / entries.length);
      const avgEl = document.getElementById('stat-avg');
      avgEl.textContent = fmtFlex(avg);
      avgEl.className = 'stat-value ' + (avg >= 0 ? 'plus' : 'minus');

      const info = document.getElementById('info-bar');
      if (totalFlex > 0) {
        info.textContent = `Du har ${fh}t ${fm}min i pluss — du kan gå tilsvarende tidligere enn normalt.`;
        info.className = 'info-bar plus';
      } else if (totalFlex < 0) {
        info.textContent = `Du er ${fh}t ${fm}min i minus — du må jobbe inn dette for å gå i null.`;
        info.className = 'info-bar minus';
      } else {
        info.textContent = 'Du er akkurat i null. Ingen fleksitid oppspart eller skyldig.';
        info.className = 'info-bar';
      }
    }

    // Set default date to today
    const today = new Date();
    document.getElementById('inp-date').value = today.toISOString().slice(0, 10);

    load();
    render();
  