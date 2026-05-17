// ═══════════════════════════════════════════════════════════
//  FOTOVISION STUDIO PRO — Shared Utilities
// ═══════════════════════════════════════════════════════════

// ── Auth Guard ──────────────────────────────────────────────
function requireRole(expectedRole) {
  const role = sessionStorage.getItem('fv_role');
  if (!role) { window.location.href = '../index.html'; return false; }
  if (expectedRole && role !== expectedRole) {
    window.location.href = '../index.html'; return false;
  }
  return true;
}

function getCurrentRole() { return sessionStorage.getItem('fv_role'); }
function getCurrentIcon() { return sessionStorage.getItem('fv_icon') || ''; }
function getCurrentName() { return sessionStorage.getItem('fv_name') || ''; }

function doLogout() {
  sessionStorage.clear();
  window.location.href = '../index.html';
}

// ── Toast ────────────────────────────────────────────────────
let toastTimer = null;
function toast(msg, type = 'success') {
  let el = document.getElementById('fv-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'fv-toast';
    el.className = 'toast hidden';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `toast ${type}`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3200);
}

// ── Status Config ─────────────────────────────────────────────
const STATUS_CFG = {
  'Pending':     { cls: 'status-pending',   dot: '#F5A623', bg: '#FFF8E1', cl: '#7D5C00' },
  'In Progress': { cls: 'status-progress',  dot: '#2196F3', bg: '#E3F2FD', cl: '#1565C0' },
  'Ready':       { cls: 'status-ready',     dot: '#4CAF50', bg: '#EBF7F2', cl: '#2D8A5E' },
  'Delivered':   { cls: 'status-delivered', dot: '#9E9E9E', bg: '#F5F5F5', cl: '#555'    },
};

const SVC_ICONS = {
  'Photo Editing':'🎨','Printing':'🖨️','Framing':'🖼️','Sunboard':'🟫',
  'MDF Board':'🪵','Passport Photos':'📷','Visa Photos':'🛂',
  'Album Printing':'📚','Portfolio Shoot':'📸','Video Editing':'🎬',
  'Video Converting':'📼','Doorstep Passport':'🏠📷','Doorstep Visa':'🏠🛂'
};

const FRAMING_SVCS = ['Framing','Sunboard','MDF Board'];

// ── Date Helpers ──────────────────────────────────────────────
function todayStr() { return new Date().toLocaleDateString('en-IN'); }
function formatDatetime(dt) { return dt ? dt.replace('T',' ').slice(0,16) : ''; }

// ── Number Format ─────────────────────────────────────────────
function inr(n) { return '₹' + (+(n)||0).toLocaleString('en-IN'); }

// ── Approval System ──────────────────────────────────────────
let _approvalCb = null;
let _approvalReq = null;

function openApproval({ title, sub, onApprove, onCancel }) {
  _approvalCb = { onApprove, onCancel };
  document.getElementById('appr-title').innerHTML = title;
  document.getElementById('appr-sub').innerHTML   = sub;
  document.getElementById('appr-pw-input').value  = '';
  document.getElementById('appr-err').classList.add('hidden');
  switchApprTab('pw');
  document.getElementById('appr-req-status').innerHTML = '';
  document.getElementById('appr-ok-btn').disabled = false;
  document.getElementById('appr-ok-btn').textContent = '✅ Confirm';
  document.getElementById('appr-ok-btn').onclick = submitApproval;
  document.getElementById('approval-modal').classList.remove('hidden');
  setTimeout(() => document.getElementById('appr-pw-input').focus(), 120);
}

function closeApproval() {
  document.getElementById('approval-modal').classList.add('hidden');
  if (_approvalCb?.onCancel) _approvalCb.onCancel();
  _approvalCb = null; _approvalReq = null;
  hideOwnerBanner();
}

function switchApprTab(tab) {
  document.getElementById('appr-tab-pw').classList.toggle('act', tab === 'pw');
  document.getElementById('appr-tab-req').classList.toggle('act', tab === 'req');
  document.getElementById('appr-pw-sec').classList.toggle('hidden', tab !== 'pw');
  document.getElementById('appr-req-sec').classList.toggle('hidden', tab !== 'req');
  const btn = document.getElementById('appr-ok-btn');
  if (tab === 'req') { btn.textContent = '📨 Send Request'; btn.onclick = sendOwnerRequest; }
  else               { btn.textContent = '✅ Confirm';      btn.onclick = submitApproval; }
}

const OWNER_PASS = 'owner123';

function submitApproval() {
  const pw = document.getElementById('appr-pw-input').value;
  if (pw === OWNER_PASS) {
    document.getElementById('approval-modal').classList.add('hidden');
    hideOwnerBanner();
    const cb = _approvalCb;
    _approvalCb = null; _approvalReq = null;
    if (cb?.onApprove) cb.onApprove();
    toast('✅ Approved!', 'success');
  } else {
    document.getElementById('appr-err').classList.remove('hidden');
    document.getElementById('appr-pw-input').value = '';
    document.getElementById('appr-pw-input').focus();
    setTimeout(() => document.getElementById('appr-err').classList.add('hidden'), 3000);
  }
}

function sendOwnerRequest() {
  _approvalReq = { cb: _approvalCb };
  const title = document.getElementById('appr-title').innerHTML;
  document.getElementById('owner-banner-text').textContent = '🔔 Staff needs approval';
  document.getElementById('owner-banner').classList.remove('hidden');
  document.getElementById('appr-req-status').innerHTML =
    '<span style="color:#2D8A5E;font-weight:700;">✅ Request sent to Owner!</span>';
  document.getElementById('appr-ok-btn').disabled = true;
  document.getElementById('appr-ok-btn').textContent = '⏳ Waiting…';
}

function handleOwnerBannerClick() {
  if (!_approvalReq) return;
  hideOwnerBanner();
  const sub = document.getElementById('appr-sub')?.innerHTML || '';
  if (confirm('Approve this request?\n\n' + sub.replace(/<[^>]+>/g, ''))) {
    document.getElementById('approval-modal').classList.add('hidden');
    const cb = _approvalReq.cb;
    _approvalCb = null; _approvalReq = null;
    if (cb?.onApprove) cb.onApprove();
    toast('✅ Owner Approved!', 'success');
  } else {
    document.getElementById('approval-modal').classList.add('hidden');
    const cb = _approvalReq.cb;
    _approvalCb = null; _approvalReq = null;
    if (cb?.onCancel) cb.onCancel();
    toast('❌ Request denied', 'error');
  }
}

function hideOwnerBanner() {
  const b = document.getElementById('owner-banner');
  if (b) b.classList.add('hidden');
}

// ── Discount Logic ────────────────────────────────────────────
function onDiscountSelect(pct, cartTotal, role, applyFn, cancelFn) {
  if (pct === 0) { applyFn(0); return; }
  if (role === 'owner') { applyFn(pct); return; }
  openApproval({
    title: '🏷️ Discount Approval',
    sub: `Applying <b>${pct}%</b> discount requires Owner approval.`,
    onApprove: () => applyFn(pct),
    onCancel: cancelFn,
  });
}

// ── Print Prices ──────────────────────────────────────────────
const PRINT_PRICES = {
  '2x3':{HDR:12,Vinyl:18,Canvas:25,NP:8},'3x4':{HDR:18,Vinyl:25,Canvas:35,NP:12},
  '3.5x5':{HDR:25,Vinyl:35,Canvas:48,NP:18},'4x6':{HDR:30,Vinyl:45,Canvas:60,NP:22},
  '5x7':{HDR:50,Vinyl:70,Canvas:95,NP:38},'6x8':{HDR:70,Vinyl:95,Canvas:130,NP:52},
  '6x9':{HDR:80,Vinyl:110,Canvas:148,NP:58},'8x10':{HDR:110,Vinyl:150,Canvas:200,NP:80},
  '8x12':{HDR:130,Vinyl:180,Canvas:240,NP:95},'10x12':{HDR:160,Vinyl:220,Canvas:295,NP:118},
  '10x14':{HDR:190,Vinyl:260,Canvas:348,NP:138},'10x15':{HDR:200,Vinyl:275,Canvas:370,NP:148},
  '12x15':{HDR:240,Vinyl:330,Canvas:440,NP:178},'12x16':{HDR:260,Vinyl:355,Canvas:475,NP:192},
  '12x18':{HDR:290,Vinyl:398,Canvas:530,NP:215},'14x18':{HDR:340,Vinyl:465,Canvas:620,NP:252},
  '16x20':{HDR:430,Vinyl:590,Canvas:788,NP:320},'16x24':{HDR:515,Vinyl:708,Canvas:945,NP:384},
  '18x24':{HDR:580,Vinyl:795,Canvas:1060,NP:432},'20x24':{HDR:645,Vinyl:885,Canvas:1180,NP:480},
  '20x30':{HDR:800,Vinyl:1100,Canvas:1470,NP:600}
};
const SIZE_DIMS = {
  '2x3':{w:2,h:3},'3x4':{w:3,h:4},'3.5x5':{w:3.5,h:5},'4x6':{w:4,h:6},
  '5x7':{w:5,h:7},'6x8':{w:6,h:8},'6x9':{w:6,h:9},'8x10':{w:8,h:10},
  '8x12':{w:8,h:12},'10x12':{w:10,h:12},'10x14':{w:10,h:14},'10x15':{w:10,h:15},
  '12x15':{w:12,h:15},'12x16':{w:12,h:16},'12x18':{w:12,h:18},'14x18':{w:14,h:18},
  '16x20':{w:16,h:20},'16x24':{w:16,h:24},'18x24':{w:18,h:24},'20x24':{w:20,h:24},'20x30':{w:20,h:30}
};
