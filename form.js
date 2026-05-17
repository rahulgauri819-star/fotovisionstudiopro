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
    </div>
    <div class="warn-box" id="svc-warn-ab"></div>

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

      <!-- STEP 1: Print Quality (first) -->
      <label class="form-label" style="display:block;margin-bottom:8px;">1. Print Quality</label>
      <div class="pill-group" style="margin-bottom:14px;">
        <label class="pill-option"><input type="radio" name="pq" value="HDR" onchange="onPrintQualityChange()"><span>🌟 HDR</span></label>
        <label class="pill-option"><input type="radio" name="pq" value="Vinyl" onchange="onPrintQualityChange()"><span>🎨 Vinyl</span></label>
        <label class="pill-option"><input type="radio" name="pq" value="Canvas" onchange="onPrintQualityChange()"><span>🖼️ Canvas</span></label>
        <label class="pill-option"><input type="radio" name="pq" value="NP" onchange="onPrintQualityChange()"><span>📄 NP</span></label>
      </div>

      <!-- STEP 2: Size (filtered by quality) -->
      <div id="pr-size-section" class="hidden">
        <label class="form-label" style="display:block;margin-bottom:8px;">2. Print Size</label>
        <select class="form-input" id="pr-size" onchange="onPrintSizeChange()" style="margin-bottom:14px;">
          <option value="">— Select Size —</option>
        </select>
      </div>

      <!-- STEP 3a: Number of Prints (regular for HDR/Vinyl/Canvas) -->
      <div id="pr-qty-section" class="hidden">
        <label class="form-label" style="display:block;margin-bottom:8px;">3. Number of Prints</label>
        <input class="form-input" id="pr-qty" type="number" min="1" value="1" inputmode="numeric" oninput="calcPrint()" style="margin-bottom:14px;">
      </div>

      <!-- STEP 3b: Quantity dropdown for NP -->
      <div id="pr-qty-np-section" class="hidden">
        <label class="form-label" style="display:block;margin-bottom:8px;">3. Number of Prints</label>
        <select class="form-input" id="pr-qty-np" onchange="calcPrint()" style="margin-bottom:14px;">
          <option value="">— Select Quantity —</option>
        </select>
        <div id="np-info" class="price-info" style="margin-bottom:10px;font-size:12px;"></div>
      </div>

      <div id="print-price-tag" class="price-info hidden"></div>

      <!-- STEP 4a: HDR Finishing Options (10x12+ only, OPTIONAL) -->
      <div id="pr-hdr-finish" class="hidden" style="margin-top:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">4. Finishing (Optional)</label>
        <div class="pill-group">
          <label class="pill-option"><input type="radio" name="hdrFin" value="" checked onchange="calcPrint()"><span>None</span></label>
          <label class="pill-option"><input type="radio" name="hdrFin" value="lam" onchange="calcPrint()"><span>✨ Lamination (₹0.25/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="hdrFin" value="sun3" onchange="calcPrint()"><span>🟫 Sun Board 3mm (₹0.50/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="hdrFin" value="sun5" onchange="calcPrint()"><span>🟫 Sun Board 5mm (₹1.00/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="hdrFin" value="mdf3" onchange="calcPrint()"><span>🪵 MDF 3mm (₹0.60/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="hdrFin" value="mdf8" onchange="calcPrint()"><span>🪵 MDF 8mm (₹1.50/sq.in)</span></label>
        </div>
        <div id="hdr-fin-price-tag" class="price-info hidden" style="margin-top:8px;"></div>
      </div>

      <!-- STEP 4b: Vinyl Backing Options (REPLACES Vinyl print cost) -->
      <div id="pr-vinyl-backing" class="hidden" style="margin-top:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">4. Choose Type</label>
        <div class="pill-group">
          <label class="pill-option"><input type="radio" name="vinBack" value="lam" checked onchange="calcPrint()"><span>✨ Vinyl Print with Lamination only (₹0.60/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="vinBack" value="sun3" onchange="calcPrint()"><span>🟫 Sun Board 3mm (₹1.20/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="vinBack" value="sun5" onchange="calcPrint()"><span>🟫 Sun Board 5mm (₹1.40/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="vinBack" value="mdf3" onchange="calcPrint()"><span>🪵 MDF 3mm (₹1.00/sq.in)</span></label>
          <label class="pill-option"><input type="radio" name="vinBack" value="mdf8" onchange="calcPrint()"><span>🪵 MDF 8mm (₹1.50/sq.in)</span></label>
        </div>
      </div>

      <!-- STEP 4c: Canvas Stretcher Option (OPTIONAL) -->
      <div id="pr-canvas-stretch" class="hidden" style="margin-top:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">4. Add Stretcher? (Optional)</label>
        <div class="toggle-group">
          <label class="toggle-option"><input type="radio" name="stretch" value="No" checked onchange="calcPrint()"><span>❌ No Stretcher</span></label>
          <label class="toggle-option"><input type="radio" name="stretch" value="Yes" onchange="calcPrint()"><span>✅ Add Stretcher (₹100/ft)</span></label>
        </div>
        <div id="stretch-price-tag" class="price-info hidden" style="margin-top:8px;"></div>
      </div>

      <!-- STEP 4d: NP Lamination Option (OPTIONAL) -->
      <div id="pr-np-lam" class="hidden" style="margin-top:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">4. Add Lamination? (Optional)</label>
        <div class="toggle-group">
          <label class="toggle-option"><input type="radio" name="npLam" value="No" checked onchange="calcPrint()"><span>❌ No Lamination</span></label>
          <label class="toggle-option"><input type="radio" name="npLam" value="Yes" onchange="calcPrint()"><span>✅ Add Lamination (₹20/multiple)</span></label>
        </div>
        <div id="np-lam-price-tag" class="price-info hidden" style="margin-top:8px;"></div>
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
  document.querySelectorAll('input[name="groupB"]').forEach(r=>r.checked=false);
  document.getElementById('panel-b')?.remove();
  document.getElementById('svc-panel-area').innerHTML = getSvcPanelHTML(sel);
  calcPassport(); calcVisa(); calcDoorPassport(); calcDoorVisa();
};

window.onGroupB = function(el) {
  document.querySelectorAll('input[name="groupA"]').forEach(c=>c.checked=false);
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

// ── Print Quality / Size / Quantity Logic ─────────────────────

// Display labels for sizes
const SIZE_LABELS = {
  '2x3':'2×3"','3x4':'3×4"','3.5x5':'3.5×5"','4x6':'4×6"',
  '5x7':'5×7"','6x8':'6×8"','6x9':'6×9"','8x10':'8×10"','8x12':'8×12"',
  '10x12':'10×12"','12x15':'12×15"','12x18':'12×18"','13x19':'13×19"',
  '16x20':'16×20"','16x24':'16×24"','20x24':'20×24"','20x30':'20×30"',
  '24x36':'24×36"','36x54':'36×54"','44x66':'44×66"'
};

window.onPrintQualityChange = function() {
  const qual = document.querySelector('input[name="pq"]:checked')?.value;
  const sizeSection = document.getElementById('pr-size-section');
  const qtySection  = document.getElementById('pr-qty-section');
  const qtyNPSection= document.getElementById('pr-qty-np-section');
  const sizeSelect  = document.getElementById('pr-size');

  // Hide all finishing sections
  document.getElementById('pr-hdr-finish')?.classList.add('hidden');
  document.getElementById('pr-vinyl-backing')?.classList.add('hidden');
  document.getElementById('pr-canvas-stretch')?.classList.add('hidden');
  document.getElementById('pr-np-lam')?.classList.add('hidden');

  if (!qual) {
    sizeSection?.classList.add('hidden');
    qtySection?.classList.add('hidden');
    qtyNPSection?.classList.add('hidden');
    return;
  }

  // Build size dropdown filtered by quality
  let opts = '<option value="">— Select Size —</option>';
  const smallSizes = ['2x3','3x4','3.5x5','4x6','5x7','6x8','6x9','8x10','8x12'];
  const largeSizes = ['10x12','12x15','12x18','13x19','16x20','16x24','20x24','20x30'];
  const xlSizes    = ['24x36','36x54','44x66'];

  const smallAllowed  = smallSizes.filter(s => isSizeAllowedForQuality(s, qual));
  const largeAllowed  = largeSizes.filter(s => isSizeAllowedForQuality(s, qual));
  const xlAllowed     = xlSizes.filter(s => isSizeAllowedForQuality(s, qual));

  if (smallAllowed.length) {
    opts += '<optgroup label="Wallet/Mini & Standard">';
    smallAllowed.forEach(s => opts += `<option value="${s}">${SIZE_LABELS[s]}</option>`);
    opts += '</optgroup>';
  }
  if (largeAllowed.length) {
    opts += '<optgroup label="Large">';
    largeAllowed.forEach(s => opts += `<option value="${s}">${SIZE_LABELS[s]}</option>`);
    opts += '</optgroup>';
  }
  if (xlAllowed.length) {
    opts += '<optgroup label="Extra Large">';
    xlAllowed.forEach(s => opts += `<option value="${s}">${SIZE_LABELS[s]}</option>`);
    opts += '</optgroup>';
  }

  sizeSelect.innerHTML = opts;
  sizeSection.classList.remove('hidden');

  // Hide quantity until size is selected
  qtySection?.classList.add('hidden');
  qtyNPSection?.classList.add('hidden');
  document.getElementById('print-price-tag')?.classList.add('hidden');
  document.getElementById('print-total-tag')?.classList.add('hidden');
};

window.onPrintSizeChange = function() {
  const qual = document.querySelector('input[name="pq"]:checked')?.value;
  const size = document.getElementById('pr-size')?.value;
  const qtySection   = document.getElementById('pr-qty-section');
  const qtyNPSection = document.getElementById('pr-qty-np-section');
  const hdrFinish    = document.getElementById('pr-hdr-finish');
  const vinBacking   = document.getElementById('pr-vinyl-backing');
  const canStretch   = document.getElementById('pr-canvas-stretch');
  const npLam        = document.getElementById('pr-np-lam');

  // Hide all finishing sections by default
  hdrFinish?.classList.add('hidden');
  vinBacking?.classList.add('hidden');
  canStretch?.classList.add('hidden');
  npLam?.classList.add('hidden');

  if (!size) {
    qtySection?.classList.add('hidden');
    qtyNPSection?.classList.add('hidden');
    return;
  }

  // For NP — show dropdown with valid quantities
  if (qual === 'NP') {
    const cfg = NP_CONFIG[size];
    if (cfg) {
      const opts = generateNPOptions(size, 20);
      let html = '<option value="">— Select Quantity —</option>';
      opts.forEach(n => html += `<option value="${n}">${n} prints</option>`);
      document.getElementById('pr-qty-np').innerHTML = html;
      document.getElementById('np-info').innerHTML =
        `<b>NP ${SIZE_LABELS[size]}</b>: ₹${cfg.price}/photo · Min ${cfg.min} prints · Multiples of ${cfg.mult}`;
      qtyNPSection.classList.remove('hidden');
      qtySection.classList.add('hidden');
      // NP Lamination — show for all NP sizes
      npLam?.classList.remove('hidden');
    }
  } else {
    // For HDR/Vinyl/Canvas — regular number input
    qtySection.classList.remove('hidden');
    qtyNPSection.classList.add('hidden');
  }

  // Show HDR finishing options only for 10x12+
  if (qual === 'HDR' && isLargeSize(size)) {
    hdrFinish?.classList.remove('hidden');
    // Default to "None"
    const none = document.querySelector('input[name="hdrFin"][value=""]');
    if (none && !document.querySelector('input[name="hdrFin"]:checked')) none.checked = true;
  } else {
    // Reset HDR finishing
    const none = document.querySelector('input[name="hdrFin"][value=""]');
    if (none) none.checked = true;
  }

  // Show Vinyl backing options (always when Vinyl selected with valid size)
  if (qual === 'Vinyl') {
    vinBacking?.classList.remove('hidden');
    // Default to "Lamination"
    const lam = document.querySelector('input[name="vinBack"][value="lam"]');
    if (lam && !document.querySelector('input[name="vinBack"]:checked')) lam.checked = true;
  }

  // Show Canvas stretcher option
  if (qual === 'Canvas') {
    canStretch?.classList.remove('hidden');
    const no = document.querySelector('input[name="stretch"][value="No"]');
    if (no && !document.querySelector('input[name="stretch"]:checked')) no.checked = true;
  }

  calcPrint();
};

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
  const qual = document.querySelector('input[name="pq"]:checked')?.value;
  const size = document.getElementById('pr-size')?.value;
  const pTag = document.getElementById('print-price-tag');
  const tTag = document.getElementById('print-total-tag');
  const hdrFinTag = document.getElementById('hdr-fin-price-tag');
  const stretchTag = document.getElementById('stretch-price-tag');
  const npLamTag = document.getElementById('np-lam-price-tag');

  if (!pTag) return;
  if (!qual || !size) {
    pTag.classList.add('hidden');
    tTag?.classList.add('hidden');
    hdrFinTag?.classList.add('hidden');
    stretchTag?.classList.add('hidden');
    npLamTag?.classList.add('hidden');
    return;
  }

  // Get quantity based on quality
  let qty;
  if (qual === 'NP') {
    qty = +(document.getElementById('pr-qty-np')?.value) || 0;
  } else {
    qty = +(document.getElementById('pr-qty')?.value) || 0;
  }

  if (!qty || qty < 1) {
    pTag.classList.add('hidden');
    tTag?.classList.add('hidden');
    hdrFinTag?.classList.add('hidden');
    stretchTag?.classList.add('hidden');
    npLamTag?.classList.add('hidden');
    return;
  }

  const { w, h } = SIZE_DIMS[size];
  let printTotal = 0;
  let priceLabel = '';
  let extraTotal = 0;

  if (qual === 'HDR') {
    const perPrint = getHDRPricePerPrint(size, qty);
    printTotal = Math.round(perPrint * qty);
    if (HDR_FLAT_PRICES[size]) {
      priceLabel = `HDR ${SIZE_LABELS[size]} (flat) ₹${perPrint}/print × ${qty}`;
    } else {
      const tier = qty >= 100 ? '100+ prints' : qty >= 50 ? '50–99 prints' : qty >= 20 ? '20–49 prints' : '1–19 prints';
      priceLabel = `HDR ${SIZE_LABELS[size]} (${tier}) ₹${perPrint}/print × ${qty}`;
    }
    // HDR Finishing — only for 10x12+, ADDED on top
    const hdrFin = document.querySelector('input[name="hdrFin"]:checked')?.value || '';
    if (isLargeSize(size) && hdrFin && HDR_FINISH[hdrFin]) {
      const fin = HDR_FINISH[hdrFin];
      extraTotal = Math.round(w * h * fin.rate * qty);
      hdrFinTag?.classList.remove('hidden');
      if (hdrFinTag) hdrFinTag.innerHTML = `${fin.label}: ${w}×${h}" × ₹${fin.rate}/sq.in × ${qty} = <b>₹${extraTotal}</b>`;
    } else {
      hdrFinTag?.classList.add('hidden');
    }
  } else if (qual === 'Vinyl') {
    // Vinyl backing REPLACES the print cost
    const vinBack = document.querySelector('input[name="vinBack"]:checked')?.value || 'lam';
    const back = VINYL_BACKING[vinBack];
    const perPrint = w * h * back.rate;
    printTotal = Math.round(perPrint * qty);
    priceLabel = `${back.label}: ${w}×${h}" × ₹${back.rate}/sq.in × ${qty}`;
  } else if (qual === 'Canvas') {
    const perPrint = w * h * CANVAS_RATE;
    printTotal = Math.round(perPrint * qty);
    priceLabel = `Canvas ${SIZE_LABELS[size]} (${w}×${h} × ₹${CANVAS_RATE}) ₹${perPrint.toFixed(2)}/print × ${qty}`;
    // Stretcher — optional, per print
    const stretch = document.querySelector('input[name="stretch"]:checked')?.value || 'No';
    if (stretch === 'Yes') {
      const perPrintStretch = calcStretcherCostPerPrint(size);
      extraTotal = perPrintStretch * qty;
      const perim = (w + h) * 2;
      const runFt = Math.ceil(perim / 12);
      stretchTag?.classList.remove('hidden');
      if (stretchTag) stretchTag.innerHTML = `Stretcher: (${w}+${h})×2 = ${perim}" → ${runFt} ft × ₹100 × ${qty} = <b>₹${extraTotal}</b>`;
    } else {
      stretchTag?.classList.add('hidden');
    }
  } else if (qual === 'NP') {
    const perPrint = NP_CONFIG[size]?.price || 0;
    printTotal = Math.round(perPrint * qty);
    priceLabel = `NP ${SIZE_LABELS[size]} ₹${perPrint}/photo × ${qty}`;
    // NP Lamination — optional, ₹20 × multiples
    const npLam = document.querySelector('input[name="npLam"]:checked')?.value || 'No';
    if (npLam === 'Yes') {
      extraTotal = calcNPLamCost(size, qty);
      const cfg = NP_CONFIG[size];
      const multiples = Math.ceil(qty / cfg.mult);
      npLamTag?.classList.remove('hidden');
      if (npLamTag) npLamTag.innerHTML = `Lamination: ${multiples} multiples × ₹${NP_LAM_PER_MULT} = <b>₹${extraTotal}</b>`;
    } else {
      npLamTag?.classList.add('hidden');
    }
  }

  pTag.classList.remove('hidden');
  pTag.innerHTML = `${priceLabel} = <b>₹${printTotal}</b>`;

  const grand = printTotal + extraTotal;
  tTag.classList.remove('hidden');
  tTag.textContent = `Total Print Cost: ₹${grand}`;
};

window.calcPassport     = ()=>{ const c=+(document.getElementById('pp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('pp-total');if(el)el.value='₹'+(200+Math.max(0,s-1)*100);};
window.calcVisa         = ()=>{ const c=+(document.getElementById('vp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('vp-total');if(el)el.value='₹'+(250+Math.max(0,s-1)*100);};
window.calcDoorPassport = ()=>{ const c=+(document.getElementById('dpp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dpp-total');if(el)el.value='₹'+(500+Math.max(0,s-1)*100);};
window.calcDoorVisa     = ()=>{ const c=+(document.getElementById('dvp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dvp-total');if(el)el.value='₹'+(500+Math.max(0,s-1)*100);};

// ── Add to Cart ───────────────────────────────────────────────
window.addToCart = function() {
  const groupAsel = [...document.querySelectorAll('input[name="groupA"]:checked')].map(c=>c.value);
  const groupBsel = document.querySelector('input[name="groupB"]:checked')?.value;

  let svcs=[], price=0, label='', details={};

  if(groupAsel.length>0) {
    svcs=groupAsel; let parts=[],totalP=0;
    if(groupAsel.includes('Photo Editing')){const ep=document.querySelector('input[name="ep"]:checked')?.value;const epv=ep==='custom'?(+(document.getElementById('ep-val')?.value)||0):(+ep||0);if(!ep){toast('⚠️ Select editing charge','error');return;}parts.push(`Edit ₹${epv}`);totalP+=epv;}
    if(groupAsel.includes('Printing')){
      const qual = document.querySelector('input[name="pq"]:checked')?.value;
      const size = document.getElementById('pr-size')?.value;
      if (!qual) { toast('⚠️ Select print quality','error'); return; }
      if (!size) { toast('⚠️ Select print size','error'); return; }
      const qty = qual === 'NP'
        ? +(document.getElementById('pr-qty-np')?.value) || 0
        : +(document.getElementById('pr-qty')?.value) || 0;
      if (qty < 1) { toast('⚠️ Select number of prints','error'); return; }
      // Validate NP min/multiple
      if (qual === 'NP') {
        const cfg = NP_CONFIG[size];
        if (!cfg) { toast('⚠️ NP not available for this size','error'); return; }
        if (qty < cfg.min || (qty - cfg.min) % cfg.mult !== 0) {
          toast(`⚠️ NP ${size}: min ${cfg.min}, multiples of ${cfg.mult}`,'error');
          return;
        }
      }
      const { w, h } = SIZE_DIMS[size];
      let printP = 0;
      let extraP = 0;
      let extraLabel = '';

      if (qual === 'HDR') {
        printP = Math.round(getHDRPricePerPrint(size, qty) * qty);
        // Optional HDR finishing (only for 10x12+)
        const hdrFin = document.querySelector('input[name="hdrFin"]:checked')?.value || '';
        if (isLargeSize(size) && hdrFin && HDR_FINISH[hdrFin]) {
          const fin = HDR_FINISH[hdrFin];
          extraP = Math.round(w * h * fin.rate * qty);
          extraLabel = '+' + fin.label;
        }
      } else if (qual === 'Vinyl') {
        // Vinyl backing REPLACES print cost
        const vinBack = document.querySelector('input[name="vinBack"]:checked')?.value || 'lam';
        const back = VINYL_BACKING[vinBack];
        printP = Math.round(w * h * back.rate * qty);
        extraLabel = '(' + back.label + ')';
      } else if (qual === 'Canvas') {
        printP = Math.round(w * h * CANVAS_RATE * qty);
        // Optional Stretcher (per print)
        const stretch = document.querySelector('input[name="stretch"]:checked')?.value || 'No';
        if (stretch === 'Yes') {
          extraP = calcStretcherCostPerPrint(size) * qty;
          extraLabel = '+Stretcher';
        }
      } else if (qual === 'NP') {
        printP = Math.round((NP_CONFIG[size]?.price || 0) * qty);
        // Optional NP Lamination
        const npLam = document.querySelector('input[name="npLam"]:checked')?.value || 'No';
        if (npLam === 'Yes') {
          extraP = calcNPLamCost(size, qty);
          extraLabel = '+Lam';
        }
      }

      const pT = printP + extraP;
      parts.push(`Print ${SIZE_LABELS[size]||size} ${qual} ×${qty}${extraLabel} ₹${pT}`);
      totalP += pT;
    }
    if(groupAsel.includes('Framing')){const ms=document.querySelector('input[name="ms"]:checked')?.value||'';const mt=document.querySelector('input[name="mt"]:checked')?.value||'';const mnt=document.querySelector('input[name="mnt"]:checked')?.value||'No';const fch=+(document.getElementById('frm-charge')?.value)||0;parts.push(`Frame${ms?' '+ms:''}${mt?' '+mt:''}${mnt==='Yes'?' +Mount':''} ₹${fch}`);totalP+=fch;}
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
