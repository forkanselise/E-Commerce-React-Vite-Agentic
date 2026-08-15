import React, { useState } from 'react';
import { X, ShoppingBag, Star, ShieldCheck, Truck, Check, Bot } from 'lucide-react';
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
    sendMessage(`Tell me more about the ${product.title} and why it's great for baking.`);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }} onClick={onClose}>
      
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          background: 'var(--bg-surface)'
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
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          
          {/* Left Column Image */}
          <div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '360px', background: '#181d2a' }}>
              <img
                src={product.images[0]?.url}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* Ask AI Agent Quick Button */}
            <button
              onClick={handleAskAiAboutThis}
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '16px', borderColor: 'rgba(34, 211, 238, 0.3)', color: '#22D3EE' }}
            >
              <Bot size={16} color="#22D3EE" />
              <span>Ask AI Concierge About This Item</span>
            </button>
          </div>

          {/* Right Column Product Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-amber">{product.category}</span>
              {product.warehouseStock > 0 ? (
                <span className="badge badge-emerald">In Stock ({product.warehouseStock} available)</span>
              ) : (
                <span className="badge badge-rose">Sold Out</span>
              )}
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>{product.title}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-amber-400)' }}>{product.averageRating}</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• {product.reviewCount} customer reviews</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• SKU: {product.sku}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-amber-400)' }}>
                ৳ {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '16px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ৳ {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Quantity Stepper & Add to Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--glass-border)', borderRadius: '10px', background: 'var(--bg-surface-elevated)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'transparent', border: 'none', padding: '8px 14px', cursor: 'pointer', fontSize: '16px' }}
                >
                  -
                </button>
                <span style={{ padding: '0 12px', fontWeight: 700 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'transparent', border: 'none', padding: '8px 14px', cursor: 'pointer', fontSize: '16px' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px 24px', fontSize: '15px' }}
              >
                {justAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                <span>{justAdded ? 'Added to Cart!' : `Add ${quantity} to Cart`}</span>
              </button>
            </div>

            {/* Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <Truck size={16} color="var(--color-amber-400)" />
                <span>Next-Day Delivery in Dhaka</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} color="var(--color-emerald-400)" />
                <span>100% Quality Satisfaction</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
