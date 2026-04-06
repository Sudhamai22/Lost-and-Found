import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import ItemDetailModal from '../components/ItemDetailModal';
import ItemFormModal from '../components/ItemFormModal';

const CATEGORIES = ['All', 'Electronics', 'Documents', 'Personal Items', 'Accessories', 'Keys', 'Clothing', 'Sports', 'Other'];

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [filters, setFilters] = useState({ type: 'ALL', category: '', keyword: '' });
  const [searchInput, setSearchInput] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.type !== 'ALL') params.type = filters.type;
      if (filters.category && filters.category !== 'All') params.category = filters.category;
      if (filters.keyword) params.keyword = filters.keyword;
      const res = await getItems(params);
      setItems(res.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  // Debounced keyword search
  useEffect(() => {
    const t = setTimeout(() => {
      setFilters(f => ({ ...f, keyword: searchInput }));
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleReportClick = () => {
    if (!isAuthenticated) navigate('/login');
    else setShowReport(true);
  };

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <h1>SRM AP Lost & Found Portal</h1>
        <p>Lost something on campus? Found something? Report it here and help your fellow students.</p>
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="🔍  Search items, locations..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <select
            className="search-select"
            value={filters.category}
            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
          >
            {CATEGORIES.map(c => <option key={c} value={c === 'All' ? '' : c}>{c}</option>)}
          </select>
          <button className="btn btn-accent" onClick={handleReportClick}>
            + Report Item
          </button>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 0 }}>
        {/* Type filter tabs */}
        <div className="filter-tabs">
          {['ALL', 'LOST', 'FOUND'].map(t => (
            <button
              key={t}
              className={`filter-tab ${filters.type === t ? `active-${t.toLowerCase()}` : ''}`}
              onClick={() => setFilters(f => ({ ...f, type: t }))}
            >
              {t === 'ALL' ? '🔍 All Items' : t === 'LOST' ? '🔴 Lost Items' : '🟢 Found Items'}
            </button>
          ))}
        </div>

        <div className="section-header">
          <span className="section-title">
            {loading ? 'Loading...' : `${items.length} item${items.length !== 1 ? 's' : ''} found`}
          </span>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="items-grid">
            {items.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No items found</h3>
                <p>Try adjusting your search filters or be the first to report an item!</p>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleReportClick}>
                  + Report an Item
                </button>
              </div>
            ) : (
              items.map(item => (
                <ItemCard key={item.id} item={item} onClick={setSelectedItem} />
              ))
            )}
          </div>
        )}
      </div>

      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {showReport && (
        <ItemFormModal
          onClose={() => setShowReport(false)}
          onSuccess={() => { setShowReport(false); fetchItems(); }}
        />
      )}
    </>
  );
}
