// ═══════════════════════════════════════════════════════════
//  FOTOVISION STUDIO PRO — Shared Order Form
// ═══════════════════════════════════════════════════════════

function getFormHTML(existing, role) {
  const isOwner = role === 'owner';
  return `
<div style="display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:start;" class="form-outer-grid">
<div style="min-width:0;">
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
      <label class="form-label">Email ID <span style="font-weight:400;color:var(--ink3);">(optional)</span></label>
      <input class="form-input" id="f-email" type="email" inputmode="email" placeholder="customer@email.com">
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label class="form-label">Address <span style="font-weight:400;color:var(--ink3);">(optional)</span></label>
      <textarea class="form-input" id="f-address" placeholder="Customer address (optional)" rows="2"></textarea>
    </div>
    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">Order Taken By</label>
        <select class="form-input" id="f-staff">
          <option>Abhik</option><option>Vishal</option><option>Rajesh</option>
        </select>
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
      <label class="pill-option"><input type="radio" name="groupB" value="Custom Order" onchange="onGroupB(this)"><span>✏️ Custom Order</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Readymade Frames" onchange="onGroupB(this)"><span>🖼️ Readymade Frames</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Slip In Albums" onchange="onGroupB(this)"><span>📒 Slip In Albums</span></label>
      <label class="pill-option"><input type="radio" name="groupB" value="Gift Items" onchange="onGroupB(this)"><span>🎁 Gift Items</span></label>
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

<!-- 3.5 REFERENCE PHOTOS -->
<div class="card" style="margin-bottom:16px;">
  <div class="card-header"><div class="card-title">📸 Reference Photos <span style="font-size:11px;color:var(--ink3);font-weight:400;">(Optional)</span></div></div>
  <div class="card-body">
    <!-- FIX 6: Two inputs - camera and gallery -->
    <input type="file" id="f-photos-cam" accept="image/*" capture="environment" style="display:none;" onchange="onPhotosSelected(this)">
    <input type="file" id="f-photos-gal" accept="image/*" multiple style="display:none;" onchange="onPhotosSelected(this)">
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <button type="button" onclick="document.getElementById('f-photos-cam').click()" class="btn-outline" style="flex:1;padding:10px;display:flex;align-items:center;justify-content:center;gap:6px;">
        <span style="font-size:18px;">📷</span> Camera
      </button>
      <button type="button" onclick="document.getElementById('f-photos-gal').click()" class="btn-outline" style="flex:1;padding:10px;display:flex;align-items:center;justify-content:center;gap:6px;">
        <span style="font-size:18px;">🖼️</span> Gallery
      </button>
    </div>
    <div id="photo-preview" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
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
      <label class="form-label" style="display:block;margin-bottom:10px;">📅 Delivery Date & Time</label>
      <!-- Date scroller -->
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:12px;" id="delivery-date-scroller"></div>
      <!-- Time picker -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">
        <div>
          <label class="form-label" style="font-size:11px;">Hour</label>
          <select class="form-input" id="f-del-hour" onchange="updateDeliveryDisplay()">
            ${[...Array(12)].map((_,i)=>`<option value="${i+1}">${i+1}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label" style="font-size:11px;">Minutes</label>
          <select class="form-input" id="f-del-min" onchange="updateDeliveryDisplay()">
            ${[0,5,10,15,20,25,30,35,40,45,50,55].map(m=>`<option value="${String(m).padStart(2,'0')}">${String(m).padStart(2,'0')}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label" style="font-size:11px;">AM/PM</label>
          <select class="form-input" id="f-del-ampm" onchange="updateDeliveryDisplay()">
            <option>AM</option><option selected>PM</option>
          </select>
        </div>
      </div>
      <div id="delivery-display" style="font-size:13px;font-weight:700;color:var(--gold-dk);padding:8px 12px;background:#fff;border-radius:8px;border:1px solid var(--paper3);"></div>
      <input type="hidden" id="f-delivery">
    </div>
    <div style="margin-top:14px;">
      <label class="form-label" style="display:block;margin-bottom:8px;">📝 Special Notes</label>
      <input class="form-input" id="f-notes" placeholder="Any special instructions for staff or framer…">
    </div>
  </div>
</div>

<!-- 5. BILLING -->
<div class="card" style="margin-bottom:16px;">
  <div class="card-header"><div class="card-title">💰 Billing &amp; Payment</div></div>
  <div class="card-body">

    <!-- Billing Summary -->
    <div id="billing-summary" style="display:none;background:var(--paper);border:1px solid var(--paper3);border-radius:var(--r-md);padding:14px 16px;margin-bottom:16px;font-size:13px;"></div>

    <!-- Discount + Complimentary -->
    <div style="margin-bottom:18px;">
      <label class="form-label" style="display:block;margin-bottom:10px;">Discount & Complimentary</label>
      <div class="pill-group" style="flex-wrap:wrap;gap:6px;">
        <label class="pill-option"><input type="radio" name="disc" value="0" checked onchange="onDiscountChange(0)"><span>No Discount</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="5" onchange="onDiscountChange(5)"><span>5%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="10" onchange="onDiscountChange(10)"><span>10%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="15" onchange="onDiscountChange(15)"><span>15%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="20" onchange="onDiscountChange(20)"><span>20%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="25" onchange="onDiscountChange(25)"><span>25%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="30" onchange="onDiscountChange(30)"><span>30%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="35" onchange="onDiscountChange(35)"><span>35%</span></label>
        <label class="pill-option"><input type="radio" name="disc" value="40" onchange="onDiscountChange(40)"><span>40%</span></label>
        <button type="button" onclick="saveComplimentary()" style="padding:6px 14px;background:#fff3e0;border:2px solid #e65100;color:#e65100;border-radius:100px;font-size:13px;font-weight:700;cursor:pointer;">🎁 Complimentary</button>
      </div>
      <div id="discount-tag" class="price-tag hidden" style="margin-top:10px;background:linear-gradient(135deg,#2D8A5E,#3DAA74);"></div>
    </div>

    <!-- Payment Mode -->
    <div style="margin-bottom:18px;">
      <label class="form-label" style="display:block;margin-bottom:10px;">Payment Mode</label>
      <div class="toggle-group" style="flex-wrap:wrap;" id="paymode-group">
        <label class="toggle-option"><input type="radio" name="paymode" value="Cash" checked onchange="onPayModeChange()"><span>💵 Cash</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="UPI" onchange="onPayModeChange()"><span>📱 UPI</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="Credit Card" onchange="onPayModeChange()"><span>💳 Credit Card</span></label>
        <label class="toggle-option"><input type="radio" name="paymode" value="Cash+UPI" onchange="onPayModeChange()"><span>💵📱 Cash+UPI</span></label>
      </div>
      <!-- Credit company options - dynamically added -->
      <div id="credit-companies-pay" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;"></div>
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
      <!-- Credit company info -->
      <div id="credit-pay-info" class="hidden" style="margin-top:8px;background:#fff3e0;border-radius:8px;padding:10px;font-size:13px;color:#e65100;">
        🏢 <b id="credit-company-name"></b> — Amount will be added to credit ledger. No payment collected now.
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

<!-- ACTIONS (bottom of form) -->
<div style="display:flex;gap:12px;padding-bottom:20px;">
  <button class="btn btn-secondary btn-lg" style="flex:1;" onclick="requestCancelOrder()">✕ Cancel</button>
  <button class="btn btn-primary btn-lg" style="flex:2;" onclick="saveOrder()">📅 Book Order</button>
  <button class="btn btn-outline btn-lg" style="flex:1;border:2px solid var(--gold-dk);color:var(--gold-dk);background:#fff;" onclick="saveEstimate()">💰 Estimate</button>
</div>

</div><!-- /form left column -->

<!-- CART PANEL — RIGHT SIDE -->
<div id="cart-panel" style="position:sticky;top:80px;">
  <div class="card">
    <div class="card-header" style="border-bottom:2px solid var(--gold-dk);">
      <div class="card-title">🛒 Order Summary</div>
    </div>
    <div class="card-body" style="padding:12px;">
      <div id="cart-panel-items">
        <div style="text-align:center;padding:20px;color:var(--ink3);font-size:13px;">No services added yet</div>
      </div>
      <div id="cart-panel-totals" class="hidden" style="border-top:1px solid var(--paper3);padding-top:10px;margin-top:10px;">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
          <span>Subtotal</span><span id="cp-subtotal">Rs.0</span>
        </div>
        <div id="cp-discount-row" class="hidden" style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;color:#388e3c;">
          <span id="cp-disc-label">Discount</span><span id="cp-discount">-Rs.0</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:var(--gold-dk);margin-top:8px;padding-top:8px;border-top:2px solid var(--gold-dk);">
          <span>TOTAL</span><span id="cp-total">Rs.0</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;">
        <button class="btn btn-primary btn-lg" style="width:100%;margin-bottom:8px;" onclick="saveOrder()">📅 Book Order</button>
        <button class="btn btn-outline btn-lg" style="width:100%;border:2px solid var(--gold-dk);color:var(--gold-dk);background:#fff;" onclick="saveEstimate()">💰 Save Estimate</button>
        <button class="btn btn-secondary" style="width:100%;" onclick="requestCancelOrder()">✕ Cancel</button>
      </div>
    </div>
  </div>
</div>

</div><!-- /form-outer-grid -->`;
}

// Mobile: on small screens hide right panel
const _formGridStyle = document.createElement('style');
_formGridStyle.textContent = '@media(max-width:700px){.form-outer-grid{grid-template-columns:1fr!important;}#cart-panel{position:static;}}';
document.head?.appendChild(_formGridStyle);

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
      <!-- Frame size dropdown with custom option -->
      <div style="margin-bottom:14px;">
        <label class="form-label" style="display:block;margin-bottom:8px;">Frame Size</label>
        <select class="form-input" id="frm-size-select" onchange="onFrameSizeSelect()" style="margin-bottom:8px;">
          <option value="">— Select Size —</option>
          <option value="4x6">4×6"</option>
          <option value="5x7">5×7"</option>
          <option value="6x8">6×8"</option>
          <option value="8x10">8×10"</option>
          <option value="8x12">8×12"</option>
          <option value="10x12">10×12"</option>
          <option value="10x15">10×15"</option>
          <option value="12x15">12×15"</option>
          <option value="12x16">12×16"</option>
          <option value="12x18">12×18"</option>
          <option value="16x20">16×20"</option>
          <option value="20x24">20×24"</option>
          <option value="20x30">20×30"</option>
          <option value="24x30">24×30"</option>
          <option value="24x36">24×36"</option>
          <option value="30x40">30×40"</option>
          <option value="custom">✏️ Custom Size...</option>
        </select>
        <!-- Custom size inputs — shown only when Custom selected -->
        <div id="frm-custom-size" style="display:none;">
          <div style="display:flex;gap:10px;align-items:center;margin-top:8px;">
            <input class="form-input" id="frm-L-custom" type="number" min="1" placeholder="Width (in)" style="max-width:110px;" oninput="onFrameCustomInput()">
            <span style="font-weight:700;color:var(--gold-dk);">×</span>
            <input class="form-input" id="frm-B-custom" type="number" min="1" placeholder="Height (in)" style="max-width:110px;" oninput="onFrameCustomInput()">
            <span style="font-size:12px;color:var(--ink3);">inches</span>
          </div>
        </div>
        <!-- Hidden inputs used for frame calculation -->
        <input type="hidden" id="frm-L" value="">
        <input type="hidden" id="frm-B" value="">
      </div>` : `<div id="frm-size-info" class="price-info" style="margin-bottom:12px;">📐 Print size taken from Printing panel</div>
      <input type="hidden" id="frm-L" value=""><input type="hidden" id="frm-B" value="">`}

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
              <input class="form-input" id="frm-new-code" placeholder="Code (e.g. M6)" style="max-width:110px;">
              <input class="form-input" id="frm-new-name" placeholder="Name/Color (e.g. Rose Gold)" style="flex:1;min-width:150px;">
              <input class="form-input" id="frm-new-price" type="number" min="1" placeholder="Rs./ft" style="max-width:90px;">
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
          <label id="table-stand-row" class="check-btn" style="width:100%;">
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

  if(svcs.includes('Stock Items')) html += `
    <div class="svc-panel" id="panel-stock">
      <div class="section-head" style="font-size:15px;">📦 Stock Items</div>
      <div id="stock-items-form">
        <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;align-items:flex-end;">
          <div class="form-group" style="flex:2;min-width:140px;">
            <label class="form-label">Item</label>
            <select class="form-input" id="stock-item-select" onchange="onStockItemSelect()">
              <option value="">— Select Item —</option>
            </select>
          </div>
          <div class="form-group" style="max-width:90px;">
            <label class="form-label">Qty</label>
            <input class="form-input" id="stock-item-qty" type="number" min="1" value="1" oninput="calcStockItem()">
          </div>
          <div class="form-group" style="max-width:100px;">
            <label class="form-label">Price</label>
            <input class="form-input" id="stock-item-price" type="number" readonly style="background:#f5f5f5;">
          </div>
          <button type="button" onclick="addStockItemToCart()" class="btn-gold" style="padding:10px 14px;margin-bottom:2px;">➕ Add</button>
        </div>
        <div id="stock-item-total" class="price-info hidden"></div>
        <div id="stock-items-added" style="margin-top:8px;"></div>
      </div>
    </div>`;

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
    <div class="price-info" style="margin-bottom:10px;"><b>Rs.250</b> for first set · <b>Rs.100</b> per extra set</div>
    <div class="form-group" style="margin-bottom:10px;">
      <label class="form-label">Visa Country</label>
      <select class="form-input" id="visa-type" onchange="onVisaCountryChange()">
        <option value="">— Select Country —</option>
        <option value="USA|50×50mm|6">🇺🇸 USA · 50×50mm · 6 copies</option>
        <option value="Canada|50×70mm|4">🇨🇦 Canada · 50×70mm · 4 copies</option>
        <option value="UK|35×45mm|8">🇬🇧 UK · 35×45mm · 8 copies</option>
        <option value="Australia|35×45mm|8">🇦🇺 Australia · 35×45mm · 8 copies</option>
        <option value="Vietnam|40×60mm|4">🇻🇳 Vietnam · 40×60mm · 4 copies</option>
        <option value="Schengen (EU)|35×45mm|8">🇪🇺 Schengen (EU) · 35×45mm · 8 copies</option>
        <option value="China|33×48mm|8">🇨🇳 China · 33×48mm · 8 copies</option>
        <option value="Japan|35×45mm|8">🇯🇵 Japan · 35×45mm · 8 copies</option>
        <option value="Russia|35×45mm|8">🇷🇺 Russia · 35×45mm · 8 copies</option>
        <option value="UAE / Dubai|45×55mm|4">🇦🇪 UAE / Dubai · 45×55mm · 4 copies</option>
        <option value="Saudi Arabia|50×50mm|6">🇸🇦 Saudi Arabia · 50×50mm · 6 copies</option>
        <option value="Singapore|35×45mm|8">🇸🇬 Singapore · 35×45mm · 8 copies</option>
        <option value="Malaysia|35×50mm|6">🇲🇾 Malaysia · 35×50mm · 6 copies</option>
        <option value="South Korea|35×45mm|8">🇰🇷 South Korea · 35×45mm · 8 copies</option>
      </select>
    </div>
    <div class="form-group" style="max-width:220px;margin-bottom:10px;" id="visa-copies-group" style="display:none;">
      <label class="form-label">Number of Copies</label>
      <select class="form-input" id="vp-copies" onchange="calcVisa()">
        <option value="8">8 copies</option>
      </select>
    </div>
    <div id="vp-cost-tag" class="price-tag" style="margin-bottom:12px;"></div>
    <label class="form-label" style="display:block;margin-bottom:8px;">Add Soft Copy? (Optional)</label>
    <div class="toggle-group" style="margin-bottom:8px;">
      <label class="toggle-option"><input type="radio" name="vpSoft" value="No" checked onchange="calcVisa()"><span>❌ No</span></label>
      <label class="toggle-option"><input type="radio" name="vpSoft" value="Yes" onchange="calcVisa()"><span>✅ Yes (+Rs.100)</span></label>
    </div>
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

  if(svc==='Custom Order') return `<div class="svc-panel" id="panel-b">
    <div class="section-head" style="font-size:15px;">✏️ Custom Order</div>
    <div class="form-group" style="margin-bottom:10px;">
      <label class="form-label">Service Name</label>
      <input class="form-input" id="custom-name" placeholder="e.g. ID Card Printing, Lamination A4...">
    </div>
    <div class="form-group" style="margin-bottom:10px;">
      <label class="form-label">Description (Optional)</label>
      <input class="form-input" id="custom-desc" placeholder="Any special details...">
    </div>
    <div class="form-grid-2" style="margin-bottom:10px;">
      <div class="form-group">
        <label class="form-label">Quantity</label>
        <input class="form-input" id="custom-qty" type="number" min="1" value="1" inputmode="numeric" oninput="calcCustom()">
      </div>
      <div class="form-group">
        <label class="form-label">Price per unit (Rs.)</label>
        <input class="form-input" id="custom-price" type="number" min="0" placeholder="0" oninput="calcCustom()">
      </div>
    </div>
    <div id="custom-total-tag" class="price-tag hidden"></div>
  </div>`;

  if(svc==='Readymade Frames'||svc==='Slip In Albums'||svc==='Gift Items') {
    const icon = svc==='Readymade Frames'?'🖼️':svc==='Slip In Albums'?'📒':'🎁';
    const cat  = svc==='Readymade Frames'?'frames':svc==='Slip In Albums'?'albums':'gifts';
    return `<div class="svc-panel" id="panel-b">
      <div class="section-head" style="font-size:15px;">${icon} ${svc}</div>
      <div id="${cat}-items-form">
        <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;align-items:flex-end;">
          <div class="form-group" style="flex:2;min-width:140px;">
            <label class="form-label">Item</label>
            <select class="form-input" id="${cat}-item-select" onchange="onStockCatSelect('${cat}')">
              <option value="">— Select Item —</option>
            </select>
          </div>
          <div class="form-group" style="max-width:80px;">
            <label class="form-label">Qty</label>
            <input class="form-input" id="${cat}-item-qty" type="number" min="1" value="1" oninput="calcStockCatItem('${cat}')">
          </div>
          <div class="form-group" style="max-width:100px;">
            <label class="form-label">Price</label>
            <input class="form-input" id="${cat}-item-price" type="number" readonly style="background:#f5f5f5;">
          </div>
          <button type="button" onclick="addStockCatToList('${cat}','${svc}')" class="btn-gold" style="padding:10px 14px;">➕ Add</button>
        </div>
        <div id="${cat}-item-total" class="price-info hidden"></div>
        <div id="${cat}-items-added" style="margin-top:8px;"></div>
      </div>
    </div>`;
  }

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
// FIX 1: Global groupAsel so getFrameLB() can access it without crashing
let groupAsel = [];

function initFormJS(existing, role) {
  updatePaymentSection();
  updateCartPanel();
  updateCreditPaymentOptions(); // Add credit company buttons
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
  groupAsel = sel; // FIX 1: keep global in sync
  document.querySelectorAll('input[name="groupB"]').forEach(r=>r.checked=false);
  document.getElementById('panel-b')?.remove();

  const area = document.getElementById('svc-panel-area');

  // Map service name → panel ID
  const panelMap = {
    'Photo Editing': 'panel-editing',
    'Printing':      'panel-printing',
    'Framing':       'panel-framing',
  };

  Object.entries(panelMap).forEach(([svc, panelId]) => {
    const existing = document.getElementById(panelId);
    if(sel.includes(svc) && !existing) {
      const tmp = document.createElement('div');
      tmp.innerHTML = getSvcPanelHTML([svc]);
      const newPanel = tmp.querySelector('#'+panelId);
      if(newPanel) area.appendChild(newPanel);
      else if(tmp.firstElementChild) area.appendChild(tmp.firstElementChild);
    } else if(!sel.includes(svc) && existing) {
      existing.remove();
    }
  });
};

window.onGroupB = function(el) {
  document.querySelectorAll('input[name="groupA"]').forEach(c=>c.checked=false);
  document.getElementById('svc-panel-area').innerHTML = getBPanelHTML(el.value);
  if(el.value==='Passport Photos')   calcPassport();
  if(el.value==='Visa Photos')       { onVisaCountryChange(); }
  if(el.value==='Doorstep Passport') calcDoorPassport();
  if(el.value==='Doorstep Visa')     calcDoorVisa();
  if(el.value==='Readymade Frames')  populateStockCategoryDropdown('frames');
  if(el.value==='Slip In Albums')    populateStockCategoryDropdown('albums');
  if(el.value==='Gift Items')        populateStockCategoryDropdown('gifts');
};

// ── Stock Category Helpers ────────────────────────────────────
window.stockCatCarts = { frames:[], albums:[], gifts:[] };

function getCatItems(cat) {
  const catMap = { frames:'Readymade Frames', albums:'Slip In Albums', gifts:'Gift Items' };
  return (window.stockItems||[]).filter(i=>i.category===catMap[cat] && (+i.qty||0)>0);
}

window.populateStockCategoryDropdown = function(cat) {
  const sel = document.getElementById(cat+'-item-select');
  if(!sel) return;
  const items = getCatItems(cat);
  sel.innerHTML = '<option value="">— Select Item —</option>' +
    items.map(i=>`<option value="${i.id}">${i.name} (Qty: ${i.qty}) — Rs.${i.sellingPrice}</option>`).join('');
};

window.onStockCatSelect = function(cat) {
  const id = document.getElementById(cat+'-item-select')?.value;
  const item = (window.stockItems||[]).find(x=>x.id===id);
  const priceEl = document.getElementById(cat+'-item-price');
  if(item && priceEl) { priceEl.value = item.sellingPrice; calcStockCatItem(cat); }
};

window.calcStockCatItem = function(cat) {
  const qty   = +(document.getElementById(cat+'-item-qty')?.value)||1;
  const price = +(document.getElementById(cat+'-item-price')?.value)||0;
  const el    = document.getElementById(cat+'-item-total');
  if(el && price>0) { el.classList.remove('hidden'); el.textContent=`Total: Rs.${qty*price} (${qty} × Rs.${price})`; }
};

window.addStockCatToList = function(cat, svcName) {
  const id    = document.getElementById(cat+'-item-select')?.value;
  const qty   = +(document.getElementById(cat+'-item-qty')?.value)||1;
  const price = +(document.getElementById(cat+'-item-price')?.value)||0;
  const item  = (window.stockItems||[]).find(x=>x.id===id);
  if(!item){toast('⚠️ Select an item','error');return;}
  if(qty>+item.qty){toast(`⚠️ Only ${item.qty} in stock`,'error');return;}
  if(!price){toast('⚠️ Price not set','error');return;}
  if(!window.stockCatCarts) window.stockCatCarts={frames:[],albums:[],gifts:[]};
  window.stockCatCarts[cat].push({id,name:item.name,qty,unitPrice:price,total:qty*price,svc:svcName});
  const el=document.getElementById(cat+'-items-added');
  if(el) el.innerHTML=window.stockCatCarts[cat].map((s,i)=>
    `<div style="display:flex;justify-content:space-between;padding:6px 8px;background:var(--paper);border-radius:6px;margin-bottom:4px;font-size:13px;">
      <span>${s.name} × ${s.qty}</span>
      <span style="font-weight:700;">Rs.${s.total} <button onclick="removeStockCatItem('${cat}',${i})" style="background:none;border:none;color:#e53935;cursor:pointer;">✕</button></span>
    </div>`).join('');
  document.getElementById(cat+'-item-select').value='';
  document.getElementById(cat+'-item-qty').value='1';
  document.getElementById(cat+'-item-price').value='';
  document.getElementById(cat+'-item-total')?.classList.add('hidden');
  toast(`✅ ${item.name} added`,'success');
};

window.removeStockCatItem = function(cat, idx) {
  if(!window.stockCatCarts?.[cat]) return;
  window.stockCatCarts[cat].splice(idx,1);
  const el=document.getElementById(cat+'-items-added');
  if(el) el.innerHTML=window.stockCatCarts[cat].map((s,i)=>
    `<div style="display:flex;justify-content:space-between;padding:6px 8px;background:var(--paper);border-radius:6px;margin-bottom:4px;font-size:13px;">
      <span>${s.name} × ${s.qty}</span>
      <span style="font-weight:700;">Rs.${s.total} <button onclick="removeStockCatItem('${cat}',${i})" style="background:none;border:none;color:#e53935;cursor:pointer;">✕</button></span>
    </div>`).join('');
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
  items.forEach((m,i) => opts += `<option value="${i}">${m.code} — ${m.name} (Rs.${m.price||10}/ft)</option>`);
  sel.innerHTML = opts;
  sel.dataset.mouldSize = size;
  document.getElementById('frm-mount-section')?.classList.remove('hidden');
  updateTableStandVisibility();
  calcFrame();
};

window.toggleAddMould = function() {
  document.getElementById('frm-add-mould-form')?.classList.toggle('hidden');
};

window.saveNewMoulding = async function() {
  const size  = document.getElementById('frm-mould-select')?.dataset.mouldSize;
  const code  = document.getElementById('frm-new-code')?.value.trim();
  const name  = document.getElementById('frm-new-name')?.value.trim();
  const price = +(document.getElementById('frm-new-price')?.value) || 0;
  if (!size || !code || !name) { toast('⚠️ Enter moulding code and name','error'); return; }
  if (!price) { toast('⚠️ Enter price per ft','error'); return; }
  await addMoulding(size, code, name, price);
  onMouldSizeChange(size);
  document.getElementById('frm-new-code').value = '';
  document.getElementById('frm-new-name').value = '';
  document.getElementById('frm-new-price').value = '';
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
  updateTableStandVisibility();
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

window.onFrameSizeSelect = function() {
  const sel = document.getElementById('frm-size-select');
  const val = sel?.value;
  const customBox = document.getElementById('frm-custom-size');
  const hidL = document.getElementById('frm-L');
  const hidB = document.getElementById('frm-B');

  if(val === 'custom') {
    if(customBox) customBox.style.display = 'block';
    if(hidL) hidL.value = '';
    if(hidB) hidB.value = '';
    updateTableStandVisibility();
  } else if(val) {
    if(customBox) customBox.style.display = 'none';
    const [w,h] = val.split('x').map(Number);
    if(hidL) hidL.value = w;
    if(hidB) hidB.value = h;
    updateTableStandVisibility();
    calcFrame();
  } else {
    if(customBox) customBox.style.display = 'none';
    if(hidL) hidL.value = '';
    if(hidB) hidB.value = '';
    updateTableStandVisibility();
  }
};

window.onFrameCustomInput = function() {
  const w = document.getElementById('frm-L-custom')?.value;
  const h = document.getElementById('frm-B-custom')?.value;
  const hidL = document.getElementById('frm-L');
  const hidB = document.getElementById('frm-B');
  if(hidL) hidL.value = w||'';
  if(hidB) hidB.value = h||'';
  updateTableStandVisibility();
  calcFrame();
};

// ── Table Stand Visibility ────────────────────────────────────
// Called immediately whenever size or mount changes — no dependency on moulding being selected
function updateTableStandVisibility() {
  const tsRow = document.getElementById('table-stand-row');
  if (!tsRow) return;

  let l = 0, b = 0;

  // If printing panel is active, read size from print size select
  const printingPanel = document.getElementById('panel-printing');
  const isPrintingActive = printingPanel && !printingPanel.classList.contains('hidden');
  if (isPrintingActive) {
    const size = document.getElementById('pr-size')?.value;
    if (size && window.SIZE_DIMS && SIZE_DIMS[size]) {
      l = SIZE_DIMS[size].w;
      b = SIZE_DIMS[size].h;
    }
  } else {
    // Framing-only: read from hidden inputs (set by size select or custom inputs)
    l = +(document.getElementById('frm-L')?.value) || 0;
    b = +(document.getElementById('frm-B')?.value) || 0;
  }

  // Also account for mount size — frame+mount may push over threshold
  const mnt = document.querySelector('input[name="mnt"]:checked')?.value || 'No';
  const mountSize = +(document.querySelector('input[name="mntS"]:checked')?.value) || 0;
  if (mnt === 'Yes' && mountSize > 0) {
    l = l + mountSize * 2;
    b = b + mountSize * 2;
  }

  // Hide if either dimension exceeds 10×12
  const hide = (l > 0 && b > 0) && (l > 10 || b > 12);
  tsRow.style.display = hide ? 'none' : '';
  if (hide) {
    const tsCb = document.querySelector('input[name="acc"][value="Table Stand"]');
    if (tsCb) tsCb.checked = false;
  }
}
window.updateTableStandVisibility = updateTableStandVisibility;

function getFrameLB() {
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

  // Hide table stand for large frames (delegated to shared function)
  updateTableStandVisibility();
  const mouldItem = (window.mouldingsCache[mouldSize] || DEFAULT_MOULDINGS[mouldSize] || [])[+mouldIdx];
  const pricePerFt = mouldItem?.price || FRAME_PRICE_PER_FT;
  let frameCost = 0, costLabel = '';
  if (mnt === 'Yes') {
    const newL = l + mountSize*2, newB = b + mountSize*2;
    const perim = (newL + newB) * 2;
    const mouldCost = mouldRound(mouldSize) * 8 * pricePerFt;
    frameCost = perim + mouldCost;
    costLabel = `Frame+Mount: [(${newL}+${newB})×2]+[${mouldRound(mouldSize)}×8×Rs.${pricePerFt}] = <b>Rs.${frameCost}</b>`;
  } else {
    const perim = (l + b) * 2;
    const mouldCost = mouldRound(mouldSize) * 8 * pricePerFt;
    frameCost = perim + mouldCost;
    costLabel = `Frame: [(${l}+${b})×2]+[${mouldRound(mouldSize)}×8×Rs.${pricePerFt}] = <b>Rs.${frameCost}</b>`;
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
  updateCartPanel(); // Live preview update
};

function onOrderType() {
  const otype = document.querySelector('input[name="otype"]:checked')?.value;
  const box = document.getElementById('delivery-box');
  box.classList.toggle('hidden', otype!=='Booking');
  if(otype==='Booking') {
    initDeliveryPicker();
  }
  updatePaymentSection();
}

function updatePaymentSection() {
  const otype = document.querySelector('input[name="otype"]:checked')?.value||'Instant';
  document.getElementById('instant-pay-note').classList.toggle('hidden', otype!=='Instant');
  document.getElementById('booking-advance-box').classList.toggle('hidden', otype!=='Booking');
}

window.onPayModeChange = function() {
  const pm = document.querySelector('input[name="paymode"]:checked')?.value;
  const isCredit = pm && (window.creditCompanies||[]).includes(pm);
  document.getElementById('cash-upi-split')?.classList.toggle('hidden', pm !== 'Cash+UPI');
  document.getElementById('credit-pay-info')?.classList.toggle('hidden', !isCredit);
  if(isCredit) {
    const nameEl = document.getElementById('credit-company-name');
    if(nameEl) nameEl.textContent = pm;
  }
  if(pm !== 'Cash+UPI') {
    const sc = document.getElementById('split-cash'); if(sc) sc.value='';
    const su = document.getElementById('split-upi'); if(su) su.value='';
  }
};

// Populate credit company payment options
window.updateCreditPaymentOptions = function() {
  const el = document.getElementById('credit-companies-pay');
  if(!el) return;
  const companies = window.creditCompanies||[];
  if(!companies.length) { el.innerHTML=''; return; }
  el.innerHTML = companies.map(c=>
    `<label class="toggle-option">
      <input type="radio" name="paymode" value="${c}" onchange="onPayModeChange()">
      <span>🏢 ${c}</span>
    </label>`
  ).join('');
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

  updateTableStandVisibility();
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
  updateCartPanel();
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
  updateCartPanel();
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
  updateCartPanel();
};
window.onVisaCountryChange = function() {
  const val = document.getElementById('visa-type')?.value;
  if(!val) return;
  const [country, size, base] = val.split('|');
  const baseNum = parseInt(base)||8;

  // Populate copies dropdown with 10 multiples
  const copiesSel = document.getElementById('vp-copies');
  if(copiesSel) {
    copiesSel.innerHTML = Array.from({length:10},(_,i)=>{
      const n = baseNum*(i+1);
      return `<option value="${n}">${n} copies</option>`;
    }).join('');
  }

  // Show copies group
  document.getElementById('visa-copies-group')?.removeAttribute('style');

  calcVisa();
};

window.calcVisa = () => {
  const c    = +(document.getElementById('vp-copies')?.value)||8;
  const base = 250 + Math.max(0, Math.ceil(c/8)-1)*100;
  const soft = document.querySelector('input[name="vpSoft"]:checked')?.value==='Yes'?100:0;
  const total = base+soft;
  const ct = document.getElementById('vp-cost-tag');
  if(ct) ct.textContent = soft ? `Total: Rs.${total} (Print Rs.${base} + Soft Copy Rs.${soft})` : `Total: Rs.${base}`;
  updateCartPanel(); // FIX 3: live panel update for visa
};
window.calcScanning    = () => { const q=+(document.getElementById('scan-qty')?.value)||1; const t=document.getElementById('scan-cost-tag'); if(t) t.textContent=`Total: Rs.${q*50} (${q} × Rs.50)`; };
window.calcCustom      = () => {
  const q=+(document.getElementById('custom-qty')?.value)||1;
  const p=+(document.getElementById('custom-price')?.value)||0;
  const t=document.getElementById('custom-total-tag');
  if(t){ if(p>0){t.classList.remove('hidden');t.textContent=`Total: Rs.${q*p} (${q} × Rs.${p})`;}else t.classList.add('hidden'); }
};

// ── Stock Item Form Helpers ───────────────────────────────────
window.stockItemsInCart = []; // temp list while filling

function populateStockDropdown() {
  const sel = document.getElementById('stock-item-select');
  if(!sel) return;
  const items = (window.stockItems||[]).filter(i=>(+i.qty||0)>0);
  sel.innerHTML = '<option value="">— Select Item —</option>' +
    items.map(i=>`<option value="${i.id}">${i.name} (Qty: ${i.qty}) — Rs.${i.sellingPrice}</option>`).join('');
}

window.onStockItemSelect = function() {
  const id  = document.getElementById('stock-item-select')?.value;
  const item = (window.stockItems||[]).find(x=>x.id===id);
  const priceEl = document.getElementById('stock-item-price');
  if(item && priceEl) { priceEl.value = item.sellingPrice; calcStockItem(); }
};

window.calcStockItem = function() {
  const qty  = +(document.getElementById('stock-item-qty')?.value)||1;
  const price= +(document.getElementById('stock-item-price')?.value)||0;
  const el   = document.getElementById('stock-item-total');
  if(el && price>0) { el.classList.remove('hidden'); el.textContent=`Total: Rs.${qty*price} (${qty} × Rs.${price})`; }
};

window.addStockItemToCart = function() {
  const id   = document.getElementById('stock-item-select')?.value;
  const qty  = +(document.getElementById('stock-item-qty')?.value)||1;
  const price= +(document.getElementById('stock-item-price')?.value)||0;
  const item = (window.stockItems||[]).find(x=>x.id===id);
  if(!item) { toast('⚠️ Select a stock item','error'); return; }
  if(qty > +item.qty) { toast(`⚠️ Only ${item.qty} in stock`,'error'); return; }
  if(!price) { toast('⚠️ Price not set for this item','error'); return; }

  if(!window.stockItemsInCart) window.stockItemsInCart = [];
  window.stockItemsInCart.push({ id, name:item.name, qty, unitPrice:price, total:qty*price });

  // Show added items
  const el = document.getElementById('stock-items-added');
  if(el) el.innerHTML = window.stockItemsInCart.map((s,i)=>
    `<div style="display:flex;justify-content:space-between;padding:6px 8px;background:var(--paper);border-radius:6px;margin-bottom:4px;font-size:13px;">
      <span>📦 ${s.name} × ${s.qty}</span>
      <span style="font-weight:700;">Rs.${s.total} <button onclick="removeStockItem(${i})" style="background:none;border:none;color:#e53935;cursor:pointer;">✕</button></span>
    </div>`).join('');

  // Reset
  document.getElementById('stock-item-select').value='';
  document.getElementById('stock-item-qty').value='1';
  document.getElementById('stock-item-price').value='';
  document.getElementById('stock-item-total')?.classList.add('hidden');
  toast(`✅ ${item.name} added`,'success');
};

window.removeStockItem = function(idx) {
  if(!window.stockItemsInCart) return;
  window.stockItemsInCart.splice(idx,1);
  const el = document.getElementById('stock-items-added');
  if(el) el.innerHTML = window.stockItemsInCart.map((s,i)=>
    `<div style="display:flex;justify-content:space-between;padding:6px 8px;background:var(--paper);border-radius:6px;margin-bottom:4px;font-size:13px;">
      <span>📦 ${s.name} × ${s.qty}</span>
      <span style="font-weight:700;">Rs.${s.total} <button onclick="removeStockItem(${i})" style="background:none;border:none;color:#e53935;cursor:pointer;">✕</button></span>
    </div>`).join('');
};
window.calcDoorPassport = ()=>{ const c=+(document.getElementById('dpp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dpp-total');if(el)el.value='Rs.'+(500+Math.max(0,s-1)*100);};
window.calcDoorVisa     = ()=>{ const c=+(document.getElementById('dvp-copies')?.value)||8;const s=Math.ceil(c/8);const el=document.getElementById('dvp-total');if(el)el.value='Rs.'+(500+Math.max(0,s-1)*100);};

// ── Add to Cart ───────────────────────────────────────────────
window.addToCart = function() {
  groupAsel = [...document.querySelectorAll('input[name="groupA"]:checked')].map(c=>c.value); // FIX 1: update global
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
    if(groupAsel.includes('Stock Items')){
      const items = window.stockItemsInCart||[];
      if(!items.length){toast('⚠️ Add at least one stock item','error');return;}
      items.forEach(s=>{
        parts.push(`Stock: ${s.name} ×${s.qty} Rs.${s.total}`);
        totalP+=s.total;
        // Deduct stock qty
        if(window.stockItems){
          const si=window.stockItems.find(x=>x.id===s.id);
          if(si){si.qty=Math.max(0,(+si.qty||0)-s.qty);updateStockQty(s.id,si.qty);}
        }
      });
      window.stockItemsInCart=[];
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
      const pricePerFt = mouldItem?.price || FRAME_PRICE_PER_FT;
      const mnt       = document.querySelector('input[name="mnt"]:checked')?.value || 'No';
      const mountSize = +(document.querySelector('input[name="mntS"]:checked')?.value) || 0;
      if (mnt === 'Yes' && !mountSize) { toast('⚠️ Select mount size','error'); return; }
      const { l, b } = lb;
      // Use moulding's own price
      const mouldCost = mouldRound(mouldSize) * 8 * pricePerFt;
      let frameCost;
      if (mnt === 'Yes') {
        const newL = l + mountSize*2, newB = b + mountSize*2;
        frameCost = (newL + newB) * 2 + mouldCost;
      } else {
        frameCost = (l + b) * 2 + mouldCost;
      }
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
      const vtVal= document.getElementById('visa-type')?.value||'';
      const vt   = vtVal ? vtVal.split('|')[0] : 'Visa';
      const vsz  = vtVal ? vtVal.split('|')[1] : '';
      const sets = Math.ceil(c/8);
      const base = 250+Math.max(0,sets-1)*100;
      const soft = document.querySelector('input[name="vpSoft"]:checked')?.value==='Yes'?100:0;
      price = base+soft;
      label = `${vt}${vsz?' ('+vsz+')':''} · ${c} copies${soft?' +SoftCopy Rs.100':''}`;
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
    else if(['Readymade Frames','Slip In Albums','Gift Items'].includes(groupBsel)){
      const cat = groupBsel==='Readymade Frames'?'frames':groupBsel==='Slip In Albums'?'albums':'gifts';
      const items = window.stockCatCarts?.[cat]||[];
      if(!items.length){toast('⚠️ Add at least one item','error');return;}
      price = items.reduce((s,i)=>s+i.total,0);
      label = items.map(i=>`${i.name} ×${i.qty}`).join(' · ');
      // Deduct stock
      items.forEach(s=>{
        const si=(window.stockItems||[]).find(x=>x.id===s.id);
        if(si){si.qty=Math.max(0,(+si.qty||0)-s.qty);updateStockQty(s.id,si.qty);}
      });
      window.stockCatCarts[cat]=[];
    }
    else if(groupBsel==='Custom Order'){
      const name=document.getElementById('custom-name')?.value.trim();
      const desc=document.getElementById('custom-desc')?.value.trim();
      const qty=+(document.getElementById('custom-qty')?.value)||1;
      const unitPrice=+(document.getElementById('custom-price')?.value)||0;
      if(!name){toast('⚠️ Enter service name','error');return;}
      if(!unitPrice){toast('⚠️ Enter price','error');return;}
      price=qty*unitPrice;
      label=`${name}${desc?' · '+desc:''} · Qty:${qty} × Rs.${unitPrice}`;
    }
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
  // FIX 18: Clear panels FIRST, then update cart panel so FILLING NOW disappears
  document.querySelectorAll('input[name="groupA"],input[name="groupB"]').forEach(e=>e.checked=false);
  groupAsel = []; // FIX 18: reset global so getLiveFillingPreview returns null
  document.getElementById('svc-panel-area').innerHTML='';
  document.getElementById('svc-warn-ab').style.display='none';
  updateCartPanel(); // FIX 18: called AFTER panel clear so live preview is gone
  toast(`✅ ${svcs.join('+')} added to cart`,'success');
};

window.removeFromCart = function(idx) {
  if (!confirm('Remove this item from the cart?')) return;
  window.cart.splice(idx,1);
  renderCart();
  updateCartPanel();
};

window.duplicateCartItem = function(idx) {
  const item = window.cart[idx];
  if (!item) return;
  // Add a copy of the item
  const copy = JSON.parse(JSON.stringify(item));
  window.cart.push(copy);
  renderCart();
  updateCartPanel();
  toast(`📋 ${(item.svcs||[]).join('+')} duplicated — edit cart total if needed`,'info');
};

// ── Cart Panel (right side) ───────────────────────────────────
function updateCartPanel() {
  const itemsEl  = document.getElementById('cart-panel-items');
  const totalsEl = document.getElementById('cart-panel-totals');
  if (!itemsEl) return;

  // Check if something is being filled right now (live preview)
  const livePreview = getLiveFillingPreview();

  if (!window.cart || window.cart.length === 0) {
    if(livePreview) {
      itemsEl.innerHTML = `<div style="padding:8px;margin-bottom:8px;background:#fff3e0;border-radius:8px;border-left:3px solid #e65100;">
        <div style="font-size:11px;font-weight:700;color:#e65100;margin-bottom:4px;">⏳ FILLING NOW...</div>
        ${livePreview}
      </div>`;
    } else {
      itemsEl.innerHTML = '<div style="text-align:center;padding:20px;color:var(--ink3);font-size:13px;">No services added yet</div>';
    }
    totalsEl?.classList.add('hidden');
    return;
  }

  const subtotal = window.cart.reduce((s,i) => s+(+i.price||0), 0);
  const discPct  = +(document.querySelector('input[name="disc"]:checked')?.value||0);
  const discAmt  = Math.round(subtotal * discPct / 100);
  const total    = subtotal - discAmt;

  // Use smart tree structure for cart items
  itemsEl.innerHTML = window.cart.map((item, idx) => {
    const label = item.label || '';
    // Smart split — try · first, then +
    let parts = label.split('·').map(s=>s.trim()).filter(Boolean);
    if(parts.length<=1) parts = label.split(/\s*\+(?=[A-Z🖼📷📐])/).map(s=>s.trim()).filter(Boolean);
    if(!parts.length&&label) parts=[label];
    return `<div style="margin-bottom:8px;">
      <div style="font-size:12px;font-weight:700;color:var(--ink1);margin-bottom:4px;">${(item.svcs||[]).map(s=>(window.SVC_ICONS||{})[s]||'📦').join('')} ${(item.svcs||[]).join('+')}</div>
      ${parts.map((p,i,arr)=>`
        <div style="display:flex;gap:4px;font-size:11px;color:var(--ink3);padding:0 0 0 8px;">
          <span style="color:var(--gold-dk);font-family:monospace;font-size:9px;">${i===arr.length-1?'└':'├'}──</span>
          <span>${p}</span>
        </div>`).join('')}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">
        <span style="font-weight:700;color:var(--gold-dk);font-size:13px;">Rs.${(+item.price||0).toLocaleString('en-IN')}</span>
        <div style="display:flex;gap:4px;">
          <button onclick="duplicateCartItem(${idx})" style="background:none;border:none;color:var(--gold-dk);font-size:11px;cursor:pointer;padding:2px 4px;">📋</button>
          <button onclick="removeFromCart(${idx})" style="background:none;border:none;color:#e53935;font-size:11px;cursor:pointer;padding:2px 4px;">❌</button>
        </div>
      </div>
      <div style="border-bottom:1px solid var(--paper3);margin-top:6px;"></div>
    </div>`;
  }).join('');

  // Show live preview below cart items
  if(livePreview) {
    itemsEl.innerHTML += `<div style="padding:8px;margin-top:8px;background:#fff3e0;border-radius:8px;border-left:3px solid #e65100;">
      <div style="font-size:11px;font-weight:700;color:#e65100;margin-bottom:4px;">⏳ FILLING NOW...</div>
      ${livePreview}
    </div>`;
  }

  totalsEl?.classList.remove('hidden');
  document.getElementById('cp-subtotal').textContent = 'Rs.'+subtotal.toLocaleString('en-IN');
  document.getElementById('cp-total').textContent    = 'Rs.'+total.toLocaleString('en-IN');

  const discRow = document.getElementById('cp-discount-row');
  if (discPct > 0) {
    discRow?.classList.remove('hidden');
    document.getElementById('cp-disc-label').textContent = `Discount ${discPct}%`;
    document.getElementById('cp-discount').textContent   = `-Rs.${discAmt}`;
  } else {
    discRow?.classList.add('hidden');
  }
}

// Get live preview of what's currently being filled
function getLiveFillingPreview() {
  // FIX 18: Return null immediately if no service checkbox is checked
  const hasGroupA = document.querySelector('input[name="groupA"]:checked');
  const hasGroupB = document.querySelector('input[name="groupB"]:checked');
  if(!hasGroupA && !hasGroupB) return null;

  const lines = [];

  // ── Framing panel ────────────────────────────────────────────
  const framingPanel = document.getElementById('panel-framing');
  if(framingPanel && !framingPanel.classList.contains('hidden')) {
    const lb = typeof getFrameLB === 'function' ? getFrameLB() : null;
    const L = document.getElementById('frm-L')?.value || document.getElementById('frm-L-custom')?.value;
    const B = document.getElementById('frm-B')?.value || document.getElementById('frm-B-custom')?.value;
    const msize = document.querySelector('input[name="ms"]:checked')?.value;
    const mouldSel = document.getElementById('frm-mould-select');
    const mouldText = mouldSel?.options[mouldSel?.selectedIndex]?.text;
    const mnt = document.querySelector('input[name="mnt"]:checked')?.value||'No';
    const mountSize = document.querySelector('input[name="mntS"]:checked')?.value;
    const totalTag = document.getElementById('frm-total-tag');
    const framePrice = totalTag?.textContent;
    const accs = [...document.querySelectorAll('input[name="acc"]:checked')].map(c=>c.value);
    const slvChk = document.getElementById('acc-sleeve')?.checked;
    const slvColor = document.querySelector('input[name="slvColor"]:checked')?.value;

    if(L||msize||mouldText) {
      if(L&&B) lines.push(`📐 Frame Size: ${L}×${B}"`);
      if(msize) lines.push(`🖼️ Moulding: ${msize}${mouldText?' · '+mouldText.replace(/\s*\(.*\)/,''):''}`);
      if(mnt==='Yes'&&mountSize) lines.push(`🔲 Mount: ${mountSize}"`);
      if(accs.length) lines.push(`📎 Acc: ${accs.join(', ')}`);
      if(slvChk&&slvColor) lines.push(`✨ Sleeve: ${slvColor}`);
      if(framePrice) lines.push(`💰 ${framePrice}`);
    }
  }

  // ── Printing panel ── FIX 2: use correct IDs ───────────────
  const printingPanel = document.getElementById('panel-printing');
  if(printingPanel) {
    const size = document.getElementById('pr-size')?.value;
    const qual = document.querySelector('input[name="pq"]:checked')?.value;
    const qty = qual === 'NP'
      ? document.getElementById('pr-qty-np')?.value
      : document.getElementById('pr-qty')?.value;
    const totalTag = document.getElementById('print-total-tag');
    const printPrice = totalTag && !totalTag.classList.contains('hidden') ? totalTag.textContent : null;
    if(size || qual) {
      if(qual) lines.push(`✨ Quality: ${qual}`);
      if(size) lines.push(`📏 Size: ${size.replace('x','×')}`);
      if(qty && +qty > 0) lines.push(`🔢 Qty: ${qty} print${+qty!==1?'s':''}`);
      if(printPrice) lines.push(`💰 ${printPrice}`);
    }
  }

  // ── Photo Editing panel ── FIX 2: correct IDs ───────────────
  const editingPanel = document.getElementById('panel-editing');
  if(editingPanel) {
    const ep = document.querySelector('input[name="ep"]:checked')?.value;
    const epv = ep === 'custom' ? document.getElementById('ep-val')?.value : ep;
    if(epv && +epv > 0) lines.push(`🎨 Photo Editing: Rs.${epv}`);
  }

  // ── Passport panel ── FIX 2: correct IDs ────────────────────
  const panelB = document.getElementById('panel-b');
  const groupBSel = document.querySelector('input[name="groupB"]:checked')?.value;
  if(panelB && groupBSel === 'Passport Photos') {
    const copies = document.getElementById('pp-copies')?.value;
    const totalTag = document.getElementById('pp-total-tag');
    if(copies) lines.push(`📷 Passport: ${copies} copies`);
    if(totalTag && !totalTag.classList.contains('hidden')) lines.push(`💰 ${totalTag.textContent}`);
  }

  // ── Visa panel ── FIX 2: correct IDs ────────────────────────
  if(panelB && groupBSel === 'Visa Photos') {
    const vtVal = document.getElementById('visa-type')?.value || '';
    const country = vtVal ? vtVal.split('|')[0] : '';
    const copies = document.getElementById('vp-copies')?.value;
    const ct = document.getElementById('vp-cost-tag');
    if(country) lines.push(`🛂 Visa: ${country}`);
    if(copies) lines.push(`📷 Copies: ${copies}`);
    if(ct?.textContent) lines.push(`💰 ${ct.textContent}`);
  }

  // ── Scanning panel ───────────────────────────────────────────
  if(panelB && groupBSel === 'Scanning') {
    const qty = document.getElementById('scan-qty')?.value;
    if(qty && +qty > 0) lines.push(`🔍 Scanning: ${qty} pics · Rs.${+qty*50}`);
  }

  // ── Custom Order panel ───────────────────────────────────────
  if(panelB && groupBSel === 'Custom Order') {
    const name = document.getElementById('custom-name')?.value;
    const totalTag = document.getElementById('custom-total-tag');
    if(name) lines.push(`✏️ ${name}`);
    if(totalTag && !totalTag.classList.contains('hidden')) lines.push(`💰 ${totalTag.textContent}`);
  }

  if(!lines.length) return null;
  return lines.map((l,i)=>`<div style="font-size:11px;color:#e65100;padding-left:8px;">${i===lines.length-1?'└':'├'}── ${l}</div>`).join('');
}

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
  if(pct > 0) {
    // Send WhatsApp approval request to owner
    if (typeof window.waApprovalRequest === 'function') {
      const cname = document.getElementById('f-name')?.value||'Customer';
      const total = window.cart?.reduce((s,i)=>s+(+i.price||0),0)||0;
      const discAmt = Math.round(total*pct/100);
      window.waApprovalRequest('discount', [
        cname,
        String(pct) + '%',
        String(discAmt),
        String(total),
        document.getElementById('f-staff')?.value||'Staff',
      ]).catch(()=>{});
    }
    // Require owner password for discount
    showOwnerPasswordModal(
      `Apply ${pct}% discount?`,
      () => applyDiscount(pct),
      () => { const nd=document.querySelector('input[name="disc"][value="0"]');if(nd)nd.checked=true; applyDiscount(0); }
    );
  } else {
    applyDiscount(0);
  }
};

// ── Custom Delivery Date Picker ───────────────────────────────
window._selectedDeliveryDate = null;

window.initDeliveryPicker = function() {
  const scroller = document.getElementById('delivery-date-scroller');
  if(!scroller) return;
  const today = new Date();
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  scroller.innerHTML = '';
  for(let i=0; i<14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate()+i);
    const isToday = i===0;
    const btn = document.createElement('button');
    btn.type='button';
    btn.style.cssText='flex-shrink:0;padding:8px 12px;border-radius:10px;border:2px solid var(--paper3);background:#fff;cursor:pointer;text-align:center;min-width:52px;';
    btn.innerHTML=`<div style="font-size:10px;font-weight:700;color:var(--ink3);">${days[d.getDay()]}</div><div style="font-size:16px;font-weight:900;color:var(--gold-dk);">${d.getDate()}</div><div style="font-size:10px;color:var(--ink3);">${months[d.getMonth()]}</div>${isToday?'<div style="font-size:9px;background:var(--gold-dk);color:#fff;border-radius:4px;padding:1px 4px;margin-top:2px;">TODAY</div>':''}`;
    btn.dataset.date = d.toISOString().slice(0,10);
    btn.onclick=()=>selectDeliveryDate(btn, d);
    if(isToday) { selectDeliveryDate(btn, d); }
    scroller.appendChild(btn);
  }
  updateDeliveryDisplay();
};

window.selectDeliveryDate = function(btn, d) {
  // Reset ALL buttons and their inner divs to original colors
  document.querySelectorAll('#delivery-date-scroller button').forEach(b=>{
    b.style.background='#fff';
    b.style.borderColor='var(--paper3)';
    b.style.color='var(--ink2)';
    // Restore inner div colors to their original state
    const divs = b.querySelectorAll('div');
    if(divs[0]) divs[0].style.color='var(--ink3)';   // day name
    if(divs[1]) divs[1].style.color='var(--gold-dk)'; // date number
    if(divs[2]) divs[2].style.color='var(--ink3)';    // month
    if(divs[3]) divs[3].style.color='#fff';           // TODAY badge (keeps white on gold bg)
  });
  // Highlight selected button - turn everything white
  btn.style.background='var(--gold-dk)';
  btn.style.borderColor='var(--gold-dk)';
  btn.style.color='#fff';
  btn.querySelectorAll('div').forEach(el=>{ el.style.color='#fff'; });
  window._selectedDeliveryDate = d;
  updateDeliveryDisplay();
};

window.updateDeliveryDisplay = function() {
  const d = window._selectedDeliveryDate || new Date();
  const hour = +document.getElementById('f-del-hour')?.value||10;
  const min = document.getElementById('f-del-min')?.value||'00';
  const ampm = document.getElementById('f-del-ampm')?.value||'PM';
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const display=document.getElementById('delivery-display');
  const hidden=document.getElementById('f-delivery');
  if(display) display.textContent=`${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${hour}:${min} ${ampm}`;
  if(hidden) {
    let h24=hour; if(ampm==='PM'&&hour!==12)h24=hour+12; if(ampm==='AM'&&hour===12)h24=0;
    hidden.value=`${d.toISOString().slice(0,10)}T${String(h24).padStart(2,'0')}:${min}:00`;
  }
};

// ── Table Stand visibility ────────────────────────────────────
window.checkTableStandVisibility = function() {
  const fw = +document.getElementById('f-fw')?.value||0;
  const fh = +document.getElementById('f-fh')?.value||0;
  const tsRow = document.getElementById('table-stand-row');
  if(!tsRow) return;
  const hide = fw>10 || fh>12;
  tsRow.style.display = hide ? 'none' : '';
  if(hide) {
    const tsCb = document.getElementById('acc-tablestand');
    if(tsCb) tsCb.checked=false;
  }
};
window.showOwnerPasswordModal = function(message, onApprove, onCancel) {
  const existing = document.getElementById('owner-pwd-modal');
  if(existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'owner-pwd-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:24px;max-width:320px;width:100%;">
      <div style="font-size:18px;font-weight:700;margin-bottom:8px;">🔐 Owner Approval</div>
      <div style="font-size:13px;color:var(--ink3);margin-bottom:16px;">${message}</div>
      <input type="password" id="owner-pwd-input" class="form-input" placeholder="Enter owner password" style="margin-bottom:8px;" onkeydown="if(event.key==='Enter')checkOwnerPassword()">
      <div id="owner-pwd-error" style="color:#e53935;font-size:12px;margin-bottom:10px;display:none;">⚠️ Incorrect password. Try again.</div>
      <div style="display:flex;gap:8px;">
        <button onclick="checkOwnerPassword()" style="flex:1;background:#388e3c;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;">✅ Approve</button>
        <button onclick="cancelOwnerPassword()" style="flex:1;background:#e53935;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;">❌ Cancel</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  window._ownerPwdApprove = onApprove;
  window._ownerPwdCancel = onCancel;
  setTimeout(()=>document.getElementById('owner-pwd-input')?.focus(),100);
};

window.checkOwnerPassword = function() {
  const pwd = document.getElementById('owner-pwd-input')?.value;
  const stored = localStorage.getItem('fv_owner_password') || 'owner123';
  if(pwd === stored) {
    document.getElementById('owner-pwd-modal')?.remove();
    if(window._ownerPwdApprove) window._ownerPwdApprove();
  } else {
    const err = document.getElementById('owner-pwd-error');
    if(err) err.style.display='block';
    document.getElementById('owner-pwd-input').value='';
    document.getElementById('owner-pwd-input').focus();
  }
};

window.cancelOwnerPassword = function() {
  document.getElementById('owner-pwd-modal')?.remove();
  if(window._ownerPwdCancel) window._ownerPwdCancel();
};

// ── Photo Upload ──────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
// FIREBASE STORAGE PHOTO SYSTEM
// Photos upload to Firebase Storage — accessible on ALL devices
// ══════════════════════════════════════════════════════════════

window._orderPhotos = [];      // base64 previews for display
window._orderPhotoFiles = [];  // original File objects for upload
window._orderPhotoURLs = [];   // Firebase Storage download URLs (set after upload)

window.onPhotosSelected = function(inputEl) {
  const input = inputEl || document.getElementById('f-photos-cam') || document.getElementById('f-photos-gal');
  if(!input?.files?.length) return;

  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        // Preview: max 800px, 70% quality for good display quality
        const MAX = 800;
        let w = img.width, h = img.height;
        if(w>MAX||h>MAX) { if(w>h){h=Math.round(h*MAX/w);w=MAX;}else{w=Math.round(w*MAX/h);h=MAX;} }
        canvas.width=w; canvas.height=h;
        canvas.getContext('2d').drawImage(img,0,0,w,h);
        const preview = canvas.toDataURL('image/jpeg', 0.7);
        window._orderPhotos.push(preview);
        window._orderPhotoFiles.push(file);
        window._orderPhotoURLs.push(null); // will be filled after upload
        renderPhotoPreview();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
  if(input) input.value='';
};

function renderPhotoPreview() {
  const el = document.getElementById('photo-preview');
  if(!el) return;
  el.innerHTML = window._orderPhotos.map((src,i)=>`
    <div style="position:relative;width:80px;height:80px;">
      <img src="${src}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid var(--paper3);">
      <button onclick="removePhoto(${i})" style="position:absolute;top:-6px;right:-6px;background:#e53935;color:#fff;border:none;border-radius:100%;width:20px;height:20px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
    </div>`).join('');
}

window.removePhoto = function(idx) {
  window._orderPhotos.splice(idx,1);
  window._orderPhotoFiles.splice(idx,1);
  window._orderPhotoURLs.splice(idx,1);
  renderPhotoPreview();
};

// Upload photos to Firebase Storage and return download URLs
window.uploadPhotosToStorage = async function(orderId) {
  if(!window._orderPhotoFiles?.length) return [];
  
  // Check if Firebase Storage is available
  try {
    if(!window.firebase?.storage) {
      console.warn('Firebase Storage SDK not loaded');
      return window._orderPhotos;
    }
    // Try initializing storage — works with compat SDK
  } catch(e) {
    console.warn('Firebase Storage not available:', e);
    return window._orderPhotos;
  }

  // Use pre-initialized storage if available, otherwise init fresh
  const storage = window._storage || firebase.storage();
  const urls = [];

  for(let i = 0; i < window._orderPhotoFiles.length; i++) {
    const file = window._orderPhotoFiles[i];
    const preview = window._orderPhotos[i];
    
    // If file is null (already uploaded or removed), skip
    if(!file) { urls.push(preview); continue; }

    try {
      // Convert preview canvas data to blob for upload
      const blob = await new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Upload: max 1200px, 80% quality for good resolution
          const MAX = 1200;
          let w = img.width, h = img.height;
          if(w>MAX||h>MAX) { if(w>h){h=Math.round(h*MAX/w);w=MAX;}else{w=Math.round(w*MAX/h);h=MAX;} }
          canvas.width=w; canvas.height=h;
          canvas.getContext('2d').drawImage(img,0,0,w,h);
          canvas.toBlob(resolve, 'image/jpeg', 0.8);
        };
        img.src = preview;
      });

      const filename = `orders/${orderId}/photo_${i}_${Date.now()}.jpg`;
      const storageRef = storage.ref(filename);
      console.log(`📤 Uploading photo ${i+1} to:`, filename);
      const snapshot = await storageRef.put(blob, {contentType: 'image/jpeg'});
      const downloadURL = await snapshot.ref.getDownloadURL();
      urls.push(downloadURL);
      console.log(`✅ Photo ${i+1} uploaded successfully:`, downloadURL);
    } catch(err) {
      console.error(`❌ Photo ${i+1} upload failed:`, err);
      urls.push(preview); // fallback to base64 if upload fails
    }
  }

  return urls;
};

// ── Save Estimate ─────────────────────────────────────────────
window.saveEstimate = async function() {
  if(!window.cart?.length){toast('⚠️ Add at least one service','error');return;}
  const name = document.getElementById('f-name')?.value.trim();
  if(!name){toast('⚠️ Enter customer name','error');return;}
  const total = window.cart.reduce((s,i)=>s+(+i.price||0),0);
  const estNo = await getNextEstimateNumber();
  const estimate = {
    estNo, name,
    phone: document.getElementById('f-phone')?.value||'',
    staff: document.getElementById('f-staff')?.value||'',
    notes: document.getElementById('f-notes')?.value||'',
    cartItems: window.cart,
    total, photos: window._orderPhotos||[],
    date: todayStr(), created: Date.now(),
    expires: new Date(Date.now()+30*24*60*60*1000).toISOString().slice(0,10),
    status: 'Active'
  };
  // Save to localStorage
  const estimates = JSON.parse(localStorage.getItem('fv_estimates')||'[]');
  estimate.id = 'EST-'+Date.now();
  estimates.unshift(estimate);
  localStorage.setItem('fv_estimates', JSON.stringify(estimates));
  // Try Firebase
  try { if(window.db) await window.db.collection('estimates').add(estimate); } catch(e){}

  toast('✅ Estimate saved!','success');
  // Show print option
  showEstimateSavedModal(estimate);
};

async function getNextEstimateNumber() {
  const today = todayStr().split('-').reverse().join('').slice(0,6);
  const estimates = JSON.parse(localStorage.getItem('fv_estimates')||'[]');
  const todayEsts = estimates.filter(e=>e.date===todayStr()).length;
  return `FV-EST-${today}-${String(todayEsts+1).padStart(3,'0')}`;
}

function showEstimateSavedModal(est) {
  const modal = document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML=`
    <div style="background:#fff;border-radius:16px;padding:24px;max-width:320px;width:100%;text-align:center;">
      <div style="font-size:40px;margin-bottom:8px;">✅</div>
      <div style="font-size:18px;font-weight:700;margin-bottom:4px;">Estimate Saved!</div>
      <div style="font-size:13px;color:var(--ink3);margin-bottom:20px;">${est.estNo}</div>
      <div style="display:flex;gap:8px;">
        <button onclick="printEstimate(${JSON.stringify(est).replace(/"/g,'&quot;')})" style="flex:1;background:var(--gold-dk);color:#fff;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;">🖨️ Print</button>
        <button onclick="this.closest('[style*=fixed]').remove();resetForm();" style="flex:1;background:#f0ede6;color:#333;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;">✅ OK</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

window.printEstimate = function(est) {
  if(typeof est === 'string') est = JSON.parse(est);
  const w = window.open('','_blank','width=400,height=600');
  const rows = (est.cartItems||[]).map(item=>
    `<tr><td>${(item.svcs||[item.svc]).join('+')}</td><td style="text-align:right;font-weight:700;">Rs.${item.price||0}</td></tr>`
  ).join('');
  w.document.write(`<!DOCTYPE html><html><head><title>Estimate</title>
  <style>body{font-family:Arial,sans-serif;padding:20px;max-width:320px;margin:0 auto;}
  h1{font-size:16px;text-align:center;} .center{text-align:center;}
  hr{border:none;border-top:1px dashed #ccc;margin:12px 0;}
  table{width:100%;font-size:13px;} td{padding:4px 0;}
  .total{font-size:16px;font-weight:900;} @media print{@page{margin:5mm;}}
  </style></head><body>
  <div class="center"><h1>FOTOVISION STUDIO PRO</h1></div>
  <hr>
  <div class="center" style="font-size:18px;font-weight:700;margin-bottom:4px;">💰 ESTIMATE</div>
  <div class="center" style="font-size:12px;color:#666;">${est.estNo} · ${formatDate(est.date)}</div>
  <hr>
  <div style="font-size:13px;"><b>Customer:</b> ${est.name}</div>
  <div style="font-size:13px;"><b>Phone:</b> ${est.phone||'—'}</div>
  <hr>
  <table>${rows}</table>
  <hr>
  <div style="display:flex;justify-content:space-between;" class="total">
    <span>TOTAL</span><span>Rs.${est.total||0}</span>
  </div>
  <hr>
  <div class="center" style="font-size:11px;color:#888;margin-top:8px;">This is an estimate only.<br>Not a tax invoice.</div>
  <script>window.onload=()=>{window.print();setTimeout(()=>window.close(),1500);}<\/script>
  </body></html>`);
  w.document.close();
};

// ── Complimentary Order ───────────────────────────────────────
window.saveComplimentary = function() {
  if(!window.cart?.length){toast('⚠️ Add at least one service','error');return;}
  const name=document.getElementById('f-name')?.value.trim();
  if(!name){toast('⚠️ Enter customer name','error');return;}
  const originalTotal=window.cart.reduce((s,i)=>s+(+i.price||0),0);
  // Send WhatsApp approval request
  if (typeof window.waApprovalRequest === 'function') {
    window.waApprovalRequest('complimentary', [
      name, String(originalTotal),
      document.getElementById('f-staff')?.value||'Staff',
    ]).catch(()=>{});
  }
  showOwnerPasswordModal(
    `Mark this order as Complimentary?\nOriginal value: Rs.${originalTotal}`,
    async()=>{
      window._isComplimentary=true;
      window._originalTotal=originalTotal;
      document.getElementById('f-charge').value='0';
      await saveOrder();
      window._isComplimentary=false;
    },
    ()=>{}
  );
};

function applyDiscount(pct) {
  const cartTotal = window.cart.reduce((s,i)=>s+(+i.price||0),0);
  const discAmt   = Math.round(cartTotal*pct/100);
  const final     = cartTotal-discAmt;
  document.getElementById('f-charge').value = final;
  updateCartPanel();
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
