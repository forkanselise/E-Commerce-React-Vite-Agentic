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

export function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'store' | 'bakery' | 'masterclass' | 'blog' | 'contact' | 'warehouse'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [storeCategoryFilter, setStoreCategoryFilter] = useState('All');
  
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
            <BakeryCoffeeSection onSelectProduct={(p) => setSelectedProduct(p)} />
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
          <BakeryCoffeeSection onSelectProduct={(p) => setSelectedProduct(p)} />
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
