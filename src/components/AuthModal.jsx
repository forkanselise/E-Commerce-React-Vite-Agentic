import React, { useState } from 'react';
import { X, Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import logoImg from '../assets/Picture2.png';

export function AuthModal() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const { isAuthModalOpen, closeAuthModal, login, register, isLoading, error } = useAuthStore();

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'register') {
      if (!fullName.trim() || !email.trim() || !password.trim()) return;
      const res = await register(fullName, email, password);
      if (res.success) {
        setEmail('');
        setPassword('');
        setFullName('');
      }
    } else {
      if (!email.trim() || !password.trim()) return;
      const res = await login(email, password);
      if (res.success) {
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(61, 35, 20, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }} onClick={closeAuthModal}>
      
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '36px',
          position: 'relative',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 12px 35px rgba(61, 35, 20, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#faf6f0',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#3d2314'
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src={logoImg}
            alt="Buttercup Logo"
            style={{ height: '64px', width: 'auto', maxHeight: '64px', objectFit: 'contain', margin: '0 auto 10px auto' }}
          />
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#3d2314', fontFamily: 'var(--font-heading)' }}>
            {activeTab === 'login' ? 'Sign In to Buttercup' : 'Create Buttercup Account'}
          </h3>
          <p style={{ fontSize: '13px', color: '#6e5849', marginTop: '4px' }}>
            {activeTab === 'login' ? 'Enter your credentials to access your account' : 'Fill in your details below to register'}
          </p>
        </div>

        {/* Error Alert Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            color: '#dc2626',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3d2314', marginBottom: '6px' }}>Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9e8c80' }} />
                <input
                  type="text"
                  placeholder="e.g. Chef Sarah Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '12px', padding: '11px 14px 11px 38px', fontSize: '14px', color: '#3d2314', outline: 'none' }}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3d2314', marginBottom: '6px' }}>Email Address *</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9e8c80' }} />
              <input
                type="email"
                placeholder="baker@smartbakery.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '12px', padding: '11px 14px 11px 38px', fontSize: '14px', color: '#3d2314', outline: 'none' }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3d2314', marginBottom: '6px' }}>Password *</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9e8c80' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '12px', padding: '11px 14px 11px 38px', fontSize: '14px', color: '#3d2314', outline: 'none' }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-rose"
            style={{ width: '100%', padding: '13px', marginTop: '6px', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>{activeTab === 'login' ? 'Signing In...' : 'Registering Account...'}</span>
              </>
            ) : (
              <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Tab Switcher Link */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6e5849' }}>
          {activeTab === 'login' ? (
            <span>Don't have an account? <a href="#register" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }} style={{ color: '#e05297', fontWeight: 800 }}>Sign up now</a></span>
          ) : (
            <span>Already have an account? <a href="#login" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }} style={{ color: '#e05297', fontWeight: 800 }}>Log in here</a></span>
          )}
        </div>

      </div>

    </div>
  );
}

export default AuthModal;
