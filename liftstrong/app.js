// ===== STORAGE =====
var DB = {
  get: function(k, d) {
    try { var v = localStorage.getItem('ls_' + k); return v !== null ? JSON.parse(v) : d; } catch(e) { return d; }
  },
  set: function(k, v) {
    try { localStorage.setItem('ls_' + k, JSON.stringify(v)); } catch(e) {}
  }
};

var uProgs = DB.get('programs', []);
var hist   = DB.get('history', []);
var prs    = DB.get('prs', {});
var aw = null, wt = null, wst = null, curPid = null, curPhi = 0;
var rtIv = null, rtTot = 120, rtRem = 120, rtRun = false, rtLast = 120;

function allProgs() {
  var del = DB.get('del_bi', []);
  var list = [];
  var builtins = [
    {id:'stronglifts-5x5-builtin',            prog:strongLifts5x5Data},
    {id:'maps-symmetry-builtin',              prog:MAPS},
    {id:'maps-anabolic-builtin',              prog:MAPS_ANABOLIC},
    {id:'maps-anabolic-at-home-builtin',      prog:mapsAnabolicAtHomeData},
    {id:'maps-anabolic-advanced-builtin',     prog:mapsAnabolicAdvancedData},
    {id:'maps-performance-builtin',           prog:MAPS_PERFORMANCE},
    {id:'maps-performance-at-home-builtin',   prog:mapsPerformanceAtHomeData},
    {id:'maps-performance-advanced-builtin',  prog:mapsPerformanceAdvancedData},
    {id:'maps-aesthetic-builtin',             prog:MAPS_AESTHETIC},
    {id:'maps-aesthetic-at-home-builtin',     prog:mapsAestheticAtHomeData},
    {id:'maps-muscle-mommy-builtin',          prog:MAPS_MUSCLE_MOMMY},
    {id:'maps-40plus-builtin',                prog:maps40PlusData},
    {id:'maps-anywhere-builtin',              prog:mapsAnywhereData},
    {id:'maps-prime-builtin',                 prog:MAPS_PRIME},
    {id:'maps-prime-pro-builtin',             prog:MAPS_PRIME_PRO},
    {id:'maps-hiit-builtin',                  prog:mapsHIITData},
    {id:'maps-split-builtin',                 prog:mapsSplitData},
    {id:'maps-split-at-home-builtin',         prog:mapsSplitAtHomeData},
    {id:'maps-strong-builtin',                prog:MAPS_STRONG},
    {id:'maps-starter-builtin',               prog:mapsStarterData},
    {id:'maps-ped-builtin',                   prog:mapsPEDData},
    {id:'maps-ocr-builtin',                   prog:mapsOCRData},
    {id:'maps-powerlift-builtin',             prog:MAPS_POWERLIFT},
    {id:'maps-st-builtin',                    prog:MAPS_ST},
    {id:'maps-resistance-builtin',            prog:mapsResistanceData},
    {id:'maps-bands-builtin',                 prog:mapsBandsData},
    {id:'maps-cardio-builtin',                prog:MAPS_CARDIO},
    {id:'maps-oldtime-strength-builtin',      prog:mapsOldtimeStrengthData},
    {id:'maps-transform-builtin',             prog:MAPS_TRANSFORM},
    {id:'maps-longevity-builtin',             prog:mapsLongevityData},
    {id:'maps-glp1-builtin',                  prog:mapsGLP1Data},
    {id:'maps-great-eight-builtin',           prog:mapsGreatEightData},
    {id:'maps-ppl-builtin',                   prog:mapsPPLData},
    {id:'maps-15-minutes-builtin',            prog:MAPS_15_MINUTES},
    {id:'maps-15-advanced-builtin',           prog:maps15AdvancedData},
    {id:'maps-15-performance-builtin',             prog:maps15PerformanceData},
    {id:'maps-15-performance-advanced-builtin',    prog:maps15PerformanceAdvancedData},
    {id:'maps-15-muscle-mommy-builtin',            prog:maps15MuscleMommyData},
    {id:'maps-15-muscle-mommy-advanced-builtin',   prog:maps15MuscleMommyAdvancedData},
    {id:'maps-15-strong-builtin',                  prog:maps15StrongData},
    {id:'maps-15-strong-advanced-builtin',         prog:maps15StrongAdvancedData},
    {id:'maps-15-forty-plus-builtin',              prog:maps15FortyPlusData},
    {id:'maps-15-forty-plus-advanced-builtin',     prog:maps15FortyPlusAdvancedData},
    {id:'maps-15-powerlift-builtin',               prog:maps15PowerliftData},
    {id:'maps-15-powerlift-advanced-builtin',      prog:maps15PowerliftAdvancedData},
    {id:'maps-15-symmetry-builtin',                prog:maps15SymmetryData},
    {id:'maps-15-symmetry-advanced-builtin',       prog:maps15SymmetryAdvancedData},
    {id:'maps-abs-mod-builtin',               prog:mapsAbsModData},
    {id:'maps-butt-mod-builtin',              prog:mapsButtModData},
    {id:'maps-back-mod-builtin',              prog:mapsBackModData},
    {id:'maps-shoulder-mod-builtin',          prog:mapsShoulderModData},
    {id:'maps-chest-mod-builtin',             prog:mapsChestModData},
    {id:'maps-biceps-mod-builtin',            prog:mapsBicepsModData},
    {id:'maps-triceps-mod-builtin',           prog:mapsTricepsModData},
    {id:'maps-hamstrings-mod-builtin',        prog:mapsHamstringsModData},
    {id:'maps-hip-pain-mod-builtin',          prog:mapsHipPainModData},
    {id:'maps-quads-mod-builtin',             prog:mapsQuadsModData},
    {id:'maps-calves-mod-builtin',            prog:mapsCalvesModData},
    {id:'no-bs-6pack-builtin',                prog:NO_BS_6PACK},
    {id:'kb4a-builtin',                       prog:KB4A},
    {id:'landmine4aesthetics-builtin',        prog:landmine4AestheticsData}
  ];
  builtins.forEach(function(b){
    if (del.indexOf(b.id) === -1) list.push(b.prog);
  });
  return list.concat(uProgs);
}

// ===== ROUTING =====
function showView(id) {
  var views = document.querySelectorAll('.view');
  for (var i = 0; i < views.length; i++) views[i].classList.remove('active');
  var el = document.getElementById('view-' + id);
  if (el) el.classList.add('active');

  // mobile tabs
  var tabs = document.querySelectorAll('.tab');
  for (var j = 0; j < tabs.length; j++) {
    tabs[j].classList.toggle('active', tabs[j].getAttribute('data-view') === id);
  }
  // desktop nav
  var nds = document.querySelectorAll('.nd');
  for (var k = 0; k < nds.length; k++) {
    nds[k].classList.toggle('active', nds[k].getAttribute('data-view') === id);
  }

  window.scrollTo(0, 0);
  if (id === 'dashboard') rDash();
  if (id === 'programs')  rProgs();
  if (id === 'history')   rHist();
  if (id === 'progress')  rProg();
}

// wire up tab buttons and desktop nav
document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) {
    (function(btn) {
      btn.addEventListener('click', function() { showView(btn.getAttribute('data-view')); });
    })(tabs[i]);
  }
  var nds = document.querySelectorAll('.nd');
  for (var j = 0; j < nds.length; j++) {
    (function(btn) {
      btn.addEventListener('click', function() { showView(btn.getAttribute('data-view')); });
    })(nds[j]);
  }
  rDash();
});

// ===== DASHBOARD =====
function rDash() {
  var h = new Date().getHours();
  var g = document.getElementById('greet');
  if (g) g.textContent = (h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening') + ', athlete';

  document.getElementById('st').textContent = hist.length;
  var now = new Date(), ws = new Date(now);
  ws.setDate(now.getDate() - now.getDay()); ws.setHours(0,0,0,0);
  document.getElementById('sw').textContent = hist.filter(function(w) { return new Date(w.date) >= ws; }).length;
  var tv = hist.reduce(function(s, w) { return s + (w.volume || 0); }, 0);
  document.getElementById('sv').textContent = tv >= 1000 ? (tv/1000).toFixed(1) + 'k' : '' + tv;

  var streak = 0, tod = new Date(); tod.setHours(0,0,0,0);
  var srt = hist.slice().sort(function(a,b) { return new Date(b.date) - new Date(a.date); });
  if (srt.length) {
    var ld = new Date(srt[0].date); ld.setHours(0,0,0,0);
    if ((tod - ld) / 86400000 <= 1) {
      streak = 1; var pv = ld;
      for (var i = 1; i < srt.length; i++) {
        var dd = new Date(srt[i].date); dd.setHours(0,0,0,0);
        if (Math.round((pv - dd) / 86400000) === 1) { streak++; pv = dd; } else break;
      }
    }
  }
  document.getElementById('ss').textContent = streak;

  var rl = document.getElementById('d-recent');
  if (!hist.length) {
    rl.innerHTML = '<div class="empty"><div class="eico">&#127947;</div><div class="esub">No workouts yet. Start a program below.</div></div>';
  } else {
    rl.innerHTML = hist.slice().sort(function(a,b){ return new Date(b.date)-new Date(a.date); }).slice(0,5).map(function(w) {
      return '<button class="row-item" onclick="showView(\'history\')">'
        + '<div><div class="row-name">' + esc(w.name) + '</div>'
        + '<div class="row-meta">' + (w.exercises && w.exercises.length || 0) + ' exercises &middot; ' + fv(w.volume) + ' lbs</div></div>'
        + '<div style="text-align:right;flex-shrink:0"><div style="font-size:11px;color:var(--t3)">' + fd(w.date) + '</div>'
        + '<div style="font-size:11px;color:var(--t2)">' + fdur(w.duration) + '</div></div>'
        + '</button>';
    }).join('');
  }

  var pl = document.getElementById('d-progs');
  var pg = allProgs();
  var dashQ = (document.getElementById('dash-search') && document.getElementById('dash-search').value || '').toLowerCase().trim();
  if (dashQ) pg = pg.filter(function(p){ return p.name.toLowerCase().indexOf(dashQ) !== -1 || (p.description || '').toLowerCase().indexOf(dashQ) !== -1; });
  if (!pg.length) {
    pl.innerHTML = '<div class="empty"><div class="esub">' + (dashQ ? 'No programs match "' + esc(dashQ) + '"' : 'No programs yet') + '</div></div>';
  } else {
    pl.innerHTML = pg.map(function(p) {
      var phaseStr = p.type === 'corrective' ? 'Corrective' : ((p.phases && p.phases.length || 0) + ' phases');
      return '<button class="row-item" onclick="openProg(\'' + p.id + '\')">'
        + '<div><div class="row-name">' + esc(p.name) + '</div>'
        + '<div class="row-meta">' + phaseStr + ' &middot; ' + (p.duration || '') + '</div></div>'
        + '<span class="chip cy">' + (p.difficulty || 'Int') + '</span>'
        + '</button>';
    }).join('');
  }
}

// ===== PROGRAMS LIST =====
function rProgs() {
  var pl = document.getElementById('prog-list');
  var pg = allProgs();
  var q = (document.getElementById('prog-search') && document.getElementById('prog-search').value || '').toLowerCase().trim();
  if (q) pg = pg.filter(function(p){ return p.name.toLowerCase().indexOf(q) !== -1 || (p.description || '').toLowerCase().indexOf(q) !== -1; });
  var empty = document.getElementById('prog-empty');
  empty.style.display = pg.length ? 'none' : 'flex';
  empty.querySelector && (empty.querySelector('.esub') || {}).textContent && (empty.querySelector('.esub').textContent = q ? 'No programs match "' + q + '"' : 'Upload a PDF or create a program manually');
  if (!pg.length) { pl.innerHTML = ''; return; }
  pl.innerHTML = pg.map(function(p) {
    var pc = p.phases && p.phases.length || 0;
    var dots = '';
    for (var i = 0; i < Math.max(pc, 4); i++) dots += '<span class="pdot' + (i < pc ? ' on' : '') + '"></span>';
    var ban = p.source === 'builtin' ? 'bm' : p.source === 'ai' ? 'bai' : 'bdef';
    var typeTag = p.type === 'corrective' ? '<span class="chip" style="background:rgba(125,200,255,.15);color:#7dc8ff;border:1px solid rgba(125,200,255,.25)">&#10039; Corrective</span>' : '';
    return '<button class="prog-card" onclick="openProg(\'' + p.id + '\')">'
      + '<span class="prog-banner ' + ban + '"></span>'
      + '<div class="prog-body">'
      + '<div class="prog-title">' + esc(p.name) + '</div>'
      + '<div class="prog-desc">' + esc(p.description || '') + '</div>'
      + '<div class="prog-tags">'
      + (p.difficulty ? '<span class="prog-tag">' + esc(p.difficulty) + '</span>' : '')
      + (p.duration ? '<span class="prog-tag">' + esc(p.duration) + '</span>' : '')
      + (pc ? '<span class="prog-tag">' + pc + ' Phase' + (pc > 1 ? 's' : '') + '</span>' : '')
      + typeTag
      + (p.source === 'builtin' ? '<span class="chip cg">&#10003; Built-in</span>' : '')
      + (p.source === 'ai' ? '<span class="chip cb">AI Import</span>' : '')
      + '</div></div>'
      + '<div class="prog-foot"><div class="pdots">' + dots + '</div><span class="prog-arrow">View &rarr;</span></div>'
      + '</button>';
  }).join('');
}

// ===== PROGRAM DETAIL =====
function openProg(id) {
  curPid = id;
  var p = allProgs().filter(function(x){ return x.id === id; })[0];
  if (!p) return;
  document.getElementById('pd-title').textContent = p.name;
  document.getElementById('pd-desc').textContent = p.description || '';
  document.getElementById('pd-bc').textContent = p.name;
  if (p.type === 'corrective') {
    document.getElementById('phase-scroll').innerHTML = '';
    document.getElementById('pd-body').innerHTML = renderCorrective(p);
    showView('program-detail');
    return;
  }
  var nav = document.getElementById('phase-scroll');
  nav.innerHTML = (p.phases || []).map(function(ph, i) {
    return '<button class="ptab' + (i === 0 ? ' active' : '') + '" onclick="selPh(' + i + ')">' + esc(ph.name) + '</button>';
  }).join('');
  curPhi = 0;
  renderPh(p, 0);
  showView('program-detail');
}

function selPh(i) {
  curPhi = i;
  var tabs = document.querySelectorAll('.ptab');
  for (var j = 0; j < tabs.length; j++) tabs[j].classList.toggle('active', j === i);
  var p = allProgs().filter(function(x){ return x.id === curPid; })[0];
  if (p) renderPh(p, i);
}

function renderPh(p, pi) {
  var ph = p.phases && p.phases[pi];
  var body = document.getElementById('pd-body');
  if (!ph) { body.innerHTML = '<div class="empty"><div class="esub">No data</div></div>'; return; }
  var html = '';
  if (ph.objective || ph.length) {
    html += '<div class="phase-info">';
    if (ph.objective) html += '<div><div class="pi-l">Objective</div><div class="pi-v">' + esc(ph.objective) + '</div></div>';
    if (ph.length)    html += '<div><div class="pi-l">Length</div><div class="pi-v">' + esc(ph.length) + '</div></div>';
    if (ph.sets)      html += '<div><div class="pi-l">Volume</div><div class="pi-v">' + esc(ph.sets) + ' x ' + esc(ph.reps || '—') + '</div></div>';
    if (ph.rest)      html += '<div><div class="pi-l">Rest</div><div class="pi-v">' + esc(ph.rest) + '</div></div>';
    if (ph.frequency) html += '<div><div class="pi-l">Schedule</div><div class="pi-v">' + esc(ph.frequency) + '</div></div>';
    html += '</div>';
  }
  (ph.weeks || []).forEach(function(w, wi) {
    html += '<div class="week-block">'
      + '<button class="week-hd" onclick="togW(this)">'
      + '<span class="week-title">' + esc(w.name || 'Week ' + (wi+1)) + '</span>'
      + '<span style="display:flex;align-items:center;gap:8px">'
      + '<span class="week-badge">' + (w.days && w.days.length || 0) + ' days</span>'
      + '<span class="week-arr">&#9660;</span>'
      + '</span></button>'
      + '<div class="week-body" style="display:none">';
    (w.days || []).forEach(function(d, di) { html += renderDay(d, di, p.id, pi, wi); });
    html += '</div></div>';
  });
  body.innerHTML = html;
}

function renderDay(day, di, pid, phi, wi) {
  var ec = day.exercises && day.exercises.length || 0;
  var tc = day.type === 'mobility' ? 'var(--acc3)' : day.type === 'trigger' ? 'var(--acc2)' : day.type === 'focus' ? 'var(--ok)' : 'var(--acc)';
  var tl = {workout:'Workout',mobility:'Mobility',trigger:'Trigger',focus:'Focus'}[day.type] || 'Workout';
  var html = '<div class="day-card">'
    + '<div class="day-hd" onclick="togD(this)">'
    + '<div style="flex:1;min-width:0">'
    + '<div style="display:flex;align-items:center;gap:7px">'
    + '<span class="day-dot" style="background-color:' + tc + '"></span>'
    + '<span class="day-name-txt">' + esc(day.name) + '</span>'
    + '</div>'
    + '<div class="day-meta">' + ec + ' exercise' + (ec !== 1 ? 's' : '') + ' &middot; <span style="color:' + tc + '">' + tl + '</span>' + (day.focus ? ' &middot; ' + esc(day.focus) : '') + '</div>'
    + '</div>'
    + '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:8px">'
    + '<button class="btn-p btn-xs" onclick="event.stopPropagation();startPW(\'' + pid + '\',' + phi + ',' + wi + ',' + di + ')">Start</button>'
    + '<span class="day-arr" style="color:var(--t3);font-size:11px">&#9660;</span>'
    + '</div></div>'
    + '<div class="day-body" style="display:none">';
  if (day.isFocus) {
    html += '<div class="focus-box"><div class="focus-lbl">&#127919; Choose Your Weak Point &mdash; 2-3 exercises x 15 reps</div><div class="focus-grid">';
    (day.focusCats || []).forEach(function(c) {
      html += '<div><div class="fc-n">' + esc(c.name) + '</div><div class="fc-i">' + esc(c.items) + '</div></div>';
    });
    html += '</div></div>';
  } else {
    (day.exercises || []).forEach(function(e) { html += renderER(e); });
  }
  html += '</div></div>';
  return html;
}

function renderER(e) {
  if (e.notes === 'separator') return '<div class="sep-row">' + esc(e.name) + '</div>';
  return '<div class="ex-row">'
    + '<div style="flex:1;min-width:0"><div class="ex-name">' + esc(e.name) + '</div>'
    + (e.notes && e.notes !== 'separator' ? '<div class="ex-note">' + esc(e.notes) + '</div>' : '')
    + '</div>'
    + '<div class="ex-badges"><span class="badge-s">' + esc(e.sets || '—') + 'x</span><span class="badge-r">' + esc(e.reps || '—') + '</span></div>'
    + '</div>';
}

// ===== CORRECTIVE PROGRAM RENDERING =====

// Storage keys for compass results
function cpKey(progId) { return 'compass_' + progId; }

function getCompassResults(progId) {
  return DB.get(cpKey(progId), {});
}
function setCompassResult(progId, zoneId, val) {
  var r = getCompassResults(progId);
  r[zoneId] = val; // 'pass', 'fail', or null
  DB.set(cpKey(progId), r);
}

function renderCorrective(p) {
  var c = p.corrective;
  if (!c) return '<div class="empty"><div class="esub">No corrective data</div></div>';
  if (c.program === 'prime') return renderPrime(p);
  if (c.program === 'prime-pro') return renderPrimePro(p);
  return '<div class="empty"><div class="esub">Unknown corrective type</div></div>';
}

// ---- MAPS PRIME ----
function renderPrime(p) {
  var c = p.corrective;
  var results = getCompassResults(p.id);
  var html = '<div class="corr-wrap">';

  // HOW TO USE banner
  html += '<div class="corr-banner">'
    + '<div class="corr-banner-title">&#127919; How This Program Works</div>'
    + '<div class="corr-banner-body">MAPS Prime is a movement prep program, not a workout. Each time you train: (1) do your <strong>Pre-Primer</strong> before your workout, (2) use <strong>Ignition Exercises</strong> before each major lift, and (3) do your <strong>Post-Primer</strong> after. On off days, add <strong>Fortification Sessions</strong> for any zones you failed. Start by taking the Compass Test below.</div>'
    + '</div>';

  // STEP 1: COMPASS TEST
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 1</span><span class="corr-sec-title">Compass Test — Pass/Fail Each Zone</span></div>';
  html += '<div class="corr-sec-body">';
  html += '<p class="corr-note">Watch the Zone Test coaching videos in your MAPS Prime portal before testing. Mark each zone Pass or Fail.</p>';

  c.compassZones.forEach(function(z) {
    var res = results[z.id] || null;
    html += '<div class="zone-card" id="zc-' + p.id + '-' + z.id + '">'
      + '<div class="zone-top">'
      + '<div class="zone-num">Zone ' + z.num + '</div>'
      + '<div class="zone-info"><div class="zone-name">' + esc(z.name) + '</div><div class="zone-area">' + esc(z.area) + '</div></div>'
      + '<div class="zone-pf">'
      + '<button class="pf-btn pf-pass' + (res === 'pass' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'pass\')">PASS</button>'
      + '<button class="pf-btn pf-fail' + (res === 'fail' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'fail\')">FAIL</button>'
      + '</div></div>'
      + '<div class="zone-detail">'
      + '<div class="zone-kp"><strong>Key Points:</strong> ' + esc(z.keyPoints) + '</div>'
      + (res === 'pass' ? '<div class="zone-result pass-result">&#10003; ' + esc(z.passDesc) + '</div>' : '')
      + (res === 'fail' ? '<div class="zone-result fail-result">&#9888; ' + esc(z.failDesc) + '</div>' : '')
      + '</div>'
      + '</div>';
  });
  html += '</div></div>';

  // STEP 2: PRE-PRIMER
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 2</span><span class="corr-sec-title">Pre-Primer Session <span class="corr-timing">8–15 min · Before your workout</span></span></div>';
  html += '<div class="corr-sec-body">';

  var anyResult = Object.keys(results).length > 0;
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test above to see your personalized Pre-Primer movements.</p>';
  } else {
    html += '<p class="corr-note">Perform 1–3 movements per zone. If you <strong>passed</strong> a zone: 1 movement. If you <strong>failed</strong>: 1–3 movements. Max 6 movements total. Spend 1–3 min each at low-to-moderate intensity.</p>';

    // Suggested sessions based on failures
    var failedZones = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    var passedZones = c.compassZones.filter(function(z){ return results[z.id] === 'pass'; });

    if (failedZones.length > 0) {
      html += '<div class="corr-subsec-lbl">&#128204; Suggested Sessions for Your Failed Zones</div>';
      failedZones.forEach(function(z) {
        var sugg = c.prePrimerSuggested['z' + z.num];
        if (!sugg) return;
        html += '<div class="prime-session-block">'
          + '<div class="prime-session-zone">Zone ' + z.num + ' — ' + esc(z.name) + '</div>';
        sugg.forEach(function(wk) {
          html += '<div class="prime-workout-row">'
            + '<span class="prime-wk-lbl">' + esc(wk.workout) + ':</span> '
            + wk.moves.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('');
          html += '</div>';
        });
        html += '</div>';
      });
    }

    if (passedZones.length > 0) {
      html += '<div class="corr-subsec-lbl" style="margin-top:12px">&#10003; Passed Zones — Pick 1 movement each</div>';
      passedZones.forEach(function(z) {
        var moves = c.prePrimerMovements['z' + z.num] || [];
        html += '<div class="prime-session-block">'
          + '<div class="prime-session-zone">Zone ' + z.num + ' — ' + esc(z.name) + '</div>'
          + '<div class="prime-move-grid">'
          + moves.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('')
          + '</div></div>';
      });
    }
  }
  html += '</div></div>';

  // STEP 3: IGNITION EXERCISES
  var allPass = c.compassZones.every(function(z){ return results[z.id] === 'pass'; });
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 3</span><span class="corr-sec-title">Ignition Exercises <span class="corr-timing">Before major lifts · Requires all 3 zones passed</span></span></div>';
  html += '<div class="corr-sec-body">';
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test to unlock Ignition Exercises.</p>';
  } else if (!allPass) {
    html += '<div class="corr-warning">&#9888; <strong>Not yet unlocked.</strong> Ignition Exercises require passing all 3 Compass Tests. Continue Pre-Primer and Fortification work until you pass all zones.</div>';
  } else {
    html += '<p class="corr-note">Perform 1–3 explosive reps before each major lift. Ramp up explosiveness each rep — do not max exert immediately. You are priming, not fatiguing.</p>';
    html += '<div class="ignition-grid">';
    c.ignitionExercises.forEach(function(ex) {
      html += '<div class="ignition-card">'
        + '<div class="ignition-name">' + esc(ex.name) + '</div>'
        + '<div class="ignition-when">' + esc(ex.when) + '</div>'
        + '</div>';
    });
    html += '</div>';
  }
  html += '</div></div>';

  // STEP 4: POST-PRIMER
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 4</span><span class="corr-sec-title">Post-Primer Session <span class="corr-timing">8–15 min · After your workout</span></span></div>';
  html += '<div class="corr-sec-body">';
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test above to see your Post-Primer movements.</p>';
  } else {
    html += '<p class="corr-note"><strong>Everyone:</strong> 1–3 Tension Poses total (not zone-specific). <strong>Failed zones:</strong> add 1–3 Foam Rolling and/or Static Stretches per failed zone (max 4 total). Hold Tension Poses 10–20 sec for 1–3 reps. Hold Foam Rolling / Static Stretches 20+ sec.</p>';

    // Tension poses - everyone
    html += '<div class="corr-subsec-lbl">Tension Poses (Everyone — 1–3 total)</div>';
    html += '<div class="prime-move-grid">';
    c.postPrimerMovements.tensionPoses.forEach(function(m){
      html += '<span class="prime-move">' + esc(m) + '</span>';
    });
    html += '</div>';

    // Foam rolling & static by zone
    var failedZ = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    if (failedZ.length > 0) {
      failedZ.forEach(function(z) {
        var zk = 'z' + z.num;
        var fr = c.postPrimerMovements.foamRolling[zk] || [];
        var ss = c.postPrimerMovements.staticStretching[zk] || [];
        html += '<div class="prime-session-block" style="margin-top:10px">'
          + '<div class="prime-session-zone">Zone ' + z.num + ' — ' + esc(z.name) + ' (Failed)</div>';
        if (fr.length) {
          html += '<div class="corr-subsec-lbl" style="margin:6px 0 4px">Foam Rolling</div>'
            + '<div class="prime-move-grid">' + fr.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('') + '</div>';
        }
        if (ss.length) {
          html += '<div class="corr-subsec-lbl" style="margin:6px 0 4px">Static Stretching</div>'
            + '<div class="prime-move-grid">' + ss.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('') + '</div>';
        }
        html += '</div>';
      });
    }
  }
  html += '</div></div>';

  // STEP 5: FORTIFICATION SESSIONS
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 5</span><span class="corr-sec-title">Fortification Sessions <span class="corr-timing">Off days · 1–3 sets · 8–12 reps</span></span></div>';
  html += '<div class="corr-sec-body">';
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test to see your Fortification Sessions.</p>';
  } else {
    var failedFort = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    if (failedFort.length === 0) {
      html += '<div class="corr-success">&#127881; You passed all zones! No Fortification Sessions needed. Keep checking in with the Compass Test periodically.</div>';
    } else {
      html += '<p class="corr-note">Add one Fortification Session per failed zone on your non-training days. Work only one zone per day. Form is paramount — go as light as needed. Once you pass a zone\'s Compass Test, drop that Fortification Session.</p>';
      failedFort.forEach(function(z) {
        var fs = c.fortificationSessions['z' + z.num];
        if (!fs) return;
        html += '<div class="fort-block">'
          + '<div class="fort-title">' + esc(fs.name) + '</div>'
          + '<div class="fort-spec">1–3 sets · 8–12 reps · 30–60 sec rest</div>';
        fs.exercises.forEach(function(ex) {
          html += renderER(ex);
        });
        html += '</div>';
      });
    }
  }
  html += '</div></div>';

  html += '</div>'; // corr-wrap
  return html;
}

// ---- MAPS PRIME PRO ----
function renderPrimePro(p) {
  var c = p.corrective;
  var results = getCompassResults(p.id);
  var html = '<div class="corr-wrap">';

  html += '<div class="corr-banner">'
    + '<div class="corr-banner-title">&#127919; How This Program Works</div>'
    + '<div class="corr-banner-body">MAPS Prime Pro targets 7 specific zones. For each zone you fail: do <strong>1 Repatterning Movement + 1 Tension Control Movement + 1 Active Control Movement</strong> per session. Sessions are <strong>1–10 minutes</strong> and should be done <strong>at least twice daily</strong> — frequency is the key to repatterning. Start with the Compass Test below.</div>'
    + '</div>';

  // COMPASS TEST
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 1</span><span class="corr-sec-title">Prime Pro Compass Test — 8 Tests, 7 Zones</span></div>';
  html += '<div class="corr-sec-body">';
  html += '<p class="corr-note">Watch all 8 coaching videos in your MAPS Prime Pro portal before testing. Mark each test Pass or Fail.</p>';

  c.compassZones.forEach(function(z) {
    var res = results[z.id] || null;
    html += '<div class="zone-card" id="zc-' + p.id + '-' + z.id + '">'
      + '<div class="zone-top">'
      + '<div class="zone-num">Zone ' + z.num + '</div>'
      + '<div class="zone-info"><div class="zone-name">' + esc(z.name) + '</div><div class="zone-area">' + esc(z.area) + '</div></div>'
      + '<div class="zone-pf">'
      + '<button class="pf-btn pf-pass' + (res === 'pass' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'pass\')">PASS</button>'
      + '<button class="pf-btn pf-fail' + (res === 'fail' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'fail\')">FAIL</button>'
      + '</div></div>'
      + '<div class="zone-detail">'
      + '<div class="zone-kp"><strong>Key Points:</strong> ' + esc(z.keyPoints) + '</div>'
      + (z.disclaimer ? '<div class="zone-disclaimer">&#9432; ' + esc(z.disclaimer) + '</div>' : '')
      + (res === 'pass' ? '<div class="zone-result pass-result">&#10003; ' + esc(z.passDesc) + '</div>' : '')
      + (res === 'fail' ? '<div class="zone-result fail-result">&#9888; ' + esc(z.failDesc) + '</div>' : '')
      + '</div>'
      + '</div>';
  });
  html += '</div></div>';

  // SESSION DESIGN
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 2</span><span class="corr-sec-title">Build Your Daily Sessions</span></div>';
  html += '<div class="corr-sec-body">';

  var anyResult = Object.keys(results).length > 0;
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test above to see your personalized session design.</p>';
  } else {
    var failedZones = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    if (failedZones.length === 0) {
      html += '<div class="corr-success">&#127881; Congratulations — you passed all 7 zones! Retest periodically to maintain your movement quality.</div>';
    } else {
      html += '<p class="corr-note">For each failed zone, perform <strong>1 Repatterning Movement + 1 Tension Control + 1 Active Control</strong>. Do this at least twice daily. Sessions should be 1–10 minutes. Focus on the most difficult movements first.</p>';

      failedZones.forEach(function(z) {
        var rp = c.repatterningMovements[z.id] || [];
        var cm = c.controlMovements[z.id] || {tension:[], active:[]};

        html += '<div class="pro-zone-block">'
          + '<div class="pro-zone-hd">Zone ' + z.num + ' — ' + esc(z.name) + ' <span class="pro-zone-area">(' + esc(z.area) + ')</span></div>'
          + '<div class="pro-zone-body">';

        // Repatterning
        html += '<div class="pro-move-group">'
          + '<div class="pro-move-type repat-type">&#128260; Repatterning Movement</div>'
          + '<div class="pro-move-type-sub">Choose 1 — practice the test movement pattern</div>';
        rp.forEach(function(m) {
          html += '<div class="pro-move-row"><span class="pro-move-name">' + esc(m.name) + '</span><span class="pro-move-reps">' + esc(m.reps) + '</span></div>';
        });
        html += '</div>';

        // Tension Control
        html += '<div class="pro-move-group">'
          + '<div class="pro-move-type tension-type">&#128247; Tension Control Movement</div>'
          + '<div class="pro-move-type-sub">Choose 1 — build strength in new ranges (hold 10–15 sec, 2–4 reps)</div>';
        cm.tension.forEach(function(m) {
          html += '<div class="pro-move-row"><span class="pro-move-name">' + esc(m) + '</span></div>';
        });
        html += '</div>';

        // Active Control
        html += '<div class="pro-move-group">'
          + '<div class="pro-move-type active-type">&#9654; Active Control Movement</div>'
          + '<div class="pro-move-type-sub">Choose 1 — increase range of motion (8–10 reps, slow & controlled)</div>';
        cm.active.forEach(function(m) {
          html += '<div class="pro-move-row"><span class="pro-move-name">' + esc(m) + '</span></div>';
        });
        html += '</div>';

        html += '</div></div>';
      });
    }
  }
  html += '</div></div>';

  html += '</div>'; // corr-wrap
  return html;
}

function setZone(progId, zoneId, val) {
  var results = getCompassResults(progId);
  // toggle off if clicking the same value
  var current = results[zoneId];
  var newVal = (current === val) ? null : val;
  setCompassResult(progId, zoneId, newVal);
  // re-render
  var p = allProgs().filter(function(x){ return x.id === progId; })[0];
  if (p) document.getElementById('pd-body').innerHTML = renderCorrective(p);
  // scroll to keep position roughly the same
  var zc = document.getElementById('zc-' + progId + '-' + zoneId);
  if (zc) zc.scrollIntoView({block:'nearest'});
}

function togW(el) {
  var b = el.nextElementSibling;
  var isOpen = b.style.display !== 'none';
  b.style.display = isOpen ? 'none' : 'flex';
  var arr = el.querySelector('.week-arr');
  if (arr) arr.innerHTML = isOpen ? '&#9660;' : '&#9650;';
}
function togD(el) {
  var card = el.parentElement;
  var b = card && card.querySelector('.day-body');
  if (!b) return;
  var isOpen = b.style.display !== 'none';
  b.style.display = isOpen ? 'none' : 'flex';
  var arr = el.querySelector('.day-arr');
  if (arr) arr.innerHTML = isOpen ? '&#9660;' : '&#9650;';
}

function delProg() {
  if (!curPid || !confirm('Delete this program? This cannot be undone.')) return;
  if (curPid.endsWith('-builtin')) {
    var d = DB.get('del_bi', []); d.push(curPid); DB.set('del_bi', d);
  } else {
    uProgs = uProgs.filter(function(p){ return p.id !== curPid; });
    DB.set('programs', uProgs);
  }
  showView('programs');
}

// ===== ACTIVE WORKOUT =====
function startPW(pid, phi, wi, di) {
  var p = allProgs().filter(function(x){ return x.id === pid; })[0];
  if (!p) return;
  var wk = p.phases && p.phases[phi] && p.phases[phi].weeks && p.phases[phi].weeks[wi];
  var day = wk && wk.days && wk.days[di];
  if (!day) return;
  var exercises = (day.exercises || []).filter(function(e) {
    return e.notes !== 'separator' && e.name.indexOf('—') !== 0;
  }).map(function(e) {
    var s = Math.max(parseInt(e.sets) || 2, 1);
    return {
      id: uid(), name: e.name, tS: s, tR: e.reps || '—', tW: e.weight || '', notes: e.notes || '',
      sets: Array.from({length: s}, function(_, i) { return {num: i+1, w: '', r: '', done: false}; })
    };
  });
  launch({name: day.name, meta: p.name + ' · ' + p.phases[phi].name, exercises: exercises});
}

function startQL() {
  var name = document.getElementById('ql-name').value.trim() || 'Quick Workout';
  var rows = document.querySelectorAll('.erb-row');
  var exercises = [];
  rows.forEach(function(r) {
    var n = r.querySelector('.en').value.trim(); if (!n) return;
    var s = Math.max(parseInt(r.querySelector('.es').value) || 3, 1);
    var rv = r.querySelector('.er').value || '10';
    exercises.push({
      id: uid(), name: n, tS: s, tR: rv, tW: '', notes: '',
      sets: Array.from({length: s}, function(_, i) { return {num: i+1, w: '', r: rv, done: false}; })
    });
  });
  if (!exercises.length) { alert('Add at least one exercise'); return; }
  closeM('ql-modal');
  launch({name: name, meta: '', exercises: exercises});
}

function launch(data) {
  aw = data; wst = Date.now(); rtLast = 120;
  document.getElementById('aw-name').textContent = data.name;
  document.getElementById('aw-meta').textContent = data.meta;
  renderAW();
  showView('active-workout');
  startWT();
  var pill = document.getElementById('pill');
  pill.classList.add('show');
}

function renderAW() {
  var body = document.getElementById('aw-body');
  if (!aw) return;
  body.innerHTML = aw.exercises.map(function(e) {
    var dn = e.sets.filter(function(s){ return s.done; }).length;
    var pct = e.sets.length ? Math.round(dn / e.sets.length * 100) : 0;
    var clr = dn === e.sets.length ? 'var(--ok)' : 'var(--t2)';
    var rows = e.sets.map(function(s, si) {
      var pv = getPrev(e.name, si);
      return '<tr id="sr-' + e.id + '-' + si + '" class="' + (s.done ? 'done-row' : '') + '">'
        + '<td style="font-weight:700;font-family:monospace;color:var(--t1)">' + s.num + '</td>'
        + '<td style="color:var(--t3);font-family:monospace;font-size:12px">' + pv + '</td>'
        + '<td><input class="set-inp" type="number" inputmode="decimal" placeholder="lbs" value="' + esc(s.w) + '" onchange="us(\'' + e.id + '\',' + si + ',\'w\',this.value)"></td>'
        + '<td><input class="set-inp" type="number" inputmode="numeric" placeholder="reps" value="' + esc(s.r) + '" onchange="us(\'' + e.id + '\',' + si + ',\'r\',this.value)"></td>'
        + '<td><button class="done-btn ' + (s.done ? 'done' : '') + '" onclick="cs(\'' + e.id + '\',' + si + ')">' + (s.done ? '&#10003;' : 'Done') + '</button></td>'
        + '</tr>';
    }).join('');
    return '<div class="aex-card" id="aex-' + e.id + '">'
      + '<div class="aex-hd">'
      + '<div style="flex:1;min-width:0">'
      + '<div class="aex-name">' + esc(e.name) + '</div>'
      + '<div class="aex-tgt">Target: ' + e.tS + ' x ' + esc(e.tR) + (e.tW ? ' @ ' + esc(e.tW) : '') + '</div>'
      + (e.notes ? '<div class="aex-note">&#128221; ' + esc(e.notes) + '</div>' : '')
      + '</div>'
      + '<div style="text-align:right;flex-shrink:0">'
      + '<div class="aex-ctr" id="ac-' + e.id + '" style="color:' + clr + '">' + dn + '/' + e.sets.length + '</div>'
      + '<div class="ex-pbar"><div class="ex-pfill" id="ap-' + e.id + '" style="width:' + pct + '%"></div></div>'
      + '</div></div>'
      + '<div class="st-scroll"><table class="st"><thead><tr><th>#</th><th>Prev</th><th>Weight</th><th>Reps</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>'
      + '<button class="add-set-btn" onclick="addS(\'' + e.id + '\')">+ Add Set</button>'
      + '</div>';
  }).join('');
  updWP();
}

function us(eid, si, f, v) {
  var e = aw && aw.exercises.filter(function(x){ return x.id === eid; })[0];
  if (e && e.sets[si]) e.sets[si][f] = v;
}

function cs(eid, si) {
  var e = aw && aw.exercises.filter(function(x){ return x.id === eid; })[0];
  if (!e) return;
  var s = e.sets[si]; s.done = !s.done;
  var row = document.getElementById('sr-' + eid + '-' + si);
  if (row) {
    row.classList.toggle('done-row', s.done);
    var b = row.querySelector('.done-btn');
    if (b) { b.classList.toggle('done', s.done); b.innerHTML = s.done ? '&#10003;' : 'Done'; }
  }
  var dn = e.sets.filter(function(x){ return x.done; }).length;
  var fill = document.getElementById('ap-' + eid);
  if (fill) fill.style.width = (e.sets.length ? Math.round(dn / e.sets.length * 100) : 0) + '%';
  var ctr = document.getElementById('ac-' + eid);
  if (ctr) { ctr.textContent = dn + '/' + e.sets.length; ctr.style.color = dn === e.sets.length ? 'var(--ok)' : 'var(--t2)'; }
  updWP();
  if (s.done) showRT(60);
}

function addS(eid) {
  var e = aw && aw.exercises.filter(function(x){ return x.id === eid; })[0];
  if (!e) return;
  var l = e.sets[e.sets.length - 1] || {};
  e.sets.push({num: e.sets.length + 1, w: l.w || '', r: l.r || '', done: false});
  renderAW();
}

function updWP() {
  if (!aw) return;
  var dn = 0, tot = 0;
  aw.exercises.forEach(function(e) {
    dn += e.sets.filter(function(s){ return s.done; }).length;
    tot += e.sets.length;
  });
  document.getElementById('aw-prog').textContent = dn + ' / ' + tot + ' sets done';
}

function getPrev(name, si) {
  for (var i = hist.length - 1; i >= 0; i--) {
    var w = hist[i];
    var e = w.exercises && w.exercises.filter(function(x){ return x.name.toLowerCase() === name.toLowerCase(); })[0];
    if (e && e.sets && e.sets[si]) {
      var s = e.sets[si];
      return s.weight ? s.weight + 'x' + s.reps : s.reps ? s.reps : '—';
    }
  }
  return '—';
}

function startWT() {
  if (wt) clearInterval(wt);
  wt = setInterval(function() {
    var e = Math.floor((Date.now() - wst) / 1000);
    var t = Math.floor(e / 60) + ':' + String(e % 60).padStart(2, '0');
    document.getElementById('aw-elapsed').textContent = t;
    document.getElementById('pill-t').textContent = t;
  }, 1000);
}

function finishW() {
  if (!aw || !confirm('Finish this workout?')) return;
  clearInterval(wt);
  var dur = Math.floor((Date.now() - wst) / 1000);
  var vol = 0;
  aw.exercises.forEach(function(e) {
    e.sets.forEach(function(s) { if (s.done && s.w && s.r) vol += parseFloat(s.w) * parseInt(s.r); });
  });
  var entry = {
    id: uid(), name: aw.name, date: new Date().toISOString(), duration: dur, volume: Math.round(vol),
    exercises: aw.exercises.map(function(e) {
      return {name: e.name, sets: e.sets.filter(function(s){ return s.done; }).map(function(s){ return {weight: s.w, reps: s.r}; })};
    })
  };
  hist.unshift(entry); DB.set('history', hist);
  aw.exercises.forEach(function(e) {
    e.sets.forEach(function(s) {
      if (!s.done || !s.w || !s.r) return;
      var v = parseFloat(s.w) * parseInt(s.r);
      if (!prs[e.name] || v > prs[e.name].volume) prs[e.name] = {weight: s.w, reps: s.r, volume: v, date: new Date().toISOString()};
    });
  });
  DB.set('prs', prs);
  aw = null;
  document.getElementById('pill').classList.remove('show');
  showView('history');
}

function cancelW() {
  if (!confirm('Cancel? Progress will be lost.')) return;
  clearInterval(wt); aw = null;
  document.getElementById('pill').classList.remove('show');
  showView('dashboard');
}

// ===== REST TIMER =====
var _rtM = 2, _rtS = 0; // selected minutes and seconds — default 2:00

var RT_MINS = [0,1,2,3,4,5];
var RT_SECS = [0,5,10,15,20,25,30,35,40,45,50,55];

function _rtBuildWheel(wheelEl, innerEl, values, selectedVal) {
  // Add highlight bar
  if (!wheelEl.querySelector('.rt-wheel-hl')) {
    var hl = document.createElement('div');
    hl.className = 'rt-wheel-hl';
    wheelEl.appendChild(hl);
  }
  innerEl.innerHTML = '';
  // top spacer so first item can scroll to center
  var sp = document.createElement('div');
  sp.style.height = '40px'; sp.style.flexShrink = '0';
  innerEl.appendChild(sp);
  values.forEach(function(v) {
    var el = document.createElement('div');
    el.className = 'rt-item' + (v === selectedVal ? ' sel' : '');
    el.textContent = String(v).padStart(2, '0');
    innerEl.appendChild(el);
  });
  // bottom spacer
  var sp2 = sp.cloneNode(false);
  innerEl.appendChild(sp2);
  // Scroll selected item to center — set immediately and again after paint for iOS
  var idx = values.indexOf(selectedVal);
  if (idx >= 0) {
    var target = idx * 40;
    wheelEl.scrollTop = target;
    // iOS sometimes ignores synchronous scrollTop before first paint — belt-and-suspenders
    requestAnimationFrame(function() {
      wheelEl.scrollTop = target;
      setTimeout(function() { wheelEl.scrollTop = target; }, 50);
    });
  }
}

function _rtAttachScroll(wheelEl, values, onChanged) {
  // Remove old listener by cloning
  var fresh = wheelEl.cloneNode(true);
  wheelEl.parentNode.replaceChild(fresh, wheelEl);
  var t;
  fresh.addEventListener('scroll', function() {
    clearTimeout(t);
    var w = fresh;
    t = setTimeout(function() {
      var raw = Math.round(w.scrollTop / 40);
      var idx = Math.max(0, Math.min(values.length - 1, raw));
      // snap
      w.scrollTop = idx * 40;
      var val = values[idx];
      // update highlight
      var items = w.querySelectorAll('.rt-item');
      items.forEach(function(el, i) {
        el.classList.toggle('sel', i === idx);
      });
      onChanged(val);
    }, 100);
  }, {passive: true});
  return fresh;
}

function _rtInitWheels() {
  var minEl  = document.getElementById('rt-wmin');
  var minIn  = document.getElementById('rt-wmin-inner');
  var secEl  = document.getElementById('rt-wsec');
  var secIn  = document.getElementById('rt-wsec-inner');
  if (!minEl || !secEl) return;

  var secVals = (_rtM === 5) ? [0] : RT_SECS;
  if (_rtM === 5) _rtS = 0;

  _rtBuildWheel(minEl, minIn, RT_MINS, _rtM);
  _rtBuildWheel(secEl, secIn, secVals, _rtS);

  minEl = _rtAttachScroll(minEl, RT_MINS, function(v) {
    _rtM = v;
    var sv = (_rtM === 5) ? [0] : RT_SECS;
    if (_rtM === 5) _rtS = 0;
    // rebuild sec wheel
    var se = document.getElementById('rt-wsec');
    var si = document.getElementById('rt-wsec-inner');
    if (se && si) {
      _rtBuildWheel(se, si, sv, _rtS);
      _rtAttachScroll(se, sv, function(s) { _rtS = s; _rtApply(); });
    }
    _rtApply();
  });

  _rtAttachScroll(secEl, secVals, function(v) {
    _rtS = v;
    _rtApply();
  });
}

function _rtApply() {
  var total = Math.max(5, _rtM * 60 + _rtS);
  rtLast = total;
  setRT(total);
}

function showRT(s) {
  // use the user's last chosen time if they've adjusted it this workout
  s = rtLast;
  _rtM = Math.floor(s / 60);
  _rtS = Math.round((s % 60) / 5) * 5;
  if (_rtS >= 60) { _rtM++; _rtS = 0; }
  if (_rtM > 5)   { _rtM = 5; _rtS = 0; }
  setRT(s);
  document.getElementById('rt-ov').classList.add('show');
  // init wheels after the overlay is visible so scrollTop works
  requestAnimationFrame(function() {
    requestAnimationFrame(_rtInitWheels);
  });
}
function setRT(s) {
  if (rtIv) clearInterval(rtIv);
  rtTot = s; rtRem = s; rtRun = true; updRT();
  rtIv = setInterval(tickRT, 1000);
}
function tickRT() { if (!rtRun) return; rtRem--; updRT(); if (rtRem <= 0) { clearInterval(rtIv); closeRT(); beep(); } }
function updRT() {
  var m = Math.floor(rtRem / 60), s = rtRem % 60;
  document.getElementById('rt-num').textContent = m + ':' + String(s).padStart(2, '0');
  document.getElementById('rt-fill').style.width = (rtTot > 0 ? Math.round(rtRem / rtTot * 100) : 0) + '%';
}
function togRT() { rtRun = !rtRun; document.getElementById('rt-pbtn').textContent = rtRun ? 'Pause' : 'Resume'; }
function closeRT() { clearInterval(rtIv); document.getElementById('rt-ov').classList.remove('show'); }
function beep() {
  try {
    var c = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.2, 0.4].forEach(function(t) {
      var o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.frequency.value = 880;
      g.gain.setValueAtTime(0.3, c.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.01, c.currentTime + t + 0.15);
      o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.15);
    });
  } catch(e) {}
}

// ===== HISTORY =====
function rHist() {
  var list = document.getElementById('hist-list');
  if (!hist.length) {
    list.innerHTML = '<div class="empty"><div class="eico">&#128197;</div><div class="etitle">No history yet</div><div class="esub">Complete a workout to see it here</div></div>';
    return;
  }
  list.innerHTML = hist.slice().sort(function(a,b){ return new Date(b.date)-new Date(a.date); }).map(function(w) {
    var exRows = (w.exercises || []).map(function(e) {
      var ss = (e.sets || []).map(function(s){ return (s.weight || 'BW') + 'x' + s.reps; }).join(' ');
      return '<div class="h-ex"><div class="h-ex-n">' + esc(e.name) + '</div><div class="h-ex-s">' + esc(ss) + '</div></div>';
    }).join('');
    return '<button class="h-card" onclick="this.querySelector(\'.h-detail\').classList.toggle(\'open\')">'
      + '<div class="h-hd">'
      + '<div style="min-width:0;flex:1"><div class="h-title">' + esc(w.name) + '</div><div class="h-date">' + fda(w.date) + '</div></div>'
      + '<div class="h-stats">'
      + '<div class="hs"><div class="hs-v">' + fdur(w.duration) + '</div><div class="hs-l">Time</div></div>'
      + '<div class="hs"><div class="hs-v">' + fv(w.volume) + '</div><div class="hs-l">Vol</div></div>'
      + '<div class="hs"><div class="hs-v">' + (w.exercises && w.exercises.length || 0) + '</div><div class="hs-l">Exs</div></div>'
      + '</div></div>'
      + '<div class="h-detail"><div style="padding-top:8px">' + exRows + '</div></div>'
      + '</button>';
  }).join('');
}

// ===== PROGRESS =====
function rProg() {
  document.getElementById('pg-pr').textContent = Object.keys(prs).length;
  var vols = hist.map(function(w){ return w.volume || 0; });
  document.getElementById('pg-vol').textContent = fv(vols.length ? Math.max.apply(null, vols) : 0);
  var allEx = {};
  hist.forEach(function(w){ (w.exercises || []).forEach(function(e){ allEx[e.name] = 1; }); });
  document.getElementById('pg-ex').textContent = Object.keys(allEx).length;
  var durs = hist.filter(function(w){ return w.duration; }).map(function(w){ return w.duration; });
  document.getElementById('pg-dur').textContent = durs.length ? Math.round(durs.reduce(function(a,b){ return a+b; }, 0) / durs.length / 60) + 'm' : '—';

  var prl = document.getElementById('pr-list');
  var pe = Object.keys(prs).map(function(k){ return [k, prs[k]]; });
  if (pe.length) {
    pe.sort(function(a,b){ return new Date(b[1].date) - new Date(a[1].date); });
    prl.innerHTML = pe.map(function(kv) {
      return '<div class="pr-item"><div><div class="pr-name">' + esc(kv[0]) + '</div><div class="pr-date">' + fd(kv[1].date) + '</div></div><div class="pr-val">' + esc(kv[1].weight) + 'x' + esc(kv[1].reps) + '</div></div>';
    }).join('');
  } else {
    prl.innerHTML = '<div class="empty" style="padding:16px"><div class="esub">Log some heavy sets to set PRs!</div></div>';
  }

  var sel = document.getElementById('ex-sel'), cv = sel.value;
  sel.innerHTML = '<option value="">Select exercise...</option>' + Object.keys(allEx).sort().map(function(n){
    return '<option value="' + esc(n) + '">' + esc(n) + '</option>';
  }).join('');
  if (cv) sel.value = cv;
  drawVC(); if (sel.value) drawEC();
}

function drawVC() {
  var c = document.getElementById('vc'); if (!c) return;
  var s = hist.slice().sort(function(a,b){ return new Date(a.date)-new Date(b.date); }).slice(-8);
  if (!s.length) { clrC(c, 'No data yet'); return; }
  drawBars(c, s.map(function(w){ return w.volume||0; }), s.map(function(w){ return fd(w.date); }), '#d4f000');
}
function drawEC() {
  var nm = document.getElementById('ex-sel').value;
  var c = document.getElementById('ec'); if (!c || !nm) return;
  var pts = [];
  hist.slice().sort(function(a,b){ return new Date(a.date)-new Date(b.date); }).forEach(function(w) {
    var e = (w.exercises || []).filter(function(x){ return x.name.toLowerCase() === nm.toLowerCase(); })[0];
    if (e && e.sets && e.sets.length) {
      var best = Math.max.apply(null, e.sets.map(function(s){ return parseFloat(s.weight) * parseInt(s.reps) || 0; }));
      if (best > 0) pts.push({val: best, date: w.date});
    }
  });
  if (!pts.length) { clrC(c, 'No data for this exercise'); return; }
  drawLine(c, pts.map(function(p){ return p.val; }), pts.map(function(p){ return fd(p.date); }), '#30b8ff');
}

function clrC(cv, msg) {
  cv.width = cv.offsetWidth || 300; cv.height = 180;
  var ctx = cv.getContext('2d');
  ctx.fillStyle = '#4a4a64'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(msg, cv.width/2, 90);
}
function drawBars(cv, data, labels, color) {
  cv.width = cv.offsetWidth || 300; cv.height = 180;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height, pt = 8, pr = 8, pb = 26, pl = 38;
  var w = W-pl-pr, h = H-pt-pb, max = Math.max.apply(null, data.concat([1]));
  ctx.clearRect(0, 0, W, H);
  for (var i = 0; i <= 4; i++) {
    var y = pt + h - (i/4)*h;
    ctx.strokeStyle = '#2e2e3e'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl+w, y); ctx.stroke();
    ctx.fillStyle = '#4a4a64'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(max*i/4), pl-3, y+3);
  }
  data.forEach(function(v, i) {
    var x = pl + (w/data.length)*i + w/data.length*0.1;
    var bw = w/data.length*0.8, bh = (v/max)*h, y = pt+h-bh;
    ctx.fillStyle = color; ctx.globalAlpha = 0.85;
    rrc(ctx, x, y, bw, bh, 3); ctx.fill(); ctx.globalAlpha = 1;
    if (data.length <= 8) {
      ctx.fillStyle = '#4a4a64'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(labels[i] || '', x + bw/2, H-4);
    }
  });
}
function drawLine(cv, data, labels, color) {
  cv.width = cv.offsetWidth || 300; cv.height = 180;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height, pt = 8, pr = 8, pb = 26, pl = 42;
  var w = W-pl-pr, h = H-pt-pb;
  var max = Math.max.apply(null, data.concat([1])), min = Math.min.apply(null, data), rng = max - min || 1;
  ctx.clearRect(0, 0, W, H);
  for (var i = 0; i <= 4; i++) {
    var y = pt + h - (i/4)*h;
    ctx.strokeStyle = '#2e2e3e'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl+w, y); ctx.stroke();
    ctx.fillStyle = '#4a4a64'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(min + rng*i/4), pl-3, y+3);
  }
  var pts = data.map(function(v, i) {
    return {x: pl + (w/(data.length-1||1))*i, y: pt + h - ((v-min)/rng)*h};
  });
  ctx.beginPath(); ctx.moveTo(pts[0].x, H-pb);
  pts.forEach(function(p){ ctx.lineTo(p.x, p.y); });
  ctx.lineTo(pts[pts.length-1].x, H-pb); ctx.closePath();
  ctx.fillStyle = 'rgba(48,184,255,.1)'; ctx.fill();
  ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
  pts.forEach(function(p, i){ if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }); ctx.stroke();
  pts.forEach(function(p){ ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2); ctx.fillStyle = color; ctx.fill(); });
  if (data.length <= 8) pts.forEach(function(p, i){ ctx.fillStyle='#4a4a64'; ctx.font='8px sans-serif'; ctx.textAlign='center'; ctx.fillText(labels[i]||'', p.x, H-4); });
}
function rrc(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h); ctx.lineTo(x, y+h); ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y); ctx.closePath();
}

// ===== FILE UPLOAD =====
function doDO(e) { e.preventDefault(); document.getElementById('uz').classList.add('dov'); }
function doDL() { document.getElementById('uz').classList.remove('dov'); }
function doDrop(e) { e.preventDefault(); document.getElementById('uz').classList.remove('dov'); var f = e.dataTransfer && e.dataTransfer.files[0]; if (f) processFile(f); }
function doFS(e) { var f = e.target && e.target.files[0]; if (f) processFile(f); e.target.value = ''; }

async function processFile(file) {
  var uz = document.getElementById('uz');
  uz.style.display = 'none';
  var al = document.getElementById('ai-load'); al.classList.add('show');
  document.getElementById('ai-sub').textContent = 'Reading file...';
  var content = '';
  if (file.name.toLowerCase().endsWith('.pdf')) {
    try { content = await extractPDF(file); } catch(e) { content = '[PDF: ' + file.name + ']'; }
  } else {
    content = await file.text();
  }
  document.getElementById('ai-sub').textContent = 'AI parsing program structure...';
  try {
    var prog = await parseAI(content, file.name);
    uProgs.push(prog); DB.set('programs', uProgs);
    al.classList.remove('show'); uz.style.display = '';
    var sb = document.getElementById('save-banner');
    sb.classList.add('show');
    setTimeout(function(){ sb.classList.remove('show'); }, 5000);
    rProgs(); openProg(prog.id);
  } catch(err) {
    al.classList.remove('show'); uz.style.display = '';
    alert('Error: ' + err.message + '\n\nTip: Text-based PDFs work best. If scanned, copy text into a .txt file first.');
  }
}

async function extractPDF(file) {
  return new Promise(function(res, rej) {
    var r = new FileReader();
    r.onload = function(e) {
      var b = new Uint8Array(e.target.result), t = '';
      for (var i = 0; i < b.length; i++) {
        var c = b[i];
        if (c >= 32 && c < 127) t += String.fromCharCode(c);
        else if (c === 10 || c === 13) t += '\n';
      }
      res(t.split('\n').map(function(l){ return l.trim(); }).filter(function(l){ return l.length > 2; }).join('\n').substring(0, 12000));
    };
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });
}

async function parseAI(content, filename) {
  var resp = await fetch('https://YOUR-WORKER-NAME.YOUR-USERNAME.workers.dev/api/claude', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{role: 'user', content: 'Parse this workout program. Return ONLY valid JSON, no markdown, no explanation. Schema:\n{"name":"","description":"","difficulty":"","duration":"","phases":[{"name":"","objective":"","length":"","sets":"","reps":"","rest":"","frequency":"","weeks":[{"name":"","days":[{"name":"","focus":"","type":"workout|mobility|trigger|focus","exercises":[{"name":"","sets":"","reps":"","notes":""}]}]}]}]}\nExtract ALL phases, weeks, days, exercises. Keep notes.\nFILENAME: ' + filename + '\nCONTENT:\n' + content.substring(0, 8000)}]
    })
  });
  if (!resp.ok) { var e = await resp.json(); throw new Error(e.error && e.error.message || 'API error ' + resp.status); }
  var data = await resp.json();
  var raw = (data.content || []).map(function(c){ return c.text || ''; }).join('').trim();
  var clean = raw.replace(/^```json\s*/i,'').replace(/^```\s*/,'').replace(/```\s*$/,'').trim();
  var parsed;
  try { parsed = JSON.parse(clean); } catch(e) { throw new Error('AI returned invalid JSON. Try a .txt file.'); }
  parsed.id = uid(); parsed.source = 'ai'; parsed.createdAt = new Date().toISOString();
  if (!parsed.phases) parsed.phases = [];
  parsed.phases.forEach(function(ph) {
    if (!ph.weeks) ph.weeks = [];
    ph.weeks.forEach(function(w) {
      if (!w.days) w.days = [];
      w.days.forEach(function(d){ if (!d.exercises) d.exercises = []; });
    });
  });
  return parsed;
}

// ===== QUICK LOG / CREATE =====
function openQL() {
  document.getElementById('ql-name').value = '';
  document.getElementById('ex-builder').innerHTML = '';
  addER(); addER();
  openM('ql-modal');
}
function addER() {
  var d = document.createElement('div');
  d.className = 'erb-row';
  d.innerHTML = '<input class="fi en" placeholder="Exercise name" autocomplete="off" style="font-size:15px">'
    + '<input class="fi es" type="number" inputmode="numeric" placeholder="Sets" value="3" min="1" style="font-size:15px;text-align:center;padding:11px 4px">'
    + '<input class="fi er" placeholder="Reps" value="10" autocomplete="off" style="font-size:15px;text-align:center;padding:11px 4px">'
    + '<button class="erb-del" onclick="this.parentElement.remove()">&#10005;</button>';
  document.getElementById('ex-builder').appendChild(d);
}
function openCP() {
  document.getElementById('cp-name').value = '';
  document.getElementById('cp-desc').value = '';
  document.getElementById('cp-dur').value = '';
  openM('cp-modal');
}
function createProg() {
  var name = document.getElementById('cp-name').value.trim();
  if (!name) { alert('Enter a program name'); return; }
  var p = {
    id: uid(), name: name,
    description: document.getElementById('cp-desc').value,
    duration: document.getElementById('cp-dur').value,
    difficulty: document.getElementById('cp-diff').value,
    source: 'manual',
    phases: [{name:'Phase 1', weeks:[{name:'Week 1', days:[{name:'Day 1', focus:'', type:'workout', exercises:[]}]}]}]
  };
  uProgs.push(p); DB.set('programs', uProgs);
  closeM('cp-modal'); rProgs(); openProg(p.id);
}

function openM(id) { document.getElementById(id).classList.add('show'); }
function closeM(id) { document.getElementById(id).classList.remove('show'); }

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.modal-ov').forEach(function(m) {
    m.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('show'); });
  });
});

// ===== UTILS =====
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function fv(v) { if (!v) return '0'; return v >= 1000 ? (v/1000).toFixed(1) + 'k' : '' + Math.round(v); }
function fd(iso) { if (!iso) return '—'; var d = new Date(iso); return (d.getMonth()+1) + '/' + d.getDate() + '/' + String(d.getFullYear()).slice(2); }
function fda(iso) { if (!iso) return '—'; return new Date(iso).toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric', year:'numeric'}); }
function fdur(sec) { if (!sec) return '—'; var m = Math.floor(sec/60); return m >= 60 ? Math.floor(m/60) + 'h ' + (m%60) + 'm' : m + 'm'; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
