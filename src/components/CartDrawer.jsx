import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, CreditCard, Banknote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

export function CartDrawer() {
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(null);

  const {
    items,
    isCartDrawerOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    couponCode,
    discountPercent,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal
  } = useCartStore();

  const { user } = useAuthStore();

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    setCouponMessage(result);
  };

  const handleConfirmOrder = () => {
    const orderNumber = `NB-${Date.now().toString().slice(-6)}`;
    setOrderPlaced({
      orderNumber,
      total: getTotal(),
      itemCount: items.length
    });

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    clearCart();
    setIsCheckingOut(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(6px)',
      zIndex: 70,
      display: 'flex',
      justifyContent: 'flex-end'
    }} onClick={closeCart}>
      
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--color-amber-400)" />
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Your Shopping Cart</h3>
            <span className="badge badge-amber">{items.length} items</span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {orderPlaced ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(52, 211, 153, 0.2)',
                border: '2px solid #34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <Check size={32} color="#34D399" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Order Placed Successfully!</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Thank you for your artisan order. Your confirmation number is <strong>#{orderPlaced.orderNumber}</strong>.
              </p>
              <button
                onClick={() => { setOrderPlaced(null); closeCart(); }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px' }}>Add fresh artisan pastries or baking equipment from the catalog or via the AI Concierge.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </h4>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-amber-400)', marginTop: '2px' }}>
                      ৳ {item.price.toLocaleString()}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: 700 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Pricing Summary & Checkout Button */}
        {items.length > 0 && !orderPlaced && (
          <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
            
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Promo code (Try: NEXUS10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px' }}>
                Apply
              </button>
            </form>

            {couponMessage && (
              <div style={{ fontSize: '11px', color: couponMessage.success ? '#34D399' : '#FB7185', marginBottom: '10px' }}>
                {couponMessage.message}
              </div>
            )}

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>৳ {getSubtotal().toLocaleString()}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-emerald-400)' }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>- ৳ {getDiscountAmount().toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>{getShippingCost() === 0 ? 'FREE' : `৳ ${getShippingCost()}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', paddingTop: '8px', borderTop: '1px solid var(--glass-border)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--color-amber-400)' }}>৳ {getTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            {isCheckingOut ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Select Payment:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: paymentMethod === 'cod' ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-surface-elevated)',
                      border: paymentMethod === 'cod' ? '1px solid var(--color-amber-500)' : '1px solid var(--glass-border)',
                      color: paymentMethod === 'cod' ? 'var(--color-amber-400)' : 'var(--text-primary)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cash on Delivery
                  </button>

                  <button
                    onClick={() => setPaymentMethod('bkash')}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: paymentMethod === 'bkash' ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-surface-elevated)',
                      border: paymentMethod === 'bkash' ? '1px solid var(--color-amber-500)' : '1px solid var(--glass-border)',
                      color: paymentMethod === 'bkash' ? 'var(--color-amber-400)' : 'var(--text-primary)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    bKash / Nagad
                  </button>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', marginTop: '6px' }}
                >
                  Confirm & Place Order (৳ {getTotal().toLocaleString()})
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
