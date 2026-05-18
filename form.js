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
      <label class="pill-option"><input type="radio" name="groupB" value="Collage Making" onchange="onGroupB(this)"><span>🖼️ Collage Making</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Scanning" onchange="onGroupB(this)"><span>🔍 Scanning</span></label>
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
      <div class="toggle-group" style="flex-wrap:wrap;">
        <label class="toggle-option"><input type="radio" name="paymode" value="Cash" checked onchange="onPayModeChange()"><span>💵 Cash</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="UPI" onchange="onPayModeChange()"><span>📱 UPI</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="Credit Card" onchange="onPayModeChange()"><span>💳 Credit Card</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="Cash+UPI" onchange="onPayModeChange()"><span>💵📱 Cash+UPI</span></label>
      </div>
      <!-- Cash+UPI split inputs -->
      <div id="cash-upi-split" class="hidden" style="margin-top:12px;background:var(--paper);border-radius:var(--r-sm);padding:12px;">
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
          <div class="form-group" style="flex:1;min-width:120px;">
            <label class="form-label">Cash Amount (Rs.)</label>
            <input class="form-input" id="split-cash" type="number" min="0" placeholder="0" inputmode="numeric" oninput="calcSplitPayment()">
          </div>
          <div class="form-group" style="flex:1;min-width:120px;">
            <label class="form-label">UPI Amount (Rs.)</label>
            <input class="form-input" id="split-upi" type="number" min="0" placeholder="0" inputmode="numeric" oninput="calcSplitPayment()">
          </div>
        </div>
        <div id="split-total-tag" class="price-info" style="margin-bottom:4px;"></div>
        <div id="split-warn" class="warn-box hidden">⚠️ Cash + UPI total must match the order total exactly.</div>
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

  if(svcs.includes('Framing')) {
    // Check if Printing is also selected — if so, take size from there
    const hasPrinting = svcs.includes('Printing');
    html += `
    <div class="svc-panel" id="panel-framing">
      <div class="section-head" style="font-size:15px;">🖼️ Framing Details</div>

      ${!hasPrinting ? `
      <!-- Manual L & B input (only when Framing alone) -->
      <div style="margin-bottom:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">Print Size (for frame calculation)</label>
        <div style="display:flex;gap:10px;align-items:center;">
          <input class="form-input" id="frm-L" type="number" min="1" placeholder="Length (in)" style="max-width:120px;" oninput="calcFrame()">
          <span style="font-weight:700;color:var(--gold-dk);">×</span>
          <input class="form-input" id="frm-B" type="number" min="1" placeholder="Breadth (in)" style="max-width:120px;" oninput="calcFrame()">
          <span style="font-size:12px;color:var(--ink-lt);">inches</span>
        </div>
      </div>` : `<div id="frm-size-info" class="price-info" style="margin-bottom:12px;">📐 Print size taken from Printing panel</div>`}

      <!-- Moulding Size -->
      <label class="form-label" style="display:block;margin-bottom:8px;">1. Moulding Size</label>
      <div class="pill-group" style="margin-bottom:12px;flex-wrap:wrap;">
        ${MOULDING_SIZES.map(s=>`<label class="pill-option"><input type="radio" name="ms" value="${s}" onchange="onMouldSizeChange('${s}')"><span>${s}"</span></label>`).join('')}
      </div>

      <!-- Moulding Type dropdown (populated by JS) -->
      <div id="frm-mould-type-section" class="hidden" style="margin-bottom:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">2. Moulding Type</label>
        <select class="form-input" id="frm-mould-select" onchange="calcFrame()" style="margin-bottom:8px;">
          <option value="">— Select Moulding —</option>
        </select>
        <!-- Add New Moulding -->
        <div id="frm-add-mould-section">
          <button type="button" class="btn-outline" onclick="toggleAddMould()" style="font-size:12px;padding:6px 12px;margin-bottom:8px;">➕ Add New Moulding</button>
          <div id="frm-add-mould-form" class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-bottom:8px;">
            <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
              <input class="form-input" id="frm-new-code" placeholder="Code (e.g. M6)" style="max-width:120px;">
              <input class="form-input" id="frm-new-name" placeholder="Name/Color (e.g. Rose Gold)" style="flex:1;min-width:150px;">
            </div>
            <button type="button" class="btn-gold" onclick="saveNewMoulding()" style="font-size:12px;padding:6px 16px;">💾 Save Moulding</button>
            <button type="button" class="btn-outline" onclick="toggleAddMould()" style="font-size:12px;padding:6px 12px;margin-left:8px;">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Mount Option -->
      <div id="frm-mount-section" class="hidden" style="margin-bottom:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">3. Mount</label>
        <div class="toggle-group" style="margin-bottom:10px;">
          <label class="toggle-option"><input type="radio" name="mnt" value="No" checked onchange="onMountChange()"><span>🖼️ Frame Without Mount</span></label>
          <label class="toggle-option"><input type="radio" name="mnt" value="Yes" onchange="onMountChange()"><span>🖼️ Frame With Mount</span></label>
        </div>
        <!-- Mount Size (only if With Mount) -->
        <div id="frm-mount-size-box" class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-bottom:10px;">
          <label class="form-label" style="display:block;margin-bottom:8px;">Mount Size</label>
          <div class="pill-group" style="flex-wrap:wrap;">
            ${MOUNT_SIZES.map(s=>`<label class="pill-option"><input type="radio" name="mntS" value="${s}" onchange="calcFrame()"><span>${s}"</span></label>`).join('')}
          </div>
        </div>
      </div>

      <!-- Auto-calculated Frame Cost -->
      <div id="frm-cost-tag" class="price-tag hidden" style="margin-bottom:14px;"></div>

      <!-- Accessories -->
      <div id="frm-accessories" class="hidden" style="margin-bottom:10px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">4. Accessories (Optional)</label>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <label class="check-btn" style="width:100%;">
            <input type="checkbox" name="acc" value="Table Stand" onchange="calcFrame()">
            <span>🪑 Table Stand <span style="font-size:11px;color:var(--ink-lt);">Free · Recommended for max 10×12"</span></span>
          </label>
          <label class="check-btn" style="width:100%;">
            <input type="checkbox" name="acc" value="Hanging Wire" onchange="calcFrame()">
            <span>🪢 Hanging Wire <span style="font-size:11px;color:var(--ink-lt);">Free</span></span>
          </label>
          <!-- Sleeve — only visible with mount -->
          <div id="frm-sleeve-row" class="hidden">
            <label class="check-btn" style="width:100%;">
              <input type="checkbox" id="acc-sleeve" onchange="onSleeveToggle()">
              <span>🛍️ Sleeve</span>
            </label>
            <div id="frm-sleeve-opts" class="hidden" style="background:var(--paper);border-radius:var(--r-sm);padding:12px;margin-top:8px;">
              <label class="form-label" style="display:block;margin-bottom:8px;">Sleeve Type</label>
              <div class="toggle-group" style="margin-bottom:10px;">
                <label class="toggle-option"><input type="radio" name="slvType" value="plain" checked onchange="onSleeveTypeChange()"><span>Plain Plastic Sleeve</span></label>
                <label class="toggle-option"><input type="radio" name="slvType" value="stripe" onchange="onSleeveTypeChange()"><span>Golden Stripe</span></label>
              </div>
              <div id="frm-sleeve-colors" style="margin-bottom:8px;">
                <label class="form-label" style="display:block;margin-bottom:6px;">Color</label>
                <div class="pill-group">
                  <label class="pill-option"><input type="radio" name="slvColor" value="Gold" checked onchange="calcFrame()"><span>🟡 Gold</span></label>
                  <label class="pill-option"><input type="radio" name="slvColor" value="Silver" onchange="calcFrame()"><span>⚪ Silver</span></label>
                  <label class="pill-option"><input type="radio" name="slvColor" value="Black" onchange="calcFrame()"><span>⚫ Black</span></label>
                </div>
              </div>
              <div id="frm-sleeve-price" class="price-info hidden"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grand Total -->
      <div id="frm-total-tag" class="price-tag hidden"></div>
    </div>`;
  }

  return html;
}

function getBPanelHTML(svc) {
  // Generate passport copies dropdown (8 to 80, multiples of 8, 10 options)
  const ppOpts = Array.from({length:10},(_,i)=>{
    const c=(i+1)*8;
    const cost=200+i*100;
    return `<option value="${c}">${c} Copies — Rs.${cost}</option>`;
  }).join('');

  if(svc==='Passport Photos') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📷 Passport Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Rs.200</b> for 8 copies · <b>Rs.100</b> per extra 8 copies</div>
    <div class="form-group" style="max-width:260px;margin-bottom:12px;">
      <label class="form-label">Number of Copies</label>
      <select class="form-input" id="pp-copies" onchange="calcPassport()">${ppOpts}</select>
    </div>
    <div id="pp-cost-tag" class="price-tag" style="margin-bottom:12px;">Rs.200</div>
    <label class="form-label" style="display:block;margin-bottom:8px;">Add Soft Copy? (Optional)</label>
    <div class="toggle-group" style="margin-bottom:8px;">
      <label class="toggle-option"><input type="radio" name="ppSoft" value="No" checked onchange="calcPassport()"><span>❌ No</span></label>
      <label class="toggle-option"><input type="radio" name="ppSoft" value="Yes" onchange="calcPassport()"><span>✅ Yes (+Rs.100)</span></label>
    </div>
    <div id="pp-total-tag" class="price-tag hidden"></div>
  </div>`;

  if(svc==='Visa Photos') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🛂 Visa Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Rs.250</b> for 8 copies · <b>Rs.100</b> per extra 8 copies</div>
    <div class="form-grid-2" style="margin-bottom:10px;">
      <div class="form-group"><label class="form-label">Visa Type</label><select class="form-input" id="visa-type"><option>USA Visa</option><option>Schengen Visa</option><option>Singapore Visa</option><option>UK Visa</option><option>Other</option></select></div>
      <div class="form-group"><label class="form-label">Number of Copies</label><input class="form-input" id="vp-copies" type="number" min="8" step="8" value="8" inputmode="numeric" oninput="calcVisa()"></div>
    </div>
    <div id="vp-cost-tag" class="price-tag" style="margin-bottom:12px;">Rs.250</div>
    <label class="form-label" style="display:block;margin-bottom:8px;">Add Soft Copy? (Optional)</label>
    <div class="toggle-group" style="margin-bottom:8px;">
      <label class="toggle-option"><input type="radio" name="vpSoft" value="No" checked onchange="calcVisa()"><span>❌ No</span></label>
      <label class="toggle-option"><input type="radio" name="vpSoft" value="Yes" onchange="calcVisa()"><span>✅ Yes (+Rs.100)</span></label>
    </div>
    <div id="vp-total-tag" class="price-tag hidden"></div>
  </div>`;

  if(svc==='Collage Making') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🖼️ Collage Making</div>
    <div class="form-group" style="max-width:250px;">
      <label class="form-label">Collage Charge (Rs.)</label>
      <input class="form-input" id="collage-charge" type="number" min="0" placeholder="Enter custom price">
    </div>
  </div>`;

  if(svc==='Scanning') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🔍 Scanning</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Rs.50/picture</b></div>
    <div class="form-group" style="max-width:200px;margin-bottom:10px;">
      <label class="form-label">Number of Pictures</label>
      <input class="form-input" id="scan-qty" type="number" min="1" value="1" inputmode="numeric" oninput="calcScanning()">
    </div>
    <div id="scan-cost-tag" class="price-tag">Rs.50</div>
  </div>`;

  if(svc==='Album Printing') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📚 Album Printing</div>
    <div class="form-grid-2">
      <div class="form-group"><label class="form-label">Number of Pages</label><input class="form-input" id="alb-pages" type="number" min="1" value="1" inputmode="numeric"></div>
      <div class="form-group"><label class="form-label">Album Cost (Rs.)</label><input class="form-input" id="alb-cost" type="number" min="0" placeholder="Enter cost"></div>
    </div></div>`;

  if(svc==='Portfolio Shoot') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📸 Portfolio Shoot</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Base Charge:</b> Rs.1,000 fixed</div>
    <div class="form-grid-2">
      <div class="form-group"><label class="form-label">Session Type</label><select class="form-input" id="port-type"><option>Indoor Studio</option><option>Outdoor</option><option>Fashion</option><option>Corporate</option><option>Kids</option><option>Wedding</option></select></div>
      <div class="form-group"><label class="form-label">Additional Charge (Rs.)</label><input class="form-input" id="port-extra" type="number" min="0" value="0" placeholder="Optional extra"></div>
    </div></div>`;

  if(svc==='Video Editing') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🎬 Video Editing</div>
    <div class="form-group" style="max-width:250px;"><label class="form-label">Editing Charge (Rs.)</label><input class="form-input" id="vid-edit-charge" type="number" min="0" placeholder="Enter charge"></div></div>`;

  if(svc==='Video Converting') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">📼 Video Converting</div>
    <div class="form-group" style="max-width:250px;"><label class="form-label">Converting Charge (Rs.)</label><input class="form-input" id="vid-conv-charge" type="number" min="0" placeholder="Enter charge"></div></div>`;

  if(svc==='Doorstep Passport') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🏠📷 Doorstep Passport Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Fixed:</b> Rs.500 for 8 copies · Rs.100 per extra 8 copies</div>
    <div class="form-grid-2" style="margin-bottom:10px;">
      <div class="form-group"><label class="form-label">Number of Copies</label><input class="form-input" id="dpp-copies" type="number" min="8" step="8" value="8" inputmode="numeric" oninput="calcDoorPassport()"></div>
      <div class="form-group"><label class="form-label">Charge</label><input class="form-input" id="dpp-total" readonly style="background:#f0f0f0;font-weight:700;color:var(--gold-dk);"></div>
    </div>
    <div class="form-group"><label class="form-label">Doorstep Address</label><input class="form-input" id="ds-addr" placeholder="Customer address for visit"></div></div>`;

  if(svc==='Doorstep Visa') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">🏠🛂 Doorstep Visa Photos</div>
    <div class="price-info" style="margin-bottom:10px;"><b>Fixed:</b> Rs.500 for 8 copies · Rs.100 per extra 8 copies</div>
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
window.toggleMount = function() {}; // legacy stub

// ── Framing Handlers ──────────────────────────────────────────

window.onMouldSizeChange = function(size) {
  const sec = document.getElementById('frm-mould-type-section');
  const sel = document.getElementById('frm-mould-select');
  if (!sec || !sel) return;
  sec.classList.remove('hidden');
  const items = window.mouldingsCache[size] || DEFAULT_MOULDINGS[size] || [];
  let opts = '<option value="">— Select Moulding —</option>';
  items.forEach((m,i) => opts += `<option value="${i}">${m.code} — ${m.name}</option>`);
  sel.innerHTML = opts;
  sel.dataset.mouldSize = size;
  document.getElementById('frm-mount-section')?.classList.remove('hidden');
  calcFrame();
};

window.toggleAddMould = function() {
  document.getElementById('frm-add-mould-form')?.classList.toggle('hidden');
};

window.saveNewMoulding = async function() {
  const size = document.getElementById('frm-mould-select')?.dataset.mouldSize;
  const code = document.getElementById('frm-new-code')?.value.trim();
  const name = document.getElementById('frm-new-name')?.value.trim();
  if (!size || !code || !name) { toast('⚠️ Enter moulding code and name','error'); return; }
  await addMoulding(size, code, name);
  onMouldSizeChange(size);
  document.getElementById('frm-new-code').value = '';
  document.getElementById('frm-new-name').value = '';
  document.getElementById('frm-add-mould-form')?.classList.add('hidden');
  toast('✅ Moulding saved!');
};

window.onMountChange = function() {
  const mnt = document.querySelector('input[name="mnt"]:checked')?.value;
  document.getElementById('frm-mount-size-box')?.classList.toggle('hidden', mnt !== 'Yes');
  document.getElementById('frm-sleeve-row')?.classList.toggle('hidden', mnt !== 'Yes');
  if (mnt !== 'Yes') {
    const slv = document.getElementById('acc-sleeve');
    if (slv) slv.checked = false;
    document.getElementById('frm-sleeve-opts')?.classList.add('hidden');
  }
  document.getElementById('frm-accessories')?.classList.remove('hidden');
  calcFrame();
};

window.onSleeveToggle = function() {
  const checked = document.getElementById('acc-sleeve')?.checked;
  document.getElementById('frm-sleeve-opts')?.classList.toggle('hidden', !checked);
  calcFrame();
};

window.onSleeveTypeChange = function() {
  const type = document.querySelector('input[name="slvType"]:checked')?.value;
  document.getElementById('frm-sleeve-colors')?.classList.toggle('hidden', type === 'stripe');
  calcFrame();
};

function getFrameLB() {
  const groupAsel = [...document.querySelectorAll('input[name="groupA"]:checked')].map(c=>c.value);
  if (groupAsel.includes('Printing')) {
    const size = document.getElementById('pr-size')?.value;
    if (size && SIZE_DIMS[size]) return { l: SIZE_DIMS[size].w, b: SIZE_DIMS[size].h };
    return null;
  }
  const l = +(document.getElementById('frm-L')?.value) || 0;
  const b = +(document.getElementById('frm-B')?.value) || 0;
  if (!l || !b) return null;
  return { l, b };
}

window.calcFrame = function() {
  const costTag  = document.getElementById('frm-cost-tag');
  const totalTag = document.getElementById('frm-total-tag');
  const accBox   = document.getElementById('frm-accessories');
  if (!costTag) return;
  const lb = getFrameLB();
  const mouldSize = document.querySelector('input[name="ms"]:checked')?.value;
  const mouldSel  = document.getElementById('frm-mould-select');
  const mouldIdx  = mouldSel?.value;
  const mnt       = document.querySelector('input[name="mnt"]:checked')?.value || 'No';
  const mountSize = +(document.querySelector('input[name="mntS"]:checked')?.value) || 0;
  if (!lb || !mouldSize || !mouldIdx) { costTag.classList.add('hidden'); totalTag?.classList.add('hidden'); return; }
  if (mnt === 'Yes' && !mountSize) { costTag.classList.add('hidden'); totalTag?.classList.add('hidden'); return; }
  const { l, b } = lb;
  let frameCost = 0, costLabel = '';
  if (mnt === 'Yes') {
    frameCost = calcFrameCostWithMount(l, b, mouldSize, mountSize);
    const newL = l + mountSize*2, newB = b + mountSize*2;
    costLabel = `Frame+Mount: [(${newL}+${newB})×2]+[${mouldRound(mouldSize)}×8×Rs.${FRAME_PRICE_PER_FT}] = <b>Rs.${frameCost}</b>`;
  } else {
    frameCost = calcFrameCost(l, b, mouldSize);
    costLabel = `Frame: [(${l}+${b})×2]+[${mouldRound(mouldSize)}×8×Rs.${FRAME_PRICE_PER_FT}] = <b>Rs.${frameCost}</b>`;
  }
  costTag.classList.remove('hidden');
  costTag.innerHTML = costLabel;
  accBox?.classList.remove('hidden');
  let sleeveTotal = 0;
  const slvChk = document.getElementById('acc-sleeve')?.checked;
  if (slvChk && mnt === 'Yes') {
    const slvType  = document.querySelector('input[name="slvType"]:checked')?.value || 'plain';
    sleeveTotal = calcSleeveCost(slvType, l, b);
    const slvTag = document.getElementById('frm-sleeve-price');
    if (slvTag) {
      slvTag.classList.remove('hidden');
      const slvColor = document.querySelector('input[name="slvColor"]:checked')?.value || '';
      slvTag.innerHTML = `Sleeve (${slvType==='plain'?'Plain Plastic':'Golden Stripe'}${slvColor?' · '+slvColor:''}): <b>Rs.${sleeveTotal}</b>`;
    }
  } else {
    document.getElementById('frm-sleeve-price')?.classList.add('hidden');
  }
  const grand = frameCost + sleeveTotal;
  totalTag.classList.remove('hidden');
  totalTag.textContent = `Total Framing Cost: Rs.${grand}`;
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

window.onPayModeChange = function() {
  const pm = document.querySelector('input[name="paymode"]:checked')?.value;
  document.getElementById('cash-upi-split')?.classList.toggle('hidden', pm !== 'Cash+UPI');
  if (pm !== 'Cash+UPI') {
    const sc = document.getElementById('split-cash'); if(sc) sc.value='';
    const su = document.getElementById('split-upi');  if(su) su.value='';
  }
};

window.calcSplitPayment = function() {
  const cash = +(document.getElementById('split-cash')?.value)||0;
  const upi  = +(document.getElementById('split-upi')?.value)||0;
  const splitTotal = cash + upi;
  const orderTotal = window.cart.reduce((s,i)=>s+(+i.price||0),0);
  const tag  = document.getElementById('split-total-tag');
  const warn = document.getElementById('split-warn');
  if (tag) tag.innerHTML = `Cash Rs.${cash} + UPI Rs.${upi} = <b>Rs.${splitTotal}</b> (Order Total: Rs.${orderTotal})`;
  if (warn) warn.classList.toggle('hidden', splitTotal === orderTotal);
};

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

window.calcPassport = () => {
  const c    = +(document.getElementById('pp-copies')?.value) || 8;
  const sets = Math.ceil(c / 8);
  const base = 200 + Math.max(0, sets - 1) * 100;
  const soft = document.querySelector('input[name="ppSoft"]:checked')?.value === 'Yes' ? 100 : 0;
  const total = base + soft;
  const costTag  = document.getElementById('pp-cost-tag');
  const totalTag = document.getElementById('pp-total-tag');
  if (costTag) costTag.textContent = `Print Cost: Rs.${base}`;
  if (soft && totalTag) { totalTag.classList.remove('hidden'); totalTag.textContent = `Total: Rs.${base} + Rs.${soft} (Soft Copy) = Rs.${total}`; }
  else if (totalTag) totalTag.classList.add('hidden');
};
window.calcVisa = () => {
  const c    = +(document.getElementById('vp-copies')?.value) || 8;
  const sets = Math.ceil(c / 8);
  const base = 250 + Math.max(0, sets - 1) * 100;
  const soft = document.querySelector('input[name="vpSoft"]:checked')?.value === 'Yes' ? 100 : 0;
  const total = base + soft;
  const costTag  = document.getElementById('vp-cost-tag');
  const totalTag = document.getElementById('vp-total-tag');
  if (costTag) costTag.textContent = `Print Cost: Rs.${base}`;
  if (soft && totalTag) { totalTag.classList.remove('hidden'); totalTag.textContent = `Total: Rs.${base} + Rs.${soft} (Soft Copy) = Rs.${total}`; }
  else if (totalTag) totalTag.classList.add('hidden');
};
window.calcScanning    = () => { const q=+(document.getElementById('scan-qty')?.value)||1; const t=document.getElementById('scan-cost-tag'); if(t) t.textContent=`Total: Rs.${q*50} (${q} × Rs.50)`; };
window.calcDoorPassport = ()=>{ const c=+(document.getElementById('dpp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dpp-total');if(el)el.value='Rs.'+(500+Math.max(0,s-1)*100);};
window.calcDoorVisa     = ()=>{ const c=+(document.getElementById('dvp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dvp-total');if(el)el.value='Rs.'+(500+Math.max(0,s-1)*100);};

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
    if(groupAsel.includes('Framing')){
      const lb = getFrameLB();
      if (!lb) { toast('⚠️ Enter print size for framing','error'); return; }
      const mouldSize = document.querySelector('input[name="ms"]:checked')?.value;
      const mouldSel  = document.getElementById('frm-mould-select');
      const mouldIdx  = mouldSel?.value;
      if (!mouldSize) { toast('⚠️ Select moulding size','error'); return; }
      if (!mouldIdx)  { toast('⚠️ Select moulding type','error'); return; }
      const mouldItem = (window.mouldingsCache[mouldSize] || DEFAULT_MOULDINGS[mouldSize] || [])[+mouldIdx];
      const mnt       = document.querySelector('input[name="mnt"]:checked')?.value || 'No';
      const mountSize = +(document.querySelector('input[name="mntS"]:checked')?.value) || 0;
      if (mnt === 'Yes' && !mountSize) { toast('⚠️ Select mount size','error'); return; }
      const { l, b } = lb;
      const frameCost = mnt === 'Yes'
        ? calcFrameCostWithMount(l, b, mouldSize, mountSize)
        : calcFrameCost(l, b, mouldSize);
      // Accessories
      const accs = [...document.querySelectorAll('input[name="acc"]:checked')].map(a=>a.value);
      const slvChk = document.getElementById('acc-sleeve')?.checked;
      let sleeveTotal = 0, sleeveDesc = '';
      if (slvChk && mnt === 'Yes') {
        const slvType  = document.querySelector('input[name="slvType"]:checked')?.value || 'plain';
        const slvColor = document.querySelector('input[name="slvColor"]:checked')?.value || '';
        sleeveTotal = calcSleeveCost(slvType, l, b);
        sleeveDesc  = ` +Sleeve(${slvType==='plain'?'Plain':'GoldenStripe'}${slvColor?' '+slvColor:''}) Rs.${sleeveTotal}`;
      }
      const fTotal = frameCost + sleeveTotal;
      const accDesc = accs.length ? ` [${accs.join('+')}]` : '';
      const mouldDesc = mouldItem ? `${mouldItem.code}-${mouldItem.name}` : mouldSize+'"';
      parts.push(`Frame ${mouldSize}" ${mouldDesc} ${mnt==='Yes'?'+Mount '+mountSize+'"':'NoMount'}${accDesc}${sleeveDesc} Rs.${fTotal}`);
      totalP += fTotal;
    }
    price=totalP; label=parts.join(' · ');
  } else if(groupBsel) {
    svcs=[groupBsel];
    if(groupBsel==='Passport Photos'){
      const c    = +(document.getElementById('pp-copies')?.value)||8;
      const sets = Math.ceil(c/8);
      const base = 200+Math.max(0,sets-1)*100;
      const soft = document.querySelector('input[name="ppSoft"]:checked')?.value==='Yes'?100:0;
      price = base+soft;
      label = `${c} copies${soft?' +SoftCopy Rs.100':''}`;
    }
    else if(groupBsel==='Visa Photos'){
      const c    = +(document.getElementById('vp-copies')?.value)||8;
      const vt   = document.getElementById('visa-type')?.value;
      const sets = Math.ceil(c/8);
      const base = 250+Math.max(0,sets-1)*100;
      const soft = document.querySelector('input[name="vpSoft"]:checked')?.value==='Yes'?100:0;
      price = base+soft;
      label = `${vt} · ${c} copies${soft?' +SoftCopy Rs.100':''}`;
    }
    else if(groupBsel==='Collage Making'){
      price=+(document.getElementById('collage-charge')?.value)||0;
      if(!price){toast('⚠️ Enter collage charge','error');return;}
      label=`Custom Collage Rs.${price}`;
    }
    else if(groupBsel==='Scanning'){
      const q=+(document.getElementById('scan-qty')?.value)||0;
      if(!q){toast('⚠️ Enter number of pictures','error');return;}
      price=q*50; label=`${q} pictures × Rs.50`;
    }
    else if(groupBsel==='Album Printing'){const pg=+(document.getElementById('alb-pages')?.value)||1;price=+(document.getElementById('alb-cost')?.value)||0;label=`${pg} pages`;}
    else if(groupBsel==='Portfolio Shoot'){const ex=+(document.getElementById('port-extra')?.value)||0;price=1000+ex;const pt=document.getElementById('port-type')?.value;label=`${pt}${ex?' +Extra Rs.'+ex:''}`;}
    else if(groupBsel==='Video Editing'){price=+(document.getElementById('vid-edit-charge')?.value)||0;label=`Charge Rs.${price}`;}
    else if(groupBsel==='Video Converting'){price=+(document.getElementById('vid-conv-charge')?.value)||0;label=`Charge Rs.${price}`;}
    else if(groupBsel==='Doorstep Passport'){const c=+(document.getElementById('dpp-copies')?.value)||8;const s=Math.ceil(c/8);price=500+Math.max(0,s-1)*100;const addr=document.getElementById('ds-addr')?.value||'';label=`${c} copies${addr?' · '+addr.slice(0,20):''}`;}
    else if(groupBsel==='Doorstep Visa'){const c=+(document.getElementById('dvp-copies')?.value)||8;const s=Math.ceil(c/8);price=500+Math.max(0,s-1)*100;const addr=document.getElementById('dvs-addr')?.value||'';label=`${c} copies${addr?' · '+addr.slice(0,20):''}`;}
    else { toast('⚠️ Select a service first','error'); return; }
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
