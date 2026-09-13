import React, { useState } from 'react';
import { Heart, Bot, ShieldCheck, Mail, Send } from 'lucide-react';
import { useVisitorStore } from '../stores/visitorStore';
import logoImg from '../assets/Picture2.png';

export function Footer() {
  const { lifetimeVisits, liveVisitors } = useVisitorStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer style={{ background: '#3d2314', color: '#fdfbf7', paddingTop: '60px', paddingBottom: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div className="container">
        
        {/* Top 4 Columns (Matching Mockup Section 11 Footer) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          
          {/* Col 1 Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <img
                src={logoImg}
                alt="Buttercup Logo"
                style={{ height: '70px', width: 'auto', maxHeight: '70px', objectFit: 'contain', flexShrink: 0 }}
              />
            </div>
            <p style={{ fontSize: '13px', color: '#f4ede4', lineHeight: 1.6, marginBottom: '16px', opacity: 0.85 }}>
              One stop destination for baking ingredients, professional tools, bakery packaging, fresh cakes, donuts, and certified video masterclasses.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#fcd34d' }}>
              <Bot size={15} />
              <span>ASP.NET Core Multi-Agent AI Powered</span>
            </div>
          </div>

          {/* Col 2 Shop Links */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '14px', color: '#ffffff' }}>Shop Supplies</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', opacity: 0.85 }}>
              <li>Callebaut Chocolates</li>
              <li>Anchor Whipping Cream & Butter</li>
              <li>Silicone Spatulas & Mats</li>
              <li>Cake Boxes & Packaging</li>
              <li>Flours & Flavours</li>
            </ul>
          </div>

          {/* Col 3 Bakery & Academy */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '14px', color: '#ffffff' }}>Bakery & Academy</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', opacity: 0.85 }}>
              <li>Fresh Donuts & Cakes</li>
              <li>Artisan Sourdough Boules</li>
              <li>Basic Cake Class</li>
              <li>Macaron Masterclass</li>
              <li>Pastry Lamination Course</li>
            </ul>
          </div>

          {/* Col 4 Newsletter Signup */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '10px', color: '#ffffff' }}>Newsletter</h4>
            <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '12px' }}>
              Subscribe to get updates on new baking ingredients, tools, and discounts.
            </p>

            {subscribed ? (
              <div style={{ fontSize: '12px', color: '#34d399', fontWeight: 700 }}>
                ✓ Thank you for subscribing to Buttercup!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    flex: 1
                  }}
                />
                <button type="submit" className="btn btn-rose btn-sm" style={{ padding: '8px 12px' }}>
                  SUBSCRIBE
                </button>
              </form>
            )}

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', opacity: 0.7 }}>
              <span className="pulse-dot"></span>
              <span>{liveVisitors} Live Users Online</span>
            </div>
          </div>

        </div>

        {/* Bottom Payment Icons & Copyright */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', fontSize: '12px', opacity: 0.85 }}>
          <div>© 2026 Buttercup Hub Ltd. All rights reserved.</div>

          {/* Payment Method Badges (bKash, Nagad, Visa, Mastercard, COD) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700 }}>
            <span style={{ padding: '3px 8px', background: '#e2136e', color: '#fff', borderRadius: '4px' }}>bKash</span>
            <span style={{ padding: '3px 8px', background: '#f7941d', color: '#fff', borderRadius: '4px' }}>Nagad</span>
            <span style={{ padding: '3px 8px', background: '#1a1f71', color: '#fff', borderRadius: '4px' }}>VISA</span>
            <span style={{ padding: '3px 8px', background: '#eb001b', color: '#fff', borderRadius: '4px' }}>Mastercard</span>
            <span style={{ padding: '3px 8px', background: 'rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '4px' }}>Cash On Delivery</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Made with</span> <Heart size={13} fill="#e05297" color="#e05297" /> <span>for Bakers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
