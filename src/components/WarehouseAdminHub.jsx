import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw, Plus, Minus, History, Check } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export function WarehouseAdminHub() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id);
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

  const handleAdjustStock = (isIncrement) => {
    const current = products.find(p => p.id === selectedProductId);
    if (!current) return;

    const delta = isIncrement ? adjustAmount : -adjustAmount;
    const newStock = Math.max(0, current.warehouseStock + delta);

    // Update Product Stock
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

    setSuccessToast(`Adjusted '${current.title}' to ${newStock} units.`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

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
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Manage stock levels, inspect audit trails, and trigger inventory replenishment.</p>
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
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
            📦 Live Catalog Stock Levels
          </h3>

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
                    onClick={() => setSelectedProductId(p.id)}
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

        {/* Right Stock Adjuster & Audit Log */}
        <div>
          
          {/* Quick Adjuster Form */}
          {selectedProduct && (
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
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
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
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
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={() => handleAdjustStock(false)}
                  className="btn btn-secondary"
                  style={{ borderColor: 'rgba(251, 113, 133, 0.4)', color: '#FB7185' }}
                >
                  <Minus size={14} /> Deduct {adjustAmount}
                </button>

                <button
                  onClick={() => handleAdjustStock(true)}
                  className="btn btn-primary"
                >
                  <Plus size={14} /> Add +{adjustAmount}
                </button>
              </div>
            </div>
          )}

          {/* Real-time Audit History */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={16} color="#22D3EE" />
              <span>Immutable Audit Logs</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    <span style={{ color: log.changeAmount > 0 ? '#34D399' : '#FB7185', fontWeight: 800 }}>
                      {log.changeAmount > 0 ? `+${log.changeAmount}` : log.changeAmount} units
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
