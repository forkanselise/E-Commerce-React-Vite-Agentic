import React, { useState } from 'react';
import { X, Award, ShieldCheck, Heart, Camera, Video, Sparkles, CheckCircle2, FileText, Coffee, Package, Users } from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export function AboutModal({ isOpen, onClose, initialTab = 'about' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'about' | 'services' | 'gallery' | 'license'

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(26, 15, 10, 0.65)',
      backdropFilter: 'blur(8px)',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '850px',
        maxHeight: '90vh',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(61, 35, 20, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(61, 35, 20, 0.1)'
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #3d2314 0%, #2a170d 100%)',
          color: '#ffffff',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#fcd34d', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Buttercup • Bakery & Tech
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
              About Buttercup
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#ffffff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(61, 35, 20, 0.08)', background: '#faf6f0', padding: '0 24px' }}>
          <button
            onClick={() => setActiveTab('about')}
            style={{
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'about' ? '#e05297' : '#6e5849',
              borderBottom: activeTab === 'about' ? '3px solid #e05297' : '3px solid transparent',
              cursor: 'pointer'
            }}
          >
            About Us
          </button>
          <button
            onClick={() => setActiveTab('services')}
            style={{
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'services' ? '#e05297' : '#6e5849',
              borderBottom: activeTab === 'services' ? '3px solid #e05297' : '3px solid transparent',
              cursor: 'pointer'
            }}
          >
            Our Services
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'gallery' ? '#e05297' : '#6e5849',
              borderBottom: activeTab === 'gallery' ? '3px solid #e05297' : '3px solid transparent',
              cursor: 'pointer'
            }}
          >
            Get In Touch (Gallery & Clips)
          </button>
          <button
            onClick={() => setActiveTab('license')}
            style={{
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'license' ? '#e05297' : '#6e5849',
              borderBottom: activeTab === 'license' ? '3px solid #e05297' : '3px solid transparent',
              cursor: 'pointer'
            }}
          >
            License & Certification
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', background: '#ffffff' }}>
          
          {activeTab === 'about' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={logoImg}
                  alt="Buttercup Logo"
                  style={{ height: '58px', width: 'auto', maxHeight: '58px', objectFit: 'contain' }}
                />
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#3d2314' }}>Welcome to Buttercup</h3>
                  <p style={{ fontSize: '13px', color: '#e05297', fontWeight: 600 }}>Artisanal Bakery • Professional Baking Supplies • Masterclass Academy</p>
                </div>
              </div>

              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#554236' }}>
                Buttercup is your ultimate destination for everything artisanal baking and high-grade baking tech.
                Whether you are a home baker crafting weekend treats or a commercial bakery owner sourcing premium chocolate (Callebaut, Valrhona), dairy (Anchor, Elle & Vire), or professional deck ovens, we provide end-to-end support with guaranteed origin quality.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '10px' }}>
                <div style={{ background: '#faf6f0', padding: '18px', borderRadius: '16px', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
                  <Award size={22} color="#e05297" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#3d2314' }}>60,000+ Bakers</div>
                  <div style={{ fontSize: '12px', color: '#6e5849', marginTop: '4px' }}>Trusted community across Bangladesh and beyond.</div>
                </div>

                <div style={{ background: '#faf6f0', padding: '18px', borderRadius: '16px', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
                  <ShieldCheck size={22} color="#34d399" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#3d2314' }}>100% Original</div>
                  <div style={{ fontSize: '12px', color: '#6e5849', marginTop: '4px' }}>Directly imported certified ingredients and tools.</div>
                </div>

                <div style={{ background: '#faf6f0', padding: '18px', borderRadius: '16px', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
                  <Sparkles size={22} color="#fbbf24" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#3d2314' }}>AI Concierge</div>
                  <div style={{ fontSize: '12px', color: '#6e5849', marginTop: '4px' }}>Mr. Butter AI assistant powered by Multi-Agent technology.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#3d2314' }}>Our Core Services</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                
                <div style={{ border: '1px solid rgba(61, 35, 20, 0.1)', padding: '20px', borderRadius: '16px' }}>
                  <Coffee size={24} color="#e05297" style={{ marginBottom: '10px' }} />
                  <h4 style={{ fontWeight: 800, fontSize: '16px', color: '#3d2314', marginBottom: '6px' }}>Artisanal Bakery & Coffee</h4>
                  <p style={{ fontSize: '13px', color: '#6e5849', lineHeight: 1.5 }}>Freshly baked sourdough, Belgian ganache gateau, donuts, croissants, and specialty roasted espresso drinks.</p>
                </div>

                <div style={{ border: '1px solid rgba(61, 35, 20, 0.1)', padding: '20px', borderRadius: '16px' }}>
                  <Package size={24} color="#e05297" style={{ marginBottom: '10px' }} />
                  <h4 style={{ fontWeight: 800, fontSize: '16px', color: '#3d2314', marginBottom: '6px' }}>Corporate & Wholesale Supply</h4>
                  <p style={{ fontSize: '13px', color: '#6e5849', lineHeight: 1.5 }}>Bulk supply of raw ingredients, custom printed bakery packaging boxes, and commercial equipment for cafes.</p>
                </div>

                <div style={{ border: '1px solid rgba(61, 35, 20, 0.1)', padding: '20px', borderRadius: '16px' }}>
                  <Users size={24} color="#e05297" style={{ marginBottom: '10px' }} />
                  <h4 style={{ fontWeight: 800, fontSize: '16px', color: '#3d2314', marginBottom: '6px' }}>Professional Masterclasses</h4>
                  <p style={{ fontSize: '13px', color: '#6e5849', lineHeight: 1.5 }}>Hands-on academy courses taught by pastry chefs with internationally recognized certificates upon completion.</p>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#3d2314' }}>Get In Touch — Photo Gallery & Clips</h3>
                <span style={{ fontSize: '12px', background: '#fdf2f8', color: '#e05297', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>Live Store & Academy</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ borderRadius: '14px', overflow: 'hidden', height: '140px', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600" alt="Bakery Display" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Camera size={11} /> Bakery Front
                  </div>
                </div>

                <div style={{ borderRadius: '14px', overflow: 'hidden', height: '140px', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600" alt="Masterclass Studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Video size={11} /> Academy Studio
                  </div>
                </div>

                <div style={{ borderRadius: '14px', overflow: 'hidden', height: '140px', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600" alt="Artisan Bread" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Camera size={11} /> Dispatch Hub
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'license' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#3d2314' }}>License & Certifications</h3>
              <div style={{ background: '#faf6f0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(61, 35, 20, 0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#059669" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#3d2314' }}>BSTI & Food Hygiene Standard Certified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#059669" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#3d2314' }}>Import & Trade License No: TR-BK-2026-9908</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#059669" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#3d2314' }}>ISO 22000 Food Safety Management System Verified</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AboutModal;
