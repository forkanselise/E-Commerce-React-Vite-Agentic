import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, Sparkles } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function AuthModal() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const { isAuthModalOpen, closeAuthModal, setAuth, loginDemo } = useAuthStore();

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockUser = {
      id: 'usr_' + Date.now(),
      fullName: fullName || email.split('@')[0] || 'Artisan Baker',
      email: email,
      role: 'User',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    };
    setAuth(mockUser, 'jwt_token_' + Date.now());
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }} onClick={closeAuthModal}>
      
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '32px',
          position: 'relative',
          background: 'var(--bg-surface)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥐</div>
          <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Welcome to Nexus Bakery</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sign in to manage orders, subscriptions & masterclasses</p>
        </div>

        {/* 1-Click Fast Demo Role Switcher */}
        <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-amber-400)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} />
            <span>1-Click Fast Evaluation Switcher:</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            <button
              onClick={() => loginDemo('User')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', padding: '6px 8px' }}
            >
              🥖 User
            </button>

            <button
              onClick={() => loginDemo('Admin')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', padding: '6px 8px', color: '#FB7185', borderColor: 'rgba(251, 113, 133, 0.3)' }}
            >
              👨‍🍳 Admin
            </button>

            <button
              onClick={() => loginDemo('SystemAdmin')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', padding: '6px 8px', color: '#22D3EE', borderColor: 'rgba(34, 211, 238, 0.3)' }}
            >
              👑 SysAdmin
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {activeTab === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                placeholder="Chef Sarah"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
                required
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email Address</label>
            <input
              type="email"
              placeholder="baker@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '6px' }}>
            {activeTab === 'login' ? 'Sign In to Account' : 'Create Account'}
          </button>
        </form>

        {/* Tab Toggle */}
        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          {activeTab === 'login' ? (
            <span>Don't have an account? <a href="#register" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }} style={{ color: 'var(--color-amber-400)', fontWeight: 600 }}>Sign up</a></span>
          ) : (
            <span>Already registered? <a href="#login" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }} style={{ color: 'var(--color-amber-400)', fontWeight: 600 }}>Log in</a></span>
          )}
        </div>

      </div>

    </div>
  );
}
