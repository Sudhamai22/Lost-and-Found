import React, { useState, useEffect } from 'react';
import { createItem, updateItem } from '../services/api';

const CATEGORIES = ['Electronics', 'Documents', 'Personal Items', 'Accessories', 'Keys', 'Clothing', 'Sports', 'Other'];
const LOCATIONS = [
  'Main Library', 'CSE Block', 'ECE Block', 'Mechanical Block', 'University Canteen',
  'Sports Complex', 'Main Gate', 'Hostel Area', 'Admin Block', 'Seminar Hall',
  'Parking Area', 'Medical Center', 'Other'
];

export default function ItemFormModal({ onClose, onSuccess, editItem }) {
  const [form, setForm] = useState({
    title: '', description: '', type: 'LOST', category: 'Electronics',
    location: '', dateOccurred: '', contactInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editItem) {
      setForm({
        title: editItem.title || '',
        description: editItem.description || '',
        type: editItem.type || 'LOST',
        category: editItem.category || 'Electronics',
        location: editItem.location || '',
        dateOccurred: editItem.dateOccurred || '',
        contactInfo: editItem.contactInfo || ''
      });
    }
  }, [editItem]);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) return setError('Title is required');
    if (!form.location.trim()) return setError('Location is required');

    setLoading(true);
    try {
      if (editItem) {
        await updateItem(editItem.id, form);
      } else {
        await createItem(form);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{editItem ? 'Edit Item' : 'Report an Item'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Item Type *</label>
            <div className="type-toggle">
              <button type="button"
                className={`type-btn ${form.type === 'LOST' ? 'lost-active' : ''}`}
                onClick={() => set('type', 'LOST')}
              >🔴 I Lost Something</button>
              <button type="button"
                className={`type-btn ${form.type === 'FOUND' ? 'found-active' : ''}`}
                onClick={() => set('type', 'FOUND')}
              >🟢 I Found Something</button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Title / Item Name *</label>
            <input className="form-control" placeholder="e.g. Blue HP Laptop Bag"
              value={form.title} onChange={e => set('title', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3}
              placeholder="Describe the item in detail — color, brand, distinctive features..."
              value={form.description} onChange={e => set('description', e.target.value)}
              style={{ resize: 'vertical' }} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-control" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location *</label>
              <select className="form-control" value={form.location} onChange={e => set('location', e.target.value)}>
                <option value="">Select location...</option>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date Lost/Found</label>
              <input type="date" className="form-control"
                value={form.dateOccurred} onChange={e => set('dateOccurred', e.target.value)}
                max={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Info</label>
              <input className="form-control" placeholder="Email or phone"
                value={form.contactInfo} onChange={e => set('contactInfo', e.target.value)} />
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editItem ? 'Save Changes' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
