// CONNECTIFY — Centralized State Store & Business Logic Engine

import {
  initialCategories,
  initialSuppliers,
  initialProducts,
  initialSupplierOffers,
  initialOrders,
  initialAuditLogs,
  initialQuotationRequests,
  initialCommunications
} from './data.js';

const STORAGE_KEY = 'connectify_state_v6';

class Store {
  constructor() {
    this.subscribers = [];
    this.init();
  }

  init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state = {
          mode: parsed.mode || 'customer', // 'customer' | 'admin'
          currentScreen: parsed.currentScreen || 'home',
          auth: parsed.auth || {
            isAuthenticated: false,
            role: 'customer', // 'customer' | 'admin'
            user: null
          },
          selectedProductId: parsed.selectedProductId || 'prod-lap-01',
          selectedOrderId: parsed.selectedOrderId || 'CNF-8921',
          categories: parsed.categories || initialCategories,
          suppliers: parsed.suppliers || initialSuppliers,
          products: parsed.products || initialProducts,
          supplierOffers: parsed.supplierOffers || initialSupplierOffers,
          orders: parsed.orders || initialOrders,
          auditLogs: parsed.auditLogs || initialAuditLogs,
          quotationRequests: parsed.quotationRequests || initialQuotationRequests,
          communications: parsed.communications || initialCommunications,
          activeCommThreadId: parsed.activeCommThreadId || 'COMM-2026-01',
          cart: parsed.cart || [],
          searchFilter: '',
          categoryFilter: 'all',
          locationFilter: 'all',
          typeFilter: 'all',
          priceMax: 1000000,
          sortBy: 'featured',
          settings: (parsed.settings && parsed.settings.supportPhone !== '+254 700 800 900') ? parsed.settings : {
            currency: 'KSh',
            defaultGoodsMarkup: 15,
            defaultServiceMarkup: 20,
            businessName: 'Connectify Kenya Ltd',
            supportPhone: '+254 700 000 000',
            supportEmail: 'orders@connectify.co.ke',
            mpesaPaybill: '522522',
            mpesaTill: '891024',
            accountNumber: 'CONNECTIFY'
          }
        };

        // Sanitize any stale local storage phone records
        if (this.state.settings && this.state.settings.supportPhone) {
          this.state.settings.supportPhone = this.state.settings.supportPhone.replace(/800\s*900/g, '000 000');
        }
        if (this.state.auth && this.state.auth.user && this.state.auth.user.phone) {
          this.state.auth.user.phone = this.state.auth.user.phone.replace(/800\s*900/g, '000 000');
        }
        (this.state.communications || []).forEach(comm => {
          if (comm.customer && comm.customer.phone) {
            comm.customer.phone = comm.customer.phone.replace(/800\s*900/g, '000 000');
          }
          (comm.messages || []).forEach(m => {
            if (m.text) m.text = m.text.replace(/800\s*900/g, '000 000').replace(/800900/g, '000000');
            if (m.waPrompt) m.waPrompt = m.waPrompt.replace(/800\s*900/g, '000 000').replace(/800900/g, '000000');
          });
        });

        // Sync updated concise product names from initialProducts
        if (this.state.products && Array.isArray(this.state.products)) {
          const nameMap = new Map(initialProducts.map(p => [p.id, p.name]));
          this.state.products.forEach(p => {
            if (nameMap.has(p.id)) {
              p.name = nameMap.get(p.id);
            }
          });
        }
      } catch (e) {
        console.error('Failed to parse local storage, resetting to defaults', e);
        this.resetState();
      }
    } else {
      this.resetState();
    }
  }

  resetState() {
    this.state = {
      mode: 'customer',
      currentScreen: 'home',
      auth: {
        isAuthenticated: false,
        role: 'customer',
        user: null
      },
      selectedProductId: 'prod-laptop-01',
      selectedOrderId: 'CNF-8921',
      categories: JSON.parse(JSON.stringify(initialCategories)),
      suppliers: JSON.parse(JSON.stringify(initialSuppliers)),
      products: JSON.parse(JSON.stringify(initialProducts)),
      supplierOffers: JSON.parse(JSON.stringify(initialSupplierOffers)),
      orders: JSON.parse(JSON.stringify(initialOrders)),
      auditLogs: JSON.parse(JSON.stringify(initialAuditLogs)),
      quotationRequests: JSON.parse(JSON.stringify(initialQuotationRequests)),
      communications: JSON.parse(JSON.stringify(initialCommunications)),
      activeCommThreadId: 'COMM-2026-01',
      cart: [
        {
          productId: 'prod-lap-01',
          quantity: 1,
          addedAt: new Date().toISOString()
        }
      ],
      searchFilter: '',
      categoryFilter: 'all',
      locationFilter: 'all',
      typeFilter: 'all',
      priceMax: 1000000,
      sortBy: 'featured',
      settings: {
        currency: 'KSh',
        defaultGoodsMarkup: 15,
        defaultServiceMarkup: 20,
        businessName: 'Connectify Kenya Ltd',
        supportPhone: '+254 700 000 000',
        supportEmail: 'orders@connectify.co.ke',
        mpesaPaybill: '522522',
        mpesaTill: '891024',
        accountNumber: 'CONNECTIFY'
      }
    };
    this.save();
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.state));
  }

  // Authentication & Session Management
  login(email, password, role = 'customer') {
    const isAdm = role === 'admin' || (email && (email.includes('admin') || email.includes('operations')));
    this.state.auth = {
      isAuthenticated: true,
      role: isAdm ? 'admin' : 'customer',
      user: {
        name: isAdm ? 'Mercy Wanjiku' : 'Brian Omondi',
        email: email || (isAdm ? 'operations@connectify.co.ke' : 'brian.omondi@corp.co.ke'),
        phone: isAdm ? '+254 700 000 000' : '+254 712 987 654',
        title: isAdm ? 'Head of Sourcing & Fulfillment' : 'Corporate Buyer',
        company: isAdm ? 'Connectify Operations Hub' : 'Omondi & Partners Logistics'
      }
    };
    this.state.mode = isAdm ? 'admin' : 'customer';
    this.state.currentScreen = isAdm ? 'dashboard' : 'home';
    this.save();
    return this.state.auth;
  }

  logout() {
    this.state.auth = {
      isAuthenticated: false,
      role: 'customer',
      user: null
    };
    this.state.mode = 'customer';
    this.state.currentScreen = 'home';
    this.save();
  }

  loginAsDemo(role = 'customer') {
    return this.login(
      role === 'admin' ? 'operations@connectify.co.ke' : 'brian.omondi@corp.co.ke',
      'demo123',
      role
    );
  }

  // Navigation
  setMode(mode) {
    this.state.mode = mode;
    if (mode === 'admin') {
      this.state.currentScreen = 'dashboard';
    } else {
      this.state.currentScreen = 'home';
    }
    this.save();
  }

  navigate(screen, payload = {}) {
    this.state.currentScreen = screen;
    if (payload.productId) this.state.selectedProductId = payload.productId;
    if (payload.orderId) this.state.selectedOrderId = payload.orderId;
    if (payload.categoryFilter) this.state.categoryFilter = payload.categoryFilter;
    if (payload.searchFilter !== undefined) this.state.searchFilter = payload.searchFilter;
    this.save();
  }

  // Log audit action
  logAudit(action, entityType, entityId, description) {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: this.state.mode === 'admin' ? 'Operations Admin' : 'Customer (Online)',
      action,
      entityType,
      entityId,
      description
    };
    this.state.auditLogs.unshift(newLog);
    // Keep max 100 logs
    if (this.state.auditLogs.length > 100) {
      this.state.auditLogs.pop();
    }
    this.save();
  }

  // Section 6: Pricing and Profit Calculations
  calculatePricing(supplierCost, transportCost = 0, markupPercent = 15, manualSellingPrice = null) {
    const sCost = Number(supplierCost) || 0;
    const tCost = Number(transportCost) || 0;
    const mPercent = Number(markupPercent) || 0;

    const totalCost = sCost + tCost;
    const markupAmount = Math.round(totalCost * (mPercent / 100));
    const suggestedSellingPrice = totalCost + markupAmount;

    const isOverridden = manualSellingPrice !== null && manualSellingPrice !== undefined && Number(manualSellingPrice) > 0;
    const finalSellingPrice = isOverridden ? Number(manualSellingPrice) : suggestedSellingPrice;

    const estimatedGrossProfit = finalSellingPrice - totalCost;
    const grossMarginPercent = finalSellingPrice > 0 
      ? Number(((estimatedGrossProfit / finalSellingPrice) * 100).toFixed(2))
      : 0;

    return {
      supplierCost: sCost,
      transportHandlingCost: tCost,
      totalCost,
      markupPercent: mPercent,
      markupAmount,
      suggestedSellingPrice,
      isOverridden,
      finalSellingPrice,
      estimatedGrossProfit,
      grossMarginPercent
    };
  }

  // Product Operations
  getProduct(id) {
    return this.state.products.find(p => p.id === id);
  }

  getOffersForProduct(productId) {
    return this.state.supplierOffers.filter(o => o.productId === productId);
  }

  getActiveOffer(product) {
    if (!product) return null;
    if (product.activeSupplierOfferId) {
      const found = this.state.supplierOffers.find(o => o.id === product.activeSupplierOfferId);
      if (found) return found;
    }
    const offers = this.getOffersForProduct(product.id);
    return offers.length > 0 ? offers[0] : null;
  }

  toggleProductPublication(productId) {
    const product = this.getProduct(productId);
    if (!product) return;
    const newStatus = product.status === 'published' ? 'draft' : 'published';
    product.status = newStatus;
    this.logAudit(
      newStatus === 'published' ? 'PRODUCT_PUBLISHED' : 'PRODUCT_UNPUBLISHED',
      'Product',
      productId,
      `Changed publication status of "${product.name}" to ${newStatus}.`
    );
    this.save();
  }

  saveProduct(productData) {
    const index = this.state.products.findIndex(p => p.id === productData.id);
    if (index >= 0) {
      this.state.products[index] = { ...this.state.products[index], ...productData };
      this.logAudit('PRODUCT_UPDATED', 'Product', productData.id, `Updated catalogue item "${productData.name}".`);
    } else {
      const newId = `prod-${Date.now()}`;
      const newProduct = {
        id: newId,
        createdAt: new Date().toISOString(),
        rating: 5.0,
        reviewsCount: 0,
        ...productData
      };
      this.state.products.unshift(newProduct);
      this.logAudit('PRODUCT_CREATED', 'Product', newId, `Added new catalogue listing "${newProduct.name}".`);
      return newProduct;
    }
    this.save();
    return this.getProduct(productData.id);
  }

  deleteProduct(productId) {
    const prod = this.getProduct(productId);
    if (!prod) return;
    this.state.products = this.state.products.filter(p => p.id !== productId);
    this.state.supplierOffers = this.state.supplierOffers.filter(o => o.productId !== productId);
    this.logAudit('PRODUCT_DELETED', 'Product', productId, `Archived and removed product "${prod.name}".`);
    this.save();
  }

  // Master Inventory Matrix update: Selling Price (SP), Buying Price (BP), Supplier, and Stock
  updateMasterProductPricing(productId, { sellingPrice, supplierCost, supplierId, stockAvailable }) {
    const product = this.getProduct(productId);
    if (!product) return;

    if (sellingPrice !== undefined && Number(sellingPrice) > 0) {
      product.sellingPrice = Number(sellingPrice);
      product.manualPriceOverride = true;
    }

    let activeOffer = this.getActiveOffer(product);
    if (activeOffer) {
      if (supplierCost !== undefined && Number(supplierCost) >= 0) {
        activeOffer.supplierCost = Number(supplierCost);
      }
      if (supplierId) {
        activeOffer.supplierId = supplierId;
      }
      if (stockAvailable !== undefined && Number(stockAvailable) >= 0) {
        activeOffer.stockAvailable = Number(stockAvailable);
      }
    } else if (supplierCost !== undefined) {
      const newOffer = {
        id: `off-${Date.now()}`,
        productId: product.id,
        supplierId: supplierId || (this.state.suppliers[0] ? this.state.suppliers[0].id : 'sup-techhub'),
        supplierCost: Number(supplierCost) || 0,
        transportHandlingCost: product.transportHandlingCost || 500,
        minOrderQuantity: 1,
        stockAvailable: Number(stockAvailable) || 20,
        leadTime: '1-2 Days',
        quotationDate: new Date().toISOString().slice(0, 10),
        notes: 'Direct supplier catalog rate'
      };
      this.state.supplierOffers.push(newOffer);
      product.activeSupplierOfferId = newOffer.id;
    }

    const cost = activeOffer ? activeOffer.supplierCost : (supplierCost || 0);
    this.logAudit(
      'PRICING_UPDATED',
      'Product',
      productId,
      `Updated pricing matrix for "${product.name}": Selling Price KSh ${product.sellingPrice.toLocaleString()}, Buying Price KSh ${cost.toLocaleString()}`
    );
    this.save();
  }

  // Supplier Offer Operations
  saveSupplierOffer(offerData) {
    const index = this.state.supplierOffers.findIndex(o => o.id === offerData.id);
    if (index >= 0) {
      this.state.supplierOffers[index] = { ...this.state.supplierOffers[index], ...offerData };
      this.logAudit('OFFER_UPDATED', 'Supplier Offer', offerData.id, `Updated offer pricing from supplier for item ${offerData.productId}.`);
    } else {
      const newId = `off-${Date.now()}`;
      const newOffer = {
        id: newId,
        quotationDate: new Date().toISOString().slice(0, 10),
        ...offerData
      };
      this.state.supplierOffers.push(newOffer);
      this.logAudit('OFFER_ADDED', 'Supplier Offer', newId, `Recorded new quotation of KSh ${offerData.supplierCost.toLocaleString()} for product ${offerData.productId}.`);
      return newOffer;
    }
    this.save();
  }

  setActiveSupplierOffer(productId, offerId) {
    const product = this.getProduct(productId);
    const offer = this.state.supplierOffers.find(o => o.id === offerId);
    if (!product || !offer) return;

    product.activeSupplierOfferId = offerId;

    // Recalculate selling price if manual override is not locked
    if (!product.manualPriceOverride) {
      const pricing = this.calculatePricing(
        offer.supplierCost,
        offer.transportHandlingCost || product.transportHandlingCost,
        product.defaultMarkupPercent
      );
      product.sellingPrice = pricing.suggestedSellingPrice;
    }

    const supplier = this.getSupplier(offer.supplierId);
    this.logAudit(
      'PRIMARY_OFFER_CHANGED',
      'Product',
      productId,
      `Assigned primary supplier for "${product.name}" to ${supplier ? supplier.name : offer.supplierId} @ cost KSh ${offer.supplierCost.toLocaleString()}.`
    );
    this.save();
  }

  // Supplier Operations
  getSupplier(id) {
    return this.state.suppliers.find(s => s.id === id);
  }

  saveSupplier(supplierData) {
    const index = this.state.suppliers.findIndex(s => s.id === supplierData.id);
    if (index >= 0) {
      this.state.suppliers[index] = { ...this.state.suppliers[index], ...supplierData };
      this.logAudit('SUPPLIER_UPDATED', 'Supplier', supplierData.id, `Updated directory records for business "${supplierData.name}".`);
    } else {
      const newId = `sup-${Date.now()}`;
      const newSupplier = {
        id: newId,
        status: 'active',
        rating: 5.0,
        activeListingsCount: 0,
        ...supplierData
      };
      this.state.suppliers.push(newSupplier);
      this.logAudit('SUPPLIER_REGISTERED', 'Supplier', newId, `Registered merchant/supplier "${newSupplier.name}" located at ${newSupplier.location}.`);
      return newSupplier;
    }
    this.save();
  }

  toggleSupplierStatus(supplierId) {
    const supplier = this.getSupplier(supplierId);
    if (!supplier) return;
    supplier.status = supplier.status === 'active' ? 'inactive' : 'active';
    this.logAudit('SUPPLIER_STATUS_TOGGLED', 'Supplier', supplierId, `Changed status of supplier "${supplier.name}" to ${supplier.status}.`);
    this.save();
  }

  deleteSupplier(supplierId) {
    const supplier = this.getSupplier(supplierId);
    if (!supplier) return;
    this.state.suppliers = this.state.suppliers.filter(s => s.id !== supplierId);
    this.logAudit('SUPPLIER_DELETED', 'Supplier', supplierId, `Removed supplier "${supplier.name}" from directory.`);
    this.save();
  }

  getProductsForSupplier(supplierId) {
    const matchingOffers = this.state.supplierOffers.filter(o => o.supplierId === supplierId);
    const productIds = new Set(matchingOffers.map(o => o.productId));
    return this.state.products.filter(p => productIds.has(p.id)).map(product => {
      const offer = matchingOffers.find(o => o.productId === product.id);
      return {
        product,
        offer,
        supplierCost: offer ? offer.supplierCost : 0,
        transportCost: offer ? offer.transportHandlingCost : 0,
        leadTime: offer ? offer.leadTime : 'N/A',
        isPrimary: product.activeSupplierOfferId === offer?.id
      };
    });
  }

  // Cart Operations
  addToCart(productId, quantity = 1) {
    const existing = this.state.cart.find(c => c.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.state.cart.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    this.save();
  }

  updateCartQty(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.state.cart.find(c => c.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.save();
    }
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(c => c.productId !== productId);
    this.save();
  }

  clearCart() {
    this.state.cart = [];
    this.save();
  }

  getCartDetails() {
    const items = [];
    let subtotal = 0;
    let requiresConfirmationCount = 0;

    for (const c of this.state.cart) {
      const product = this.getProduct(c.productId);
      if (product) {
        const itemTotal = product.sellingPrice * c.quantity;
        subtotal += itemTotal;
        const activeOffer = this.getActiveOffer(product);
        const requiresConfirmation = product.type === 'service' || (activeOffer && activeOffer.stockAvailable < c.quantity);
        if (requiresConfirmation) requiresConfirmationCount++;

        items.push({
          productId: product.id,
          product,
          quantity: c.quantity,
          unitPrice: product.sellingPrice,
          totalPrice: itemTotal,
          requiresConfirmation
        });
      }
    }

    const deliveryFee = subtotal > 100000 ? 0 : (items.length > 0 ? 1500 : 0);
    const total = subtotal + deliveryFee;

    return {
      items,
      count: items.reduce((acc, curr) => acc + curr.quantity, 0),
      subtotal,
      deliveryFee,
      total,
      requiresConfirmationCount
    };
  }

  // Order Operations
  createOrder(customerInfo, paymentMethod, paymentReference = '') {
    const cartDetails = this.getCartDetails();
    if (cartDetails.items.length === 0) return null;

    const orderId = `CNF-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();

    let totalSupplierCost = 0;
    let totalGrossProfit = 0;

    const orderItems = cartDetails.items.map((ci, index) => {
      const activeOffer = this.getActiveOffer(ci.product);
      const supplierCostSnapshot = activeOffer ? activeOffer.supplierCost : Math.round(ci.product.sellingPrice * 0.8);
      const transportCostSnapshot = activeOffer ? activeOffer.transportHandlingCost : 500;
      const unitTotalCost = supplierCostSnapshot + transportCostSnapshot;
      const unitProfit = ci.unitPrice - unitTotalCost;
      const itemGrossProfit = unitProfit * ci.quantity;

      totalSupplierCost += unitTotalCost * ci.quantity;
      totalGrossProfit += itemGrossProfit;

      return {
        productId: ci.product.id,
        productName: ci.product.name,
        quantity: ci.quantity,
        unitPrice: ci.unitPrice,
        assignedSupplierId: activeOffer ? activeOffer.supplierId : 'sup-1',
        supplierOfferId: activeOffer ? activeOffer.id : null,
        supplierCostSnapshot,
        transportCostSnapshot,
        estimatedProfitPerUnit: unitProfit,
        totalItemSellingPrice: ci.totalPrice,
        totalItemSupplierCost: supplierCostSnapshot * ci.quantity,
        totalItemTransportCost: transportCostSnapshot * ci.quantity,
        totalItemGrossProfit: itemGrossProfit,
        fulfillmentStatus: 'Pending Confirmation',
        poNumber: `PO-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
      };
    });

    const newOrder = {
      id: orderId,
      customer: customerInfo,
      items: orderItems,
      pricing: {
        subtotal: cartDetails.subtotal,
        deliveryFee: cartDetails.deliveryFee,
        totalAmount: cartDetails.total,
        totalSupplierCost,
        platformGrossProfit: totalGrossProfit,
        grossMarginPercent: cartDetails.total > 0 ? Number(((totalGrossProfit / cartDetails.total) * 100).toFixed(2)) : 0
      },
      payment: {
        method: paymentMethod,
        reference: paymentReference || `MP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        status: paymentMethod.includes('M-Pesa') ? 'Paid & Verified' : 'Pending Verification',
        amountCollected: cartDetails.total,
        amountOwedToSupplier: totalSupplierCost,
        supplierPaid: false
      },
      status: 'Pending Supplier Confirmation',
      timeline: [
        { step: 'Order Placed by Customer', time: now.toISOString().slice(0, 16).replace('T', ' '), done: true },
        { step: 'Connectify Confirming Availability with Verified Suppliers', time: 'In Progress', done: false },
        { step: 'Purchase Orders Issued', time: 'Pending', done: false },
        { step: 'Supplier Dispatched to Destination', time: 'Pending', done: false },
        { step: 'Delivered to Customer', time: 'Pending', done: false }
      ],
      createdAt: now.toISOString()
    };

    this.state.orders.unshift(newOrder);
    this.clearCart();
    this.state.selectedOrderId = orderId;

    this.logAudit(
      'ORDER_CREATED',
      'Order',
      orderId,
      `New customer order ${orderId} placed by ${customerInfo.name} for ${orderItems.length} items (Total: KSh ${cartDetails.total.toLocaleString()}).`
    );

    this.save();
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus, timelineStepIndex = null) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return;
    const oldStatus = order.status;
    order.status = newStatus;

    if (timelineStepIndex !== null && order.timeline[timelineStepIndex]) {
      order.timeline[timelineStepIndex].done = true;
      order.timeline[timelineStepIndex].time = new Date().toISOString().slice(0, 16).replace('T', ' ');
    }

    if (newStatus === 'Completed') {
      order.timeline.forEach(t => t.done = true);
    }

    this.logAudit(
      'ORDER_STATUS_UPDATED',
      'Order',
      orderId,
      `Updated status of order ${orderId} from "${oldStatus}" to "${newStatus}".`
    );
    this.save();
  }

  updateOrderItemFulfillment(orderId, itemIndex, newFulfillmentStatus, assignedSupplierId = null) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order || !order.items[itemIndex]) return;
    order.items[itemIndex].fulfillmentStatus = newFulfillmentStatus;
    if (assignedSupplierId) {
      order.items[itemIndex].assignedSupplierId = assignedSupplierId;
    }
    this.save();
  }

  // -------------------------------------------------------------
  // Quotation & BQ Operations (Services & Materials Workflow)
  // -------------------------------------------------------------
  addQuotationRequest(qrData) {
    const id = `QR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newQR = {
      id,
      customer: {
        name: qrData.name || 'Anonymous Client',
        company: qrData.company || '',
        phone: qrData.phone || '+254 700 000 000',
        email: qrData.email || 'client@connectify.co.ke',
        location: qrData.location || 'Nairobi',
        county: qrData.county || 'Nairobi'
      },
      serviceId: qrData.serviceId,
      serviceName: qrData.serviceName,
      supplierId: qrData.supplierId || 'sup-interior',
      supplierName: qrData.supplierName || 'Verified Partner',
      category: qrData.category || 'cat-interior',
      scopeDescription: qrData.scopeDescription || '',
      supplyOption: qrData.supplyOption || 'turnkey', // 'turnkey' | 'labor_only'
      estimatedArea: Number(qrData.estimatedArea) || 0,
      unit: qrData.unit || 'sq ft',
      siteSurveyBooked: Boolean(qrData.siteSurveyBooked),
      surveyFeePaid: qrData.siteSurveyBooked ? 1500 : 0,
      status: 'Pending BQ & Quotation',
      createdAt: new Date().toISOString(),
      bqBreakdown: null
    };

    if (!this.state.quotationRequests) {
      this.state.quotationRequests = [];
    }

    this.state.quotationRequests.unshift(newQR);
    this.logAudit(
      'QUOTATION_REQUEST_SUBMITTED',
      'Quotation',
      id,
      `Client ${newQR.customer.name} submitted project scope request for ${newQR.serviceName} (${newQR.supplyOption.toUpperCase()}).`
    );
    this.save();
    return newQR;
  }

  updateQuotationBQ(qrId, bqBreakdown) {
    const qr = (this.state.quotationRequests || []).find(q => q.id === qrId);
    if (!qr) return;

    qr.bqBreakdown = bqBreakdown;
    qr.status = 'Quotation Issued';

    this.logAudit(
      'BQ_QUOTATION_GENERATED',
      'Quotation',
      qrId,
      `Operations Desk generated itemized BQ for ${qrId} (Materials: KSh ${bqBreakdown.materialsTotalSP.toLocaleString()} • Labor: KSh ${bqBreakdown.laborTotalSP.toLocaleString()} • Total Quotation: KSh ${bqBreakdown.totalQuotationSP.toLocaleString()}).`
    );
    this.save();
  }

  updateQuotationStatus(qrId, newStatus) {
    const qr = (this.state.quotationRequests || []).find(q => q.id === qrId);
    if (!qr) return;
    qr.status = newStatus;
    this.save();
  }

  deleteQuotationRequest(qrId) {
    this.state.quotationRequests = (this.state.quotationRequests || []).filter(q => q.id !== qrId);
    this.save();
  }

  // -------------------------------------------------------------
  // Unified Communications & Inquiries — Single Source Engine
  // -------------------------------------------------------------
  getCommunications(filter = 'all') {
    const list = this.state.communications || [];
    if (filter === 'all') return list;
    if (filter === 'open') return list.filter(c => c.status === 'Open');
    if (filter === 'replied') return list.filter(c => c.status === 'Replied');
    if (filter === 'resolved') return list.filter(c => c.status === 'Resolved');
    if (filter === 'whatsapp') return list.filter(c => c.channel.toLowerCase().includes('whatsapp'));
    if (filter === 'callback') return list.filter(c => c.channel.toLowerCase().includes('callback') || c.channel.toLowerCase().includes('phone'));
    if (filter === 'live') return list.filter(c => c.channel.toLowerCase().includes('storefront') || c.channel.toLowerCase().includes('live'));
    return list;
  }

  getCommunication(id) {
    return (this.state.communications || []).find(c => c.id === id);
  }

  setActiveCommThread(id) {
    this.state.activeCommThreadId = id;
    const thread = this.getCommunication(id);
    if (thread && thread.unreadByAdmin) {
      thread.unreadByAdmin = false;
    }
    this.save();
  }

  sendCustomerMessage({
    threadId = null,
    customerName = 'Prospective Buyer',
    customerPhone = '+254 700 123 456',
    customerEmail = 'client@connectify.co.ke',
    customerLocation = 'Nairobi',
    company = '',
    subject = 'Product & Sourcing Inquiry',
    text = '',
    productId = null,
    productName = '',
    orderId = null,
    quoteId = null,
    channel = 'Live Storefront Desk',
    category = 'General'
  }) {
    if (!text || !text.trim()) return null;

    let thread = threadId ? this.getCommunication(threadId) : null;
    const nowIso = new Date().toISOString();

    if (!thread) {
      const newId = `COMM-2026-${Math.floor(100 + Math.random() * 900)}`;
      thread = {
        id: newId,
        customer: {
          name: customerName,
          company: company || 'Retail Buyer',
          phone: customerPhone,
          email: customerEmail,
          location: customerLocation
        },
        subject: subject || (productName ? `Inquiry regarding ${productName}` : 'Storefront Sourcing Inquiry'),
        channel,
        category,
        productId,
        productName: productName || (productId ? this.getProduct(productId)?.name : ''),
        orderId,
        quoteId,
        status: 'Open',
        priority: 'High',
        unreadByAdmin: true,
        unreadByCustomer: false,
        createdAt: nowIso,
        updatedAt: nowIso,
        messages: [
          {
            id: `msg-${Date.now()}-1`,
            sender: 'customer',
            senderName: customerName,
            text: text.trim(),
            timestamp: nowIso
          },
          {
            id: `msg-${Date.now()}-2`,
            sender: 'admin',
            senderName: 'Connectify Central Desk (System Auto-Ack)',
            text: 'Hello! Thank you for messaging Connectify Central Desk. Your inquiry has been routed to our active fulfillment specialists (+254 700 000 000). We verify supplier availability and respond in under 5 minutes.',
            waPrompt: 'Hello Connectify Central Desk, I would like more details regarding products, delivery, and services.',
            timestamp: new Date(Date.now() + 1000).toISOString()
          }
        ]
      };
      if (!this.state.communications) this.state.communications = [];
      this.state.communications.unshift(thread);
      this.state.activeCommThreadId = thread.id;
    } else {
      thread.messages.push({
        id: `msg-${Date.now()}`,
        sender: 'customer',
        senderName: customerName || thread.customer.name,
        text: text.trim(),
        timestamp: nowIso
      });
      thread.status = 'Open';
      thread.unreadByAdmin = true;
      thread.updatedAt = nowIso;
      this.state.activeCommThreadId = thread.id;
    }

    this.save();
    return thread;
  }

  replyAdminMessage(threadId, replyText, agentName = 'Connectify Central Desk (Operations)', waPrompt = null) {
    if (!replyText || !replyText.trim()) return null;
    const thread = this.getCommunication(threadId);
    if (!thread) return null;

    const nowIso = new Date().toISOString();
    thread.messages.push({
      id: `msg-${Date.now()}`,
      sender: 'admin',
      senderName: agentName,
      text: replyText.trim(),
      waPrompt: waPrompt,
      timestamp: nowIso
    });
    thread.status = 'Replied';
    thread.unreadByAdmin = false;
    thread.unreadByCustomer = true;
    thread.updatedAt = nowIso;

    // Log in audit logs
    this.addAuditLog('COMMUNICATION_REPLY', `Staff reply sent to ${thread.customer.name} on ${thread.id}`);

    this.save();
    return thread;
  }

  updateCommunicationStatus(threadId, newStatus) {
    const thread = this.getCommunication(threadId);
    if (!thread) return;
    thread.status = newStatus;
    thread.updatedAt = new Date().toISOString();
    this.addAuditLog('COMMUNICATION_STATUS', `Thread ${threadId} marked as ${newStatus}`);
    this.save();
  }

  requestPhoneCallback({ customerName, customerPhone, preferredTime = 'Immediate', note = '', productId = null, productName = '' }) {
    const text = `PRIORITY PHONE CALLBACK REQUEST:\nCustomer: ${customerName}\nDirect Phone: ${customerPhone}\nPreferred Time: ${preferredTime}\nProduct/Service: ${productName || 'General Inquiry'}\nNote: ${note || 'Customer requested phone consultation via Central Desk'}`;
    return this.sendCustomerMessage({
      customerName,
      customerPhone,
      subject: `Phone Callback Request: ${productName || 'General Sourcing'}`,
      channel: 'Phone Callback Request',
      text,
      productId,
      productName,
      category: 'Callback'
    });
  }

  logWhatsAppInquiry({ customerName, customerPhone, text, productId = null, productName = '' }) {
    return this.sendCustomerMessage({
      customerName: customerName || 'WhatsApp Customer',
      customerPhone: customerPhone || '+254 700 000 000',
      subject: `WhatsApp Inquiry: ${productName || 'Catalogue Item'}`,
      channel: 'WhatsApp Central Desk',
      text: text || `Inquired via official Connectify WhatsApp regarding ${productName}`,
      productId,
      productName,
      category: 'WhatsApp'
    });
  }

  getUnreadCommunicationCount() {
    return (this.state.communications || []).filter(c => c.unreadByAdmin || c.status === 'Open').length;
  }

  // Financial Metrics Calculation
  getFinancialSummary() {
    let totalSalesRevenue = 0;
    let totalSupplierCosts = 0;
    let estimatedGrossProfit = 0;
    let realizedGrossProfit = 0;
    let totalCollected = 0;
    let totalOwedToSuppliers = 0;

    this.state.orders.forEach(order => {
      totalSalesRevenue += order.pricing.totalAmount;
      totalSupplierCosts += order.pricing.totalSupplierCost;
      const profit = order.pricing.platformGrossProfit !== undefined ? order.pricing.platformGrossProfit : (order.pricing.brokerGrossProfit || 0);
      estimatedGrossProfit += profit;

      if (order.status === 'Completed') {
        realizedGrossProfit += profit;
      }

      if (order.payment.status.includes('Paid')) {
        totalCollected += order.payment.amountCollected;
      }

      if (!order.payment.supplierPaid) {
        totalOwedToSuppliers += order.payment.amountOwedToSupplier;
      }
    });

    const averageMargin = totalSalesRevenue > 0 
      ? ((estimatedGrossProfit / totalSalesRevenue) * 100).toFixed(1)
      : 0;

    return {
      totalSalesRevenue,
      totalSupplierCosts,
      estimatedGrossProfit,
      realizedGrossProfit,
      totalCollected,
      totalOwedToSuppliers,
      averageMargin,
      ordersCount: this.state.orders.length,
      activeSuppliersCount: this.state.suppliers.filter(s => s.status === 'active').length,
      publishedProductsCount: this.state.products.filter(p => p.status === 'published').length,
      pendingOrdersCount: this.state.orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length
    };
  }
}

export const store = new Store();
