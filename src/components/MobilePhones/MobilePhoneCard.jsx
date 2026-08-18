import React from 'react';
import { useCartStore } from '../../stores/cartStore';
import './MobilePhones.css';

export function MobilePhoneCard({ phone }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(phone);
  };

  return (
    <div className="glass-card glass-card-interactive mobile-card">
      <div className="mobile-card-image-container">
        <img src={phone.image || 'https://via.placeholder.com/150'} alt={phone.name} className="mobile-card-image" />
        <div className="mobile-card-badge">
           <span className="badge badge-cyan">New</span>
        </div>
      </div>
      
      <div className="mobile-card-content">
        <h3 className="mobile-card-title">{phone.name}</h3>
        
        <div className="mobile-card-specs">
          <span>{phone.specs?.ram || 'N/A'}</span> • <span>{phone.specs?.storage || 'N/A'}</span>
        </div>
        
        <div className="mobile-card-footer">
          <span className="mobile-card-price">${phone.price}</span>
          <button onClick={handleAddToCart} className="btn btn-cyan btn-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
