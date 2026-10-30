// CONNECTIFY — Customer Facing Views (Verified Kenya Marketplace Layout)

import { store } from './store.js';
import { icons } from './icons.js';

export function renderCustomerScreen(container, state) {
  switch (state.currentScreen) {
    case 'home':
      renderHomeScreen(container, state);
      break;
    case 'catalogue':
      renderCatalogueScreen(container, state);
      break;
    case 'details':
      renderProductDetailsScreen(container, state);
      break;
    case 'cart':
      renderCartScreen(container, state);
      break;
    case 'checkout':
      renderCheckoutScreen(container, state);
      break;
    case 'tracking':
      renderTrackingScreen(container, state);
      break;
    default:
      renderHomeScreen(container, state);
  }
}

// -------------------------------------------------------------
// SCREEN 01 — Homepage (Jiji Kenya Marketplace Layout)
// -------------------------------------------------------------
function renderHomeScreen(container, state) {
  let publishedProducts = state.products.filter(p => p.status === 'published');

  // Apply filters if any
  if (state.categoryFilter && state.categoryFilter !== 'all') {
    publishedProducts = publishedProducts.filter(p => p.categoryId === state.categoryFilter);
  }
  if (state.typeFilter && state.typeFilter !== 'all') {
    publishedProducts = publishedProducts.filter(p => p.type === state.typeFilter);
  }
  if (state.locationFilter && state.locationFilter !== 'all') {
    publishedProducts = publishedProducts.filter(p => p.location && p.location.toLowerCase().includes(state.locationFilter.toLowerCase()));
  }
  if (state.searchFilter) {
    const q = state.searchFilter.toLowerCase();
    publishedProducts = publishedProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.location && p.location.toLowerCase().includes(q))
    );
  }

  const activeCategory = state.categoryFilter !== 'all' ? state.categories.find(c => c.id === state.categoryFilter) : null;
  const hasActiveFilters = Boolean(
    activeCategory ||
    (state.typeFilter && state.typeFilter !== 'all') ||
    (state.locationFilter && state.locationFilter !== 'all') ||
    state.searchFilter ||
    (state.priceMax && state.priceMax < 1000000)
  );

  const totalGoodsCount = state.products.filter(p => p.status === 'published' && p.type === 'goods').length;
  const totalServicesCount = state.products.filter(p => p.status === 'published' && (p.type === 'services' || p.type === 'service')).length;

  container.innerHTML = `
    <!-- Streamlined Search Header (Search & Location Only — No Category Duplication) -->
    <div class="jiji-search-bar-wrapper">
      <div class="container-fluid">
        <div class="jiji-search-form">
          <div class="jiji-search-input-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#718894" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="jijiSearchInput" placeholder="What are you looking for? (e.g. Ergonomic chair, Mabati, Gas, Gypsum...)" value="${escapeHtml(state.searchFilter)}" />
          </div>
          <div class="jiji-loc-select-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718894" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <select class="jiji-select" id="jijiLocationSelect">
              <option value="all">All Kenya</option>
              <option value="Nairobi" ${state.locationFilter === 'Nairobi' ? 'selected' : ''}>Nairobi</option>
              <option value="Mombasa" ${state.locationFilter === 'Mombasa' ? 'selected' : ''}>Mombasa</option>
              <option value="Nakuru" ${state.locationFilter === 'Nakuru' ? 'selected' : ''}>Nakuru</option>
              <option value="Kisumu" ${state.locationFilter === 'Kisumu' ? 'selected' : ''}>Kisumu</option>
              <option value="Eldoret" ${state.locationFilter === 'Eldoret' ? 'selected' : ''}>Eldoret</option>
            </select>
          </div>
          <button class="jiji-search-btn" id="jijiSearchBtn">
            <span>Search</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Horizontal Category Quick Navigation (Single Visual Source for Categories) -->
    <div class="jiji-cat-scroller-bar">
      <div class="container-fluid">
        <div class="jiji-cat-scroller">
          <div class="jiji-cat-pill ${state.categoryFilter === 'all' ? 'active' : ''}" data-cat="all">
            <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.grid} All Categories (${state.products.filter(p => p.status === 'published').length})</span>
          </div>
          ${state.categories.map(c => `
            <div class="jiji-cat-pill ${state.categoryFilter === c.id ? 'active' : ''}" data-cat="${c.id}">
              <span style="display: inline-flex; align-items: center; gap: 6px;">${getCategorySvg(c.id)} ${c.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Main Marketplace Layout: Left Sidebar + Right Feed -->
    <div class="container-fluid">
      <div class="jiji-layout">
        <!-- Streamlined Sidebar (Refine Controls Without Category Repetition) -->
        <aside class="jiji-sidebar">
          ${hasActiveFilters ? `
            <!-- Active Filters Summary Card -->
            <div class="jiji-card" style="background: #f0fdf4; border-color: #86efac;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: #166534; text-transform: uppercase;">Active Filters</span>
                <button id="clearAllFiltersChipBtn" style="background: none; border: none; font-size: 0.75rem; font-weight: 700; color: #dc2626; cursor: pointer; text-decoration: underline;">Reset All</button>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${activeCategory ? `
                  <span class="active-filter-chip">
                    <span>${activeCategory.name}</span>
                    <button id="removeCatFilterBtn" title="Remove">&times;</button>
                  </span>
                ` : ''}
                ${state.typeFilter && state.typeFilter !== 'all' ? `
                  <span class="active-filter-chip">
                    <span>${state.typeFilter === 'goods' ? 'Goods Only' : 'Services Only'}</span>
                    <button id="removeTypeFilterBtn" title="Remove">&times;</button>
                  </span>
                ` : ''}
                ${state.locationFilter && state.locationFilter !== 'all' ? `
                  <span class="active-filter-chip">
                    <span>${state.locationFilter}</span>
                    <button id="removeLocFilterBtn" title="Remove">&times;</button>
                  </span>
                ` : ''}
                ${state.searchFilter ? `
                  <span class="active-filter-chip">
                    <span>"${escapeHtml(state.searchFilter)}"</span>
                    <button id="removeSearchFilterBtn" title="Remove">&times;</button>
                  </span>
                ` : ''}
                ${state.priceMax && state.priceMax < 1000000 ? `
                  <span class="active-filter-chip">
                    <span>≤ KSh ${state.priceMax.toLocaleString()}</span>
                    <button id="removePriceFilterBtn" title="Remove">&times;</button>
                  </span>
                ` : ''}
              </div>
            </div>
          ` : ''}

          <!-- Listing Type Filter (Clean Segmented Group) -->
          <div class="jiji-card">
            <h3 class="jiji-sidebar-title" style="margin-bottom: 10px;">Filter by Type</h3>
            <div style="display: flex; gap: 6px;">
              <button class="btn-filter-type ${(!state.typeFilter || state.typeFilter === 'all') ? 'active' : ''}" data-type="all">
                All (${state.products.filter(p => p.status === 'published').length})
              </button>
              <button class="btn-filter-type ${state.typeFilter === 'goods' ? 'active' : ''}" data-type="goods">
                Goods (${totalGoodsCount})
              </button>
              <button class="btn-filter-type ${state.typeFilter === 'services' ? 'active' : ''}" data-type="services">
                Services (${totalServicesCount})
              </button>
            </div>
          </div>

          <!-- Price Range Filter (Only Relevant for Goods) -->
          <div class="jiji-card">
            <h3 class="jiji-sidebar-title">Max Budget (Goods)</h3>
            <div class="filter-title-row">
              <span class="price-val" id="sidePriceDisplay">Up to KSh ${state.priceMax.toLocaleString()}</span>
            </div>
            <input type="range" class="form-range" id="sidePriceRange" min="5000" max="1000000" step="5000" value="${state.priceMax}" />
            <div class="range-labels">
              <span>5K</span>
              <span>1M+</span>
            </div>
          </div>

          <!-- Connectify Direct Sourcing Quality Guarantee Banner -->
          <div class="jiji-card" style="background: linear-gradient(135deg, #e6f7ec, #f0fdf4); border-color: #a7f3d0;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--jiji-green-dark);">
              <span style="display: inline-flex;">${icons.shieldCheck}</span>
              <strong style="color: var(--jiji-green-dark); font-size: 0.92rem;">Direct Verified Guarantee</strong>
            </div>
            <p style="font-size: 0.8rem; color: var(--slate-700); line-height: 1.45; margin-bottom: 12px;">
              Unlike open unverified marketplaces, every item on Connectify is vetted, quality-checked, and delivered directly with official manufacturer warranties.
            </p>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--jiji-green); display: flex; flex-direction: column; gap: 4px;">
              <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.check} Guaranteed Quality</span>
              <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.check} Zero Fraud Guarantee</span>
            </div>
          </div>
        </aside>

        <!-- Jiji Right Main Product Feed -->
        <main class="jiji-feed">
          <div class="jiji-feed-header">
            <div>
              <h2 class="jiji-feed-title">
                ${activeCategory
      ? activeCategory.name
      : state.typeFilter === 'goods'
        ? 'Verified Commercial Goods'
        : state.typeFilter === 'services'
          ? 'Verified Professional Services'
          : 'Trending Commercial Listings in Kenya'}
              </h2>
              <span style="font-size: 0.85rem; color: var(--slate-500);">
                Showing <strong>${publishedProducts.length}</strong> verified listings
              </span>
            </div>

            <div>
              <select id="feedSortSelect" class="form-select-sm">
                <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Recommended / Trending</option>
                <option value="price-low" ${state.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-high" ${state.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                <option value="newest" ${state.sortBy === 'newest' ? 'selected' : ''}>Newest First</option>
              </select>
            </div>
          </div>

          <!-- Product Grid -->
          ${publishedProducts.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon" style="color: var(--slate-400);">${icons.search}</div>
              <h3>No listings found matching your criteria</h3>
              <p>Try resetting filters or searching with different keywords.</p>
              <button class="btn btn-primary btn-sm" id="resetJijiFiltersBtn">View All Listings</button>
            </div>
          ` : `
            <div class="jiji-grid">
              ${publishedProducts.map(p => renderJijiCard(p, state)).join('')}
            </div>
          `}
        </main>
      </div>
    </div>
  `;

  // Bind Events
  container.querySelector('#jijiSearchBtn')?.addEventListener('click', () => {
    store.state.searchFilter = container.querySelector('#jijiSearchInput')?.value.trim() || '';
    store.state.locationFilter = container.querySelector('#jijiLocationSelect')?.value || 'all';
    store.save();
  });

  container.querySelector('#jijiLocationSelect')?.addEventListener('change', (e) => {
    store.state.locationFilter = e.target.value;
    store.save();
  });

  container.querySelector('#jijiSearchInput')?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') container.querySelector('#jijiSearchBtn')?.click();
  });

  // Category pills selection (Single Source for categories)
  container.querySelectorAll('.jiji-cat-pill').forEach(el => {
    el.addEventListener('click', () => {
      const cat = el.getAttribute('data-cat');
      store.state.categoryFilter = cat;
      store.save();
    });
  });

  // Type filter buttons
  container.querySelectorAll('.btn-filter-type').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-type');
      store.state.typeFilter = t;
      store.save();
    });
  });

  // Remove individual active filter chips
  container.querySelector('#removeCatFilterBtn')?.addEventListener('click', () => {
    store.state.categoryFilter = 'all';
    store.save();
  });
  container.querySelector('#removeTypeFilterBtn')?.addEventListener('click', () => {
    store.state.typeFilter = 'all';
    store.save();
  });
  container.querySelector('#removeLocFilterBtn')?.addEventListener('click', () => {
    store.state.locationFilter = 'all';
    store.save();
  });
  container.querySelector('#removeSearchFilterBtn')?.addEventListener('click', () => {
    store.state.searchFilter = '';
    store.save();
  });
  container.querySelector('#removePriceFilterBtn')?.addEventListener('click', () => {
    store.state.priceMax = 1000000;
    store.save();
  });
  container.querySelector('#clearAllFiltersChipBtn')?.addEventListener('click', () => {
    store.state.searchFilter = '';
    store.state.categoryFilter = 'all';
    store.state.locationFilter = 'all';
    store.state.typeFilter = 'all';
    store.state.priceMax = 1000000;
    store.save();
  });

  const sideRange = container.querySelector('#sidePriceRange');
  const sideDisplay = container.querySelector('#sidePriceDisplay');
  sideRange?.addEventListener('input', (e) => {
    sideDisplay.textContent = `Up to KSh ${Number(e.target.value).toLocaleString()}`;
  });
  sideRange?.addEventListener('change', (e) => {
    store.state.priceMax = Number(e.target.value);
    store.save();
  });

  container.querySelector('#feedSortSelect')?.addEventListener('change', (e) => {
    store.state.sortBy = e.target.value;
    store.save();
  });

  container.querySelector('#resetJijiFiltersBtn')?.addEventListener('click', () => {
    store.state.searchFilter = '';
    store.state.categoryFilter = 'all';
    store.state.locationFilter = 'all';
    store.state.typeFilter = 'all';
    store.state.priceMax = 1000000;
    store.save();
  });

  attachJijiCardEvents(container);
}

// -------------------------------------------------------------
// SCREEN 02 — Product & Service Catalogue (Alias to Home in Jiji style)
// -------------------------------------------------------------
function renderCatalogueScreen(container, state) {
  renderHomeScreen(container, state);
}

// -------------------------------------------------------------
// SCREEN 03 — Product Details (Verified Marketplace Layout)
// -------------------------------------------------------------
function renderProductDetailsScreen(container, state) {
  const product = store.getProduct(state.selectedProductId);

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Listing not found</h3>
        <p>This item is currently unavailable or has been archived.</p>
        <button class="btn btn-primary" id="backToJijiBtn">Back to Marketplace</button>
      </div>
    `;
    container.querySelector('#backToJijiBtn')?.addEventListener('click', () => store.navigate('home'));
    return;
  }

  const category = state.categories.find(c => c.id === product.categoryId);
  const related = state.products.filter(p => p.status === 'published' && p.id !== product.id).slice(0, 3);
  const isService = product.type === 'services' || product.type === 'service';

  container.innerHTML = `
    <div class="container-fluid" style="margin-top: 20px; margin-bottom: 60px;">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#" class="breadcrumb-link" id="detHome">Home</a>
        <span class="bc-sep">/</span>
        <a href="#" class="breadcrumb-link" id="detCat">${category ? escapeHtml(category.name) : 'Commercial'}</a>
        <span class="bc-sep">/</span>
        <span class="bc-curr">${escapeHtml(product.name)}</span>
      </nav>

      <div class="jiji-detail-layout">
        <!-- Left: Listing Media & Full Description -->
        <div class="jiji-main-detail-card">
          <!-- Main Photo Gallery -->
          <div class="jiji-detail-gallery">
            <img src="${product.images[0] || 'assets/images/chair.jpg'}" alt="${escapeHtml(product.name)}" />
          </div>

          <h1 class="jiji-detail-title">${escapeHtml(product.name)}</h1>

          <div class="jiji-detail-meta-bar">
            <span style="display: inline-flex; align-items: center; gap: 5px;">${icons.mapPin} ${product.location || 'Nairobi Central'}</span>
            <span style="display: inline-flex; align-items: center; gap: 5px;">${icons.clock} Quality Inspected & Verified</span>
            <span style="display: inline-flex; align-items: center; gap: 5px; color: var(--accent-gold-dark); font-weight: 600;">${icons.star} 4.9 (18 Verified Buyers)</span>
          </div>

          <!-- Specifications Table -->
          <h3 style="font-size: 1.15rem; margin-top: 24px; margin-bottom: 12px;">Key Specifications & Terms</h3>
          <div class="jiji-specs-grid">
            <div class="jiji-spec-item">
              <span class="jiji-spec-label">Condition:</span>
              <span class="jiji-spec-val">Brand New (Factory Sealed & Inspected)</span>
            </div>
            <div class="jiji-spec-item">
              <span class="jiji-spec-label">Item Type:</span>
              <span class="jiji-spec-val">${isService ? 'Commercial Service' : 'Commercial Equipment'}</span>
            </div>
            ${Object.entries(product.specs || {}).map(([k, v]) => `
              <div class="jiji-spec-item">
                <span class="jiji-spec-label">${escapeHtml(k)}:</span>
                <span class="jiji-spec-val">${escapeHtml(String(v))}</span>
              </div>
            `).join('')}
          </div>

          <!-- Full Description -->
          <h3 style="font-size: 1.15rem; margin-top: 24px; margin-bottom: 12px;">Description</h3>
          <p style="font-size: 0.95rem; color: var(--slate-700); line-height: 1.7; white-space: pre-line;">
            ${escapeHtml(product.description)}
          </p>
        </div>

        <!-- Right: Sticky Price & Order Action Card -->
        <aside class="jiji-detail-aside">
          <div class="jiji-action-card jiji-broker-card">
            <div>
              ${isService ? `
                <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #047857; background: #dcfce7; padding: 5px 12px; border-radius: 999px; display: inline-block;">
                  Verified Commercial Service
                </span>
                <p style="font-size: 0.88rem; color: var(--slate-600); margin: 10px 0 0; line-height: 1.5;">
                  Direct consultation and details arranged via Connectify WhatsApp Desk (+254 700 000 000).
                </p>
              ` : `
                <div style="font-size: 1.05rem; font-weight: 700; color: var(--slate-900); margin-bottom: 6px; line-height: 1.35;">${escapeHtml(product.name)}</div>
                <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--slate-500);">Selling Price</span>
                <div class="jiji-price-huge">KSh ${product.sellingPrice.toLocaleString()}</div>
                <small style="color: var(--slate-500); font-size: 0.82rem;">Direct delivery throughout Kenya via Connectify Logistics</small>
              `}
            </div>

            <!-- Fulfillment Badge Profile -->
            <div class="jiji-merchant-profile jiji-broker-profile">
              <div class="jiji-merchant-avatar jiji-broker-avatar" style="display: flex; align-items: center; justify-content: center; color: var(--jiji-green);">${icons.shieldCheck}</div>
              <div>
                <div class="jiji-action-title jiji-broker-title">Connectify Fulfillment Desk</div>
                <div class="jiji-action-sub jiji-broker-sub" style="display: inline-flex; align-items: center; gap: 4px;">${icons.check} Quality Guaranteed & Inspected</div>
                <div style="font-size: 0.75rem; color: var(--slate-500);">Direct verified merchant fulfillment</div>
              </div>
            </div>

            <!-- Action Buttons: Service Direct WhatsApp vs Goods Add to Cart -->
            ${isService ? `
              <button class="btn btn-primary btn-block btn-lg" id="btnDetailServiceInquire" style="background: #25d366; border-color: #25d366; color: white; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; padding: 14px; font-size: 1rem; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);">
                ${icons.whatsapp}
                <span>Connect on WhatsApp for Details</span>
              </button>
              <button class="jiji-btn-contact jiji-btn-phone" id="btnDetailPhone" style="margin-top: 10px;">
                ${icons.phone}
                <span>Call Support Desk (+254 700 000 000)</span>
              </button>
            ` : `
              <button class="btn btn-primary btn-block btn-lg" id="btnDetailBuy">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span>Add to Cart / Buy Now</span>
              </button>
              <button class="jiji-btn-contact jiji-btn-whatsapp" id="btnDetailWhatsApp" style="margin-top: 10px; border-color: #25d366; color: #15803d; background: #f0fdf4;">
                ${icons.whatsapp}
                <span>Connect on WhatsApp for Details</span>
              </button>
              <button class="jiji-btn-contact jiji-btn-phone" id="btnDetailPhone" style="margin-top: 8px;">
                ${icons.phone}
                <span>Call Support Desk (+254 700 000 000)</span>
              </button>
            `}

            <!-- Safety & Escrow Tips -->
            <div class="jiji-safety-box">
              <div class="jiji-safety-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>Connectify Buyer Protection</span>
              </div>
              <ul style="padding-left: 18px; line-height: 1.5;">
                <li>Connectify inspects all items from vetted suppliers before doorstep dispatch.</li>
                <li>M-Pesa payment is held in escrow until receipt.</li>
                <li>Official VAT receipt issued by Connectify.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <!-- Related Ads -->
      ${related.length > 0 ? `
        <div style="margin-top: 50px;">
          <h2 style="font-size: 1.4rem; margin-bottom: 20px;">More Verified Commercial Ads</h2>
          <div class="jiji-grid">
            ${related.map(p => renderJijiCard(p, state)).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Bind Events
  container.querySelector('#detHome')?.addEventListener('click', (e) => { e.preventDefault(); store.navigate('home'); });
  container.querySelector('#detCat')?.addEventListener('click', (e) => { e.preventDefault(); store.state.categoryFilter = product.categoryId; store.navigate('home'); });

  container.querySelector('#btnDetailBuy')?.addEventListener('click', () => {
    store.addToCart(product.id, 1);
    window.showToast(`Added "${product.name}" to cart! Opening checkout...`, 'success');
    store.navigate('cart');
  });

  container.querySelector('#btnDetailServiceInquire')?.addEventListener('click', () => {
    openWhatsAppDirect(product);
  });

  container.querySelector('#btnDetailWhatsApp')?.addEventListener('click', () => {
    openWhatsAppDirect(product);
  });

  container.querySelector('#btnDetailPhone')?.addEventListener('click', () => {
    showPhoneModal();
  });

  attachJijiCardEvents(container);
}

// -------------------------------------------------------------
// Jiji Product Card Component
// -------------------------------------------------------------
function renderJijiCard(p, state) {
  const category = state.categories.find(c => c.id === p.categoryId);
  const isService = p.type === 'services' || p.type === 'service';
  const hasPrice = !isService && typeof p.sellingPrice === 'number';

  return `
    <div class="jiji-item-card" data-product-id="${p.id}">
      <div class="jiji-item-media">
        <img src="${p.images[0] || 'assets/images/chair.jpg'}" alt="${escapeHtml(p.name)}" loading="lazy" />
        <span class="jiji-badge-top">${isService ? 'SERVICE' : 'VERIFIED'}</span>
        ${isService ? `
          <span class="jiji-badge-inspected" style="display: inline-flex; align-items: center; gap: 4px; background: #064e3b; color: white;">
            ${icons.shieldCheck} Service
          </span>
        ` : `
          <span class="jiji-badge-inspected jiji-badge-broker" style="display: inline-flex; align-items: center; gap: 4px;">
            ${icons.shieldCheck} Inspected
          </span>
        `}
      </div>

      <div class="jiji-item-body">
        <h3 class="jiji-item-title" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</h3>
        ${hasPrice ? `
          <div class="jiji-price-tag">
            KSh ${p.sellingPrice.toLocaleString()}
          </div>
        ` : ''}
        <p class="jiji-item-desc">${escapeHtml(p.description)}</p>

        <div class="jiji-item-meta">
          <div class="jiji-loc-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${p.location || 'Nairobi'}</span>
          </div>
          <span style="color: var(--jiji-green); font-weight: 700;">${isService ? 'Available' : 'In Stock'}</span>
        </div>

        <div class="jiji-actions-row">
          <button class="btn-jiji-call btn-card-call" data-product-id="${p.id}" title="Call Support" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            ${icons.phone} <span>Call</span>
          </button>
          <button class="btn-jiji-wa btn-card-wa" data-product-id="${p.id}" title="Connect on WhatsApp" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            ${icons.whatsapp} <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function attachJijiCardEvents(container) {
  container.querySelectorAll('.jiji-item-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-jiji-call') || e.target.closest('.btn-jiji-wa')) return;
      const pid = card.getAttribute('data-product-id');
      store.navigate('details', { productId: pid });
    });
  });

  container.querySelectorAll('.btn-card-call').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhoneModal();
    });
  });

  container.querySelectorAll('.btn-card-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-product-id');
      const prod = store.getProduct(pid);
      if (prod) openWhatsAppDirect(prod);
    });
  });
}

// -------------------------------------------------------------
// Direct WhatsApp Connection & Phone Modal
// -------------------------------------------------------------
export function openWhatsAppDirect(product) {
  if (!product) {
    window.open('https://wa.me/254700000000?text=' + encodeURIComponent('Hello Connectify Support Desk, I would like to inquire about products and services on the platform.'), '_blank', 'noopener,noreferrer');
    return;
  }
  const isService = product.type === 'services' || product.type === 'service';
  let message = '';
  if (isService) {
    message = `Hello Connectify Support Desk,

I would like to inquire about this service:
🛠️ *${product.name}*
📍 *Location:* ${product.location || 'Nairobi Dispatch'}
🆔 *Service Ref:* ${product.id}

Please share more details on availability, execution scope, and next steps.`;
  } else {
    const priceStr = product.sellingPrice ? `\n💰 *Price:* KSh ${product.sellingPrice.toLocaleString()}` : '';
    message = `Hello Connectify Support Desk,

I would like to inquire about ordering:
📦 *${product.name}*${priceStr}
📍 *Location:* ${product.location || 'Nairobi Dispatch'}
🆔 *Item Ref:* ${product.id}

Please confirm availability and doorstep delivery details.`;
  }

  if (typeof store?.logWhatsAppInquiry === 'function') {
    store.logWhatsAppInquiry({
      customerName: store.state.auth?.user?.name || 'Storefront Visitor',
      customerPhone: store.state.auth?.user?.phone || '+254 700 000 000',
      text: message,
      productId: product.id,
      productName: product.name
    });
  }

  const url = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  if (typeof window.showToast === 'function') {
    window.showToast(`Connecting directly to WhatsApp (+254 700 000 000)...`, 'info');
  }
}

function showWhatsAppModal(product) {
  return openWhatsAppDirect(product);
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active animate-fade-in';

  const authUser = store.state.auth?.user;
  const defaultName = authUser ? authUser.name : '';
  const defaultPhone = authUser ? authUser.phone : '';
  const isService = product.type === 'services' || product.type === 'service';
  const hasPrice = !isService && typeof product.sellingPrice === 'number';
  const priceDisplay = hasPrice ? `KSh ${product.sellingPrice.toLocaleString()}` : '';

  modal.innerHTML = `
    <div class="modal-card animate-pop-in" style="max-width: 540px; border-top: 6px solid #25d366; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35);">
      <div class="modal-header" style="background: #ffffff; padding: 18px 24px; border-bottom: 1px solid #e2e8f0;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: #25d366; color: white; width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);">
            ${icons.whatsapp}
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a; font-weight: 700;">${isService ? 'Connectify Verified Service Desk' : 'Connectify WhatsApp Support Desk'}</h3>
            <span style="font-size: 0.78rem; color: #16a34a; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
              ● Online · Direct Hotline: +254 700 000 000
            </span>
          </div>
        </div>
        <button class="modal-close-btn" id="closeWaModal" aria-label="Close" style="background: #f1f5f9; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; color: #64748b;">
          ${icons.close}
        </button>
      </div>

      <div class="modal-body" style="background: #f8fafc; padding: 20px 24px;">
        <!-- Product Reference Banner -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 14px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
          <img 
            src="${product.images && product.images[0] ? product.images[0] : 'assets/images/chair.jpg'}" 
            alt="${escapeHtml(product.name)}" 
            style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; flex-shrink: 0;"
          />
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 0.75rem; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 4px;">
              ${icons.shieldCheck} ${isService ? 'Verified Commercial Service' : 'Verified Listing'}
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(product.name)}">
              ${escapeHtml(product.name)}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2px;">
              ${hasPrice ? `<span style="font-weight: 800; color: #047857; font-size: 1rem;">${priceDisplay}</span>` : `<span style="font-size: 0.78rem; font-weight: 600; color: #047857;">Commercial Service</span>`}
              <span style="font-size: 0.75rem; color: #64748b;">${escapeHtml(product.location || 'Nairobi Dispatch')}</span>
            </div>
          </div>
        </div>

        <!-- Quick Inquiry Presets -->
        <div style="margin-bottom: 12px;">
          <div style="font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.03em;">
            ${isService ? 'Service Inquiry Presets:' : 'Quick Question Presets:'}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${isService ? `
              <button type="button" class="wa-preset-chip" data-preset="Hi, what materials and project details are needed for an accurate scope quotation?" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                🛠️ Scope & Materials
              </button>
              <button type="button" class="wa-preset-chip" data-preset="Can we arrange a site survey or assessment consultation for this service?" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                📍 Site Survey
              </button>
              <button type="button" class="wa-preset-chip" data-preset="How long does this project typically take and what are your payment terms?" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                ⏱️ Project Timeline
              </button>
              <button type="button" class="wa-preset-chip" data-preset="I am ready to proceed with this service. Please connect me with the project coordinator." style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                🚀 Proceed with Booking
              </button>
            ` : `
              <button type="button" class="wa-preset-chip" data-preset="Hi, can you confirm stock availability and how soon this can be delivered?" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                📦 Check Availability
              </button>
              <button type="button" class="wa-preset-chip" data-preset="What is the delivery fee and timeframe to my location?" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                🚚 Delivery Cost
              </button>
              <button type="button" class="wa-preset-chip" data-preset="Hi, do you offer discounts for bulk orders or official proforma invoicing?" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                🏷️ Bulk Discount
              </button>
              <button type="button" class="wa-preset-chip" data-preset="I am ready to buy now via M-Pesa. How do we proceed with inspection and dispatch?" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 10px; font-size: 0.76rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.15s;">
                ⚡ Buy via M-Pesa
              </button>
            `}
          </div>
        </div>

        <!-- Inquiry Textarea -->
        <div class="form-group" style="margin-bottom: 14px;">
          <label style="font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px; display: block;">
            Your Message to Connectify Central Desk:
          </label>
          <textarea 
            id="waMessageInput" 
            class="form-textarea" 
            rows="3" 
            style="background: #ffffff; font-size: 0.92rem; border: 1px solid #cbd5e1; border-radius: 8px; width: 100%; padding: 10px 12px; line-height: 1.5; font-family: inherit;"
          >${isService
      ? `Hi Connectify Desk, I would like to inquire about "${escapeHtml(product.name)}". Please let me know the details and steps to proceed.`
      : `Hi Connectify Support, I would like to order "${escapeHtml(product.name)}" (${priceDisplay}). Can you please confirm current availability and delivery details to my address?`
    }</textarea>
        </div>

        <!-- Optional Name & Phone for personalized support -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 4px; display: block;">Your Name (Optional):</label>
            <input 
              type="text" 
              id="waClientName" 
              class="form-input" 
              placeholder="e.g. Brian Omondi" 
              value="${escapeHtml(defaultName)}" 
              style="width: 100%; padding: 8px 10px; font-size: 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px;"
            />
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 4px; display: block;">Phone / WhatsApp (Optional):</label>
            <input 
              type="tel" 
              id="waClientPhone" 
              class="form-input" 
              placeholder="+254 7XX XXX XXX" 
              value="${escapeHtml(defaultPhone)}" 
              style="width: 100%; padding: 8px 10px; font-size: 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px;"
            />
          </div>
        </div>
      </div>

      <div class="modal-footer" style="background: #ffffff; padding: 16px 24px; border-top: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-outline" id="cancelWaModal" style="padding: 10px 16px; border-radius: 8px; font-weight: 600;">
          Cancel
        </button>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-outline" id="sendInAppWaModal" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 14px; font-size: 0.85rem; font-weight: 600; border-radius: 8px;">
            ${icons.messageSquare}
            <span>In-App Desk</span>
          </button>
          <button class="btn btn-primary" id="sendWaModal" style="background: #25d366; border-color: #25d366; color: white; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; padding: 11px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4); cursor: pointer;">
            ${icons.whatsapp}
            <span>${isService ? 'Inquire on WhatsApp (+254 700 000 000)' : 'Chat on WhatsApp (+254 700 000 000)'}</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => {
    modal.remove();
    document.removeEventListener('keydown', onEsc);
  };
  const onEsc = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onEsc);

  modal.querySelector('#closeWaModal')?.addEventListener('click', close);
  modal.querySelector('#cancelWaModal')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  // Quick preset pills click handler
  modal.querySelectorAll('.wa-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const presetText = chip.getAttribute('data-preset');
      const textarea = modal.querySelector('#waMessageInput');
      if (textarea) {
        if (isService) {
          textarea.value = `Hi Connectify Service Desk regarding "${product.name}": ${presetText}`;
        } else {
          textarea.value = `Hi Connectify Support regarding "${product.name}" (${priceDisplay}): ${presetText}`;
        }
        textarea.focus();
      }
    });
  });

  const getInquiryPayload = () => {
    const userText = modal.querySelector('#waMessageInput')?.value.trim() || `Inquiry regarding ${product.name}`;
    const clientName = modal.querySelector('#waClientName')?.value.trim() || (store.state.auth?.user?.name || 'Prospective Customer');
    const clientPhone = modal.querySelector('#waClientPhone')?.value.trim() || (store.state.auth?.user?.phone || '+254 700 000 000');

    let formattedMessage = '';
    if (isService) {
      formattedMessage =
        `Hello Connectify Support Desk,

I would like to inquire about this service:
🛠️ *${product.name}*
📍 *Location:* ${product.location || 'Nairobi Dispatch'}
🆔 *Service Ref:* ${product.id}

*My Inquiry / Project Details:*
${userText}

*Client:* ${clientName}${clientPhone ? ' (' + clientPhone + ')' : ''}`;
    } else {
      formattedMessage =
        `Hello Connectify Support Desk,

I would like to inquire about ordering:
📦 *${product.name}*
💰 *Price:* ${priceDisplay}
📍 *Location:* ${product.location || 'Nairobi Dispatch'}
🆔 *Item Ref:* ${product.id}

*Message:*
${userText}

*From:* ${clientName}${clientPhone ? ' (' + clientPhone + ')' : ''}`;
    }

    return { userText, clientName, clientPhone, formattedMessage };
  };

  // Launch WhatsApp Web / App
  modal.querySelector('#sendWaModal')?.addEventListener('click', () => {
    const { clientName, clientPhone, formattedMessage } = getInquiryPayload();

    // 1. Log WhatsApp inquiry to store for operations desk
    store.logWhatsAppInquiry({
      customerName: clientName,
      customerPhone: clientPhone,
      text: formattedMessage,
      productId: product.id,
      productName: product.name
    });

    // 2. Open WhatsApp link with prefilled message
    const cleanPhone = '254700000000';
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // 3. User confirmation
    window.showToast('Launching WhatsApp chat with Connectify Support (+254 700 000 000)...', 'success');
    close();
  });

  // Alternative: Send via In-App Support Desk
  modal.querySelector('#sendInAppWaModal')?.addEventListener('click', () => {
    const { userText, clientName, clientPhone, formattedMessage } = getInquiryPayload();

    store.logWhatsAppInquiry({
      customerName: clientName,
      customerPhone: clientPhone,
      text: formattedMessage,
      productId: product.id,
      productName: product.name
    });

    window.showToast('Inquiry logged with Connectify Central Desk! A support rep will review shortly.', 'success');
    close();

    if (typeof window.openCommDrawer === 'function') {
      window.openCommDrawer(userText);
    }
  });
}

function showPhoneModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active animate-fade-in';
  modal.innerHTML = `
    <div class="modal-card animate-pop-in" style="max-width: 440px; text-align: center; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35);">
      <div class="modal-header" style="background: #0f172a; color: white; padding: 20px 24px;">
        <h3 style="margin: 0; color: white; font-size: 1.15rem; font-weight: 700;">Connectify Direct Phone Desk</h3>
        <button class="modal-close-btn" id="closePhoneModal" aria-label="Close" style="color: white; background: rgba(255,255,255,0.15); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;">${icons.close}</button>
      </div>
      <div class="modal-body" style="padding: 30px 24px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #ecfdf5; color: #047857; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
          ${icons.phone}
        </div>
        <div style="font-size: 1.85rem; font-weight: 800; color: #0f172a; font-family: var(--font-heading); margin-bottom: 8px;">
          +254 700 000 000
        </div>
        <p style="font-size: 0.88rem; color: #64748b; margin-bottom: 24px; line-height: 1.5;">
          Connectify Central Sourcing & Order Desk<br />
          Operating Hours: Mon - Sat (8:00 AM - 6:00 PM EAT)
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a href="tel:+254700000000" class="btn btn-primary btn-block btn-lg" style="background: #064e3b; color: white; font-weight: 700; padding: 14px; text-decoration: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${icons.phone}
            <span>Call Hotline Now</span>
          </a>
          <button class="btn btn-outline btn-block" id="btnPhoneModalWa" style="border-color: #25d366; color: #166534; font-weight: 700; padding: 12px; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${icons.whatsapp}
            <span>Chat on WhatsApp Desk Instead</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => {
    modal.remove();
    document.removeEventListener('keydown', onEsc);
  };
  const onEsc = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onEsc);

  modal.querySelector('#closePhoneModal')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  modal.querySelector('#btnPhoneModalWa')?.addEventListener('click', () => {
    close();
    window.open('https://wa.me/254700000000?text=' + encodeURIComponent('Hello Connectify Support Desk, I would like to inquire regarding products on the platform.'), '_blank', 'noopener,noreferrer');
  });
}


// -------------------------------------------------------------
// Interactive Scope & Custom BQ Modal for Variable Services
// -------------------------------------------------------------
function showScopeQuoteModal(product) {
  openWhatsAppDirect(product);
}

// -------------------------------------------------------------
// CART, CHECKOUT, TRACKING
// -------------------------------------------------------------
function renderCartScreen(container, state) {
  const cartData = store.getCartDetails();

  container.innerHTML = `
    <div class="container-fluid" style="margin-top: 24px; margin-bottom: 60px;">
      <nav class="breadcrumb">
        <a href="#" class="breadcrumb-link" id="cartHome">Home</a>
        <span class="bc-sep">/</span>
        <span class="bc-curr">Shopping Cart</span>
      </nav>

      <div class="cart-header-row">
        <div>
          <h1 class="page-title">Review Your Order Items</h1>
          <p class="page-subtitle">Centralized checkout verified with manufacturer warranties</p>
        </div>
        ${cartData.items.length > 0 ? `
          <button class="btn btn-outline btn-sm text-danger" id="clearCartBtn">Clear Cart</button>
        ` : ''}
      </div>

      ${cartData.items.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon" style="color: var(--slate-400);">${icons.shoppingCart}</div>
          <h3>Your cart is empty</h3>
          <p>Explore thousands of verified commercial goods and services on the marketplace.</p>
          <button class="btn btn-primary" id="cartShopNow">Browse Marketplace</button>
        </div>
      ` : `
        <div class="cart-layout">
          <div class="cart-items-card">
            ${cartData.items.map(ci => `
              <div class="cart-item-row" data-product-id="${ci.productId}">
                <div class="cart-item-media">
                  <img src="${ci.product.images[0] || 'assets/images/chair.jpg'}" alt="${escapeHtml(ci.product.name)}" />
                </div>
                <div class="cart-item-info">
                  <div class="cart-item-title-row">
                    <h4 class="cart-item-title" data-product-id="${ci.productId}">${escapeHtml(ci.product.name)}</h4>
                    <button class="cart-remove-btn" data-product-id="${ci.productId}" aria-label="Remove item" title="Remove">${icons.trash}</button>
                  </div>
                  <div class="cart-item-calc">
                    <div class="qty-stepper-sm">
                      <button class="cart-qty-btn minus" data-product-id="${ci.productId}">-</button>
                      <span class="cart-qty-val">${ci.quantity}</span>
                      <button class="cart-qty-btn plus" data-product-id="${ci.productId}">+</button>
                    </div>
                    <div class="cart-item-pricing">
                      <span class="unit-price">KSh ${ci.unitPrice.toLocaleString()} each</span>
                      <span class="total-item-price">KSh ${ci.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <aside class="cart-summary-sidebar">
            <div class="summary-card">
              <h3 class="summary-title">Order Total</h3>
              <div class="summary-row">
                <span>Subtotal (${cartData.count} items):</span>
                <strong>KSh ${cartData.subtotal.toLocaleString()}</strong>
              </div>
              <div class="summary-row">
                <span>Estimated Freight:</span>
                <strong>${cartData.deliveryFee === 0 ? 'FREE' : `KSh ${cartData.deliveryFee.toLocaleString()}`}</strong>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-total-row">
                <span>Total:</span>
                <span class="summary-total-val">KSh ${cartData.total.toLocaleString()}</span>
              </div>
              <button class="btn btn-primary btn-block btn-lg" id="cartCheckoutBtn" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span>Proceed to Checkout</span>
                ${icons.arrowRight}
              </button>
            </div>
          </aside>
        </div>
      `}
    </div>
  `;

  // Bind
  container.querySelector('#cartHome')?.addEventListener('click', (e) => { e.preventDefault(); store.navigate('home'); });
  container.querySelector('#cartShopNow')?.addEventListener('click', () => store.navigate('home'));
  container.querySelector('#cartCheckoutBtn')?.addEventListener('click', () => store.navigate('checkout'));

  container.querySelector('#clearCartBtn')?.addEventListener('click', () => {
    if (confirm('Clear all items from your cart?')) store.clearCart();
  });

  container.querySelectorAll('.cart-qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-product-id');
      const item = state.cart.find(c => c.productId === pid);
      if (item) store.updateCartQty(pid, item.quantity - 1);
    });
  });

  container.querySelectorAll('.cart-qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-product-id');
      const item = state.cart.find(c => c.productId === pid);
      if (item) store.updateCartQty(pid, item.quantity + 1);
    });
  });

  container.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-product-id');
      store.removeFromCart(pid);
      window.showToast('Item removed from cart', 'info');
    });
  });
}

function renderCheckoutScreen(container, state) {
  const cartData = store.getCartDetails();
  if (cartData.items.length === 0) {
    store.navigate('cart');
    return;
  }

  container.innerHTML = `
    <div class="container-fluid" style="margin-top: 24px; margin-bottom: 60px;">
      <h1 class="page-title">Secure M-Pesa Checkout</h1>
      <p class="page-subtitle">Connectify coordinates verified supplier sourcing and doorstep freight</p>

      <div class="checkout-layout">
        <form id="chkForm" class="checkout-form">
          <div class="form-section-card">
            <h3>1. Customer & Delivery Destination</h3>
            <div class="form-grid-2 mt-4">
              <div class="form-group">
                <label>Your Name *</label>
                <input type="text" id="chkName" class="form-input" required value="David Kiarie" />
              </div>
              <div class="form-group">
                <label>M-Pesa Phone Number *</label>
                <input type="tel" id="chkPhone" class="form-input" required value="+254 712 900 800" />
              </div>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label>County / City *</label>
                <select id="chkCounty" class="form-select">
                  <option value="Nairobi" selected>Nairobi County</option>
                  <option value="Mombasa">Mombasa County</option>
                  <option value="Nakuru">Nakuru County</option>
                  <option value="Kisumu">Kisumu County</option>
                  <option value="Uasin Gishu">Uasin Gishu (Eldoret)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Estate / Building / Street *</label>
                <input type="text" id="chkAddress" class="form-input" required value="Westlands, Commercial Arcade 3rd Flr" />
              </div>
            </div>
          </div>

          <div class="form-section-card">
            <h3>2. M-Pesa Buy Goods Till (Simulated)</h3>
            <div class="payment-option-card active mt-4">
              <div class="payment-card-body">
                <strong>Connectify Buy Goods Till: ${state.settings.mpesaTill}</strong>
                <p style="font-size: 0.85rem; color: #555; margin-top: 4px;">
                  Payment reference pre-populated for this prototype demonstration.
                </p>
              </div>
            </div>
            <div class="form-group mt-4">
              <label>M-Pesa Transaction Confirmation Code:</label>
              <input type="text" id="chkMpesaRef" class="form-input" value="QKP${Math.floor(1000 + Math.random() * 9000)}B" />
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-xl">
            Confirm & Place Order (KSh ${cartData.total.toLocaleString()})
          </button>
        </form>

        <aside class="checkout-summary-column">
          <div class="summary-card">
            <h3>Order Summary</h3>
            <div class="checkout-items-list">
              ${cartData.items.map(i => `
                <div class="checkout-item-row">
                  <div><strong>${i.quantity} ×</strong> ${escapeHtml(i.product.name)}</div>
                  <div>KSh ${i.totalPrice.toLocaleString()}</div>
                </div>
              `).join('')}
            </div>
            <div class="summary-divider"></div>
            <div class="summary-total-row">
              <span>Total Payable:</span>
              <span class="summary-total-val">KSh ${cartData.total.toLocaleString()}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;

  container.querySelector('#chkForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cust = {
      name: container.querySelector('#chkName').value.trim(),
      phone: container.querySelector('#chkPhone').value.trim(),
      county: container.querySelector('#chkCounty').value,
      deliveryAddress: container.querySelector('#chkAddress').value.trim(),
      email: 'customer@connectify.co.ke'
    };
    const ref = container.querySelector('#chkMpesaRef').value.trim();
    const order = store.createOrder(cust, 'M-Pesa Buy Goods Till', ref);
    if (order) {
      window.showToast(`Order ${order.id} placed! Tracking details ready.`, 'success');
      store.navigate('tracking', { orderId: order.id });
    }
  });
}

function renderTrackingScreen(container, state) {
  const currentOrderId = state.selectedOrderId || (state.orders.length > 0 ? state.orders[0].id : null);
  const order = state.orders.find(o => o.id === currentOrderId);

  container.innerHTML = `
    <div class="container-fluid" style="margin-top: 24px; margin-bottom: 60px;">
      <h1 class="page-title">Track Customer Order</h1>
      <p class="page-subtitle">Real-time status of multi-merchant sourcing, dispatch, and delivery</p>

      <div class="demo-orders-bar" style="margin-top: 16px;">
        <span>Quick Select Demo Order:</span>
        ${state.orders.map(o => `
          <button class="btn-order-chip ${o.id === currentOrderId ? 'active' : ''}" data-oid="${o.id}">
            ${o.id} · ${o.customer.name} (${o.status})
          </button>
        `).join('')}
      </div>

      ${!order ? `
        <div class="empty-state"><h3>Order Not Found</h3></div>
      ` : `
        <div class="tracking-content-grid" style="margin-top: 20px;">
          <div class="tracking-main-card">
            <div class="tracking-status-banner">
              <div>
                <span class="ref-kicker">Order Reference</span>
                <h2 class="order-id-title">${order.id}</h2>
              </div>
              <span class="badge ${order.status === 'Completed' ? 'badge-emerald' : 'badge-warning'} badge-lg">
                ${order.status}
              </span>
            </div>

            <div class="tracking-timeline-container">
              <h3 class="timeline-title">Fulfillment Timeline</h3>
              <div class="timeline-stepper">
                ${order.timeline.map((step, idx) => `
                  <div class="timeline-step ${step.done ? 'step-done' : 'step-pending'}">
                    <div class="step-indicator" style="display: flex; align-items: center; justify-content: center;">
                      ${step.done ? icons.check : idx + 1}
                    </div>
                    <div class="step-details">
                      <strong class="step-label">${escapeHtml(step.step)}</strong>
                      <span class="step-time">${escapeHtml(step.time)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="tracking-items-section">
              <h3 class="section-title-sm">Items in this Delivery</h3>
              <div class="dash-table-wrapper">
                <table class="admin-table">
                  <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                  <tbody>
                    ${order.items.map(i => `
                      <tr>
                        <td><strong>${escapeHtml(i.productName)}</strong></td>
                        <td>${i.quantity}</td>
                        <td>KSh ${i.unitPrice.toLocaleString()}</td>
                        <td><strong>KSh ${(i.quantity * i.unitPrice).toLocaleString()}</strong></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside class="tracking-aside">
            <div class="tracking-info-card">
              <h3>Recipient Details</h3>
              <div class="info-block">
                <strong>Customer:</strong>
                <div>${escapeHtml(order.customer.name)} (${escapeHtml(order.customer.phone)})</div>
              </div>
              <div class="info-block">
                <strong>Delivery Address:</strong>
                <div>${escapeHtml(order.customer.deliveryAddress)}, ${escapeHtml(order.customer.county)}</div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-total-row">
                <span>Total Paid:</span>
                <span class="summary-total-val">KSh ${order.pricing.totalAmount.toLocaleString()}</span>
              </div>
              <button class="btn btn-outline btn-block" onclick="window.print()">Print Receipt</button>
            </div>
          </aside>
        </div>
      `}
    </div>
  `;

  container.querySelectorAll('.btn-order-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const oid = btn.getAttribute('data-oid');
      store.navigate('tracking', { orderId: oid });
    });
  });
}

function getCategorySvg(catId) {
  switch (catId) {
    case 'cat-furniture': return icons.chair;
    case 'cat-interior': return icons.home;
    case 'cat-gas': return icons.flame;
    case 'cat-roofing': return icons.roof;
    case 'cat-photography': return icons.camera;
    case 'cat-cyber': return icons.monitor;
    case 'cat-academic': return icons.bookOpen;
    case 'cat-airbnbs': return icons.bed;
    case 'cat-cabs': return icons.car;
    case 'cat-transport': return icons.truck;
    case 'cat-travel': return icons.compass;
    case 'cat-branding': return icons.printer;
    case 'cat-laptops': return icons.laptop;
    case 'cat-laptop-acc': return icons.charger;
    case 'cat-phones': return icons.smartphone;
    case 'cat-phone-acc': return icons.sticker;
    case 'cat-solar': return icons.sun;
    case 'cat-facility': return icons.sparkles;
    case 'cat-security': return icons.shield;
    case 'cat-hardware': return icons.tool;
    case 'cat-kitchen': return icons.utensils;
    default: return icons.package;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
