import React, { useState, useRef } from 'react';
import { Play, Clock, User, CheckCircle, Lock, Sparkles, BookOpen, Star } from 'lucide-react';
import { INITIAL_TUTORIALS } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export function MasterclassHub() {
  const [selectedTutorial, setSelectedTutorial] = useState(INITIAL_TUTORIALS[0]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const videoRef = useRef(null);
  const { user, isAuthenticated, openAuthModal } = useAuthStore();

  const isSubscribed = user?.subscription?.isActive && user?.subscription?.tier !== 'FreeLearner';

  const handleSeekChapter = (chapter, index) => {
    setActiveChapterIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = chapter.timestampSeconds;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px 24px' }}>
      
      {/* Hub Title Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(34, 211, 238, 0.12)', border: '1px solid rgba(34, 211, 238, 0.3)', marginBottom: '12px' }}>
          <Sparkles size={13} color="#22D3EE" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#22D3EE' }}>Nexus Video Masterclasses</span>
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Culinary Academy & Video Guides</h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Master artisan sourdough, Italian meringue macarons, and palette knife floral cake decorating.</p>
      </div>

      {/* Main Video & Chapters Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr', gap: '32px', marginBottom: '48px' }}>
        
        {/* Left Video Player & Info */}
        <div>
          <div className="glass-card" style={{ overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
            <video
              ref={videoRef}
              src={selectedTutorial.videoUrl}
              poster={selectedTutorial.thumbnail}
              controls
              style={{ width: '100%', maxHeight: '440px', background: '#000', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-amber">{selectedTutorial.category}</span>
            <span className="badge badge-cyan">{selectedTutorial.skillLevel}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <Clock size={13} /> {selectedTutorial.durationMinutes} Minutes
            </span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px' }}>
            {selectedTutorial.title}
          </h1>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            {selectedTutorial.description}
          </p>

          {/* Instructor Bio */}
          <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255, 255, 255, 0.03)' }}>
            <img
              src={selectedTutorial.instructor.avatarUrl}
              alt={selectedTutorial.instructor.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-amber-500)' }}
            />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>{selectedTutorial.instructor.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{selectedTutorial.instructor.bio}</div>
            </div>
          </div>
        </div>

        {/* Right Clickable Chapter Navigator & Ingredients */}
        <div>
          
          {/* Chapters Panel */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="var(--color-amber-400)" />
                <span>Video Chapters (Click to Jump)</span>
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedTutorial.chapters.length} Chapters</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedTutorial.chapters.map((chapter, idx) => {
                const isActive = activeChapterIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSeekChapter(chapter, idx)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: isActive ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid var(--color-amber-500)' : '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Play size={14} color={isActive ? '#F59E0B' : 'var(--text-muted)'} fill={isActive ? '#F59E0B' : 'none'} />
                      <span style={{ fontSize: '13px', fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'var(--text-secondary)' }}>
                        {chapter.title}
                      </span>
                    </div>

                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-amber-400)', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px' }}>
                      {chapter.timestampDisplay}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ingredient Checklist */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>
              📋 Required Recipe Ingredients
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedTutorial.ingredients.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={15} color="var(--color-emerald-400)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Other Masterclass Library Items */}
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>More Masterclasses</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {INITIAL_TUTORIALS.map(t => (
            <div
              key={t.id}
              className="glass-card glass-card-interactive"
              onClick={() => { setSelectedTutorial(t); setActiveChapterIndex(0); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                cursor: 'pointer',
                borderColor: selectedTutorial.id === t.id ? 'var(--color-amber-500)' : undefined
              }}
            >
              <div style={{ position: 'relative', height: '180px' }}>
                <img
                  src={t.thumbnail}
                  alt={t.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                  {t.durationMinutes} mins
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '11px' }}>{t.category}</span>
                  <span className="badge badge-cyan" style={{ fontSize: '11px' }}>{t.skillLevel}</span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{t.title}</h4>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Instructor: {t.instructor.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
