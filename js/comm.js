// CONNECTIFY — Single-Source Live Communication Desk (Customer Storefront)
// Unified in-app Live Chat Drawer & Support Desk routed exclusively to Connectify Central Operations

import { store } from './store.js';
import { icons } from './icons.js';

let isDrawerOpen = false;

export function initCommDesk() {
  let existingContainer = document.getElementById('commDeskContainer');
  if (!existingContainer) {
    existingContainer = document.createElement('div');
    existingContainer.id = 'commDeskContainer';
    document.body.appendChild(existingContainer);
  }

  renderCommDesk(existingContainer, store.state);

  // Subscribe to store updates to keep conversation and badges in sync
  store.subscribe((state) => {
    if (state.mode === 'customer') {
      renderCommDesk(existingContainer, state);
    } else {
      // In admin mode, hide the floating customer desk
      existingContainer.innerHTML = '';
    }
  });

  window.openCommDrawer = function (prefillMessage = '') {
    isDrawerOpen = true;
    renderCommDesk(existingContainer, store.state);
    if (prefillMessage) {
      const input = document.getElementById('commDrawerInput');
      if (input) {
        input.value = prefillMessage;
        input.focus();
      }
    }
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCommDesk(container, state) {
  if (state.mode !== 'customer') {
    container.innerHTML = '';
    return;
  }

  // Find customer's active thread or default thread
  const threads = state.communications || [];
  let currentThread = threads.find(t => t.id === state.activeCommThreadId) || threads[0] || null;

  container.innerHTML = `
    <!-- Floating Central Desk Button -->
    <div class="floating-comm-btn" id="btnFloatingCommDesk" title="Connectify Central Support & Sourcing Desk">
      <span class="floating-comm-pulse"></span>
      <span style="display: flex; align-items: center; gap: 6px;">
        ${icons.messageSquare}
        <span>Central Desk</span>
      </span>
      <span style="font-size: 0.72rem; background: rgba(0,0,0,0.25); padding: 2px 7px; border-radius: 999px; font-weight: 800;">
        1-Source
      </span>
    </div>

    <!-- Sliding Communication Desk Drawer Overlay -->
    <div class="comm-drawer-overlay ${isDrawerOpen ? 'open' : ''}" id="commDrawerOverlay">
      <div class="comm-drawer" id="commDrawerPanel">
        <!-- Header -->
        <div class="comm-drawer-header">
          <div>
            <h3 class="comm-drawer-title">
              ${icons.shieldCheck} Connectify Central Desk
            </h3>
            <div class="comm-drawer-sub">
              Single-Source Sourcing &bull; Dedicated Kenyan Operations
            </div>
          </div>
          <button class="comm-drawer-close" id="btnCloseCommDrawer" aria-label="Close Desk">
            ${icons.close}
          </button>
        </div>

        <!-- Quick Single-Source Channels Bar -->
        <div class="comm-channels-bar">
          <a href="tel:+254700000000" class="comm-channel-link" title="Call Direct Support">
            ${icons.phone}
            <span>Call +254 700 000 000</span>
          </a>
          <a href="https://wa.me/254700000000?text=${encodeURIComponent('Hello Connectify Support Desk, I would like to inquire about products, pricing, and delivery.')}" target="_blank" rel="noopener" class="comm-channel-link wa" id="btnDrawerWaLead" title="WhatsApp Central Desk">
            ${icons.whatsapp}
            <span>WhatsApp Desk</span>
          </a>
        </div>

        <!-- Single-Source Guarantee Notice -->
        <div style="background: #f0fdf4; border-bottom: 1px solid #bbf7d0; padding: 8px 18px; font-size: 0.78rem; color: #166534; display: flex; align-items: center; gap: 6px;">
          ${icons.checkCircle}
          <span><strong>Single Source Policy:</strong> All inquiries, supplier negotiations & warranties handled exclusively by Connectify.</span>
        </div>

        <!-- Thread Messages Body -->
        <div class="comm-drawer-body" id="commDrawerMessagesBody">
          ${currentThread && currentThread.messages && currentThread.messages.length > 0 ? `
            <div style="text-align: center; margin-bottom: 8px;">
              <span style="font-size: 0.72rem; background: #e2e8f0; color: #475569; padding: 3px 10px; border-radius: 999px; font-weight: 600;">
                Subject: ${escapeHtml(currentThread.subject)}
              </span>
            </div>
            ${currentThread.messages.map(msg => {
              const isCust = msg.sender === 'customer';
              const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const waPrompt = msg.waPrompt || 'Hello Connectify Central Desk, I would like more details regarding this topic.';
              return `
                <div class="comm-message-bubble ${isCust ? 'comm-message-customer' : 'comm-message-admin'}">
                  <div class="comm-bubble-sender">
                    ${isCust ? icons.user : icons.shieldCheck}
                    <span>${escapeHtml(msg.senderName)}</span>
                  </div>
                  <div class="comm-bubble-content">${escapeHtml(msg.text).replace(/\\n/g, '<br />')}</div>
                  ${!isCust ? `
                    <div class="comm-agent-wa-box" style="margin-top: 10px; padding: 10px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
                      <div style="font-size: 0.78rem; font-weight: 700; color: #166534; margin-bottom: 6px;">
                        Need more details or direct assistance?
                      </div>
                      <a href="https://wa.me/254700000000?text=${encodeURIComponent(waPrompt)}" target="_blank" rel="noopener" class="comm-agent-wa-btn" style="background: #25d366; color: white; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 7px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.35);">
                        ${icons.whatsapp}
                        <span>Continue on WhatsApp (+254 700 000 000)</span>
                      </a>
                    </div>
                  ` : ''}
                  <div class="comm-bubble-time">${time}</div>
                </div>
              `;
            }).join('')}
          ` : `
            <div style="text-align: center; padding: 40px 20px; color: #64748b;">
              <div style="width: 50px; height: 50px; border-radius: 50%; background: #ecfdf5; color: #047857; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
                ${icons.messageSquare}
              </div>
              <h4 style="margin: 0 0 6px 0; color: #0f172a;">Connectify Smart Central Assistant</h4>
              <p style="font-size: 0.85rem; margin: 0; line-height: 1.5;">
                Ask any question about orders, delivery, payment escrow, or commercial services. For in-depth requests, you will be seamlessly connected to our WhatsApp desk.
              </p>
            </div>
          `}
        </div>

        <!-- Quick Inquiry Chips -->
        <div class="comm-quick-chips">
          <button class="comm-chip-btn" data-chip="How does nationwide delivery and inspection work?">🚚 Delivery Info</button>
          <button class="comm-chip-btn" data-chip="Why are service prices not fixed? How do service inquiries work?">🛠️ Commercial Services</button>
          <button class="comm-chip-btn" data-chip="Can I arrange a site survey and material assessment for a service?">📍 Site Survey</button>
          <button class="comm-chip-btn" data-chip="How does M-Pesa escrow protection work?">🔒 Payment & Escrow</button>
          <button class="comm-chip-btn" data-chip="I need more details. Can I talk to an agent on WhatsApp?">📲 WhatsApp Desk</button>
        </div>

        <!-- Message Input Footer -->
        <div class="comm-drawer-footer">
          <input 
            type="text" 
            id="commDrawerInput" 
            class="comm-drawer-input" 
            placeholder="Type your inquiry to Central Desk..." 
            autocomplete="off"
          />
          <button class="comm-drawer-send-btn" id="btnCommDrawerSend" title="Send Message">
            ${icons.send}
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  const overlay = container.querySelector('#commDrawerOverlay');
  const btnFloating = container.querySelector('#btnFloatingCommDesk');
  const btnClose = container.querySelector('#btnCloseCommDrawer');
  const input = container.querySelector('#commDrawerInput');
  const btnWaLead = container.querySelector('#btnDrawerWaLead');
  const btnSend = container.querySelector('#btnCommDrawerSend');

  btnWaLead?.addEventListener('click', () => {
    const auth = store.state.auth || {};
    const custName = (auth.isAuthenticated && auth.user) ? auth.user.name : 'Storefront Visitor';
    const custPhone = (auth.isAuthenticated && auth.user) ? auth.user.phone : '+254 700 000 000';
    store.logWhatsAppInquiry({
      customerName: custName,
      customerPhone: custPhone,
      text: 'Customer clicked WhatsApp Desk from Central Support Drawer',
      productName: 'General Storefront Inquiry'
    });
    window.showToast('Connecting to Connectify WhatsApp Support Desk...', 'info');
  });

  btnFloating?.addEventListener('click', () => {
    isDrawerOpen = true;
    overlay.classList.add('open');
    scrollMessagesToBottom();
    input?.focus();
  });

  btnClose?.addEventListener('click', () => {
    isDrawerOpen = false;
    overlay.classList.remove('open');
  });

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      isDrawerOpen = false;
      overlay.classList.remove('open');
    }
  });

  // Quick Chips: Instant Fill & Send
  container.querySelectorAll('.comm-chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-chip');
      if (input) {
        input.value = text;
        handleSend();
      }
    });
  });

  // Smart Agent Answer Generator
  function getSmartAgentReply(query) {
    const q = (query || '').toLowerCase();

    // 1. Site Survey for Services
    if (q.includes('survey') || q.includes('visit') || q.includes('measurement') || q.includes('site inspection')) {
      return {
        text: 'Yes! For interior fitouts, gypsum ceilings, and custom structural projects, we arrange on-site surveys in Nairobi and surrounding areas. Our engineering specialist takes laser measurements and assesses your building requirements before preparing your quotation.',
        waPrompt: `Hello Connectify Services Desk, I would like to schedule an on-site survey and material assessment for my project: "${query.slice(0, 80)}"`
      };
    }

    // 2. Service / Custom Quotes / BQ / Materials Questions
    if (q.includes('service') || q.includes('quote') || q.includes('bq') || q.includes('scope') || q.includes('material') || q.includes('interior') || q.includes('fitout') || q.includes('ceiling') || q.includes('gypsum') || q.includes('airbnb') || q.includes('cyber') || q.includes('branding') || q.includes('safari') || q.includes('chauffeur') || q.includes('transport') || q.includes('truck')) {
      return {
        text: 'For all commercial services, pricing is customized per project rather than fixed rates. Costs vary depending on materials needed, project dimensions, and labor scope variables.\n\nOur service desk prepares fast, obligation-free assessments. Tap below to chat directly with our project coordinator on WhatsApp!',
        waPrompt: `Hello Connectify Services Desk, I would like to get more details and a details for a service: "${query.slice(0, 80)}"`
      };
    }

    // 3. Goods / Products / Ordering / Stock
    if (q.includes('buy') || q.includes('order') || q.includes('item') || q.includes('chair') || q.includes('generator') || q.includes('inverter') || q.includes('solar') || q.includes('stock') || q.includes('available')) {
      return {
        text: 'All commercial equipment and goods on Connectify are factory-sealed, 100% genuine, and physically inspected by our team before dispatch. You can add them to your cart online or order directly via WhatsApp.',
        waPrompt: `Hello Connectify Support, I would like to check availability and order this product: "${query.slice(0, 80)}"`
      };
    }

    // 4. Delivery / Shipping / Timeframe
    if (q.includes('deliver') || q.includes('ship') || q.includes('dispatch') || q.includes('how long') || q.includes('when') || q.includes('arrive') || q.includes('location') || q.includes('nairobi') || q.includes('mombasa') || q.includes('county') || q.includes('town')) {
      return {
        text: 'We provide doorstep delivery nationwide across Kenya! Nairobi orders arrive within 2-4 hours, and upcountry counties (Mombasa, Kisumu, Nakuru, Eldoret) arrive within 24 hours. Every product is physically inspected before dispatch.',
        waPrompt: `Hello Connectify Desk, I would like to check doorstep delivery rates and dispatch times for: "${query.slice(0, 80)}"`
      };
    }

    // 5. Payment / M-Pesa / Escrow / Safety
    if (q.includes('pay') || q.includes('mpesa') || q.includes('m-pesa') || q.includes('till') || q.includes('paybill') || q.includes('escrow') || q.includes('safe') || q.includes('security') || q.includes('invoice') || q.includes('proforma')) {
      return {
        text: 'Payments are 100% secure via Lipa na M-Pesa (Buy Goods Till 891024 or Paybill 522522). Funds are held safely in escrow until you inspect and approve your delivery. Official VAT receipts are provided.',
        waPrompt: 'Hello Connectify Desk, I have a question regarding M-Pesa payment escrow and proforma invoicing.'
      };
    }

    // 6. Quality / Inspection / Warranty
    if (q.includes('inspect') || q.includes('warranty') || q.includes('guarantee') || q.includes('genuine') || q.includes('condition') || q.includes('return') || q.includes('refund')) {
      return {
        text: 'Every item comes with a genuine manufacturer warranty and undergoes mandatory physical quality inspection by Connectify before dispatch. We also offer a 7-day direct replacement guarantee.',
        waPrompt: 'Hello Connectify Desk, can you provide inspection verification and warranty details for my order?'
      };
    }

    // 7. Bulk orders / Wholesale
    if (q.includes('bulk') || q.includes('wholesale') || q.includes('discount') || q.includes('company') || q.includes('procurement')) {
      return {
        text: 'We contract directly with vetted manufacturers and top Kenyan distributors, offering wholesale buying price (BP) discounts for volume and corporate purchases.',
        waPrompt: 'Hello Connectify Desk, I am looking to place a bulk procurement order with wholesale pricing.'
      };
    }

    // 8. WhatsApp direct request
    if (q.includes('whatsapp') || q.includes('chat') || q.includes('agent') || q.includes('human') || q.includes('talk') || q.includes('call') || q.includes('phone')) {
      return {
        text: 'Our dedicated customer operations team is active right now on WhatsApp (+254 700 000 000) for fast 1-on-1 assistance, live order tracking, and service details.',
        waPrompt: `Hello Connectify Support, I would like to chat directly with an agent regarding: "${query.slice(0, 80)}"`
      };
    }

    // 9. General / Default
    return {
      text: 'Thank you for messaging Connectify Central Desk! I can assist with platform information on delivery, orders, payment escrow, and verified services. For specific product inquiries or custom project scopes, our operations specialist is ready to help.',
      waPrompt: `Hello Connectify Desk, I would like to get more details regarding: "${query.slice(0, 80)}"`
    };
  }

  // Send Message Logic with Automated Smart Agent Response
  const handleSend = () => {
    const val = input ? input.value.trim() : '';
    if (!val) return;

    const auth = store.state.auth || {};
    const custName = (auth.isAuthenticated && auth.user) ? auth.user.name : 'Prospective Buyer';
    const custPhone = (auth.isAuthenticated && auth.user) ? auth.user.phone : '+254 700 123 456';
    const custEmail = (auth.isAuthenticated && auth.user) ? auth.user.email : 'buyer@connectify.co.ke';

    const currentThreadId = currentThread ? currentThread.id : null;

    const sentThread = store.sendCustomerMessage({
      threadId: currentThreadId,
      customerName: custName,
      customerPhone: custPhone,
      customerEmail: custEmail,
      subject: currentThread ? currentThread.subject : 'Storefront Live Desk Inquiry',
      text: val,
      channel: 'Live Storefront Desk'
    });

    if (input) input.value = '';
    window.showToast('Message sent to Connectify Central Desk!', 'success');
    scrollMessagesToBottom();

    // Agent automatically answers simple questions and provides WhatsApp reroute
    setTimeout(() => {
      const reply = getSmartAgentReply(val);
      const activeId = sentThread ? sentThread.id : (store.state.activeCommThreadId || currentThreadId);
      if (activeId) {
        store.replyAdminMessage(activeId, reply.text, 'Connectify Central Assistant', reply.waPrompt);
      }
    }, 450);
  };

  btnSend?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });

  if (isDrawerOpen) {
    scrollMessagesToBottom();
  }
}

function scrollMessagesToBottom() {
  setTimeout(() => {
    const body = document.getElementById('commDrawerMessagesBody');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }, 50);
}
