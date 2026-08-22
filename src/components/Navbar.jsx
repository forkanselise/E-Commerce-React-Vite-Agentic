import React from 'react';
import { ShoppingBag, Bot, Users, Sparkles, User, ShieldAlert, BookOpen, Layers, Coffee, PhoneCall, Award, Truck, ShieldCheck, Heart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useVisitorStore } from '../stores/visitorStore';
import { useAiDrawerStore } from '../stores/aiDrawerStore';
import { useAuthStore } from '../stores/authStore';

export function Navbar({ activeTab, setActiveTab }) {
  const { getTotalItemCount, openCart } = useCartStore();
  const { liveVisitors } = useVisitorStore();
  const { toggleDrawer, isOpen: isAiOpen } = useAiDrawerStore();
  const { user, isAuthenticated, openAuthModal, logout } = useAuthStore();

  const cartCount = getTotalItemCount();

  return (
    <header className="sticky top-0 z-40 w-full" style={{ background: '#ffffff', borderBottom: '1px solid rgba(61, 35, 20, 0.1)', boxShadow: '0 2px 10px rgba(61, 35, 20, 0.04)' }}>
      
      {/* Top Announcement Bar (Matching Buttercup Mockup Header) */}
      <div style={{ background: '#3d2314', color: '#fdfbf7', padding: '6px 24px', fontSize: '12px', fontWeight: 500 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={13} color="#e05297" fill="#e05297" />
            <span style={{ fontWeight: 600, color: '#f472b6' }}>Bake • Learn • Inspire</span>
            <span style={{ opacity: 0.7, marginLeft: '8px' }}>| One stop destination for Baking Ingredients, Tools, Packaging, Bakery & Coffee and Professional Baking Classes</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', opacity: 0.9 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Award size={12} color="#fbbf24" /> Premium Quality Products
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={12} color="#34d399" /> Trusted by 60,000+ Bakers
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck size={12} color="#22d3ee" /> Fast & Safe Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo (Smart Bakery Hub) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #e05297 0%, #3d2314 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 14px rgba(224, 82, 151, 0.3)'
          }}>
            🧁
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: '#3d2314', fontFamily: 'var(--font-heading)' }}>
                Smart Bakery
              </span>
              <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', background: '#3d2314', color: '#fcd34d', borderRadius: '6px', letterSpacing: '0.05em' }}>
                HUB
              </span>
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#e05297', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              BAKERY • SUPPLY • ACADEMY
            </div>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#faf6f0', padding: '4px', borderRadius: '12px', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
          
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: activeTab === 'home' ? '#ffffff' : 'transparent',
              color: activeTab === 'home' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'home' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={14} /> Home
          </button>

          <button
            onClick={() => setActiveTab('store')}
            style={{
              background: activeTab === 'store' ? '#ffffff' : 'transparent',
              color: activeTab === 'store' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'store' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={14} /> Shop
          </button>

          <button
            onClick={() => setActiveTab('bakery')}
            style={{
              background: activeTab === 'bakery' ? '#ffffff' : 'transparent',
              color: activeTab === 'bakery' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'bakery' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Coffee size={14} /> Bakery & Coffee
          </button>

          <button
            onClick={() => setActiveTab('masterclass')}
            style={{
              background: activeTab === 'masterclass' ? '#ffffff' : 'transparent',
              color: activeTab === 'masterclass' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'masterclass' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={14} /> Academy
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            style={{
              background: activeTab === 'blog' ? '#ffffff' : 'transparent',
              color: activeTab === 'blog' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'blog' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={14} /> Blog / Recipes
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            style={{
              background: activeTab === 'contact' ? '#ffffff' : 'transparent',
              color: activeTab === 'contact' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'contact' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <PhoneCall size={14} /> Contact
          </button>

          {/* Admin Warehouse Tab */}
          {(user?.role === 'Admin' || user?.role === 'SystemAdmin') && (
            <button
              onClick={() => setActiveTab('warehouse')}
              style={{
                background: activeTab === 'warehouse' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                color: activeTab === 'warehouse' ? '#dc2626' : '#6e5849',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: 'none'
              }}
            >
              <ShieldAlert size={14} /> Warehouse Admin
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Live Visitor Badge */}
          <div className="badge" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857' }} title="Connected Live via ASP.NET Core SignalR">
            <span className="pulse-dot"></span>
            <Users size={12} />
            <span>{liveVisitors} Online</span>
          </div>

          {/* AI Concierge Drawer Trigger */}
          <button
            onClick={toggleDrawer}
            className="btn btn-secondary btn-sm"
            style={{
              background: isAiOpen ? '#fdf2f8' : '#ffffff',
              borderColor: isAiOpen ? '#e05297' : 'rgba(61, 35, 20, 0.15)',
              color: isAiOpen ? '#e05297' : '#3d2314'
            }}
          >
            <Bot size={15} color="#e05297" />
            <span>AI Concierge</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="btn btn-rose btn-sm"
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={15} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#3d2314',
                color: '#ffffff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth Trigger */}
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={user.fullName}
                style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #e05297', objectFit: 'cover' }}
              />
              <button
                onClick={logout}
                style={{ background: 'transparent', border: 'none', color: '#9e8c80', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="btn btn-secondary btn-sm"
            >
              <User size={14} />
              <span>Sign In</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
