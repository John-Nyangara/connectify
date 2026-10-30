// CONNECTIFY — Initial Seed Data & Mock Database
// Multi-Merchant Platform · Direct Supplier Catalogues · Zero "broker" terminology
// Verified Goods & Services Categories for Kenya Marketplace

export const initialCategories = [
  // Confirmed Goods Categories
  { id: 'cat-furniture', name: 'Furniture & Workstations', icon: 'chair', type: 'goods', count: 18, description: 'Executive mahogany desks, ergonomic chairs, modern sofas & boardroom suites' },
  { id: 'cat-roofing', name: 'Roofing & Mabati Supply', icon: 'roof', type: 'goods', count: 16, description: 'Box profile, tile profile, corrugated iron sheets & factory-grade roofing accessories' },
  { id: 'cat-gas', name: 'Gas Sell & Supply', icon: 'flame', type: 'goods', count: 12, description: 'LPG cooking gas cylinders (6kg, 13kg, 50kg), direct refills & commercial delivery' },
  { id: 'cat-laptops', name: 'Dealers in Laptops', icon: 'laptop', type: 'goods', count: 24, description: 'HP EliteBooks, ThinkPads, Dell Latitudes, MacBooks & high-spec business laptops' },
  { id: 'cat-laptop-acc', name: 'Laptop Accessories', icon: 'charger', type: 'goods', count: 32, description: 'Original 65W/100W GaN chargers, aluminum stands, custom vinyl stickers & docks' },
  { id: 'cat-phones', name: 'Phones & Tablets', icon: 'smartphone', type: 'goods', count: 28, description: 'Flagship 5G phones, iPhones, Samsung Galaxy devices & commercial enterprise tablets' },
  { id: 'cat-phone-acc', name: 'Phone Accessories', icon: 'sticker', type: 'goods', count: 40, description: 'PD fast chargers, MagSafe mounts, shockproof rugged cases & screen protectors' },

  // Confirmed Services Categories
  { id: 'cat-interior', name: 'Interior Design & Fit-outs', icon: 'home', type: 'services', count: 14, description: 'Commercial office fitouts, residential gypsum ceilings & luxury interior styling' },
  { id: 'cat-photography', name: 'Photography & Editing', icon: 'camera', type: 'services', count: 15, description: 'Corporate portraiture, commercial product shoots, event coverage & 4K video editing' },
  { id: 'cat-cyber', name: 'Cyber Services', icon: 'monitor', type: 'services', count: 20, description: 'KRA iTax, eCitizen portal filing, NTSA TIMS, CR12 company registrations & document services' },
  { id: 'cat-academic', name: 'Academic Accounts & Research', icon: 'bookOpen', type: 'services', count: 12, description: 'Verified Turnitin checks, research tool licenses, academic writing portals & study resources' },
  { id: 'cat-airbnbs', name: 'Airbnbs & Short Stays', icon: 'bed', type: 'services', count: 22, description: 'Furnished luxury studios, 2BR penthouses, serviced apartments in Kilimani, Westlands & Diani' },
  { id: 'cat-cabs', name: 'Cab & Chauffeur Services', icon: 'car', type: 'services', count: 16, description: 'Airport pick & drop (JKIA/Wilson), daily executive chauffeur, wedding fleets & city rides' },
  { id: 'cat-transport', name: 'Transportation & Logistics', icon: 'truck', type: 'services', count: 14, description: 'County cargo haulage, 3-tonne to 10-tonne lorry hire, house moving & parcels' },
  { id: 'cat-travel', name: 'Travel & Tours Safaris', icon: 'compass', type: 'services', count: 18, description: 'Maasai Mara safari packages, Amboseli, coastal Mombasa/Diani holidays & flight bookings' },
  { id: 'cat-branding', name: 'Branding & Printing Services', icon: 'printer', type: 'services', count: 25, description: 'Corporate polo t-shirts, 3D signage, branded stationery, rollup banners & vehicle wraps' }
];

export const initialSuppliers = [
  {
    id: 'sup-furniture',
    name: 'Apex Office & Home Furnishings Ltd',
    contactPerson: 'David Mutua',
    phone: '+254 712 345 678',
    email: 'sales@apexoffice.co.ke',
    location: 'Enterprise Road, Industrial Area, Nairobi',
    coverage: ['Nairobi', 'Kiambu', 'Machakos', 'Nakuru'],
    categories: ['cat-furniture'],
    paymentTerms: 'Net 15 Days',
    deliveryTerms: 'Platform pickup or next-day warehouse drop-off within Nairobi',
    status: 'active',
    rating: 4.8,
    activeListingsCount: 3
  },
  {
    id: 'sup-roofing',
    name: 'Mabati Rolling Hub Ltd',
    contactPerson: 'Jackson Mwangi',
    phone: '+254 722 456 789',
    email: 'orders@mabatihub.co.ke',
    location: 'Mombasa Road Industrial Zone, Nairobi',
    coverage: ['Nationwide (All 47 Counties)'],
    categories: ['cat-roofing'],
    paymentTerms: '50% Upon Order, 50% on Delivery Confirmation',
    deliveryTerms: 'Factory-direct lorry dispatch to construction sites across Kenya',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 3
  },
  {
    id: 'sup-gas',
    name: 'Nairobi Gas Express & Energy Ltd',
    contactPerson: 'Peter Kamau',
    phone: '+254 733 987 654',
    email: 'supply@nairogigas.co.ke',
    location: 'Outering Road Depot & South B, Nairobi',
    coverage: ['Nairobi Metropolitan', 'Kiambu', 'Kajiado'],
    categories: ['cat-gas'],
    paymentTerms: 'Weekly settlement via M-Pesa / Bank Wire',
    deliveryTerms: 'Same-day motorbike and pickup dispatch within 45 minutes',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 3
  },
  {
    id: 'sup-interior',
    name: 'ZenSpaces Interior Architecture & Fit-outs',
    contactPerson: 'Maureen Achieng',
    phone: '+254 720 112 233',
    email: 'projects@zenspaces.co.ke',
    location: 'Delta Corner, Westlands, Nairobi',
    coverage: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
    categories: ['cat-interior'],
    paymentTerms: 'Milestone escrow (40% Mobilization, 40% Fitout, 20% Handover)',
    deliveryTerms: 'Site deployment within 48 hours of site survey approval',
    status: 'active',
    rating: 4.8,
    activeListingsCount: 2
  },
  {
    id: 'sup-photography',
    name: 'StudioLens Creative Media & Production',
    contactPerson: 'Ian Kiprono',
    phone: '+254 715 678 901',
    email: 'shoots@studiolens.co.ke',
    location: 'Ngong Road Creative Studios, Nairobi',
    coverage: ['Nairobi Metropolitan', 'Destination Shoots Nationwide'],
    categories: ['cat-photography'],
    paymentTerms: '50% Booking Deposit, 50% High-Res Asset Handover',
    deliveryTerms: 'Proofs in 24 hours, final retouched high-res gallery in 72 hours',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 3
  },
  {
    id: 'sup-cyber',
    name: 'Express Cyber & E-Citizen Central Desk',
    contactPerson: 'Mercy Wambui',
    phone: '+254 724 889 900',
    email: 'services@expresscyber.co.ke',
    location: 'Bazaar Plaza, Moi Avenue, Nairobi CBD',
    coverage: ['Nationwide (Digital Remote & In-Person Desk)'],
    categories: ['cat-cyber'],
    paymentTerms: 'Instant Settlement / Weekly Retainer',
    deliveryTerms: 'Direct digital PDF dispatch via WhatsApp & Encrypted Email',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 3
  },
  {
    id: 'sup-academic',
    name: 'Elite Academic Research Portals Hub',
    contactPerson: 'Brian Cheruiyot',
    phone: '+254 705 334 455',
    email: 'access@eliteacademic.co.ke',
    location: 'University Way, Nairobi CBD',
    coverage: ['Global / Digital Instant Access'],
    categories: ['cat-academic'],
    paymentTerms: 'Net 3 Days upon account activation',
    deliveryTerms: 'Instant credentials dispatch via SMS & Email within 15 minutes',
    status: 'active',
    rating: 4.7,
    activeListingsCount: 3
  },
  {
    id: 'sup-airbnbs',
    name: 'Serene Stays Hospitality Group',
    contactPerson: 'Linda Kemunto',
    phone: '+254 711 778 899',
    email: 'host@serenestays.co.ke',
    location: 'Lenana Road, Kilimani & Westlands, Nairobi',
    coverage: ['Nairobi (Kilimani, Westlands, Kileleshwa)', 'Diani Beach'],
    categories: ['cat-airbnbs'],
    paymentTerms: 'Guest check-in settlement',
    deliveryTerms: 'Keyless smart lock code sent 2 hours before check-in',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 3
  },
  {
    id: 'sup-cabs',
    name: 'SwiftRide Executive Cabs & Chauffeurs',
    contactPerson: 'George Otieno',
    phone: '+254 722 990 011',
    email: 'fleet@swiftride.co.ke',
    location: 'JKIA Terminal 1A Hub & Westlands, Nairobi',
    coverage: ['Nairobi Metropolitan', 'JKIA Airport Transfers', 'Upcountry Trips'],
    categories: ['cat-cabs'],
    paymentTerms: 'Daily trip settlement via M-Pesa / Corporate Account Net 15',
    deliveryTerms: 'Airport chauffeur on standby with name board at arrivals',
    status: 'active',
    rating: 4.8,
    activeListingsCount: 3
  },
  {
    id: 'sup-transport',
    name: 'TransKenya Haulage & Freight Logistics',
    contactPerson: 'Daniel Kipkemboi',
    phone: '+254 731 223 344',
    email: 'logistics@transkenya.co.ke',
    location: 'Baba Dogo Road, Ruaraka, Nairobi',
    coverage: ['Nationwide (All 47 Counties)'],
    categories: ['cat-transport'],
    paymentTerms: 'Net 14 Days',
    deliveryTerms: 'GPS tracked lorries dispatched within 2 hours of booking',
    status: 'active',
    rating: 4.7,
    activeListingsCount: 3
  },
  {
    id: 'sup-travel',
    name: 'SafariQuest Tours & Travel Ltd',
    contactPerson: 'Cynthia Nduta',
    phone: '+254 701 556 677',
    email: 'safaris@safariquest.co.ke',
    location: 'Standard Street, CBD, Nairobi',
    coverage: ['Maasai Mara', 'Amboseli', 'Tsavo', 'Diani', 'Nakuru', 'Samburu'],
    categories: ['cat-travel'],
    paymentTerms: '30% Deposit to secure lodge, balance 7 days before departure',
    deliveryTerms: 'Hotel/Airport pickup in customized 4x4 pop-up safari Land Cruiser',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 3
  },
  {
    id: 'sup-branding',
    name: 'BrandCraft Print & Merchandising Ltd',
    contactPerson: 'Evans Barasa',
    phone: '+254 728 667 788',
    email: 'production@brandcraft.co.ke',
    location: 'Kirinyaga Road / River Road Production Facility, Nairobi',
    coverage: ['Nationwide (All 47 Counties)'],
    categories: ['cat-branding'],
    paymentTerms: 'Net 10 Days',
    deliveryTerms: 'Sample mockups in 12 hours, bulk order delivery in 3 business days',
    status: 'active',
    rating: 4.8,
    activeListingsCount: 4
  },
  {
    id: 'sup-techhub',
    name: 'Nairobi TechHub Distributers Ltd',
    contactPerson: 'Kelvin Maina',
    phone: '+254 711 223 344',
    email: 'sales@techhub.co.ke',
    location: 'Kimathi Street, CBD, Nairobi',
    coverage: ['Nairobi', 'Kiambu', 'Mombasa', 'Nakuru'],
    categories: ['cat-laptops'],
    paymentTerms: 'Net 14 Days',
    deliveryTerms: 'Same day dispatch within Nairobi CBD depot',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 3
  },
  {
    id: 'sup-silicon-acc',
    name: 'Silicon Accessories Wholesale Hub',
    contactPerson: 'Angela Mwangi',
    phone: '+254 728 554 433',
    email: 'supply@siliconacc.co.ke',
    location: 'Luthuli Avenue, Nairobi CBD',
    coverage: ['Nationwide (All 47 Counties)'],
    categories: ['cat-laptop-acc'],
    paymentTerms: 'Weekly settlement via M-Pesa / Bank',
    deliveryTerms: 'Next-day courier dispatch',
    status: 'active',
    rating: 4.8,
    activeListingsCount: 3
  },
  {
    id: 'sup-primecell',
    name: 'PrimeCell Communications Kenya',
    contactPerson: 'Collins Ochieng',
    phone: '+254 701 998 877',
    email: 'orders@primecell.co.ke',
    location: 'Tom Mboya Street & Westlands, Nairobi',
    coverage: ['Nationwide (All 47 Counties)'],
    categories: ['cat-phones'],
    paymentTerms: 'Escrow payment on delivery inspection',
    deliveryTerms: 'Insured transit across Kenya within 24-48 hrs',
    status: 'active',
    rating: 4.9,
    activeListingsCount: 2
  },
  {
    id: 'sup-omnicharge',
    name: 'OmniCharge Mobile Solutions Ltd',
    contactPerson: 'Faith Njeri',
    phone: '+254 734 112 299',
    email: 'b2b@omnicharge.co.ke',
    location: 'Bazaar Plaza, Moi Avenue, Nairobi',
    coverage: ['Nairobi Metropolitan', 'Eldoret', 'Kisumu'],
    categories: ['cat-phone-acc'],
    paymentTerms: 'Net 7 Days',
    deliveryTerms: 'Free drop-off at central logistics hub',
    status: 'active',
    rating: 4.7,
    activeListingsCount: 2
  }
];

export const initialProducts = [
  // ==========================================
  // 1. FURNITURE & WORKSTATIONS
  // ==========================================
  {
    id: 'prod-chair-01',
    name: 'Ergonomic Mesh Office Chair',
    type: 'goods',
    categoryId: 'cat-furniture',
    description: 'High-density breathable Korean mesh back, 3D adjustable armrests, synchronized tilt lock mechanism, and Class 4 heavy duty hydraulic gas lift. Built for 12+ hour daily executive endurance.',
    images: ['assets/images/chair.jpg'],
    specs: {
      'Material': 'Breathable Korean mesh & nylon glass fiber frame',
      'Adjustment': '3D adjustable armrests, lumbar support, 135° recline',
      'Gas Lift': 'Class 4 BIFMA Certified hydraulic cylinder',
      'Weight Capacity': 'Up to 150 kg',
      'Warranty': '2 Years Replacement Guarantee'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-chair-1',
    defaultMarkupPercent: 25.0,
    transportHandlingCost: 500,
    sellingPrice: 12500,
    manualPriceOverride: false,
    stockQuantity: 45,
    location: 'Industrial Area, Nairobi',
    rating: 4.9,
    reviewsCount: 38,
    createdAt: '2026-10-24T08:00:00Z'
  },
  {
    id: 'prod-desk-02',
    name: 'Executive L-Shaped Office Desk',
    type: 'goods',
    categoryId: 'cat-furniture',
    description: 'Mastercrafted solid mahogany veneer finish with leatherette writing blotter, central lock 3-drawer pedestal, wire grommet channels, and spacious side return storage cabinet.',
    images: ['assets/images/chair.jpg'],
    specs: {
      'Dimensions': 'Main Desk: 2000mm x 900mm x 760mm',
      'Finish': 'Natural high-gloss scratch resistant mahogany',
      'Storage': '3 Lockable drawers + side credenza cabinet',
      'Grommets': 'Dual brush metal cable pass-throughs'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: false,
    activeSupplierOfferId: 'off-desk-2',
    defaultMarkupPercent: 32.8,
    transportHandlingCost: 1500,
    sellingPrice: 42500,
    manualPriceOverride: false,
    stockQuantity: 12,
    location: 'Enterprise Road, Nairobi',
    rating: 4.8,
    reviewsCount: 14,
    createdAt: '2026-10-25T11:00:00Z'
  },
  {
    id: 'prod-boardroom-03',
    name: '8-Seater Modular Boardroom Table',
    type: 'goods',
    categoryId: 'cat-furniture',
    description: 'Premium conference table engineered for modern video conference rooms. Features dual flip-up connectivity boxes with HDMI, power and USB pass-through, mounted on powder-coated structural steel legs.',
    images: ['assets/images/chair.jpg'],
    specs: {
      'Capacity': '8 to 10 Executives',
      'Dimensions': '2800mm length x 1200mm width x 750mm height',
      'Connectivity': '2x Flip-up module (2 Power, 1 HDMI, 2 USB)',
      'Frame': 'Heavy gauge steel beam structure'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-boardroom-3',
    defaultMarkupPercent: 35.4,
    transportHandlingCost: 2000,
    sellingPrice: 65000,
    manualPriceOverride: false,
    stockQuantity: 8,
    location: 'Industrial Area, Nairobi',
    rating: 4.9,
    reviewsCount: 9,
    createdAt: '2026-10-26T09:30:00Z'
  },

  // ==========================================
  // 2. ROOFING & MABATI SUPPLY
  // ==========================================
  {
    id: 'prod-roof-01',
    name: 'Resincot Box Profile Mabati G28',
    type: 'goods',
    categoryId: 'cat-roofing',
    description: 'Factory-direct premium aluminum-zinc alloy coated iron sheets. High tensile strength, fade-resistant UV protective coating, superior thermal reflection, and guaranteed 50-year anti-rust longevity.',
    images: ['assets/images/roofing.jpg'],
    specs: {
      'Profile': 'Modern Box Profile 1020mm effective cover width',
      'Gauge': 'Standard Certified Gauge 28 (0.32mm thickness)',
      'Lengths': '3.0 Meters (Custom lengths available on order)',
      'Colors': 'Charcoal Slate, Brick Red, Forest Green, Navy Blue',
      'Coating': 'Alu-Zinc Alloy with Multi-Layer Oven Baked Paint'
    },
    unit: 'sheet',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-roof-1',
    defaultMarkupPercent: 26.2,
    transportHandlingCost: 100,
    sellingPrice: 2650,
    manualPriceOverride: false,
    stockQuantity: 450,
    location: 'Mombasa Road Industrial Zone, Nairobi',
    rating: 4.9,
    reviewsCount: 82,
    createdAt: '2026-10-25T14:00:00Z'
  },
  {
    id: 'prod-roof-02',
    name: 'Versatile Tile Profile Mabati G28',
    type: 'goods',
    categoryId: 'cat-roofing',
    description: 'Aesthetic European clay tile look combined with the structural strength of heavy steel. Adds immediate prestige, luxury curb appeal, and weather-proof protection to modern residential houses.',
    images: ['assets/images/roofing.jpg'],
    specs: {
      'Profile': 'Roman Ceramic Tile Style Embossed Profile',
      'Gauge': 'Heavy Duty Gauge 28',
      'Finish': 'Wrinkle Textured Matte Finish (Zero Glare)',
      'Effective Width': '980mm'
    },
    unit: 'sheet',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-roof-2',
    defaultMarkupPercent: 29.2,
    transportHandlingCost: 100,
    sellingPrice: 3100,
    manualPriceOverride: false,
    stockQuantity: 280,
    location: 'Mombasa Road, Nairobi',
    rating: 4.8,
    reviewsCount: 47,
    createdAt: '2026-10-26T10:00:00Z'
  },
  {
    id: 'prod-roof-03',
    name: 'Roofing Ridges & Valley Gutters',
    type: 'goods',
    categoryId: 'cat-roofing',
    description: 'Precision folded matching gauge 28 roof capping ridges and valley gutters. Guarantees 100% leak-proof junction joints on roof hips, ridges, and slopes.',
    images: ['assets/images/roofing.jpg'],
    specs: {
      'Length': '2.4 Meters per piece',
      'Material': 'Color-matched prepainted alu-zinc steel',
      'Gauge': 'Gauge 28 matching roofing profile'
    },
    unit: 'piece',
    status: 'published',
    isFeatured: false,
    activeSupplierOfferId: 'off-roof-3',
    defaultMarkupPercent: 41.2,
    transportHandlingCost: 50,
    sellingPrice: 1200,
    manualPriceOverride: false,
    stockQuantity: 320,
    location: 'Nairobi Central Depot',
    rating: 4.8,
    reviewsCount: 19,
    createdAt: '2026-10-26T12:00:00Z'
  },

  // ==========================================
  // 3. GAS SELL & SUPPLY
  // ==========================================
  {
    id: 'prod-gas-01',
    name: 'TotalEnergies 13kg Gas Cylinder',
    type: 'goods',
    categoryId: 'cat-gas',
    description: 'Complete genuine 13kg TotalEnergies LPG gas cylinder package. Includes official safety seal, brass valve, certified safety hose pipe, and leak-proof brass regulator. Inspected and weighed before delivery.',
    images: ['assets/images/gas.jpg'],
    specs: {
      'Capacity': '13 Kilograms Net LPG',
      'Includes': 'Brand new branded cylinder, initial gas fill, hose & regulator',
      'Safety': 'KEBS certified valve with tamper-proof seal',
      'Delivery': 'Express delivery within 45 mins + free leak test check'
    },
    unit: 'cylinder',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-gas-1',
    defaultMarkupPercent: 19.5,
    transportHandlingCost: 200,
    sellingPrice: 9800,
    manualPriceOverride: false,
    stockQuantity: 65,
    location: 'Outering Road / South B, Nairobi',
    rating: 4.9,
    reviewsCount: 64,
    createdAt: '2026-10-25T07:30:00Z'
  },
  {
    id: 'prod-gas-02',
    name: 'Afrigas 6kg Complete Gas Set',
    type: 'goods',
    categoryId: 'cat-gas',
    description: 'Compact and convenient 6kg Afrigas setup perfect for modern studio apartments, students, and home cooking. Comes with heavy stainless steel cooking grill, high-efficiency burner, and full gas load.',
    images: ['assets/images/gas.jpg'],
    specs: {
      'Capacity': '6 Kilograms LPG',
      'Includes': 'Cylinder, full gas fill, burner, heavy duty trivet grill',
      'Portability': 'Integrated steel handle for easy transport',
      'Certification': 'KEBS diamond mark of quality'
    },
    unit: 'cylinder',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-gas-2',
    defaultMarkupPercent: 22.7,
    transportHandlingCost: 150,
    sellingPrice: 5400,
    manualPriceOverride: false,
    stockQuantity: 90,
    location: 'Nairobi Metropolitan Depot',
    rating: 4.8,
    reviewsCount: 52,
    createdAt: '2026-10-26T08:15:00Z'
  },
  {
    id: 'prod-gas-03',
    name: '13kg Gas Refill & Exchange',
    type: 'goods',
    categoryId: 'cat-gas',
    description: 'Hassle-free doorstep empty cylinder exchange. We collect your empty 13kg cylinder (K-Gas, Total, Afrigas, Rubis, ProGas, Shell) and deliver a calibrated, weighed, genuine seal replacement right to your kitchen.',
    images: ['assets/images/gas.jpg'],
    specs: {
      'Refill Weight': '13.0 kg Net Calibrated',
      'Accepted Brands': 'Total, Afrigas, K-Gas, Rubis, Ola, ProGas',
      'Turnaround': 'Delivered in under 45 minutes in Nairobi',
      'Safety Check': 'Free soap-bubble valve & regulator leak inspection on setup'
    },
    unit: 'refill',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-gas-3',
    defaultMarkupPercent: 21.4,
    transportHandlingCost: 100,
    sellingPrice: 3400,
    manualPriceOverride: false,
    stockQuantity: 120,
    location: 'Nairobi Metropolitan Depot',
    rating: 4.9,
    reviewsCount: 110,
    createdAt: '2026-10-26T09:00:00Z'
  },

  // ==========================================
  // 4. INTERIOR DESIGN & FIT-OUTS
  // ==========================================
  {
    id: 'prod-int-01',
    name: 'Commercial Office Interior Fit-Out',
    type: 'services',
    categoryId: 'cat-interior',
    description: 'Full-spectrum corporate workplace architectural makeover. Includes 3D photorealistic layout renderings, sound-dampening acoustic gypsum ceilings, LED recessed ambient lighting, luxury vinyl flooring, and glass partition cubicles.',
    images: ['assets/images/interior.jpg'],
    specs: {
      'Scope': 'Site survey, 3D CAD modeling, material supply & installation',
      'Deliverables': 'Acoustic ceilings, smart LED troughs, glass partitions, paintwork',
      'Timeline': '14 - 21 Business Days from site handover',
      'Guarantee': '5-Year Structural Workmanship Warranty'
    },
    unit: 'project',
    pricingModel: 'custom_quote',
    startingPrice: 65000,
    materialsRequired: true,
    surveyFee: 1500,
    rates: { turnkeyRate: 1850, laborOnlyRate: 650, unit: 'sq ft' },
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-int-1',
    defaultMarkupPercent: 37.5,
    transportHandlingCost: 5000,
    sellingPrice: 165000,
    manualPriceOverride: false,
    stockQuantity: 10,
    location: 'Westlands / Nairobi CBD Sites',
    rating: 4.9,
    reviewsCount: 21,
    createdAt: '2026-10-25T15:00:00Z'
  },
  {
    id: 'prod-int-02',
    name: 'Living Room Gypsum & Lighting',
    type: 'services',
    categoryId: 'cat-interior',
    description: 'Transform your home lounge into a hotel-grade retreat. Custom floating gypsum ceiling with warm white concealed LED strips, focal TV feature wall with fluted wood acoustic paneling and spotlighting.',
    images: ['assets/images/interior.jpg'],
    specs: {
      'Coverage': 'Standard living room up to 350 sq ft',
      'Included': 'Gypsum framing, skimming, Crown Silk emulsion paint, LED channels',
      'Duration': '5 to 7 Days clean installation',
      'Site Protection': 'Complete dust sealing of existing furniture during works'
    },
    unit: 'package',
    pricingModel: 'custom_quote',
    startingPrice: 45000,
    materialsRequired: true,
    surveyFee: 1500,
    rates: { turnkeyRate: 1650, laborOnlyRate: 600, unit: 'sq ft' },
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-int-2',
    defaultMarkupPercent: 46.1,
    transportHandlingCost: 2000,
    sellingPrice: 95000,
    manualPriceOverride: false,
    stockQuantity: 15,
    location: 'Nairobi Metropolitan',
    rating: 4.9,
    reviewsCount: 34,
    createdAt: '2026-10-26T14:30:00Z'
  },

  // ==========================================
  // 5. PHOTOGRAPHY & EDITING
  // ==========================================
  {
    id: 'prod-photo-01',
    name: 'Product Photography',
    type: 'services',
    categoryId: 'cat-photography',
    description: 'High-end studio product shoot with clean pure white / lifestyle backgrounds, studio strobe lighting, color calibration, and professional Photoshop skin/reflection cleanup. Optimized for websites, Jiji, and Instagram.',
    images: ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Images Count': '30 Full Resolution Retouched JPEG & PNG cutouts',
      'Lighting': 'Profoto studio flash with softboxes and rim reflectors',
      'Resolution': '45 Megapixels (Print & Ultra HD Web Ready)',
      'Delivery': 'Cloud Google Drive link within 48 hours'
    },
    unit: 'package',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-photo-1',
    defaultMarkupPercent: 60.0,
    transportHandlingCost: 500,
    sellingPrice: 24000,
    manualPriceOverride: false,
    stockQuantity: 25,
    location: 'Ngong Road Studios, Nairobi',
    rating: 4.9,
    reviewsCount: 41,
    createdAt: '2026-10-25T16:00:00Z'
  },
  {
    id: 'prod-photo-02',
    name: 'Corporate Event Photography & Video',
    type: 'services',
    categoryId: 'cat-photography',
    description: 'Full day executive coverage for corporate conferences, product launches, AGMs, or brand summits. Includes 2 pro photographers, 1 Sony 4K videographer with gimbal, wireless lavalier mics, and a 3-minute cinematic recap video.',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Coverage Time': 'Up to 8 Hours Full Day on Location',
      'Team': '2 Senior Photographers + 1 Cinema Videographer',
      'Deliverables': '300+ Color-graded digital photos + 3-minute 4K highlight reel + 60s Reel',
      'Turnaround': 'Same-day sneak peek, final deliverables in 5 business days'
    },
    unit: 'day',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-photo-2',
    defaultMarkupPercent: 57.1,
    transportHandlingCost: 1500,
    sellingPrice: 55000,
    manualPriceOverride: false,
    stockQuantity: 12,
    location: 'Nairobi & Destination Venues',
    rating: 4.9,
    reviewsCount: 29,
    createdAt: '2026-10-26T11:00:00Z'
  },

  // ==========================================
  // 6. CYBER SERVICES
  // ==========================================
  {
    id: 'prod-cyber-01',
    name: 'CR12 Company Registration & Filing',
    type: 'services',
    categoryId: 'cat-cyber',
    description: 'Certified fast-track Business Registration Service (BRS) filings. Instant procurement of official sealed CR12 certificate, Certificate of Incorporation, Memorandum of Association, and mandatory Beneficial Ownership records.',
    images: ['https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Official Agency': 'Business Registration Service (BRS) eCitizen Desk',
      'Deliverables': 'Official Digital Signed CR12 + Certificate of Incorporation PDF',
      'Speed': 'Processed and delivered within 24 business hours',
      'Verification': 'Verifiable directly via government QR Code'
    },
    unit: 'filing',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-cyber-1',
    defaultMarkupPercent: 71.4,
    transportHandlingCost: 0,
    sellingPrice: 6000,
    manualPriceOverride: false,
    stockQuantity: 100,
    location: 'CBD Moi Avenue / Online Kenya',
    rating: 4.9,
    reviewsCount: 78,
    createdAt: '2026-10-25T13:00:00Z'
  },
  {
    id: 'prod-cyber-02',
    name: 'KRA Returns & TCC Clearance',
    type: 'services',
    categoryId: 'cat-cyber',
    description: 'Comprehensive KRA corporate tax clearance. Includes audited balance sheet submission, VAT reconciliation, withholding tax adjustment, annual corporate income tax returns, and generation of active 12-month TCC clearance certificate.',
    images: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Authority': 'Kenya Revenue Authority (KRA iTax Portal)',
      'Includes': 'Income Tax Return, Nil / Audited Filing, TCC Application',
      'Output': 'Valid 12-Month Tax Compliance Certificate (TCC) PDF',
      'Turnaround': 'Cleared within 24 to 48 hours'
    },
    unit: 'certificate',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-cyber-2',
    defaultMarkupPercent: 80.0,
    transportHandlingCost: 0,
    sellingPrice: 4500,
    manualPriceOverride: false,
    stockQuantity: 150,
    location: 'Digital Remote Service across Kenya',
    rating: 4.8,
    reviewsCount: 92,
    createdAt: '2026-10-26T09:40:00Z'
  },

  // ==========================================
  // 7. ACADEMIC ACCOUNTS & RESEARCH
  // ==========================================
  {
    id: 'prod-acad-01',
    name: 'Turnitin Instructor Account',
    type: 'services',
    categoryId: 'cat-academic',
    description: 'Legitimate instructor-level Turnitin access that NEVER saves or deposits student work into global institutional repositories. Check similarity scores, AI writing detection percentages, and plagiarism indexes safely with zero risk of paper duplication.',
    images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Tier': 'Instructor Account (Non-Repository Mode Enabled)',
      'Validity': '365 Days Guaranteed with Instant Reset Support',
      'Features': 'Similarity index, detailed sources report, AI content detector',
      'Credentials': 'Direct private login credentials dispatched via email'
    },
    unit: 'license',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-acad-1',
    defaultMarkupPercent: 58.8,
    transportHandlingCost: 0,
    sellingPrice: 13500,
    manualPriceOverride: false,
    stockQuantity: 30,
    location: 'Digital Instant Activation',
    rating: 4.9,
    reviewsCount: 56,
    createdAt: '2026-10-25T17:00:00Z'
  },
  {
    id: 'prod-acad-02',
    name: 'Grammarly & QuillBot Suite',
    type: 'services',
    categoryId: 'cat-academic',
    description: 'Essential professional writing and paraphrasing bundle for university researchers, postgraduates, and academic consultants. Unlocks advanced tone suggestions, citation generator, plagiarism detector, and vocabulary enhancer.',
    images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Platforms': 'Grammarly Premium + QuillBot Premium Paraphraser',
      'Devices': 'Browser extensions, Word plugin, desktop apps',
      'Period': '12 Months Private Dedicated Profile'
    },
    unit: 'account',
    status: 'published',
    isFeatured: false,
    activeSupplierOfferId: 'off-acad-2',
    defaultMarkupPercent: 60.0,
    transportHandlingCost: 0,
    sellingPrice: 8000,
    manualPriceOverride: false,
    stockQuantity: 40,
    location: 'Digital Remote',
    rating: 4.8,
    reviewsCount: 33,
    createdAt: '2026-10-26T13:00:00Z'
  },

  // ==========================================
  // 8. AIRBNBS & SHORT STAYS
  // ==========================================
  {
    id: 'prod-airbnb-01',
    name: 'Luxury Westlands Studio Apartment',
    type: 'services',
    categoryId: 'cat-airbnbs',
    description: 'Designer furnished high-rise studio in the heart of Westlands. Features orthopedic queen bed, high-speed 100Mbps fiber internet, smart 55" 4K TV with Netflix, fully equipped kitchen with microwave and induction cooker, heated rooftop pool, and 24/7 biometric security.',
    images: ['assets/images/airbnb.jpg'],
    specs: {
      'Bedrooms / Bathrooms': '1 Studio Suite / 1 Designer Bathroom',
      'Amenities': 'Heated rooftop pool, gym, free basement parking, 100Mbps WiFi',
      'Power / Water': 'Automatic backup generator & borehole water supply',
      'Check-in / Check-out': 'Self check-in smart lock (2:00 PM / 10:00 AM)'
    },
    unit: 'night',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-bnb-1',
    defaultMarkupPercent: 38.1,
    transportHandlingCost: 0,
    sellingPrice: 5800,
    manualPriceOverride: false,
    stockQuantity: 28,
    location: 'Westlands, Nairobi',
    rating: 4.9,
    reviewsCount: 88,
    createdAt: '2026-10-25T12:00:00Z'
  },
  {
    id: 'prod-airbnb-02',
    name: 'Executive 2BR Kilimani Penthouse',
    type: 'services',
    categoryId: 'cat-airbnbs',
    description: 'Spacious 2-bedroom en-suite penthouse on Lenana Road, Kilimani. Ideal for corporate travelers, expatriates, and families. Features king master bed, washing machine, dedicated workspace, high-speed WiFi, and serene garden balcony.',
    images: ['assets/images/airbnb.jpg'],
    specs: {
      'Occupancy': 'Up to 4 Adults comfortably',
      'Bedrooms': '2 En-Suite Bedrooms with luxury linen',
      'Features': 'Washer/Dryer, balcony lounge, 65" OLED TV, fast fiber'
    },
    unit: 'night',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-bnb-2',
    defaultMarkupPercent: 40.0,
    transportHandlingCost: 0,
    sellingPrice: 10500,
    manualPriceOverride: false,
    stockQuantity: 18,
    location: 'Lenana Road, Kilimani, Nairobi',
    rating: 4.9,
    reviewsCount: 54,
    createdAt: '2026-10-26T15:00:00Z'
  },

  // ==========================================
  // 9. CAB SERVICES
  // ==========================================
  {
    id: 'prod-cab-01',
    name: 'JKIA Airport Executive Chauffeur',
    type: 'services',
    categoryId: 'cat-cabs',
    description: 'VIP door-to-door airport transfer service. Professional suited chauffeur waits with personalized electronic name tablet at international/domestic arrivals. Includes flight tracking, luggage assistance, toll charges, and chilled bottled water.',
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Vehicle': 'Executive Sedan (Mercedes-Benz C-Class / VW Passat / Noah)',
      'Luggage Capacity': '3 Large Suitcases + 3 Hand Luggage',
      'Included': 'All Expressway tolls, parking fees & waiting time up to 60 mins',
      'Driver': 'Verified, vetted, English-speaking professional chauffeur'
    },
    unit: 'trip',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-cab-1',
    defaultMarkupPercent: 40.6,
    transportHandlingCost: 0,
    sellingPrice: 4500,
    manualPriceOverride: false,
    stockQuantity: 20,
    location: 'JKIA Airport / Nairobi Hotels',
    rating: 4.9,
    reviewsCount: 76,
    createdAt: '2026-10-25T18:00:00Z'
  },
  {
    id: 'prod-cab-02',
    name: '12-Hour City Chauffeur Hire',
    type: 'services',
    categoryId: 'cat-cabs',
    description: 'Dedicated corporate day chauffeur for business meetings, delegations, or city itineraries. Immaculate executive saloon car dedicated exclusively to your schedule throughout Nairobi and Kiambu.',
    images: ['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Duration': '12 Consecutive Hours (e.g. 7:00 AM - 7:00 PM)',
      'Fuel': 'Included up to 100km within Nairobi metropolitan radius',
      'Vehicle': 'Executive Toyota Crown / Camry / Vanguard'
    },
    unit: 'day',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-cab-2',
    defaultMarkupPercent: 50.0,
    transportHandlingCost: 0,
    sellingPrice: 13500,
    manualPriceOverride: false,
    stockQuantity: 12,
    location: 'Nairobi Metropolitan',
    rating: 4.8,
    reviewsCount: 42,
    createdAt: '2026-10-26T14:00:00Z'
  },

  // ==========================================
  // 10. TRANSPORTATION SERVICES & HAULAGE
  // ==========================================
  {
    id: 'prod-trans-01',
    name: '5-Tonne Canter Lorry Transit',
    type: 'services',
    categoryId: 'cat-transport',
    description: 'Heavy goods cargo transit using secure enclosed 5-tonne Isuzu NPR lorries. Equipped with live satellite GPS tracking, tarpaulin weather seals, and experienced long-distance commercial drivers.',
    images: ['https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Payload Capacity': '5,000 kg (5 Tonnes)',
      'Tracking': 'Real-time client GPS live link with speed monitoring',
      'Routes': 'Nairobi to Nakuru, Eldoret, Kisumu, Mombasa, Nyeri, Meru',
      'Insurance': 'Goods-in-Transit (GIT) cover up to KSh 3,000,000'
    },
    unit: 'trip',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-trans-1',
    defaultMarkupPercent: 45.5,
    transportHandlingCost: 0,
    sellingPrice: 32000,
    manualPriceOverride: false,
    stockQuantity: 15,
    location: 'Baba Dogo Depot, Nairobi',
    rating: 4.8,
    reviewsCount: 39,
    createdAt: '2026-10-25T10:00:00Z'
  },
  {
    id: 'prod-trans-02',
    name: '2-Bedroom House Moving & Packing',
    type: 'services',
    categoryId: 'cat-transport',
    description: 'Stress-free residential relocation. Our uniformed team brings heavy-duty corrugated cartons, bubble wrap, wardrobe boxes, dismantle beds, wraps furniture in blankets, transports safely, and unpacks everything at your new home.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Team': '4 Professional packers + 1 Supervisor + 1 Covered moving truck',
      'Packing Materials': 'Included (Heavy boxes, bubble wrap, shrink film, tape)',
      'Duration': 'Completed in 1 business day'
    },
    unit: 'service',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-trans-2',
    defaultMarkupPercent: 46.9,
    transportHandlingCost: 0,
    sellingPrice: 23500,
    manualPriceOverride: false,
    stockQuantity: 20,
    location: 'Nairobi & Environs',
    rating: 4.9,
    reviewsCount: 51,
    createdAt: '2026-10-26T16:00:00Z'
  },

  // ==========================================
  // 11. TRAVEL & TOURS SAFARIS
  // ==========================================
  {
    id: 'prod-tour-01',
    name: '3D/2N Maasai Mara Safari Package',
    type: 'services',
    categoryId: 'cat-travel',
    description: 'The ultimate African wildlife experience. Includes round-trip transport in customized 4x4 pop-up roof safari Land Cruiser, 2 nights full board accommodation in luxury safari camp, professional KPSGA certified safari guide, and extensive daily game drives across the Mara reserve.',
    images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Duration': '3 Days / 2 Nights',
      'Accommodation': 'Luxury en-suite safari tent with hot showers & gourmet dining',
      'Vehicle': 'Custom 4x4 safari cruiser with cooler box, binoculars & pop-up roof',
      'Included': 'All meals (FB), game drives, guide fees, park transfers'
    },
    unit: 'package',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-tour-1',
    defaultMarkupPercent: 41.7,
    transportHandlingCost: 0,
    sellingPrice: 68000,
    manualPriceOverride: false,
    stockQuantity: 25,
    location: 'Maasai Mara National Reserve',
    rating: 4.9,
    reviewsCount: 68,
    createdAt: '2026-10-25T09:00:00Z'
  },
  {
    id: 'prod-tour-02',
    name: '4D/3N Diani Beach Holiday Package',
    type: 'services',
    categoryId: 'cat-travel',
    description: 'Relax on the pristine white sands of Diani Beach. Includes First-Class Madaraka Express SGR return train tickets from Nairobi, private station transfers, 3 nights all-inclusive stay at a 4-star beach resort, and a dhow trip to Wasini Island dolphin safari.',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
    specs: {
      'Duration': '4 Days / 3 Nights',
      'Meals': 'All-Inclusive (Buffet breakfast, lunch, dinner & select beverages)',
      'Transport': 'SGR Madaraka train + executive AC van station transfers'
    },
    unit: 'package',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-tour-2',
    defaultMarkupPercent: 39.1,
    transportHandlingCost: 0,
    sellingPrice: 44500,
    manualPriceOverride: false,
    stockQuantity: 18,
    location: 'Diani Beach, Kwale County',
    rating: 4.9,
    reviewsCount: 45,
    createdAt: '2026-10-26T17:00:00Z'
  },

  // ==========================================
  // 12. BRANDING & PRINTING SERVICES
  // ==========================================
  {
    id: 'prod-brand-01',
    name: 'Custom Corporate Polo T-Shirts',
    type: 'services',
    categoryId: 'cat-branding',
    description: 'High-quality 220 GSM combed cotton polo shirts customized with crisp multi-color embroidery on chest and screenprinted company logo on back or sleeve. Fade resistant and colorfast through 100+ washes.',
    images: ['assets/images/branding.jpg'],
    specs: {
      'Quantity': 'Batch of 50 High-Grade Polos',
      'Fabric': '220 GSM 100% Pique Combed Cotton',
      'Customization': 'High-density Japanese thread embroidery + screenprint',
      'Sizes': 'Assorted mix (S, M, L, XL, XXL) with custom color matching'
    },
    unit: 'batch (50 pcs)',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-brand-1',
    defaultMarkupPercent: 38.5,
    transportHandlingCost: 500,
    sellingPrice: 45000,
    manualPriceOverride: false,
    stockQuantity: 40,
    location: 'River Road / Kirinyaga Road, Nairobi',
    rating: 4.8,
    reviewsCount: 36,
    createdAt: '2026-10-25T11:30:00Z'
  },
  {
    id: 'prod-brand-02',
    name: '3D Illuminated Acrylic Business Signage',
    type: 'services',
    categoryId: 'cat-branding',
    description: 'Weatherproof high-impact architectural 3D signage for storefronts, office reception, and exterior building facades. Fabricated with cast acrylic faces, stainless steel returns, and Samsung IP67 waterproof LED backlights.',
    images: ['assets/images/branding.jpg'],
    specs: {
      'Construction': 'Laser cut cast acrylic + brushed aluminum side trim',
      'Illumination': 'Samsung 12V waterproof LED modules with MeanWell power supply',
      'Installation': 'Includes on-site structural mounting and electrical connection',
      'Warranty': '3 Years Comprehensive Signage Warranty'
    },
    unit: 'sign',
    pricingModel: 'custom_quote',
    startingPrice: 35000,
    materialsRequired: true,
    surveyFee: 1500,
    rates: { turnkeyRate: 1200, laborOnlyRate: 450, unit: 'sq ft' },
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-brand-2',
    defaultMarkupPercent: 50.0,
    transportHandlingCost: 1000,
    sellingPrice: 42000,
    manualPriceOverride: false,
    stockQuantity: 15,
    location: 'Nairobi Central Production Plant',
    rating: 4.9,
    reviewsCount: 22,
    createdAt: '2026-10-26T12:30:00Z'
  },
  {
    id: 'prod-brand-03',
    name: 'Executive Corporate Gift Set',
    type: 'goods',
    categoryId: 'cat-branding',
    description: 'Turnkey luxury corporate gifting suite. Comes packaged in a premium magnetic gift box debossed with your corporate emblem. Contains matte thermal vacuum flask with temperature display, 32GB metal flash drive, laser engraved metal pen, and A5 executive notebook.',
    images: ['assets/images/branding.jpg'],
    specs: {
      'Components': 'Smart flask, A5 notebook, metal pen, 32GB USB drive',
      'Branding': 'Laser engraving and metallic foil stamping',
      'Packaging': 'Custom gift box with foam cutout inserts'
    },
    unit: 'set',
    status: 'published',
    isFeatured: false,
    activeSupplierOfferId: 'off-brand-3',
    defaultMarkupPercent: 52.8,
    transportHandlingCost: 50,
    sellingPrice: 2750,
    manualPriceOverride: false,
    stockQuantity: 120,
    location: 'Nairobi CBD',
    rating: 4.8,
    reviewsCount: 31,
    createdAt: '2026-10-26T15:30:00Z'
  },

  // ==========================================
  // 13. DEALERS IN LAPTOPS
  // ==========================================
  {
    id: 'prod-lap-01',
    name: 'HP EliteBook 840 G10',
    type: 'goods',
    categoryId: 'cat-laptops',
    description: 'Commercial business ultrabook engineered for executive multitasking. Intel Core i7-1365U vPro processor, 16GB DDR5 high-speed memory, 512GB PCIe Gen4 NVMe SSD, 14-inch WUXGA anti-glare IPS display, fingerprint reader, and Bang & Olufsen tuned audio.',
    images: ['assets/images/laptop.jpg'],
    specs: {
      'Processor': 'Intel Core i7-1365U (Up to 5.2 GHz with Intel Turbo Boost)',
      'RAM': '16 GB DDR5-4800 MHz',
      'Storage': '512 GB PCIe Gen4 NVMe TLC SSD',
      'Display': '14" diagonal WUXGA (1920 x 1200), IPS, 400 nits',
      'Security': 'HP Sure Sense, Wolf Pro Security, Fingerprint Reader',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-lap-1',
    defaultMarkupPercent: 21.0,
    transportHandlingCost: 500,
    sellingPrice: 115000,
    manualPriceOverride: false,
    stockQuantity: 18,
    location: 'Kimathi Street CBD, Nairobi',
    rating: 4.9,
    reviewsCount: 26,
    createdAt: '2026-10-25T08:30:00Z'
  },
  {
    id: 'prod-lap-02',
    name: 'Lenovo ThinkPad T14 Gen 4',
    type: 'goods',
    categoryId: 'cat-laptops',
    description: 'Military-grade certified rugged commercial business laptop. Powered by AMD Ryzen 7 PRO 7840U, Radeon 780M graphics, 14-inch low power display, durable magnesium chassis and legendary spill-resistant keyboard.',
    images: ['assets/images/laptop.jpg'],
    specs: {
      'Processor': 'AMD Ryzen 7 PRO 7840U (8 Cores, 16 Threads)',
      'RAM': '16 GB LPDDR5X-6400MHz',
      'Storage': '512 GB SSD M.2 2280 PCIe Gen4',
      'Durability': 'MIL-STD-810H Military Certified'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-lap-2',
    defaultMarkupPercent: 22.0,
    transportHandlingCost: 500,
    sellingPrice: 128000,
    manualPriceOverride: false,
    stockQuantity: 12,
    location: 'Nairobi Central CBD',
    rating: 4.9,
    reviewsCount: 31,
    createdAt: '2026-10-26T10:15:00Z'
  },
  {
    id: 'prod-lap-03',
    name: 'Apple MacBook Air 13" M2',
    type: 'goods',
    categoryId: 'cat-laptops',
    description: 'Ultra-thin, all-day battery powerhouse. Apple M2 8-core CPU, 8-core GPU, 13.6-inch Liquid Retina display with True Tone, 1080p FaceTime HD camera, MagSafe 3 charging and silent fanless design.',
    images: ['assets/images/laptop.jpg'],
    specs: {
      'Chip': 'Apple M2 chip with 8-core CPU and 8-core GPU',
      'Display': '13.6-inch Liquid Retina with 500 nits brightness',
      'Battery Life': 'Up to 18 hours wireless web',
      'Warranty': '1 Year Apple Official Warranty'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-lap-3',
    defaultMarkupPercent: 18.7,
    transportHandlingCost: 500,
    sellingPrice: 152000,
    manualPriceOverride: false,
    stockQuantity: 9,
    location: 'CBD, Nairobi',
    rating: 4.9,
    reviewsCount: 42,
    createdAt: '2026-10-26T11:45:00Z'
  },

  // ==========================================
  // 14. LAPTOP ACCESSORIES
  // ==========================================
  {
    id: 'prod-lacc-01',
    name: 'Baseus 65W GaN Laptop Charger',
    type: 'goods',
    categoryId: 'cat-laptop-acc',
    description: 'Gallium Nitride (GaN 5 Pro) ultra-compact power delivery charger. Charges MacBook, Dell, HP, ThinkPad, iPad, and phones at maximum speed. Advanced temperature cooling with BPS II smart power distribution.',
    images: ['assets/images/laptop_acc.jpg'],
    specs: {
      'Total Output': '65W Max Power Delivery 3.0 / PPS / QC4+',
      'Ports': '2x USB-C (65W) + 1x USB-A (30W)',
      'Safety': 'Over-voltage, short circuit and surge protection'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-lacc-1',
    defaultMarkupPercent: 50.0,
    transportHandlingCost: 150,
    sellingPrice: 4200,
    manualPriceOverride: false,
    stockQuantity: 85,
    location: 'Luthuli Avenue, Nairobi CBD',
    rating: 4.8,
    reviewsCount: 53,
    createdAt: '2026-10-25T13:20:00Z'
  },
  {
    id: 'prod-lacc-02',
    name: 'Foldable Aluminum Laptop Stand',
    type: 'goods',
    categoryId: 'cat-laptop-acc',
    description: 'Aircraft-grade anodized aluminum alloy riser. 6-level adjustable ergonomic viewing height prevents neck strain. Non-slip silicone padding grips laptop securely while hollow frame provides airflow.',
    images: ['assets/images/laptop_acc.jpg'],
    specs: {
      'Material': 'Solid Anodized Aluminum Alloy',
      'Compatibility': 'Supports 10" to 17.3" laptops',
      'Portability': 'Collapsible fold-flat design with velvet carrying pouch'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-lacc-2',
    defaultMarkupPercent: 63.2,
    transportHandlingCost: 100,
    sellingPrice: 3100,
    manualPriceOverride: false,
    stockQuantity: 110,
    location: 'Nairobi CBD',
    rating: 4.8,
    reviewsCount: 67,
    createdAt: '2026-10-26T09:10:00Z'
  },
  {
    id: 'prod-lacc-03',
    name: '3M Carbon Fiber Laptop Skin',
    type: 'goods',
    categoryId: 'cat-laptop-acc',
    description: 'Precision laser-cut 3M vinyl skin stickers for HP, Dell, Lenovo and MacBooks. Protects top lid from scratches, keys, and fingerprints without leaving sticky residue when peeled.',
    images: ['assets/images/laptop_acc.jpg'],
    specs: {
      'Material': 'Authentic 3M textured vinyl sticker',
      'Finish': '3D textured matte black carbon fiber',
      'Removal': 'Air-release channels for bubble-free application, zero residue'
    },
    unit: 'piece',
    status: 'published',
    isFeatured: false,
    activeSupplierOfferId: 'off-lacc-3',
    defaultMarkupPercent: 81.3,
    transportHandlingCost: 50,
    sellingPrice: 1450,
    manualPriceOverride: false,
    stockQuantity: 140,
    location: 'Nairobi Central CBD',
    rating: 4.7,
    reviewsCount: 24,
    createdAt: '2026-10-26T14:50:00Z'
  },

  // ==========================================
  // 15. PHONES & TABLETS
  // ==========================================
  {
    id: 'prod-phone-01',
    name: 'Samsung Galaxy S24 Ultra 5G',
    type: 'goods',
    categoryId: 'cat-phones',
    description: 'Ultimate Android flagship with Galaxy AI capabilities. Titanium frame, 6.8-inch Dynamic AMOLED 2X flat display with Gorilla Armor anti-reflective glass, Snapdragon 8 Gen 3 for Galaxy, 200MP quad camera, and built-in S-Pen.',
    images: ['assets/images/phone.jpg'],
    specs: {
      'Display': '6.8" QHD+ Dynamic AMOLED 2X, 120Hz, 2600 nits',
      'Camera': '200MP Main + 50MP 5x Periscope + 10MP 3x + 12MP Ultra-Wide',
      'Processor': 'Qualcomm Snapdragon 8 Gen 3 for Galaxy',
      'Battery': '5000 mAh with 45W fast charging'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-phone-1',
    defaultMarkupPercent: 15.9,
    transportHandlingCost: 500,
    sellingPrice: 168000,
    manualPriceOverride: false,
    stockQuantity: 14,
    location: 'Tom Mboya Street & Westlands, Nairobi',
    rating: 4.9,
    reviewsCount: 35,
    createdAt: '2026-10-25T15:40:00Z'
  },
  {
    id: 'prod-phone-02',
    name: 'Apple iPhone 15 Pro Max',
    type: 'goods',
    categoryId: 'cat-phones',
    description: 'Forged in aerospace-grade titanium with matte textured glass back. A17 Pro 3nm chip, customizable Action button, 48MP main camera with 5x telephoto optical zoom, USB-C 10Gbps connectivity, and all-day battery life.',
    images: ['assets/images/phone.jpg'],
    specs: {
      'Chip': 'A17 Pro chip with 6-core GPU',
      'Display': '6.7" Super Retina XDR with ProMotion 120Hz & Always-On',
      'Chassis': 'Titanium with Ceramic Shield front',
      'Connector': 'USB-C with USB 3 speeds'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-phone-2',
    defaultMarkupPercent: 15.1,
    transportHandlingCost: 500,
    sellingPrice: 198000,
    manualPriceOverride: false,
    stockQuantity: 11,
    location: 'Westlands / CBD, Nairobi',
    rating: 4.9,
    reviewsCount: 48,
    createdAt: '2026-10-26T12:10:00Z'
  },

  // ==========================================
  // 16. PHONE ACCESSORIES
  // ==========================================
  {
    id: 'prod-pacc-01',
    name: 'Anker 35W Dual Port PD Charger',
    type: 'goods',
    categoryId: 'cat-phone-acc',
    description: 'High-speed dual port PD charger featuring ActiveShield 2.0 temperature monitoring. Safely charges iPhone 15 up to 50% in 26 minutes while simultaneously charging an Apple Watch or Galaxy smartphone.',
    images: ['assets/images/phone_acc.jpg'],
    specs: {
      'Power': '35W Max PIQ 3.0 Technology',
      'Ports': 'Dual USB Type-C',
      'Safety': 'Dynamic temperature sensor monitoring 3 million times daily'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-pacc-1',
    defaultMarkupPercent: 75.0,
    transportHandlingCost: 100,
    sellingPrice: 2100,
    manualPriceOverride: false,
    stockQuantity: 140,
    location: 'Bazaar Plaza, Moi Avenue, Nairobi',
    rating: 4.8,
    reviewsCount: 89,
    createdAt: '2026-10-25T16:15:00Z'
  },
  {
    id: 'prod-pacc-02',
    name: 'MagSafe 3-in-1 Wireless Charging Stand',
    type: 'goods',
    categoryId: 'cat-phone-acc',
    description: 'Sleek aluminum wireless charging stand with 15W fast MagSafe pad for iPhone, 5W magnetic charger for Apple Watch / Galaxy Watch, and 5W induction base for AirPods / wireless earbuds.',
    images: ['assets/images/phone_acc.jpg'],
    specs: {
      'Outputs': '15W MagSafe Phone + 5W Watch + 5W Earbuds',
      'Materials': 'CNC Aluminum alloy and soft touch silicone',
      'Portability': 'Folds flat for travel'
    },
    unit: 'unit',
    status: 'published',
    isFeatured: true,
    activeSupplierOfferId: 'off-pacc-2',
    defaultMarkupPercent: 60.4,
    transportHandlingCost: 150,
    sellingPrice: 3850,
    manualPriceOverride: false,
    stockQuantity: 65,
    location: 'Moi Avenue, Nairobi',
    rating: 4.8,
    reviewsCount: 37,
    createdAt: '2026-10-26T14:20:00Z'
  }
];

export const initialSupplierOffers = [
  // Furniture Offers
  {
    id: 'off-chair-1',
    productId: 'prod-chair-01',
    supplierId: 'sup-furniture',
    supplierCost: 10000,
    transportHandlingCost: 500,
    leadTime: 'Same Day Dispatch (Industrial Area)',
    stockAvailable: 45,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-desk-2',
    productId: 'prod-desk-02',
    supplierId: 'sup-furniture',
    supplierCost: 32000,
    transportHandlingCost: 1500,
    leadTime: '24 Hours',
    stockAvailable: 12,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-boardroom-3',
    productId: 'prod-boardroom-03',
    supplierId: 'sup-furniture',
    supplierCost: 48000,
    transportHandlingCost: 2000,
    leadTime: '48 Hours Assembly',
    stockAvailable: 8,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Roofing Offers
  {
    id: 'off-roof-1',
    productId: 'prod-roof-01',
    supplierId: 'sup-roofing',
    supplierCost: 2100,
    transportHandlingCost: 100,
    leadTime: 'Factory Direct Lorry Dispatch (24h)',
    stockAvailable: 450,
    minOrderQty: 10,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-roof-2',
    productId: 'prod-roof-02',
    supplierId: 'sup-roofing',
    supplierCost: 2400,
    transportHandlingCost: 100,
    leadTime: '24 - 48 Hours',
    stockAvailable: 280,
    minOrderQty: 10,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-roof-3',
    productId: 'prod-roof-03',
    supplierId: 'sup-roofing',
    supplierCost: 850,
    transportHandlingCost: 50,
    leadTime: 'Immediate Depot Stock',
    stockAvailable: 320,
    minOrderQty: 5,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Gas Offers
  {
    id: 'off-gas-1',
    productId: 'prod-gas-01',
    supplierId: 'sup-gas',
    supplierCost: 8200,
    transportHandlingCost: 200,
    leadTime: 'Under 45 Minutes Express Nairobi',
    stockAvailable: 65,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-gas-2',
    productId: 'prod-gas-02',
    supplierId: 'sup-gas',
    supplierCost: 4400,
    transportHandlingCost: 150,
    leadTime: 'Under 45 Minutes Express',
    stockAvailable: 90,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-gas-3',
    productId: 'prod-gas-03',
    supplierId: 'sup-gas',
    supplierCost: 2800,
    transportHandlingCost: 100,
    leadTime: 'Immediate Exchange on Arrival',
    stockAvailable: 120,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Interior Design Offers
  {
    id: 'off-int-1',
    productId: 'prod-int-01',
    supplierId: 'sup-interior',
    supplierCost: 120000,
    transportHandlingCost: 5000,
    leadTime: 'Site Survey in 24h, 14 Days Execution',
    stockAvailable: 10,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-int-2',
    productId: 'prod-int-02',
    supplierId: 'sup-interior',
    supplierCost: 65000,
    transportHandlingCost: 2000,
    leadTime: '5 Business Days on Site',
    stockAvailable: 15,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Photography Offers
  {
    id: 'off-photo-1',
    productId: 'prod-photo-01',
    supplierId: 'sup-photography',
    supplierCost: 15000,
    transportHandlingCost: 500,
    leadTime: '48 Hours Digital Gallery Turnaround',
    stockAvailable: 25,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-photo-2',
    productId: 'prod-photo-02',
    supplierId: 'sup-photography',
    supplierCost: 35000,
    transportHandlingCost: 1500,
    leadTime: 'Same Day Coverage + 5 Days Editing',
    stockAvailable: 12,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Cyber Services Offers
  {
    id: 'off-cyber-1',
    productId: 'prod-cyber-01',
    supplierId: 'sup-cyber',
    supplierCost: 3500,
    transportHandlingCost: 0,
    leadTime: '24 Hours Official BRS Clearance',
    stockAvailable: 100,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-cyber-2',
    productId: 'prod-cyber-02',
    supplierId: 'sup-cyber',
    supplierCost: 2500,
    transportHandlingCost: 0,
    leadTime: '24 to 48 Hours KRA Clearance',
    stockAvailable: 150,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Academic Accounts Offers
  {
    id: 'off-acad-1',
    productId: 'prod-acad-01',
    supplierId: 'sup-academic',
    supplierCost: 8500,
    transportHandlingCost: 0,
    leadTime: '15 Minutes Instant Credential Activation',
    stockAvailable: 30,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-acad-2',
    productId: 'prod-acad-02',
    supplierId: 'sup-academic',
    supplierCost: 5000,
    transportHandlingCost: 0,
    leadTime: 'Instant Email Dispatch',
    stockAvailable: 40,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Airbnbs Offers
  {
    id: 'off-bnb-1',
    productId: 'prod-airbnb-01',
    supplierId: 'sup-airbnbs',
    supplierCost: 4200,
    transportHandlingCost: 0,
    leadTime: 'Instant Smart Lock Check-In 2:00 PM',
    stockAvailable: 28,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-bnb-2',
    productId: 'prod-airbnb-02',
    supplierId: 'sup-airbnbs',
    supplierCost: 7500,
    transportHandlingCost: 0,
    leadTime: 'Instant Smart Lock Access',
    stockAvailable: 18,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Cab Services Offers
  {
    id: 'off-cab-1',
    productId: 'prod-cab-01',
    supplierId: 'sup-cabs',
    supplierCost: 3200,
    transportHandlingCost: 0,
    leadTime: 'Flight Tracking Chauffeur at Arrivals',
    stockAvailable: 20,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-cab-2',
    productId: 'prod-cab-02',
    supplierId: 'sup-cabs',
    supplierCost: 9000,
    transportHandlingCost: 0,
    leadTime: 'Pre-booked 12-Hour Chauffeur Standby',
    stockAvailable: 12,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Transportation Services Offers
  {
    id: 'off-trans-1',
    productId: 'prod-trans-01',
    supplierId: 'sup-transport',
    supplierCost: 2200,
    transportHandlingCost: 0,
    leadTime: 'GPS Dispatched within 2 Hours',
    stockAvailable: 15,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-trans-2',
    productId: 'prod-trans-02',
    supplierId: 'sup-transport',
    supplierCost: 16000,
    transportHandlingCost: 0,
    leadTime: 'Packers Arrive at 8:00 AM Prompt',
    stockAvailable: 20,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Travel and Tours Offers
  {
    id: 'off-tour-1',
    productId: 'prod-tour-01',
    supplierId: 'sup-travel',
    supplierCost: 48000,
    transportHandlingCost: 0,
    leadTime: 'Nairobi Hotel / Airport Departure 6:30 AM',
    stockAvailable: 25,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-tour-2',
    productId: 'prod-tour-02',
    supplierId: 'sup-travel',
    supplierCost: 32000,
    transportHandlingCost: 0,
    leadTime: 'SGR Train 8:00 AM Departure',
    stockAvailable: 18,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Branding Services Offers
  {
    id: 'off-brand-1',
    productId: 'prod-brand-01',
    supplierId: 'sup-branding',
    supplierCost: 32500,
    transportHandlingCost: 500,
    leadTime: 'Sample Proof 12h, Production 3 Days',
    stockAvailable: 40,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-brand-2',
    productId: 'prod-brand-02',
    supplierId: 'sup-branding',
    supplierCost: 28000,
    transportHandlingCost: 1000,
    leadTime: '4 Business Days Fabrication & Mount',
    stockAvailable: 15,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-brand-3',
    productId: 'prod-brand-03',
    supplierId: 'sup-branding',
    supplierCost: 1800,
    transportHandlingCost: 50,
    leadTime: 'Laser Engraved in 24 Hours',
    stockAvailable: 120,
    minOrderQty: 5,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Laptops Offers
  {
    id: 'off-lap-1',
    productId: 'prod-lap-01',
    supplierId: 'sup-techhub',
    supplierCost: 95000,
    transportHandlingCost: 500,
    leadTime: 'Same Day Dispatch',
    stockAvailable: 18,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-lap-2',
    productId: 'prod-lap-02',
    supplierId: 'sup-techhub',
    supplierCost: 105000,
    transportHandlingCost: 500,
    leadTime: 'Same Day Dispatch',
    stockAvailable: 12,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-lap-3',
    productId: 'prod-lap-03',
    supplierId: 'sup-techhub',
    supplierCost: 128000,
    transportHandlingCost: 500,
    leadTime: 'Same Day Dispatch',
    stockAvailable: 9,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Laptop Accessories Offers
  {
    id: 'off-lacc-1',
    productId: 'prod-lacc-01',
    supplierId: 'sup-silicon-acc',
    supplierCost: 2800,
    transportHandlingCost: 150,
    leadTime: 'Immediate Depot Dispatch',
    stockAvailable: 85,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-lacc-2',
    productId: 'prod-lacc-02',
    supplierId: 'sup-silicon-acc',
    supplierCost: 1900,
    transportHandlingCost: 100,
    leadTime: 'Immediate Depot Dispatch',
    stockAvailable: 110,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-lacc-3',
    productId: 'prod-lacc-03',
    supplierId: 'sup-silicon-acc',
    supplierCost: 800,
    transportHandlingCost: 50,
    leadTime: 'Immediate Depot Dispatch',
    stockAvailable: 140,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Phones Offers
  {
    id: 'off-phone-1',
    productId: 'prod-phone-01',
    supplierId: 'sup-primecell',
    supplierCost: 145000,
    transportHandlingCost: 500,
    leadTime: '24 Hours',
    stockAvailable: 14,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-phone-2',
    productId: 'prod-phone-02',
    supplierId: 'sup-primecell',
    supplierCost: 172000,
    transportHandlingCost: 500,
    leadTime: '24 Hours',
    stockAvailable: 11,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },

  // Phone Accessories Offers
  {
    id: 'off-pacc-1',
    productId: 'prod-pacc-01',
    supplierId: 'sup-omnicharge',
    supplierCost: 1200,
    transportHandlingCost: 100,
    leadTime: 'Immediate Depot Dispatch',
    stockAvailable: 140,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  },
  {
    id: 'off-pacc-2',
    productId: 'prod-pacc-02',
    supplierId: 'sup-omnicharge',
    supplierCost: 2400,
    transportHandlingCost: 150,
    leadTime: 'Immediate Depot Dispatch',
    stockAvailable: 65,
    minOrderQty: 1,
    expiryDate: '2026-12-31',
    isPrimary: true
  }
];

export const initialOrders = [
  {
    id: 'CNF-8921',
    customer: {
      name: 'Dr. Beatrice Ochieng',
      company: 'Highland Medical Center',
      phone: '+254 712 345 678',
      email: 'beatrice.ochieng@highlandmed.co.ke',
      deliveryAddress: '5th Avenue Suites, Ngong Road, Nairobi',
      county: 'Nairobi',
      notes: 'Call reception on delivery for floor access pass.'
    },
    items: [
      {
        productId: 'prod-lap-01',
        productName: 'HP EliteBook 840 G10 (Core i7 13th Gen, 16GB RAM, 512GB SSD)',
        quantity: 2,
        unitPrice: 115000,
        assignedSupplierId: 'sup-techhub',
        supplierOfferId: 'off-lap-1',
        supplierCostSnapshot: 95000,
        transportCostSnapshot: 500,
        estimatedProfitPerUnit: 19500,
        totalItemSellingPrice: 230000,
        totalItemSupplierCost: 190000,
        totalItemTransportCost: 1000,
        totalItemGrossProfit: 39000,
        fulfillmentStatus: 'PO Issued',
        poNumber: 'PO-2026-089'
      }
    ],
    pricing: {
      subtotal: 230000,
      deliveryFee: 1500,
      totalAmount: 231500,
      totalSupplierCost: 191000,
      platformGrossProfit: 40500,
      grossMarginPercent: 17.5
    },
    payment: {
      method: 'Bank Wire / RTGS',
      reference: 'FT2629810499',
      status: 'Paid & Verified',
      amountCollected: 231500,
      amountOwedToSupplier: 191000,
      supplierPaid: false
    },
    status: 'In Sourcing & Dispatch',
    timeline: [
      { step: 'Order Placed by Customer', time: '2026-10-27 10:14', done: true },
      { step: 'Payment Verified via Central Account', time: '2026-10-27 10:30', done: true },
      { step: 'PO-2026-089 Issued to Nairobi TechHub', time: '2026-10-27 14:05', done: true },
      { step: 'Inspected & Dispatched to Customer', time: 'Expected 2026-10-29', done: false }
    ],
    createdAt: '2026-10-27T10:14:00Z'
  },
  {
    id: 'CNF-8922',
    customer: {
      name: 'Brian Omondi',
      company: 'Apex Tech Solutions',
      phone: '+254 700 123 456',
      email: 'brian.omondi@corp.co.ke',
      deliveryAddress: 'Delta Corner, Westlands, Nairobi',
      county: 'Nairobi',
      notes: 'Deliver before 4:00 PM.'
    },
    items: [
      {
        productId: 'prod-lacc-01',
        productName: 'Baseus 65W GaN Fast Dual USB-C Laptop Charger Adapter',
        quantity: 3,
        unitPrice: 4200,
        assignedSupplierId: 'sup-silicon-acc',
        supplierOfferId: 'off-lacc-1',
        supplierCostSnapshot: 2800,
        transportCostSnapshot: 150,
        estimatedProfitPerUnit: 1250,
        totalItemSellingPrice: 12600,
        totalItemSupplierCost: 8400,
        totalItemTransportCost: 450,
        totalItemGrossProfit: 3750,
        fulfillmentStatus: 'Pending Confirmation',
        poNumber: 'PO-2026-090'
      }
    ],
    pricing: {
      subtotal: 12600,
      deliveryFee: 0,
      totalAmount: 12600,
      totalSupplierCost: 8850,
      platformGrossProfit: 3750,
      grossMarginPercent: 29.76
    },
    payment: {
      method: 'M-Pesa Paybill (Business Account)',
      reference: 'RKP1829Z4C',
      status: 'Paid & Verified',
      amountCollected: 12600,
      amountOwedToSupplier: 8850,
      supplierPaid: false
    },
    status: 'Pending Supplier Confirmation',
    timeline: [
      { step: 'Order Placed by Customer', time: '2026-10-28 09:20', done: true },
      { step: 'Dispatch Request Sent to Silicon Accessories', time: '2026-10-28 09:45', done: true },
      { step: 'Merchant Confirmation Pending', time: 'Awaiting', done: false },
      { step: 'Delivery Dispatch', time: 'Scheduled Today', done: false }
    ],
    createdAt: '2026-10-28T09:20:00Z'
  },
  {
    id: 'CNF-8923',
    customer: {
      name: 'Evelyn Waweru',
      company: 'Kilimani Green Court',
      phone: '+254 722 889 001',
      email: 'evelyn@greencourt.co.ke',
      deliveryAddress: 'Ring Road, Kilimani, Nairobi',
      county: 'Nairobi',
      notes: 'Gate 4, House B2'
    },
    items: [
      {
        productId: 'prod-gas-01',
        productName: 'TotalEnergies 13kg Cooking Gas Cylinder (Full New Cylinder + Regulator)',
        quantity: 1,
        unitPrice: 9800,
        assignedSupplierId: 'sup-gas',
        supplierOfferId: 'off-gas-1',
        supplierCostSnapshot: 8200,
        transportCostSnapshot: 200,
        estimatedProfitPerUnit: 1400,
        totalItemSellingPrice: 9800,
        totalItemSupplierCost: 8200,
        totalItemTransportCost: 200,
        totalItemGrossProfit: 1400,
        fulfillmentStatus: 'Delivered',
        poNumber: 'PO-2026-092'
      }
    ],
    pricing: {
      subtotal: 9800,
      deliveryFee: 0,
      totalAmount: 9800,
      totalSupplierCost: 8400,
      platformGrossProfit: 1400,
      grossMarginPercent: 14.28
    },
    payment: {
      method: 'M-Pesa Instant Paybill',
      reference: 'QBL9281MZ4',
      status: 'Paid & Verified',
      amountCollected: 9800,
      amountOwedToSupplier: 8400,
      supplierPaid: true
    },
    status: 'Completed',
    timeline: [
      { step: 'Order Placed by Customer', time: '2026-10-28 11:10', done: true },
      { step: 'Nairobi Gas Express Dispatched Motorbike', time: '2026-10-28 11:18', done: true },
      { step: 'Delivered, Connected & Leak Tested', time: '2026-10-28 11:42', done: true }
    ],
    createdAt: '2026-10-28T11:10:00Z'
  }
];

export const initialAuditLogs = [
  {
    id: 'log-101',
    timestamp: '2026-10-28 14:10:00',
    actor: 'Operations Admin (Main)',
    action: 'PRICE_UPDATE',
    entityType: 'Product',
    entityId: 'prod-chair-01',
    description: 'Updated markup on Connectify Mesh Chair from 15% to 25%. Selling price recalculated to KSh 12,500.'
  },
  {
    id: 'log-102',
    timestamp: '2026-10-28 11:45:00',
    actor: 'Operations Admin (Main)',
    action: 'SUPPLIER_OFFER_ADDED',
    entityType: 'Supplier Offer',
    entityId: 'off-lap-1',
    description: 'Logged wholesale quotation from Nairobi TechHub for HP EliteBook G10 at KSh 95,000 BP.'
  },
  {
    id: 'log-103',
    timestamp: '2026-10-28 09:20:30',
    actor: 'Customer (Online)',
    action: 'ORDER_PLACED',
    entityType: 'Order',
    entityId: 'CNF-8922',
    description: 'Customer Brian Omondi submitted Order CNF-8922 for GaN Chargers (KSh 12,600).'
  },
  {
    id: 'log-104',
    timestamp: '2026-10-27 14:05:00',
    actor: 'Operations Admin (Main)',
    action: 'PO_GENERATED',
    entityType: 'Purchase Order',
    entityId: 'PO-2026-089',
    description: 'Issued PO-2026-089 to TechHub Distributers for 2 units under Order CNF-8921.'
  },
  {
    id: 'log-105',
    timestamp: '2026-10-28 11:45:00',
    actor: 'Operations Admin (Main)',
    action: 'ORDER_COMPLETED',
    entityType: 'Order',
    entityId: 'CNF-8923',
    description: 'Delivered TotalEnergies 13kg gas cylinder to Kilimani Green Court. Reconciled KSh 1,400 gross profit.'
  }
];

export const initialQuotationRequests = [
  {
    id: 'QR-2026-101',
    customer: {
      name: 'Brian Omondi',
      company: 'Apex Tech Solutions',
      phone: '+254 700 123 456',
      email: 'brian.omondi@corp.co.ke',
      location: 'Delta Corner, 4th Floor, Westlands, Nairobi',
      county: 'Nairobi'
    },
    serviceId: 'prod-int-01',
    serviceName: 'Turnkey Commercial Office Interior Design & Gypsum Acoustic Fit-Out',
    supplierId: 'sup-interior',
    supplierName: 'ZenSpaces Interior Architecture & Fit-outs',
    category: 'cat-interior',
    scopeDescription: 'Boardroom & Executive Reception floating gypsum drop ceiling with concealed warm LED channels (Approx 380 sq ft). Requires 5 acoustic spotlight fixtures.',
    supplyOption: 'turnkey',
    estimatedArea: 380,
    unit: 'sq ft',
    siteSurveyBooked: true,
    surveyFeePaid: 1500,
    status: 'Pending BQ & Quotation',
    createdAt: '2026-10-28T14:15:00Z',
    bqBreakdown: null
  },
  {
    id: 'QR-2026-102',
    customer: {
      name: 'Dr. Beatrice Ochieng',
      company: 'Highland Medical Center',
      phone: '+254 712 345 678',
      email: 'beatrice.ochieng@highlandmed.co.ke',
      location: '5th Avenue Suites, Ngong Road, Nairobi',
      county: 'Nairobi'
    },
    serviceId: 'prod-brand-02',
    serviceName: 'Exterior 3D Acrylic Illuminated Backlit Business Signage',
    supplierId: 'sup-branding',
    supplierName: 'BrandCraft Print & Merchandising Ltd',
    category: 'cat-branding',
    scopeDescription: 'Main clinic frontage 3D backlit lettering (16ft length x 3ft height). Samsung waterproof LEDs with day/night sensor.',
    supplyOption: 'turnkey',
    estimatedArea: 48,
    unit: 'sq ft',
    siteSurveyBooked: true,
    surveyFeePaid: 1500,
    status: 'Quotation Issued',
    createdAt: '2026-10-27T16:30:00Z',
    bqBreakdown: {
      materials: [
        { name: 'Cast Acrylic Letters (High Gloss White & Medical Green)', supplierId: 'sup-branding', costBP: 12000, markupPercent: 20, priceSP: 14400 },
        { name: 'Samsung IP67 Waterproof LED Modules (120 Pcs)', supplierId: 'sup-branding', costBP: 6500, markupPercent: 20, priceSP: 7800 },
        { name: 'Brushed Aluminum Returns & Structural Steel Frame', supplierId: 'sup-roofing', costBP: 5500, markupPercent: 20, priceSP: 6600 },
        { name: 'MeanWell 12V 350W IP67 Transformer & Sensor', supplierId: 'sup-branding', costBP: 3000, markupPercent: 20, priceSP: 3600 }
      ],
      labor: [
        { name: 'Laser Precision Cutting & 3D Fabrication', contractorId: 'sup-branding', costBP: 7500, markupPercent: 25, priceSP: 9375 },
        { name: 'On-Site High Elevation Facade Mounting & Electrical Hookup', contractorId: 'sup-branding', costBP: 5000, markupPercent: 25, priceSP: 6250 }
      ],
      logistics: 2000,
      totalCostBP: 39500,
      totalQuotationSP: 50025,
      netPlatformProfit: 10525,
      grossMarginPercent: 21.0,
      milestoneTerms: '50% Mobilization Deposit (KSh 25,012) • 30% Fabrication Milestone (KSh 15,008) • 20% Sign-off (KSh 10,005)'
    }
  },
  {
    id: 'QR-2026-103',
    customer: {
      name: 'Patrick Kiprop',
      company: 'Eldo Farm Enterprises',
      phone: '+254 701 445 566',
      email: 'p.kiprop@eldofarm.com',
      location: 'Chepkoilel Junction, Eldoret',
      county: 'Uasin Gishu'
    },
    serviceId: 'prod-roof-01',
    serviceName: 'Resincot Box Profile Mabati Complete Roof Supply & Installation',
    supplierId: 'sup-roofing',
    supplierName: 'Mabati Rolling Hub Ltd',
    category: 'cat-roofing',
    scopeDescription: 'Agricultural Grain Storage Warehouse re-roofing (approx. 420 meters pitch). Replacing leaking old corrugated sheets with heavy-gauge Gauge 28 Charcoal Box Profile with valley gutters.',
    supplyOption: 'turnkey',
    estimatedArea: 420,
    unit: 'meters',
    siteSurveyBooked: false,
    surveyFeePaid: 0,
    status: 'Pending BQ & Quotation',
    createdAt: '2026-10-28T11:20:00Z',
    bqBreakdown: null
  }
];

// -------------------------------------------------------------
// Unified Communication Records — Single Source of Communication
// All customer calls, WhatsApp chats, live desk inquiries, and
// quote discussions route through Connectify Central Desk (+254 700 000 000)
// -------------------------------------------------------------
export const initialCommunications = [
  {
    id: 'COMM-2026-01',
    customer: {
      name: 'Brian Omondi',
      company: 'ApexTech Solutions Ltd',
      phone: '+254 722 123 456',
      email: 'brian.omondi@apextech.co.ke',
      location: 'Kilimani, Nairobi'
    },
    subject: 'Turnkey Gypsum Acoustic Ceiling Fit-Out (Site Survey & BQ)',
    channel: 'Live Storefront Desk', // 'Live Storefront Desk' | 'WhatsApp Central Desk' | 'Phone Callback Request' | 'Quotations Desk'
    category: 'cat-interior',
    productId: 'prod-interior-01',
    productName: 'Turnkey Commercial Office Interior Design & Gypsum Acoustic Fit-Out',
    status: 'Replied', // 'Open' | 'Replied' | 'Resolved'
    priority: 'High',
    unreadByAdmin: false,
    unreadByCustomer: false,
    createdAt: '2026-10-28T09:15:00Z',
    updatedAt: '2026-10-28T09:42:00Z',
    messages: [
      {
        id: 'msg-01-1',
        sender: 'customer',
        senderName: 'Brian Omondi',
        text: 'Hello Connectify Desk, we submitted our project scope for our office in Kilimani. Can the on-site survey team come tomorrow morning?',
        timestamp: '2026-10-28T09:15:00Z'
      },
      {
        id: 'msg-01-2',
        sender: 'admin',
        senderName: 'Connectify Central Desk (David K.)',
        text: 'Hello Brian! Thank you for reaching out to Connectify Central Desk. We have scheduled our certified site surveyor for tomorrow, Oct 29 at 10:30 AM. Your KSh 1,500 site survey retainer has been logged and will be credited toward the final turnkey BQ.',
        timestamp: '2026-10-28T09:42:00Z'
      }
    ]
  },
  {
    id: 'COMM-2026-02',
    customer: {
      name: 'Dr. Grace Wambui',
      company: 'Nyali Wellness Medicare',
      phone: '+254 733 987 654',
      email: 'dr.grace@nyaliwellness.ke',
      location: 'Links Road, Nyali, Mombasa'
    },
    subject: 'Exterior 3D Acrylic Illuminated Backlit Signage Warranty & Freight',
    channel: 'WhatsApp Central Desk',
    category: 'cat-branding',
    productId: 'prod-brand-02',
    productName: 'Exterior 3D Acrylic Illuminated Backlit Business Signage',
    status: 'Open',
    priority: 'High',
    unreadByAdmin: true,
    unreadByCustomer: false,
    createdAt: '2026-10-28T14:10:00Z',
    updatedAt: '2026-10-28T14:10:00Z',
    messages: [
      {
        id: 'msg-02-1',
        sender: 'customer',
        senderName: 'Dr. Grace Wambui',
        text: 'Hi Connectify Support Desk, we reviewed the official quote for KSh 50,025. Could you confirm if this includes waterproof LED replacement warranty and insured dispatch to Mombasa?',
        timestamp: '2026-10-28T14:10:00Z'
      }
    ]
  },
  {
    id: 'COMM-2026-03',
    customer: {
      name: 'David Mutua',
      company: 'Residential Client',
      phone: '+254 712 345 678',
      email: 'dmutua@gmail.com',
      location: 'Rhapta Road, Westlands, Nairobi'
    },
    subject: 'Priority Callback Request: TotalEnergies 13kg Gas Cylinder Refill Delivery',
    channel: 'Phone Callback Request',
    category: 'cat-gas',
    productId: 'prod-gas-01',
    productName: 'TotalEnergies 13kg Cooking Gas Cylinder (Full Refill & Verified Safety Seal)',
    status: 'Open',
    priority: 'Normal',
    unreadByAdmin: true,
    unreadByCustomer: false,
    createdAt: '2026-10-28T16:20:00Z',
    updatedAt: '2026-10-28T16:20:00Z',
    messages: [
      {
        id: 'msg-03-1',
        sender: 'customer',
        senderName: 'David Mutua',
        text: 'Requested immediate phone callback to +254 712 345 678. Needs delivery before 6:30 PM with Connectify certified weight inspection seal.',
        timestamp: '2026-10-28T16:20:00Z'
      }
    ]
  },
  {
    id: 'COMM-2026-04',
    customer: {
      name: 'Kevin Otieno',
      company: 'Highridge Academy & Resource Hub',
      phone: '+254 720 998 877',
      email: 'it@highridgeacademy.ac.ke',
      location: 'Parklands, Nairobi '
    },
    subject: 'Bulk Academic Portals & Biometric Integration Sourcing',
    channel: 'Live Storefront Desk',
    category: 'cat-academic',
    productId: 'prod-acad-01',
    productName: 'Turnkey University & College Student Management Portal Setup',
    status: 'Resolved',
    priority: 'Normal',
    unreadByAdmin: false,
    unreadByCustomer: false,
    createdAt: '2026-10-27T11:00:00Z',
    updatedAt: '2026-10-27T13:40:00Z',
    messages: [
      {
        id: 'msg-04-1',
        sender: 'customer',
        senderName: 'Kevin Otieno',
        text: 'Can Connectify provide a single bundled quote and service level agreement for our multi-campus portal?',
        timestamp: '2026-10-27T11:00:00Z'
      },
      {
        id: 'msg-04-2',
        sender: 'admin',
        senderName: 'Connectify Central Desk (Sarah M.)',
        text: 'Hello Kevin! Yes, Connectify handles single-source billing and SLAs. We coordinate the developers, cloud servers, and on-site training under a single Connectify service contract and VAT receipt.',
        timestamp: '2026-10-27T11:35:00Z'
      },
      {
        id: 'msg-04-3',
        sender: 'customer',
        senderName: 'Kevin Otieno',
        text: 'Perfect, that saves us the hassle of managing individual freelancers. Please send the proforma.',
        timestamp: '2026-10-27T13:40:00Z'
      }
    ]
  }
];

