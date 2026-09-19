import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Bot, Users, Sparkles, User, ShieldAlert, ChevronDown, Coffee, PhoneCall, Award, Truck, ShieldCheck, Heart, Info, Mail, MapPin, Phone, Layers, BookOpen, Package, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, right: 'auto' });
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  const cartCount = getTotalItemCount();

  // Close dropdown on outside click or window scroll
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    function handleWindowScroll() {
      setActiveDropdown(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const updateDropdownPos = (e, alignPreferred = 'left') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const target = e?.currentTarget;
    if (target) {
      const rect = target.getBoundingClientRect();
      const dropdownWidth = 240;
      if (alignPreferred === 'right' || rect.left + dropdownWidth > window.innerWidth) {
        setDropdownPos({
          top: rect.bottom + 6,
          right: Math.max(12, window.innerWidth - rect.right),
          left: 'auto'
        });
      } else {
        setDropdownPos({
          top: rect.bottom + 6,
          left: Math.max(12, rect.left),
          right: 'auto'
        });
      }
    }
  };

  const handleMouseEnter = (menuKey, e, alignPreferred = 'left') => {
    updateDropdownPos(e, alignPreferred);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const handleNavButtonClick = (e, menuKey, defaultTab, defaultCategory = null, alignPreferred = 'left') => {
    e.stopPropagation();
    if (activeDropdown !== menuKey) {
      updateDropdownPos(e, alignPreferred);
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

  const handleChevronClick = (e, menuKey, alignPreferred = 'left') => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (activeDropdown === menuKey) {
      setActiveDropdown(null);
    } else {
      updateDropdownPos(e, alignPreferred);
      setActiveDropdown(menuKey);
    }
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
    <header ref={navRef} className="sticky top-0 z-40 w-full" style={{ background: '#7B0505', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)' }}>
      
      {/* Stage-01: Top Container (Matching PDF Page 1 Stage-01) */}
      <div style={{ background: '#590303', color: '#fdfbf7', padding: '6px 24px', fontSize: '12px', fontWeight: 500, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={13} color="#ffffff" fill="#ffffff" />
            <span style={{ fontWeight: 700, color: '#fcd34d' }}>Bake • Make • Learn</span>
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
      <div className="container navbar-header-row" style={{ position: 'relative', paddingInline: '16px' }}>
        
        {/* Left Adjust : Name Logo (Home Page Link) */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }} onClick={() => setActiveTab('home')}>
          <img
            src={logoImg}
            alt="Buttercup Logo"
            className="navbar-logo-img"
            style={{
              height: '75px',
              width: 'auto',
              maxHeight: '75px',
              objectFit: 'contain',
              flexShrink: 0
            }}
          />
        </div>

        {/* Center Navigation Menu Bar with Hover Dropdowns (Desktop Only - Max Width 70% with Horizontal Scroll) */}
        <div className="navbar-nav-wrapper desktop-nav-only">
          <nav style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.15)', padding: '5px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.2)', position: 'relative', overflow: 'visible', zIndex: 60, whiteSpace: 'nowrap', flexShrink: 0 }}>
          
          {/* 1. Home Button */}
          <button
            onClick={() => { setActiveTab('home'); setActiveDropdown(null); }}
            style={{
              background: activeTab === 'home' ? '#ffffff' : 'transparent',
              color: activeTab === 'home' ? '#7B0505' : '#ffffff',
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
            onMouseEnter={(e) => handleMouseEnter('bakes', e, 'left')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'bakes', 'bakery', 'All', 'left')}
              style={{
                background: (activeTab === 'bakery' || activeDropdown === 'bakes') ? '#ffffff' : 'transparent',
                color: (activeTab === 'bakery' || activeDropdown === 'bakes') ? '#7B0505' : '#ffffff',
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
              <Coffee size={14} /> Our Bakes <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'bakes', 'left')} style={{ transform: activeDropdown === 'bakes' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'bakes' && (
              <div
                style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, right: dropdownPos.right, zIndex: 999999 }}
                onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{
                  width: '190px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.25)',
                  border: '1px solid rgba(123, 5, 5, 0.15)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  whiteSpace: 'normal',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {[
                    { label: '🎂 Cakes', val: 'Cakes' },
                    { label: '🍩 Donuts', val: 'Donuts' },
                    { label: '🍪 Cookies', val: 'Cookies' },
                    { label: '🍫 Brownies', val: 'Brownies' },
                    { label: '☕ Coffee', val: 'Coffee' },
                    { label: '🍫 Chocolate', val: 'Chocolate' },
                    { label: '🥤 Drinks', val: 'Drinks' }
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
            onMouseEnter={(e) => handleMouseEnter('homeTools', e, 'left')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'homeTools', 'store', 'All', 'left')}
              style={{
                background: (activeTab === 'store' || activeDropdown === 'homeTools') ? '#ffffff' : 'transparent',
                color: (activeTab === 'store' || activeDropdown === 'homeTools') ? '#7B0505' : '#ffffff',
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
              <Layers size={14} /> Try Your Home <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'homeTools', 'left')} style={{ transform: activeDropdown === 'homeTools' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'homeTools' && (
              <div
                style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, right: dropdownPos.right, zIndex: 999999 }}
                onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{
                  width: '210px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.25)',
                  border: '1px solid rgba(123, 5, 5, 0.15)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  whiteSpace: 'normal',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {[
                    { label: '🥣 Tools & Equipment', val: 'Tools' },
                    { label: '🧁 Moulds & Forms', val: 'Moulds' },
                    { label: '✨ Decorating Tools', val: 'Decorations' },
                    { label: '📦 Packaging & Boxes', val: 'Packaging' },
                    { label: '🥛 Ingredients', val: 'Ingredients' },
                    { label: '🍓 Flavours & Powders', val: 'Flavours' }
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
              color: activeTab === 'masterclass' ? '#7B0505' : '#ffffff',
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
            onMouseEnter={(e) => handleMouseEnter('order', e, 'left')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'order', 'bakery', null, 'left')}
              style={{
                background: activeDropdown === 'order' ? '#ffffff' : 'transparent',
                color: activeDropdown === 'order' ? '#7B0505' : '#ffffff',
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
              <ShoppingBag size={14} /> Order Now <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'order', 'left')} style={{ transform: activeDropdown === 'order' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'order' && (
              <div
                style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, right: dropdownPos.right, zIndex: 999999 }}
                onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{
                  width: '230px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.25)',
                  border: '1px solid rgba(123, 5, 5, 0.15)',
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
            onMouseEnter={(e) => handleMouseEnter('contact', e, 'right')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'contact', 'contact', null, 'right')}
              style={{
                background: (activeTab === 'contact' || activeDropdown === 'contact') ? '#ffffff' : 'transparent',
                color: (activeTab === 'contact' || activeDropdown === 'contact') ? '#7B0505' : '#ffffff',
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
              <PhoneCall size={14} /> Contact <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'contact', 'right')} style={{ transform: activeDropdown === 'contact' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'contact' && (
              <div
                style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, right: dropdownPos.right, zIndex: 999999 }}
                onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{
                  width: '210px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.25)',
                  border: '1px solid rgba(123, 5, 5, 0.15)',
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
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: '13px', fontWeight: 700, color: '#7B0505', background: '#fdf2f8', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
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
            onMouseEnter={(e) => handleMouseEnter('about', e, 'right')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => handleNavButtonClick(e, 'about', 'about', null, 'right')}
              style={{
                background: activeDropdown === 'about' ? '#ffffff' : 'transparent',
                color: activeDropdown === 'about' ? '#7B0505' : '#ffffff',
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
              <Info size={14} /> About <ChevronDown size={12} onClick={(e) => handleChevronClick(e, 'about', 'right')} style={{ transform: activeDropdown === 'about' ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {activeDropdown === 'about' && (
              <div
                style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, right: dropdownPos.right, zIndex: 999999 }}
                onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{
                  width: '240px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(61, 35, 20, 0.25)',
                  border: '1px solid rgba(123, 5, 5, 0.15)',
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
            className="btn btn-sm"
            style={{ position: 'relative', fontWeight: 800, background: '#ffffff', color: '#7B0505', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          >
            <ShoppingBag size={15} />
            <span className="hide-on-mobile">Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#590303',
                color: '#ffffff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
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
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  transition: 'all 0.2s ease'
                }}
                title="Click to view & update your Profile"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'}
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={user.fullName}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', objectFit: 'cover' }}
                />
                <span className="hide-on-mobile" style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                  {user.fullName?.split(' ')[0] || 'Profile'}
                </span>
              </div>
              <button
                onClick={logout}
                style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="btn btn-sm"
              style={{ fontWeight: 800, background: '#ffffff', color: '#7B0505', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              <User size={14} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: mobileMenuOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
              color: mobileMenuOpen ? '#7B0505' : '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '10px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>Menu</span>
          </button>

        </div>
      </div>

      {/* Mobile Expanded Navigation Panel */}
      {mobileMenuOpen && (
        <div className="container" style={{ position: 'relative', zIndex: 99999 }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(123, 5, 5, 0.2)',
            margin: '8px 0 16px 0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0e6e6', paddingBottom: '8px' }}>
              <span style={{ fontWeight: 800, color: '#7B0505', fontSize: '15px' }}>Buttercup Bakery Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Home Link */}
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '10px 14px', background: activeTab === 'home' ? '#fdf2f8' : 'transparent', color: '#7B0505', borderRadius: '10px', border: 'none', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <Sparkles size={16} /> Home
            </button>

            {/* Our Bakes Category Grid */}
            <div style={{ background: '#fdfaf8', padding: '12px', borderRadius: '12px', border: '1px solid #f0e6e6' }}>
              <div style={{ fontWeight: 800, color: '#7B0505', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Coffee size={15} /> Our Bakes
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '6px' }}>
                {[
                  { label: '🎂 Cakes', val: 'Cakes' },
                  { label: '🍩 Donuts', val: 'Donuts' },
                  { label: '🍪 Cookies', val: 'Cookies' },
                  { label: '🍫 Brownies', val: 'Brownies' },
                  { label: '☕ Coffee', val: 'Coffee' },
                  { label: '🍫 Chocolate', val: 'Chocolate' },
                  { label: '🥤 Drinks', val: 'Drinks' }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => { handleBakesSelect(item.val); setMobileMenuOpen(false); }}
                    style={{ textAlign: 'left', padding: '8px 10px', fontSize: '12px', fontWeight: 600, color: '#3d2314', background: '#ffffff', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Try Your Home Tools Category Grid */}
            <div style={{ background: '#fdfaf8', padding: '12px', borderRadius: '12px', border: '1px solid #f0e6e6' }}>
              <div style={{ fontWeight: 800, color: '#7B0505', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Layers size={15} /> Try Your Home (Tools & Supplies)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '6px' }}>
                {[
                  { label: '🥣 Tools & Equipment', val: 'Tools' },
                  { label: '🧁 Moulds & Forms', val: 'Moulds' },
                  { label: '✨ Decorating Tools', val: 'Decorations' },
                  { label: '📦 Packaging & Boxes', val: 'Packaging' },
                  { label: '🥛 Ingredients', val: 'Ingredients' },
                  { label: '🍓 Flavours & Powders', val: 'Flavours' }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => { handleToolsSelect(item.val); setMobileMenuOpen(false); }}
                    style={{ textAlign: 'left', padding: '8px 10px', fontSize: '12px', fontWeight: 600, color: '#3d2314', background: '#ffffff', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Academy / Masterclasses */}
            <button
              onClick={() => { setActiveTab('masterclass'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '10px 14px', background: activeTab === 'masterclass' ? '#fdf2f8' : 'transparent', color: '#7B0505', borderRadius: '10px', border: 'none', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <BookOpen size={16} /> Academy (Masterclasses)
            </button>

            {/* Quick Action Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
                style={{ padding: '10px 14px', background: '#7B0505', color: '#ffffff', borderRadius: '10px', border: 'none', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <PhoneCall size={14} /> Contact Us
              </button>
              <button
                onClick={() => { if (onOpenAboutModal) onOpenAboutModal('about'); setMobileMenuOpen(false); }}
                style={{ padding: '10px 14px', background: '#fdf2f8', color: '#7B0505', borderRadius: '10px', border: '1px solid #7B0505', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Info size={14} /> About Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
