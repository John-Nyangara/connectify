// CONNECTIFY — Operations & Merchant Management Console
// Multi-Merchant Sourcing · Master Inventory Matrix (BP/SP) · Dynamic Batch Add · Executive Reports

import { store } from './store.js';
import { icons } from './icons.js';

let activeAdminTab = 'matrix'; // 'matrix' | 'suppliers' | 'listings' | 'orders' | 'quotations' | 'communications' | 'reports' | 'post'
let selectedSupplierIdForView = null; // When viewing a specific supplier's catalogue

export function renderAdminScreen(container, state) {
  // If navigated from header/external actions, route to appropriate tab
  if (state.currentScreen === 'add-product') {
    activeAdminTab = 'post';
  } else if (state.currentScreen === 'orders-mgmt') {
    activeAdminTab = 'orders';
  } else if (state.currentScreen === 'finance' || state.currentScreen === 'reports') {
    activeAdminTab = 'reports';
  } else if (state.currentScreen === 'suppliers') {
    activeAdminTab = 'suppliers';
  } else if (state.currentScreen === 'communications' || state.currentScreen === 'comm-hub') {
    activeAdminTab = 'communications';
  } else {
    activeAdminTab = 'matrix';
  }

  const pendingOrders = state.orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
  const unreadCommCount = store.getUnreadCommunicationCount();

  container.innerHTML = `
    <div class="container-fluid" style="margin-top: 24px; margin-bottom: 60px;">
      <!-- Operations Header Bar -->
      <div class="admin-page-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <span class="admin-kicker" style="color: var(--jiji-green-dark); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.08em; display: inline-flex; align-items: center; gap: 6px;">
            ${icons.shieldCheck} Connectify Central Sourcing & Fulfillment Hub
          </span>
          <h1 class="page-title" style="font-size: 1.85rem; color: #0f172a; margin: 4px 0; font-weight: 800;">Merchant & Operations Management Console</h1>
          <p class="page-subtitle" style="color: #64748b; font-size: 0.95rem; margin: 0;">
            Direct supplier catalogues, Master Inventory Matrix (BP vs SP), customer orders, and live WhatsApp inquiry logs.
          </p>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-outline" id="btnPreviewJijiStore" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600;">
            ${icons.globe}
            <span>View Marketplace</span>
          </button>
          <button class="btn btn-secondary" id="btnTopRegisterSupplier" style="background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; display: inline-flex; align-items: center; gap: 6px; font-weight: 600;">
            ${icons.plus}
            <span>Add Supplier</span>
          </button>
          <button class="btn btn-primary" id="btnTopQuickPost" style="background: var(--jiji-green); color: #fff; display: inline-flex; align-items: center; gap: 6px; font-weight: 700;">
            ${icons.plusCircle}
            <span>Post New Listing</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs (5 Clean, Focused Tabs) -->
      <div class="operations-nav" style="display: flex; gap: 8px; background: #ffffff; padding: 6px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; overflow-x: auto;">
        <button class="simple-tab-btn ${activeAdminTab === 'matrix' ? 'active' : ''}" data-tab="matrix" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; cursor: pointer; white-space: nowrap;">
          ${icons.grid}
          <span>Inventory & Pricing Matrix</span>
          <span class="simple-tab-badge" style="background: #dbeafe; color: #1e40af; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">${state.products.length}</span>
        </button>

        <button class="simple-tab-btn ${activeAdminTab === 'suppliers' ? 'active' : ''}" data-tab="suppliers" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; cursor: pointer; white-space: nowrap;">
          ${icons.building}
          <span>Suppliers & Partners</span>
          <span class="simple-tab-badge" style="background: #f1f5f9; color: #334155; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">${state.suppliers.length}</span>
        </button>

        <button class="simple-tab-btn ${activeAdminTab === 'orders' ? 'active' : ''}" data-tab="orders" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; cursor: pointer; white-space: nowrap;">
          ${icons.clipboard}
          <span>Customer Orders</span>
          ${pendingOrders.length > 0 ? `<span class="simple-tab-badge" style="background: #ef4444; color: #fff; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">${pendingOrders.length} New</span>` : `<span class="simple-tab-badge" style="background: #f1f5f9; color: #334155; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">${state.orders.length}</span>`}
        </button>

        <button class="simple-tab-btn ${activeAdminTab === 'communications' ? 'active' : ''}" data-tab="communications" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; cursor: pointer; white-space: nowrap;">
          ${icons.messageSquare}
          <span>Customer Inquiries & WhatsApp</span>
          ${unreadCommCount > 0 ? `<span class="simple-tab-badge" style="background: #ef4444; color: #fff; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">${unreadCommCount} New</span>` : `<span class="simple-tab-badge" style="background: #dcfce7; color: #166534; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">${(state.communications || []).length}</span>`}
        </button>

        <button class="simple-tab-btn ${activeAdminTab === 'reports' ? 'active' : ''}" data-tab="reports" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; cursor: pointer; white-space: nowrap;">
          ${icons.barChart}
          <span>Reports & Analytics</span>
          <span class="simple-tab-badge" style="background: #dcfce7; color: #15803d; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">P&L</span>
        </button>
      </div>

      <!-- Tab Content Mount -->
      <div id="operationsContent"></div>
    </div>
  `;

  // Render Active Tab Content
  const tabContent = container.querySelector('#operationsContent');
  if (activeAdminTab === 'suppliers') {
    if (selectedSupplierIdForView) {
      renderSupplierCatalogueHub(tabContent, state, selectedSupplierIdForView);
    } else {
      renderSuppliersOverviewTab(tabContent, state);
    }
  } else if (activeAdminTab === 'post') {
    renderSimplePostTab(tabContent, state);
  } else if (activeAdminTab === 'orders') {
    renderSimpleOrdersTab(tabContent, state);
  } else if (activeAdminTab === 'communications') {
    renderCommunicationsManagementTab(tabContent, state);
  } else if (activeAdminTab === 'reports') {
    renderExecutiveReportsTab(tabContent, state);
  } else {
    renderMasterMatrixTab(tabContent, state);
  }

  // Bind Header & Tab Navigation
  container.querySelector('#btnPreviewJijiStore')?.addEventListener('click', () => {
    store.setMode('customer');
  });

  container.querySelector('#btnTopRegisterSupplier')?.addEventListener('click', () => {
    showAddSupplierModal();
  });

  container.querySelector('#btnTopQuickPost')?.addEventListener('click', () => {
    selectedSupplierIdForView = null;
    activeAdminTab = 'post';
    renderAdminScreen(container, state);
  });

  container.querySelectorAll('.simple-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeAdminTab = btn.getAttribute('data-tab');
      selectedSupplierIdForView = null; // Reset drill-down
      renderAdminScreen(container, state);
    });
  });
}

// Global hook for batch add modal
window.openBatchAddModal = function (supplier = null) {
  showBatchAddModal(supplier);
};

// -------------------------------------------------------------
// TAB 1: MASTER INVENTORY MATRIX (BP vs SP, INLINE EDIT & DELETE)
// -------------------------------------------------------------
function renderMasterMatrixTab(container, state) {
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


function showQuickPriceEditModal(productId, currentData) {
  const product = store.getProduct(productId);
  if (!product) return;

  if (product.type === 'service') {
    window.showToast('Commercial services have variable pricing based on scope & materials. Inquiries route via WhatsApp (+254 700 000 000).', 'info');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop animate-fade-in active';
  modal.innerHTML = `
    <div class="modal-card" style="max-width: 520px; border-radius: 14px; overflow: hidden;">
      <div class="modal-header" style="background: #0f172a; color: white; padding: 20px;">
        <div>
          <h3 style="color: white; margin: 0; font-size: 1.25rem;">Edit Inventory Pricing</h3>
          <p style="color: #94a3b8; font-size: 0.85rem; margin: 4px 0 0 0;">${escapeHtml(product.name)}</p>
        </div>
        <button class="modal-close-btn" id="closeQuickEditModal" aria-label="Close" style="color: white; background: rgba(255,255,255,0.1); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          ${icons.close}
        </button>
      </div>

      <form id="quickPriceEditForm">
        <div class="modal-body" style="padding: 24px;">
          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; font-size: 0.85rem; color: #334155;">Fulfilling Supplier / Merchant</label>
            <select id="qeSupplier" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;">
              ${store.state.suppliers.map(s => `
                <option value="${s.id}" ${currentData.sid === s.id ? 'selected' : ''}>${escapeHtml(s.name)}</option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div class="form-group">
              <label style="font-weight: 700; font-size: 0.85rem; color: #334155;">Buying Price BP (KSh) *</label>
              <input type="number" id="qeBpInput" class="form-input" required value="${currentData.bp}" min="0" step="50" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 1rem;" />
              <small style="color: #64748b; font-size: 0.75rem;">Wholesale supplier quote</small>
            </div>

            <div class="form-group">
              <label style="font-weight: 700; font-size: 0.85rem; color: #15803d;">Selling Price SP (KSh) *</label>
              <input type="number" id="qeSpInput" class="form-input" required value="${currentData.sp}" min="0" step="50" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid var(--jiji-green); font-weight: 800; font-size: 1.05rem; color: var(--jiji-green-dark);" />
              <small style="color: #64748b; font-size: 0.75rem;">Public storefront price</small>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; font-size: 0.85rem; color: #334155;">Current Available Stock</label>
            <input type="number" id="qeStockInput" class="form-input" required value="${currentData.stock || 15}" min="0" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" />
          </div>

          <!-- Dynamic Margin Summary -->
          <div id="qeMarginPreview" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; color: #166534; font-weight: 600;">Calculated Gross Profit:</span>
            <strong id="qeMarginLabel" style="font-size: 1.15rem; color: #15803d;">+KSh ${(currentData.sp - currentData.bp).toLocaleString()}</strong>
          </div>
        </div>

        <div class="modal-footer" style="padding: 18px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
          <button type="button" class="btn btn-outline text-danger" id="btnDeleteFromModal" style="color: #ef4444; border-color: #fca5a5;">
            ${icons.trash} Delete Product
          </button>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-outline" id="cancelQuickEdit">Cancel</button>
            <button type="submit" class="btn btn-primary" style="background: var(--jiji-green); color: white; font-weight: 700;">
              Save Pricing Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector('#closeQuickEditModal')?.addEventListener('click', close);
  modal.querySelector('#cancelQuickEdit')?.addEventListener('click', close);

  // Recalculate margin on input
  const bpIn = modal.querySelector('#qeBpInput');
  const spIn = modal.querySelector('#qeSpInput');
  const marginLabel = modal.querySelector('#qeMarginLabel');

  const updatePreview = () => {
    const b = Number(bpIn.value) || 0;
    const s = Number(spIn.value) || 0;
    const diff = s - b;
    const pct = s > 0 ? ((diff / s) * 100).toFixed(1) : 0;
    marginLabel.textContent = `+KSh ${diff.toLocaleString()} (${pct}%)`;
  };

  bpIn?.addEventListener('input', updatePreview);
  spIn?.addEventListener('input', updatePreview);

  // Submit
  modal.querySelector('#quickPriceEditForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBp = Number(bpIn.value);
    const newSp = Number(spIn.value);
    const newSid = modal.querySelector('#qeSupplier').value;
    const newStock = Number(modal.querySelector('#qeStockInput').value);

    store.updateMasterProductPricing(productId, {
      sellingPrice: newSp,
      supplierCost: newBp,
      supplierId: newSid,
      stockAvailable: newStock
    });

    window.showToast(`Updated pricing matrix for "${product.name}"`, 'success');
    close();
  });

  // Delete from modal
  modal.querySelector('#btnDeleteFromModal')?.addEventListener('click', () => {
    if (confirm(`Delete "${product.name}" from inventory?`)) {
      store.deleteProduct(productId);
      window.showToast(`Deleted "${product.name}"`, 'info');
      close();
    }
  });
}

// -------------------------------------------------------------
// DYNAMIC BATCH ADD MODAL (EXPANDABLE: ADDS > 3 PRODUCTS DYNAMICALLY)
// -------------------------------------------------------------
function showBatchAddModal(preSelectedSupplier = null) {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop animate-fade-in active';
  
  // Default 5 initial product rows
  let batchRows = [
    { title: 'Lenovo ThinkPad T14s Ultrabook (Core i7, 16GB)', cat: 'cat-laptops', cost: 85000, markup: 18, stock: 12 },
    { title: 'GaN 65W Dual USB-C Fast Wall Charger', cat: 'cat-laptop-acc', cost: 3200, markup: 25, stock: 45 },
    { title: 'Ergonomic Foldable Aluminum Laptop Riser', cat: 'cat-laptop-acc', cost: 2400, markup: 25, stock: 30 },
    { title: 'Samsung Galaxy A55 5G (128GB)', cat: 'cat-phones', cost: 42000, markup: 15, stock: 18 },
    { title: 'MagSafe Wireless 15W Magnetic Charging Pad', cat: 'cat-phone-acc', cost: 2200, markup: 25, stock: 40 }
  ];

  let currentTab = 'table'; // 'table' | 'csv'
  let targetSupplierId = preSelectedSupplier ? preSelectedSupplier.id : (store.state.suppliers[0] ? store.state.suppliers[0].id : 'sup-techhub');

  const renderModalDOM = () => {
    const targetSupplier = store.getSupplier(targetSupplierId);

    modal.innerHTML = `
      <div class="modal-card modal-lg" style="max-width: 1080px; width: 95%; max-height: 90vh; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);">
        <!-- Modal Header -->
        <div class="modal-header" style="background: #0f172a; color: white; padding: 20px 24px;">
          <div>
            <h3 style="margin: 0; color: white; font-size: 1.35rem; display: flex; align-items: center; gap: 8px;">
              ${icons.layers}
              <span>Batch Add Products to Catalogue (Unlimited Rows)</span>
            </h3>
            <span style="font-size: 0.85rem; color: #94a3b8;">
              Quickly add 4, 5, 10, or 20+ products simultaneously with automated markup pricing and instant publishing.
            </span>
          </div>
          <button class="modal-close-btn" id="closeBatchModal" aria-label="Close" style="color: white; background: rgba(255,255,255,0.1); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            ${icons.close}
          </button>
        </div>

        <!-- Supplier Selector & Action Bar -->
        <div style="background: #f8fafc; padding: 14px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #334155;">Assign to Supplier:</label>
            <select id="batchSupplierSelect" class="form-select-sm" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 600;">
              ${store.state.suppliers.map(s => `
                <option value="${s.id}" ${s.id === targetSupplierId ? 'selected' : ''}>${escapeHtml(s.name)} (${s.location.split(',')[0]})</option>
              `).join('')}
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-sm btn-outline" id="btnBatchAdd1Row" style="padding: 6px 12px; font-weight: 700; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 4px;">
              ${icons.plus} + 1 Row
            </button>
            <button class="btn btn-sm btn-outline" id="btnBatchAdd5Rows" style="padding: 6px 12px; font-weight: 700; font-size: 0.82rem;">
              + 5 Rows
            </button>
            <button class="btn btn-sm btn-outline" id="btnBatchAdd10Rows" style="padding: 6px 12px; font-weight: 700; font-size: 0.82rem;">
              + 10 Rows
            </button>
            <span style="color: #cbd5e1;">|</span>
            <button class="btn btn-sm ${currentTab === 'csv' ? 'btn-primary' : 'btn-outline'}" id="btnToggleCsvTab" style="padding: 6px 12px; font-size: 0.82rem;">
              ${currentTab === 'csv' ? 'Switch to Table' : 'Paste Bulk CSV'}
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="modal-body" style="padding: 24px; overflow-y: auto; flex: 1;">
          ${currentTab === 'csv' ? `
            <!-- CSV Paste Interface -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px;">
              <h4 style="margin-top: 0; color: #0f172a; font-size: 1rem;">Paste Bulk Products Text</h4>
              <p style="font-size: 0.82rem; color: #64748b; margin-bottom: 10px;">
                Paste lines in format: <code>Product Title, Category ID, Wholesale Cost, Markup %, Stock</code>
              </p>
              <textarea id="batchCsvTextarea" class="form-textarea" rows="10" style="width: 100%; font-family: monospace; font-size: 0.85rem; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px;" placeholder="HP EliteBook 840 G8, cat-laptops, 72000, 18, 10
Heavy Duty Laptop Stand, cat-laptop-acc, 2800, 20, 25
Apple iPhone 15 Pro 128GB, cat-phones, 145000, 12, 8
20W PD Fast Adapter, cat-phone-acc, 1500, 30, 50">Lenovo ThinkPad T14s Ultrabook, cat-laptops, 85000, 18, 12
Dell Latitude 5420 i7, cat-laptops, 78000, 18, 10
GaN 65W Fast Charger, cat-laptop-acc, 3200, 25, 45
Ergonomic Aluminum Stand, cat-laptop-acc, 2400, 25, 30
Samsung Galaxy S24 Ultra, cat-phones, 132000, 15, 8
MagSafe Magnetic Wireless Stand, cat-phone-acc, 2200, 25, 40</textarea>
              <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
                <button class="btn btn-primary btn-sm" id="btnParseCsv">Parse & Populate Table</button>
              </div>
            </div>
          ` : `
            <!-- Interactive Dynamic Table -->
            <div style="overflow-x: auto;">
              <table class="admin-table" id="batchDynamicTable" style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f1f5f9; text-align: left; border-bottom: 2px solid #cbd5e1;">
                    <th style="padding: 10px; width: 40px; text-align: center;">#</th>
                    <th style="padding: 10px; min-width: 260px;">Product Name / Title *</th>
                    <th style="padding: 10px; min-width: 170px;">Category</th>
                    <th style="padding: 10px; width: 120px;">Wholesale BP (KSh)</th>
                    <th style="padding: 10px; width: 85px;">Markup %</th>
                    <th style="padding: 10px; width: 130px;">Selling Price (SP)</th>
                    <th style="padding: 10px; width: 80px;">Stock</th>
                    <th style="padding: 10px; width: 40px; text-align: center;">Del</th>
                  </tr>
                </thead>
                <tbody>
                  ${batchRows.map((row, idx) => {
    const sp = Math.round(row.cost * (1 + row.markup / 100));
    return `
                      <tr data-index="${idx}" style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px; text-align: center; color: #64748b; font-weight: 700;">${idx + 1}</td>
                        <td style="padding: 8px;">
                          <input type="text" class="form-input-sm b-title" value="${escapeHtml(row.title)}" placeholder="e.g. Dell Latitude 7420 Ultrabook" style="width: 100%; font-weight: 600;" />
                        </td>
                        <td style="padding: 8px;">
                          <select class="form-select-sm b-cat" style="width: 100%;">
                            ${store.state.categories.map(c => `
                              <option value="${c.id}" ${c.id === row.cat ? 'selected' : ''}>${c.name}</option>
                            `).join('')}
                          </select>
                        </td>
                        <td style="padding: 8px;">
                          <input type="number" class="form-input-sm b-cost" value="${row.cost}" min="0" step="50" style="width: 100%; font-weight: 700;" />
                        </td>
                        <td style="padding: 8px;">
                          <input type="number" class="form-input-sm b-markup" value="${row.markup}" min="0" max="100" style="width: 100%; text-align: center;" />
                        </td>
                        <td style="padding: 8px;">
                          <strong class="b-selling" style="color: var(--jiji-green-dark); font-size: 0.95rem;">KSh ${sp.toLocaleString()}</strong>
                        </td>
                        <td style="padding: 8px;">
                          <input type="number" class="form-input-sm b-stock" value="${row.stock || 15}" min="1" style="width: 100%; text-align: center;" />
                        </td>
                        <td style="padding: 8px; text-align: center;">
                          <button class="btn-remove-batch-row" data-index="${idx}" style="color: #ef4444; cursor: pointer; background: none; border: none; padding: 4px;" title="Remove row">
                            ${icons.trash}
                          </button>
                        </td>
                      </tr>
                    `;
  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer" style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.9rem; color: #475569;">
            Total Rows in Batch: <strong style="color: #0f172a;">${batchRows.length} Products</strong>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-outline" id="cancelBatchModal">Cancel</button>
            <button class="btn btn-primary" id="saveBatchProdsBtn" style="background: var(--jiji-green); color: white; font-weight: 700; padding: 10px 22px;">
              Save All (${batchRows.length}) Products & Publish to Catalogue
            </button>
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    const close = () => modal.remove();
    modal.querySelector('#closeBatchModal')?.addEventListener('click', close);
    modal.querySelector('#cancelBatchModal')?.addEventListener('click', close);

    // Supplier select
    modal.querySelector('#batchSupplierSelect')?.addEventListener('change', (e) => {
      targetSupplierId = e.target.value;
    });

    // Add row buttons
    modal.querySelector('#btnBatchAdd1Row')?.addEventListener('click', () => {
      batchRows.push({ title: '', cat: 'cat-laptops', cost: 10000, markup: 18, stock: 15 });
      renderModalDOM();
    });

    modal.querySelector('#btnBatchAdd5Rows')?.addEventListener('click', () => {
      for (let i = 0; i < 5; i++) {
        batchRows.push({ title: '', cat: 'cat-laptops', cost: 10000, markup: 18, stock: 15 });
      }
      renderModalDOM();
    });

    modal.querySelector('#btnBatchAdd10Rows')?.addEventListener('click', () => {
      for (let i = 0; i < 10; i++) {
        batchRows.push({ title: '', cat: 'cat-laptops', cost: 10000, markup: 18, stock: 15 });
      }
      renderModalDOM();
    });

    modal.querySelector('#btnToggleCsvTab')?.addEventListener('click', () => {
      currentTab = currentTab === 'csv' ? 'table' : 'csv';
      renderModalDOM();
    });

    modal.querySelector('#btnParseCsv')?.addEventListener('click', () => {
      const text = modal.querySelector('#batchCsvTextarea')?.value || '';
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length > 0) {
        batchRows = lines.map(line => {
          const parts = line.split(',').map(p => p.trim());
          return {
            title: parts[0] || 'New Product',
            cat: parts[1] || 'cat-laptops',
            cost: Number(parts[2]) || 5000,
            markup: Number(parts[3]) || 18,
            stock: Number(parts[4]) || 15
          };
        });
        currentTab = 'table';
        window.showToast(`Parsed ${batchRows.length} rows into batch table`, 'success');
        renderModalDOM();
      }
    });

    // Live table row calculations
    const rowsDOM = modal.querySelectorAll('#batchDynamicTable tbody tr');
    rowsDOM.forEach(tr => {
      const idx = Number(tr.getAttribute('data-index'));
      const costIn = tr.querySelector('.b-cost');
      const markupIn = tr.querySelector('.b-markup');
      const sellingLabel = tr.querySelector('.b-selling');
      const titleIn = tr.querySelector('.b-title');
      const catIn = tr.querySelector('.b-cat');
      const stockIn = tr.querySelector('.b-stock');

      const updateRow = () => {
        const c = Number(costIn.value) || 0;
        const m = Number(markupIn.value) || 18;
        const s = Math.round(c * (1 + m / 100));
        sellingLabel.textContent = `KSh ${s.toLocaleString()}`;

        // Keep batchRows state synchronized
        if (batchRows[idx]) {
          batchRows[idx].cost = c;
          batchRows[idx].markup = m;
          batchRows[idx].title = titleIn.value;
          batchRows[idx].cat = catIn.value;
          batchRows[idx].stock = Number(stockIn.value) || 15;
        }
      };

      costIn?.addEventListener('input', updateRow);
      markupIn?.addEventListener('input', updateRow);
      titleIn?.addEventListener('input', updateRow);
      catIn?.addEventListener('change', updateRow);
      stockIn?.addEventListener('input', updateRow);
    });

    // Remove row buttons
    modal.querySelectorAll('.btn-remove-batch-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-index'));
        if (batchRows.length <= 1) {
          window.showToast('Batch table must have at least one row', 'warning');
          return;
        }
        batchRows.splice(idx, 1);
        renderModalDOM();
      });
    });

    // Save All Batch
    modal.querySelector('#saveBatchProdsBtn')?.addEventListener('click', () => {
      const supplier = store.getSupplier(targetSupplierId) || store.state.suppliers[0];
      let count = 0;

      batchRows.forEach(row => {
        const title = row.title.trim();
        const cost = Number(row.cost) || 0;
        const markup = Number(row.markup) || 18;
        const selling = Math.round(cost * (1 + markup / 100));
        const stock = Number(row.stock) || 15;

        if (title && cost > 0) {
          // Select an appropriate image based on category
          let img = 'assets/images/laptop.jpg';
          if (row.cat === 'cat-laptop-acc') img = 'assets/images/laptop_acc.jpg';
          else if (row.cat === 'cat-phones') img = 'assets/images/phone.jpg';
          else if (row.cat === 'cat-phone-acc') img = 'assets/images/phone_acc.jpg';

          const p = store.saveProduct({
            name: title,
            type: 'goods',
            categoryId: row.cat,
            description: `Quality commercial supply sourced from ${supplier.name}. Quality inspected and covered by manufacturer warranty.`,
            images: [img],
            specs: { 'Supplier': supplier.name, 'Condition': 'Brand New (Direct Supply)' },
            unit: 'piece',
            status: 'published',
            isFeatured: false,
            defaultMarkupPercent: markup,
            transportHandlingCost: 500,
            sellingPrice: selling,
            stockQuantity: stock,
            location: supplier.location.split(',')[0]
          });

          const off = store.saveSupplierOffer({
            productId: p.id,
            supplierId: supplier.id,
            supplierCost: cost,
            transportHandlingCost: 500,
            leadTime: '24-48 Hours',
            stockAvailable: stock,
            minOrderQty: 1,
            expiryDate: '2026-12-31',
            isPrimary: true
          });

          store.setActiveSupplierOffer(p.id, off.id);
          count++;
        }
      });

      window.showToast(`Batch published ${count} products to ${supplier.name}'s catalogue!`, 'success');
      close();
      store.notify();
    });
  };

  document.body.appendChild(modal);
  renderModalDOM();
}

// -------------------------------------------------------------
// TAB 5: EXECUTIVE REPORTS & ANALYTICS (P&L, PAYABLES, REORDERS)
// -------------------------------------------------------------
function renderExecutiveReportsTab(container, state) {
  const fin = store.getFinancialSummary();

  // 1. Calculate Supplier Payables
  const supplierPayables = state.suppliers.map(sup => {
    let unitsSold = 0;
    let totalCustomerRevenue = 0;
    let totalWholesaleCost = 0;

    state.orders.forEach(order => {
      order.items.forEach(item => {
        if (item.assignedSupplierId === sup.id) {
          unitsSold += item.quantity;
          totalCustomerRevenue += item.totalItemSellingPrice || (item.unitPrice * item.quantity);
          totalWholesaleCost += item.totalItemSupplierCost || (item.supplierCostSnapshot * item.quantity);
        }
      });
    });

    return {
      supplier: sup,
      unitsSold,
      totalCustomerRevenue,
      totalWholesaleCost,
      status: totalWholesaleCost > 0 ? 'Pending Remittance' : 'Settled'
    };
  });

  // 2. Calculate Category Profitability Matrix
  const categoryMatrix = state.categories.map(cat => {
    const productsInCat = state.products.filter(p => p.categoryId === cat.id);
    let totalRevenue = 0;
    let totalCost = 0;
    let unitsMoved = 0;

    state.orders.forEach(order => {
      order.items.forEach(item => {
        const p = state.products.find(prod => prod.id === item.productId);
        if (p && p.categoryId === cat.id) {
          unitsMoved += item.quantity;
          totalRevenue += item.totalItemSellingPrice || (item.unitPrice * item.quantity);
          totalCost += item.totalItemSupplierCost || (item.supplierCostSnapshot * item.quantity);
        }
      });
    });

    const marginKsh = totalRevenue - totalCost;
    const marginPct = totalRevenue > 0 ? ((marginKsh / totalRevenue) * 100).toFixed(1) : 0;

    return {
      category: cat,
      skuCount: productsInCat.length,
      unitsMoved,
      totalRevenue,
      totalCost,
      marginKsh,
      marginPct
    };
  });

  // 3. Low Stock & Inventory Reorder Alerts
  const lowStockItems = [];
  state.products.forEach(p => {
    const off = store.getActiveOffer(p);
    const stock = off ? off.stockAvailable : (p.stockQuantity || 15);
    if (stock <= 10) {
      const sup = off ? store.getSupplier(off.supplierId) : null;
      lowStockItems.push({
        product: p,
        stock,
        supplier: sup,
        reorderQty: 20
      });
    }
  });

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Report Header -->
      <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
          <div>
            <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
              ${icons.barChart}
              <span>Executive Financial Reports & Operating Performance</span>
            </h2>
            <p style="color: #64748b; font-size: 0.92rem; margin-top: 4px;">
              Audited P&L statements, merchant settlement schedules, category margins, and inventory health alerts.
            </p>
          </div>

          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary btn-sm" id="btnExportFullReportsCsv" style="background: #0f172a; color: white; display: inline-flex; align-items: center; gap: 6px;">
              ${icons.download}
              <span>Export Executive P&L (CSV)</span>
            </button>
            <button class="btn btn-outline btn-sm" onclick="window.print()" style="display: inline-flex; align-items: center; gap: 6px;">
              ${icons.fileText}
              <span>Print Report</span>
            </button>
          </div>
        </div>

        <!-- 4 Key Executive P&L Cards -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 24px;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #64748b;">Gross Merchandise Value (GMV)</span>
            <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-top: 6px;">
              KSh ${fin.totalSalesRevenue.toLocaleString()}
            </div>
            <small style="color: #64748b;">Total paid across ${fin.ordersCount} orders</small>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #64748b;">Cost of Goods Sold (COGS)</span>
            <div style="font-size: 1.8rem; font-weight: 800; color: #334155; margin-top: 6px;">
              KSh ${fin.totalSupplierCosts.toLocaleString()}
            </div>
            <small style="color: #64748b;">Payable to verified suppliers</small>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; border: 1.5px solid #a7f3d0;">
            <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #065f46;">Net Platform Profit</span>
            <div style="font-size: 2rem; font-weight: 800; color: #059669; margin-top: 6px;">
              KSh ${fin.estimatedGrossProfit.toLocaleString()}
            </div>
            <small style="color: #047857; font-weight: 600;">Avg Margin: ${fin.averageMargin}%</small>
          </div>

          <div style="background: #fefce8; padding: 20px; border-radius: 10px; border: 1.5px solid #fde047;">
            <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #854d0e;">Pending Settlements</span>
            <div style="font-size: 1.8rem; font-weight: 800; color: #a16207; margin-top: 6px;">
              KSh ${fin.totalOwedToSuppliers.toLocaleString()}
            </div>
            <small style="color: #854d0e;">Escrow held awaiting dispatch</small>
          </div>
        </div>
      </div>

      <!-- SECTION 1: SUPPLIER PAYABLES & SETTLEMENT SCHEDULE -->
      <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="font-size: 1.2rem; color: #0f172a; margin: 0;">Supplier Payables & Settlement Schedule</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin: 2px 0 0 0;">Breakdown of wholesale amounts owed to merchants upon customer delivery completion.</p>
          </div>
          <button class="btn btn-sm btn-outline" id="btnExportPayablesCsv" style="display: inline-flex; align-items: center; gap: 4px;">
            ${icons.download} Export Payables CSV
          </button>
        </div>

        <div class="dash-table-wrapper" style="border: 1px solid #e2e8f0; border-radius: 8px;">
          <table class="admin-table" style="width: 100%; border-collapse: collapse;">
            <thead style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <tr>
                <th style="padding: 10px 14px;">Supplier Business</th>
                <th style="padding: 10px 14px;">Payment Terms</th>
                <th style="padding: 10px 14px;">Units Fulfilled</th>
                <th style="padding: 10px 14px;">Total Retail Collected</th>
                <th style="padding: 10px 14px;">Amount Payable (BP)</th>
                <th style="padding: 10px 14px;">Settlement Status</th>
                <th style="padding: 10px 14px; text-align: center;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${supplierPayables.map(sp => `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px 14px;">
                    <strong>${escapeHtml(sp.supplier.name)}</strong>
                    <div style="font-size: 0.75rem; color: #64748b;">${escapeHtml(sp.supplier.contactPerson)} · ${escapeHtml(sp.supplier.phone)}</div>
                  </td>
                  <td style="padding: 12px 14px; font-size: 0.85rem; color: #475569;">${escapeHtml(sp.supplier.paymentTerms)}</td>
                  <td style="padding: 12px 14px; font-weight: 700;">${sp.unitsSold} units</td>
                  <td style="padding: 12px 14px; font-weight: 700; color: #334155;">KSh ${sp.totalCustomerRevenue.toLocaleString()}</td>
                  <td style="padding: 12px 14px; font-weight: 800; color: #0f172a;">KSh ${sp.totalWholesaleCost.toLocaleString()}</td>
                  <td style="padding: 12px 14px;">
                    <span class="badge ${sp.totalWholesaleCost > 0 ? 'badge-warning' : 'badge-emerald'}" style="padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">
                      ${sp.status}
                    </span>
                  </td>
                  <td style="padding: 12px 14px; text-align: center;">
                    <button class="btn btn-sm btn-outline btn-record-remittance" data-sid="${sp.supplier.id}" style="padding: 4px 10px; font-size: 0.78rem;">
                      Record Payout
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECTION 2: CATEGORY MARGIN & VOLUME MATRIX -->
      <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 1.2rem; color: #0f172a; margin: 0 0 4px 0;">Category Profitability & Volume Matrix</h3>
        <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 16px 0;">Performance analysis comparing laptops, smartphones, accessories, and industrial equipment.</p>

        <div class="dash-table-wrapper" style="border: 1px solid #e2e8f0; border-radius: 8px;">
          <table class="admin-table" style="width: 100%; border-collapse: collapse;">
            <thead style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <tr>
                <th style="padding: 10px 14px;">Category</th>
                <th style="padding: 10px 14px;">Active SKUs</th>
                <th style="padding: 10px 14px;">Units Sold</th>
                <th style="padding: 10px 14px;">Total Revenue (GMV)</th>
                <th style="padding: 10px 14px;">Wholesale Cost (COGS)</th>
                <th style="padding: 10px 14px;">Net Platform Profit</th>
                <th style="padding: 10px 14px;">Gross Margin %</th>
              </tr>
            </thead>
            <tbody>
              ${categoryMatrix.map(cm => `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px 14px;">
                    <strong>${cm.category.name}</strong>
                  </td>
                  <td style="padding: 12px 14px;">${cm.skuCount} items</td>
                  <td style="padding: 12px 14px; font-weight: 700;">${cm.unitsMoved}</td>
                  <td style="padding: 12px 14px; font-weight: 700;">KSh ${cm.totalRevenue.toLocaleString()}</td>
                  <td style="padding: 12px 14px; color: #64748b;">KSh ${cm.totalCost.toLocaleString()}</td>
                  <td style="padding: 12px 14px; font-weight: 800; color: #059669;">+KSh ${cm.marginKsh.toLocaleString()}</td>
                  <td style="padding: 12px 14px;">
                    <span style="background: #f0fdf4; color: #166534; font-weight: 700; padding: 2px 8px; border-radius: 999px; font-size: 0.8rem;">
                      ${cm.marginPct}%
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECTION 3: INVENTORY HEALTH & REORDER ALERTS -->
      <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
        <h3 style="font-size: 1.2rem; color: #0f172a; margin: 0 0 4px 0;">Inventory Health & Stock Replenishment Alerts</h3>
        <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 16px 0;">Products approaching depleted quantities that require supplier replenishment orders.</p>

        <div class="dash-table-wrapper" style="border: 1px solid #e2e8f0; border-radius: 8px;">
          <table class="admin-table" style="width: 100%; border-collapse: collapse;">
            <thead style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <tr>
                <th style="padding: 10px 14px;">Product Title</th>
                <th style="padding: 10px 14px;">Primary Merchant</th>
                <th style="padding: 10px 14px;">Current Stock</th>
                <th style="padding: 10px 14px;">Status Alert</th>
                <th style="padding: 10px 14px;">Recommended Reorder</th>
                <th style="padding: 10px 14px; text-align: center;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${lowStockItems.length === 0 ? `
                <tr><td colspan="6" style="padding: 20px; text-align: center; color: #64748b;">All inventory levels are healthy.</td></tr>
              ` : lowStockItems.map(lsi => `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px 14px;"><strong>${escapeHtml(lsi.product.name)}</strong></td>
                  <td style="padding: 12px 14px;">${lsi.supplier ? escapeHtml(lsi.supplier.name) : 'Partner Supplier'}</td>
                  <td style="padding: 12px 14px; font-weight: 800; color: #dc2626;">${lsi.stock} units</td>
                  <td style="padding: 12px 14px;">
                    <span class="badge badge-warning" style="padding: 4px 8px; font-size: 0.75rem;">
                      ${lsi.stock <= 5 ? 'Critical Reorder' : 'Low Stock'}
                    </span>
                  </td>
                  <td style="padding: 12px 14px; font-weight: 700;">+${lsi.reorderQty} units</td>
                  <td style="padding: 12px 14px; text-align: center;">
                    <button class="btn btn-sm btn-primary btn-reorder-stock" data-pid="${lsi.product.id}" style="padding: 4px 10px; font-size: 0.78rem; background: var(--jiji-green);">
                      Reorder Now
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // CSV Export
  container.querySelector('#btnExportFullReportsCsv')?.addEventListener('click', () => {
    let csv = 'Metric,Value\n';
    csv += `Total Customer GMV,${fin.totalSalesRevenue}\n`;
    csv += `Total Supplier Payables (COGS),${fin.totalSupplierCosts}\n`;
    csv += `Net Platform Profit,${fin.estimatedGrossProfit}\n`;
    csv += `Average Margin %,${fin.averageMargin}%\n`;
    csv += `Total Orders,${fin.ordersCount}\n\n`;

    csv += 'Category,SKU Count,Revenue,Wholesale Cost,Profit,Margin %\n';
    categoryMatrix.forEach(cm => {
      csv += `"${cm.category.name}",${cm.skuCount},${cm.totalRevenue},${cm.totalCost},${cm.marginKsh},${cm.marginPct}%\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `connectify_executive_pnl_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.showToast('Executive P&L report CSV downloaded!', 'success');
  });

  container.querySelector('#btnExportPayablesCsv')?.addEventListener('click', () => {
    let csv = 'Supplier,Terms,Units Sold,Retail Collected,Wholesale Payable,Status\n';
    supplierPayables.forEach(sp => {
      csv += `"${sp.supplier.name}","${sp.supplier.paymentTerms}",${sp.unitsSold},${sp.totalCustomerRevenue},${sp.totalWholesaleCost},"${sp.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `connectify_supplier_payables_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.showToast('Supplier Payables schedule CSV downloaded!', 'success');
  });

  container.querySelectorAll('.btn-record-remittance').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.getAttribute('data-sid');
      const sup = store.getSupplier(sid);
      window.showToast(`Remittance slip generated and recorded for ${sup ? sup.name : 'Supplier'}`, 'success');
    });
  });

  container.querySelectorAll('.btn-reorder-stock').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-pid');
      const prod = store.getProduct(pid);
      window.showToast(`Purchase order issued to replenish "${prod ? prod.name : 'item'}"`, 'success');
    });
  });
}

// -------------------------------------------------------------
// TAB 2: SUPPLIERS & THEIR CATALOGUES
// -------------------------------------------------------------
function renderSuppliersOverviewTab(container, state) {
  container.innerHTML = `
    <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
      <div class="card-header-flex" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0;">Supplier Directory & Product Sourcing Hub</h2>
          <p class="card-subtitle" style="color: #64748b; font-size: 0.92rem; margin-top: 4px;">
            Add suppliers/businesses to Connectify and manage all the products & services they provide through one central hub.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" id="btnSuppliersBatchModalTrigger" style="display: inline-flex; align-items: center; gap: 6px;">
            ${icons.layers}
            <span>Batch Add (+3+)</span>
          </button>
          <button class="btn btn-primary" id="btnRegisterSupplier" style="background: var(--jiji-green);">
            + Register New Supplier
          </button>
        </div>
      </div>

      <!-- Suppliers Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
        ${state.suppliers.map(sup => {
    const supplierProducts = store.getProductsForSupplier(sup.id);
    const activeListingsCount = supplierProducts.length;

    return `
            <div style="border: 1px solid var(--slate-200); border-radius: 12px; padding: 22px; background: #fff; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <h3 style="font-size: 1.2rem; color: var(--slate-900); margin-bottom: 4px;">${escapeHtml(sup.name)}</h3>
                  <div style="font-size: 0.85rem; color: var(--slate-600); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 4px;">
                    <span>Contact: <strong>${escapeHtml(sup.contactPerson)}</strong></span>
                    <span style="display: inline-flex; align-items: center; gap: 4px;">${icons.phone} ${escapeHtml(sup.phone)}</span>
                  </div>
                </div>
                <span class="badge ${sup.status === 'active' ? 'badge-emerald' : 'badge-light'}">
                  ${sup.status === 'active' ? 'Active Partner' : 'Paused'}
                </span>
              </div>

              <div style="font-size: 0.82rem; color: var(--slate-600); margin-bottom: 14px; line-height: 1.6; background: var(--slate-50); padding: 12px 14px; border-radius: 8px; display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  ${icons.mapPin}
                  <span><strong>Depot / Location:</strong> ${escapeHtml(sup.location)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  ${icons.creditCard}
                  <span><strong>Payment Terms:</strong> ${escapeHtml(sup.paymentTerms)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  ${icons.truck}
                  <span><strong>Logistics:</strong> ${escapeHtml(sup.deliveryTerms)}</span>
                </div>
              </div>

              <!-- Product Summary Strip -->
              <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--slate-100);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 0.88rem; font-weight: 700; color: var(--jiji-green); display: inline-flex; align-items: center; gap: 6px;">
                    ${icons.package}
                    <span>${activeListingsCount} Product${activeListingsCount !== 1 ? 's' : ''} in Catalogue</span>
                  </span>
                  <div style="font-size: 0.75rem; color: var(--slate-400);">
                    Covering: ${sup.coverage.slice(0, 2).join(', ')}
                  </div>
                </div>

                <!-- Action Buttons -->
                <div style="display: grid; grid-template-columns: 1.4fr 1.1fr; gap: 8px;">
                  <button class="btn btn-primary btn-sm btn-view-supplier-prods" data-sid="${sup.id}" style="background: var(--dark-navy); display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                    ${icons.eye}
                    <span>View Catalogue (${activeListingsCount})</span>
                  </button>
                  <button class="btn btn-outline btn-sm btn-add-prod-to-sup" data-sid="${sup.id}" style="color: var(--jiji-green); border-color: var(--jiji-green); font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 4px;">
                    ${icons.plus}
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;

  // Bind Events
  container.querySelector('#btnRegisterSupplier')?.addEventListener('click', () => {
    showAddSupplierModal();
  });

  container.querySelector('#btnSuppliersBatchModalTrigger')?.addEventListener('click', () => {
    showBatchAddModal();
  });

  container.querySelectorAll('.btn-view-supplier-prods').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSupplierIdForView = btn.getAttribute('data-sid');
      renderSupplierCatalogueHub(container, state, selectedSupplierIdForView);
    });
  });

  container.querySelectorAll('.btn-add-prod-to-sup').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.getAttribute('data-sid');
      const sup = store.getSupplier(sid);
      showBatchAddModal(sup);
    });
  });
}

// Sub-View: Supplier's Complete Catalogue Hub
function renderSupplierCatalogueHub(container, state, supplierId) {
  const supplier = store.getSupplier(supplierId);
  if (!supplier) {
    selectedSupplierIdForView = null;
    renderSuppliersOverviewTab(container, state);
    return;
  }

  const supplierProducts = store.getProductsForSupplier(supplier.id);

  container.innerHTML = `
    <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
      <!-- Supplier Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <button class="btn btn-outline btn-sm" id="btnBackToSuppliers" style="display: inline-flex; align-items: center; gap: 6px;">
          ${icons.arrowLeft}
          <span>Back to All Suppliers</span>
        </button>

        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" id="btnBatchAddProds" style="display: inline-flex; align-items: center; gap: 6px;">
            ${icons.layers}
            <span>Batch Add Products</span>
          </button>
          <button class="btn btn-primary btn-sm" id="btnAddSingleProdToSup" style="background: var(--jiji-green); display: inline-flex; align-items: center; gap: 6px;">
            ${icons.plus}
            <span>Add Single Product</span>
          </button>
        </div>
      </div>

      <!-- Supplier Info Banner -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 18px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; color: #047857; text-transform: uppercase;">MERCHANT PROFILE</span>
          <h2 style="font-size: 1.5rem; color: #0f172a; margin: 2px 0 6px 0;">${escapeHtml(supplier.name)}</h2>
          <div style="font-size: 0.85rem; color: #64748b; display: flex; gap: 14px; flex-wrap: wrap;">
            <span>Contact: <strong>${escapeHtml(supplier.contactPerson)}</strong></span>
            <span>Phone: <strong>${escapeHtml(supplier.phone)}</strong></span>
            <span>Location: <strong>${escapeHtml(supplier.location)}</strong></span>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 0.8rem; color: #64748b;">Catalogue Total</div>
          <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a;">${supplierProducts.length} Items</div>
        </div>
      </div>

      <!-- Supplier Products Table -->
      <div class="dash-table-wrapper" style="border: 1px solid #e2e8f0; border-radius: 8px;">
        <table class="admin-table" style="width: 100%; border-collapse: collapse;">
          <thead style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
            <tr>
              <th style="padding: 10px 14px;">Product</th>
              <th style="padding: 10px 14px;">Category</th>
              <th style="padding: 10px 14px;">Supplier Cost (BP)</th>
              <th style="padding: 10px 14px;">Selling Price (SP)</th>
              <th style="padding: 10px 14px;">Gross Profit</th>
              <th style="padding: 10px 14px;">Store Status</th>
              <th style="padding: 10px 14px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${supplierProducts.length === 0 ? `
              <tr>
                <td colspan="7" style="padding: 30px; text-align: center; color: #64748b;">
                  No products registered for this supplier yet. Click "Batch Add Products" to add multiple items from their price list.
                </td>
              </tr>
            ` : supplierProducts.map(sp => {
    const p = sp.product;
    const profit = p.sellingPrice - (sp.supplierCost + sp.transportCost);

    return `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px 14px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${p.images[0] || 'assets/images/chair.jpg'}" alt="${escapeHtml(p.name)}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover; border: 1px solid #e2e8f0;" />
                      <strong>${escapeHtml(p.name)}</strong>
                    </div>
                  </td>
                  <td style="padding: 12px 14px;">${state.categories.find(c => c.id === p.categoryId)?.name || 'General'}</td>
                  <td style="padding: 12px 14px; font-weight: 700;">KSh ${sp.supplierCost.toLocaleString()}</td>
                  <td style="padding: 12px 14px; font-weight: 800; color: var(--jiji-green-dark);">KSh ${p.sellingPrice.toLocaleString()}</td>
                  <td style="padding: 12px 14px;">
                    <span style="background: #f0fdf4; color: #166534; font-weight: 700; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">
                      +KSh ${profit.toLocaleString()}
                    </span>
                  </td>
                  <td style="padding: 12px 14px;">
                    <span class="badge ${p.status === 'published' ? 'badge-emerald' : 'badge-light'}" style="padding: 4px 8px; font-size: 0.75rem;">
                      ${p.status === 'published' ? 'Live on Store' : 'Draft'}
                    </span>
                  </td>
                  <td style="padding: 12px 14px; text-align: center;">
                    <button class="btn btn-sm btn-outline text-danger btn-del-sup-prod" data-pid="${p.id}" style="padding: 4px 8px; color: #ef4444; border-color: #fca5a5;">
                      ${icons.trash}
                    </button>
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
  container.querySelector('#btnBackToSuppliers')?.addEventListener('click', () => {
    selectedSupplierIdForView = null;
    renderSuppliersOverviewTab(container, state);
  });

  container.querySelector('#btnBatchAddProds')?.addEventListener('click', () => {
    showBatchAddModal(supplier);
  });

  container.querySelector('#btnAddSingleProdToSup')?.addEventListener('click', () => {
    activeAdminTab = 'post';
    renderAdminScreen(container.closest('.container-fluid'), state);
  });

  container.querySelectorAll('.btn-del-sup-prod').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-pid');
      if (confirm('Delete this product from the catalogue?')) {
        store.deleteProduct(pid);
        window.showToast('Product removed', 'info');
        renderSupplierCatalogueHub(container, state, supplierId);
      }
    });
  });
}

// -------------------------------------------------------------
// MODAL: ADD / EDIT SUPPLIER BUSINESS DETAILS
// -------------------------------------------------------------
function showAddSupplierModal(existingSupplier = null) {
  const isEdit = !!existingSupplier;
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop animate-fade-in active';
  modal.innerHTML = `
    <div class="modal-card modal-lg" style="max-width: 650px; border-radius: 14px; overflow: hidden;">
      <div class="modal-header" style="background: #0f172a; color: white; padding: 20px;">
        <h3 style="margin: 0; color: white; font-size: 1.25rem;">${isEdit ? 'Edit Supplier Information' : 'Register New Merchant / Supplier'}</h3>
        <button class="modal-close-btn" id="closeSupRegModal" aria-label="Close" style="color: white; background: rgba(255,255,255,0.1); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          ${icons.close}
        </button>
      </div>

      <form id="supRegForm">
        <div class="modal-body" style="padding: 24px;">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Business / Merchant Name *</label>
              <input type="text" id="srName" class="form-input" required value="${existingSupplier ? escapeHtml(existingSupplier.name) : ''}" placeholder="e.g. Kenya Laptop Wholesale Hub Ltd" />
            </div>
            <div class="form-group">
              <label>Contact Person Name *</label>
              <input type="text" id="srContact" class="form-input" required value="${existingSupplier ? escapeHtml(existingSupplier.contactPerson) : ''}" placeholder="e.g. Peter Kariuki" />
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Direct Phone / WhatsApp *</label>
              <input type="tel" id="srPhone" class="form-input" required value="${existingSupplier ? escapeHtml(existingSupplier.phone) : ''}" placeholder="+254 7XX XXX XXX" />
            </div>
            <div class="form-group">
              <label>Official Email Address *</label>
              <input type="email" id="srEmail" class="form-input" required value="${existingSupplier ? escapeHtml(existingSupplier.email) : ''}" placeholder="sales@merchant.co.ke" />
            </div>
          </div>

          <div class="form-group">
            <label>Depot / Physical Warehouse Location *</label>
            <input type="text" id="srLocation" class="form-input" required value="${existingSupplier ? escapeHtml(existingSupplier.location) : ''}" placeholder="e.g. Kimathi Street, CBD, Nairobi" />
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Payment Terms *</label>
              <input type="text" id="srTerms" class="form-input" required value="${existingSupplier ? escapeHtml(existingSupplier.paymentTerms) : 'Net 14 Days'}" placeholder="e.g. Net 14 Days, Weekly Escrow, COD" />
            </div>
            <div class="form-group">
              <label>Delivery / Courier Arrangement</label>
              <input type="text" id="srDelivery" class="form-input" value="${existingSupplier ? escapeHtml(existingSupplier.deliveryTerms) : 'Same day dispatch within Nairobi CBD'}" />
            </div>
          </div>
        </div>

        <div class="modal-footer" style="padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
          <button type="button" class="btn btn-outline" id="cancelSupReg">Cancel</button>
          <button type="submit" class="btn btn-primary" style="background: var(--jiji-green); color: white; font-weight: 700;">
            ${isEdit ? 'Save Changes' : 'Register Supplier & Open Catalogue'}
          </button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector('#closeSupRegModal')?.addEventListener('click', close);
  modal.querySelector('#cancelSupReg')?.addEventListener('click', close);

  modal.querySelector('#supRegForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = modal.querySelector('#srName').value.trim();
    const contact = modal.querySelector('#srContact').value.trim();
    const phone = modal.querySelector('#srPhone').value.trim();
    const email = modal.querySelector('#srEmail').value.trim();
    const location = modal.querySelector('#srLocation').value.trim();
    const terms = modal.querySelector('#srTerms').value.trim();
    const delivery = modal.querySelector('#srDelivery').value.trim();

    const saved = store.saveSupplier({
      id: existingSupplier ? existingSupplier.id : undefined,
      name,
      contactPerson: contact,
      phone,
      email,
      location,
      coverage: ['Nairobi', 'Nationwide'],
      categories: ['cat-laptops'],
      paymentTerms: terms,
      deliveryTerms: delivery
    });

    window.showToast(`Supplier "${saved.name}" registered! Now add their products.`, 'success');
    close();

    selectedSupplierIdForView = saved.id;
    activeAdminTab = 'suppliers';
    store.notify();
  });
}

// -------------------------------------------------------------
// TAB 3: ALL CATALOGUE LISTINGS
// -------------------------------------------------------------
function renderSimpleListingsTab(container, state) {
  container.innerHTML = `
    <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
      <div class="card-header-flex" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0;">Marketplace Listings</h2>
          <p class="card-subtitle" style="color: #64748b; font-size: 0.92rem; margin-top: 4px;">Turn listings on/off, edit public selling prices, and monitor your profit margins</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btnTabAddListing" style="background: var(--jiji-green); color: white;">+ Add Single Product</button>
      </div>

      <div class="dash-table-wrapper" style="border: 1px solid #e2e8f0; border-radius: 8px;">
        <table class="admin-table" style="width: 100%; border-collapse: collapse;">
          <thead style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
            <tr>
              <th style="padding: 10px 14px;">Product & Title</th>
              <th style="padding: 10px 14px;">Category</th>
              <th style="padding: 10px 14px;">Sourcing Supplier</th>
              <th style="padding: 10px 14px;">Supplier Cost (BP)</th>
              <th style="padding: 10px 14px;">Public Selling Price (SP)</th>
              <th style="padding: 10px 14px;">Profit Margin</th>
              <th style="padding: 10px 14px;">Live Status</th>
              <th style="padding: 10px 14px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${state.products.map(p => {
    const activeOffer = store.getActiveOffer(p);
    const supplier = activeOffer ? store.getSupplier(activeOffer.supplierId) : null;
    const sCost = activeOffer ? activeOffer.supplierCost : 0;
    const profit = p.sellingPrice - (sCost + (p.transportHandlingCost || 0));

    return `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px 14px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${p.images[0] || 'assets/images/laptop.jpg'}" alt="${escapeHtml(p.name)}" style="width: 48px; height: 48px; border-radius: 6px; object-fit: cover; border: 1px solid #e2e8f0;" />
                      <div>
                        <strong style="color: var(--slate-900); font-size: 0.95rem;">${escapeHtml(p.name)}</strong>
                        <div style="font-size: 0.75rem; color: var(--slate-500);">${p.location || 'Nairobi'}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 12px 14px;">${state.categories.find(c => c.id === p.categoryId)?.name || 'General'}</td>
                  <td style="padding: 12px 14px;">
                    <strong style="color: var(--slate-800);">${supplier ? escapeHtml(supplier.name) : 'Partner Merchant'}</strong>
                  </td>
                  <td style="padding: 12px 14px; font-weight: 700;">KSh ${sCost.toLocaleString()}</td>
                  <td style="padding: 12px 14px;">
                    <strong style="color: var(--jiji-green); font-size: 1.05rem;">KSh ${p.sellingPrice.toLocaleString()}</strong>
                  </td>
                  <td style="padding: 12px 14px;">
                    <span style="color: var(--jiji-green); font-weight: 700; background: var(--jiji-green-light); padding: 4px 8px; border-radius: 4px;">
                      +KSh ${profit.toLocaleString()}
                    </span>
                  </td>
                  <td style="padding: 12px 14px;">
                    <label class="switch-toggle" title="Toggle active on customer storefront">
                      <input type="checkbox" class="toggle-ad-btn" data-pid="${p.id}" ${p.status === 'published' ? 'checked' : ''} />
                      <span class="slider"></span>
                    </label>
                  </td>
                  <td style="padding: 12px 14px; text-align: center;">
                    <button class="btn btn-outline btn-sm text-danger btn-delete-ad" data-pid="${p.id}" title="Delete Listing">
                      ${icons.trash}
                    </button>
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
  container.querySelector('#btnTabAddListing')?.addEventListener('click', () => {
    activeAdminTab = 'post';
    renderAdminScreen(container.closest('.container-fluid'), state);
  });

  container.querySelectorAll('.toggle-ad-btn').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const pid = toggle.getAttribute('data-pid');
      store.toggleProductPublication(pid);
      window.showToast('Listing visibility updated on marketplace', 'info');
    });
  });

  container.querySelectorAll('.btn-delete-ad').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-pid');
      if (confirm('Delete this listing from the database?')) {
        store.deleteProduct(pid);
        window.showToast('Listing removed', 'info');
        renderSimpleListingsTab(container, state);
      }
    });
  });
}

// -------------------------------------------------------------
// TAB 4: CUSTOMER ORDERS & FULFILLMENT
// -------------------------------------------------------------
function renderSimpleOrdersTab(container, state) {
  container.innerHTML = `
    <div class="operations-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
      <div class="card-header-flex" style="margin-bottom: 20px;">
        <div>
          <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0;">Customer Orders & Purchase Orders</h2>
          <p class="card-subtitle" style="color: #64748b; font-size: 0.92rem; margin-top: 4px;">Confirm availability with suppliers, dispatch to destination, and collect profit</p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${state.orders.map(order => {
    const firstItem = order.items[0];
    const supplier = firstItem ? store.getSupplier(firstItem.assignedSupplierId) : null;
    const profit = order.pricing.platformGrossProfit !== undefined ? order.pricing.platformGrossProfit : (order.pricing.brokerGrossProfit || 0);

    return `
            <div style="border: 1px solid var(--slate-200); border-radius: 10px; padding: 20px; background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <span style="font-size: 0.8rem; font-weight: 700; color: var(--slate-500);">ORDER REFERENCE</span>
                  <h3 style="font-size: 1.3rem; margin: 0; color: var(--slate-900);">${order.id}</h3>
                  <div style="font-size: 0.82rem; color: var(--slate-500); margin-top: 2px;">
                    Buyer: <strong>${escapeHtml(order.customer.name)}</strong> (${escapeHtml(order.customer.phone)}) · ${escapeHtml(order.customer.county)}
                  </div>
                </div>

                <div style="text-align: right;">
                  <span class="badge ${order.status === 'Completed' ? 'badge-emerald' : 'badge-warning'} badge-lg">
                    ${order.status}
                  </span>
                  <div style="font-size: 0.8rem; color: #555; margin-top: 4px;">
                    Payment: <strong>${order.payment.status}</strong>
                  </div>
                </div>
              </div>

              <!-- Item row -->
              <div style="background: var(--slate-50); padding: 12px; border-radius: 6px; margin: 12px 0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.92rem;">
                  <div>
                    <strong>${order.items.length} item(s):</strong> ${order.items.map(i => `${i.quantity} × ${i.productName}`).join(', ')}
                  </div>
                  <div>
                    Assigned Merchant: <strong>${supplier ? escapeHtml(supplier.name) : 'Partner Merchant'}</strong>
                  </div>
                </div>
              </div>

              <!-- Cash Breakdown Bar -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #e6f7ec; border-radius: 6px; margin-bottom: 16px;">
                <div style="font-size: 0.88rem;">
                  Customer Paid: <strong>KSh ${order.pricing.totalAmount.toLocaleString()}</strong>
                </div>
                <div style="font-size: 0.88rem; color: #666;">
                  Cost to Supplier: <strong>KSh ${order.pricing.totalSupplierCost.toLocaleString()}</strong>
                </div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--jiji-green);">
                  Platform Margin: +KSh ${profit.toLocaleString()}
                </div>
              </div>

              <!-- Action buttons -->
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-outline btn-sm btn-print-po" data-oid="${order.id}" style="display: inline-flex; align-items: center; gap: 6px;">
                  ${icons.fileText}
                  <span>View Supplier PO</span>
                </button>
                <button class="btn btn-secondary btn-sm btn-step-order" data-oid="${order.id}" data-status="Confirmed & Sourced" style="display: inline-flex; align-items: center; gap: 6px;">
                  ${icons.check}
                  <span>Confirmed with Supplier</span>
                </button>
                <button class="btn btn-secondary btn-sm btn-step-order" data-oid="${order.id}" data-status="In Transit" style="display: inline-flex; align-items: center; gap: 6px;">
                  ${icons.truck}
                  <span>Dispatched to Courier</span>
                </button>
                <button class="btn btn-primary btn-sm btn-step-order" data-oid="${order.id}" data-status="Completed" style="display: inline-flex; align-items: center; gap: 6px; background: var(--jiji-green);">
                  ${icons.checkCircle}
                  <span>Mark Delivered & Settled</span>
                </button>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;

  // Bind
  container.querySelectorAll('.btn-step-order').forEach(btn => {
    btn.addEventListener('click', () => {
      const oid = btn.getAttribute('data-oid');
      const status = btn.getAttribute('data-status');
      store.updateOrderStatus(oid, status);
      window.showToast(`Order ${oid} status updated to: ${status}`, 'success');
      renderSimpleOrdersTab(container, state);
    });
  });

  container.querySelectorAll('.btn-print-po').forEach(btn => {
    btn.addEventListener('click', () => {
      const oid = btn.getAttribute('data-oid');
      const o = state.orders.find(ord => ord.id === oid);
      if (o) showSimplePo(o);
    });
  });
}

function showSimplePo(order) {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop animate-fade-in active';
  modal.innerHTML = `
    <div class="modal-card modal-lg" style="max-width: 650px; border-radius: 14px; overflow: hidden;">
      <div class="modal-header" style="background: #0f172a; color: white; padding: 20px;">
        <h3 style="color: white; margin: 0; font-size: 1.25rem;">Supplier Purchase Order (PO)</h3>
        <button class="modal-close-btn" id="closePo" aria-label="Close" style="color: white; background: rgba(255,255,255,0.1); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${icons.close}</button>
      </div>
      <div class="modal-body po-document-sheet" style="padding: 24px;">
        <h2 style="font-size: 1.35rem; margin-bottom: 8px; color: #0f172a;">CONNECTIFY CENTRAL DISPATCH REQUEST</h2>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 16px;">
          PO Reference: <strong>${order.items[0]?.poNumber || 'PO-2026-089'}</strong> · Order: ${order.id}
        </p>
        <div style="margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 0.88rem; line-height: 1.6;">
          <strong>Deliver to Buyer:</strong> ${escapeHtml(order.customer.name)} (${escapeHtml(order.customer.phone)})<br />
          <strong>Destination:</strong> ${escapeHtml(order.customer.deliveryAddress)}, ${escapeHtml(order.customer.county)}
        </div>
        <table class="po-doc-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead style="background: #f1f5f9;"><tr><th style="padding: 8px 12px; text-align: left;">Item</th><th style="padding: 8px 12px;">Qty</th><th style="padding: 8px 12px; text-align: right;">Wholesale Cost</th></tr></thead>
          <tbody>
            ${order.items.map(i => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 8px 12px;">${escapeHtml(i.productName)}</td>
                <td style="padding: 8px 12px; text-align: center;">${i.quantity}</td>
                <td style="padding: 8px 12px; text-align: right; font-weight: 700;">KSh ${(i.supplierCostSnapshot * i.quantity).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="modal-footer" style="padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
        <button class="btn btn-outline" id="closePoBtn">Close</button>
        <button class="btn btn-primary" onclick="window.print()" style="background: var(--jiji-green); color: white;">Print Official PO</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector('#closePo')?.addEventListener('click', close);
  modal.querySelector('#closePoBtn')?.addEventListener('click', close);
}

// -------------------------------------------------------------
// TAB 6: POST SINGLE LISTING FORM
// -------------------------------------------------------------
function renderSimplePostTab(container, state) {
  container.innerHTML = `
    <div class="operations-card quick-post-container" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; max-width: 800px; margin: 0 auto;">
      <h2 style="font-size: 1.4rem; margin-bottom: 6px; display: inline-flex; align-items: center; gap: 8px; color: #0f172a;">
        ${icons.plusCircle}
        <span>Post a Verified Product Listing</span>
      </h2>
      <p class="card-subtitle" style="color: #64748b; font-size: 0.95rem;">Connect a merchant product to the marketplace, set your markup, and publish instantly</p>

      <form id="simplePostForm" style="margin-top: 24px;">
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">1. What are you listing? (Product Title) *</label>
          <input type="text" id="spTitle" class="form-input" required placeholder="e.g. Dell Latitude 7420 Ultrabook Core i7" value="Dell Latitude 7420 Ultrabook Core i7 16GB RAM" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" />
        </div>

        <div class="form-grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div class="form-group">
            <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Category *</label>
            <select id="spCategory" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;">
              ${state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">Listing Type</label>
            <select id="spType" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;">
              <option value="goods" selected>Physical Equipment</option>
              <option value="service">Commercial Service</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 16px;">
          <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">2. Sourcing Supplier (Where does it come from?) *</label>
          <select id="spSupplier" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;">
            ${state.suppliers.map(s => `<option value="${s.id}">${s.name} (${s.location.split(',')[0]})</option>`).join('')}
          </select>
        </div>

        <div id="spPricingSection">
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
        </div>

        <div class="form-group" style="margin-bottom: 16px;">
          <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">3. Select Product Visual Category</label>
          <div class="quick-asset-pills" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
            <button type="button" class="btn-pill active" data-img="assets/images/laptop.jpg" style="padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">${icons.laptop} <span>Laptop</span></button>
            <button type="button" class="btn-pill" data-img="assets/images/laptop_acc.jpg" style="padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">${icons.charger} <span>Laptop Acc</span></button>
            <button type="button" class="btn-pill" data-img="assets/images/phone.jpg" style="padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">${icons.smartphone} <span>Smartphone</span></button>
            <button type="button" class="btn-pill" data-img="assets/images/phone_acc.jpg" style="padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">${icons.sticker} <span>Phone Acc</span></button>
            <button type="button" class="btn-pill" data-img="assets/images/chair.jpg" style="padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">${icons.chair} <span>Office Chair</span></button>
            <button type="button" class="btn-pill" data-img="assets/images/solar.jpg" style="padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">${icons.sun} <span>Solar Inverter</span></button>
          </div>
          <input type="hidden" id="spImg" value="assets/images/laptop.jpg" />
        </div>

        <div class="form-group" style="margin-bottom: 20px;">
          <label style="font-weight: 700; font-size: 0.88rem; color: #334155;">4. Description for Customers *</label>
          <textarea id="spDesc" class="form-textarea" rows="3" required placeholder="Describe warranty, condition, and benefits..." style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;">Business-grade ultrabook with Intel Core i7, 16GB RAM, 512GB NVMe SSD, backlit keyboard, and full official 1-year warranty. Factory inspected before doorstep dispatch.</textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-block btn-xl" style="background: var(--jiji-green); color: white; width: 100%; padding: 14px; font-weight: 700; font-size: 1.05rem; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
          ${icons.send}
          <span>Publish Listing to Customer Marketplace</span>
        </button>
      </form>
    </div>
  `;

  // Calculator logic
  const costInput = container.querySelector('#spSupplierCost');
  const transInput = container.querySelector('#spTransport');
  const markupRange = container.querySelector('#spMarkupRange');
  const markupLabel = container.querySelector('#spMarkupLabel');
  const landedDisplay = container.querySelector('#spLandedDisplay');
  const sellingDisplay = container.querySelector('#spSellingDisplay');
  const profitDisplay = container.querySelector('#spProfitDisplay');

  const updateSim = () => {
    const cost = Number(costInput.value) || 0;
    const trans = Number(transInput.value) || 0;
    const markup = Number(markupRange.value) || 18;
    markupLabel.textContent = `${markup}%`;

    const landed = cost + trans;
    const profit = Math.round(landed * (markup / 100));
    const selling = landed + profit;

    landedDisplay.textContent = `KSh ${landed.toLocaleString()}`;
    sellingDisplay.textContent = `KSh ${selling.toLocaleString()}`;
    profitDisplay.textContent = `+KSh ${profit.toLocaleString()}`;
  };

  costInput?.addEventListener('input', updateSim);
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
  });

  // Asset picker
  container.querySelectorAll('.btn-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.btn-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      container.querySelector('#spImg').value = btn.getAttribute('data-img');
    });
  });

  // Submit
  container.querySelector('#simplePostForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = container.querySelector('#spTitle').value.trim();
    const catId = container.querySelector('#spCategory').value;
    const type = container.querySelector('#spType').value;
    const supId = container.querySelector('#spSupplier').value;
    const cost = Number(costInput.value) || 0;
    const trans = Number(transInput.value) || 0;
    const markup = Number(markupRange.value) || 18;
    const img = container.querySelector('#spImg').value || 'assets/images/laptop.jpg';
    const desc = container.querySelector('#spDesc').value.trim();

    const isService = type === 'service';
    const landed = cost + trans;
    const profit = isService ? 0 : Math.round(landed * (markup / 100));
    const selling = isService ? 0 : (landed + profit);

    const newProd = store.saveProduct({
      name: title,
      type,
      categoryId: catId,
      description: desc,
      images: [img],
      specs: {
        'Condition': 'Brand New (Factory Sealed)',
        'Delivery Time': '24-48 Hours',
        'Inspection': 'Verified by Connectify Operations'
      },
      unit: type === 'service' ? 'session' : 'piece',
      status: 'published',
      isFeatured: true,
      defaultMarkupPercent: markup,
      transportHandlingCost: trans,
      sellingPrice: selling,
      stockQuantity: 15,
      location: 'Nairobi CBD'
    });

    const newOffer = store.saveSupplierOffer({
      productId: newProd.id,
      supplierId: supId,
      supplierCost: cost,
      transportHandlingCost: trans,
      leadTime: '24-48 Hours',
      stockAvailable: 15,
      minOrderQty: 1,
      expiryDate: '2026-12-31',
      isPrimary: true
    });

    store.setActiveSupplierOffer(newProd.id, newOffer.id);

    window.showToast(`Listing "${newProd.name}" published at KSh ${selling.toLocaleString()}!`, 'success');
    activeAdminTab = 'matrix';
    renderAdminScreen(container.closest('.container-fluid'), state);
  });
}

// -------------------------------------------------------------
// TAB 5: SERVICE QUOTATIONS & DYNAMIC BQ BUILDER
// -------------------------------------------------------------
// -------------------------------------------------------------
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


function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
