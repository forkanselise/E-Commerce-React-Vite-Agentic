import React from 'react';
import { ArrowRight, Bot, Sparkles, Play, Heart, Award, ShieldCheck, ShoppingBag, BookOpen } from 'lucide-react';
import { useAiDrawerStore } from '../stores/aiDrawerStore';

export function HeroSection({ setActiveTab }) {
  const { openDrawer } = useAiDrawerStore();

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

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '40px 0 60px 0', background: 'linear-gradient(180deg, #fdfbf7 0%, #faf6f0 100%)' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Main Hero Banner Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center', marginBottom: '50px' }}>
          
          {/* Left Hero Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: '#fdf2f8', border: '1px solid #f472b6', marginBottom: '20px' }}>
              <Heart size={14} color="#e05297" fill="#e05297" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#e05297' }}>Bake • Learn • Inspire</span>
            </div>

            <h1 style={{ fontSize: '46px', lineHeight: 1.15, fontWeight: 800, color: '#3d2314', marginBottom: '18px', fontFamily: 'var(--font-heading)' }}>
              Smart Bakery Hub <br />
              <span style={{ color: '#e05297' }}>Bakery, Baking Supplies & Classes</span> <br />
              All In One Place
            </h1>

            <p style={{ fontSize: '16px', color: '#6e5849', lineHeight: 1.6, marginBottom: '28px', maxWidth: '540px' }}>
              One stop destination for premium baking ingredients (Callebaut, Anchor), professional tools, bakery packaging, fresh cakes, donuts, coffee, and certified masterclass baking courses.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button
                onClick={() => setActiveTab('store')}
                className="btn btn-rose"
                style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 800 }}
              >
                <ShoppingBag size={18} />
                <span>SHOP NOW</span>
              </button>

              <button
                onClick={() => setActiveTab('masterclass')}
                className="btn btn-dark"
                style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 800 }}
              >
                <BookOpen size={18} />
                <span>JOIN CLASS</span>
              </button>

              <button
                onClick={openDrawer}
                className="btn btn-secondary"
                style={{ padding: '13px 20px', fontSize: '14px', borderColor: '#e05297', color: '#e05297' }}
              >
                <Bot size={16} color="#e05297" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#6e5849', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#e05297" /> 100% Original Products
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#34d399" /> Secure Payment (bKash, Nagad, Card)
              </div>
            </div>
          </div>

          {/* Right Hero Showcase Visual */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '12px', background: '#ffffff', borderRadius: '24px', boxShadow: '0 12px 35px rgba(61, 35, 20, 0.1)' }}>
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000"
                alt="Smart Bakery Chocolate Cake & Pastries"
                style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '18px' }}
              />

              {/* Floating Highlight Banner */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                background: 'rgba(61, 35, 20, 0.92)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '16px 20px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Featured Artisan Cake</div>
                  <div style={{ fontSize: '16px', fontWeight: 800 }}>Belgian Dark Chocolate Ganache Gateau</div>
                  <div style={{ fontSize: '13px', opacity: 0.85 }}>৳ 1,850 • Fresh Daily Baked</div>
                </div>

                <button
                  onClick={() => setActiveTab('store')}
                  className="btn btn-rose btn-sm"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Shop By Category Banner (Matching Mockup Section 1) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#3d2314' }}>Shop by Category</h2>
            <button onClick={() => setActiveTab('store')} style={{ background: 'none', border: 'none', color: '#e05297', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>
              View All →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '14px' }}>
            {categories.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveTab('store')}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(61, 35, 20, 0.08)',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(61, 35, 20, 0.04)'
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
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{c.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#3d2314', marginBottom: '2px' }}>{c.label}</div>
                <div style={{ fontSize: '11px', color: '#9e8c80' }}>{c.count}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
