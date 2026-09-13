import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Bot, Users, Sparkles, User, ShieldAlert, ChevronDown, Coffee, PhoneCall, Award, Truck, ShieldCheck, Heart, Info, Mail, MapPin, Phone, Layers, BookOpen, Package } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useVisitorStore } from '../stores/visitorStore';
import { useAiDrawerStore } from '../stores/aiDrawerStore';
import { useAuthStore } from '../stores/authStore';
import logoImg from '../assets/Picture2.png';

export function Navbar({ activeTab, setActiveTab, onOpenAboutModal, onSelectCategoryFilter }) {
  const { getTotalItemCount, openCart } = useCartStore();
  const { liveVisitors } = useVisitorStore();
  const { toggleDrawer } = useAiDrawerStore();
  const { user, isAuthenticated, openAuthModal, openProfileModal, logout } = useAuthStore();

  const [activeDropdown, setActiveDropdown] = useState(null); // 'bakes' | 'homeTools' | 'order' | 'contact' | 'about' | null
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  const cartCount = getTotalItemCount();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleNavButtonClick = (e, menuKey, defaultTab, defaultCategory = null) => {
    e.stopPropagation();
    if (activeDropdown !== menuKey) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveDropdown(menuKey);
    } else {
      setActiveDropdown(null);
      if (defaultCategory && onSelectCategoryFilter) {
        onSelectCategoryFilter(defaultCategory);
      }
      if (defaultTab === 'about' && onOpenAboutModal) {
        onOpenAboutModal('about');
      } else if (defaultTab) {
        setActiveTab(defaultTab);
      }
    }
  };

  const handleChevronClick = (e, menuKey) => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(activeDropdown === menuKey ? null : menuKey);
  };

  const handleBakesSelect = (subItem) => {
    setActiveDropdown(null);
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(subItem);
    }
    setActiveTab('bakery');
  };

  const handleToolsSelect = (subItem) => {
    setActiveDropdown(null);
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(subItem);
    }
    setActiveTab('store');
  };

  const handleOrderSelect = (subType) => {
    setActiveDropdown(null);
    if (subType === 'individual') {
      if (!isAuthenticated) {
        openAuthModal();
      } else {
        openProfileModal();
      }
    } else if (subType === 'preorder') {
      setActiveTab('bakery');
    } else if (subType === 'corporate') {
      setActiveTab('contact');
    }
  };

  const handleContactSelect = (subType) => {
    setActiveDropdown(null);
    if (subType === 'mrbutter') {
      toggleDrawer();
    } else {
      setActiveTab('contact');
    }
  };

  const handleAboutSelect = (tabKey) => {
    setActiveDropdown(null);
    if (onOpenAboutModal) {
      onOpenAboutModal(tabKey);
    }
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 w-full" style={{ background: '#ffffff', borderBottom: '1px solid rgba(61, 35, 20, 0.1)', boxShadow: '0 2px 10px rgba(61, 35, 20, 0.04)' }}>
      
      {/* Stage-01: Top Container (Matching PDF Page 1 Stage-01) */}
      <div style={{ background: '#3d2314', color: '#fdfbf7', padding: '6px 24px', fontSize: '12px', fontWeight: 500 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={13} color="#e05297" fill="#e05297" />
            <span style={{ fontWeight: 700, color: '#f472b6' }}>Bake • Make • Learn</span>
            <span className="hide-on-mobile" style={{ opacity: 0.85, marginLeft: '6px' }}>
              || One Stop Destination for Bakery, Coffee, Tools, Banking Ingredients, Packaging, and Professional Baking Classes
            </span>
          </div>

          <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', opacity: 0.95 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: 600 }}>
              <Award size={12} color="#fbbf24" /> Premium Quality Products
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38bdf8', fontWeight: 600 }}>
              <Package size={12} color="#38bdf8" /> Corporate Supply
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399', fontWeight: 600 }}>
              <Truck size={12} color="#34d399" /> Fast & Safe Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Stage-02: Header Container */}
      <div className="container navbar-header-row" style={{ position: 'relative' }}>
        
        {/* Left Adjust : Name Logo (Home Page Link) */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }} onClick={() => setActiveTab('home')}>
          <img
            src={logoImg}
            alt="Buttercup Logo"
            style={{
              height: '75px',
              width: 'auto',
              maxHeight: '75px',
              objectFit: 'contain',
              flexShrink: 0
            }}
          />
        </div>

        {/* Center Navigation Menu Bar with Hover Dropdowns */}
        <div className="navbar-nav-wrapper nav-scroll-container">
          <nav style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#faf6f0', padding: '5px', borderRadius: '14px', border: '1px solid rgba(61, 35, 20, 0.08)', position: 'relative' }}>
          
          {/* 1. Home Button */}
          <button
            onClick={() => { setActiveTab('home'); setActiveDropdown(null); }}
            style={{
              background: activeTab === 'home' ? '#ffffff' : 'transparent',
              color: activeTab === 'home' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'home' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '9px',
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

          {/* 2. Our Bakes Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('bakes')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'bakes', 'bakery', 'All')}
              style={{
                background: (activeTab === 'bakery' || activeDropdown === 'bakes') ? '#ffffff' : 'transparent',
                color: (activeTab === 'bakery' || activeDropdown === 'bakes') ? '#e05297' : '#6e5849',
                boxShadow: (activeTab === 'bakery' || activeDropdown === 'bakes') ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
                borderRadius: '9999px',
                padding: '8px 16px',
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
              <Coffee size={14} /> Our Bakes <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'bakes')} style={{ transform: activeDropdown === 'bakes' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'bakes' && (
              <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: '6px', zIndex: 9999 }}>
                <div style={{
                  width: '190px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.18)',
                  border: '1px solid rgba(61, 35, 20, 0.1)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  whiteSpace: 'normal',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {[
                    { label: '🍩 Donuts', val: 'Donuts' },
                    { label: '🎂 Cake', val: 'Cake' },
                    { label: '🍫 Chocolate', val: 'Chocolate' },
                    { label: '☕ Coffee', val: 'Coffee' },
                    { label: '🥤 Drinks', val: 'Drinks' },
                    { label: '🍪 Cookies', val: 'Cookies' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => handleBakesSelect(item.val)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#3d2314',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Try Your Home Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('homeTools')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'homeTools', 'store', 'All')}
              style={{
                background: (activeTab === 'store' || activeDropdown === 'homeTools') ? '#ffffff' : 'transparent',
                color: (activeTab === 'store' || activeDropdown === 'homeTools') ? '#e05297' : '#6e5849',
                boxShadow: (activeTab === 'store' || activeDropdown === 'homeTools') ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
                borderRadius: '9999px',
                padding: '8px 16px',
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
              <Layers size={14} /> Try Your Home <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'homeTools')} style={{ transform: activeDropdown === 'homeTools' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'homeTools' && (
              <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: '6px', zIndex: 9999 }}>
                <div style={{
                  width: '200px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.18)',
                  border: '1px solid rgba(61, 35, 20, 0.1)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  whiteSpace: 'normal',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {[
                    { label: '🥣 Mixers & Pans', val: 'Tools' },
                    { label: '🧁 Decorating Tools', val: 'Decorations' },
                    { label: '✨ Silicone Moulds', val: 'Moulds' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => handleToolsSelect(item.val)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#3d2314',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Academy Button */}
          <button
            type="button"
            onClick={() => { setActiveTab('masterclass'); setActiveDropdown(null); }}
            style={{
              background: activeTab === 'masterclass' ? '#ffffff' : 'transparent',
              color: activeTab === 'masterclass' ? '#e05297' : '#6e5849',
              boxShadow: activeTab === 'masterclass' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
              borderRadius: '9999px',
              padding: '8px 16px',
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

          {/* 5. Order Now Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('order')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'order', 'bakery')}
              style={{
                background: activeDropdown === 'order' ? '#ffffff' : 'transparent',
                color: activeDropdown === 'order' ? '#e05297' : '#6e5849',
                boxShadow: activeDropdown === 'order' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
                borderRadius: '9999px',
                padding: '8px 16px',
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
              <ShoppingBag size={14} /> Order Now <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'order')} style={{ transform: activeDropdown === 'order' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'order' && (
              <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: '6px', zIndex: 9999 }}>
                <div style={{
                  width: '230px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.18)',
                  border: '1px solid rgba(61, 35, 20, 0.1)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  whiteSpace: 'normal',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <button
                    type="button"
                    onClick={() => handleOrderSelect('individual')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    👤 Individual (Profile & Account)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderSelect('preorder')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    ✨ Special Program (Pre Order)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderSelect('corporate')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    🏢 Corporate (Contact Us)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 6. Contact Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('contact')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'contact', 'contact')}
              style={{
                background: (activeTab === 'contact' || activeDropdown === 'contact') ? '#ffffff' : 'transparent',
                color: (activeTab === 'contact' || activeDropdown === 'contact') ? '#e05297' : '#6e5849',
                boxShadow: (activeTab === 'contact' || activeDropdown === 'contact') ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
                borderRadius: '9999px',
                padding: '8px 16px',
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
              <PhoneCall size={14} /> Contact <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'contact')} style={{ transform: activeDropdown === 'contact' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'contact' && (
              <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: '6px', zIndex: 9999 }}>
                <div style={{
                  width: '210px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.18)',
                  border: '1px solid rgba(61, 35, 20, 0.1)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  whiteSpace: 'normal',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <button
                    type="button"
                    onClick={() => handleContactSelect('mrbutter')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 700, color: '#e05297', background: '#fdf2f8', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                  >
                    🤖 Mr. Butter (//chatbot//)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleContactSelect('email')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#faf6f0'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Mail size={14} /> Email Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleContactSelect('call')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#faf6f0'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Phone size={14} /> Call Hotline
                  </button>
                  <button
                    type="button"
                    onClick={() => handleContactSelect('location')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#faf6f0'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <MapPin size={14} /> Store Location
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 7. About Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'about', 'about')}
              style={{
                background: activeDropdown === 'about' ? '#ffffff' : 'transparent',
                color: activeDropdown === 'about' ? '#e05297' : '#6e5849',
                boxShadow: activeDropdown === 'about' ? '0 2px 8px rgba(61, 35, 20, 0.08)' : 'none',
                borderRadius: '9999px',
                padding: '8px 16px',
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
              <Info size={14} /> About <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'about')} style={{ transform: activeDropdown === 'about' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'about' && (
              <div style={{ position: 'absolute', top: '100%', right: 0, paddingTop: '6px', zIndex: 9999 }}>
                <div style={{
                  width: '240px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.18)',
                  border: '1px solid rgba(61, 35, 20, 0.1)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  whiteSpace: 'normal',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <button
                    type="button"
                    onClick={() => handleAboutSelect('services')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    💼 Our Services
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAboutSelect('gallery')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    📸 Get In Touch (Gallery & Clips)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAboutSelect('about')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    ℹ️ About Buttercup
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAboutSelect('license')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 600, color: '#3d2314', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f8'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    📜 License & Verification
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Warehouse Button (If user is Admin) */}
          {(user?.role === 'Admin' || user?.role === 'SystemAdmin') && (
            <button
              onClick={() => { setActiveTab('warehouse'); setActiveDropdown(null); }}
              style={{
                background: activeTab === 'warehouse' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                color: activeTab === 'warehouse' ? '#dc2626' : '#6e5849',
                borderRadius: '9px',
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
              <ShieldAlert size={14} /> Warehouse
            </button>
          )}

        </nav>
        </div>

        {/* Right Action Icons (Live Visitors, Profile Avatar, Cart, Sign Out) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          
          {/* Live Visitor Counter */}
          <div className="badge hide-on-mobile" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', fontSize: '12px' }} title="Connected Live via ASP.NET Core SignalR">
            <span className="pulse-dot"></span>
            <Users size={12} />
            <span>{liveVisitors} Online</span>
          </div>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="btn btn-rose btn-sm"
            style={{ position: 'relative', fontWeight: 700 }}
          >
            <ShoppingBag size={15} />
            <span className="hide-on-mobile">Cart</span>
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

          {/* Logged-In User Profile Trigger & Avatar */}
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                onClick={openProfileModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  background: '#faf6f0',
                  border: '1px solid rgba(61, 35, 20, 0.1)',
                  transition: 'all 0.2s ease'
                }}
                title="Click to view & update your Profile"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e05297'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(61, 35, 20, 0.1)'}
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={user.fullName}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #e05297', objectFit: 'cover' }}
                />
                <span className="hide-on-mobile" style={{ fontSize: '13px', fontWeight: 700, color: '#3d2314' }}>
                  {user.fullName?.split(' ')[0] || 'Profile'}
                </span>
              </div>
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
              style={{ fontWeight: 700 }}
            >
              <User size={14} />
              <span>Login</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;
