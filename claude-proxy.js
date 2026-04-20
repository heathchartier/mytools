/* ===== RESET & ROOT ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #0d0d12;
  --bg2:     #13131a;
  --bg3:     #1c1c26;
  --bg4:     #252530;
  --border:  #2e2e3e;
  --acc:     #d4f000;
  --acc2:    #ff6030;
  --acc3:    #30b8ff;
  --ok:      #30e87a;
  --danger:  #ff3a4a;
  --t1:      #ececf4;
  --t2:      #8888a8;
  --t3:      #4a4a64;
  --nav-h:   56px;
  --tab-h:   58px;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg);
  color: var(--t1);
  font-size: 15px;
  line-height: 1.5;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ===== TOPBAR ===== */
#topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
}

#logo {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--acc);
}

#topbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

#pill {
  display: none;
  align-items: center;
  gap: 6px;
  background-color: var(--acc2);
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
}
#pill.show { display: flex; }

#nav-desktop { display: none; }

/* ===== BOTTOM TAB BAR ===== */
#tab-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  background-color: var(--bg2);
  border-top: 1px solid var(--border);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 4px;
  border: none;
  background: transparent;
  color: var(--t3);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.tab span { font-size: 20px; line-height: 1; }
.tab.active { color: var(--acc); }

/* ===== PAGE WRAP ===== */
#page-wrap {
  padding-top: calc(var(--nav-h) + 12px);
  padding-bottom: calc(var(--tab-h) + env(safe-area-inset-bottom, 0px) + 12px);
  min-height: 100vh;
}

/* ===== VIEWS ===== */
.view {
  display: none;
  flex-direction: column;
  gap: 14px;
  padding: 0 14px;
}
.view.active { display: flex; }

/* ===== BUTTONS ===== */
.btn-p, .btn-s, .btn-d, .btn-g {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 10px;
  border: none;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
  padding: 11px 18px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}
.btn-p { background-color: var(--acc); color: #000; }
.btn-s { background-color: var(--bg3); color: var(--t1); border: 1px solid var(--border); }
.btn-d { background-color: var(--danger); color: #fff; }
.btn-g { background-color: transparent; color: var(--t2); border: 1px solid var(--border); }
.btn-sm { padding: 8px 14px; font-size: 13px; }
.btn-xs { padding: 6px 11px; font-size: 12px; }

/* ===== CARDS ===== */
.card {
  background-color: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.card-h {
  padding: 13px 16px;
  border-bottom: 1px solid var(--border);
  font-weight: 700;
  font-size: 14px;
}
.card-b { padding: 12px; }

/* ===== STAT GRID ===== */
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.stat-card {
  background-color: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 15px;
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 100%;
}
.s1::before { background-color: var(--acc); }
.s2::before { background-color: var(--acc2); }
.s3::before { background-color: var(--acc3); }
.s4::before { background-color: var(--ok); }
.sl { font-size: 10px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: 0.8px; }
.sv { font-size: 30px; font-weight: 900; color: var(--t1); line-height: 1.1; margin-top: 3px; }
.ss { font-size: 11px; color: var(--t2); margin-top: 1px; }

/* ===== SECTION LABEL ===== */
.sec-lbl {
  font-size: 11px;
  font-weight: 700;
  color: var(--t3);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

/* ===== PAGE HEADER ===== */
.ph {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 4px 0;
}
.ptitle { font-size: 30px; font-weight: 900; color: var(--t1); }
.psub { font-size: 12px; color: var(--t2); }

/* ===== ROW ITEMS ===== */
.row-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  gap: 10px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  color: var(--t1);
}
.row-item:last-child { border-bottom: none; }
.row-name { font-weight: 600; font-size: 14px; color: var(--t1); }
.row-meta { font-size: 12px; color: var(--t2); margin-top: 2px; }

/* ===== PROGRAM CARDS ===== */
.prog-card {
  background-color: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 12px;
  display: block;
  width: 100%;
  text-align: left;
  font-family: inherit;
  color: var(--t1);
  -webkit-tap-highlight-color: transparent;
}
.prog-card:last-child { margin-bottom: 0; }
.prog-banner { height: 4px; display: block; width: 100%; }
.bm { background: linear-gradient(90deg, #d4f000, #ff6030, #30b8ff); }
.bai { background: linear-gradient(90deg, #30b8ff, #d4f000); }
.bdef { background: linear-gradient(90deg, #d4f000, #ff6030); }
.prog-body { padding: 14px 15px; }
.prog-title { font-size: 19px; font-weight: 900; color: var(--t1); }
.prog-desc { font-size: 13px; color: var(--t2); margin-top: 4px; line-height: 1.5; }
.prog-tags { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.prog-tag { font-size: 11px; padding: 3px 9px; border-radius: 20px; background-color: var(--bg3); color: var(--t2); border: 1px solid var(--border); font-weight: 500; }
.prog-foot {
  padding: 10px 15px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pdots { display: flex; gap: 5px; align-items: center; }
.pdot { width: 8px; height: 8px; border-radius: 50%; background-color: var(--bg4); border: 1px solid var(--border); display: inline-block; }
.pdot.on { background-color: var(--acc); border-color: var(--acc); }
.prog-arrow { font-size: 13px; font-weight: 700; color: var(--acc); }

/* ===== CHIPS ===== */
.chip { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.cg { background-color: rgba(48,232,122,.12); color: #30e87a; border: 1px solid rgba(48,232,122,.25); }
.cy { background-color: rgba(212,240,0,.12); color: #d4f000; border: 1px solid rgba(212,240,0,.25); }
.co { background-color: rgba(255,96,48,.12); color: #ff6030; border: 1px solid rgba(255,96,48,.25); }
.cb { background-color: rgba(48,184,255,.12); color: #30b8ff; border: 1px solid rgba(48,184,255,.25); }

/* ===== UPLOAD ZONE ===== */
.upload-zone {
  border: 2px dashed var(--border);
  border-radius: 14px;
  padding: 28px 16px;
  text-align: center;
  cursor: pointer;
  background-color: var(--bg2);
  -webkit-tap-highlight-color: transparent;
}
.upload-zone.dov { border-color: var(--acc); background-color: rgba(212,240,0,.04); }
#fi { display: none; }
.uico { font-size: 34px; margin-bottom: 8px; }
.utitle { font-size: 16px; font-weight: 700; color: var(--t1); margin-bottom: 4px; }
.uhint { font-size: 13px; color: var(--t2); line-height: 1.5; }
.uchips { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-top: 10px; }

/* ===== SAVE BANNER ===== */
.save-banner {
  display: none;
  background-color: rgba(48,232,122,.15);
  border: 1px solid rgba(48,232,122,.3);
  border-radius: 10px;
  padding: 10px 14px;
  color: #30e87a;
  font-size: 13px;
  font-weight: 600;
}
.save-banner.show { display: block; }

/* ===== AI LOADING ===== */
.ai-load { display: none; flex-direction: column; align-items: center; gap: 12px; padding: 36px 20px; text-align: center; }
.ai-load.show { display: flex; }
.spin {
  width: 36px; height: 36px;
  border: 3px solid var(--border);
  border-top-color: var(--acc);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.ai-txt { font-size: 14px; font-weight: 700; color: var(--t1); }
.ai-sub { font-size: 12px; color: var(--t2); }

/* ===== PROGRAM DETAIL ===== */
#pd-back {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg);
}
.back-btn {
  background: none; border: none; color: var(--t2);
  font-size: 14px; font-weight: 600; cursor: pointer;
  font-family: inherit; padding: 4px 0;
  -webkit-tap-highlight-color: transparent;
}
#pd-bc { color: var(--t3); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

#pd-hdr { padding: 14px 15px; border-bottom: 1px solid var(--border); background-color: var(--bg2); }
.pd-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
#pd-title { font-size: 24px; font-weight: 900; color: var(--t1); }
#pd-desc { font-size: 13px; color: var(--t2); margin-top: 4px; }

#phase-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg);
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  position: sticky;
  top: var(--nav-h);
  z-index: 90;
}
#phase-scroll::-webkit-scrollbar { display: none; }

.ptab {
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background-color: var(--bg3);
  color: var(--t2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
}
.ptab.active { background-color: var(--acc); color: #000; border-color: var(--acc); }

#pd-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 12px; }

.phase-info {
  background-color: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 13px 15px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.pi-l { font-size: 10px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: 0.7px; }
.pi-v { font-size: 13px; font-weight: 600; color: var(--t1); margin-top: 2px; }

.week-block {
  background-color: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.week-hd {
  padding: 12px 14px;
  background-color: var(--bg3);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-left: none; border-right: none; border-top: none;
  font-family: inherit;
  color: var(--t1);
  -webkit-tap-highlight-color: transparent;
}
.week-title { font-weight: 700; font-size: 14px; color: var(--t1); }
.week-badge { font-size: 11px; padding: 3px 9px; border-radius: 20px; background-color: var(--bg4); color: var(--t2); }
.week-arr { color: var(--t3); font-size: 12px; }
.week-body { display: none; padding: 10px; flex-direction: column; gap: 8px; }

.day-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}
.day-hd {
  padding: 11px 13px;
  background-color: var(--bg3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border: none;
  font-family: inherit;
  color: var(--t1);
  -webkit-tap-highlight-color: transparent;
}
.day-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.day-name-txt { font-weight: 700; font-size: 13px; color: var(--t1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.day-meta { font-size: 11px; color: var(--t2); margin-top: 2px; }
.day-body { display: none; padding: 10px; flex-direction: column; gap: 6px; }

.ex-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 9px 11px;
  background-color: var(--bg4);
  border-radius: 8px;
  gap: 8px;
}
.ex-name { font-size: 13px; font-weight: 600; color: var(--t1); flex: 1; }
.ex-note { font-size: 11px; color: var(--t2); margin-top: 2px; }
.ex-badges { display: flex; gap: 5px; flex-shrink: 0; }
.badge-s { font-size: 11px; padding: 3px 8px; border-radius: 6px; background-color: var(--bg3); color: var(--acc3); border: 1px solid var(--border); font-family: monospace; }
.badge-r { font-size: 11px; padding: 3px 8px; border-radius: 6px; background-color: var(--bg3); color: var(--acc); border: 1px solid var(--border); font-family: monospace; }
.sep-row { padding: 4px 10px; font-size: 10px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: 0.8px; background-color: var(--bg3); border-radius: 5px; }

.focus-box { background-color: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
.focus-lbl { font-size: 11px; font-weight: 700; color: var(--acc2); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
.focus-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.fc-n { font-size: 10px; font-weight: 700; color: var(--acc3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
.fc-i { font-size: 11px; color: var(--t1); line-height: 1.6; }

/* ===== ACTIVE WORKOUT ===== */
#wtop {
  position: sticky;
  top: var(--nav-h);
  z-index: 90;
  padding: 12px 15px;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#aw-name { font-size: 16px; font-weight: 700; color: var(--t1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 210px; }
#aw-meta { font-size: 11px; color: var(--t2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 210px; }
#aw-elapsed { font-size: 24px; font-weight: 900; color: var(--acc); font-family: monospace; }

#aw-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 12px; }

#wfoot {
  position: sticky;
  bottom: calc(var(--tab-h) + env(safe-area-inset-bottom, 0px));
  z-index: 90;
  padding: 11px 14px;
  border-top: 1px solid var(--border);
  background-color: var(--bg2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
#aw-prog { font-size: 12px; color: var(--t2); flex: 1; }

.aex-card { background-color: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.aex-hd {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg3);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.aex-name { font-size: 15px; font-weight: 700; color: var(--t1); }
.aex-tgt { font-size: 11px; color: var(--t2); margin-top: 2px; }
.aex-note { font-size: 11px; color: var(--acc2); margin-top: 2px; }
.aex-ctr { font-size: 13px; font-weight: 700; }
.ex-pbar { width: 60px; height: 3px; background-color: var(--bg4); border-radius: 2px; overflow: hidden; margin-top: 5px; }
.ex-pfill { height: 100%; background: linear-gradient(90deg, var(--acc3), var(--acc)); border-radius: 2px; }

.st-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
table.st { width: 100%; border-collapse: collapse; min-width: 300px; }
table.st th { font-size: 10px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: 0.6px; padding: 8px 10px; text-align: left; border-bottom: 1px solid var(--border); }
table.st th:nth-child(n+3) { text-align: center; }
table.st td { padding: 8px 10px; border-bottom: 1px solid rgba(46,46,62,.5); font-size: 14px; color: var(--t1); }
table.st td:nth-child(n+3) { text-align: center; }
table.st tr:last-child td { border-bottom: none; }
table.st tr.done-row td { opacity: 0.45; }

.set-inp {
  width: 62px;
  background-color: var(--bg4);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 7px 4px;
  color: var(--t1);
  font-size: 16px;
  text-align: center;
  font-family: monospace;
  -webkit-appearance: none;
  appearance: none;
}
.set-inp:focus { outline: none; border-color: var(--acc); }

.done-btn {
  padding: 7px 12px;
  background-color: var(--bg4);
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--t2);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
}
.done-btn.done { background-color: var(--ok); color: #000; border-color: var(--ok); }

.add-set-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  border-top: 1px dashed var(--border);
  color: var(--t3);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
  display: block;
}

/* ===== REST TIMER ===== */
#rt-ov {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 500;
  background-color: rgba(0,0,0,.88);
  align-items: center;
  justify-content: center;
}
#rt-ov.show { display: flex; }
#rt-box {
  background-color: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 30px 24px;
  text-align: center;
  width: 290px;
  max-width: 92vw;
}
.rt-lbl { font-size: 11px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
#rt-num { font-size: 84px; font-weight: 900; color: var(--acc); line-height: 1; font-family: monospace; }
#rt-bar { width: 100%; height: 4px; background-color: var(--bg4); border-radius: 2px; margin: 14px 0; overflow: hidden; }
#rt-fill { height: 100%; background-color: var(--acc); border-radius: 2px; width: 100%; }
#rt-pre { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
#rt-pre button {
  padding: 6px 14px;
  background-color: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--t2);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
}
#rt-ctrl { display: flex; gap: 8px; justify-content: center; margin-top: 14px; }

/* ===== HISTORY ===== */
.h-card {
  background-color: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 10px;
  -webkit-tap-highlight-color: transparent;
  display: block;
  width: 100%;
  text-align: left;
  font-family: inherit;
  color: var(--t1);
}
.h-card:last-child { margin-bottom: 0; }
.h-hd { padding: 12px 14px; display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.h-title { font-size: 14px; font-weight: 700; color: var(--t1); }
.h-date { font-size: 11px; color: var(--t2); margin-top: 2px; }
.h-stats { display: flex; gap: 12px; flex-shrink: 0; }
.hs { text-align: right; }
.hs-v { font-size: 15px; font-weight: 700; color: var(--acc3); font-family: monospace; }
.hs-l { font-size: 10px; color: var(--t3); }
.h-detail { display: none; padding: 0 14px 12px; border-top: 1px solid var(--border); }
.h-detail.open { display: block; }
.h-ex { display: flex; justify-content: space-between; align-items: flex-start; padding: 7px 0; border-bottom: 1px solid rgba(46,46,62,.5); font-size: 12px; gap: 8px; }
.h-ex:last-child { border-bottom: none; }
.h-ex-n { font-weight: 600; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--t1); }
.h-ex-s { color: var(--t2); font-family: monospace; font-size: 11px; flex-shrink: 0; }

/* ===== PROGRESS ===== */
.chart-area { height: 180px; margin-top: 10px; }
canvas { width: 100% !important; }
.ex-sel {
  width: 100%;
  background-color: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--t1);
  padding: 10px 12px;
  font-family: inherit;
  font-size: 16px;
  margin-bottom: 10px;
  -webkit-appearance: none;
  appearance: none;
  display: block;
}
.ex-sel:focus { outline: none; border-color: var(--acc); }
.pr-list { display: flex; flex-direction: column; gap: 8px; }
.pr-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background-color: var(--bg3); border-radius: 8px; border-left: 3px solid var(--acc); }
.pr-name { font-size: 13px; font-weight: 600; color: var(--t1); }
.pr-val { font-size: 13px; font-weight: 700; color: var(--acc); font-family: monospace; }
.pr-date { font-size: 10px; color: var(--t3); margin-top: 1px; }

/* ===== MODALS ===== */
.modal-ov {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 400;
  background-color: rgba(0,0,0,.75);
  align-items: flex-end;
  justify-content: center;
}
.modal-ov.show { display: flex; }
.modal-box {
  background-color: var(--bg2);
  border-radius: 20px 20px 0 0;
  border: 1px solid var(--border);
  width: 100%;
  max-width: 600px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
.modal-hd { padding: 16px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; font-size: 17px; font-weight: 700; color: var(--t1); }
.modal-close { background: none; border: none; color: var(--t2); font-size: 22px; line-height: 1; cursor: pointer; font-family: inherit; padding: 2px 6px; -webkit-tap-highlight-color: transparent; }
.modal-body { padding: 16px; flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; display: flex; flex-direction: column; gap: 14px; }
.modal-foot { padding: 12px 16px; border-top: 1px solid var(--border); display: flex; gap: 8px; justify-content: flex-end; flex-shrink: 0; }

.fg { display: flex; flex-direction: column; gap: 6px; }
.fl { font-size: 11px; font-weight: 700; color: var(--t2); text-transform: uppercase; letter-spacing: 0.7px; }
.fi, .fta, .fse {
  background-color: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--t1);
  padding: 11px 13px;
  font-family: inherit;
  font-size: 16px;
  width: 100%;
  display: block;
}
.fi:focus, .fta:focus, .fse:focus { outline: none; border-color: var(--acc); }
.fta { resize: vertical; min-height: 70px; }

.erb-row { display: grid; grid-template-columns: 1fr 58px 58px 38px; gap: 6px; align-items: center; margin-bottom: 8px; }
.erb-del { background-color: var(--bg4); border: 1px solid var(--border); border-radius: 10px; color: var(--danger); font-size: 18px; cursor: pointer; height: 46px; width: 38px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: inherit; }

/* ===== EMPTY STATES ===== */
.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center; gap: 10px; }
.eico { font-size: 44px; }
.etitle { font-size: 17px; font-weight: 700; color: var(--t2); }
.esub { font-size: 13px; color: var(--t3); max-width: 260px; line-height: 1.5; }

/* ===== DESKTOP ===== */
@media (min-width: 640px) {
  :root { --nav-h: 60px; --tab-h: 0px; }
  #tab-bar { display: none; }
  #nav-desktop {
    display: flex !important;
    gap: 4px;
    background-color: var(--bg3);
    padding: 4px;
    border-radius: 10px;
    border: 1px solid var(--border);
  }
  .nd {
    padding: 6px 14px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--t2);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
  .nd:hover { color: var(--t1); background-color: var(--bg4); }
  .nd.active { background-color: var(--acc); color: #000; }
  .view { padding: 0 24px; max-width: 860px; margin: 0 auto; width: 100%; }
  #page-wrap { padding-bottom: 32px; }
  .stat-grid { grid-template-columns: repeat(4, 1fr); }
  .modal-ov { align-items: center; }
  .modal-box { border-radius: 16px; max-width: 500px; }
  .focus-grid { grid-template-columns: repeat(3, 1fr); }
  #pd-body { padding: 16px 24px !important; }
  #pd-hdr { padding: 18px 24px !important; }
  #pd-back { padding: 12px 24px !important; }
  #phase-scroll { padding: 10px 24px !important; }
}

/* =============================================
   CORRECTIVE PROGRAM STYLES
   ============================================= */

.corr-wrap {
  padding: 12px 14px 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.corr-banner {
  background: linear-gradient(135deg, #1e2a1e 0%, #162416 100%);
  border: 1px solid #2e5a2e;
  border-radius: 10px;
  padding: 14px 16px;
}
.corr-banner-title {
  font-size: 13px;
  font-weight: 700;
  color: #6ddc6d;
  margin-bottom: 6px;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.corr-banner-body {
  font-size: 13px;
  color: var(--t2);
  line-height: 1.55;
}
.corr-banner-body strong { color: var(--t1); }

.corr-section {
  background: var(--card);
  border: 1px solid var(--brd);
  border-radius: 10px;
  overflow: hidden;
}
.corr-sec-hd {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--brd);
  background: var(--bg2);
}
.corr-step {
  font-size: 10px;
  font-weight: 700;
  color: var(--bg);
  background: var(--acc);
  padding: 2px 7px;
  border-radius: 20px;
  letter-spacing: .06em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}
.corr-sec-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--t1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.corr-timing {
  font-size: 11px;
  font-weight: 400;
  color: var(--t3);
}
.corr-sec-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.corr-note {
  font-size: 13px;
  color: var(--t2);
  line-height: 1.5;
  margin: 0;
}
.corr-note strong { color: var(--t1); }
.corr-muted { color: var(--t3) !important; font-style: italic; }

.corr-warning {
  background: #2a1e0e;
  border: 1px solid #6b4200;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
  color: #f0a040;
  line-height: 1.5;
}
.corr-warning strong { color: #f0c060; }

.corr-success {
  background: #0e2a0e;
  border: 1px solid #2e5a2e;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
  color: #6ddc6d;
  line-height: 1.5;
}

.corr-subsec-lbl {
  font-size: 11px;
  font-weight: 700;
  color: var(--t3);
  text-transform: uppercase;
  letter-spacing: .07em;
  margin-top: 6px;
}

/* Zone Cards */
.zone-card {
  border: 1px solid var(--brd);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg2);
}
.zone-top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
}
.zone-num {
  font-size: 11px;
  font-weight: 700;
  color: var(--acc);
  background: rgba(212,240,0,.12);
  border: 1px solid rgba(212,240,0,.2);
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}
.zone-info { flex: 1; min-width: 0; }
.zone-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--t1);
}
.zone-area {
  font-size: 11px;
  color: var(--t3);
  margin-top: 1px;
}
.zone-pf {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.pf-btn {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  padding: 5px 11px;
  border-radius: 6px;
  border: 1px solid var(--brd);
  background: var(--bg);
  color: var(--t3);
  cursor: pointer;
  transition: all .15s;
}
.pf-pass.active {
  background: #0e2a0e;
  border-color: #2e5a2e;
  color: #6ddc6d;
}
.pf-fail.active {
  background: #2a0e0e;
  border-color: #5a2e2e;
  color: #e07070;
}
.pf-btn:active { transform: scale(.95); }

.zone-detail {
  padding: 0 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.zone-kp {
  font-size: 12px;
  color: var(--t3);
  line-height: 1.5;
}
.zone-kp strong { color: var(--t2); }
.zone-disclaimer {
  font-size: 11px;
  color: #e07070;
  background: #2a0e0e;
  border-radius: 5px;
  padding: 5px 8px;
}
.zone-result {
  font-size: 12px;
  border-radius: 5px;
  padding: 6px 10px;
  line-height: 1.4;
}
.pass-result { background: #0e2a0e; color: #6ddc6d; }
.fail-result { background: #2a0e0e; color: #e07070; }

/* Pre-Primer session blocks */
.prime-session-block {
  background: var(--bg);
  border: 1px solid var(--brd);
  border-radius: 7px;
  padding: 10px 12px;
}
.prime-session-zone {
  font-size: 12px;
  font-weight: 700;
  color: var(--acc);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.prime-workout-row {
  font-size: 12px;
  color: var(--t2);
  margin-bottom: 5px;
  line-height: 1.5;
}
.prime-wk-lbl {
  font-weight: 600;
  color: var(--t1);
  margin-right: 4px;
}
.prime-move {
  display: inline-block;
  background: var(--bg2);
  border: 1px solid var(--brd);
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 12px;
  color: var(--t2);
  margin: 2px 3px 2px 0;
  vertical-align: middle;
}
.prime-move-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

/* Ignition grid */
.ignition-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.ignition-card {
  background: var(--bg);
  border: 1px solid var(--brd);
  border-radius: 8px;
  padding: 10px 12px;
}
.ignition-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--t1);
  margin-bottom: 4px;
}
.ignition-when {
  font-size: 11px;
  color: var(--t3);
  line-height: 1.4;
}

/* Fortification blocks */
.fort-block {
  background: var(--bg);
  border: 1px solid var(--brd);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fort-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--t1);
  margin-bottom: 2px;
}
.fort-spec {
  font-size: 11px;
  color: var(--t3);
  margin-bottom: 6px;
}

/* Prime Pro zone blocks */
.pro-zone-block {
  border: 1px solid var(--brd);
  border-radius: 9px;
  overflow: hidden;
}
.pro-zone-hd {
  background: var(--bg2);
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 700;
  color: var(--t1);
  border-bottom: 1px solid var(--brd);
}
.pro-zone-area {
  font-weight: 400;
  color: var(--t3);
  font-size: 12px;
}
.pro-zone-body {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pro-move-group {
  background: var(--bg);
  border: 1px solid var(--brd);
  border-radius: 7px;
  padding: 10px 12px;
}
.pro-move-type {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.repat-type  { color: #7eb8f7; }
.tension-type { color: #f7b87e; }
.active-type  { color: #9de89d; }

.pro-move-type-sub {
  font-size: 11px;
  color: var(--t3);
  margin-bottom: 8px;
  line-height: 1.4;
}
.pro-move-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  padding: 5px 0;
  border-bottom: 1px solid var(--brd);
}
.pro-move-row:last-child { border-bottom: none; }
.pro-move-name {
  font-size: 13px;
  color: var(--t1);
  flex: 1;
}
.pro-move-reps {
  font-size: 11px;
  color: var(--t3);
  text-align: right;
  flex-shrink: 0;
  max-width: 160px;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .ignition-grid { grid-template-columns: 1fr; }
  .pro-move-row { flex-direction: column; gap: 2px; }
  .pro-move-reps { max-width: 100%; text-align: left; }
}
