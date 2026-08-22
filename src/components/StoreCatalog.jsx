import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingBag, Star, Eye, Check, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { fetchProducts } from '../services/api';

export function StoreCatalog({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedProductId, setAddedProductId] = useState(null);

  const { addItem } = useCartStore();

  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadCatalog();
  }, []);

  const categories = [
    { id: 'All', label: 'All Items' },
    { id: 'Ingredients', label: '🥛 Ingredients' },
    { id: 'Chocolate', label: '🍫 Chocolate' },
    { id: 'Tools', label: '🥣 Tools & Mats' },
    { id: 'Packaging', label: '📦 Packaging' },
    { id: 'Bakery & Coffee', label: '🥐 Bakery & Coffee' },
    { id: 'Electronics', label: '⚡ Electronics' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category match
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Chocolate' && p.subCategory !== 'Chocolate' && !p.title.toLowerCase().includes('chocolate')) {
          if (p.category !== 'Ingredients') return false;
        } else if (p.category !== selectedCategory && p.subCategory !== selectedCategory) {
          return false;
        }
      }

      // Search match
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = p.title?.toLowerCase().includes(term);
        const matchesDesc = p.description?.toLowerCase().includes(term);
        const matchesTag = p.tags?.some(t => t.toLowerCase().includes(term));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }

      // Price match
      if (p.price > maxPrice) return false;

      // In stock match
      if (inStockOnly && p.warehouseStock <= 0) return false;

      return true;
    });
  }, [products, selectedCategory, searchTerm, maxPrice, inStockOnly]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedProductId(product.id || product._id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <div style={{ background: '#faf6f0', minHeight: '80vh', padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Header & Search Control Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#e05297', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Smart Bakery Shop</div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#3d2314', fontFamily: 'var(--font-heading)' }}>Product Catalog</h2>
              <p style={{ fontSize: '14px', color: '#6e5849' }}>Showing {filteredProducts.length} premium baking ingredients, supplies & tools</p>
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', minWidth: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9e8c80' }} />
              <input
                type="text"
                placeholder="Search Callebaut, Anchor, Spatulas, Boxes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid rgba(61, 35, 20, 0.15)',
                  borderRadius: '12px',
                  padding: '11px 14px 11px 40px',
                  fontSize: '14px',
                  color: '#3d2314',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(61, 35, 20, 0.04)'
                }}
              />
            </div>
          </div>

          {/* Category Tabs & Filters Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', background: '#ffffff', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(61, 35, 20, 0.08)', boxShadow: '0 4px 14px rgba(61, 35, 20, 0.04)' }}>
            
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  style={{
                    background: selectedCategory === c.id ? '#e05297' : '#faf6f0',
                    color: selectedCategory === c.id ? '#ffffff' : '#3d2314',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedCategory === c.id ? '0 4px 12px rgba(224, 82, 151, 0.3)' : 'none'
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Price Range Slider & Stock Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#faf6f0', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={14} color="#6e5849" />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#6e5849' }}>Max: ৳{maxPrice.toLocaleString()}</span>
                <input
                  type="range"
                  min="100"
                  max="15000"
                  step="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ accentColor: '#e05297', cursor: 'pointer', width: '90px' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#6e5849' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: '#e05297' }}
                />
                In Stock Only
              </label>
            </div>

          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#9e8c80' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🧁</div>
            <div>Loading Smart Bakery Catalog...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#ffffff', borderRadius: '18px', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#3d2314' }}>No products match your search</h3>
            <p style={{ fontSize: '14px', color: '#6e5849' }}>Try resetting category filters or search terms.</p>
          </div>
        ) : (
          /* Products Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
            {filteredProducts.map(product => {
              const productId = product.id || product._id;
              const isLowStock = product.warehouseStock > 0 && product.warehouseStock <= 10;
              const isJustAdded = addedProductId === productId;
              const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800';

              return (
                <div
                  key={productId}
                  className="glass-card"
                  onClick={() => onSelectProduct(product)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid rgba(61, 35, 20, 0.08)',
                    boxShadow: '0 6px 20px rgba(61, 35, 20, 0.05)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(224, 82, 151, 0.15)';
                    e.currentTarget.style.borderColor = '#e05297';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(61, 35, 20, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(61, 35, 20, 0.08)';
                  }}
                >
                  {/* Image Box */}
                  <div style={{ position: 'relative', height: '210px', background: '#fdfaf6', overflow: 'hidden' }}>
                    <img
                      src={imageUrl}
                      alt={product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Stock Status Badge */}
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      {product.warehouseStock > 0 ? (
                        isLowStock ? (
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', background: '#fef2f2', color: '#dc2626', borderRadius: '9999px', border: '1px solid #fecaca' }}>
                            Only {product.warehouseStock} Left
                          </span>
                        ) : (
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', background: '#ecfdf5', color: '#059669', borderRadius: '9999px', border: '1px solid #a7f3d0' }}>
                            In Stock
                          </span>
                        )
                      ) : (
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', background: '#fef2f2', color: '#dc2626', borderRadius: '9999px' }}>
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Content */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    
                    {/* Rating & Category */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#e05297', textTransform: 'uppercase' }}>
                        {product.category}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={13} fill="#fbbf24" color="#fbbf24" />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3d2314' }}>{(product.averageRating || 4.9).toFixed(1)}</span>
                        <span style={{ fontSize: '11px', color: '#9e8c80' }}>({product.reviewCount || 120})</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#3d2314', marginBottom: '8px', lineHeight: 1.35 }}>
                      {product.title}
                    </h3>

                    <p style={{ fontSize: '13px', color: '#6e5849', marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.shortDescription || product.description}
                    </p>

                    {/* Price & Add to Cart */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(61, 35, 20, 0.08)' }}>
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#3d2314' }}>
                          ৳ {product.price?.toLocaleString()}
                        </div>
                        {product.compareAtPrice && (
                          <div style={{ fontSize: '12px', color: '#9e8c80', textDecoration: 'line-through' }}>
                            ৳ {product.compareAtPrice?.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={isJustAdded ? 'btn btn-secondary btn-sm' : 'btn btn-rose btn-sm'}
                        style={{
                          background: isJustAdded ? '#ecfdf5' : undefined,
                          color: isJustAdded ? '#059669' : undefined,
                          borderColor: isJustAdded ? '#a7f3d0' : undefined
                        }}
                      >
                        {isJustAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                        <span>{isJustAdded ? 'Added!' : 'Add to Cart'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
