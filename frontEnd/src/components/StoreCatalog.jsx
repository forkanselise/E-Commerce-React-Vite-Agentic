import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Star, Eye, Check, SlidersHorizontal } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { INITIAL_PRODUCTS } from '../services/api';

export function StoreCatalog({ onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedProductId, setAddedProductId] = useState(null);

  const { addItem } = useCartStore();

  const categories = [
    { id: 'All', label: 'All Items' },
    { id: 'Bakery', label: '🥐 Artisan Bakery' },
    { id: 'BakingTools', label: '🥣 Baking Tools' },
    { id: 'Electronics', label: '⚡ Kitchen Electronics' }
  ];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => {
      // Category match
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Search match
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(term);
        const matchesDesc = p.description.toLowerCase().includes(term);
        const matchesTag = p.tags.some(t => t.toLowerCase().includes(term));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }

      // Price match
      if (p.price > maxPrice) return false;

      // In stock match
      if (inStockOnly && p.warehouseStock <= 0) return false;

      return true;
    });
  }, [selectedCategory, searchTerm, maxPrice, inStockOnly]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px' }}>
      
      {/* Header & Filter Controls */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Store Catalog</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Showing {filteredProducts.length} premium products ready for delivery</p>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search sourdough, stand mixers, mats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '10px 14px 10px 38px',
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Category Pills & Secondary Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                style={{
                  background: selectedCategory === c.id ? 'var(--color-amber-500)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === c.id ? '#111' : 'var(--text-primary)',
                  border: selectedCategory === c.id ? '1px solid var(--color-amber-500)' : '1px solid var(--glass-border)',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Price Slider & In-Stock Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--glass-bg)', padding: '6px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={14} color="var(--text-muted)" />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Max: {maxPrice.toLocaleString()} BDT</span>
              <input
                type="range"
                min="300"
                max="20000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: 'var(--color-amber-500)', cursor: 'pointer', width: '90px' }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ accentColor: 'var(--color-amber-500)' }}
              />
              In Stock Only
            </label>
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredProducts.map(product => {
          const isLowStock = product.warehouseStock > 0 && product.warehouseStock <= 10;
          const isJustAdded = addedProductId === product.id;

          return (
            <div
              key={product.id}
              className="glass-card glass-card-interactive"
              onClick={() => onSelectProduct(product)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
              {/* Product Image Box */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#181d2a' }}>
                <img
                  src={product.images[0]?.url}
                  alt={product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                />

                {/* Badges on Image */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  {product.category === 'Electronics' && (
                    <span className="badge badge-cyan">⚡ Precision Tech</span>
                  )}
                  {product.category === 'Bakery' && (
                    <span className="badge badge-amber">🥐 Freshly Baked</span>
                  )}
                </div>

                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  {product.warehouseStock > 0 ? (
                    isLowStock ? (
                      <span className="badge badge-rose">Only {product.warehouseStock} Left</span>
                    ) : (
                      <span className="badge badge-emerald">In Stock</span>
                    )
                  ) : (
                    <span className="badge badge-rose">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Product Info Content */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                {/* Rating & Reviews */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-amber-400)' }}>{product.averageRating.toFixed(1)}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                  {product.title}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.shortDescription}
                </p>

                {/* Price & Action Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--glass-border)' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-amber-400)' }}>
                      ৳ {product.price.toLocaleString()}
                    </div>
                    {product.compareAtPrice && (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ৳ {product.compareAtPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={isJustAdded ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm'}
                    style={{
                      background: isJustAdded ? 'rgba(52, 211, 153, 0.2)' : undefined,
                      borderColor: isJustAdded ? '#34D399' : undefined,
                      color: isJustAdded ? '#34D399' : undefined
                    }}
                  >
                    {isJustAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                    <span>{isJustAdded ? 'Added!' : 'Add'}</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
