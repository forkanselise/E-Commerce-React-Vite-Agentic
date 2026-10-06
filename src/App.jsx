import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoreCatalog } from './components/StoreCatalog';
import { BakeryCoffeeSection } from './components/BakeryCoffeeSection';
import { MasterclassHub } from './components/MasterclassHub';
import { BlogRecipesSection } from './components/BlogRecipesSection';
import { ContactSection } from './components/ContactSection';
import { WarehouseAdminHub } from './components/WarehouseAdminHub';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AboutModal } from './components/AboutModal';
import { CartDrawer } from './components/CartDrawer';
import { AiConciergeDrawer } from './components/AiConciergeDrawer';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Footer } from './components/Footer';
import { useVisitorStore } from './stores/visitorStore';
import { useAiDrawerStore } from './stores/aiDrawerStore';
import { useAuthStore } from './stores/authStore';

function getTabFromPath() {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (path.includes('/warehouse') || window.location.hash.includes('warehouse')) return 'warehouse';
  if (path.includes('/store') || path.includes('/catalog')) return 'store';
  if (path.includes('/bakery') || path.includes('/coffee')) return 'bakery';
  if (path.includes('/masterclass') || path.includes('/academy')) return 'masterclass';
  if (path.includes('/blog') || path.includes('/recipes')) return 'blog';
  if (path.includes('/contact')) return 'contact';
  return 'home';
}

export function App() {
  const [activeTab, setActiveTabState] = useState(getTabFromPath);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [storeCategoryFilter, setStoreCategoryFilter] = useState('All');
  const [bakeryCategoryFilter, setBakeryCategoryFilter] = useState('All');
  
  // Custom navigation handler syncing state with URL path
  const setActiveTab = (tab, updateHistory = true) => {
    setActiveTabState(tab);
    if (updateHistory) {
      const pathMap = {
        home: '/',
        store: '/store',
        bakery: '/bakery',
        masterclass: '/masterclass',
        blog: '/blog',
        contact: '/contact',
        warehouse: '/warehouse'
      };
      const targetPath = pathMap[tab] || '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  };

  // Sync state on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getTabFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // About Modal state
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [aboutModalInitialTab, setAboutModalInitialTab] = useState('about');

  const { initVisitorHub } = useVisitorStore();
  const { initAgentHub } = useAiDrawerStore();
  const { token, initAuth } = useAuthStore();

  useEffect(() => {
    // Initialize Auth state & SignalR WebSocket subscriptions
    initAuth();
    initVisitorHub();
    initAgentHub(token);
  }, []);

  const handleOpenAboutModal = (tabKey = 'about') => {
    setAboutModalInitialTab(tabKey);
    setIsAboutModalOpen(true);
  };

  const handleSelectCategoryFilter = (catId) => {
    setStoreCategoryFilter(catId);
    setBakeryCategoryFilter(catId);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#faf6f0', color: '#3d2314' }}>
      {/* Initial Load Logo Splash Overlay */}
      <SplashScreen duration={2000} />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAboutModal={handleOpenAboutModal}
        onSelectCategoryFilter={handleSelectCategoryFilter}
      />

      {/* Main Tab Content */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <>
            <HeroSection
              setActiveTab={setActiveTab}
              onSelectCategoryFilter={handleSelectCategoryFilter}
            />
            <StoreCatalog
              initialCategory={storeCategoryFilter}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
            <BakeryCoffeeSection initialSubCategory={bakeryCategoryFilter} onSelectProduct={(p) => setSelectedProduct(p)} />
            <MasterclassHub />
            <BlogRecipesSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'store' && (
          <StoreCatalog
            initialCategory={storeCategoryFilter}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {activeTab === 'bakery' && (
          <BakeryCoffeeSection initialSubCategory={bakeryCategoryFilter} onSelectProduct={(p) => setSelectedProduct(p)} />
        )}

        {activeTab === 'masterclass' && (
          <MasterclassHub />
        )}

        {activeTab === 'blog' && (
          <BlogRecipesSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}

        {activeTab === 'warehouse' && (
          <WarehouseAdminHub />
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* About & Services Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        initialTab={aboutModalInitialTab}
      />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer />
      <AiConciergeDrawer />
      <AuthModal />
      <UserProfileModal />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
