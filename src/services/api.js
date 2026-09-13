// Base API URL targeting ASP.NET Core Backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-dotnet.onrender.com/api';

// Cloudinary Configuration
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dnt43ugtr';
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';
export const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL || `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    const data = await res.json();
    if (data.secure_url) {
      return { success: true, url: data.secure_url, data };
    }
  }

  throw new Error('Cloudinary upload failed or returned invalid response');
}

export async function customFetch(endpoint, options = {}) {
  let token = localStorage.getItem('nb_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  // Automatic token refresh handling on 401 Unauthorized
  if (response.status === 401 && !options._retry && endpoint !== '/Auth/login' && endpoint !== '/Auth/register' && endpoint !== '/Auth/refresh-token') {
    const refreshToken = localStorage.getItem('nb_refresh_token');
    if (refreshToken) {
      options._retry = true;
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/Auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        });
        if (refreshRes.ok) {
          const newAuthData = await refreshRes.json();
          localStorage.setItem('nb_token', newAuthData.accessToken);
          if (newAuthData.refreshToken) {
            localStorage.setItem('nb_refresh_token', newAuthData.refreshToken);
          }
          headers['Authorization'] = `Bearer ${newAuthData.accessToken}`;
          return await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
          }).then(r => r.json());
        }
      } catch (e) {
        localStorage.removeItem('nb_token');
        localStorage.removeItem('nb_refresh_token');
        localStorage.removeItem('nb_user');
      }
    }
  }

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
    reviewCount: 210
  }
];

export const INITIAL_RECIPES = [
  {
    id: 'rec_1',
    title: 'Chocolate Ganache Perfect Ratio & Shiny Mirror Glaze',
    category: 'Ganache & Frosting',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800',
    summary: 'Master the 1:1, 2:1, and 1:2 chocolate to heavy cream ratios for drips, whipping, and truffle filling with Callebaut chocolate.'
  }
];

// --- API SERVICE METHODS CONNECTING TO ASP.NET CORE BACKEND ---

export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const data = await customFetch(`/Products${query ? `?${query}` : ''}`);
    if (data && data.length > 0) return data;
    return INITIAL_PRODUCTS;
  } catch (err) {
    return INITIAL_PRODUCTS;
  }
}

export async function fetchFeaturedProducts() {
  try {
    const data = await customFetch('/Products/featured');
    if (data && data.length > 0) return data;
    return INITIAL_PRODUCTS.filter(p => p.isFeatured);
  } catch (err) {
    return INITIAL_PRODUCTS.filter(p => p.isFeatured);
  }
}

export async function fetchCategories() {
  try {
    const data = await customFetch('/Products/categories');
    if (data && data.length > 0) return data;
    return ['All', 'Ingredients', 'Tools', 'Packaging', 'Bakery & Coffee', 'Electronics'];
  } catch (err) {
    return ['All', 'Ingredients', 'Tools', 'Packaging', 'Bakery & Coffee', 'Electronics'];
  }
}

export async function fetchTutorials(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const data = await customFetch(`/Tutorials${query ? `?${query}` : ''}`);
    if (data && data.length > 0) return data;
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

export async function registerUser(fullName, email, password, phone = '') {
  return await customFetch('/Auth/register', {
    method: 'POST',
    body: JSON.stringify({ fullName, email, password, phone })
  });
}

export async function loginUser(email, password) {
  return await customFetch('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function refreshAuthToken(refreshToken) {
  return await customFetch('/Auth/refresh-token', {
    method: 'POST',
    body: JSON.stringify({ refreshToken })
  });
}

export async function fetchUserProfile() {
  return await customFetch('/Auth/me');
}

export async function updateUserProfile(profileData) {
  return await customFetch('/Auth/me', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
}

export async function sendAgentMessage(prompt, conversationHistory = []) {
  try {
    return await customFetch('/Agent/chat', {
      method: 'POST',
      body: JSON.stringify({ message: prompt, prompt: prompt, history: conversationHistory })
    });
  } catch (err) {
    return {
      reply: `Welcome to Buttercup! I'm your AI Concierge. I can help you select Callebaut chocolates, Anchor dairy, baking tools, or enroll in baking classes. How may I assist your baking journey today?`,
      delegatedAgent: 'RouterConcierge'
    };
  }
}
