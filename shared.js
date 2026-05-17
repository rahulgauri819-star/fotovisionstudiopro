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

// ── Print Sizes & Dimensions ─────────────────────────────────
const SIZE_DIMS = {
  '2x3':   {w:2,  h:3},
  '3x4':   {w:3,  h:4},
  '3.5x5': {w:3.5,h:5},
  '4x6':   {w:4,  h:6},
  '5x7':   {w:5,  h:7},
  '6x8':   {w:6,  h:8},
  '6x9':   {w:6,  h:9},
  '8x10':  {w:8,  h:10},
  '8x12':  {w:8,  h:12},
  '10x12': {w:10, h:12},
  '12x15': {w:12, h:15},
  '12x18': {w:12, h:18},
  '13x19': {w:13, h:19},
  '16x20': {w:16, h:20},
  '16x24': {w:16, h:24},
  '20x24': {w:20, h:24},
  '20x30': {w:20, h:30},
  '24x36': {w:24, h:36},
  '36x54': {w:36, h:54},
  '44x66': {w:44, h:66}
};

// ── HDR Quantity-based pricing for sizes UP TO 8x12 ───────────
// Format: [price for 1-19, 20-49, 50-99, 100+]
const HDR_QTY_PRICES = {
  '2x3':   [30, 25, 20, 18],
  '3x4':   [30, 25, 20, 18],
  '3.5x5': [30, 25, 20, 18],
  '4x6':   [30, 25, 20, 18],
  '5x7':   [50, 45, 40, 35],
  '6x8':   [60, 55, 50, 45],
  '6x9':   [75, 55, 50, 45],
  '8x10':  [150, 125, 100, 75],
  '8x12':  [200, 150, 125, 100]
};

// ── HDR Flat per-print pricing for sizes 10x12 and above ──────
const HDR_FLAT_PRICES = {
  '10x12': 250,
  '12x15': 300,
  '12x18': 300,
  '13x19': 350,
  '16x20': 400,
  '16x24': 500,
  '20x24': 600,
  '20x30': 700,
  '24x36': 1300,
  '36x54': 2900,
  '44x66': 4400
};

// ── NP Quality Configuration ──────────────────────────────────
// Each size: pricePerPhoto, multipleOf, minQty
const NP_CONFIG = {
  '3x4':   { price: 7,   mult: 18, min: 90 },
  '4x6':   { price: 10,  mult: 9,  min: 45 },
  '5x7':   { price: 20,  mult: 5,  min: 25 },
  '6x8':   { price: 30,  mult: 4,  min: 30 },
  '8x10':  { price: 50,  mult: 2,  min: 10 },
  '8x12':  { price: 60,  mult: 2,  min: 10 },
  '12x18': { price: 100, mult: 1,  min: 5  },
  '13x19': { price: 125, mult: 1,  min: 5  }
};

// ── Vinyl Quality ─────────────────────────────────────────────
const VINYL_RATE = 0.60;       // ₹ per sq inch
const VINYL_MIN_SIZE = '12x15'; // smallest allowed

// ── Canvas Quality ────────────────────────────────────────────
const CANVAS_RATE = 2.75;      // ₹ per sq inch
const CANVAS_MIN_SIZE = '12x15';

// ── Photo Lamination ──────────────────────────────────────────
const LAM_RATE = 0.25;          // ₹ per sq inch
// Only available for HDR + sizes 10x12 and above

// ── Helpers ───────────────────────────────────────────────────
function getSizeArea(sizeKey) {
  const s = SIZE_DIMS[sizeKey];
  return s ? s.w * s.h : 0;
}

function isLargeSize(sizeKey) {
  // 10x12 and above
  return sizeKey in HDR_FLAT_PRICES;
}

function isSmallHDRSize(sizeKey) {
  return sizeKey in HDR_QTY_PRICES;
}

function getHDRPricePerPrint(sizeKey, qty) {
  if (HDR_FLAT_PRICES[sizeKey]) {
    return HDR_FLAT_PRICES[sizeKey];
  }
  if (HDR_QTY_PRICES[sizeKey]) {
    const tier = qty >= 100 ? 3 : qty >= 50 ? 2 : qty >= 20 ? 1 : 0;
    return HDR_QTY_PRICES[sizeKey][tier];
  }
  return 0;
}

function isVinylSizeAllowed(sizeKey) {
  // 12x15 and above
  const order = Object.keys(SIZE_DIMS);
  return order.indexOf(sizeKey) >= order.indexOf(VINYL_MIN_SIZE);
}

function isCanvasSizeAllowed(sizeKey) {
  const order = Object.keys(SIZE_DIMS);
  return order.indexOf(sizeKey) >= order.indexOf(CANVAS_MIN_SIZE);
}

function isNPSizeAllowed(sizeKey) {
  return sizeKey in NP_CONFIG;
}

function isLaminationAllowed(quality, sizeKey) {
  return quality === 'HDR' && isLargeSize(sizeKey);
}

function generateNPOptions(sizeKey, count = 20) {
  const cfg = NP_CONFIG[sizeKey];
  if (!cfg) return [];
  const opts = [];
  for (let i = 0; i < count; i++) {
    opts.push(cfg.min + i * cfg.mult);
  }
  return opts;
}

function isSizeAllowedForQuality(sizeKey, quality) {
  if (quality === 'HDR')    return isSmallHDRSize(sizeKey) || isLargeSize(sizeKey);
  if (quality === 'Vinyl')  return isVinylSizeAllowed(sizeKey);
  if (quality === 'Canvas') return isCanvasSizeAllowed(sizeKey);
  if (quality === 'NP')     return isNPSizeAllowed(sizeKey);
  return false;
}
