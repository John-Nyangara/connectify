# -*- coding: utf-8 -*-
with open('js/admin.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Guard in showQuickPriceEditModal
old_guard = '''function showQuickPriceEditModal(productId, currentData) {
  const product = store.getProduct(productId);
  if (!product) return;'''

new_guard = '''function showQuickPriceEditModal(productId, currentData) {
  const product = store.getProduct(productId);
  if (!product) return;

  if (product.type === 'service') {
    window.showToast('Commercial services have variable pricing based on scope & materials. Inquiries route via WhatsApp (+254 700 000 000).', 'info');
    return;
  }'''

if old_guard in content:
    content = content.replace(old_guard, new_guard, 1)
    print('Guard added to showQuickPriceEditModal')
else:
    print('Failed to find showQuickPriceEditModal guard location')

# 2. Update renderSimplePostTab pricing section
old_post_form_pricing = '''        <div class="form-grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div class="form-group">
            <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Supplier Wholesale Price (KSh) *</label>
            <input type="number" id="spSupplierCost" class="form-input" required value="75000" min="0" step="100" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-weight: 700;" />
            <small class="form-hint" style="color: #64748b; font-size: 0.75rem;">Wholesale cost paid to merchant</small>
          </div>
          <div class="form-group">
            <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Transport Allowance (KSh)</label>
            <input type="number" id="spTransport" class="form-input" value="500" min="0" step="50" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" />
            <small class="form-hint" style="color: #64748b; font-size: 0.75rem;">Freight to customer doorstep</small>
          </div>
        </div>

        <!-- Live Simple Profit Calculation Box -->
        <div class="simple-calc-preview" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; text-align: center;">
          <div>
            <div class="simple-calc-label" style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Total Landed Cost</div>
            <div class="simple-calc-val" id="spLandedDisplay" style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">KSh 75,500</div>
          </div>
          <div>
            <div class="simple-calc-label" style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Public Selling Price</div>
            <div class="simple-calc-val" style="color: var(--jiji-green); font-size: 1.25rem; font-weight: 800;" id="spSellingDisplay">KSh 89,090</div>
          </div>
          <div>
            <div class="simple-calc-label" style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Net Platform Margin</div>
            <div class="simple-calc-val profit" id="spProfitDisplay" style="color: #059669; font-size: 1.25rem; font-weight: 800;">+KSh 13,590</div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 16px;">
          <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Platform Markup (%): <strong id="spMarkupLabel" style="color: var(--jiji-green);">18%</strong></label>
          <input type="range" id="spMarkupRange" min="5" max="50" step="1" value="18" class="form-range" style="width: 100%; margin-top: 6px;" />
        </div>'''

new_post_form_pricing = '''        <div id="spPricingSection">
          <div class="form-grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div class="form-group">
              <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Supplier Wholesale Price (KSh) *</label>
              <input type="number" id="spSupplierCost" class="form-input" required value="75000" min="0" step="100" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-weight: 700;" />
              <small class="form-hint" style="color: #64748b; font-size: 0.75rem;">Wholesale cost paid to merchant</small>
            </div>
            <div class="form-group">
              <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Transport Allowance (KSh)</label>
              <input type="number" id="spTransport" class="form-input" value="500" min="0" step="50" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" />
              <small class="form-hint" style="color: #64748b; font-size: 0.75rem;">Freight to customer doorstep</small>
            </div>
          </div>

          <!-- Live Simple Profit Calculation Box -->
          <div class="simple-calc-preview" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; text-align: center;">
            <div>
              <div class="simple-calc-label" style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Total Landed Cost</div>
              <div class="simple-calc-val" id="spLandedDisplay" style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">KSh 75,500</div>
            </div>
            <div>
              <div class="simple-calc-label" style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Public Selling Price</div>
              <div class="simple-calc-val" style="color: var(--jiji-green); font-size: 1.25rem; font-weight: 800;" id="spSellingDisplay">KSh 89,090</div>
            </div>
            <div>
              <div class="simple-calc-label" style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Net Platform Margin</div>
              <div class="simple-calc-val profit" id="spProfitDisplay" style="color: #059669; font-size: 1.25rem; font-weight: 800;">+KSh 13,590</div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Platform Markup (%): <strong id="spMarkupLabel" style="color: var(--jiji-green);">18%</strong></label>
            <input type="range" id="spMarkupRange" min="5" max="50" step="1" value="18" class="form-range" style="width: 100%; margin-top: 6px;" />
          </div>
        </div>

        <div id="spServiceNoticeBlock" style="display: none; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 16px; margin-bottom: 16px; color: #065f46;">
          <strong style="display: block; font-size: 0.95rem; margin-bottom: 4px;">🛠️ Commercial Service Direct Flow</strong>
          <span style="font-size: 0.85rem; line-height: 1.4;">
            Commercial services do not require a fixed retail price because costs vary by project scope and materials. The customer storefront will display <strong>"Verified Commercial Service"</strong> with a direct <strong>"WhatsApp (+254 700 000 000)"</strong> consultation button.
          </span>
        </div>'''

if old_post_form_pricing in content:
    content = content.replace(old_post_form_pricing, new_post_form_pricing, 1)
    print('Updated pricing section in renderSimplePostTab')
else:
    print('Failed to find pricing section in renderSimplePostTab')

# 3. Add type change listener and handle sellingPrice for service on submit
old_submit_block = '''    const landed = cost + trans;
    const profit = Math.round(landed * (markup / 100));
    const selling = landed + profit;

    const newProd = store.saveProduct({'''

new_submit_block = '''    const isService = type === 'service';
    const landed = cost + trans;
    const profit = isService ? 0 : Math.round(landed * (markup / 100));
    const selling = isService ? 0 : (landed + profit);

    const newProd = store.saveProduct({'''

if old_submit_block in content:
    content = content.replace(old_submit_block, new_submit_block, 1)
    print('Updated submit logic for services')
else:
    print('Failed to find submit block')

# 4. Bind spType change
old_type_binding_target = '''  costInput?.addEventListener('input', updateSim);
  transInput?.addEventListener('input', updateSim);
  markupRange?.addEventListener('input', updateSim);'''

new_type_binding = '''  costInput?.addEventListener('input', updateSim);
  transInput?.addEventListener('input', updateSim);
  markupRange?.addEventListener('input', updateSim);

  const spTypeSelect = container.querySelector('#spType');
  const spPricingSection = container.querySelector('#spPricingSection');
  const spServiceNoticeBlock = container.querySelector('#spServiceNoticeBlock');

  spTypeSelect?.addEventListener('change', (e) => {
    if (e.target.value === 'service') {
      if (spPricingSection) spPricingSection.style.display = 'none';
      if (spServiceNoticeBlock) spServiceNoticeBlock.style.display = 'block';
      if (costInput) costInput.removeAttribute('required');
    } else {
      if (spPricingSection) spPricingSection.style.display = 'block';
      if (spServiceNoticeBlock) spServiceNoticeBlock.style.display = 'none';
      if (costInput) costInput.setAttribute('required', 'required');
    }
  });'''

if old_type_binding_target in content:
    content = content.replace(old_type_binding_target, new_type_binding, 1)
    print('Added spType change handler')
else:
    print('Failed to find type binding target')

with open('js/admin.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('SUCCESS')
