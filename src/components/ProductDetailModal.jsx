import React, { useState } from 'react';
import { X, ShoppingBag, Star, ShieldCheck, Truck, Check, Bot, Heart, CreditCard } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAiDrawerStore } from '../stores/aiDrawerStore';

export function ProductDetailModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCartStore();
  const { openDrawer, sendMessage } = useAiDrawerStore();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleAskAiAboutThis = () => {
    openDrawer();
    sendMessage(`Tell me more about ${product.title} and how to use it in baking.`);
  };

  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(61, 35, 20, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }} onClick={onClose}>
      
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(61, 35, 20, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#faf6f0',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#3d2314'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '36px' }}>
          
          {/* Left Image & AI Assistant button */}
          <div>
            <div style={{ borderRadius: '18px', overflow: 'hidden', height: '350px', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
              <img
                src={imageUrl}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <button
              onClick={handleAskAiAboutThis}
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '16px', borderColor: '#e05297', color: '#e05297' }}
            >
              <Bot size={16} color="#e05297" />
              <span>Ask AI Concierge About This Item</span>
            </button>
          </div>

          {/* Right Product Details (Matching Mockup Section 03 Product Detail) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', background: '#fdf2f8', color: '#e05297', borderRadius: '9999px' }}>
                {product.category}
              </span>
              {product.warehouseStock > 0 ? (
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', background: '#ecfdf5', color: '#059669', borderRadius: '9999px' }}>
                  In Stock ({product.warehouseStock} units)
                </span>
              ) : (
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', background: '#fef2f2', color: '#dc2626', borderRadius: '9999px' }}>
                  Out of Stock
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#3d2314', marginBottom: '10px', lineHeight: 1.3 }}>
              {product.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#3d2314' }}>{(product.averageRating || 4.9).toFixed(1)}</span>
              </div>
              <span style={{ fontSize: '12px', color: '#9e8c80' }}>({product.reviewCount || 120} reviews)</span>
              <span style={{ fontSize: '12px', color: '#9e8c80' }}>• SKU: {product.sku}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '30px', fontWeight: 800, color: '#3d2314' }}>
                ৳ {product.price?.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '16px', color: '#9e8c80', textDecoration: 'line-through' }}>
                  ৳ {product.compareAtPrice?.toLocaleString()}
                </span>
              )}
            </div>

            <p style={{ fontSize: '14px', color: '#6e5849', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Quantity Stepper & Add to Cart & Buy Now */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '12px', background: '#faf6f0' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'transparent', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: '16px', fontWeight: 800, color: '#3d2314' }}
                >
                  -
                </button>
                <span style={{ padding: '0 12px', fontWeight: 800, color: '#3d2314' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'transparent', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: '16px', fontWeight: 800, color: '#3d2314' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-dark"
                style={{ flex: 1, padding: '13px', fontSize: '14px', fontWeight: 800 }}
              >
                {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
                <span>{justAdded ? 'Added!' : 'ADD TO CART'}</span>
              </button>

              <button
                onClick={() => { handleAddToCart(); onClose(); }}
                className="btn btn-rose"
                style={{ flex: 1, padding: '13px', fontSize: '14px', fontWeight: 800 }}
              >
                <CreditCard size={16} />
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(61, 35, 20, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6e5849', fontWeight: 600 }}>
                <Truck size={16} color="#e05297" />
                <span>Fast Express Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6e5849', fontWeight: 600 }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>100% Original Quality Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
