import React, { useState } from 'react';
import { Bot, Heart, Award, ShieldCheck, ShoppingBag, BookOpen, ChevronDown, Sparkles, Check } from 'lucide-react';
import { useAiDrawerStore } from '../stores/aiDrawerStore';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

export function HeroSection({ setActiveTab, onSelectCategoryFilter }) {
  const { openDrawer } = useAiDrawerStore();
  const { addItem } = useCartStore();
  const { isAuthenticated, openAuthModal } = useAuthStore();

  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const [showJoinDropdown, setShowJoinDropdown] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 8 Specific Categories from Stage-04 of PDF
  const categories = [
    { id: 'Ingredients', label: 'Ingredients', icon: '🥛', count: '120+ Items' },
    { id: 'Chocolate', label: 'Chocolate', icon: '🍫', count: '45+ Items' },
    { id: 'Tools', label: 'Tools', icon: '🥣', count: '80+ Items' },
    { id: 'Moulds', label: 'Moulds', icon: '🧁', count: '65+ Items' },
    { id: 'Packaging', label: 'Packaging', icon: '📦', count: '90+ Items' },
    { id: 'Decorations', label: 'Decorations', icon: '✨', count: '50+ Items' },
    { id: 'Flavours', label: 'Flavours', icon: '🍓', count: '40+ Items' },
    { id: 'Nuts & Seeds', label: 'Nuts & Seeds', icon: '🥜', count: '35+ Items' }
  ];

  // Signature Product data
  const signatureItem = {
    id: 'sig-gateau-001',
    name: 'Belgian Dark Chocolate Ganache Gateau',
    price: 1850,
    regularPrice: 2200,
    features: ['100% Belgian Cocoa', 'Fresh Daily Bake', 'Artisanal Hand-crafted'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000'
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleOrderSignatureItem = () => {
    addItem({
      id: signatureItem.id,
      name: signatureItem.name,
      price: signatureItem.price,
      imageUrl: signatureItem.imageUrl,
      category: 'Bakery'
    });
    if (!isAuthenticated) {
      openAuthModal();
    }
  };

  const handleCategoryClick = (catId) => {
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(catId);
    }
    setActiveTab('store');
  };

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 0 60px 0',
      background: 'radial-gradient(circle at 10% 20%, rgba(254, 243, 199, 0.4) 0%, rgba(253, 242, 248, 0.6) 50%, #faf6f0 100%)'
    }}>
      {/* Background Animated Blurry Bokeh Spheres */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224, 82, 151, 0.15) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '-50px',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(252, 211, 77, 0.2) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Main Stage-03 Grid */}
        <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          
          {/* Left Adjust: Stage-03 Hero Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: '#fdf2f8', border: '1px solid #f472b6', marginBottom: '20px' }}>
              <Heart size={14} color="#e05297" fill="#e05297" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#e05297' }}>Bake • Make • Learn</span>
            </div>

            <h1 style={{ fontSize: '44px', lineHeight: 1.18, fontWeight: 800, color: '#3d2314', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>
              Everything You Need to Bake, Learn & Indulge — <br />
              <span style={{ color: '#e05297', background: 'linear-gradient(135deg, #e05297 0%, #3d2314 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                All Under One Roof!
              </span>
            </h1>

            <p style={{ fontSize: '16px', color: '#6e5849', lineHeight: 1.65, marginBottom: '32px', maxWidth: '560px' }}>
              Welcome to <strong>Butter Cup</strong>, your ultimate destination for artisanal cakes, premium baking supplies, and professional baking masterclasses. Whether you're craving a rich decadent treat or stocking up on top tier ingredients for your next creation, we’ve got you covered.
            </p>

            {/* Stage-03 Call-to-Action (CTA) Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
              
              {/* ORDER NOW Dropdown Button */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowOrderDropdown(!showOrderDropdown)}
                  className="btn btn-rose"
                  style={{ padding: '14px 26px', fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <ShoppingBag size={18} />
                  <span>ORDER NOW</span>
                  <ChevronDown size={14} style={{ transform: showOrderDropdown ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>

                {showOrderDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '210px',
                    background: '#ffffff',
                    borderRadius: '14px',
                    boxShadow: '0 12px 35px rgba(61, 35, 20, 0.18)',
                    border: '1px solid rgba(61, 35, 20, 0.1)',
                    padding: '8px',
                    zIndex: 100
                  }}>
                    <button
                      onClick={() => { setShowOrderDropdown(false); setActiveTab('bakery'); }}
                      style={{ width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: '14px', fontWeight: 700, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      🍰 Our Bakes Page
                    </button>
                    <button
                      onClick={() => { setShowOrderDropdown(false); setActiveTab('store'); }}
                      style={{ width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: '14px', fontWeight: 700, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      🥣 Try Your Home Page
                    </button>
                  </div>
                )}
              </div>

              {/* JOIN CLASS Dropdown Button */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowJoinDropdown(!showJoinDropdown)}
                  className="btn btn-dark"
                  style={{ padding: '14px 26px', fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <BookOpen size={18} />
                  <span>JOIN CLASS</span>
                  <ChevronDown size={14} style={{ transform: showJoinDropdown ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>

                {showJoinDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '210px',
                    background: '#ffffff',
                    borderRadius: '14px',
                    boxShadow: '0 12px 35px rgba(61, 35, 20, 0.18)',
                    border: '1px solid rgba(61, 35, 20, 0.1)',
                    padding: '8px',
                    zIndex: 100
                  }}>
                    <button
                      onClick={() => { setShowJoinDropdown(false); setActiveTab('masterclass'); }}
                      style={{ width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: '14px', fontWeight: 700, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      🎓 Academy Learning Page
                    </button>
                  </div>
                )}
              </div>

              {/* Mr. Butter AI Agent Link */}
              <button
                onClick={openDrawer}
                className="btn btn-secondary"
                style={{ padding: '13px 20px', fontSize: '14px', fontWeight: 700, borderColor: '#e05297', color: '#e05297', background: '#ffffff' }}
              >
                <Bot size={18} color="#e05297" />
                <span>Mr. Butter</span>
              </button>

            </div>

            {/* Bottom Badges matching Stage-03 PDF */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: '#6e5849', fontWeight: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="#e05297" /> 100% Original Product
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#34d399" /> Secure Your Desired Items
              </div>
            </div>
          </div>

          {/* Right Adjust: 3D Motion Signature Item Showcase Card */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <div style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '16px',
              border: '1px solid rgba(61, 35, 20, 0.1)',
              boxShadow: '0 20px 45px rgba(61, 35, 20, 0.12)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Badge: Fresh Daily Bake */}
              <div style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
                zIndex: 10,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '9999px',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Fresh Daily Bake
              </div>

              <div style={{ overflow: 'hidden', borderRadius: '20px', position: 'relative' }}>
                <img
                  src={signatureItem.imageUrl}
                  alt={signatureItem.name}
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    transition: 'transform 0.5s ease'
                  }}
                />
              </div>

              {/* Floating Signature Item Detail Box */}
              <div style={{
                marginTop: '16px',
                background: 'linear-gradient(135deg, #3d2314 0%, #2a170d 100%)',
                borderRadius: '20px',
                padding: '20px 24px',
                color: '#ffffff'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Signature Item
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                  {signatureItem.name}
                </h3>

                {/* Features list */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {signatureItem.features.map((feat, idx) => (
                    <span key={idx} style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.12)', color: '#f4ede4', padding: '3px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={10} color="#fcd34d" /> {feat}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 800, color: '#fcd34d' }}>৳ {signatureItem.price}</span>
                      <span style={{ fontSize: '14px', textDecoration: 'line-through', opacity: 0.6 }}>৳ {signatureItem.regularPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleOrderSignatureItem}
                    className="btn btn-rose"
                    style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 800 }}
                  >
                    Order Now →
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stage-04: Landing Page - Part 1 - Category Page */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#3d2314', fontFamily: 'var(--font-heading)' }}>
                Shop by Category
              </h2>
              <p style={{ fontSize: '13px', color: '#6e5849', marginTop: '2px' }}>
                Browse our complete selection of artisanal baking supplies & coffee gear
              </p>
            </div>
            <button
              onClick={() => setActiveTab('store')}
              style={{ background: 'none', border: 'none', color: '#e05297', fontWeight: 800, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              View All →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
            {categories.map((c) => (
              <div
                key={c.id}
                onClick={() => handleCategoryClick(c.id)}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(61, 35, 20, 0.08)',
                  borderRadius: '18px',
                  padding: '20px 14px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 14px rgba(61, 35, 20, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#e05297';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(224, 82, 151, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(61, 35, 20, 0.08)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(61, 35, 20, 0.04)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{c.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#3d2314', marginBottom: '2px' }}>{c.label}</div>
                <div style={{ fontSize: '11px', color: '#9e8c80', fontWeight: 600 }}>{c.count}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
