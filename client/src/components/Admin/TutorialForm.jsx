import React, { useState } from 'react';
import { UploadCloud, Loader2, Film } from 'lucide-react';
import './AdminForms.css';

export const TutorialForm = ({ mode = 'add', initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'Pastry & Macarons',
    skillLevel: initialData?.skillLevel || 'Beginner',
    durationMinutes: initialData?.durationMinutes || '',
    instructorName: initialData?.instructor?.name || '',
    description: initialData?.description || ''
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(initialData?.thumbnail || null);
  const [videoFile, setVideoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, thumbnailFile: file }));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setFormData(prev => ({ ...prev, videoFile: file }));
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
        <h2>{mode === 'add' ? 'Add New Tutorial' : 'Edit Tutorial'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="admin-form-container">
        
        <div className="form-section">
          <h3>Metadata</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input name="title" className="glass-input" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" className="glass-input glass-select" value={formData.category} onChange={handleInputChange}>
                <option value="Pastry & Macarons">Pastry & Macarons</option>
                <option value="Bread Making">Bread Making</option>
                <option value="Cake Decorating">Cake Decorating</option>
              </select>
            </div>
            <div className="form-group">
              <label>Skill Level</label>
              <select name="skillLevel" className="glass-input glass-select" value={formData.skillLevel} onChange={handleInputChange}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duration (Minutes)</label>
              <input type="number" name="durationMinutes" className="glass-input" value={formData.durationMinutes} onChange={handleInputChange} required />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Instructor Details</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Instructor Name</label>
              <input name="instructorName" className="glass-input" value={formData.instructorName} onChange={handleInputChange} required />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Content</h3>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" className="glass-input glass-textarea" rows="4" value={formData.description} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-section">
          <h3>Media</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Video Thumbnail</label>
              <div className="media-upload-zone">
                <input type="file" id="thumbnailImage" accept="image/*" onChange={handleThumbnailChange} hidden />
                <label htmlFor="thumbnailImage" className="upload-label">
                  {thumbnailPreview ? (
                    <div className="preview-container">
                      <img src={thumbnailPreview} alt="Preview" className="media-preview" />
                      <div className="preview-overlay"><span>Change Thumbnail</span></div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <UploadCloud size={32} />
                      <p style={{fontSize: '0.85rem'}}>Upload Thumbnail Image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Masterclass Video File</label>
              <div className="media-upload-zone">
                <input type="file" id="videoFile" accept="video/*" onChange={handleVideoChange} hidden />
                <label htmlFor="videoFile" className="upload-label">
                  {videoFile ? (
                    <div className="preview-container" style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', background:'rgba(96, 165, 250, 0.1)'}}>
                      <Film size={48} color="#60a5fa" />
                      <span style={{marginTop: '0.5rem', color: '#60a5fa', fontWeight: 'bold'}}>{videoFile.name}</span>
                      <div className="preview-overlay"><span>Change Video</span></div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <Film size={32} />
                      <p style={{fontSize: '0.85rem'}}>Upload Video File</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="animate-spin" /> Saving...</> : 'Save Tutorial'}
          </button>
        </div>
      </form>
    </div>
  );
};
