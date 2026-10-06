import React, { useState, useEffect } from 'react';
import { Video, Plus, Check, Lock, Edit3, Save, List } from 'lucide-react';
import { fetchTutorials, createTutorial, updateTutorial } from '../services/api';

export function MasterclassAdminHub() {
  const [tutorials, setTutorials] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [category, setCategory] = useState('Cakes');
  const [price, setPrice] = useState(0);
  const [requiredSubscriptionTier, setRequiredSubscriptionTier] = useState('Free');
  const [successToast, setSuccessToast] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchTutorials();
      setTutorials(data);
    }
    load();
  }, []);

  const handleSelectVideo = (tut) => {
    setSelectedVideoId(tut.id || tut._id);
    setTitle(tut.title || '');
    setDescription(tut.description || '');
    setVideoUrl(tut.videoUrl || '');
    setSkillLevel(tut.skillLevel || 'Beginner');
    setCategory(tut.category || 'Cakes');
    setPrice(tut.price || 0);
    setRequiredSubscriptionTier(tut.requiredSubscriptionTier || 'Free');
  };

  const handleAddNewClick = () => {
    setSelectedVideoId(null);
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setSkillLevel('Beginner');
    setCategory('Cakes');
    setPrice(0);
    setRequiredSubscriptionTier('Free');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, videoUrl, skillLevel, category, price, requiredSubscriptionTier };
    
    try {
      if (selectedVideoId) {
        // Call backend API to update
        await updateTutorial(selectedVideoId, payload);
        
        // Update local state
        setTutorials(tutorials.map(t => (t.id === selectedVideoId || t._id === selectedVideoId) ? { ...t, ...payload } : t));
        setSuccessToast(`Video '${title}' updated successfully!`);
      } else {
        // Call backend API to create
        const response = await createTutorial(payload);
        
        // Update local state with the newly created ID from the backend (fallback to local ID if mock)
        const newTut = { ...payload, id: response?.id || response?._id || 'tut_' + Date.now() };
        setTutorials([newTut, ...tutorials]);
        setSuccessToast(`Video '${title}' added successfully!`);
        handleAddNewClick(); // Reset form
      }
    } catch (error) {
      console.error("Failed to save tutorial:", error);
      alert("Error saving to backend: " + error.message);
    }
    
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '10px' }}>
            <Video size={13} color="#3B82F6" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B82F6' }}>Video Management Console</span>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Masterclass Admin Hub</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Manage existing masterclasses, update video URLs, and configure subscription access levels.</p>
        </div>

        {successToast && (
          <div className="badge badge-emerald animate-fade-in" style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Check size={16} />
            <span>{successToast}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Left Side: Video List Table */}
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto', alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <List size={18} color="var(--color-primary-500)" />
              Existing Videos
            </h3>
            <button onClick={handleAddNewClick} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Plus size={14} /> Add New
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 8px' }}>Title</th>
                <th style={{ padding: '10px 8px' }}>Category</th>
                <th style={{ padding: '10px 8px' }}>Access</th>
                <th style={{ padding: '10px 8px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map(tut => {
                const id = tut.id || tut._id;
                const isSelected = selectedVideoId === id;

                return (
                  <tr
                    key={id}
                    onClick={() => handleSelectVideo(tut)}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: isSelected ? '#3B82F6' : 'var(--text-primary)' }}>
                      {tut.title}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <span className="badge badge-amber" style={{ fontSize: '11px' }}>{tut.category}</span>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      {tut.requiredSubscriptionTier === 'Free' ? (
                        <span className="badge badge-emerald" style={{ fontSize: '11px' }}>Free</span>
                      ) : (
                        <span className="badge badge-rose" style={{ fontSize: '11px' }}>
                          <Lock size={10} style={{ marginRight: '2px' }} /> {tut.requiredSubscriptionTier}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <button className="btn btn-sm" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
                        <Edit3 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {tutorials.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No videos found. Click 'Add New' to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right Side: Add/Edit Video Form */}
        <div className="glass-panel" style={{ padding: '32px', alignSelf: 'start' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {selectedVideoId ? (
              <><Edit3 size={20} color="#3B82F6" /> Edit Video Details</>
            ) : (
              <><Plus size={20} color="var(--color-primary-500)" /> Add New Video</>
            )}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Video Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master Artisan Sourdough Bread"
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                YouTube Video URL (Public)
              </label>
              <input
                type="url"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=..."
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Description
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of what students will learn..."
                rows={4}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Skill Level
                </label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                >
                  <option value="Cakes">Cakes</option>
                  <option value="Cakes & Pastry">Cakes & Pastry</option>
                  <option value="Breads">Breads</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Techniques">Techniques</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Price (৳) - 0 for Free
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={12} color="#7B0505" /> Required Subscription
                </label>
                <select
                  value={requiredSubscriptionTier}
                  onChange={(e) => setRequiredSubscriptionTier(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                >
                  <option value="Free">Free (No Login Required)</option>
                  <option value="Basic">Basic Plan</option>
                  <option value="Premium">Premium Plan</option>
                  <option value="Pro">Pro / Master Plan</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className={selectedVideoId ? "btn btn-secondary" : "btn btn-primary"}
              style={{ padding: '14px', fontSize: '15px', marginTop: '10px', borderColor: selectedVideoId ? '#3B82F6' : undefined, color: selectedVideoId ? '#3B82F6' : undefined }}
            >
              {selectedVideoId ? <><Save size={18} /> Update Video Details</> : <><Plus size={18} /> Save Video to Database</>}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
