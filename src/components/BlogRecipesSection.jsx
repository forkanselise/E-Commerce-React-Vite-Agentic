import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { INITIAL_RECIPES } from '../services/api';

export function BlogRecipesSection() {
  const [recipes] = useState(INITIAL_RECIPES);
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Ganache & Frosting', 'Whipping & Dairy', 'Bread & Fermentation'];

  const filteredRecipes = recipes.filter(r => {
    if (selectedCat === 'All') return true;
    return r.category === selectedCat;
  });

  return (
    <div style={{ background: '#faf6f0', padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header (Matching Mockup Section 09 Blog/Recipes) */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: '#fdf2f8', border: '1px solid #f472b6', marginBottom: '14px' }}>
            <Sparkles size={14} color="#e05297" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#e05297' }}>Smart Bakery Journal</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#3d2314', fontFamily: 'var(--font-heading)' }}>
            Baking Tips & Professional Recipes
          </h1>
          <p style={{ fontSize: '15px', color: '#6e5849' }}>
            Free artisan guides, chocolate ganache troubleshooting, sourdough fermentation secrets, and cream whipping science.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                background: selectedCat === cat ? '#e05297' : '#ffffff',
                color: selectedCat === cat ? '#ffffff' : '#3d2314',
                border: '1px solid rgba(61, 35, 20, 0.1)',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCat === cat ? '0 4px 12px rgba(224, 82, 151, 0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(61, 35, 20, 0.08)',
                boxShadow: '0 6px 20px rgba(61, 35, 20, 0.05)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#e05297';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(61, 35, 20, 0.08)';
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#3d2314', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '9999px' }}>
                  {recipe.category}
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9e8c80', marginBottom: '8px' }}>
                  <Clock size={14} /> <span>{recipe.readTime}</span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#3d2314', marginBottom: '10px', lineHeight: 1.35 }}>
                  {recipe.title}
                </h3>

                <p style={{ fontSize: '14px', color: '#6e5849', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                  {recipe.summary}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e05297', fontWeight: 800, fontSize: '14px', paddingTop: '14px', borderTop: '1px solid rgba(61, 35, 20, 0.08)' }}>
                  <span>Read Full Article</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
