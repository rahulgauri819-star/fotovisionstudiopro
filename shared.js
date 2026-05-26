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
function istNow() { return new Date(Date.now() + (5.5*60*60*1000)); }
function todayStr() { return istNow().toISOString().slice(0,10); }
function yesterdayStr() { const d=istNow(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); }
function thisMonthStr() { return istNow().toISOString().slice(0,7); }
function formatDate(d) { if(!d) return ''; const dt=new Date(d+'T00:00:00'); return dt.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }

function normDate(d) {
  if(!d) return '';
  if(d.includes('-') && d.length===10) return d;
  if(d.includes('/')) {
    const parts = d.split('/');
    if(parts.length===3) {
      const [dd,mm,yyyy] = parts;
      return `${yyyy.length===2?'20'+yyyy:yyyy}-${mm.padStart(2,'0')}-${dd.padStart(2,'0')}`;
    }
  }
  const dt = new Date(d);
  if(!isNaN(dt)) return dt.toISOString().slice(0,10);
  return d;
}

// ── Bill Number Generation ────────────────────────────────────
// Format: FV-DDMMYY-001
function getBillDatePrefix() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2,'0');
  const mm = String(now.getMonth()+1).padStart(2,'0');
  const yy = String(now.getFullYear()).slice(-2);
  return `FV-${dd}${mm}${yy}`;
}

async function getNextBillNumber() {
  const prefix = getBillDatePrefix();
  const counterKey = 'billCounter_' + todayStr().replace(/-/g,'');
  if (window.db) {
    try {
      const ref = window.db.collection('counters').doc(counterKey);
      const snap = await ref.get();
      const next = (snap.exists ? snap.data().count : 0) + 1;
      await ref.set({ count: next, date: todayStr() });
      return `${prefix}-${String(next).padStart(3,'0')}`;
    } catch(e) { /* fallback to local */ }
  }
  // Local fallback
  const localCount = +(localStorage.getItem(counterKey)||'0') + 1;
  localStorage.setItem(counterKey, String(localCount));
  return `${prefix}-${String(localCount).padStart(3,'0')}`;
}

// ── Day Close Helpers ─────────────────────────────────────────
function isDayClosed(dateStr) {
  const closed = JSON.parse(localStorage.getItem('fv_day_closed')||'{}');
  return !!closed[dateStr||todayStr()];
}

function markDayClosed(dateStr, report) {
  const closed = JSON.parse(localStorage.getItem('fv_day_closed')||'{}');
  closed[dateStr||todayStr()] = report;
  localStorage.setItem('fv_day_closed', JSON.stringify(closed));
}
function formatDatetime(dt) { return dt ? dt.replace('T',' ').slice(0,16) : ''; }
function formatDelivery(dt) {
  if (!dt) return '';
  try {
    const str = dt.replace('T', ' ');
    const datePart = str.slice(0, 10);
    const timePart = str.slice(11, 16);
    const d = new Date(datePart + 'T00:00:00+05:30');
    const dayName = d.toLocaleDateString('en-IN', { weekday: 'long' });
    const dateFormatted = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    if (timePart) {
      const [h, m] = timePart.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${dayName}, ${dateFormatted} · ${h12}:${String(m).padStart(2,'0')} ${ampm}`;
    }
    return `${dayName}, ${dateFormatted}`;
  } catch(e) { return formatDatetime(dt); }
}

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
  '30x40': {w:30, h:40},
  '30x45': {w:30, h:45},
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
  '30x40': 1800,
  '30x45': 1800,
  '36x54': 2900,
  '44x66': 4400
};

// ── NP Quality Configuration ──────────────────────────────────
// Each size: pricePerPhoto, multipleOf, minQty
const NP_CONFIG = {
  '3x4':   { price: 7,   mult: 18, min: 90 },
  '4x6':   { price: 10,  mult: 9,  min: 45 },
  '5x7':   { price: 20,  mult: 5,  min: 25 },
  '6x8':   { price: 30,  mult: 4,  min: 20 },
  '8x10':  { price: 50,  mult: 2,  min: 10 },
  '8x12':  { price: 60,  mult: 2,  min: 10 },
  '12x18': { price: 100, mult: 1,  min: 5  },
  '13x19': { price: 125, mult: 1,  min: 5  }
};

// ── HDR Finishing Options (only for 10x12 and above, OPTIONAL) ──
// All ADDED on top of print cost. Cost = rate × sq.in × qty
const HDR_FINISH = {
  'lam':    { label: 'HDR Print with Lamination only', rate: 0.25 },
  'sun3':   { label: 'Sun Board 3mm',                  rate: 0.50 },
  'sun5':   { label: 'Sun Board 5mm',                  rate: 1.00 },
  'mdf3':   { label: 'MDF 3mm',                        rate: 0.60 },
  'mdf8':   { label: 'MDF 8mm',                        rate: 1.50 }
};

// ── Vinyl Backing Options (REPLACE the Vinyl print cost) ─────
const VINYL_BACKING = {
  'lam':    { label: 'Vinyl Print with Lamination only', rate: 0.60 },
  'sun3':   { label: 'Sun Board 3mm',                    rate: 1.20 },
  'sun5':   { label: 'Sun Board 5mm',                    rate: 1.40 },
  'mdf3':   { label: 'MDF 3mm',                          rate: 1.00 },
  'mdf8':   { label: 'MDF 8mm',                          rate: 1.50 }
};

// ── Canvas Stretcher (OPTIONAL, added per print) ──────────────
const STRETCHER_RATE_PER_FT = 100;

function calcStretcherCostPerPrint(sizeKey) {
  const s = SIZE_DIMS[sizeKey];
  if (!s) return 0;
  const perimeter = (s.w + s.h) * 2;             // inches
  const runningFt = Math.ceil(perimeter / 12);    // round up
  return runningFt * STRETCHER_RATE_PER_FT;
}

// ── NP Lamination (₹20 per multiple-of-N) ────────────────────
const NP_LAM_PER_MULT = 20;
function calcNPLamCost(sizeKey, qty) {
  const cfg = NP_CONFIG[sizeKey];
  if (!cfg) return 0;
  const multiples = Math.ceil(qty / cfg.mult);
  return multiples * NP_LAM_PER_MULT;
}

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

// ── Stock Items ───────────────────────────────────────────────
window.stockItems = [];

async function updateStockQty(id, newQty) {
  if(window.db) {
    try { await window.db.collection('stock').doc(id).update({qty:newQty}); } catch(e){}
  } else {
    localStorage.setItem('fv_stock', JSON.stringify(window.stockItems));
  }
}

async function loadStock() {
  if(window.db) {
    try {
      window.db.collection('stock').onSnapshot(snap=>{
        window.stockItems = snap.docs.map(d=>({id:d.id,...d.data()}));
      });
    } catch(e){window.stockItems=JSON.parse(localStorage.getItem('fv_stock')||'[]');}
  } else {
    window.stockItems = JSON.parse(localStorage.getItem('fv_stock')||'[]');
  }
}
const MOULDING_SIZES = ['0.5','0.75','1','1.5','2','2.5','3','3.5','4','5'];
const MOUNT_SIZES    = [1, 1.5, 2, 2.5, 3, 3.5, 4];
const FRAME_PRICE_PER_FT = 10;

// Round moulding size UP to nearest whole inch
function mouldRound(size) {
  return Math.ceil(parseFloat(size));
}

// Frame cost without mount
// Cost = [(L+B)×2] + [mouldRound(size) × 8 × FRAME_PRICE_PER_FT]
function calcFrameCost(l, b, mouldSize) {
  const perim = (l + b) * 2;
  const mouldCost = mouldRound(mouldSize) * 8 * FRAME_PRICE_PER_FT;
  return perim + mouldCost;
}

// Frame cost with mount
// NewL = L + mountSize×2, NewB = B + mountSize×2
function calcFrameCostWithMount(l, b, mouldSize, mountSize) {
  const newL = l + mountSize * 2;
  const newB = b + mountSize * 2;
  return calcFrameCost(newL, newB, mouldSize);
}

// Sleeve pricing
// Above 16×20 means area > 320 sq.in
function sleevePriceAbove(l, b) {
  return (l * b) > 320;
}
const SLEEVE_PRICES = {
  plain:  { small: 100, large: 200 },
  stripe: { small: 200, large: 350 }
};
function calcSleeveCost(type, l, b) {
  const above = sleevePriceAbove(l, b);
  return SLEEVE_PRICES[type][above ? 'large' : 'small'];
}

// Default mouldings per size (used on first load if Firebase empty)
const DEFAULT_MOULDINGS = {
  '0.5':  [{code:'M1',name:'Golden Oak',price:10},{code:'M2',name:'Matte Black',price:15},{code:'M3',name:'Walnut Brown',price:12},{code:'M4',name:'Silver Chrome',price:18},{code:'M5',name:'Ivory White',price:20}],
  '0.75': [{code:'M1',name:'Golden Oak',price:10},{code:'M2',name:'Matte Black',price:15},{code:'M3',name:'Walnut Brown',price:12},{code:'M4',name:'Silver Chrome',price:18},{code:'M5',name:'Ivory White',price:20}],
  '1':    [{code:'M1',name:'Classic Gold',price:10},{code:'M2',name:'Classic Silver',price:15},{code:'M3',name:'Matt Black',price:12},{code:'M4',name:'Rustic Wood',price:18},{code:'M5',name:'White Gloss',price:20}],
  '1.5':  [{code:'M1',name:'Antique Bronze',price:10},{code:'M2',name:'Dark Walnut',price:15},{code:'M3',name:'Champagne Gold',price:12},{code:'M4',name:'Rose Gold',price:18},{code:'M5',name:'Ivory Matte',price:20}],
  '2':    [{code:'M1',name:'Ornate Gold',price:10},{code:'M2',name:'Ebony Black',price:15},{code:'M3',name:'Mahogany',price:12},{code:'M4',name:'Teak Brown',price:18},{code:'M5',name:'Gunmetal Grey',price:20}],
  '2.5':  [{code:'M1',name:'Fluted Gold',price:10},{code:'M2',name:'Wide Walnut',price:15},{code:'M3',name:'Distressed White',price:12},{code:'M4',name:'Natural Oak',price:18},{code:'M5',name:'Metallic Silver',price:20}],
  '3':    [{code:'M1',name:'Golden Oak',price:10},{code:'M2',name:'Matte Black',price:15},{code:'M3',name:'Walnut Brown',price:12},{code:'M4',name:'Silver Chrome',price:18},{code:'M5',name:'Ivory White',price:20}],
  '3.5':  [{code:'M1',name:'Golden Oak',price:10},{code:'M2',name:'Matte Black',price:15},{code:'M3',name:'Walnut Brown',price:12},{code:'M4',name:'Silver Chrome',price:18},{code:'M5',name:'Ivory White',price:20}],
  '4':    [{code:'M1',name:'Golden Oak',price:10},{code:'M2',name:'Matte Black',price:15},{code:'M3',name:'Walnut Brown',price:12},{code:'M4',name:'Silver Chrome',price:18},{code:'M5',name:'Ivory White',price:20}],
  '5':    [{code:'M1',name:'Golden Oak',price:10},{code:'M2',name:'Matte Black',price:15},{code:'M3',name:'Walnut Brown',price:12},{code:'M4',name:'Silver Chrome',price:18},{code:'M5',name:'Ivory White',price:20}],
};

// In-memory moulding cache (loaded from Firebase)
window.mouldingsCache = {};

// Load mouldings from Firebase into cache
async function loadMouldings() {
  if (!window.db) return;
  try {
    const snap = await window.db.collection('mouldings').get();
    if (snap.empty) {
      // Seed defaults
      for (const size of MOULDING_SIZES) {
        await window.db.collection('mouldings').doc(size + 'inch').set({ items: DEFAULT_MOULDINGS[size] || [] });
        window.mouldingsCache[size] = DEFAULT_MOULDINGS[size] || [];
      }
    } else {
      snap.forEach(doc => {
        const key = doc.id.replace('inch','');
        window.mouldingsCache[key] = doc.data().items || [];
      });
    }
  } catch(e) { console.error('loadMouldings:', e); }
}

// Save mouldings for a size back to Firebase
async function saveMouldings(size) {
  if (!window.db) return;
  try {
    await window.db.collection('mouldings').doc(size + 'inch').set({ items: window.mouldingsCache[size] || [] });
  } catch(e) { console.error('saveMouldings:', e); }
}

// Add a moulding to a size
async function addMoulding(size, code, name, price=10) {
  if (!window.mouldingsCache[size]) window.mouldingsCache[size] = [];
  window.mouldingsCache[size].push({ code, name, price });
  await saveMouldings(size);
}

// Delete a moulding from a size (owner only)
async function deleteMoulding(size, index) {
  if (!window.mouldingsCache[size]) return;
  window.mouldingsCache[size].splice(index, 1);
  await saveMouldings(size);
}

// ── Service Label Tree Parser ─────────────────────────────────
function parseServiceLabel(item) {
  const svcs = item.svcs || [item.svc] || [];
  const label = item.label || '';
  const price = item.price || 0;

  // Smart parser - different services have different label formats
  const hasFraming = svcs.includes('Framing');
  const hasPrinting = svcs.includes('Printing');
  const hasEditing = svcs.includes('Photo Editing');
  const hasPassport = svcs.includes('Passport Photos');
  const hasVisa = svcs.includes('Visa Photos');

  let lines = [];

  if (hasFraming && hasPrinting) {
    // Combined: split into print part and frame part
    // Label like: "Print 10×12" HDR ×1 ₹310 · Frame 1" M4 +Mount 2" [Stand] Rs.404"
    const midDot = label.indexOf('·');
    if (midDot > 0) {
      const printPart = label.slice(0, midDot).trim();
      const framePart = label.slice(midDot + 1).trim();
      lines = [
        ...parsePrintPart(printPart),
        ...parseFramePart(framePart)
      ];
    } else {
      lines = smartSplit(label);
    }
  } else if (hasFraming) {
    lines = parseFramePart(label);
  } else if (hasPrinting) {
    lines = parsePrintPart(label);
  } else {
    // Default: split by · or + 
    lines = label.split('·').map(s=>s.trim()).filter(Boolean);
    if (lines.length <= 1) lines = label.split('+').map(s=>s.trim()).filter(Boolean);
    if (lines.length <= 1 && label) lines = [label];
  }

  if(!lines.length && label) lines = [label];
  return { svcs, lines, price };
}

function parsePrintPart(part) {
  // "Print 10×12" HDR ×1 SunBoard 3mm ₹310"
  const lines = [];
  const sizeM = part.match(/(\d+[×x]\d+["']?)/);
  const qualM = part.match(/\b(HDR|Vinyl|Canvas|NF|Lustre|Matte|Glossy)\b/i);
  const qtyM = part.match(/[×x](\d+)\s*(?:prints?|pcs?|copies)?/i);
  const backM = part.match(/\b(Sun\s?Board|Sunboard|MDF|Foam|Mount\s?Board)[^·+]*/i);
  if (sizeM) lines.push('🖨️ Print Size: ' + sizeM[1]);
  if (qualM) lines.push('Quality: ' + qualM[1]);
  if (qtyM) lines.push('Qty: ' + qtyM[1] + ' print' + (+qtyM[1]>1?'s':''));
  if (backM) lines.push('Backing: ' + backM[0].trim());
  return lines.length ? lines : (part ? [part] : []);
}

function parseFramePart(part) {
  // "Frame 1" M4-Rustic Wood +Mount 2" [Table Stand+Hanging Wire] +Sleeve(GoldenStripe) Rs.200 Rs.404"
  const lines = [];
  const mouldM = part.match(/Frame\s*([\d.]+["']?)\s*([^+\[]+?)(?:\s*\+Mount|\s*\[|$)/i);
  const mountM = part.match(/\+?Mount\s*([\d.]+["']?)/i);
  const accM = part.match(/\[([^\]]+)\]/);
  const sleeveM = part.match(/\+Sleeve\(([^)]+)\)/i);

  if (mouldM) lines.push('🖼️ Moulding: ' + mouldM[1] + ' ' + mouldM[2].trim());
  if (mountM) lines.push('Mount: ' + mountM[1]);
  if (accM) {
    const accs = accM[1].split(/[+,]/).map(s=>s.trim()).filter(Boolean);
    accs.forEach(a => lines.push('Acc: ' + a));
  }
  if (sleeveM) lines.push('Sleeve: ' + sleeveM[1]);
  return lines.length ? lines : (part ? smartSplit(part) : []);
}

function smartSplit(label) {
  let parts = label.split('·').map(s=>s.trim()).filter(Boolean);
  if (parts.length > 1) return parts;
  parts = label.split(/\s*\+(?=[A-Z\[])/).map(s=>s.trim()).filter(Boolean);
  if (parts.length > 1) return parts;
  return label ? [label] : [];
}

// Render service as tree HTML (for bottom sheets, cards etc)
function renderServiceTree(item, compact=false, hidePrice=false) {
  const {svcs, lines, price} = parseServiceLabel(item);
  const svcLabel = svcs.map(s=>(window.SVC_ICONS?.[s]||'📦')+' '+s).join(' + ');
  const fontSize = compact ? '11px' : '12px';
  const padding = compact ? '8px' : '12px';

  if(!lines.length) {
    return `<div style="background:var(--paper);border-radius:8px;padding:${padding};margin-bottom:6px;border-left:3px solid var(--gold-dk);">
      <div style="font-weight:700;color:var(--gold-dk);margin-bottom:4px;">${svcLabel}</div>
      ${!hidePrice?`<div style="font-weight:700;color:var(--gold-dk);font-size:13px;">Rs.${price}</div>`:''}
    </div>`;
  }

  const treeLines = lines.map((line, i) => {
    const isLast = i === lines.length - 1;
    const connector = isLast ? '└──' : '├──';
    return `<div style="display:flex;align-items:flex-start;gap:5px;font-size:${fontSize};color:var(--ink2);padding:1px 0 1px ${compact?'4px':'8px'};">
      <span style="color:var(--gold-dk);font-family:monospace;flex-shrink:0;font-size:10px;margin-top:1px;">${connector}</span>
      <span>${line}</span>
    </div>`;
  }).join('');

  return `<div style="background:var(--paper);border-radius:8px;padding:${padding};margin-bottom:6px;border-left:3px solid var(--gold-dk);">
    <div style="font-weight:700;color:var(--gold-dk);margin-bottom:6px;font-size:${compact?'12px':'14px'};">${svcLabel}</div>
    ${treeLines}
    ${!hidePrice?`<div style="font-weight:700;color:var(--gold-dk);margin-top:6px;font-size:13px;">Rs.${price}</div>`:''}
  </div>`;
}

// ══════════════════════════════════════════════════════════════
// WHATSAPP NOTIFICATIONS via AiSensy
// ══════════════════════════════════════════════════════════════
const AISENSY_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTIxNjhlNmY2NDYzMmY5MmZiY2M4ZSIsIm5hbWUiOiJGb3RvIFZpc2lvbiBTdHVkaW8gUHJvIiwiaWF0IjoxNzQ0ZTZmNjQ2MzJmOTJmYmNjOGUiLCJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0SWQiOiI2YTEyMTY4ZTZmNjQ2MzJmOTJmYmNjOGUifQ.4x4xQUTDXMLfDsDXVef21aNVlW1Jlj6fDg_t3QiwXtY';
const OWNER_WHATSAPP = '919871977718'; // owner number with country code

// Firebase proxy URL — routes through server to bypass AiSensy host allowlist
const WA_PROXY_URL = 'https://us-central1-foto-vision-studio-pro.cloudfunctions.net/sendWhatsAppMessage';

async function sendWhatsApp(phone, templateName, params) {
  try {
    let num = String(phone||'').replace(/[^0-9]/g,'');
    if(num.length === 10) num = '91' + num;
    if(!num || num.length < 10) {
      console.warn('[WA] Skipped - invalid phone:', phone);
      return;
    }
    console.log('[WA] Sending via Firebase proxy:', templateName, '→', num);
    const res = await fetch(WA_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: num, templateName, params: params || [] })
    });
    const result = await res.json().catch(()=>({}));
    console.log('[WA] Response:', res.status, result);
  } catch(e) {
    console.warn('[WA] WhatsApp send failed:', e);
  }
}

// ── Notification helpers ──────────────────────────────────────

// Called when a NEW ORDER is created
window.waNEwOrder = async function(order) {
  const svcs = [...new Set((order.cartItems||[]).flatMap(i=>i.svcs||[i.svc]))].join(', ') || 'Services';
  const isInstant = order.orderType === 'Instant';

  // Notify OWNER
  await sendWhatsApp(OWNER_WHATSAPP, 'fv_new_order_owner', [
    order.name,                                // customer name
    order.billNo || order.id || '',            // bill no
    String(order.total || 0),                  // total
    svcs,                                       // services
    order.staff || '',                          // staff
    isInstant ? 'Instant' : 'Booking'          // order type
  ]);

  // Notify CUSTOMER (only if phone exists)
  if (order.phone) {
    const tpl = isInstant ? 'fv_order_placed_instant_customer' : 'fv_order_placed_booking_customer';
    const params = isInstant
      ? [order.name, order.billNo || '', String(order.total || 0), svcs]
      : [order.name, order.billNo || '', String(order.total || 0), svcs,
         order.delivery ? formatDelivery(order.delivery) : ''];
    await sendWhatsApp(order.phone, tpl, params);
  }
};

// Called when order status changes
window.waStatusChange = async function(order, newStatus) {
  if (newStatus === 'Ready' && order.phone) {
    // Notify CUSTOMER their order is ready
    await sendWhatsApp(order.phone, 'fv_order_ready_customer', [
      order.name,
      order.billNo || order.id || '',
      String((+order.total||0) - (+order.advance||0)), // balance due
    ]);
  }
  if (newStatus === 'Delivered') {
    // Notify OWNER of delivery
    await sendWhatsApp(OWNER_WHATSAPP, 'fv_order_delivered_owner', [
      order.name,
      order.billNo || order.id || '',
      String(order.total || 0),
      order.staff || '',
    ]);
  }
};

// Called on Day End
window.waDayEnd = async function(report) {
  await sendWhatsApp(OWNER_WHATSAPP, 'fv_day_end_owner', [
    formatDate(report.date),
    String(report.ordersCount || 0),
    String(report.totalSales || 0),
    String(report.totalExpenses || 0),
    String(report.netCashExpected || 0),
    String(report.cashCounted || 0),
    report.cashDifference >= 0
      ? `+${report.cashDifference}` : String(report.cashDifference),
  ]);
};

// Called on new purchase
window.waNewPurchase = async function(purchase) {
  if ((+purchase.amount || 0) < 500) return; // only notify for purchases > 500
  await sendWhatsApp(OWNER_WHATSAPP, 'fv_new_purchase_owner', [
    purchase.vendor || purchase.desc || 'Purchase',
    String(purchase.amount || 0),
    purchase.paidBy || 'Cash',
    purchase.addedBy || '',
    formatDate(purchase.date || todayStr()),
  ]);
};

// Called for approval requests (discount, cancel, delete, complimentary, reopen, production, large purchase)
window.waApprovalRequest = async function(type, details) {
  const templateMap = {
    discount:      'fv_discount_request_owner',
    cancel:        'fv_cancel_request_owner',
    delete:        'fv_delete_order_owner',
    complimentary: 'fv_complimentary_request_owner',
    reopen:        'fv_reopen_day_owner',
    production:    'fv_production_request_owner',
    largePurchase: 'fv_large_purchase_owner',
  };
  const tpl = templateMap[type];
  if (!tpl) return;
  await sendWhatsApp(OWNER_WHATSAPP, tpl, details || []);
};
// ══════════════════════════════════════════════════════════════

