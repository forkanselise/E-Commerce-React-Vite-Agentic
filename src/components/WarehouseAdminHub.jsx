import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw, Plus, Minus, History, Check, Edit3, Save, PackagePlus } from 'lucide-react';
import { INITIAL_PRODUCTS, createProduct, updateProduct, fetchProducts } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export function WarehouseAdminHub() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activePanel, setActivePanel] = useState('adjust'); // 'adjust', 'edit', 'add'
  
  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      if (data && data.length > 0) {
        setProducts(data);
        setSelectedProductId(prev => prev || data[0]?.id);
      }
    }
    loadProducts();
  }, []);
  
  const [adjustAmount, setAdjustAmount] = useState(10);
  const [adjustReason, setAdjustReason] = useState('New batch warehouse intake');
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

  const { user } = useAuthStore();

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    category: 'Ingredients',
    price: 0,
    warehouseStock: 0,
    shortDescription: '',
    imageUrl: ''
  });

  // Sync edit form with selected product
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

  const handleAdjustStock = async (isIncrement) => {
    const current = products.find(p => p.id === selectedProductId);
    if (!current) return;

    const isMock = typeof selectedProductId === 'string' && 
      (selectedProductId.startsWith('prod_') || selectedProductId.startsWith('bakery_') || selectedProductId.startsWith('tool_'));

    if (isMock) {
      alert("⚠️ This is a hardcoded mock item used for the UI preview. Mock items do not exist in the database and cannot be updated in DB.\n\nPlease 'Add' a new item first, and adjust stock for that database item!");
      return;
    }

    const delta = isIncrement ? adjustAmount : -adjustAmount;
    const newStock = Math.max(0, current.warehouseStock + delta);

    try {
      await updateProduct(selectedProductId, {
        ...current,
        warehouseStock: newStock
      });
    } catch (err) {
      alert("❌ Backend API Error on Stock Adjustment: " + err.message + "\n\nStock update failed on database.");
      console.error('API stock adjustment failed:', err);
      return; // Halt execution, do not update UI locally
    }

    // Update Product Stock locally after DB update succeeds
    setProducts(products.map(p => p.id === selectedProductId ? { ...p, warehouseStock: newStock } : p));

    // Append Audit Log
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
        alert("❌ Backend API Error: " + err.message + "\n\nThe database rejected the save. Check backend logs.");
        console.error('API create product failed:', err);
        return; // Halt execution, do not update UI locally
      }

      // Merge the MongoDB ObjectId with the payload data so the UI displays it correctly
      const newProduct = { ...newProductPayload, id: createdProduct.id };

      setProducts([newProduct, ...products]);
      setSuccessToast(`Product '${newProduct.title}' added successfully to the database!`);
      setSelectedProductId(newProduct.id);
      setActivePanel('adjust');
      
      const newLog = {
        id: 'log_' + Date.now(),
        productTitle: newProduct.title,
        previousStock: 0,
        newStock: newProduct.warehouseStock,
        changeAmount: newProduct.warehouseStock,
        reason: 'Initial Product Creation',
        adjustedBy: user?.fullName || 'Store Admin',
        timestamp: 'Just now'
      };
      setAuditLogs([newLog, ...auditLogs]);
      
    } else if (activePanel === 'edit') {
      
      const isMock = typeof selectedProductId === 'string' && 
        (selectedProductId.startsWith('prod_') || selectedProductId.startsWith('bakery_') || selectedProductId.startsWith('tool_'));

      if (isMock) {
        alert("⚠️ This is a hardcoded mock item used for the UI preview. Mock items do not exist in the database and cannot be saved.\n\nPlease 'Add' a new item first, and then edit that item to test the database!");
        return; // Halt execution
      }

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
        return; // Halt execution
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

      // Re-fetch fresh dataset from DB after 204 No Content success
      const refreshed = await fetchProducts();
      if (refreshed && refreshed.length > 0) {
        setProducts(refreshed);
      }

      setSuccessToast(`Product '${formData.title}' updated successfully in DB!`);
      setActivePanel('adjust');
    }
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(251, 113, 133, 0.12)', border: '1px solid rgba(251, 113, 133, 0.3)', marginBottom: '10px' }}>
            <ShieldCheck size={13} color="#FB7185" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FB7185' }}>Admin & Ops Console</span>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Warehouse Inventory & Audit Logs</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Manage stock levels, edit product details, and add new items to catalog.</p>
        </div>

        {successToast && (
          <div className="badge badge-emerald animate-fade-in" style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Check size={16} />
            <span>{successToast}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
        
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
          
          {/* Top Panel Switcher */}
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

          {/* Dynamic Panel Content */}
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

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Image URL</label>
                  <input type="url" placeholder="https://images.unsplash.com/..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} style={{ width: '100%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none' }} />
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button type="submit" className={activePanel === 'edit' ? "btn btn-primary" : "btn btn-rose"} style={{ width: '100%', padding: '10px' }}>
                    <Save size={16} /> {activePanel === 'edit' ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Real-time Audit History */}
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

    </div>
  );
}

export default WarehouseAdminHub;
