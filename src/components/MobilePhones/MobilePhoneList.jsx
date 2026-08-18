import React, { useEffect, useState } from 'react';
import { useMobileStore } from '../../stores/mobileStore';
import { MobilePhoneCard } from './MobilePhoneCard';
import './MobilePhones.css';

export function MobilePhoneList({ onSelectPhone }) {
  const { phones, fetchPhones, isLoading, setFilters, search, brand } = useMobileStore();
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: localSearch });
      fetchPhones();
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setFilters, fetchPhones]);

  return (
    <div className="container animate-fade-in py-8">
      <div className="mobile-hub-header">
        <h2 className="mobile-hub-title gradient-text-cyan">Mobile Phones</h2>
        <div className="mobile-hub-controls">
          <input 
            type="text" 
            placeholder="Search phones..." 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="mobile-hub-input"
          />
          <select 
            value={brand}
            onChange={(e) => {
              setFilters({ brand: e.target.value });
              fetchPhones();
            }}
            className="mobile-hub-input"
          >
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="OnePlus">OnePlus</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="mobile-list-message mobile-list-loading">Loading phones...</div>
      ) : phones.length === 0 ? (
        <div className="mobile-list-message mobile-list-empty">No phones found matching your criteria.</div>
      ) : (
        <div className="mobile-list-grid">
          {phones.map(phone => (
            <div key={phone.id} onClick={() => onSelectPhone(phone)}>
              <MobilePhoneCard phone={phone} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
