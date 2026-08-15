import React from 'react';
import { Users, Heart, Bot, ShieldCheck } from 'lucide-react';
import { useVisitorStore } from '../stores/visitorStore';

export function Footer() {
  const { lifetimeVisits, liveVisitors } = useVisitorStore();

  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', padding: '60px 0 30px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>🥐</span>
              <span style={{ fontSize: '18px', fontWeight: 800 }}>NEXUS BAKERY & TECH</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Where artisanal sourdough baking techniques and fine French pastry craftsmanship meet precision culinary tech and digital masterclasses.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--color-amber-400)' }}>
              <Bot size={15} />
              <span>Multi-Agent AI Driven Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Store & Catalog</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><a href="#sourdough" style={{ color: 'inherit' }}>Artisan Sourdoughs</a></li>
              <li><a href="#croissants" style={{ color: 'inherit' }}>French Laminated Pastries</a></li>
              <li><a href="#mixers" style={{ color: 'inherit' }}>Stand Mixers & Scales</a></li>
              <li><a href="#tools" style={{ color: 'inherit' }}>Silicone Baking Mats & Tips</a></li>
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Masterclass Academy</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><a href="#macaron" style={{ color: 'inherit' }}>Italian Meringue Macarons</a></li>
              <li><a href="#wildyeast" style={{ color: 'inherit' }}>Wild Starter Sourdough</a></li>
              <li><a href="#palette" style={{ color: 'inherit' }}>Palette Knife Cake Art</a></li>
              <li><a href="#vip" style={{ color: 'inherit' }}>VIP Baker Membership</a></li>
            </ul>
          </div>

          {/* Live Visitor Analytics */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Live Platform Analytics</h4>
            <div className="glass-card" style={{ padding: '16px', background: 'var(--bg-surface-elevated)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="pulse-dot"></span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-emerald-400)' }}>
                  {liveVisitors} Active Live Visitors
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Lifetime Platform Visits: <strong>{lifetimeVisits.toLocaleString()}</strong>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} color="#22D3EE" />
                <span>Synchronized via SignalR WebSockets</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div>© 2026 Nexus Bakery & Tech Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Crafted with</span> <Heart size={13} fill="#FB7185" color="#FB7185" /> <span>for Artisan Bakers worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
