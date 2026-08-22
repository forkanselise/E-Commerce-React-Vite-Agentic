import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Award, ShieldCheck, CheckCircle } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ background: '#faf6f0', padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Section 07 Classroom & Packing Showcase Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #3d2314 0%, #2a170d 100%)',
          borderRadius: '24px',
          padding: '40px 48px',
          color: '#ffffff',
          marginBottom: '48px',
          boxShadow: '0 12px 35px rgba(61, 35, 20, 0.12)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#fcd34d', textTransform: 'uppercase', marginBottom: '8px' }}>Classroom & Packing Center</div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>
            Learn, Create & Grow With Us
          </h1>
          <p style={{ fontSize: '15px', color: '#f4ede4', maxWidth: '650px', marginBottom: '28px' }}>
            Our classroom is designed for hands-on learning, equipped with professional deck ovens, stand mixers, temperature control dough proofer, and hygienic packaging facility.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fcd34d', marginBottom: '4px' }}>🍳 Professional Baking Spaces</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Deck Ovens & Heavy Mixers</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fcd34d', marginBottom: '4px' }}>📦 Packing & Dispatch Hub</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Insulated Cold Box Packaging</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fcd34d', marginBottom: '4px' }}>📜 Certified Environment</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>100% Food-Safety Compliant</div>
            </div>
          </div>
        </div>

        {/* Section 10 Contact Us Form & Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '36px', alignItems: 'start' }}>
          
          {/* Contact Details Card */}
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(61, 35, 20, 0.08)', boxShadow: '0 6px 20px rgba(61, 35, 20, 0.05)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#3d2314', marginBottom: '20px' }}>Contact Us</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} color="#e05297" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#3d2314' }}>Our Store & Academy</div>
                  <div style={{ fontSize: '13px', color: '#6e5849' }}>123 Green Road, Dhanmondi, Dhaka 1205</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} color="#e05297" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#3d2314' }}>Call Us</div>
                  <div style={{ fontSize: '13px', color: '#6e5849' }}>+880 1700-000000 / +880 1800-000000</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color="#e05297" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#3d2314' }}>Email Us</div>
                  <div style={{ fontSize: '13px', color: '#6e5849' }}>info@smartbakery.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} color="#e05297" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#3d2314' }}>Open Hours</div>
                  <div style={{ fontSize: '13px', color: '#6e5849' }}>10:00 AM – 8:00 PM (Sat – Thu)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(61, 35, 20, 0.08)', boxShadow: '0 6px 20px rgba(61, 35, 20, 0.05)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#3d2314', marginBottom: '8px' }}>Send an Inquiry</h2>
            <p style={{ fontSize: '14px', color: '#6e5849', marginBottom: '24px' }}>
              Have a question about wholesale baking supplies or class schedules? Drop us a line below.
            </p>

            {submitted ? (
              <div style={{ padding: '20px', background: '#ecfdf5', borderRadius: '14px', color: '#059669', textAlign: 'center', fontWeight: 700 }}>
                <CheckCircle size={24} style={{ display: 'block', margin: '0 auto 8px auto' }} />
                Thank you! Your message has been sent successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#3d2314', display: 'block', marginBottom: '4px' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1px solid rgba(61, 35, 20, 0.15)', outline: 'none', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#3d2314', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+8801..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1px solid rgba(61, 35, 20, 0.15)', outline: 'none', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#3d2314', display: 'block', marginBottom: '4px' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1px solid rgba(61, 35, 20, 0.15)', outline: 'none', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#3d2314', display: 'block', marginBottom: '4px' }}>Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you'd like to inquire about..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1px solid rgba(61, 35, 20, 0.15)', outline: 'none', fontSize: '14px', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-rose" style={{ padding: '14px', fontWeight: 800, fontSize: '15px' }}>
                  <Send size={16} /> SEND MESSAGE
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
