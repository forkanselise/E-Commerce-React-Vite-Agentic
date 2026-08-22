import React, { useState, useEffect, useRef } from 'react';
import { Play, Clock, User, CheckCircle, Lock, Sparkles, BookOpen, Star, Award, GraduationCap } from 'lucide-react';
import { fetchTutorials } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export function MasterclassHub() {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const videoRef = useRef(null);
  const { user } = useAuthStore();

  useEffect(() => {
    async function loadAcademy() {
      const data = await fetchTutorials();
      setTutorials(data);
      if (data && data.length > 0) {
        setSelectedTutorial(data[0]);
      }
    }
    loadAcademy();
  }, []);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Professional', 'Workshop'];

  const filteredTutorials = tutorials.filter(t => {
    if (selectedLevel === 'All') return true;
    return t.skillLevel === selectedLevel || t.category?.includes(selectedLevel);
  });

  const handleSeekChapter = (chapter, index) => {
    setActiveChapterIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = chapter.timestampSeconds;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div style={{ background: '#faf6f0', padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Title Header (Matching Mockup Section 05 Academy Page) */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: '#fdf2f8', border: '1px solid #f472b6', marginBottom: '14px' }}>
            <GraduationCap size={14} color="#e05297" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#e05297' }}>Smart Bakery Academy</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#3d2314', fontFamily: 'var(--font-heading)' }}>
            Baking Classes For All Skill Levels
          </h1>
          <p style={{ fontSize: '15px', color: '#6e5849' }}>
            Learn step-by-step from executive pastry chefs. Professional video courses, ingredient science & hands-on certificates.
          </p>
        </div>

        {/* Skill Level Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {levels.map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                background: selectedLevel === lvl ? '#3d2314' : '#ffffff',
                color: selectedLevel === lvl ? '#ffffff' : '#3d2314',
                border: '1px solid rgba(61, 35, 20, 0.1)',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedLevel === lvl ? '0 4px 12px rgba(61, 35, 20, 0.2)' : 'none'
              }}
            >
              {lvl === 'All' ? 'All Courses' : lvl}
            </button>
          ))}
        </div>

        {/* Selected Course Player & Chapters Showcase (Matching Mockup Section 06) */}
        {selectedTutorial && (
          <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr', gap: '32px', marginBottom: '48px' }}>
            
            {/* Left Video Player & Instructor Bio */}
            <div>
              <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', background: '#000', border: '1px solid rgba(61, 35, 20, 0.15)', boxShadow: '0 8px 25px rgba(61, 35, 20, 0.1)' }}>
                <video
                  ref={videoRef}
                  src={selectedTutorial.videoUrl}
                  poster={selectedTutorial.thumbnail}
                  controls
                  style={{ width: '100%', maxHeight: '420px', display: 'block' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', background: '#e05297', color: '#ffffff', borderRadius: '9999px' }}>
                  {selectedTutorial.category}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', background: '#3d2314', color: '#fcd34d', borderRadius: '9999px' }}>
                  {selectedTutorial.skillLevel} Level
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6e5849', fontWeight: 600 }}>
                  <Clock size={14} /> {selectedTutorial.durationMinutes} Mins
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#3d2314' }}>
                  {selectedTutorial.title}
                </h2>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#e05297' }}>
                  ৳ {selectedTutorial.price?.toLocaleString()}
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#6e5849', lineHeight: 1.6, marginBottom: '20px' }}>
                {selectedTutorial.description}
              </p>

              {/* Instructor Bio Box */}
              <div style={{ padding: '16px 20px', borderRadius: '16px', background: '#ffffff', border: '1px solid rgba(61, 35, 20, 0.08)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={selectedTutorial.instructor?.avatarUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150'}
                  alt={selectedTutorial.instructor?.name}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e05297' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#3d2314' }}>{selectedTutorial.instructor?.name}</div>
                  <div style={{ fontSize: '12px', color: '#6e5849' }}>{selectedTutorial.instructor?.bio}</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Chapters & Recipe Ingredients */}
            <div>
              
              {/* Chapters Box */}
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid rgba(61, 35, 20, 0.08)', boxShadow: '0 4px 14px rgba(61, 35, 20, 0.04)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3d2314', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16} color="#e05297" />
                    <span>Course Chapters</span>
                  </h3>
                  <span style={{ fontSize: '12px', color: '#9e8c80' }}>{selectedTutorial.chapters?.length || 0} Modules</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedTutorial.chapters?.map((chapter, idx) => {
                    const isActive = activeChapterIndex === idx;

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSeekChapter(chapter, idx)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '12px',
                          background: isActive ? '#fdf2f8' : '#faf6f0',
                          border: isActive ? '1px solid #e05297' : '1px solid rgba(61, 35, 20, 0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Play size={14} color={isActive ? '#e05297' : '#6e5849'} fill={isActive ? '#e05297' : 'none'} />
                          <span style={{ fontSize: '13px', fontWeight: isActive ? 800 : 600, color: isActive ? '#e05297' : '#3d2314' }}>
                            {chapter.title}
                          </span>
                        </div>

                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#3d2314', background: '#ffffff', padding: '2px 8px', borderRadius: '6px' }}>
                          {chapter.timestampDisplay}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recipe Ingredients Box */}
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid rgba(61, 35, 20, 0.08)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3d2314', marginBottom: '14px' }}>
                  📋 Required Class Ingredients
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedTutorial.ingredients?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#6e5849' }}>
                      <CheckCircle size={15} color="#34d399" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button className="btn btn-rose" style={{ width: '100%', marginTop: '20px', fontWeight: 800 }}>
                  ENROLL IN THIS COURSE
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Courses Cards Grid */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#3d2314', marginBottom: '20px' }}>All Baking Courses</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {filteredTutorials.map(t => (
              <div
                key={t.id || t._id}
                onClick={() => { setSelectedTutorial(t); setActiveChapterIndex(0); window.scrollTo({ top: 120, behavior: 'smooth' }); }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: selectedTutorial?.id === t.id ? '2px solid #e05297' : '1px solid rgba(61, 35, 20, 0.08)',
                  boxShadow: '0 6px 20px rgba(61, 35, 20, 0.05)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={t.thumbnail} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#3d2314', color: '#ffffff', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 800 }}>
                    {t.durationMinutes} mins
                  </div>
                </div>

                <div style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#e05297' }}>{t.category}</span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#3d2314' }}>৳ {t.price?.toLocaleString()}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3d2314', marginBottom: '8px' }}>{t.title}</h3>
                  <div style={{ fontSize: '12px', color: '#6e5849' }}>Instructor: {t.instructor?.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
