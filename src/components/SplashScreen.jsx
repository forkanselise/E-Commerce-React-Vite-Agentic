import React, { useState, useEffect } from 'react';
import logoImg from '../assets/Picture2.png';

export function SplashScreen({ onFinish, duration = 2000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out animation slightly before total duration
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(0, duration - 500));

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #faf6f0 55%, #3d2314 180%)',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* Animated Subtle Background Pulse Rings */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224, 82, 151, 0.12) 0%, rgba(255,255,255,0) 70%)',
          animation: 'pulseGlow 2s infinite ease-in-out',
        }}
      />

      {/* Centered Logo Card */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 48px',
          background: '#ffffff',
          borderRadius: '28px',
          boxShadow: '0 24px 60px rgba(61, 35, 20, 0.14), 0 4px 20px rgba(224, 82, 151, 0.08)',
          border: '1px solid rgba(61, 35, 20, 0.08)',
          transform: isFadingOut ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.5s ease-out',
          animation: 'splashScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <img
          src={logoImg}
          alt="Buttercup Logo"
          style={{
            height: '110px',
            width: 'auto',
            maxHeight: '110px',
            objectFit: 'contain',
            marginBottom: '16px',
            filter: 'drop-shadow(0 6px 16px rgba(61, 35, 20, 0.1))',
          }}
        />

        {/* Loading Progress Bar Indicator */}
        <div
          style={{
            width: '160px',
            height: '4px',
            background: 'rgba(61, 35, 20, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginTop: '8px',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #e05297 0%, #3d2314 100%)',
              borderRadius: '9999px',
              animation: 'splashProgress 1.8s ease-in-out forwards',
            }}
          />
        </div>

        <p style={{ marginTop: '14px', fontSize: '13px', fontWeight: 700, color: '#e05297', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Bake • Make • Learn
        </p>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes splashScale {
          0% { opacity: 0; transform: scale(0.88); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes splashProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
