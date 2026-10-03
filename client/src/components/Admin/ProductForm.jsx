import React, { useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import './AdminForms.css';

export const ProductForm = ({ mode = 'add', initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'Electronics',
    subCategory: initialData?.subCategory || '',
    price: initialData?.price || '',
    warehouseStock: initialData?.warehouseStock || '',
    description: initialData?.description || ''
  });
  const [imagePreview, setImagePreview] = useState(initialData?.images?.[0]?.url || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="admin-form-header">
        <h2>{mode === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="admin-form-container">
        
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input name="title" className="glass-input" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" className="glass-input glass-select" value={formData.category} onChange={handleInputChange}>
                <option value="Electronics">Electronics</option>
                <option value="Bakery Tools">Bakery Tools</option>
                <option value="Ingredients">Ingredients</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sub Category</label>
              <input name="subCategory" className="glass-input" value={formData.subCategory} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Pricing & Inventory</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Price (BDT)</label>
              <input type="number" name="price" className="glass-input" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Warehouse Stock</label>
              <input type="number" name="warehouseStock" className="glass-input" value={formData.warehouseStock} onChange={handleInputChange} required />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Details</h3>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" className="glass-input glass-textarea" rows="4" value={formData.description} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <h3>Media</h3>
          <div className="media-upload-zone">
            <input type="file" id="productImage" accept="image/*" onChange={handleImageChange} hidden />
            <label htmlFor="productImage" className="upload-label">
              {imagePreview ? (
                <div className="preview-container">
                  <img src={imagePreview} alt="Preview" className="media-preview" />
                  <div className="preview-overlay"><span>Change Image</span></div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <UploadCloud size={48} />
                  <p>Drag & drop or click to upload Product Image</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="animate-spin" /> Saving...</> : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};
