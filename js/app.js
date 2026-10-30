// CONNECTIFY — Application Root & Controller
// Multi-Merchant Architecture · Zero "broker" terminology · Role-Based Navigation & Auth

import { store } from './store.js';
import { renderCustomerScreen } from './customer.js';
import { renderAdminScreen } from './admin.js';
import { icons } from './icons.js';
import { initCommDesk } from './comm.js';

// Global toast notification system
window.showToast = function (message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type} animate-slide-in`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">
        ${type === 'success' ? icons.check : type === 'warning' ? '!' : type === 'danger' ? icons.close : 'i'}
      </span>
      <span class="toast-message">${escapeHtml(message)}</span>
    </div>
    <button class="toast-close" aria-label="Close notification">${icons.close}</button>
  `;

  toastContainer.appendChild(toast);

  const removeToast = () => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 250);
  };

  toast.querySelector('.toast-close').addEventListener('click', removeToast);
  setTimeout(removeToast, 4500);
};

// Global Authentication Modal Opener
window.openAuthModal = function (activeTab = 'customer') {
  let modalOverlay = document.getElementById('authModalOverlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'authModalOverlay';
    modalOverlay.className = 'modal-backdrop';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="modal-box modal-auth animate-pop-in" style="max-width: 520px; width: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);">
      <div class="modal-header-auth" style="background: linear-gradient(135deg, #0f172a, #064e3b); color: white; padding: 24px; position: relative;">
        <button class="modal-close-btn" id="closeAuthModal" style="position: absolute; top: 16px; right: 16px; color: #fff; opacity: 0.8; font-size: 1.2rem; cursor: pointer; background: rgba(255,255,255,0.1); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
          ${icons.close}
        </button>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <div style="background: var(--jiji-green); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
            ${icons.shieldCheck}
          </div>
          <div>
            <h3 style="color: white; font-size: 1.3rem; margin: 0; font-family: var(--font-heading); font-weight: 700;">Connectify Access Portal</h3>
            <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Verified Marketplace & Operations Management</p>
          </div>
        </div>
      </div>

      <!-- Auth Tabs -->
      <div class="auth-tabs" style="display: flex; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
        <button class="auth-tab-btn ${activeTab === 'customer' ? 'active' : ''}" id="tabBtnCustomer" style="flex: 1; padding: 14px 16px; font-weight: 700; font-size: 0.92rem; border-bottom: 3px solid ${activeTab === 'customer' ? 'var(--jiji-green)' : 'transparent'}; color: ${activeTab === 'customer' ? 'var(--jiji-green-dark)' : '#64748b'}; text-align: center; cursor: pointer;">
          <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.user} Customer / Buyer</span>
        </button>
        <button class="auth-tab-btn ${activeTab === 'admin' ? 'active' : ''}" id="tabBtnAdmin" style="flex: 1; padding: 14px 16px; font-weight: 700; font-size: 0.92rem; border-bottom: 3px solid ${activeTab === 'admin' ? 'var(--jiji-green)' : 'transparent'}; color: ${activeTab === 'admin' ? 'var(--jiji-green-dark)' : '#64748b'}; text-align: center; cursor: pointer;">
          <span style="display: inline-flex; align-items: center; gap: 6px;">${icons.lock} Operations & Staff</span>
        </button>
      </div>

      <div class="auth-tab-body" style="padding: 24px; background: white;">
        ${activeTab === 'customer' ? `
          <!-- Buyer Login Screen -->
          <div class="demo-quick-banner" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.05em;">Client Demo Account</span>
              <span class="badge" style="background: #dcfce7; color: #15803d; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">Ready</span>
            </div>
            <p style="font-size: 0.85rem; color: #374151; margin-bottom: 12px; line-height: 1.4;">
              Sign in as a registered corporate procurement buyer to view order histories, delivery tracking, and client inquiries.
            </p>
            <button class="btn btn-sm btn-primary w-100" id="btnQuickDemoCustomer" style="background: var(--jiji-green); color: white; width: 100%; font-weight: 700; padding: 10px; border-radius: 8px;">
              1-Click Demo Buyer: Brian Omondi (Nairobi)
            </button>
          </div>

          <form id="formCustomerLogin">
            <div class="form-group" style="margin-bottom: 14px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Client Email Address</label>
              <input type="email" id="custEmailInput" class="form-control" placeholder="client@company.co.ke" value="brian.omondi@corp.co.ke" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;">
            </div>
            <div class="form-group" style="margin-bottom: 18px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Password</label>
              <input type="password" id="custPassInput" class="form-control" placeholder="••••••••" value="demo123" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;">
            </div>
            <button type="submit" class="btn btn-primary w-100" style="background: #0f172a; color: white; width: 100%; padding: 12px; font-weight: 700; border-radius: 8px;">
              Sign In as Buyer
            </button>
          </form>
        ` : `
          <!-- Operations Manager Login Screen -->
          <div class="demo-quick-banner" style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 14px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.05em;">Operations Staff Demo</span>
              <span class="badge" style="background: #fef3c7; color: #b45309; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">Admin</span>
            </div>
            <p style="font-size: 0.85rem; color: #374151; margin-bottom: 12px; line-height: 1.4;">
              Access supplier catalogues, buying price (BP) vs selling price (SP) master matrix, batch product upload, and executive P&L analytics.
            </p>
            <button class="btn btn-sm w-100" id="btnQuickDemoAdmin" style="background: #064e3b; color: white; width: 100%; font-weight: 700; padding: 10px; border-radius: 8px;">
              1-Click Demo Manager: Mercy Wanjiku (Operations Director)
            </button>
          </div>

          <form id="formAdminLogin">
            <div class="form-group" style="margin-bottom: 14px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Staff Email Address</label>
              <input type="email" id="admEmailInput" class="form-control" placeholder="operations@connectify.co.ke" value="operations@connectify.co.ke" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;">
            </div>
            <div class="form-group" style="margin-bottom: 18px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Password</label>
              <input type="password" id="admPassInput" class="form-control" placeholder="••••••••" value="admin123" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;">
            </div>
            <button type="submit" class="btn btn-primary w-100" style="background: var(--jiji-green); color: white; width: 100%; padding: 12px; font-weight: 700; border-radius: 8px;">
              Unlock Operations Console
            </button>
          </form>
        `}
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');

  // Event handlers
  const closeModal = () => {
    modalOverlay.classList.remove('active');
  };

  modalOverlay.querySelector('#closeAuthModal')?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  modalOverlay.querySelector('#tabBtnCustomer')?.addEventListener('click', () => {
    window.openAuthModal('customer');
  });

  modalOverlay.querySelector('#tabBtnAdmin')?.addEventListener('click', () => {
    window.openAuthModal('admin');
  });

  // Demo buttons
  modalOverlay.querySelector('#btnQuickDemoCustomer')?.addEventListener('click', () => {
    store.loginAsDemo('customer');
    closeModal();
    window.showToast('Signed in as Brian Omondi (Verified Client)', 'success');
  });

  modalOverlay.querySelector('#btnQuickDemoAdmin')?.addEventListener('click', () => {
    store.loginAsDemo('admin');
    closeModal();
    window.showToast('Unlocked Connectify Operations Management Console', 'success');
  });

  // Forms
  modalOverlay.querySelector('#formCustomerLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('custEmailInput').value;
    const pass = document.getElementById('custPassInput').value;
    store.login(email, pass, 'customer');
    closeModal();
    window.showToast('Welcome back! Signed in to your customer portal.', 'success');
  });

  modalOverlay.querySelector('#formAdminLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('admEmailInput').value;
    const pass = document.getElementById('admPassInput').value;
    store.login(email, pass, 'admin');
    closeModal();
    window.showToast('Authorized. Welcome to Operations & Merchant Portal.', 'success');
  });
};

// Render Global Navigation Bar with High Contrast & Role-Based Clarity
function renderHeader(state) {
  const headerContainer = document.getElementById('appHeader');
  if (!headerContainer) return;

  const cartDetails = store.getCartDetails();
  const isAdmin = state.mode === 'admin';
  const auth = state.auth || { isAuthenticated: false, role: 'customer' };

  if (isAdmin) {
    // -----------------------------------------------------------------------
    // ADMIN / OPERATIONS HEADER
    // -----------------------------------------------------------------------
    headerContainer.innerHTML = `
      <!-- Operations Status Bar -->
      <div class="admin-status-bar" style="background: #064e3b; color: #f0fdf4; padding: 9px 0; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.15);">
        <div class="container-fluid" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="pulse-dot" style="background: #34d399;"></span>
            <strong style="color: #ffffff; letter-spacing: 0.02em;">Connectify Central Sourcing & Fulfillment Console</strong>
            <span style="color: #a7f3d0; font-size: 0.8rem; border-left: 1px solid rgba(255,255,255,0.25); padding-left: 10px;">
              Staff: <strong>${auth.user ? auth.user.name : 'Mercy Wanjiku'}</strong> (${auth.user ? auth.user.title : 'Operations Director'})
            </span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <button class="btn btn-sm" id="btnAdminSwitchToCustomer" style="background: rgba(255,255,255,0.15); color: #ffffff; font-weight: 600; padding: 4px 12px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>View Public Storefront</span>
            </button>
            <button class="btn btn-sm" id="btnAdminSignOut" style="background: #ef4444; color: white; font-weight: 600; padding: 4px 12px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
              ${icons.logOut}
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Admin Header -->
      <header class="main-header admin-main-header" style="background: #ffffff; border-bottom: 2px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); position: sticky; top: 0; z-index: 90;">
        <div class="container-fluid header-flex" style="height: 70px; display: flex; align-items: center; justify-content: space-between;">
          <!-- Logo -->
          <div class="brand-logo" id="logoAdminHomeBtn" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
            <div class="brand-icon" style="background: #064e3b; color: #ffffff; width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(6, 78, 59, 0.25);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div class="brand-text">
              <span class="brand-name" style="color: #0f172a; font-size: 1.3rem; font-weight: 800; font-family: var(--font-heading); display: block; line-height: 1.1;">CONNECTIFY</span>
              <span class="brand-tagline" style="color: var(--jiji-green-dark); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">
                Operations & Merchant Portal
              </span>
            </div>
          </div>

          <!-- Navigation Links (High contrast, uncluttered) -->
          <nav class="nav-links admin-nav-links" style="display: flex; align-items: center; gap: 4px;">
            <button class="nav-link ${state.currentScreen === 'dashboard' || state.currentScreen === 'master-matrix' || state.currentScreen === 'products-db' ? 'active' : ''}" id="navAdmMasterMatrix" style="font-weight: 700; padding: 8px 14px; border-radius: 8px; color: ${state.currentScreen === 'dashboard' || state.currentScreen === 'master-matrix' || state.currentScreen === 'products-db' ? 'var(--jiji-green-dark)' : '#334155'}; background: ${state.currentScreen === 'dashboard' || state.currentScreen === 'master-matrix' || state.currentScreen === 'products-db' ? '#ecfdf5' : 'transparent'};">
              Inventory & Products (${state.products.length})
            </button>
            <button class="nav-link ${state.currentScreen === 'suppliers' ? 'active' : ''}" id="navAdmSuppliers" style="font-weight: 700; padding: 8px 14px; border-radius: 8px; color: ${state.currentScreen === 'suppliers' ? 'var(--jiji-green-dark)' : '#334155'}; background: ${state.currentScreen === 'suppliers' ? '#ecfdf5' : 'transparent'};">
              Suppliers (${state.suppliers.length})
            </button>
            <button class="nav-link ${state.currentScreen === 'orders-mgmt' ? 'active' : ''}" id="navAdmOrders" style="font-weight: 700; padding: 8px 14px; border-radius: 8px; color: ${state.currentScreen === 'orders-mgmt' ? 'var(--jiji-green-dark)' : '#334155'}; background: ${state.currentScreen === 'orders-mgmt' ? '#ecfdf5' : 'transparent'};">
              Orders (${state.orders.length})
            </button>
            <button class="nav-link ${state.currentScreen === 'communications' ? 'active' : ''}" id="navAdmComms" style="font-weight: 700; padding: 8px 14px; border-radius: 8px; color: ${state.currentScreen === 'communications' ? 'var(--jiji-green-dark)' : '#334155'}; background: ${state.currentScreen === 'communications' ? '#ecfdf5' : 'transparent'};">
              Customer Inquiries
            </button>
            <button class="nav-link ${state.currentScreen === 'reports' || state.currentScreen === 'finance' ? 'active' : ''}" id="navAdmReports" style="font-weight: 700; padding: 8px 14px; border-radius: 8px; color: ${state.currentScreen === 'reports' || state.currentScreen === 'finance' ? 'var(--jiji-green-dark)' : '#334155'}; background: ${state.currentScreen === 'reports' || state.currentScreen === 'finance' ? '#ecfdf5' : 'transparent'};">
              Reports & P&L
            </button>
          </nav>

          <!-- Header Quick Actions -->
          <div class="header-actions" style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-sm" id="btnAdminBatchModalTrigger" style="background: #f1f5f9; color: #0f172a; font-weight: 700; padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; display: inline-flex; align-items: center; gap: 6px;">
              ${icons.layers}
              <span>Batch Add (+3+)</span>
            </button>
            <button class="btn btn-sm btn-primary" id="btnAdminAddNewProduct" style="background: var(--jiji-green); color: white; font-weight: 700; padding: 8px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
              ${icons.plus}
              <span>New Product</span>
            </button>
          </div>
        </div>
      </header>
    `;

    // Admin Header Event Bindings
    headerContainer.querySelector('#btnAdminSwitchToCustomer')?.addEventListener('click', () => {
      store.setMode('customer');
      window.showToast('Previewing public storefront as a customer', 'info');
    });

    headerContainer.querySelector('#btnAdminSignOut')?.addEventListener('click', () => {
      store.logout();
      window.showToast('Signed out of operations portal', 'info');
    });

    headerContainer.querySelector('#navAdmMasterMatrix')?.addEventListener('click', () => store.navigate('master-matrix'));
    headerContainer.querySelector('#navAdmSuppliers')?.addEventListener('click', () => store.navigate('suppliers'));
    headerContainer.querySelector('#navAdmOrders')?.addEventListener('click', () => store.navigate('orders-mgmt'));
    headerContainer.querySelector('#navAdmComms')?.addEventListener('click', () => store.navigate('communications'));
    headerContainer.querySelector('#navAdmReports')?.addEventListener('click', () => store.navigate('reports'));
    headerContainer.querySelector('#btnAdminBatchModalTrigger')?.addEventListener('click', () => {
      if (typeof window.openBatchAddModal === 'function') {
        window.openBatchAddModal();
      } else {
        store.navigate('products-db');
      }
    });
    headerContainer.querySelector('#btnAdminAddNewProduct')?.addEventListener('click', () => store.navigate('add-product'));

  } else {
    // -----------------------------------------------------------------------
    // CUSTOMER / CLIENT STOREFRONT HEADER (Clean, Trusted, High-Contrast)
    // -----------------------------------------------------------------------
    headerContainer.innerHTML = `
      <!-- Top Announcement & Trust Bar (Slim & Elegant) -->
      <div class="top-announcement-bar" style="background: #0f172a; color: #f8fafc; padding: 6px 0; font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <div class="container-fluid" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="pulse-dot" style="background: var(--jiji-green); width: 7px; height: 7px; border-radius: 50%; display: inline-block;"></span>
            <span style="font-weight: 600; color: #f1f5f9;">Verified Kenya Marketplace</span>
            <span style="color: #64748b;">•</span>
            <span style="color: #cbd5e1;">Quality Inspected Before Dispatch</span>
            
          </div>

          <div style="display: flex; align-items: center; gap: 14px; font-weight: 500;">
            <a href="tel:+254700000000" style="color: #e2e8f0; display: inline-flex; align-items: center; gap: 5px; text-decoration: none;">
              ${icons.phone}
              <span style="font-weight: 600;">+254 700 000 000</span>
            </a>
            <span style="color: #475569;">|</span>
            <a href="https://wa.me/254700000000?text=${encodeURIComponent('Hello Connectify Support Desk, I would like to make an inquiry.')}" target="_blank" rel="noopener" style="color: #4ade80; display: inline-flex; align-items: center; gap: 5px; text-decoration: none; font-weight: 600;">
              ${icons.whatsapp}
              <span>WhatsApp Desk</span>
            </a>
            <span style="color: #475569;">|</span>
            <button id="custTopStaffBtn" style="color: #a7f3d0; cursor: pointer; font-size: 0.78rem; background: rgba(52, 211, 153, 0.12); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(52, 211, 153, 0.3); display: inline-flex; align-items: center; gap: 4px;">
              ${icons.lock}
              <span>Operations Portal</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Customer Navigation Header (Slim & Uncluttered) -->
      <header class="main-header" style="background: #ffffff; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 90; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
        <div class="container-fluid header-flex" style="height: 62px; display: flex; align-items: center; justify-content: space-between;">
          <!-- Brand Logo -->
          <div class="brand-logo" id="logoCustomerHomeBtn" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
            <div class="brand-icon" style="background: var(--jiji-green); color: white; width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0, 181, 63, 0.25);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </div>
            <div class="brand-text">
              <span class="brand-name" style="color: #0f172a; font-size: 1.35rem; font-weight: 800; font-family: var(--font-heading); display: block; line-height: 1;">CONNECTIFY</span>
              <span class="brand-tagline" style="color: var(--jiji-green); font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">
                Verified Kenya Marketplace
              </span>
            </div>
          </div>

          <!-- Concise Primary Navigation (No Filter Duplication) -->
          <nav class="nav-links customer-nav-links" style="display: flex; align-items: center; gap: 6px;">
            <button class="nav-link ${state.currentScreen === 'home' && state.categoryFilter === 'all' && (!state.typeFilter || state.typeFilter === 'all') ? 'active' : ''}" id="navCustAllProducts" style="font-weight: 700; font-size: 0.88rem; color: #1e293b; padding: 7px 14px; border-radius: 8px;">
              All Listings
            </button>
            <button class="nav-link ${state.typeFilter === 'goods' && state.categoryFilter === 'all' ? 'active' : ''}" id="navCustGoodsOnly" style="font-weight: 700; font-size: 0.88rem; color: #1e293b; padding: 7px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
              ${icons.package}
              <span>Goods</span>
            </button>
            <button class="nav-link ${state.typeFilter === 'services' && state.categoryFilter === 'all' ? 'active' : ''}" id="navCustServicesOnly" style="font-weight: 700; font-size: 0.88rem; color: #1e293b; padding: 7px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
              ${icons.sparkles}
              <span>Services</span>
            </button>
            <button class="nav-link ${state.currentScreen === 'tracking' ? 'active' : ''}" id="navCustOrderTrack" style="font-weight: 700; font-size: 0.88rem; color: #1e293b; padding: 7px 14px; border-radius: 8px;">
              Track Order
            </button>
          </nav>

          <!-- Right Header Controls: Cart & Auth Profile -->
          <div class="header-actions" style="display: flex; align-items: center; gap: 12px;">
            <!-- Cart Button -->
            <button class="cart-btn" id="headerCustomerCartBtn" title="View Cart" style="background: #f1f5f9; color: #0f172a; width: 40px; height: 40px; border-radius: 8px; position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid #e2e8f0; transition: all 0.2s;">
              ${icons.shoppingCart}
              <span class="cart-badge" style="position: absolute; top: -5px; right: -5px; background: var(--jiji-green); color: white; font-weight: 800; font-size: 0.72rem; min-width: 19px; height: 19px; border-radius: 999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                ${cartDetails.count}
              </span>
            </button>

            <!-- Authentication Button / Avatar -->
            ${auth.isAuthenticated && auth.role === 'customer' ? `
              <div class="user-chip" style="display: flex; align-items: center; gap: 8px; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 5px 12px; border-radius: 999px;">
                <span style="color: var(--jiji-green-dark);">${icons.user}</span>
                <span style="font-size: 0.84rem; font-weight: 700; color: #166534;">${auth.user.name.split(' ')[0]} (Client)</span>
                <button id="custHeaderSignOut" title="Sign Out" style="background: none; border: none; color: #64748b; cursor: pointer; display: flex; align-items: center; margin-left: 4px;">
                  ${icons.logOut}
                </button>
              </div>
            ` : auth.isAuthenticated && auth.role === 'admin' ? `
              <div class="user-chip admin-chip" style="display: flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #34d399; padding: 5px 12px; border-radius: 999px;">
                <span style="color: #064e3b;">${icons.shieldCheck}</span>
                <span style="font-size: 0.84rem; font-weight: 700; color: #064e3b;">Staff Mode</span>
                <button class="btn btn-sm" id="custHeaderReturnAdmin" style="background: #064e3b; color: white; font-weight: 700; font-size: 0.72rem; padding: 2px 8px; border-radius: 6px;">
                  Operations Desk
                </button>
              </div>
            ` : `
              <button class="btn btn-sm" id="custHeaderSignInBtn" style="background: #0f172a; color: white; font-weight: 700; font-size: 0.84rem; padding: 8px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
                ${icons.user}
                <span>Sign In</span>
              </button>
            `}
          </div>
        </div>
      </header>
    `;

    // Customer Header Event Bindings
    headerContainer.querySelector('#custTopStaffBtn')?.addEventListener('click', () => {
      window.openAuthModal('admin');
    });

    headerContainer.querySelector('#logoCustomerHomeBtn')?.addEventListener('click', () => {
      store.state.categoryFilter = 'all';
      store.state.typeFilter = 'all';
      store.state.searchFilter = '';
      store.navigate('home');
    });

    // Clean Primary Navigation Buttons
    headerContainer.querySelector('#navCustAllProducts')?.addEventListener('click', () => {
      store.state.categoryFilter = 'all';
      store.state.typeFilter = 'all';
      store.navigate('home');
    });

    headerContainer.querySelector('#navCustGoodsOnly')?.addEventListener('click', () => {
      store.state.categoryFilter = 'all';
      store.state.typeFilter = 'goods';
      store.navigate('home');
    });

    headerContainer.querySelector('#navCustServicesOnly')?.addEventListener('click', () => {
      store.state.categoryFilter = 'all';
      store.state.typeFilter = 'services';
      store.navigate('home');
    });

    headerContainer.querySelector('#navCustOrderTrack')?.addEventListener('click', () => store.navigate('tracking'));
    headerContainer.querySelector('#headerCustomerCartBtn')?.addEventListener('click', () => store.navigate('cart'));

    // Auth actions
    headerContainer.querySelector('#custHeaderSignInBtn')?.addEventListener('click', () => {
      window.openAuthModal('customer');
    });

    headerContainer.querySelector('#custHeaderSignOut')?.addEventListener('click', () => {
      store.logout();
      window.showToast('Signed out successfully', 'info');
    });

    headerContainer.querySelector('#custHeaderReturnAdmin')?.addEventListener('click', () => {
      store.setMode('admin');
      store.navigate('dashboard');
    });
  }
}

// Render Global Footer (Clean, High-Trust, Zero "broker")
function renderFooter(state) {
  const footerContainer = document.getElementById('appFooter');
  if (!footerContainer) return;

  const auth = state.auth || { isAuthenticated: false, role: 'customer' };

  footerContainer.innerHTML = `
    <footer class="main-footer" style="background: #0f172a; color: #94a3b8; padding-top: 50px; border-top: 1px solid rgba(255,255,255,0.08);">
      <div class="container-fluid footer-content-grid">
        <div class="footer-brand-col">
          <div class="footer-logo" style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <div style="background: var(--jiji-green); color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              ${icons.shieldCheck}
            </div>
            <strong style="color: white; font-size: 1.25rem; font-family: var(--font-heading);">CONNECTIFY KENYA</strong>
          </div>
          <p class="footer-tagline" style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.6; margin-bottom: 16px;">
            Centralized Multi-Merchant Commerce Platform &bull; One Storefront &bull; Inspected Direct Supplier Sourcing &bull; Safe M-Pesa Escrow &bull; Nationwide Delivery.
          </p>
          <div class="footer-contact-info" style="font-size: 0.85rem; color: #94a3b8;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              ${icons.mapPin}
              <span>Nairobi Central Business District & Regional Logistics Hubs</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${icons.phone}
              <span>${state.settings.supportPhone} &bull; ${state.settings.supportEmail}</span>
            </div>
          </div>
        </div>

        <div class="footer-links-col">
          <h4 style="color: #ffffff; font-size: 0.95rem; font-weight: 700; margin-bottom: 14px;">Storefront Categories</h4>
          <ul style="list-style: none; padding: 0; line-height: 2;">
            <li><a href="#" id="ftLaptops" style="color: #94a3b8; text-decoration: none;">Laptops & Ultrabooks</a></li>
            <li><a href="#" id="ftLaptopAcc" style="color: #94a3b8; text-decoration: none;">Laptop Accessories & Chargers</a></li>
            <li><a href="#" id="ftPhones" style="color: #94a3b8; text-decoration: none;">5G Smartphones & Tablets</a></li>
            <li><a href="#" id="ftPhoneAcc" style="color: #94a3b8; text-decoration: none;">Fast Chargers & Accessories</a></li>
            <li><a href="#" id="ftTrack" style="color: #4ade80; text-decoration: none; font-weight: 600;">Track An Order</a></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 style="color: #ffffff; font-size: 0.95rem; font-weight: 700; margin-bottom: 14px;">Operations & Merchant Hub</h4>
          <ul style="list-style: none; padding: 0; line-height: 2;">
            <li><a href="#" id="ftOpenStaffPortal" style="color: #94a3b8; text-decoration: none;">Staff & Operations Login</a></li>
            <li><a href="#" id="ftMasterMatrix" style="color: #94a3b8; text-decoration: none;">Master Pricing Matrix (BP / SP)</a></li>
            <li><a href="#" id="ftSuppliers" style="color: #94a3b8; text-decoration: none;">Supplier Directory & Fulfillment</a></li>
            <li><a href="#" id="ftComms" style="color: #94a3b8; text-decoration: none;">Customer Inquiries & WhatsApp Logs</a></li>
            <li><a href="#" id="ftReports" style="color: #94a3b8; text-decoration: none;">Executive P&L Statements</a></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 style="color: #ffffff; font-size: 0.95rem; font-weight: 700; margin-bottom: 14px;">Platform Guarantee</h4>
          <div class="arch-badge-box" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
            <span class="badge" style="background: rgba(0, 181, 63, 0.2); color: #4ade80; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; font-weight: 700;">Direct Warranty</span>
            <span class="badge" style="background: rgba(255,255,255,0.1); color: #ffffff; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; font-weight: 700;">Inspection Guaranteed</span>
            <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; font-weight: 700;">M-Pesa Verified</span>
          </div>
          <p class="arch-note" style="font-size: 0.82rem; color: #94a3b8; line-height: 1.5;">
            Connectify contracts vetted suppliers across Kenya, locks quoted wholesale prices, and manages the entire customer delivery lifecycle.
          </p>
        </div>
      </div>

      <div class="footer-bottom-bar" style="border-top: 1px solid rgba(255,255,255,0.06); padding: 18px 0; margin-top: 40px; font-size: 0.82rem; color: #64748b;">
        <div class="container-fluid footer-bottom-flex" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>© ${new Date().getFullYear()} Connectify Platform Kenya. Verified Sourcing & E-Commerce Operations.</div>
          <div class="footer-screen-pill" style="background: rgba(255,255,255,0.05); padding: 4px 12px; border-radius: 999px; color: #cbd5e1;">
            Active Mode: <strong>${state.mode.toUpperCase()}</strong> &bull; User: <strong>${auth.isAuthenticated ? auth.user.name : 'Guest Visitor'}</strong>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Bind Footer Category Links
  footerContainer.querySelector('#ftLaptops')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setMode('customer');
    store.navigate('home', { categoryFilter: 'cat-laptops' });
  });

  footerContainer.querySelector('#ftLaptopAcc')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setMode('customer');
    store.navigate('home', { categoryFilter: 'cat-laptop-acc' });
  });

  footerContainer.querySelector('#ftPhones')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setMode('customer');
    store.navigate('home', { categoryFilter: 'cat-phones' });
  });

  footerContainer.querySelector('#ftPhoneAcc')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setMode('customer');
    store.navigate('home', { categoryFilter: 'cat-phone-acc' });
  });

  footerContainer.querySelector('#ftTrack')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setMode('customer');
    store.navigate('tracking');
  });

  // Footer Staff Links
  footerContainer.querySelector('#ftOpenStaffPortal')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.openAuthModal('admin');
  });

  footerContainer.querySelector('#ftMasterMatrix')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (auth.isAuthenticated && auth.role === 'admin') {
      store.setMode('admin');
      store.navigate('master-matrix');
    } else {
      window.openAuthModal('admin');
    }
  });

  footerContainer.querySelector('#ftSuppliers')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (auth.isAuthenticated && auth.role === 'admin') {
      store.setMode('admin');
      store.navigate('suppliers');
    } else {
      window.openAuthModal('admin');
    }
  });

  footerContainer.querySelector('#ftComms')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (auth.isAuthenticated && auth.role === 'admin') {
      store.setMode('admin');
      store.navigate('communications');
    } else {
      window.openAuthModal('admin');
    }
  });

  footerContainer.querySelector('#ftReports')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (auth.isAuthenticated && auth.role === 'admin') {
      store.setMode('admin');
      store.navigate('reports');
    } else {
      window.openAuthModal('admin');
    }
  });
}

// Master App Render Cycle
function renderApp(state) {
  renderHeader(state);

  const mainContainer = document.getElementById('mainContent');
  if (!mainContainer) return;

  if (state.mode === 'customer') {
    renderCustomerScreen(mainContainer, state);
  } else {
    renderAdminScreen(mainContainer, state);
  }

  renderFooter(state);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  store.subscribe((state) => {
    renderApp(state);
  });

  renderApp(store.state);
  initCommDesk();
});
