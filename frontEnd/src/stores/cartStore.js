import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  isCartDrawerOpen: false,
  couponCode: '',
  discountPercent: 0,
  isCheckingOut: false,

  openCart: () => set({ isCartDrawerOpen: true }),
  closeCart: () => set({ isCartDrawerOpen: false }),

  addItem: (product, quantity = 1) => {
    const { items } = get();
    const existingIndex = items.findIndex(i => i.id === product.id || i.productId === product.id);

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      set({ items: updated, isCartDrawerOpen: true });
    } else {
      const newItem = {
        id: product.id || product.productId,
        productId: product.id || product.productId,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
        quantity: quantity,
        sku: product.sku
      };
      set({ items: [...items, newItem], isCartDrawerOpen: true });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter(i => i.id !== productId && i.productId !== productId) });
  },

  updateQuantity: (productId, delta) => {
    const updated = get().items.map(item => {
      if (item.id === productId || item.productId === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    set({ items: updated });
  },

  clearCart: () => set({ items: [], couponCode: '', discountPercent: 0 }),

  applyCoupon: (code) => {
    if (code.trim().toUpperCase() === 'NEXUS10') {
      set({ couponCode: 'NEXUS10', discountPercent: 10 });
      return { success: true, message: '10% Discount applied!' };
    }
    return { success: false, message: 'Invalid promo code.' };
  },

  removeCoupon: () => set({ couponCode: '', discountPercent: 0 }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    return (subtotal * get().discountPercent) / 100;
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal > 2500 ? 0 : 120; // Free shipping above 2500 BDT
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingCost();
    return Math.max(0, subtotal - discount + shipping);
  },

  getTotalItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));
