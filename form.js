// ═══════════════════════════════════════════════════════════
//  FOTOVISION STUDIO PRO — Shared Order Form
// ═══════════════════════════════════════════════════════════

function getFormHTML(existing, role) {
  const isOwner = role === 'owner';
  return `
<div style="max-width:800px;">
<div class="card" style="margin-bottom:16px;">
  <div class="card-body">

  <!-- 1. CUSTOMER -->
  <div class="form-section">
    <div class="section-head"><span class="section-num">1</span> Customer Details</div>
    <div class="form-grid-2" style="margin-bottom:12px;">
      <div class="form-group"><label class="form-label">Customer Name *</label><input class="form-input" id="f-name" placeholder="e.g. Priya Sharma" autocomplete="off"></div>
      <div class="form-group"><label class="form-label">Phone Number</label><input class="form-input" id="f-phone" type="tel" inputmode="tel" placeholder="9876543210"></div>
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label class="form-label">Address</label>
      <textarea class="form-input" id="f-address" placeholder="Customer address (optional)" rows="2"></textarea>
    </div>
    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">Assign to Staff</label>
        <select class="form-input" id="f-staff">
          <option>Ravi</option><option>Sunita</option><option>Kavita</option><option>Mohan</option><option>Framer Team</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Special Notes</label>
        <input class="form-input" id="f-notes" placeholder="Any special instructions…">
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- 2. SERVICES -->
  <div class="form-section">
    <div class="section-head"><span class="section-num">2</span> Select Service(s)</div>

    <div style="font-size:11px;font-weight:700;color:var(--gold-dk);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px;">🖨️ Printing &amp; Framing — Can be combined</div>
    <div class="check-grid" style="margin-bottom:8px;">
      <label class="check-btn"><input type="checkbox" name="groupA" value="Photo Editing" onchange="onGroupA()"><span>🎨 Photo Editing</span></label>
      <label class="check-btn"><input type="checkbox" name="groupA" value="Printing" onchange="onGroupA()"><span>🖨️ Printing</span></label>
      <label class="check-btn"><input type="checkbox" name="groupA" value="Framing" onchange="onGroupA()"><span>🖼️ Framing</span></label>
      <label class="check-btn"><input type="checkbox" name="groupA" value="Sunboard" onchange="onGroupA()"><span>🟫 Sunboard</span></label>
      <label class="check-btn"><input type="checkbox" name="groupA" value="MDF Board" onchange="onGroupA()"><span>🪵 MDF Board</span></label>
    </div>
    <div class="warn-box" id="svc-warn-ab">⚠️ Sunboard and MDF Board cannot be selected together.</div>

    <div style="font-size:11px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.07em;margin:16px 0 10px;">💼 Jobs — Individual items</div>
    <div class="pill-group">
      <label class="pill-option"><input type="radio" name="groupB" value="Passport Photos" onchange="onGroupB(this)"><span>📷 Passport Photos</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Visa Photos" onchange="onGroupB(this)"><span>🛂 Visa Photos</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Album Printing" onchange="onGroupB(this)"><span>📚 Album Printing</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Portfolio Shoot" onchange="onGroupB(this)"><span>📸 Portfolio Shoot</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Video Editing" onchange="onGroupB(this)"><span>🎬 Video Editing</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Video Converting" onchange="onGroupB(this)"><span>📼 Video Converting</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Doorstep Passport" onchange="onGroupB(this)"><span>🏠📷 Doorstep Passport</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Doorstep Visa" onchange="onGroupB(this)"><span>🏠🛂 Doorstep Visa</span></label>
    </div>
  </div>

  <!-- SERVICE PANELS -->
  <div id="svc-panel-area"></div>

  <!-- ADD TO CART -->
  <button onclick="addToCart()" style="width:100%;margin-top:16px;padding:14px;border-radius:var(--r-md);background:linear-gradient(135deg,#1C1410,#2E1F10);color:#D4AF72;border:2px solid var(--gold);font-family:'DM Sans',sans-serif;font-weight:700;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;">
    🛒 Add to Cart
  </button>

  </div>
</div>

<!-- 3. CART -->
<div class="card" style="margin-bottom:16px;">
  <div class="card-header"><div class="card-title">🛒 Order Cart</div></div>
  <div class="card-body">
    <div id="cart-items-display">
      <div style="text-align:center;padding:20px;color:var(--ink3);font-size:13px;background:var(--paper);border-radius:var(--r-md);">No items yet. Select services above and tap Add to Cart.</div>
    </div>
    <div id="cart-total-bar" class="cart-total-bar hidden">
      <div style="font-size:13px;font-weight:600;opacity:.9;">Cart Total</div>
      <div style="font-family:'DM Serif Display',serif;font-size:26px;" id="cart-total-amt">₹0</div>
    </div>
  </div>
</div>

<!-- 4. ORDER TYPE -->
<div class="card" style="margin-bottom:16px;">
  <div class="card-header"><div class="card-title">⚡ Order Type</div></div>
  <div class="card-body">
    <div class="toggle-group">
      <label class="toggle-option"><input type="radio" name="otype" value="Instant" checked onchange="onOrderType()"><span>⚡ Instant Order</span></label>
      <label class="toggle-option"><input type="radio" name="otype" value="Booking" onchange="onOrderType()"><span>📅 Booking Order</span></label>
    </div>
    <div id="delivery-box" class="hidden" style="margin-top:14px;padding:14px;background:var(--paper);border-radius:var(--r-md);border:1px solid var(--paper3);">
      <label class="form-label" style="display:block;margin-bottom:8px;">Delivery Date &amp; Time</label>
      <input class="form-input" id="f-delivery" type="datetime-local" style="max-width:320px;">
    </div>
  </div>
</div>

<!-- 5. BILLING -->
<div class="card" style="margin-bottom:16px;">
  <div class="card-header"><div class="card-title">💰 Billing &amp; Payment</div></div>
  <div class="card-body">

    <!-- Billing Summary -->
    <div id="billing-summary" style="display:none;background:var(--paper);border:1px solid var(--paper3);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13px;"></div>

    <!-- Discount -->
    <div style="margin-bottom:18px;">
      <label class="form-label" style="display:block;margin-bottom:10px;">Discount</label>
      <div class="pill-group">
        <label class="pill-option"><input type="radio" name="disc" value="0" checked onchange="onDiscountChange(0)"><span>No Discount</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="5" onchange="onDiscountChange(5)"><span>5%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="10" onchange="onDiscountChange(10)"><span>10%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="15" onchange="onDiscountChange(15)"><span>15%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="20" onchange="onDiscountChange(20)"><span>20%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="25" onchange="onDiscountChange(25)"><span>25%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="30" onchange="onDiscountChange(30)"><span>30%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="35" onchange="onDiscountChange(35)"><span>35%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="40" onchange="onDiscountChange(40)"><span>40%</span></label>
      </div>
      <div id="discount-tag" class="price-tag hidden" style="margin-top:10px;background:linear-gradient(135deg,#2D8A5E,#3DAA74);"></div>
    </div>

    <!-- Payment Mode -->
    <div style="margin-bottom:18px;">
      <label class="form-label" style="display:block;margin-bottom:10px;">Payment Mode</label>
      <div class="toggle-group">
        <label class="toggle-option"><input type="radio" name="paymode" value="Cash" checked><span>💵 Cash</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="UPI"><span>📱 UPI</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="Credit Card"><span>💳 Credit Card</span></label>
      </div>
    </div>

    <!-- Payment Amount -->
    <div id="payment-section">
      <div id="instant-pay-note" class="payment-note instant hidden">
        ⚡ Instant Order — Full payment will be collected at time of order.
      </div>
      <div id="booking-advance-box" class="hidden">
        <div class="form-group" style="max-width:280px;">
          <label class="form-label">Advance Collected (₹)</label>
          <input class="form-input" id="f-advance" type="number" min="0" placeholder="e.g. 500" inputmode="numeric">
        </div>
      </div>
    </div>

    <input type="hidden" id="f-charge">
  </div>
</div>

<!-- ACTIONS -->
<div style="display:flex;gap:12px;padding-bottom:20px;">
  <button class="btn btn-secondary btn-lg" style="flex:1;" onclick="requestCancelOrder()">✕ Cancel</button>
  <button class="btn btn-primary btn-lg" style="flex:2;" onclick="saveOrder()">💾 Save Order</button>
</div>

</div><!-- /max-width -->`;
}

// ── Service Detail Panels HTML ────────────────────────────────
function getSvcPanelHTML(svcs) {
  let html = '';
  if(svcs.includes('Photo Editing')) html += `
    <div class="svc-panel" id="panel-editing">
      <div class="section-head" style="font-size:15px;">🎨 Photo Editing — Charges</div>
      <div class="pill-group" style="margin-bottom:10px;">
        <label class="pill-option"><input type="radio" name="ep" value="200" onchange="calcEditing()"><span>₹200</span></label>
        <label class="pill-option"><input type="radio" name="ep" value="300" onchange="calcEditing()"><span>₹300</span></label>
        <label class="pill-option"><input type="radio" name="ep" value="500" onchange="calcEditing()"><span>₹500</span></label>
        <label class="pill-option"><input type="radio" name="ep" value="custom" onchange="calcEditing()"><span>✏️ Custom</span></label>
      </div>
      <div id="ep-custom-box" class="hidden" style="margin-bottom:8px;">
        <input class="form-input" id="ep-val" type="number" min="0" placeholder="Custom amount ₹" oninput="calcEditing()" style="max-width:200px;">
      </div>
      <div id="editing-price-tag" class="price-tag hidden"></div>
    </div>`;

  if(svcs.includes('Printing')) html += `
    <div class="svc-panel" id="panel-printing">
      <div class="section-head" style="font-size:15px;">🖨️ Printing Details</div>
      <div class="form-grid-2" style="margin-bottom:12px;">
        <div class="form-group">
          <label class="form-label">Print Size</label>
          <select class="form-input" id="pr-size" onchange="calcPrint()">
            <option value="">— Select Size —</option>
            <optgroup label="Wallet/Mini"><option value="2x3">2×3"</option><option value="3x4">3×4"</option><option value="3.5x5">3.5×5"</option></optgroup>
            <optgroup label="Standard"><option value="4x6">4×6"</option><option value="5x7">5×7"</option><option value="6x8">6×8"</option><option value="6x9">6×9"</option><option value="8x10">8×10"</option><option value="8x12">8×12"</option></optgroup>
            <optgroup label="Large"><option value="10x12">10×12"</option><option value="10x14">10×14"</option><option value="10x15">10×15"</option><option value="12x15">12×15"</option><option value="12x16">12×16"</option><option value="12x18">12×18"</option><option value="14x18">14×18"</option><option value="16x20">16×20"</option><option value="16x24">16×24"</option><option value="18x24">18×24"</option><option value="20x24">20×24"</option><option value="20x30">20×30"</option></optgroup>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Number of Prints</label>
          <input class="form-input" id="pr-qty" type="number" min="1" value="1" inputmode="numeric" oninput="calcPrint()">
        </div>
      </div>
      <label class="form-label" style="display:block;margin-bottom:8px;">Print Quality</label>
      <div class="pill-group" style="margin-bottom:10px;">
        <label class="pill-option"><input type="radio" name="pq" value="HDR" onchange="calcPrint()"><span>🌟 HDR</span></label>
        <label class="pill-option"><input type="radio" name="pq" value="Vinyl" onchange="calcPrint()"><span>🎨 Vinyl</span></label>
        <label class="pill-option"><input type="radio" name="pq" value="Canvas" onchange="calcPrint()"><span>🖼️ Canvas</span></label>
        <label class="pill-option"><input type="radio" name="pq" value="NP" onchange="calcPrint()"><span>📄 NP</span></label>
      </div>
      <div id="print-price-tag" class="price-info hidden"></div>
      <div style="margin-top:12px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">Photo Lamination</label>
        <div class="toggle-group">
          <label class="toggle-option"><input type="radio" name="lam" value="Yes" onchange="calcPrint()"><span>✅ Yes (+₹10/sq in)</span></label>
          <label class="toggle-option"><input type="radio" name="lam" value="No" checked onchange="calcPrint()"><span>❌ No</span></label>
        </div>
        <div id="lam-price-tag" class="price-info hidden" style="margin-top:8px;"></div>
      </div>
      <div id="print-total-tag" class="price-tag hidden" style="margin-top:10px;"></div>
    </div>`;

  if(svcs.includes('Framing')) html += `
    <div class="svc-panel" id="panel-framing">
      <div class="section-head" style="font-size:15px;">🖼️ Framing Details</div>
      <label class="form-label" style="display:block;margin-bottom:8px;">Frame Moulding Size</label>
      <div class="pill-group" style="margin-bottom:8px;">
        <label class="pill-option"><input type="radio" name="ms" value='0.5"' onchange="onMouldSize(this)"><span>0.5"</span></label>
        <label class="pill-option"><input type="radio" name="ms" value='1"' onchange="onMouldSize(this)"><span>1"</span></label>
        <label class="pill-option"><input type="radio" name="ms" value='1.5"' onchange="onMouldSize(this)"><span>1.5"</span></label>
        <label class="pill-option"><input type="radio" name="ms" value='2"' onchange="onMouldSize(this)"><span>2"</span></label>
        <label class="pill-option"><input type="radio" name="ms" value='2.5"' onchange="onMouldSize(this)"><span>2.5"</span></label>
      </div>
      <div id="mt-05" class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-bottom:8px;"><label class="form-label" style="display:block;margin-bottom:7px;">Type — 0.5"</label><div class="pill-group"><label class="pill-option"><input type="radio" name="mt" value="Thin Gold"><span>Thin Gold</span></label><label class="pill-option"><input type="radio" name="mt" value="Thin Silver"><span>Thin Silver</span></label><label class="pill-option"><input type="radio" name="mt" value="Thin Black"><span>Thin Black</span></label><label class="pill-option"><input type="radio" name="mt" value="Thin White"><span>Thin White</span></label><label class="pill-option"><input type="radio" name="mt" value="Slim Natural Wood"><span>Slim Natural Wood</span></label></div></div>
      <div id="mt-1"  class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-bottom:8px;"><label class="form-label" style="display:block;margin-bottom:7px;">Type — 1"</label><div class="pill-group"><label class="pill-option"><input type="radio" name="mt" value="Classic Gold"><span>Classic Gold</span></label><label class="pill-option"><input type="radio" name="mt" value="Classic Silver"><span>Classic Silver</span></label><label class="pill-option"><input type="radio" name="mt" value="Matt Black"><span>Matt Black</span></label><label class="pill-option"><input type="radio" name="mt" value="Rustic Wood"><span>Rustic Wood</span></label><label class="pill-option"><input type="radio" name="mt" value="White Gloss"><span>White Gloss</span></label></div></div>
      <div id="mt-15" class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-bottom:8px;"><label class="form-label" style="display:block;margin-bottom:7px;">Type — 1.5"</label><div class="pill-group"><label class="pill-option"><input type="radio" name="mt" value="Antique Bronze"><span>Antique Bronze</span></label><label class="pill-option"><input type="radio" name="mt" value="Dark Walnut"><span>Dark Walnut</span></label><label class="pill-option"><input type="radio" name="mt" value="Champagne Gold"><span>Champagne Gold</span></label><label class="pill-option"><input type="radio" name="mt" value="Rose Gold"><span>Rose Gold</span></label><label class="pill-option"><input type="radio" name="mt" value="Ivory Matte"><span>Ivory Matte</span></label></div></div>
      <div id="mt-2"  class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-bottom:8px;"><label class="form-label" style="display:block;margin-bottom:7px;">Type — 2"</label><div class="pill-group"><label class="pill-option"><input type="radio" name="mt" value="Ornate Baroque Gold"><span>Ornate Baroque Gold</span></label><label class="pill-option"><input type="radio" name="mt" value="Ebony Black"><span>Ebony Black</span></label><label class="pill-option"><input type="radio" name="mt" value="Mahogany"><span>Mahogany</span></label><label class="pill-option"><input type="radio" name="mt" value="Teak Brown"><span>Teak Brown</span></label><label class="pill-option"><input type="radio" name="mt" value="Gunmetal Grey"><span>Gunmetal Grey</span></label></div></div>
      <div id="mt-25" class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-bottom:8px;"><label class="form-label" style="display:block;margin-bottom:7px;">Type — 2.5"</label><div class="pill-group"><label class="pill-option"><input type="radio" name="mt" value="Fluted Gold"><span>Fluted Gold</span></label><label class="pill-option"><input type="radio" name="mt" value="Wide Walnut"><span>Wide Walnut</span></label><label class="pill-option"><input type="radio" name="mt" value="Distressed White"><span>Distressed White</span></label><label class="pill-option"><input type="radio" name="mt" value="Natural Oak Wide"><span>Natural Oak Wide</span></label><label class="pill-option"><input type="radio" name="mt" value="Metallic Silver Wide"><span>Metallic Silver Wide</span></label></div></div>
      <div style="margin-top:12px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">Mount in Frame?</label>
        <div class="toggle-group">
          <label class="toggle-option"><input type="radio" name="mnt" value="Yes" onchange="toggleMount()"><span>✅ Yes</span></label>
          <label class="toggle-option"><input type="radio" name="mnt" value="No" checked onchange="toggleMount()"><span>❌ No</span></label>
        </div>
        <div id="mount-box" class="hidden" style="margin-top:10px;padding:12px;background:var(--paper);border-radius:var(--r-sm);">
          <label class="form-label" style="display:block;margin-bottom:8px;">Mount Size</label>
          <div class="pill-group"><label class="pill-option"><input type="radio" name="mntS" value='0.5"'><span>0.5"</span></label><label class="pill-option"><input type="radio" name="mntS" value='1"'><span>1"</span></label><label class="pill-option"><input type="radio" name="mntS" value='1.5"'><span>1.5"</span></label><label class="pill-option"><input type="radio" name="mntS" value='2"'><span>2"</span></label><label class="pill-option"><input type="radio" name="mntS" value='2.5"'><span>2.5"</span></label></div>
        </div>
      </div>
      <div class="form-group" style="margin-top:14px;max-width:220px;">
        <label class="form-label">Framing Charge (₹)</label>
        <input class="form-input" id="frm-charge" type="number" min="0" placeholder="Enter price">
      </div>
    </div>`;

  if(svcs.includes('Sunboard')) html += `
    <div class="svc-panel" id="panel-sunboard">
      <div class="section-head" style="font-size:15px;">🟫 Sunboard Details</div>
      <label class="form-label" style="display:block;margin-bottom:8px;">Thickness</label>
      <div class="pill-group" style="margin-bottom:12px;">
        <label class="pill-option"><input type="radio" name="sun" value="1mm"><span>1mm</span></label>
        <label class="pill-option"><input type="radio" name="sun" value="2mm"><span>2mm</span></label>
        <label class="pill-option"><input type="radio" name="sun" value="3mm"><span>3mm</span></label>
        <label class="pill-option"><input type="radio" name="sun" value="4mm"><span>4mm</span></label>
        <label class="pill-option"><input type="radio" name="sun" value="5mm"><span>5mm</span></label>
      </div>
      <div class="form-group" style="max-width:220px;">
        <label class="form-label">Sunboard Charge (₹)</label>
        <input class="form-input" id="sun-charge" type="number" min="0" placeholder="Enter price">
      </div>
    </div>`;

  if(svcs.includes('MDF Board')) html += `
    <div class="svc-panel" id="panel-mdf">
      <div class="section-head" style="font-size:15px;">🪵 MDF Board Details</div>
      <label class="form-label" style="display:block;margin-bottom:8px;">Thickness</label>
      <div class="pill-group" style="margin-bottom:12px;">
        <label class="pill-option"><input type="radio" name="mdf" value="1mm"><span>1mm</span></label>
        <label class="pill-option"><input type="radio" name="mdf" value="2mm"><span>2mm</span></label>
        <label class="pill-option"><input type="radio" name="mdf" value="3mm"><span>3mm</span></label>
        <label class="pill-option"><input type="radio" name="mdf" value="4mm"><span>4mm</span></label>
        <label class="pill-option"><input type="radio" name="mdf" value="5mm"><span>5mm</span></label>
      </div>
      <div class="form-group" style="max-width:220px;">
        <label class="form-label">MDF Charge (₹)</label>
        <input class="form-input" id="mdf-charge" type="number" min="0" placeholder="Enter price">
      </div>
    </div>`;

  return html;
}

function getBPanelHTML(svc) {
  if(svc==='Passport Photos') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📷 Passport Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Fixed:</b> ₹200 for 8 copies · ₹100 per extra 8 copies</div>
    <div class="form-grid-2">
      <div class="form-group"><label class="form-label">Number of Copies</label><input class="form-input" id="pp-copies" type="number" min="8" step="8" value="8" inputmode="numeric" oninput="calcPassport()"></div>
      <div class="form-group"><label class="form-label">Charge</label><input class="form-input" id="pp-total" readonly style="background:#f0f0f0;font-weight:700;color:var(--gold-dk);"></div>
    </div></div>`;

  if(svc==='Visa Photos') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🛂 Visa Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Fixed:</b> ₹250 for 8 copies · ₹100 per extra 8 copies</div>
    <div class="form-grid-2" style="margin-bottom:10px;">
      <div class="form-group"><label class="form-label">Visa Type</label><select class="form-input" id="visa-type"><option>USA Visa</option><option>Schengen Visa</option><option>Singapore Visa</option><option>UK Visa</option><option>Other</option></select></div>
      <div class="form-group"><label class="form-label">Number of Copies</label><input class="form-input" id="vp-copies" type="number" min="8" step="8" value="8" inputmode="numeric" oninput="calcVisa()"></div>
    </div>
    <div class="form-group" style="max-width:200px;"><label class="form-label">Charge</label><input class="form-input" id="vp-total" readonly style="background:#f0f0f0;font-weight:700;color:var(--gold-dk);"></div></div>`;

  if(svc==='Album Printing') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📚 Album Printing</div>
    <div class="form-grid-2">
      <div class="form-group"><label class="form-label">Number of Pages</label><input class="form-input" id="alb-pages" type="number" min="1" value="1" inputmode="numeric"></div>
      <div class="form-group"><label class="form-label">Album Cost (₹)</label><input class="form-input" id="alb-cost" type="number" min="0" placeholder="Enter cost"></div>
    </div></div>`;

  if(svc==='Portfolio Shoot') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📸 Portfolio Shoot</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Base Charge:</b> ₹1,000 fixed</div>
    <div class="form-grid-2">
      <div class="form-group"><label class="form-label">Session Type</label><select class="form-input" id="port-type"><option>Indoor Studio</option><option>Outdoor</option><option>Fashion</option><option>Corporate</option><option>Kids</option><option>Wedding</option></select></div>
      <div class="form-group"><label class="form-label">Additional Charge (₹)</label><input class="form-input" id="port-extra" type="number" min="0" value="0" placeholder="Optional extra"></div>
    </div></div>`;

  if(svc==='Video Editing') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🎬 Video Editing</div>
    <div class="form-group" style="max-width:250px;"><label class="form-label">Editing Charge (₹)</label><input class="form-input" id="vid-edit-charge" type="number" min="0" placeholder="Enter charge"></div></div>`;

  if(svc==='Video Converting') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📼 Video Converting</div>
    <div class="form-group" style="max-width:250px;"><label class="form-label">Converting Charge (₹)</label><input class="form-input" id="vid-conv-charge" type="number" min="0" placeholder="Enter charge"></div></div>`;

  if(svc==='Doorstep Passport') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🏠📷 Doorstep Passport Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Fixed:</b> ₹500 for 8 copies · ₹100 per extra 8 copies</div>
    <div class="form-grid-2" style="margin-bottom:10px;">
      <div class="form-group"><label class="form-label">Number of Copies</label><input class="form-input" id="dpp-copies" type="number" min="8" step="8" value="8" inputmode="numeric" oninput="calcDoorPassport()"></div>
      <div class="form-group"><label class="form-label">Charge</label><input class="form-input" id="dpp-total" readonly style="background:#f0f0f0;font-weight:700;color:var(--gold-dk);"></div>
    </div>
    <div class="form-group"><label class="form-label">Doorstep Address</label><input class="form-input" id="ds-addr" placeholder="Customer address for visit"></div></div>`;

  if(svc==='Doorstep Visa') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🏠🛂 Doorstep Visa Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Fixed:</b> ₹500 for 8 copies · ₹100 per extra 8 copies</div>
    <div class="form-grid-2" style="margin-bottom:10px;">
      <div class="form-group"><label class="form-label">Number of Copies</label><input class="form-input" id="dvp-copies" type="number" min="8" step="8" value="8" inputmode="numeric" oninput="calcDoorVisa()"></div>
      <div class="form-group"><label class="form-label">Charge</label><input class="form-input" id="dvp-total" readonly style="background:#f0f0f0;font-weight:700;color:var(--gold-dk);"></div>
    </div>
    <div class="form-group"><label class="form-label">Doorstep Address</label><input class="form-input" id="dvs-addr" placeholder="Customer address for visit"></div></div>`;

  return '';
}

// ── Form Init & Interactions ──────────────────────────────────
function initFormJS(existing, role) {
  updatePaymentSection();
  if(existing) {
    document.getElementById('f-name').value    = existing.name||'';
    document.getElementById('f-phone').value   = existing.phone||'';
    document.getElementById('f-address').value = existing.address||'';
    document.getElementById('f-staff').value   = existing.staff||'Ravi';
    document.getElementById('f-notes').value   = existing.notes||'';
    // Restore order type
    const ot = document.querySelector(`input[name="otype"][value="${existing.orderType||'Instant'}"]`);
    if(ot) { ot.checked=true; onOrderType(); }
    if(existing.orderType==='Booking') document.getElementById('f-delivery').value = existing.delivery||'';
    // Restore advance
    if(existing.advance && existing.orderType==='Booking') {
      const fa = document.getElementById('f-advance'); if(fa) fa.value=existing.advance;
    }
    // Restore discount
    const dr = document.querySelector(`input[name="disc"][value="${existing.discountPct||0}"]`);
    if(dr) { dr.checked=true; applyDiscount(+(existing.discountPct||0)); }
    // Restore pay mode
    const pm = document.querySelector(`input[name="paymode"][value="${existing.payMode||'Cash'}"]`);
    if(pm) pm.checked=true;
    renderCart();
  }
}

// ── Service panel toggle ──────────────────────────────────────
window.onGroupA = function() {
  const sel = [...document.querySelectorAll('input[name="groupA"]:checked')].map(c=>c.value);
  const w = document.getElementById('svc-warn-ab');
  w.style.display = (sel.includes('Sunboard')&&sel.includes('MDF Board')) ? 'block':'none';
  document.querySelectorAll('input[name="groupB"]').forEach(r=>r.checked=false);
  document.getElementById('panel-b')?.remove();
  document.getElementById('svc-panel-area').innerHTML = getSvcPanelHTML(sel);
  calcPassport(); calcVisa(); calcDoorPassport(); calcDoorVisa();
};

window.onGroupB = function(el) {
  document.querySelectorAll('input[name="groupA"]').forEach(c=>c.checked=false);
  document.getElementById('svc-warn-ab').style.display='none';
  document.getElementById('svc-panel-area').innerHTML = getBPanelHTML(el.value);
  if(el.value==='Passport Photos') calcPassport();
  if(el.value==='Visa Photos')     calcVisa();
  if(el.value==='Doorstep Passport') calcDoorPassport();
  if(el.value==='Doorstep Visa')   calcDoorVisa();
};

window.onOrderType      = onOrderType;
window.onMouldSize      = function(el) {
  ['mt-05','mt-1','mt-15','mt-2','mt-25'].forEach(id=>document.getElementById(id)?.classList.add('hidden'));
  const map={'0.5"':'mt-05','1"':'mt-1','1.5"':'mt-15','2"':'mt-2','2.5"':'mt-25'};
  if(map[el.value]) document.getElementById(map[el.value])?.classList.remove('hidden');
  document.querySelectorAll('input[name="mt"]').forEach(r=>r.checked=false);
};
window.toggleMount = function() {
  document.getElementById('mount-box')?.classList.toggle('hidden',
    document.querySelector('input[name="mnt"]:checked')?.value!=='Yes');
};

function onOrderType() {
  const otype = document.querySelector('input[name="otype"]:checked')?.value;
  document.getElementById('delivery-box').classList.toggle('hidden', otype!=='Booking');
  updatePaymentSection();
}

function updatePaymentSection() {
  const otype = document.querySelector('input[name="otype"]:checked')?.value||'Instant';
  document.getElementById('instant-pay-note').classList.toggle('hidden', otype!=='Instant');
  document.getElementById('booking-advance-box').classList.toggle('hidden', otype!=='Booking');
}

// ── Pricing calcs ─────────────────────────────────────────────
window.calcEditing = function() {
  const v = document.querySelector('input[name="ep"]:checked')?.value;
  document.getElementById('ep-custom-box')?.classList.toggle('hidden', v!=='custom');
  const pt = document.getElementById('editing-price-tag');
  if(!pt) return;
  if(v&&v!=='custom'){pt.classList.remove('hidden');pt.textContent=`Editing Charge: ₹${v}`;}
  else if(v==='custom'){const cv=document.getElementById('ep-val')?.value;pt.classList.toggle('hidden',!cv);if(cv)pt.textContent=`Custom Charge: ₹${cv}`;}
  else pt.classList.add('hidden');
};

window.calcPrint = function() {
  const size=document.getElementById('pr-size')?.value;
  const qty=+(document.getElementById('pr-qty')?.value)||1;
  const qual=document.querySelector('input[name="pq"]:checked')?.value;
  const lam=document.querySelector('input[name="lam"]:checked')?.value;
  const pTag=document.getElementById('print-price-tag');
  const lTag=document.getElementById('lam-price-tag');
  const tTag=document.getElementById('print-total-tag');
  if(!pTag) return;
  if(!size||!qual){pTag.classList.add('hidden');lTag?.classList.add('hidden');tTag?.classList.add('hidden');return;}
  const pp=PRINT_PRICES[size]; if(!pp) return;
  const perPrint=pp[qual]; const printTotal=perPrint*qty;
  pTag.classList.remove('hidden');
  pTag.innerHTML=`₹${perPrint}/print × ${qty} = <b>₹${printTotal}</b>`;
  let lamTotal=0;
  if(lam==='Yes'&&SIZE_DIMS[size]){const{w,h}=SIZE_DIMS[size];const sq=w*h;lamTotal=sq*10*qty;lTag.classList.remove('hidden');lTag.innerHTML=`Lamination: ${w}×${h}" = ${sq} sq.in × ₹10 × ${qty} = <b>₹${lamTotal}</b>`;}
  else lTag?.classList.add('hidden');
  const grand=printTotal+lamTotal;
  tTag.classList.remove('hidden');tTag.textContent=`Total Print Cost: ₹${grand}`;
};

window.calcPassport     = ()=>{ const c=+(document.getElementById('pp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('pp-total');if(el)el.value='₹'+(200+Math.max(0,s-1)*100);};
window.calcVisa         = ()=>{ const c=+(document.getElementById('vp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('vp-total');if(el)el.value='₹'+(250+Math.max(0,s-1)*100);};
window.calcDoorPassport = ()=>{ const c=+(document.getElementById('dpp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dpp-total');if(el)el.value='₹'+(500+Math.max(0,s-1)*100);};
window.calcDoorVisa     = ()=>{ const c=+(document.getElementById('dvp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dvp-total');if(el)el.value='₹'+(500+Math.max(0,s-1)*100);};

// ── Add to Cart ───────────────────────────────────────────────
window.addToCart = function() {
  const groupAsel = [...document.querySelectorAll('input[name="groupA"]:checked')].map(c=>c.value);
  const groupBsel = document.querySelector('input[name="groupB"]:checked')?.value;

  if(groupAsel.includes('Sunboard')&&groupAsel.includes('MDF Board')){toast('⚠️ Sunboard + MDF cannot be together','error');return;}

  let svcs=[], price=0, label='', details={};

  if(groupAsel.length>0) {
    svcs=groupAsel; let parts=[],totalP=0;
    if(groupAsel.includes('Photo Editing')){const ep=document.querySelector('input[name="ep"]:checked')?.value;const epv=ep==='custom'?(+(document.getElementById('ep-val')?.value)||0):(+ep||0);if(!ep){toast('⚠️ Select editing charge','error');return;}parts.push(`Edit ₹${epv}`);totalP+=epv;}
    if(groupAsel.includes('Printing')){const size=document.getElementById('pr-size')?.value;const qty=+(document.getElementById('pr-qty')?.value)||1;const qual=document.querySelector('input[name="pq"]:checked')?.value;const lam=document.querySelector('input[name="lam"]:checked')?.value||'No';if(!size||!qual){toast('⚠️ Select print size and quality','error');return;}const pp=PRINT_PRICES[size];const printP=pp[qual]*qty;let lamP=0;if(lam==='Yes'&&SIZE_DIMS[size]){const{w,h}=SIZE_DIMS[size];lamP=w*h*10*qty;}const pT=printP+lamP;parts.push(`Print ${size}" ${qual} ×${qty}${lam==='Yes'?'+Lam':''} ₹${pT}`);totalP+=pT;}
    if(groupAsel.includes('Framing')){const ms=document.querySelector('input[name="ms"]:checked')?.value||'';const mt=document.querySelector('input[name="mt"]:checked')?.value||'';const mnt=document.querySelector('input[name="mnt"]:checked')?.value||'No';const fch=+(document.getElementById('frm-charge')?.value)||0;parts.push(`Frame${ms?' '+ms:''}${mt?' '+mt:''}${mnt==='Yes'?' +Mount':''} ₹${fch}`);totalP+=fch;}
    if(groupAsel.includes('Sunboard')){const ss=document.querySelector('input[name="sun"]:checked')?.value||'';const sc=+(document.getElementById('sun-charge')?.value)||0;parts.push(`Sunboard ${ss} ₹${sc}`);totalP+=sc;}
    if(groupAsel.includes('MDF Board')){const ms=document.querySelector('input[name="mdf"]:checked')?.value||'';const mc=+(document.getElementById('mdf-charge')?.value)||0;parts.push(`MDF ${ms} ₹${mc}`);totalP+=mc;}
    price=totalP; label=parts.join(' · ');
  } else if(groupBsel) {
    svcs=[groupBsel];
    if(groupBsel==='Passport Photos'){const c=+(document.getElementById('pp-copies')?.value)||8;const s=Math.ceil(c/8);price=200+Math.max(0,s-1)*100;label=`${c} copies`;}
    else if(groupBsel==='Visa Photos'){const c=+(document.getElementById('vp-copies')?.value)||8;const vt=document.getElementById('visa-type')?.value;const s=Math.ceil(c/8);price=250+Math.max(0,s-1)*100;label=`${vt} · ${c} copies`;}
    else if(groupBsel==='Album Printing'){const pg=+(document.getElementById('alb-pages')?.value)||1;price=+(document.getElementById('alb-cost')?.value)||0;label=`${pg} pages`;}
    else if(groupBsel==='Portfolio Shoot'){const ex=+(document.getElementById('port-extra')?.value)||0;price=1000+ex;const pt=document.getElementById('port-type')?.value;label=`${pt}${ex?' +Extra ₹'+ex:''}`;}
    else if(groupBsel==='Video Editing'){price=+(document.getElementById('vid-edit-charge')?.value)||0;label=`Charge ₹${price}`;}
    else if(groupBsel==='Video Converting'){price=+(document.getElementById('vid-conv-charge')?.value)||0;label=`Charge ₹${price}`;}
    else if(groupBsel==='Doorstep Passport'){const c=+(document.getElementById('dpp-copies')?.value)||8;const s=Math.ceil(c/8);price=500+Math.max(0,s-1)*100;const addr=document.getElementById('ds-addr')?.value||'';label=`${c} copies${addr?' · '+addr.slice(0,20):''}`;}
    else if(groupBsel==='Doorstep Visa'){const c=+(document.getElementById('dvp-copies')?.value)||8;const s=Math.ceil(c/8);price=500+Math.max(0,s-1)*100;const addr=document.getElementById('dvs-addr')?.value||'';label=`${c} copies${addr?' · '+addr.slice(0,20):''}`;}
  } else {
    toast('⚠️ Select a service first','error'); return;
  }

  window.cart.push({svcs,price,label,details});
  renderCart();
  // Reset panels
  document.querySelectorAll('input[name="groupA"],input[name="groupB"]').forEach(e=>e.checked=false);
  document.getElementById('svc-panel-area').innerHTML='';
  document.getElementById('svc-warn-ab').style.display='none';
  toast(`✅ ${svcs.join('+')} added to cart`,'success');
};

window.removeFromCart = function(idx) { window.cart.splice(idx,1); renderCart(); };

function renderCart() {
  const el  = document.getElementById('cart-items-display');
  const tb  = document.getElementById('cart-total-bar');
  const ta  = document.getElementById('cart-total-amt');
  const total = window.cart.reduce((s,i)=>s+(+i.price||0),0);
  if(!el) return;
  if(window.cart.length===0){
    el.innerHTML='<div style="text-align:center;padding:24px;color:var(--ink3);font-size:13px;background:var(--paper);border-radius:var(--r-md);">No items yet. Select services above and tap Add to Cart.</div>';
    tb?.classList.add('hidden');
    document.getElementById('f-charge').value='';
    document.getElementById('billing-summary').style.display='none';
    document.getElementById('discount-tag')?.classList.add('hidden');
    const nd=document.querySelector('input[name="disc"][value="0"]');if(nd)nd.checked=true;
    updatePaymentSection();
    return;
  }
  el.innerHTML=window.cart.map((item,i)=>`
    <div class="cart-item">
      <div class="cart-num">${i+1}</div>
      <div class="cart-info">
        <div class="cart-name">${item.svcs.map(s=>SVC_ICONS[s]||'').join('')} ${item.svcs.join(' + ')}</div>
        <div class="cart-detail">${item.label||'—'}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
        <div class="cart-price">${inr(item.price||0)}</div>
        <button onclick="removeFromCart(${i})" style="padding:4px 10px;border-radius:6px;background:var(--red-bg);color:var(--red);border:1px solid rgba(214,69,69,.2);font-size:11px;cursor:pointer;">✕ Remove</button>
      </div>
    </div>`).join('');
  tb?.classList.remove('hidden');
  if(ta) ta.textContent=inr(total);
  document.getElementById('f-charge').value=total;
  // Re-apply current discount
  const curDisc=+(document.querySelector('input[name="disc"]:checked')?.value||0);
  updateBillingSummary(total,curDisc);
  if(curDisc>0) applyDiscount(curDisc);
  updatePaymentSection();
}

function updateBillingSummary(cartTotal, discPct) {
  const bs = document.getElementById('billing-summary');
  if(!bs||window.cart.length===0){if(bs)bs.style.display='none';return;}
  const discAmt  = Math.round(cartTotal*discPct/100);
  const finalTotal = cartTotal-discAmt;
  let html = window.cart.map(i=>`<div style="display:flex;justify-content:space-between;padding:3px 0;">
    <span style="color:var(--ink2);">${i.svcs.join('+')} — ${i.label||''}</span><span style="font-weight:600;">${inr(i.price||0)}</span>
  </div>`).join('');
  if(discPct>0) html+=`<div style="display:flex;justify-content:space-between;padding:3px 0;color:var(--green);"><span>🏷️ Discount (${discPct}%)</span><span>-${inr(discAmt)}</span></div>`;
  html+=`<div style="display:flex;justify-content:space-between;font-weight:700;font-size:15px;border-top:1.5px solid var(--paper3);padding-top:8px;margin-top:6px;color:var(--gold-dk);"><span>Total</span><span>${inr(finalTotal)}</span></div>`;
  bs.style.display='block';
  bs.innerHTML=html;
}

window.onDiscountChange = function(pct) {
  const role = typeof getCurrentRole==='function' ? getCurrentRole() : 'owner';
  onDiscountSelect(pct, window.cart.reduce((s,i)=>s+(+i.price||0),0), role,
    applyDiscount,
    ()=>{ const nd=document.querySelector('input[name="disc"][value="0"]');if(nd)nd.checked=true; applyDiscount(0); }
  );
};

function applyDiscount(pct) {
  const cartTotal = window.cart.reduce((s,i)=>s+(+i.price||0),0);
  const discAmt   = Math.round(cartTotal*pct/100);
  const final     = cartTotal-discAmt;
  document.getElementById('f-charge').value = final;
  const tag = document.getElementById('discount-tag');
  if(tag) {
    if(pct>0){tag.classList.remove('hidden');tag.textContent=`${pct}% discount — ${inr(discAmt)} off · Final: ${inr(final)}`;}
    else tag.classList.add('hidden');
  }
  updateBillingSummary(cartTotal, pct);
}

window.requestCancelOrder = function() {
  const role = typeof getCurrentRole==='function' ? getCurrentRole() : 'owner';
  if(role==='owner'){cancelForm();return;}
  openApproval({
    title:'🚫 Cancel Order',
    sub:'Cancelling requires <b>Owner approval</b>.',
    onApprove:()=>cancelForm(),
    onCancel:()=>{}
  });
};
