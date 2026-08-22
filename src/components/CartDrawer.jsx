import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { createOrder } from '../services/api';

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

  const handleConfirmOrder = async () => {
    const orderPayload = {
      items: items.map(i => ({ productId: i.id || i.productId, quantity: i.quantity, price: i.price })),
      totalAmount: getTotal(),
      paymentMethod,
      shippingAddress: 'Dhanmondi, Dhaka'
    };

    const res = await createOrder(orderPayload);
    const orderNumber = res.data?.orderNumber || `SMART-${Date.now().toString().slice(-6)}`;

    setOrderPlaced({
      orderNumber,
      total: getTotal(),
      itemCount: items.length
    });

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
      background: 'rgba(61, 35, 20, 0.7)',
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
          background: '#ffffff',
          borderLeft: '1px solid rgba(61, 35, 20, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 35px rgba(61, 35, 20, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(61, 35, 20, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#faf6f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="#e05297" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#3d2314' }}>Smart Bakery Cart</h3>
            <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', background: '#e05297', color: '#ffffff', borderRadius: '9999px' }}>
              {items.length} items
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#3d2314'
            }}
          >
            <X size={18} />
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
                background: '#ecfdf5',
                border: '2px solid #34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <Check size={32} color="#059669" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#3d2314', marginBottom: '8px' }}>Order Confirmed!</h3>
              <p style={{ fontSize: '13px', color: '#6e5849', marginBottom: '16px' }}>
                Thank you for ordering with Smart Bakery. Your order tracking number is <strong>#{orderPlaced.orderNumber}</strong>.
              </p>
              <button
                onClick={() => { setOrderPlaced(null); closeCart(); }}
                className="btn btn-rose"
                style={{ width: '100%', fontWeight: 800 }}
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9e8c80' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#3d2314', marginBottom: '6px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px', color: '#6e5849' }}>Add Callebaut chocolates, Anchor butter, fresh donuts, or baking classes from the store catalog.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {items.map(item => (
                <div
                  key={item.id || item.productId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '14px',
                    background: '#faf6f0',
                    border: '1px solid rgba(61, 35, 20, 0.08)'
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#3d2314', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </h4>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#e05297', marginTop: '2px' }}>
                      ৳ {item.price?.toLocaleString()}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ background: '#ffffff', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', fontWeight: 800 }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#3d2314' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{ background: '#ffffff', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', fontWeight: 800 }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#9e8c80', cursor: 'pointer', padding: '6px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Footer */}
        {items.length > 0 && !orderPlaced && (
          <div style={{ padding: '20px', borderTop: '1px solid rgba(61, 35, 20, 0.08)', background: '#faf6f0' }}>
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Promo code (Try: SMART10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  background: '#ffffff',
                  border: '1px solid rgba(61, 35, 20, 0.15)',
                  borderRadius: '8px',
                  padding: '7px 10px',
                  fontSize: '12px',
                  color: '#3d2314',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                Apply
              </button>
            </form>

            {couponMessage && (
              <div style={{ fontSize: '11px', color: couponMessage.success ? '#059669' : '#dc2626', marginBottom: '10px', fontWeight: 700 }}>
                {couponMessage.message}
              </div>
            )}

            {/* Pricing Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6e5849' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700 }}>৳ {getSubtotal().toLocaleString()}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 700 }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>- ৳ {getDiscountAmount().toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6e5849' }}>
                <span>Delivery Charge</span>
                <span style={{ fontWeight: 700 }}>{getShippingCost() === 0 ? 'FREE' : `৳ ${getShippingCost()}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#3d2314', paddingTop: '8px', borderTop: '1px solid rgba(61, 35, 20, 0.1)' }}>
                <span>Total Payable</span>
                <span style={{ color: '#e05297' }}>৳ {getTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            {isCheckingOut ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#3d2314' }}>Payment Method:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: paymentMethod === 'cod' ? '#e05297' : '#ffffff',
                      color: paymentMethod === 'cod' ? '#ffffff' : '#3d2314',
                      border: '1px solid rgba(61, 35, 20, 0.15)',
                      fontSize: '12px',
                      fontWeight: 700,
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
                      background: paymentMethod === 'bkash' ? '#e05297' : '#ffffff',
                      color: paymentMethod === 'bkash' ? '#ffffff' : '#3d2314',
                      border: '1px solid rgba(61, 35, 20, 0.15)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    bKash / Nagad / Card
                  </button>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="btn btn-rose"
                  style={{ width: '100%', padding: '12px', marginTop: '6px', fontWeight: 800 }}
                >
                  PLACE ORDER (৳ {getTotal().toLocaleString()})
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="btn btn-rose"
                style={{ width: '100%', padding: '12px', fontWeight: 800 }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
