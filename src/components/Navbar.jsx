import React from 'react';
import { ShoppingBag, Bot, Users, Sparkles, User, ShieldAlert, BookOpen, Layers, Smartphone } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
          }}>
            🥐
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>NEXUS BAKERY</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', background: 'rgba(34, 211, 238, 0.15)', color: '#22D3EE', borderRadius: '4px', border: '1px solid rgba(34, 211, 238, 0.3)' }}>& TECH</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Artisan Goods • Precision Gear • Masterclasses</div>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: activeTab === 'home' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeTab === 'home' ? 'var(--color-amber-400)' : 'var(--text-secondary)',
              border: activeTab === 'home' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} /> Home
          </button>

          <button
            onClick={() => setActiveTab('store')}
            style={{
              background: activeTab === 'store' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeTab === 'store' ? 'var(--color-amber-400)' : 'var(--text-secondary)',
              border: activeTab === 'store' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layers size={14} /> Store Catalog
          </button>

          <button
            onClick={() => setActiveTab('masterclass')}
            style={{
              background: activeTab === 'masterclass' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeTab === 'masterclass' ? 'var(--color-amber-400)' : 'var(--text-secondary)',
              border: activeTab === 'masterclass' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={14} /> Masterclass Hub
          </button>

          {/* Mobile Phones Tab */}
          <button
            onClick={() => setActiveTab('mobiles')}
            style={{
              background: activeTab === 'mobiles' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeTab === 'mobiles' ? 'var(--color-cyan-400)' : 'var(--text-secondary)',
              border: activeTab === 'mobiles' ? '1px solid rgba(34, 211, 238, 0.3)' : '1px solid transparent',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Smartphone size={14} /> Mobile Phones
          </button>

          {/* Admin Warehouse Tab */}
          {(user?.role === 'Admin' || user?.role === 'SystemAdmin') && (
            <button
              onClick={() => setActiveTab('warehouse')}
              style={{
                background: activeTab === 'warehouse' ? 'rgba(251, 113, 133, 0.2)' : 'transparent',
                color: activeTab === 'warehouse' ? '#FB7185' : 'var(--text-secondary)',
                border: activeTab === 'warehouse' ? '1px solid rgba(251, 113, 133, 0.4)' : '1px solid transparent',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldAlert size={14} /> Warehouse Admin
            </button>
          )}
        </nav>

        {/* Right Actions & Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Live Visitor Counter Badge */}
          <div className="badge badge-emerald" title="Real-time connected users via SignalR" style={{ cursor: 'default' }}>
            <span className="pulse-dot"></span>
            <Users size={13} />
            <span>{liveVisitors} Live Now</span>
          </div>

          {/* AI Drawer Floating Trigger Button */}
          <button
            onClick={toggleDrawer}
            className="btn btn-secondary btn-sm"
            style={{
              background: isAiOpen ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              borderColor: isAiOpen ? 'var(--color-amber-500)' : 'var(--glass-border)',
              color: isAiOpen ? 'var(--color-amber-400)' : 'var(--text-primary)'
            }}
          >
            <Bot size={15} color="#F59E0B" />
            <span>Ask Concierge</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="btn btn-primary btn-sm"
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={15} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#EF4444',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth Profile Trigger */}
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={user.fullName}
                style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid var(--color-amber-500)', objectFit: 'cover' }}
              />
              <button
                onClick={logout}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
                title="Log out"
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
