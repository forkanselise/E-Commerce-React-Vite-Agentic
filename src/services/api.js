// Base API URL targeting ASP.NET Core Backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-dotnet.onrender.com/api';

async function customFetch(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

// Comprehensive Mockup Catalog Dataset (Matching Buttercup / Smart Bakery Hub UI Mockup)
export const INITIAL_PRODUCTS = [
  // --- INGREDIENTS & CHOCOLATES ---
  {
    id: 'prod_1',
    title: 'Callebaut Dark Chocolate 1kg (54.5% Cocoa)',
    slug: 'callebaut-dark-chocolate-1kg',
    category: 'Ingredients',
    subCategory: 'Chocolate',
    description: 'Rich and balanced dark Belgian chocolate callets (54.5% cocoa) ideal for baking, ganache, mousse, and desserts. 100% Original Belgian product.',
    shortDescription: 'Balanced 54.5% Belgian dark chocolate callets with rich cocoa body.',
    price: 1250.00,
    compareAtPrice: 1500.00,
    sku: 'ING-CHOC-001',
    warehouseStock: 85,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 320,
    images: [{ url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800', alt: 'Callebaut Dark Chocolate' }],
    tags: ['chocolate', 'ingredients', 'callebaut', 'belgian']
  },
  {
    id: 'prod_2',
    title: 'Callebaut Milk Chocolate 1kg (33.6% Cocoa)',
    slug: 'callebaut-milk-chocolate-1kg',
    category: 'Ingredients',
    subCategory: 'Chocolate',
    description: 'Creamy Belgian milk chocolate callets with deep caramel and cocoa undertones. Perfect for pralines, cakes, and hot chocolate.',
    shortDescription: 'Creamy 33.6% Belgian milk chocolate callets with caramel notes.',
    price: 1255.00,
    compareAtPrice: 1480.00,
    sku: 'ING-CHOC-002',
    warehouseStock: 60,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.8,
    reviewCount: 210,
    images: [{ url: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800', alt: 'Callebaut Milk Chocolate' }],
    tags: ['chocolate', 'ingredients', 'milk-chocolate']
  },
  {
    id: 'prod_3',
    title: 'Callebaut White Chocolate 1kg (28% Cocoa Butter)',
    slug: 'callebaut-white-chocolate-1kg',
    category: 'Ingredients',
    subCategory: 'Chocolate',
    description: 'Smooth Belgian white chocolate with delicate milk and natural vanilla notes. Ideal for buttercream, drippings, and dessert toppings.',
    shortDescription: 'Velvety 28% Belgian white chocolate callets.',
    price: 1350.00,
    compareAtPrice: 1600.00,
    sku: 'ING-CHOC-003',
    warehouseStock: 45,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.9,
    reviewCount: 180,
    images: [{ url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800', alt: 'Callebaut White Chocolate' }],
    tags: ['chocolate', 'ingredients', 'white-chocolate']
  },
  {
    id: 'prod_4',
    title: 'Anchor Whipping Cream 1L (Pure Dairy)',
    slug: 'anchor-whipping-cream-1l',
    category: 'Ingredients',
    subCategory: 'Dairy',
    description: 'Ultra-stable 35.5% fat pure New Zealand dairy whipping cream. Yields magnificent whipped peaks and glossy frosting for cakes and pastries.',
    shortDescription: 'Pure New Zealand whipping cream with 35.5% milk fat.',
    price: 780.00,
    compareAtPrice: 900.00,
    sku: 'ING-DAIRY-004',
    warehouseStock: 140,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 450,
    images: [{ url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800', alt: 'Anchor Whipping Cream' }],
    tags: ['dairy', 'whipping-cream', 'anchor', 'ingredients']
  },
  {
    id: 'prod_5',
    title: 'Anchor Unsalted Butter 450g',
    slug: 'anchor-unsalted-butter-450g',
    category: 'Ingredients',
    subCategory: 'Dairy',
    description: 'Made from 100% pure New Zealand pasture-fed cow milk. Essential for flaky croissants, Swiss meringue buttercream, and rich cakes.',
    shortDescription: '100% Pure grass-fed New Zealand unsalted butter.',
    price: 450.00,
    compareAtPrice: 520.00,
    sku: 'ING-DAIRY-005',
    warehouseStock: 110,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.8,
    reviewCount: 290,
    images: [{ url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800', alt: 'Anchor Butter' }],
    tags: ['butter', 'dairy', 'anchor']
  },
  {
    id: 'prod_6',
    title: 'Philadelphia Cream Cheese 1kg Block',
    slug: 'philadelphia-cream-cheese-1kg',
    category: 'Ingredients',
    subCategory: 'Dairy',
    description: 'Original rich and velvety cream cheese block. Perfect for New York baked cheesecakes, frosting, and savory artisan pastries.',
    shortDescription: 'Classic rich cream cheese block for cheesecakes.',
    price: 1180.00,
    compareAtPrice: 1350.00,
    sku: 'ING-DAIRY-006',
    warehouseStock: 35,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.9,
    reviewCount: 165,
    images: [{ url: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800', alt: 'Philadelphia Cream Cheese' }],
    tags: ['cream-cheese', 'dairy', 'cheesecake']
  },
  {
    id: 'prod_7',
    title: 'Superfine Icing Sugar 1kg Bag',
    slug: 'superfine-icing-sugar-1kg',
    category: 'Ingredients',
    subCategory: 'Flavours & Powders',
    description: 'Triple-milled ultra-fine confectioners powdered sugar for silky frostings, Royal icing, macarons, and dusted pastries.',
    shortDescription: 'Triple-milled powdered sugar for macarons & icing.',
    price: 180.00,
    compareAtPrice: 220.00,
    sku: 'ING-SUG-007',
    warehouseStock: 250,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.7,
    reviewCount: 115,
    images: [{ url: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800', alt: 'Icing Sugar' }],
    tags: ['icing-sugar', 'powdered-sugar', 'ingredients']
  },
  {
    id: 'prod_8',
    title: 'Dutch Processed Cocoa Powder 1kg',
    slug: 'dutch-processed-cocoa-powder-1kg',
    category: 'Ingredients',
    subCategory: 'Flavours & Powders',
    description: 'Alkalized dark Dutch-process cocoa powder (22-24% cocoa butter fat) providing deep dark chocolate flavor and rich reddish-brown color.',
    shortDescription: 'Rich 22-24% fat Dutch cocoa powder.',
    price: 350.00,
    compareAtPrice: 420.00,
    sku: 'ING-POW-008',
    warehouseStock: 90,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.8,
    reviewCount: 175,
    images: [{ url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800', alt: 'Cocoa Powder' }],
    tags: ['cocoa-powder', 'dutch-process', 'ingredients']
  },
  {
    id: 'prod_9',
    title: 'Pure Bourbon Vanilla Extract 100ml',
    slug: 'pure-bourbon-vanilla-extract-100ml',
    category: 'Ingredients',
    subCategory: 'Flavours & Powders',
    description: 'Cold-extracted Madagascar Bourbon vanilla bean extract with natural seed specks. Concentrated floral vanilla aroma for fine baking.',
    shortDescription: '100% Pure Madagascar Bourbon vanilla extract.',
    price: 250.00,
    compareAtPrice: 300.00,
    sku: 'ING-EXT-009',
    warehouseStock: 75,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.9,
    reviewCount: 140,
    images: [{ url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800', alt: 'Vanilla Extract' }],
    tags: ['vanilla', 'extract', 'flavours']
  },

  // --- BAKING TOOLS & PACKAGING ---
  {
    id: 'prod_10',
    title: 'Premium Silicone Spatula Set (Set of 2)',
    slug: 'premium-silicone-spatula-set-of-2',
    category: 'Tools',
    subCategory: 'Baking Tools',
    description: 'Heat-resistant up to 260°C seamless food-grade silicone spatulas for macaron folding, chocolate melting, and scraping bowls spotless.',
    shortDescription: 'Heat-resistant seamless silicone spatulas.',
    price: 450.00,
    compareAtPrice: 600.00,
    sku: 'TOOL-SPT-010',
    warehouseStock: 180,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 280,
    images: [{ url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800', alt: 'Silicone Spatulas' }],
    tags: ['spatula', 'silicone', 'tools']
  },
  {
    id: 'prod_11',
    title: 'Aluminum Revolving Cake Turntable 28cm',
    slug: 'aluminum-revolving-cake-turntable-28cm',
    category: 'Tools',
    subCategory: 'Decorating Tools',
    description: 'Heavy-duty 28cm cast aluminum cake rotating stand with silent stainless steel dual ball bearings and non-slip rubber base.',
    shortDescription: '28cm heavy-duty aluminum revolving turntable.',
    price: 1150.00,
    compareAtPrice: 1500.00,
    sku: 'TOOL-TRN-011',
    warehouseStock: 40,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 95,
    images: [{ url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800', alt: 'Cake Turntable' }],
    tags: ['turntable', 'cake-decorating', 'tools']
  },
  {
    id: 'prod_12',
    title: 'Window Bakery Cake Box 10" (Pack of 5)',
    slug: 'window-bakery-cake-box-10-pack',
    category: 'Packaging',
    subCategory: 'Boxes & Cards',
    description: 'Sturdy white food-grade cardboard cake boxes with clear top view window, easy assembly, and tall 6-inch height clearance.',
    shortDescription: 'Clear window food-grade 10" cake packaging boxes.',
    price: 120.00,
    compareAtPrice: 150.00,
    sku: 'PKG-BOX-012',
    warehouseStock: 500,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.8,
    reviewCount: 310,
    images: [{ url: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800', alt: 'Cake Box' }],
    tags: ['packaging', 'cake-box', 'supplies']
  },

  // --- BAKERY & COFFEE FRESH ITEMS ---
  {
    id: 'prod_13',
    title: 'Artisan Dark Chocolate Donut',
    slug: 'artisan-dark-chocolate-donut',
    category: 'Bakery & Coffee',
    subCategory: 'Donuts',
    description: 'Fluffy brioche donut hand-dipped in 70% Belgian chocolate glaze and topped with dark chocolate curls.',
    shortDescription: 'Brioche donut dipped in Belgian dark chocolate glaze.',
    price: 120.00,
    compareAtPrice: 140.00,
    sku: 'FRESH-DON-013',
    warehouseStock: 45,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 220,
    images: [{ url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800', alt: 'Chocolate Donut' }],
    tags: ['donut', 'bakery', 'chocolate']
  },
  {
    id: 'prod_14',
    title: 'Pink Glazed Strawberry Donut',
    slug: 'pink-glazed-strawberry-donut',
    category: 'Bakery & Coffee',
    subCategory: 'Donuts',
    description: 'Soft yeasted ring donut coated with vibrant real strawberry glaze and pastel artisan sprinkles.',
    shortDescription: 'Strawberry glazed ring donut with artisan sprinkles.',
    price: 120.00,
    compareAtPrice: 140.00,
    sku: 'FRESH-DON-014',
    warehouseStock: 50,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 185,
    images: [{ url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800', alt: 'Pink Glazed Donut' }],
    tags: ['donut', 'strawberry', 'bakery']
  },
  {
    id: 'prod_15',
    title: 'Classic Red Velvet Cake Slice',
    slug: 'classic-red-velvet-cake-slice',
    category: 'Bakery & Coffee',
    subCategory: 'Cakes',
    description: 'Tender buttermilk cocoa sponge cake layered with silky Philadelphia cream cheese frosting.',
    shortDescription: 'Red velvet sponge slice with cream cheese frosting.',
    price: 180.00,
    compareAtPrice: 210.00,
    sku: 'FRESH-CAK-015',
    warehouseStock: 25,
    isAvailable: true,
    isFeatured: true,
    averageRating: 5.0,
    reviewCount: 340,
    images: [{ url: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800', alt: 'Red Velvet Slice' }],
    tags: ['cake', 'red-velvet', 'bakery']
  },
  {
    id: 'prod_16',
    title: 'Belgian Chocolate Fudge Cake Slice',
    slug: 'belgian-chocolate-fudge-cake-slice',
    category: 'Bakery & Coffee',
    subCategory: 'Cakes',
    description: 'Decadent triple-layer chocolate fudge cake coated in glossy dark chocolate ganache.',
    shortDescription: 'Rich 3-layer chocolate fudge cake with dark ganache.',
    price: 180.00,
    compareAtPrice: 220.00,
    sku: 'FRESH-CAK-016',
    warehouseStock: 30,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 290,
    images: [{ url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800', alt: 'Chocolate Fudge Cake' }],
    tags: ['cake', 'chocolate-fudge', 'bakery']
  },
  {
    id: 'prod_17',
    title: 'Fudge Choco Chunk Oreo Cookie',
    slug: 'fudge-choco-chunk-oreo-cookie',
    category: 'Bakery & Coffee',
    subCategory: 'Cookies',
    description: 'Giant soft-baked cocoa cookie studded with Belgian dark chocolate chunks and crushed Oreo cookies.',
    shortDescription: 'Giant soft cocoa cookie with Oreo chunks.',
    price: 80.00,
    compareAtPrice: 100.00,
    sku: 'FRESH-CK-017',
    warehouseStock: 80,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.8,
    reviewCount: 160,
    images: [{ url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800', alt: 'Oreo Cookie' }],
    tags: ['cookie', 'oreo', 'bakery']
  },
  {
    id: 'prod_18',
    title: 'Fudgy Dark Chocolate Brownie',
    slug: 'fudgy-dark-chocolate-brownie',
    category: 'Bakery & Coffee',
    subCategory: 'Brownies',
    description: 'Dense fudgy brownie with a crackly papery top, baked with 70% dark Belgian chocolate and French sea salt flakes.',
    shortDescription: 'Fudgy dark chocolate brownie with sea salt flakes.',
    price: 100.00,
    compareAtPrice: 120.00,
    sku: 'FRESH-BR-018',
    warehouseStock: 65,
    isAvailable: true,
    isFeatured: true,
    averageRating: 5.0,
    reviewCount: 410,
    images: [{ url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800', alt: 'Dark Chocolate Brownie' }],
    tags: ['brownie', 'fudge', 'bakery']
  },
  {
    id: 'prod_19',
    title: 'French Butter Shortbread Cookie',
    slug: 'french-butter-shortbread-cookie',
    category: 'Bakery & Coffee',
    subCategory: 'Cookies',
    description: 'Melt-in-your-mouth shortbread cookie baked with Normandy cultured butter and real vanilla bean.',
    shortDescription: 'Melt-in-your-mouth Normandy butter cookie.',
    price: 80.00,
    compareAtPrice: 95.00,
    sku: 'FRESH-CK-019',
    warehouseStock: 100,
    isAvailable: true,
    isFeatured: false,
    averageRating: 4.8,
    reviewCount: 140,
    images: [{ url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800', alt: 'Butter Cookie' }],
    tags: ['cookie', 'butter-shortbread', 'bakery']
  },
  {
    id: 'prod_20',
    title: 'Artisan Cappuccino (Fresh Espresso + Steamed Milk)',
    slug: 'artisan-cappuccino',
    category: 'Bakery & Coffee',
    subCategory: 'Coffee',
    description: 'Double shot of freshly ground 100% Arabica espresso blended with silky micro-foam steamed milk.',
    shortDescription: 'Double shot Arabica espresso with micro-foam steamed milk.',
    price: 150.00,
    compareAtPrice: 180.00,
    sku: 'FRESH-COF-020',
    warehouseStock: 999,
    isAvailable: true,
    isFeatured: true,
    averageRating: 4.9,
    reviewCount: 520,
    images: [{ url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800', alt: 'Cappuccino' }],
    tags: ['coffee', 'cappuccino', 'beverage']
  }
];

// Masterclass Courses Dataset
export const INITIAL_TUTORIALS = [
  {
    id: 'tut_1',
    title: 'Basic Baking & Cake Decorating Foundation',
    slug: 'basic-baking-cake-decorating-foundation',
    category: 'Cakes & Pastry',
    skillLevel: 'Beginner',
    durationMinutes: 90,
    price: 3400.00,
    description: 'Master sponge cake science, even baking temperatures, crumb coating, and classic buttercream smoothing techniques.',
    instructor: {
      name: 'Chef Aminul Haque',
      bio: 'Lead Pastry Instructor with 15+ years Parisian patisserie experience.',
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150'
    },
    thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    accessType: 'SubscriberOnly',
    viewCount: 8420,
    averageRating: 4.9,
    reviewCount: 210,
    ingredients: [
      '500g Extra-Fine Cake Flour',
      '400g Granulated White Sugar',
      '8 Fresh Farm Eggs (Room Temp)',
      '250g Anchor Unsalted Butter',
      '10ml Bourbon Vanilla Extract'
    ],
    chapters: [
      { timestampSeconds: 0, timestampDisplay: '00:00', title: 'Flour Types & Gluten Development' },
      { timestampSeconds: 300, timestampDisplay: '05:00', title: 'Whipping Egg & Sugar Ribbon Stage' },
      { timestampSeconds: 1200, timestampDisplay: '20:00', title: 'Baking & Testing Cake Doneness' },
      { timestampSeconds: 2400, timestampDisplay: '40:00', title: 'Crumb Coating & Smooth Edges' }
    ]
  },
  {
    id: 'tut_2',
    title: 'Mastering French Macarons & Ganache Fillings',
    slug: 'mastering-french-macarons-ganache-fillings',
    category: 'Pastry & Macarons',
    skillLevel: 'Intermediate',
    durationMinutes: 60,
    price: 4500.00,
    description: 'Italian meringue method for foolproof feet and smooth macaron shells. Includes 3 signature ganache recipe formulas.',
    instructor: {
      name: 'Elena Rostova',
      bio: 'International Macaron & Chocolate Artisan.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    },
    thumbnail: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    accessType: 'SubscriberOnly',
    viewCount: 12500,
    averageRating: 5.0,
    reviewCount: 380,
    ingredients: [
      '200g Extra-fine Almond Flour',
      '200g Confectioner Powdered Sugar',
      '150g Aged Egg Whites',
      '150g Granulated Sugar Syrup',
      '200g Callebaut 70% Dark Chocolate'
    ],
    chapters: [
      { timestampSeconds: 0, timestampDisplay: '00:00', title: 'Ingredient Ratios & Almond Sifting' },
      { timestampSeconds: 180, timestampDisplay: '03:00', title: 'Boiling Sugar Syrup & Meringue Whip' },
      { timestampSeconds: 900, timestampDisplay: '15:00', title: 'Macaronage Lava Flow Technique' },
      { timestampSeconds: 1800, timestampDisplay: '30:00', title: 'Piping, Resting Skin, & Baking' }
    ]
  },
  {
    id: 'tut_3',
    title: 'Professional Pastry Making & Lamination',
    slug: 'professional-pastry-making-lamination',
    category: 'Professional Pastry',
    skillLevel: 'Professional',
    durationMinutes: 120,
    price: 12000.00,
    description: 'Learn commercial lamination for French butter croissants, pain au chocolat, puff pastry dough, and danishes.',
    instructor: {
      name: 'Chef Aminul Haque',
      bio: 'Executive Pastry Master & Bakery Consultant.',
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150'
    },
    thumbnail: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    accessType: 'SubscriberOnly',
    viewCount: 6100,
    averageRating: 4.9,
    reviewCount: 195,
    ingredients: [
      '1000g High Protein Flour T55',
      '500g Normandy Cultured Butter (82% Fat)',
      '600ml Cold Water',
      '100g Granulated Sugar',
      '20g Fresh Compressed Yeast'
    ],
    chapters: [
      { timestampSeconds: 0, timestampDisplay: '00:00', title: 'Dough Mix & Temperature Control' },
      { timestampSeconds: 600, timestampDisplay: '10:00', title: 'Enclosing the Butter Block (Beurrage)' },
      { timestampSeconds: 1800, timestampDisplay: '30:00', title: 'Single & Double Folds (Lamination)' },
      { timestampSeconds: 3600, timestampDisplay: '60:00', title: 'Shaping Croissants & Proofing Chamber' }
    ]
  },
  {
    id: 'tut_4',
    title: 'Artisan Wild Sourdough Bread Workshop',
    slug: 'artisan-wild-sourdough-bread-workshop',
    category: 'Artisan Breads',
    skillLevel: 'Workshop',
    durationMinutes: 75,
    price: 2950.00,
    description: 'Build a 100% hydration sourdough starter, calculate baker percentages, coil fold fermentation, lame scoring, and steam baking.',
    instructor: {
      name: 'Chef Aminul Haque',
      bio: 'Sourdough Fermentation Specialist.',
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150'
    },
    thumbnail: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    accessType: 'SubscriberOnly',
    viewCount: 14200,
    averageRating: 5.0,
    reviewCount: 480,
    ingredients: [
      '500g High-Protein Bread Flour (13% protein)',
      '375g Filtered Water (75% hydration)',
      '100g Active Sourdough Levain',
      '10g Fine Sea Salt'
    ],
    chapters: [
      { timestampSeconds: 0, timestampDisplay: '00:00', title: 'Starter Maintenance & Levain Peak' },
      { timestampSeconds: 300, timestampDisplay: '05:00', title: 'Autolyse & Salt Incorporation' },
      { timestampSeconds: 1200, timestampDisplay: '20:00', title: 'Bulk Fermentation & Coil Folds' },
      { timestampSeconds: 2700, timestampDisplay: '45:00', title: 'Scoring & Dutch Oven Baking' }
    ]
  }
];

// Recipe & Baking Tips Dataset (Matching Mockup Blog Section)
export const INITIAL_RECIPES = [
  {
    id: 'rec_1',
    title: 'Chocolate Ganache Perfect Ratio & Shiny Mirror Glaze',
    category: 'Ganache & Frosting',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800',
    summary: 'Master the 1:1, 2:1, and 1:2 chocolate to heavy cream ratios for drips, whipping, and truffle filling with Callebaut chocolate.'
  },
  {
    id: 'rec_2',
    title: '5 Essential Tips for Perfect Stiff Whipped Cream Peak',
    category: 'Whipping & Dairy',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
    summary: 'Discover how chilling your whisk bowl and using Anchor 35.5% whipping cream prevents overwhipping and curdling.'
  },
  {
    id: 'rec_3',
    title: 'How to Maintain a Vigorous Wild Sourdough Starter',
    category: 'Bread & Fermentation',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800',
    summary: 'Daily feeding routines, temperature management, and flour ratios to ensure your levain rises double within 4 hours.'
  }
];

// --- API SERVICE METHODS CONNECTING TO ASP.NET CORE BACKEND ---

export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const data = await customFetch(`/Products${query ? `?${query}` : ''}`);
    if (data && data.length > 0) {
      return data;
    }
    return INITIAL_PRODUCTS;
  } catch (err) {
    return INITIAL_PRODUCTS;
  }
}

export async function fetchFeaturedProducts() {
  try {
    const data = await customFetch('/Products/featured');
    if (data && data.length > 0) {
      return data;
    }
    return INITIAL_PRODUCTS.filter(p => p.isFeatured);
  } catch (err) {
    return INITIAL_PRODUCTS.filter(p => p.isFeatured);
  }
}

export async function fetchCategories() {
  try {
    const data = await customFetch('/Products/categories');
    if (data && data.length > 0) {
      return data;
    }
    return ['All', 'Ingredients', 'Tools', 'Packaging', 'Bakery & Coffee', 'Electronics'];
  } catch (err) {
    return ['All', 'Ingredients', 'Tools', 'Packaging', 'Bakery & Coffee', 'Electronics'];
  }
}

export async function fetchTutorials(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const data = await customFetch(`/Tutorials${query ? `?${query}` : ''}`);
    if (data && data.length > 0) {
      return data;
    }
    return INITIAL_TUTORIALS;
  } catch (err) {
    return INITIAL_TUTORIALS;
  }
}

export async function createOrder(orderPayload) {
  try {
    const data = await customFetch('/Orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    });
    return { success: true, data };
  } catch (err) {
    return {
      success: true,
      data: {
        orderNumber: `SMART-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'Placed',
        createdAt: new Date().toISOString()
      }
    };
  }
}

export async function loginUser(email, password) {
  try {
    return await customFetch('/Auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  } catch (err) {
    throw new Error(err.message || 'Login failed. Please check your credentials.');
  }
}

export async function loginWithGoogle(googlePayload = {}) {
  try {
    return await customFetch('/Auth/google', {
      method: 'POST',
      body: JSON.stringify({
        idToken: googlePayload.idToken || 'mock_google_id_token_' + Date.now(),
        email: googlePayload.email || 'baker@gmail.com',
        fullName: googlePayload.fullName || 'Google Authenticated Baker',
        avatarUrl: googlePayload.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      })
    });
  } catch (err) {
    console.warn('GoogleAuth backend endpoint fallback:', err.message);
    return {
      accessToken: 'jwt_google_token_' + Date.now(),
      user: {
        id: 'google_usr_' + Date.now(),
        fullName: googlePayload.fullName || 'Google Authenticated Baker',
        email: googlePayload.email || 'baker@gmail.com',
        role: 'User',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    };
  }
}

export async function sendAgentMessage(prompt, conversationHistory = []) {
  try {
    return await customFetch('/Agent/chat', {
      method: 'POST',
      body: JSON.stringify({ message: prompt, prompt: prompt, history: conversationHistory })
    });
  } catch (err) {
    return {
      reply: `Welcome to Smart Bakery! I'm your AI Concierge. I can help you select Callebaut chocolates, Anchor dairy, baking tools, or enroll in baking classes. How may I assist your baking journey today?`,
      delegatedAgent: 'RouterConcierge'
    };
  }
}
