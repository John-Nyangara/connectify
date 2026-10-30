# -*- coding: utf-8 -*-
import sys

matrix_code = '''function renderMasterMatrixTab(container, state) {
  let filtered = [...state.products];
  const searchFilter = state.matrixSearch || '';
  const supplierFilter = state.matrixSupplierFilter || 'all';
  const categoryFilter = state.matrixCategoryFilter || 'all';
  const typeFilter = state.matrixTypeFilter || 'all'; // 'all' | 'goods' | 'services'

  const goodsList = state.products.filter(p => p.type !== 'service');
  const servicesList = state.products.filter(p => p.type === 'service');

  if (searchFilter) {
    const q = searchFilter.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
  }

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(p => p.categoryId === categoryFilter);
  }

  if (supplierFilter !== 'all') {
    filtered = filtered.filter(p => {
      const off = store.getActiveOffer(p);
      return off && off.supplierId === supplierFilter;
    });
  }

  if (typeFilter === 'goods') {
    filtered = filtered.filter(p => p.type !== 'service');
  } else if (typeFilter === 'services') {
    filtered = filtered.filter(p => p.type === 'service');
  }

  // Metrics summary - Only calculated on physical goods (services have variable scope pricing)
  let totalWholesaleValuation = 0;
  let totalRetailValuation = 0;
  let totalMarginAmount = 0;

  goodsList.forEach(p => {
    const off = store.getActiveOffer(p);
    const bp = off ? off.supplierCost : Math.round(p.sellingPrice * 0.82);
    const sp = p.sellingPrice;
    const stock = off?.stockAvailable || 15;

    totalWholesaleValuation += bp * stock;
    totalRetailValuation += sp * stock;
    totalMarginAmount += (sp - bp) * stock;
  });

  const avgMargin = totalRetailValuation > 0 ? ((totalMarginAmount / totalRetailValuation) * 100).toFixed(1) : 0;

  container.innerHTML = `
    <div class="operations-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <!-- Header -->
      <div class="card-header-flex" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
            ${icons.grid}
            <span>Master Inventory & Pricing Matrix</span>
          </h2>
          <p class="card-subtitle" style="color: #64748b; font-size: 0.92rem; margin-top: 4px;">
            Unified catalogue of physical equipment and commercial services. Physical goods display buying and selling prices; services link directly to WhatsApp consultation.
          </p>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" id="btnMatrixBatchAdd" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
            ${icons.layers}
            <span>Batch Add Products (+3+)</span>
          </button>
          <button class="btn btn-primary btn-sm" id="btnMatrixAddNew" style="background: var(--jiji-green); color: white; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
            ${icons.plus}
            <span>Add Single Product</span>
          </button>
        </div>
      </div>

      <!-- Quick Metrics Strip -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
        <div style="background: #f8fafc; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Active Listings</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-top: 4px;">${state.products.length} Items</div>
          <small style="color: #64748b;">${goodsList.length} Goods · ${servicesList.length} Services</small>
        </div>

        <div style="background: #f8fafc; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Wholesale Valuation (Goods BP)</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #334155; margin-top: 4px;">KSh ${totalWholesaleValuation.toLocaleString()}</div>
          <small style="color: #64748b;">Direct merchant payables</small>
        </div>

        <div style="background: #f0fdf4; padding: 16px; border-radius: 10px; border: 1px solid #bbf7d0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #166534; text-transform: uppercase;">Retail Valuation (Goods SP)</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #15803d; margin-top: 4px;">KSh ${totalRetailValuation.toLocaleString()}</div>
          <small style="color: #166534;">Avg margin: ${avgMargin}% (+KSh ${totalMarginAmount.toLocaleString()})</small>
        </div>

        <div style="background: #ecfdf5; padding: 16px; border-radius: 10px; border: 1px solid #a7f3d0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #065f46; text-transform: uppercase;">Commercial Services</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #047857; margin-top: 4px;">${servicesList.length} Active Services</div>
          <small style="color: #047857;">Variable scope · WhatsApp direct</small>
        </div>
      </div>

      <!-- Type Filter Pills -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
        <button class="btn btn-sm btn-matrix-type ${typeFilter === 'all' ? 'btn-primary' : 'btn-outline'}" data-type="all" style="border-radius: 20px; font-weight: 700; padding: 6px 14px; font-size: 0.85rem; ${typeFilter === 'all' ? 'background: #0f172a; border-color: #0f172a; color: white;' : ''}">
          All Listings (${state.products.length})
        </button>
        <button class="btn btn-sm btn-matrix-type ${typeFilter === 'goods' ? 'btn-primary' : 'btn-outline'}" data-type="goods" style="border-radius: 20px; font-weight: 700; padding: 6px 14px; font-size: 0.85rem; ${typeFilter === 'goods' ? 'background: #0284c7; border-color: #0284c7; color: white;' : ''}">
          📦 Physical Goods (${goodsList.length})
        </button>
        <button class="btn btn-sm btn-matrix-type ${typeFilter === 'services' ? 'btn-primary' : 'btn-outline'}" data-type="services" style="border-radius: 20px; font-weight: 700; padding: 6px 14px; font-size: 0.85rem; ${typeFilter === 'services' ? 'background: #059669; border-color: #059669; color: white;' : ''}">
          🛠️ Commercial Services (${servicesList.length})
        </button>
      </div>

      <!-- Filter Controls Bar -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; align-items: center; flex-wrap: wrap; background: #f8fafc; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
        <div style="flex: 1; min-width: 220px; position: relative;">
          <input type="text" id="matrixSearchInput" class="form-input" placeholder="Search by product name or specification..." value="${escapeHtml(searchFilter)}" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem;" />
        </div>

        <div style="min-width: 180px;">
          <select id="matrixSupplierSelect" class="form-select" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem;">
            <option value="all">All Sourcing Suppliers</option>
            ${state.suppliers.map(s => `<option value="${s.id}" ${supplierFilter === s.id ? 'selected' : ''}>${escapeHtml(s.name)}</option>`).join('')}
          </select>
        </div>

        <div style="min-width: 180px;">
          <select id="matrixCategorySelect" class="form-select" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem;">
            <option value="all">All Categories</option>
            ${state.categories.map(c => `<option value="${c.id}" ${categoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        </div>

        ${searchFilter || supplierFilter !== 'all' || categoryFilter !== 'all' || typeFilter !== 'all' ? `
          <button class="btn btn-outline btn-sm" id="btnMatrixClearFilters" style="padding: 8px 12px;">Reset</button>
        ` : ''}
      </div>

      <!-- Master Matrix Table -->
      <div class="dash-table-wrapper" style="overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <table class="admin-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead style="background: #f1f5f9; text-align: left; border-bottom: 2px solid #cbd5e1;">
            <tr>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Supplier / Merchant</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Listing & Type</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Buying Price (BP)</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Selling Price (SP)</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Gross Margin</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Stock / Availability</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700; text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="7" style="padding: 30px; text-align: center; color: #64748b;">
                  No products or services found matching the selected filters.
                </td>
              </tr>
            ` : filtered.map(p => {
    const isService = p.type === 'service';
    const activeOffer = store.getActiveOffer(p);
    const supplier = activeOffer ? store.getSupplier(activeOffer.supplierId) : null;
    const bp = activeOffer ? activeOffer.supplierCost : Math.round(p.sellingPrice * 0.82);
    const sp = p.sellingPrice;
    const marginKsh = sp - bp;
    const marginPct = sp > 0 ? ((marginKsh / sp) * 100).toFixed(1) : 0;
    const stock = activeOffer?.stockAvailable || 15;
    const category = state.categories.find(c => c.id === p.categoryId);

    return `
                <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                  <!-- Supplier Column -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    <div style="font-weight: 700; color: #0f172a; font-size: 0.92rem;">
                      ${supplier ? escapeHtml(supplier.name) : '<span style="color:#94a3b8;">Unassigned Partner</span>'}
                    </div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">
                      ${supplier ? escapeHtml(supplier.location.split(',')[0]) : 'Connectify Hub'}
                    </div>
                  </td>

                  <!-- Product / Service & Category Column -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${p.images[0] || 'assets/images/laptop.jpg'}" alt="${escapeHtml(p.name)}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover; border: 1px solid #e2e8f0; flex-shrink: 0;" />
                      <div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <strong style="color: #0f172a; font-size: 0.92rem;">${escapeHtml(p.name)}</strong>
                          ${isService ? `
                            <span class="badge" style="background: #dcfce7; color: #166534; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">SERVICE</span>
                          ` : `
                            <span class="badge" style="background: #eff6ff; color: #1d4ed8; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">GOODS</span>
                          `}
                        </div>
                        <span class="badge" style="background: #e2e8f0; color: #334155; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600; margin-top: 3px; display: inline-block;">
                          ${category ? category.name : 'Catalogue'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <!-- Buying Price (BP) Column -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    ${isService ? `
                      <div style="font-weight: 700; color: #64748b; font-size: 0.88rem;">
                        Labor & Materials
                      </div>
                      <small style="color: #94a3b8; font-size: 0.72rem;">Scope based</small>
                    ` : `
                      <div style="font-weight: 800; color: #1e293b; font-size: 1rem;">
                        KSh ${bp.toLocaleString()}
                      </div>
                      <small style="color: #64748b; font-size: 0.72rem;">Wholesale Cost</small>
                    `}
                  </td>

                  <!-- Selling Price (SP) Column -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    ${isService ? `
                      <div style="display: inline-flex; align-items: center; gap: 4px; font-weight: 700; color: #166534; background: #f0fdf4; padding: 4px 10px; border-radius: 6px; border: 1px solid #bbf7d0; font-size: 0.85rem;">
                        ${icons.messageCircle} WhatsApp Direct
                      </div>
                      <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 2px;">No fixed price</small>
                    ` : `
                      <div style="font-weight: 800; color: var(--jiji-green-dark); font-size: 1.05rem;">
                        KSh ${sp.toLocaleString()}
                      </div>
                      <small style="color: #64748b; font-size: 0.72rem;">Retail Storefront</small>
                    `}
                  </td>

                  <!-- Gross Margin Column -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    ${isService ? `
                      <span style="display: inline-block; background: #f8fafc; color: #475569; font-weight: 700; padding: 4px 8px; border-radius: 6px; font-size: 0.82rem; border: 1px solid #e2e8f0;">
                        Custom Agreement
                      </span>
                    ` : `
                      <span style="display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 4px 8px; border-radius: 6px; font-size: 0.85rem;">
                        +KSh ${marginKsh.toLocaleString()} (${marginPct}%)
                      </span>
                    `}
                  </td>

                  <!-- Stock Column -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    ${isService ? `
                      <span class="badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700; font-size: 0.8rem; padding: 4px 8px; border-radius: 6px;">
                        Available
                      </span>
                    ` : `
                      <span class="badge ${stock < 5 ? 'badge-warning' : 'badge-light'}" style="font-weight: 700; font-size: 0.8rem; padding: 4px 8px; border-radius: 6px;">
                        ${stock} in stock
                      </span>
                    `}
                  </td>

                  <!-- Actions Column -->
                  <td style="padding: 12px 14px; vertical-align: middle; text-align: center;">
                    <div style="display: inline-flex; align-items: center; gap: 6px;">
                      ${isService ? `
                        <a href="https://wa.me/254700000000?text=${encodeURIComponent('Hello Connectify Central Desk, I am inquiring regarding the commercial service: ' + p.name)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background: #25d366; color: white; padding: 6px 10px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; text-decoration: none;">
                          ${icons.messageCircle}
                          <span>WhatsApp</span>
                        </a>
                      ` : `
                        <button class="btn btn-sm btn-outline btn-matrix-quick-edit" data-pid="${p.id}" data-bp="${bp}" data-sp="${sp}" data-sid="${supplier ? supplier.id : ''}" data-stock="${stock}" title="Edit BP & SP" style="padding: 6px 10px; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                          ${icons.edit}
                          <span>Edit Price</span>
                        </button>
                      `}
                      <button class="btn btn-sm btn-outline text-danger btn-matrix-delete" data-pid="${p.id}" title="Delete Listing" style="padding: 6px 8px; color: #ef4444; border-color: #fca5a5;">
                        ${icons.trash}
                      </button>
                    </div>
                  </td>
                </tr>
              `;
  }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Filter Bindings
  const searchInput = container.querySelector('#matrixSearchInput');
  const supSelect = container.querySelector('#matrixSupplierSelect');
  const catSelect = container.querySelector('#matrixCategorySelect');

  searchInput?.addEventListener('input', (e) => {
    state.matrixSearch = e.target.value;
    renderMasterMatrixTab(container, state);
  });

  supSelect?.addEventListener('change', (e) => {
    state.matrixSupplierFilter = e.target.value;
    renderMasterMatrixTab(container, state);
  });

  catSelect?.addEventListener('change', (e) => {
    state.matrixCategoryFilter = e.target.value;
    renderMasterMatrixTab(container, state);
  });

  container.querySelectorAll('.btn-matrix-type').forEach(btn => {
    btn.addEventListener('click', () => {
      state.matrixTypeFilter = btn.getAttribute('data-type');
      renderMasterMatrixTab(container, state);
    });
  });

  container.querySelector('#btnMatrixClearFilters')?.addEventListener('click', () => {
    state.matrixSearch = '';
    state.matrixSupplierFilter = 'all';
    state.matrixCategoryFilter = 'all';
    state.matrixTypeFilter = 'all';
    renderMasterMatrixTab(container, state);
  });

  container.querySelector('#btnMatrixBatchAdd')?.addEventListener('click', () => {
    showBatchAddModal();
  });

  container.querySelector('#btnMatrixAddNew')?.addEventListener('click', () => {
    activeAdminTab = 'post';
    renderAdminScreen(container.closest('.container-fluid'), state);
  });

  // Action Buttons: Quick Edit BP & SP Modal
  container.querySelectorAll('.btn-matrix-quick-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-pid');
      const bp = btn.getAttribute('data-bp');
      const sp = btn.getAttribute('data-sp');
      const sid = btn.getAttribute('data-sid');
      const stock = btn.getAttribute('data-stock');
      showQuickPriceEditModal(pid, { bp, sp, sid, stock });
    });
  });

  // Action Buttons: Delete Product
  container.querySelectorAll('.btn-matrix-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-pid');
      const prod = store.getProduct(pid);
      if (!prod) return;

      if (confirm(`Are you sure you want to completely delete "${prod.name}" from the catalogue and supplier records?`)) {
        store.deleteProduct(pid);
        window.showToast(`Deleted "${prod.name}" from master inventory`, 'info');
        renderMasterMatrixTab(container, state);
      }
    });
  });
}
'''

comms_code = '''// -------------------------------------------------------------
// TAB 4: CUSTOMER INQUIRIES & WHATSAPP LOGS
// -------------------------------------------------------------
function renderCommunicationsManagementTab(container, state) {
  const comms = state.communications || [];
  const whatsappLogs = comms.filter(c => (c.channel || '').includes('WhatsApp'));
  const openCount = comms.filter(c => c.status === 'Open').length;
  const resolvedCount = comms.filter(c => c.status === 'Resolved').length;

  // Filters
  const search = (state.commSearch || '').toLowerCase();
  const channelFilter = state.commChannelFilter || 'all';
  const statusFilter = state.commStatusFilter || 'all';

  let filtered = [...comms];
  if (search) {
    filtered = filtered.filter(c =>
      (c.customer?.name && c.customer.name.toLowerCase().includes(search)) ||
      (c.customer?.phone && c.customer.phone.includes(search)) ||
      (c.subject && c.subject.toLowerCase().includes(search)) ||
      (c.productName && c.productName.toLowerCase().includes(search)) ||
      (c.messages && c.messages.some(m => m.text && m.text.toLowerCase().includes(search)))
    );
  }

  if (channelFilter !== 'all') {
    filtered = filtered.filter(c => c.channel === channelFilter);
  }

  if (statusFilter !== 'all') {
    filtered = filtered.filter(c => c.status === statusFilter);
  }

  container.innerHTML = `
    <div class="operations-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <!-- Header -->
      <div class="card-header-flex" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
            ${icons.messageSquare}
            <span>Customer Inquiries & WhatsApp Operations</span>
          </h2>
          <p class="card-subtitle" style="color: #64748b; font-size: 0.92rem; margin-top: 4px;">
            Single-source communications desk: live WhatsApp inquiries, storefront chat requests, and priority callback requests.
          </p>
        </div>

        <div style="display: flex; gap: 10px;">
          <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="background: #25d366; color: white; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; padding: 8px 16px; border-radius: 8px;">
            ${icons.messageCircle}
            <span>Open WhatsApp Desk (+254 700 000 000)</span>
          </a>
        </div>
      </div>

      <!-- Quick KPI Strip -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
        <div style="background: #f8fafc; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Total Inquiries</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-top: 4px;">${comms.length}</div>
          <small style="color: #64748b;">Customer touchpoints logged</small>
        </div>

        <div style="background: #ecfdf5; padding: 16px; border-radius: 10px; border: 1px solid #a7f3d0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #065f46; text-transform: uppercase;">WhatsApp Direct Leads</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #047857; margin-top: 4px;">${whatsappLogs.length}</div>
          <small style="color: #047857;">Click-to-WhatsApp conversions</small>
        </div>

        <div style="background: #fffbeb; padding: 16px; border-radius: 10px; border: 1px solid #fde68a;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #92400e; text-transform: uppercase;">Pending Follow-ups</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #b45309; margin-top: 4px;">${openCount} Open</div>
          <small style="color: #92400e;">Awaiting agent resolution</small>
        </div>

        <div style="background: #f0fdf4; padding: 16px; border-radius: 10px; border: 1px solid #bbf7d0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #166534; text-transform: uppercase;">Resolved Queries</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #15803d; margin-top: 4px;">${resolvedCount} Closed</div>
          <small style="color: #166534;">Customer satisfied</small>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; align-items: center; flex-wrap: wrap; background: #f8fafc; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
        <div style="flex: 1; min-width: 220px;">
          <input type="text" id="commSearchInput" class="form-input" placeholder="Search customer, phone, product, or message content..." value="${escapeHtml(state.commSearch || '')}" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem;" />
        </div>

        <div style="min-width: 180px;">
          <select id="commChannelSelect" class="form-select" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem;">
            <option value="all" ${channelFilter === 'all' ? 'selected' : ''}>All Channels</option>
            <option value="WhatsApp Central Desk" ${channelFilter === 'WhatsApp Central Desk' ? 'selected' : ''}>WhatsApp Central Desk</option>
            <option value="Live Storefront Desk" ${channelFilter === 'Live Storefront Desk' ? 'selected' : ''}>Live Storefront Desk</option>
            <option value="Phone Callback Request" ${channelFilter === 'Phone Callback Request' ? 'selected' : ''}>Phone Callback Request</option>
          </select>
        </div>

        <div style="min-width: 150px;">
          <select id="commStatusSelect" class="form-select" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem;">
            <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
            <option value="Open" ${statusFilter === 'Open' ? 'selected' : ''}>Open</option>
            <option value="Replied" ${statusFilter === 'Replied' ? 'selected' : ''}>Replied</option>
            <option value="Resolved" ${statusFilter === 'Resolved' ? 'selected' : ''}>Resolved</option>
          </select>
        </div>

        ${search || channelFilter !== 'all' || statusFilter !== 'all' ? `
          <button class="btn btn-outline btn-sm" id="btnCommClearFilters" style="padding: 8px 12px;">Reset</button>
        ` : ''}
      </div>

      <!-- Inquiries Table -->
      <div class="dash-table-wrapper" style="overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <table class="admin-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead style="background: #f1f5f9; text-align: left; border-bottom: 2px solid #cbd5e1;">
            <tr>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Customer & Contact</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Channel</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Product / Service</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Latest Message</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700;">Status</th>
              <th style="padding: 12px 14px; color: #334155; font-weight: 700; text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="6" style="padding: 30px; text-align: center; color: #64748b;">
                  No customer inquiries match the current search or channel filter.
                </td>
              </tr>
            ` : filtered.map(c => {
    const isWhatsApp = (c.channel || '').includes('WhatsApp');
    const lastMsg = (c.messages && c.messages.length > 0) ? c.messages[c.messages.length - 1] : null;
    const msgText = lastMsg ? lastMsg.text : (c.subject || 'Inquiry logged');
    const prod = c.productId ? store.getProduct(c.productId) : null;
    const isService = prod ? prod.type === 'service' : (c.category === 'cat-interior' || c.category === 'cat-commercial');

    return `
                <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                  <!-- Customer Details -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    <div style="font-weight: 700; color: #0f172a; font-size: 0.92rem;">
                      ${escapeHtml(c.customer?.name || 'Customer')}
                    </div>
                    <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">
                      ${escapeHtml(c.customer?.phone || '+254 700 000 000')}
                    </div>
                    ${c.customer?.location ? `<div style="font-size: 0.72rem; color: #94a3b8;">${escapeHtml(c.customer.location)}</div>` : ''}
                  </td>

                  <!-- Channel Badge -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    ${isWhatsApp ? `
                      <span class="badge" style="background: #ecfdf5; color: #047857; font-weight: 700; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #a7f3d0;">
                        ${icons.messageCircle} WhatsApp
                      </span>
                    ` : `
                      <span class="badge" style="background: #eff6ff; color: #1d4ed8; font-weight: 700; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #bfdbfe;">
                        ${icons.messageSquare} Storefront Chat
                      </span>
                    `}
                  </td>

                  <!-- Product / Service Inquired -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    <div style="font-weight: 600; color: #1e293b; font-size: 0.88rem;">
                      ${escapeHtml(c.productName || c.subject || 'General Sourcing')}
                    </div>
                    <div style="margin-top: 3px;">
                      ${isService ? `
                        <span class="badge" style="background: #dcfce7; color: #166534; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">SERVICE</span>
                      ` : `
                        <span class="badge" style="background: #eff6ff; color: #1d4ed8; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">GOODS</span>
                      `}
                    </div>
                  </td>

                  <!-- Latest Message -->
                  <td style="padding: 12px 14px; vertical-align: middle; max-width: 300px;">
                    <div style="font-size: 0.82rem; color: #334155; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                      ${escapeHtml(msgText)}
                    </div>
                    ${lastMsg ? `<div style="font-size: 0.7rem; color: #94a3b8; margin-top: 3px;">${new Date(lastMsg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>` : ''}
                  </td>

                  <!-- Status -->
                  <td style="padding: 12px 14px; vertical-align: middle;">
                    ${c.status === 'Resolved' ? `
                      <span class="badge" style="background: #ecfdf5; color: #047857; font-weight: 700; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px;">Resolved</span>
                    ` : c.status === 'Replied' ? `
                      <span class="badge" style="background: #eff6ff; color: #1d4ed8; font-weight: 700; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px;">Replied</span>
                    ` : `
                      <span class="badge" style="background: #fef3c7; color: #b45309; font-weight: 700; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px;">Open</span>
                    `}
                  </td>

                  <!-- Actions -->
                  <td style="padding: 12px 14px; vertical-align: middle; text-align: center;">
                    <div style="display: inline-flex; align-items: center; gap: 6px;">
                      <a href="https://wa.me/254700000000?text=${encodeURIComponent('Hello ' + (c.customer?.name || '') + ', following up on your Connectify inquiry regarding ' + (c.productName || 'our services') + '.')}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background: #25d366; color: white; padding: 6px 10px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; text-decoration: none;" title="Open in WhatsApp">
                        ${icons.messageCircle}
                        <span>WhatsApp</span>
                      </a>

                      <button class="btn btn-sm btn-outline btn-comm-toggle" data-cid="${c.id}" data-status="${c.status}" style="padding: 6px 10px; font-size: 0.8rem; font-weight: 600;">
                        ${c.status === 'Resolved' ? 'Reopen' : 'Resolve'}
                      </button>

                      <button class="btn btn-sm btn-outline btn-comm-view" data-cid="${c.id}" style="padding: 6px 10px; font-size: 0.8rem; font-weight: 600;">
                        View / Reply
                      </button>
                    </div>
                  </td>
                </tr>
              `;
  }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Bindings
  const searchInput = container.querySelector('#commSearchInput');
  const channelSelect = container.querySelector('#commChannelSelect');
  const statusSelect = container.querySelector('#commStatusSelect');

  searchInput?.addEventListener('input', (e) => {
    state.commSearch = e.target.value;
    renderCommunicationsManagementTab(container, state);
  });

  channelSelect?.addEventListener('change', (e) => {
    state.commChannelFilter = e.target.value;
    renderCommunicationsManagementTab(container, state);
  });

  statusSelect?.addEventListener('change', (e) => {
    state.commStatusFilter = e.target.value;
    renderCommunicationsManagementTab(container, state);
  });

  container.querySelector('#btnCommClearFilters')?.addEventListener('click', () => {
    state.commSearch = '';
    state.commChannelFilter = 'all';
    state.commStatusFilter = 'all';
    renderCommunicationsManagementTab(container, state);
  });

  // Toggle status
  container.querySelectorAll('.btn-comm-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-cid');
      const cur = btn.getAttribute('data-status');
      const next = cur === 'Resolved' ? 'Open' : 'Resolved';
      store.updateCommunicationStatus(cid, next);
      window.showToast(`Inquiry ${cid} marked as ${next}`, 'success');
      renderCommunicationsManagementTab(container, state);
    });
  });

  // View / Reply Modal
  container.querySelectorAll('.btn-comm-view').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-cid');
      showCommDetailsModal(cid, container, state);
    });
  });
}

function showCommDetailsModal(commId, parentContainer, state) {
  const comm = store.getCommunication(commId);
  if (!comm) return;

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop animate-fade-in active';
  modal.innerHTML = `
    <div class="modal-card modal-lg" style="max-width: 640px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
      <div class="modal-header" style="background: #0f172a; color: white; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="color: white; margin: 0; font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
            ${icons.messageSquare}
            <span>Customer Thread · ${escapeHtml(comm.customer?.name || 'Customer')}</span>
          </h3>
          <p style="color: #94a3b8; font-size: 0.85rem; margin: 4px 0 0 0;">
            ${escapeHtml(comm.customer?.phone || '')} · Channel: ${escapeHtml(comm.channel)}
          </p>
        </div>
        <button class="modal-close-btn" id="closeCommModal" style="background: rgba(255,255,255,0.1); border: none; color: white; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          ${icons.close}
        </button>
      </div>

      <div class="modal-body" style="padding: 24px; max-height: 60vh; overflow-y: auto; background: #f8fafc;">
        <div style="background: #ffffff; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
          <strong style="color: #0f172a; font-size: 0.95rem; display: block;">${escapeHtml(comm.productName || comm.subject)}</strong>
          <span style="font-size: 0.78rem; color: #64748b;">Inquiry logged on ${new Date(comm.createdAt).toLocaleString()}</span>
        </div>

        <div class="comm-thread-messages" style="display: flex; flex-direction: column; gap: 12px;">
          ${(comm.messages || []).map(m => `
            <div style="align-self: ${m.sender === 'admin' ? 'flex-end' : 'flex-start'}; max-width: 85%; background: ${m.sender === 'admin' ? '#047857' : '#ffffff'}; color: ${m.sender === 'admin' ? '#ffffff' : '#0f172a'}; padding: 12px 16px; border-radius: 12px; border: ${m.sender === 'admin' ? 'none' : '1px solid #e2e8f0'}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <div style="font-size: 0.75rem; font-weight: 700; margin-bottom: 4px; opacity: 0.85;">
                ${escapeHtml(m.senderName || (m.sender === 'admin' ? 'Connectify Central Desk' : comm.customer?.name || 'Customer'))}
              </div>
              <div style="font-size: 0.9rem; line-height: 1.45;">
                ${escapeHtml(m.text)}
              </div>
              <div style="font-size: 0.7rem; margin-top: 4px; opacity: 0.7; text-align: right;">
                ${new Date(m.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Reply Box -->
      <form id="commReplyForm" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; align-items: center;">
        <input type="text" id="commReplyText" class="form-input" required placeholder="Type staff response or internal WhatsApp note..." style="flex: 1; padding: 10px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.9rem;" />
        <button type="submit" class="btn btn-primary" style="background: var(--jiji-green); color: white; font-weight: 700; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
          ${icons.send}
          <span>Send</span>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector('#closeCommModal')?.addEventListener('click', close);

  modal.querySelector('#commReplyForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const replyInput = modal.querySelector('#commReplyText');
    const text = replyInput.value.trim();
    if (!text) return;

    store.sendStaffReply(commId, text, 'Connectify Central Desk');
    window.showToast('Response logged & sent!', 'success');
    close();
    renderCommunicationsManagementTab(parentContainer, state);
  });
}
'''

with open('js/admin.js', 'r', encoding='utf-8') as f:
    content = f.read()

matrix_start = content.find('function renderMasterMatrixTab(container, state) {')
matrix_end = content.find('function showQuickPriceEditModal(productId, currentData) {')

if matrix_start == -1 or matrix_end == -1:
    print('Failed to find matrix markers')
    sys.exit(1)

content = content[:matrix_start] + matrix_code + '\n\n' + content[matrix_end:]

quotes_start = content.find('function renderQuotationsManagementTab(container, state) {')
quotes_end = content.find('function escapeHtml(str) {')

if quotes_start == -1 or quotes_end == -1:
    print('Failed to find quotes markers')
    sys.exit(1)

content = content[:quotes_start] + comms_code + '\n\n' + content[quotes_end:]

with open('js/admin.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('SUCCESSFULLY UPDATED admin.js')
