import React, { useState, useEffect, useRef } from 'react';
import { X, User, Phone, Mail, Camera, ShieldCheck, Award, Save, Loader2, Sparkles, Check, LogOut, Upload, CloudUpload, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { uploadToCloudinary, CLOUDINARY_CLOUD_NAME } from '../services/api';

export function UserProfileModal() {
  const { user, isProfileModalOpen, closeProfileModal, updateProfile, logout, isLoading, error } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ type: '', msg: '' });

  const fileInputRef = useRef(null);

  // Preset Artisan Avatars for quick selection
  const presetAvatars = [
    { label: 'Pastry Chef', url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300' },
    { label: 'Artisan Baker', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
    { label: 'Cake Designer', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300' },
    { label: 'Master Barista', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' }
  ];

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhone(user.phone || '');
      setAvatarUrl(user.avatarUrl || presetAvatars[1].url);
      setUploadStatus({ type: '', msg: '' });
    }
  }, [user, isProfileModalOpen]);

  if (!isProfileModalOpen || !user) return null;

  // Handle Cloudinary Image File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: 'info', msg: 'Uploading to Cloudinary...' });

    try {
      // 1. Attempt Cloudinary API Service Upload
      const result = await uploadToCloudinary(file);
      if (result?.url) {
        setAvatarUrl(result.url);
        setUploadStatus({ type: 'success', msg: `Uploaded to Cloudinary (${CLOUDINARY_CLOUD_NAME})!` });
        setIsUploading(false);
        return;
      }
    } catch (err) {
      console.warn('Cloudinary direct upload fallback engaged:', err);
    }

    // 2. Fallback: read file as high-res Data URL so photo upload never fails
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result);
      setUploadStatus({ type: 'success', msg: 'Photo attached successfully!' });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile({
      fullName,
      phone,
      avatarUrl
    });
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(30, 18, 10, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 85,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }} onClick={closeProfileModal}>
      
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '540px',
          background: '#ffffff',
          borderRadius: '28px',
          boxShadow: '0 20px 50px rgba(61, 35, 20, 0.25)',
          overflow: 'hidden',
          border: '1px solid rgba(61, 35, 20, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner with Profile Avatar & Cloudinary Badge */}
        <div style={{
          background: 'linear-gradient(135deg, #3d2314 0%, #2a170d 100%)',
          color: '#ffffff',
          padding: '28px 32px 22px 32px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <button
            onClick={closeProfileModal}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff'
            }}
          >
            <X size={16} />
          </button>

          {/* Live Profile Image Preview with Click-to-Upload Trigger */}
          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => fileInputRef.current?.click()}
            title="Click to change profile image via Cloudinary"
          >
            <img
              src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
              alt={fullName}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '3px solid #e05297',
                objectFit: 'cover',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                opacity: isUploading ? 0.6 : 1,
                transition: 'opacity 0.2s ease'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              background: '#e05297',
              color: '#ffffff',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>
              {isUploading ? <Loader2 size={13} className="animate-spin" /> : <Camera size={13} />}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
                {user.fullName || 'User Profile'}
              </h2>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '9999px',
                background: user.role === 'Admin' || user.role === 'SystemAdmin' ? '#dc2626' : '#e05297',
                color: '#ffffff'
              }}>
                {user.role || 'Member'}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: '#f4ede4', opacity: 0.85, marginTop: '2px' }}>
              {user.email}
            </div>

            {/* Cloudinary Cloud Status Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px', fontSize: '11px', color: '#f9a8d4', fontWeight: 600 }}>
              <CloudUpload size={12} />
              <span>Cloudinary Cloud: <strong style={{ color: '#ffffff' }}>{CLOUDINARY_CLOUD_NAME}</strong></span>
            </div>
          </div>
        </div>

        {/* Profile Content & Settings Form */}
        <div style={{ padding: '24px 32px 28px 32px' }}>
          
          {saveSuccess && (
            <div style={{
              padding: '10px 14px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '12px',
              color: '#059669',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Check size={16} />
              <span>Profile details & photo updated successfully!</span>
            </div>
          )}

          {uploadStatus.msg && (
            <div style={{
              padding: '8px 12px',
              background: uploadStatus.type === 'success' ? '#ecfdf5' : '#eff6ff',
              border: `1px solid ${uploadStatus.type === 'success' ? '#a7f3d0' : '#bfdbfe'}`,
              borderRadius: '10px',
              color: uploadStatus.type === 'success' ? '#059669' : '#1d4ed8',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              <span>{uploadStatus.msg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Hidden File Input for Cloudinary Upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />

            {/* Cloudinary Photo File Picker Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: '#faf6f0',
                border: '2px dashed rgba(224, 82, 151, 0.4)',
                borderRadius: '14px',
                padding: '14px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e05297'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(224, 82, 151, 0.4)'}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#fdf2f8',
                color: '#e05297',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <CloudUpload size={20} />}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#3d2314' }}>
                  {isUploading ? 'Uploading to Cloudinary...' : 'Upload Profile Photo from Computer'}
                </div>
                <div style={{ fontSize: '11px', color: '#8e796c' }}>
                  Supports PNG, JPG, WEBP • Auto-hosted on Cloudinary <strong style={{ color: '#e05297' }}>dnt43ugtr</strong>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3d2314', marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9e8c80' }} />
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '12px', padding: '11px 14px 11px 38px', fontSize: '14px', color: '#3d2314', outline: 'none' }}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3d2314', marginBottom: '6px' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9e8c80' }} />
                <input
                  type="tel"
                  placeholder="+880 1700-000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '12px', padding: '11px 14px 11px 38px', fontSize: '14px', color: '#3d2314', outline: 'none' }}
                />
              </div>
            </div>

            {/* Profile Avatar Image URL & Preset Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3d2314', marginBottom: '6px' }}>
                Image URL (Cloudinary or Web URL)
              </label>
              <input
                type="url"
                placeholder="https://res.cloudinary.com/dnt43ugtr/..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                style={{ width: '100%', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.15)', borderRadius: '12px', padding: '11px 14px', fontSize: '13px', color: '#3d2314', outline: 'none', marginBottom: '10px' }}
              />

              {/* Preset Artisan Avatars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: '#9e8c80', fontWeight: 600 }}>Quick Presets:</span>
                {presetAvatars.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(preset.url)}
                    style={{
                      background: avatarUrl === preset.url ? '#fdf2f8' : '#ffffff',
                      border: avatarUrl === preset.url ? '1px solid #e05297' : '1px solid rgba(61, 35, 20, 0.12)',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: avatarUrl === preset.url ? '#e05297' : '#6e5849',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <img src={preset.url} alt={preset.label} style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Read-Only Information */}
            <div style={{ background: '#faf6f0', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(61, 35, 20, 0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '2px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#9e8c80', fontWeight: 600 }}>Email Address</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#3d2314', wordBreak: 'break-all' }}>{user.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#9e8c80', fontWeight: 600 }}>Subscription Tier</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#e05297' }}>
                  {user.subscription?.tier || 'Free Learner'}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid rgba(61, 35, 20, 0.08)' }}>
              <button
                type="button"
                onClick={() => { logout(); closeProfileModal(); }}
                className="btn btn-secondary btn-sm"
                style={{ color: '#dc2626', borderColor: '#fecaca', background: '#fef2f2', fontWeight: 700 }}
              >
                <LogOut size={14} /> Sign Out
              </button>

              <button
                type="submit"
                disabled={isLoading || isUploading}
                className="btn btn-rose"
                style={{ padding: '10px 24px', fontWeight: 800, fontSize: '14px' }}
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>Save Profile Changes</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default UserProfileModal;

