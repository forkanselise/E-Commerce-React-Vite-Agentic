import React from 'react';
import { useCartStore } from '../../stores/cartStore';
import './MobilePhones.css';

export function MobilePhoneDetails({ phone, onClose }) {
  const { addItem } = useCartStore();

  return (
    <div className="container animate-fade-in mobile-details-container">
      <button onClick={onClose} className="mobile-details-back">
        &larr; Back to Mobile Phones
      </button>
      <div className="glass-panel mobile-details-panel">
        <div className="mobile-details-grid">
          
          <div className="mobile-details-image-container">
            <img src={phone.image || 'https://via.placeholder.com/300'} alt={phone.name} className="mobile-details-image" />
          </div>
          
          <div className="mobile-details-content">
            <div className="mb-2">
              <span className="badge badge-amber mb-3">Premium</span>
            </div>
            <h1 className="mobile-details-title gradient-text-cyan">{phone.name}</h1>
            <p className="mobile-details-price">${phone.price}</p>
            
            <p className="mobile-details-desc">
              {phone.description}
            </p>
            
            <div className="mobile-details-specs-grid">
              <div className="mobile-details-spec-item glass-panel">
                <span className="mobile-details-spec-label">Display</span>
                <span className="mobile-details-spec-val">{phone.specs?.display || 'N/A'}</span>
              </div>
              <div className="mobile-details-spec-item glass-panel">
                <span className="mobile-details-spec-label">Processor</span>
                <span className="mobile-details-spec-val">{phone.specs?.processor || 'N/A'}</span>
              </div>
              <div className="mobile-details-spec-item glass-panel">
                <span className="mobile-details-spec-label">RAM</span>
                <span className="mobile-details-spec-val">{phone.specs?.ram || 'N/A'}</span>
              </div>
              <div className="mobile-details-spec-item glass-panel">
                <span className="mobile-details-spec-label">Storage</span>
                <span className="mobile-details-spec-val">{phone.specs?.storage || 'N/A'}</span>
              </div>
            </div>
            
            <div className="mobile-details-actions">
              <button onClick={() => addItem(phone)} className="btn btn-cyan mobile-details-add-btn">
                Add to Cart
              </button>
              <button className="btn btn-secondary btn-icon px-4">
                ♡
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
