import React from 'react';
import { ArrowRight, Bot, Sparkles, Play, ShieldCheck, Flame, Cpu } from 'lucide-react';
import { useAiDrawerStore } from '../stores/aiDrawerStore';

export function HeroSection({ setActiveTab }) {
  const { openDrawer } = useAiDrawerStore();

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '60px 0 80px 0' }}>
      
      {/* Subtle background glow orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '25%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column Text & CTA */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '20px' }}>
              <Sparkles size={14} color="#F59E0B" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-amber-400)' }}>Artisan Pastry Meets Precision Engineering</span>
            </div>

            <h1 style={{ fontSize: '48px', lineHeight: 1.15, fontWeight: 800, marginBottom: '20px' }}>
              Where Slow Fermentation <br />
              <span className="gradient-text-amber">Meets Digital Precision.</span>
            </h1>

            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '540px' }}>
              Explore hand-crafted 36-hour wild sourdoughs, French pastry lamination kits, and precision culinary electronics. Stream our multi-chapter video masterclasses taught by master bakers.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('store')}
                className="btn btn-primary"
                style={{ padding: '12px 24px', fontSize: '15px' }}
              >
                <span>Browse Store Catalog</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('masterclass')}
                className="btn btn-secondary"
                style={{ padding: '12px 24px', fontSize: '15px' }}
              >
                <Play size={16} color="#F59E0B" />
                <span>Watch Masterclasses</span>
              </button>

              <button
                onClick={openDrawer}
                className="btn btn-secondary"
                style={{ padding: '12px 20px', fontSize: '14px', borderColor: 'rgba(34, 211, 238, 0.3)', color: '#22D3EE' }}
              >
                <Bot size={16} color="#22D3EE" />
                <span>Ask AI Agent</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={20} color="#F59E0B" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Stone Baked Daily</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>10-Year Mother Starter</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Cpu size={20} color="#22D3EE" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Precision Gear</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>0.1g Digital Calibration</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#34D399" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Multi-Agent Support</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Live Cart & Tech Assistance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Featured Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '14px', position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000"
                alt="Artisan Sourdough and Bakery Goods"
                style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: '14px' }}
              />

              {/* Floating Highlight Card Over Image */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                background: 'rgba(17, 20, 29, 0.88)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-amber-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chef's Masterpiece</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>San Francisco Sourdough Boule (850g)</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>36h cold ferment • 380 BDT</div>
                </div>

                <button
                  onClick={() => setActiveTab('store')}
                  className="btn btn-primary btn-sm"
                >
                  Order Fresh
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
