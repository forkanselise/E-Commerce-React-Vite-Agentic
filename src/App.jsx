import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoreCatalog } from './components/StoreCatalog';
import { BakeryCoffeeSection } from './components/BakeryCoffeeSection';
import { MasterclassHub } from './components/MasterclassHub';
import { BlogRecipesSection } from './components/BlogRecipesSection';
import { ContactSection } from './components/ContactSection';
import { WarehouseAdminHub } from './components/WarehouseAdminHub';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AiConciergeDrawer } from './components/AiConciergeDrawer';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { useVisitorStore } from './stores/visitorStore';
import { useAiDrawerStore } from './stores/aiDrawerStore';
import { useAuthStore } from './stores/authStore';

export function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'store' | 'bakery' | 'masterclass' | 'blog' | 'contact' | 'warehouse'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { initVisitorHub } = useVisitorStore();
  const { initAgentHub } = useAiDrawerStore();
  const { token } = useAuthStore();

  useEffect(() => {
    // Initialize SignalR WebSocket subscriptions
    initVisitorHub();
    initAgentHub(token);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#faf6f0', color: '#3d2314' }}>
      
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            <StoreCatalog onSelectProduct={(p) => setSelectedProduct(p)} />
            <BakeryCoffeeSection onSelectProduct={(p) => setSelectedProduct(p)} />
            <MasterclassHub />
            <BlogRecipesSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'store' && (
          <StoreCatalog onSelectProduct={(p) => setSelectedProduct(p)} />
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

      {/* Slide-over Drawers & Modals */}
      <CartDrawer />
      <AiConciergeDrawer />
      <AuthModal />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
