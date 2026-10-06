import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw, Plus, Minus, History, Check, Edit3, Save, PackagePlus, GraduationCap, Video, BookOpen, CloudUpload, Loader2, Image as ImageIcon } from 'lucide-react';
import { INITIAL_PRODUCTS, createProduct, updateProduct, fetchProducts, fetchTutorials, createTutorial, updateTutorial, uploadToCloudinary } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export function WarehouseAdminHub() {
  const [mainTab, setMainTab] = useState('products'); // 'products' | 'tutorials'

  // --- PRODUCTS STATE ---
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activePanel, setActivePanel] = useState('adjust'); // 'adjust', 'edit', 'add'
  const [adjustAmount, setAdjustAmount] = useState(10);
  const [adjustReason, setAdjustReason] = useState('New batch warehouse intake');

  // --- TUTORIALS STATE ---
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorialId, setSelectedTutorialId] = useState(null);
  const [tutorialPanel, setTutorialPanel] = useState('add'); // 'add' | 'edit'

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'log_1',
      productTitle: 'Artisan San Francisco Sourdough Boule',
      previousStock: 20,
      newStock: 30,
      changeAmount: 10,
      reason: 'Morning baking batch finished',
      adjustedBy: 'Chef Rahim (Admin)',
      timestamp: 'Today, 06:30 AM'
    },
    {
      id: 'log_2',
      productTitle: 'Professional 7-Speed Stand Mixer',
      previousStock: 40,
      newStock: 45,
      changeAmount: 5,
      reason: 'Supplier shipment received',
      adjustedBy: 'System Super Admin',
      timestamp: 'Yesterday, 04:15 PM'
    }
  ]);
  const [successToast, setSuccessToast] = useState(null);

  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);
  const [isUploadingTutorialImg, setIsUploadingTutorialImg] = useState(false);

  const { user } = useAuthStore();

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const selectedTutorial = tutorials.find(t => t.id === selectedTutorialId);

  // Load Products & Tutorials
  useEffect(() => {
    async function loadData() {
      const pData = await fetchProducts();
      if (pData && pData.length > 0) {
        setProducts(pData);
        setSelectedProductId(prev => prev || pData[0]?.id);
      }
      const tData = await fetchTutorials();
      if (tData && tData.length > 0) {
        setTutorials(tData);
        setSelectedTutorialId(prev => prev || tData[0]?.id);
      }
    }
    loadData();
  }, []);

  // Form State for Product Add / Edit
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    category: 'Ingredients',
    price: 0,
    warehouseStock: 0,
    shortDescription: '',
    imageUrl: ''
  });

  // Form State for Tutorial Add / Edit
  const [tutorialFormData, setTutorialFormData] = useState({
    title: '',
    category: 'Cakes & Pastry',
    skillLevel: 'Beginner',
    durationMinutes: 60,
    price: 3400,
    description: '',
    instructorName: 'Chef Instructor',
    instructorBio: 'Lead Pastry Instructor',
    thumbnail: '',
    videoUrl: '',
    accessType: 'SubscriberOnly'
  });

  // Sync Product edit form
  useEffect(() => {
    if (activePanel === 'edit' && selectedProduct) {
      setFormData({
        title: selectedProduct.title || '',
        sku: selectedProduct.sku || '',
        category: selectedProduct.category || 'Ingredients',
        price: selectedProduct.price || 0,
        warehouseStock: selectedProduct.warehouseStock || 0,
        shortDescription: selectedProduct.shortDescription || '',
        imageUrl: selectedProduct.images?.[0]?.url || ''
      });
    } else if (activePanel === 'add') {
      setFormData({
        title: '',
        sku: 'NEW-ITEM-' + Math.floor(Math.random() * 1000),
        category: 'Ingredients',
        price: 0,
        warehouseStock: 10,
        shortDescription: '',
        imageUrl: ''
      });
    }
  }, [activePanel, selectedProduct]);

  // Sync Tutorial edit form
  useEffect(() => {
    if (tutorialPanel === 'edit' && selectedTutorial) {
      setTutorialFormData({
        title: selectedTutorial.title || '',
        category: selectedTutorial.category || 'Cakes & Pastry',
        skillLevel: selectedTutorial.skillLevel || 'Beginner',
        durationMinutes: selectedTutorial.durationMinutes || 60,
        price: selectedTutorial.price || 0,
        description: selectedTutorial.description || '',
        instructorName: selectedTutorial.instructor?.name || selectedTutorial.instructorName || 'Chef Instructor',
        instructorBio: selectedTutorial.instructor?.bio || selectedTutorial.instructorBio || 'Lead Pastry Instructor',
        thumbnail: selectedTutorial.thumbnail || '',
        videoUrl: selectedTutorial.videoUrl || '',
        accessType: selectedTutorial.accessType || 'SubscriberOnly'
      });
    } else if (tutorialPanel === 'add') {
      setTutorialFormData({
        title: '',
        category: 'Cakes & Pastry',
        skillLevel: 'Beginner',
        durationMinutes: 60,
        price: 3400,
        description: '',
        instructorName: 'Chef Instructor',
        instructorBio: 'Lead Pastry Instructor with 15+ years experience',
        thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        accessType: 'SubscriberOnly'
      });
    }
  }, [tutorialPanel, selectedTutorial]);

  const handleProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProductImg(true);
    try {
      const res = await uploadToCloudinary(file);
      if (res.url) {
        setFormData(prev => ({ ...prev, imageUrl: res.url }));
        setSuccessToast('Product image uploaded to Cloudinary successfully!');
        setTimeout(() => setSuccessToast(null), 3000);
      }
    } catch (err) {
      alert('❌ Image Upload Failed: ' + err.message);
    } finally {
      setIsUploadingProductImg(false);
    }
  };

  const handleTutorialImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingTutorialImg(true);
    try {
      const res = await uploadToCloudinary(file);
      if (res.url) {
        setTutorialFormData(prev => ({ ...prev, thumbnail: res.url }));
        setSuccessToast('Course thumbnail uploaded to Cloudinary!');
        setTimeout(() => setSuccessToast(null), 3000);
      }
    } catch (err) {
      alert('❌ Thumbnail Upload Failed: ' + err.message);
    } finally {
      setIsUploadingTutorialImg(false);
    }
  };

  const handleAdjustStock = async (isIncrement) => {
    const current = products.find(p => p.id === selectedProductId);
    if (!current) return;

    const delta = isIncrement ? adjustAmount : -adjustAmount;
    const newStock = Math.max(0, current.warehouseStock + delta);

    try {
      await updateProduct(selectedProductId, {
        ...current,
        warehouseStock: newStock
      });
    } catch (err) {
      alert("❌ Backend API Error on Stock Adjustment: " + err.message);
      console.error('API stock adjustment failed:', err);
      return;
    }

    setProducts(products.map(p => p.id === selectedProductId ? { ...p, warehouseStock: newStock } : p));

    const newLog = {
      id: 'log_' + Date.now(),
      productTitle: current.title,
      previousStock: current.warehouseStock,
      newStock: newStock,
      changeAmount: delta,
      reason: adjustReason,
      adjustedBy: user?.fullName || 'Store Admin',
      timestamp: 'Just now'
    };

    setAuditLogs([newLog, ...auditLogs]);
    setSuccessToast(`Adjusted '${current.title}' stock to ${newStock} units in DB!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (activePanel === 'add') {
      const newProductPayload = {
        title: formData.title,
        slug: formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-product',
        sku: formData.sku,
        category: formData.category,
        price: Number(formData.price),
        warehouseStock: Number(formData.warehouseStock),
        shortDescription: formData.shortDescription,
        description: formData.shortDescription,
        images: [{ url: formData.imageUrl || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', alt: formData.title }],
        isAvailable: true,
        averageRating: 0,
        reviewCount: 0
      };
      
      let createdProduct = null;
      try {
        createdProduct = await createProduct(newProductPayload);
      } catch (err) {
        alert("❌ Backend API Error: " + err.message);
        console.error('API create product failed:', err);
        return;
      }

      const newProduct = { ...newProductPayload, id: createdProduct.id };
      setProducts([newProduct, ...products]);
      setSuccessToast(`Product '${newProduct.title}' added successfully to the database!`);
      setSelectedProductId(newProduct.id);
      setActivePanel('adjust');
      
    } else if (activePanel === 'edit') {
      try {
        await updateProduct(selectedProductId, {
          title: formData.title,
          sku: formData.sku,
          category: formData.category,
          price: Number(formData.price),
          warehouseStock: Number(formData.warehouseStock),
          shortDescription: formData.shortDescription,
          images: [{ url: formData.imageUrl || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', alt: formData.title }]
        });
      } catch (err) {
        alert("❌ Backend API Error on Update: " + err.message);
        console.error('API update product failed:', err);
        return;
      }

      setProducts(products.map(p => {
        if (p.id === selectedProductId) {
          return {
            ...p,
            title: formData.title,
            sku: formData.sku,
            category: formData.category,
            price: Number(formData.price),
            warehouseStock: Number(formData.warehouseStock),
            shortDescription: formData.shortDescription,
            images: [{ url: formData.imageUrl || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', alt: formData.title }]
          };
        }
        return p;
      }));

      const refreshed = await fetchProducts();
      if (refreshed && refreshed.length > 0) setProducts(refreshed);

      setSuccessToast(`Product '${formData.title}' updated successfully in DB!`);
      setActivePanel('adjust');
    }
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSaveTutorial = async (e) => {
    e.preventDefault();
    if (tutorialPanel === 'add') {
      try {
        const created = await createTutorial(tutorialFormData);
        setSuccessToast(`Masterclass Course '${tutorialFormData.title}' created in DB!`);
        const refreshed = await fetchTutorials();
        setTutorials(refreshed);
        if (created?.id) setSelectedTutorialId(created.id);
      } catch (err) {
        alert("❌ Backend Error on Create Tutorial: " + err.message);
        return;
      }
    } else if (tutorialPanel === 'edit') {
      try {
        await updateTutorial(selectedTutorialId, tutorialFormData);
        setSuccessToast(`Masterclass Course '${tutorialFormData.title}' updated in DB!`);
        const refreshed = await fetchTutorials();
        setTutorials(refreshed);
      } catch (err) {
        alert("❌ Backend Error on Update Tutorial: " + err.message);
        return;
      }
    }
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="container" style={{ padding: '24px 24px 24px 24px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(251, 113, 133, 0.12)', border: '1px solid rgba(251, 113, 133, 0.3)', marginBottom: '10px' }}>
            <ShieldCheck size={13} color="#FB7185" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FB7185' }}>Admin & Management Console</span>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Warehouse Inventory & Masterclass Manager</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Manage catalog stock, edit products, and create/edit Masterclass baking courses.</p>
        </div>

        {successToast && (
          <div className="badge badge-emerald animate-fade-in" style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Check size={16} />
            <span>{successToast}</span>
          </div>
        )}
      </div>

      {/* Main Feature Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        <button
          onClick={() => setMainTab('products')}
          style={{
            background: mainTab === 'products' ? '#7B0505' : 'transparent',
            color: mainTab === 'products' ? '#ffffff' : 'var(--text-primary)',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <PackagePlus size={16} />
          <span>📦 Product Inventory</span>
        </button>

        <button
          onClick={() => setMainTab('tutorials')}
          style={{
            background: mainTab === 'tutorials' ? '#7B0505' : 'transparent',
            color: mainTab === 'tutorials' ? '#ffffff' : 'var(--text-primary)',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <GraduationCap size={16} />
          <span>🎓 Masterclass Courses & Tutorials</span>
        </button>
      </div>

      {/* PRODUCTS TAB CONTENT */}
      {mainTab === 'products' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
          
          {/* Left Warehouse Inventory Table */}
          <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
                📦 Live Catalog Stock Levels
              </h3>
              <button
                onClick={() => setActivePanel('add')}
                className="btn btn-rose btn-sm"
                style={{ fontWeight: 700, padding: '6px 14px' }}
              >
                <PackagePlus size={14} /> Add New Item
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 8px' }}>Product</th>
                  <th style={{ padding: '10px 8px' }}>SKU</th>
                  <th style={{ padding: '10px 8px' }}>Category</th>
                  <th style={{ padding: '10px 8px' }}>Stock</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const isSelected = selectedProductId === p.id;
                  const isLow = p.warehouseStock <= 15;

                  return (
                    <tr
                      key={p.id}
                      onClick={() => { setSelectedProductId(p.id); if(activePanel === 'add') setActivePanel('adjust'); }}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        background: isSelected ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <td style={{ padding: '12px 8px', fontWeight: 600, color: isSelected ? 'var(--color-amber-400)' : 'var(--text-primary)' }}>
                        {p.title}
                      </td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {p.sku}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span className="badge badge-amber" style={{ fontSize: '11px' }}>{p.category}</span>
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: 700, fontSize: '14px' }}>
                        {p.warehouseStock} units
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        {isLow ? (
                          <span className="badge badge-rose" style={{ fontSize: '11px' }}>Low Stock</span>
                        ) : (
                          <span className="badge badge-emerald" style={{ fontSize: '11px' }}>Optimal</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right Stock Adjuster & Add/Edit Forms & Audit Log */}
          <div>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setActivePanel('adjust')}
                style={{
                  flex: 1, padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: 'none',
                  background: activePanel === 'adjust' ? '#fdf2f8' : 'rgba(255, 255, 255, 0.05)',
                  color: activePanel === 'adjust' ? '#7B0505' : 'var(--text-secondary)'
                }}
              >
                <RefreshCw size={14} style={{ display: 'inline', marginRight: '4px' }} /> Adjust Stock
              </button>
              <button
                onClick={() => setActivePanel('edit')}
                disabled={!selectedProduct}
                style={{
                  flex: 1, padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: 'none',
                  background: activePanel === 'edit' ? '#f0f9ff' : 'rgba(255, 255, 255, 0.05)',
                  color: activePanel === 'edit' ? '#0284c7' : 'var(--text-secondary)',
                  opacity: selectedProduct ? 1 : 0.5
                }}
              >
                <Edit3 size={14} style={{ display: 'inline', marginRight: '4px' }} /> Edit Details
              </button>
            </div>

            {activePanel === 'adjust' && selectedProduct && (
              <div className="glass-panel animate-fade-in" style={{ padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RefreshCw size={16} color="var(--color-amber-400)" />
                  <span>Adjust Stock: {selectedProduct.title}</span>
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Adjustment Reason
                  </label>
                  <select
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="New batch warehouse intake">New batch warehouse intake</option>
                    <option value="Damaged goods write-off">Damaged goods write-off</option>
                    <option value="Physical audit count reconciliation">Physical audit count reconciliation</option>
                    <option value="Customer return restocked">Customer return restocked</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Quantity Delta
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(Number(e.target.value))}
                    style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button onClick={() => handleAdjustStock(false)} className="btn btn-secondary" style={{ borderColor: 'rgba(251, 113, 133, 0.4)', color: '#FB7185' }}>
                    <Minus size={14} /> Deduct {adjustAmount}
                  </button>
                  <button onClick={() => handleAdjustStock(true)} className="btn btn-primary">
                    <Plus size={14} /> Add +{adjustAmount}
                  </button>
                </div>
              </div>
            )}

            {(activePanel === 'edit' || activePanel === 'add') && (
              <div className="glass-panel animate-fade-in" style={{ padding: '24px', marginBottom: '24px', background: activePanel === 'edit' ? 'rgba(2, 132, 199, 0.03)' : 'rgba(123, 5, 5, 0.02)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {activePanel === 'edit' ? <Edit3 size={16} color="#0284c7" /> : <PackagePlus size={16} color="#7B0505" />}
                  <span>{activePanel === 'edit' ? `Edit Product: ${selectedProduct?.title}` : 'Add New Catalog Item'}</span>
                </h3>

                <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Product Title</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>SKU</label>
                      <input type="text" required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Category</label>
                      <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}>
                        <option value="Ingredients">Ingredients</option>
                        <option value="Tools">Tools</option>
                        <option value="Moulds">Moulds</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Bakery & Coffee">Bakery & Coffee</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Price (৳)</label>
                      <input type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    {activePanel === 'add' && (
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Initial Stock</label>
                        <input type="number" required min="0" value={formData.warehouseStock} onChange={e => setFormData({...formData, warehouseStock: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Short Description</label>
                    <textarea required rows={2} value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>

                  {/* Cloudinary Image Upload Component for Product */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 700 }}>
                      Product Image (Upload File or Enter URL)
                    </label>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="product-img-upload-input"
                        style={{ display: 'none' }}
                        onChange={handleProductImageUpload}
                      />
                      <label
                        htmlFor="product-img-upload-input"
                        className="btn btn-secondary btn-sm"
                        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '12px' }}
                      >
                        {isUploadingProductImg ? <Loader2 size={14} className="animate-spin" /> : <CloudUpload size={14} color="#7B0505" />}
                        <span>{isUploadingProductImg ? 'Uploading to Cloudinary...' : 'Upload Image via Cloudinary'}</span>
                      </label>
                    </div>

                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... or uploaded Cloudinary URL"
                      value={formData.imageUrl}
                      onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                      style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
                    />

                    {formData.imageUrl && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={formData.imageUrl} alt="Preview" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(123, 5, 5, 0.2)' }} />
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Image Preview Active</span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <button type="submit" className={activePanel === 'edit' ? "btn btn-primary" : "btn btn-rose"} style={{ width: '100%', padding: '10px' }}>
                      <Save size={16} /> {activePanel === 'edit' ? 'Save Changes' : 'Create Product'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={16} color="#22D3EE" />
                <span>Immutable Audit Logs</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                {auditLogs.map(log => (
                  <div
                    key={log.id}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--glass-border)',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700 }}>{log.productTitle}</span>
                      <span style={{ color: log.changeAmount > 0 ? '#34D399' : log.changeAmount < 0 ? '#FB7185' : '#0284c7', fontWeight: 800 }}>
                        {log.changeAmount > 0 ? `+${log.changeAmount}` : log.changeAmount < 0 ? log.changeAmount : 'New Item'} {log.changeAmount !== 0 ? 'units' : ''}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>{log.reason}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '11px' }}>
                      <span>By: {log.adjustedBy}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* MASTERCLASS TUTORIALS TAB CONTENT */}
      {mainTab === 'tutorials' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
          
          {/* Left Tutorials List Table */}
          <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={18} color="#7B0505" /> Live Masterclass Courses ({tutorials.length})
              </h3>
              <button
                onClick={() => setTutorialPanel('add')}
                className="btn btn-rose btn-sm"
                style={{ fontWeight: 700, padding: '6px 14px' }}
              >
                <Plus size={14} /> Add New Course
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 8px' }}>Course Title</th>
                  <th style={{ padding: '10px 8px' }}>Category</th>
                  <th style={{ padding: '10px 8px' }}>Skill Level</th>
                  <th style={{ padding: '10px 8px' }}>Price</th>
                  <th style={{ padding: '10px 8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {tutorials.map(t => {
                  const isSelected = selectedTutorialId === t.id;

                  return (
                    <tr
                      key={t.id}
                      onClick={() => { setSelectedTutorialId(t.id); setTutorialPanel('edit'); }}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        background: isSelected ? 'rgba(2, 132, 199, 0.1)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <td style={{ padding: '12px 8px', fontWeight: 700, color: isSelected ? '#0284c7' : 'var(--text-primary)' }}>
                        {t.title}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span className="badge badge-amber" style={{ fontSize: '11px' }}>{t.category}</span>
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>
                        {t.skillLevel}
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: 800 }}>
                        ৳ {t.price?.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
                          <Edit3 size={12} /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right Add / Edit Tutorial Form */}
          <div>
            <div className="glass-panel animate-fade-in" style={{ padding: '24px', background: tutorialPanel === 'edit' ? 'rgba(2, 132, 199, 0.03)' : 'rgba(123, 5, 5, 0.02)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {tutorialPanel === 'edit' ? <Edit3 size={18} color="#0284c7" /> : <Plus size={18} color="#7B0505" />}
                <span>{tutorialPanel === 'edit' ? `Edit Course: ${selectedTutorial?.title}` : 'Add New Masterclass Course'}</span>
              </h3>

              <form onSubmit={handleSaveTutorial} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Course Title</label>
                  <input type="text" required placeholder="e.g. Sourdough & Croissant Masterclass" value={tutorialFormData.title} onChange={e => setTutorialFormData({...tutorialFormData, title: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Category</label>
                    <input type="text" required placeholder="Cakes & Pastry" value={tutorialFormData.category} onChange={e => setTutorialFormData({...tutorialFormData, category: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Skill Level</label>
                    <select required value={tutorialFormData.skillLevel} onChange={e => setTutorialFormData({...tutorialFormData, skillLevel: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Professional">Professional</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Price (৳)</label>
                    <input type="number" required min="0" value={tutorialFormData.price} onChange={e => setTutorialFormData({...tutorialFormData, price: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Duration (Minutes)</label>
                    <input type="number" required min="1" value={tutorialFormData.durationMinutes} onChange={e => setTutorialFormData({...tutorialFormData, durationMinutes: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Instructor Name</label>
                    <input type="text" required value={tutorialFormData.instructorName} onChange={e => setTutorialFormData({...tutorialFormData, instructorName: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Instructor Bio</label>
                    <input type="text" required value={tutorialFormData.instructorBio} onChange={e => setTutorialFormData({...tutorialFormData, instructorBio: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Description</label>
                  <textarea required rows={3} value={tutorialFormData.description} onChange={e => setTutorialFormData({...tutorialFormData, description: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                </div>

                {/* Cloudinary Upload for Masterclass Thumbnail */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Course Thumbnail Image (Upload File or Enter URL)
                  </label>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="tutorial-img-upload-input"
                      style={{ display: 'none' }}
                      onChange={handleTutorialImageUpload}
                    />
                    <label
                      htmlFor="tutorial-img-upload-input"
                      className="btn btn-secondary btn-sm"
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '12px' }}
                    >
                      {isUploadingTutorialImg ? <Loader2 size={14} className="animate-spin" /> : <CloudUpload size={14} color="#7B0505" />}
                      <span>{isUploadingTutorialImg ? 'Uploading to Cloudinary...' : 'Upload Thumbnail via Cloudinary'}</span>
                    </label>
                  </div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or Cloudinary URL"
                    value={tutorialFormData.thumbnail}
                    onChange={e => setTutorialFormData({...tutorialFormData, thumbnail: e.target.value})}
                    style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }}
                  />

                  {tutorialFormData.thumbnail && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={tutorialFormData.thumbnail} alt="Thumbnail Preview" style={{ width: '60px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(123, 5, 5, 0.2)' }} />
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Thumbnail Preview Active</span>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Video MP4 URL</label>
                  <input type="url" placeholder="https://commondatastorage.googleapis.com/..." value={tutorialFormData.videoUrl} onChange={e => setTutorialFormData({...tutorialFormData, videoUrl: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '9px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button type="submit" className={tutorialPanel === 'edit' ? "btn btn-primary" : "btn btn-rose"} style={{ width: '100%', padding: '12px', fontWeight: 800 }}>
                    <Save size={16} /> {tutorialPanel === 'edit' ? 'Save Course Changes' : 'Publish Masterclass Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default WarehouseAdminHub;
