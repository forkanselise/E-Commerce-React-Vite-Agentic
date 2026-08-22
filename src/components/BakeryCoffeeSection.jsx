import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Check, Coffee, Heart, Gift } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { fetchProducts } from '../services/api';

export function BakeryCoffeeSection({ onSelectProduct }) {
  const [items, setItems] = useState([]);
  const [selectedSub, setSelectedSub] = useState('All');
  const [addedId, setAddedId] = useState(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    async function loadBakeryItems() {
      const allProds = await fetchProducts();
      const bakeryItems = allProds.filter(p => p.category === 'Bakery & Coffee' || p.category === 'Bakery');
      setItems(bakeryItems);
    }
    loadBakeryItems();
  }, []);

  const subCategories = ['All', 'Cakes', 'Donuts', 'Cookies', 'Brownies', 'Coffee'];

  const filteredItems = items.filter(item => {
    if (selectedSub === 'All') return true;
    return item.subCategory === selectedSub || item.tags?.includes(selectedSub.toLowerCase());
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedId(product.id || product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div style={{ background: '#faf6f0', padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header Showcase Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #3d2314 0%, #2a170d 100%)',
          borderRadius: '24px',
          padding: '40px 48px',
          color: '#ffffff',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 12px 35px rgba(61, 35, 20, 0.15)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(224, 82, 151, 0.2)', color: '#f472b6', padding: '4px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 800, marginBottom: '12px' }}>
              <Coffee size={14} /> Freshly Baked & Brewed Daily
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
              Smart Bakery & Coffee
            </h1>
            <p style={{ fontSize: '15px', color: '#f4ede4', maxWidth: '500px' }}>
              Handcrafted brioche donuts, Belgian chocolate cakes, butter cookies, and freshly ground Arabica espresso.
            </p>
          </div>

          {/* Quick Pre-order Cake Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '18px',
            padding: '20px 24px',
            minWidth: '280px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#fcd34d', textTransform: 'uppercase', marginBottom: '4px' }}>Custom Cake Pre-Order</div>
            <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>Customize Your Dream Cake</div>
            <button className="btn btn-rose btn-sm" style={{ width: '100%' }}>
              <Gift size={14} /> Order Custom Cake
            </button>
          </div>
        </div>

        {/* Subcategory Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {subCategories.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              style={{
                background: selectedSub === sub ? '#e05297' : '#ffffff',
                color: selectedSub === sub ? '#ffffff' : '#3d2314',
                border: '1px solid rgba(61, 35, 20, 0.1)',
                borderRadius: '9999px',
                padding: '9px 22px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedSub === sub ? '0 4px 14px rgba(224, 82, 151, 0.3)' : '0 2px 6px rgba(61, 35, 20, 0.03)'
              }}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Bakery Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {filteredItems.map(item => {
            const itemId = item.id || item._id;
            const isAdded = addedId === itemId;
            const imageUrl = item.images?.[0]?.url || 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800';

            return (
              <div
                key={itemId}
                onClick={() => onSelectProduct?.(item)}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid rgba(61, 35, 20, 0.08)',
                  boxShadow: '0 6px 20px rgba(61, 35, 20, 0.05)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#e05297';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(61, 35, 20, 0.08)';
                }}
              >
                {/* Item Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img src={imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#3d2314', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px' }}>
                    {item.subCategory}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    <Star size={13} fill="#fbbf24" color="#fbbf24" />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#3d2314' }}>{(item.averageRating || 4.9).toFixed(1)}</span>
                    <span style={{ fontSize: '11px', color: '#9e8c80' }}>({item.reviewCount || 150})</span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3d2314', marginBottom: '8px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: '#6e5849', marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.shortDescription || item.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(61, 35, 20, 0.08)' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#3d2314' }}>
                      ৳ {item.price?.toLocaleString()}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className={isAdded ? 'btn btn-secondary btn-sm' : 'btn btn-rose btn-sm'}
                      style={{
                        background: isAdded ? '#ecfdf5' : undefined,
                        color: isAdded ? '#059669' : undefined
                      }}
                    >
                      {isAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                      <span>{isAdded ? 'Added!' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
