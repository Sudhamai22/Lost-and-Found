import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Electronics', 'Documents', 'Personal Items', 'Accessories', 'Keys', 'Clothing', 'Sports', 'Other'];
const LOCATIONS = [
  'Main Library', 'CSE Block', 'ECE Block', 'Mechanical Block', 'University Canteen',
  'Sports Complex', 'Main Gate', 'Hostel Area', 'Admin Block', 'Seminar Hall',
  'Parking Area', 'Medical Center', 'Other'
];

export default function ReportItem() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'LOST',
    category: 'Electronics',
    location: '',
    dateOccurred: '',
    contactInfo: user?.email || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) return setError('Title is required');
    if (!form.location) return setError('Please select a location');

    setLoading(true);
    try {
      await createItem(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page">
        <div className="form-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ marginBottom: '0.5rem' }}>Report Submitted!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your item has been successfully reported. We hope it gets resolved soon!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              View My Items
            </button>
            <button className="btn btn-outline" onClick={() => { setSuccess(false); setForm({ title: '', description: '', type: 'LOST', category: 'Electronics', location: '', dateOccurred: '', contactInfo: user?.email || '' }); }}>
              Report Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Report an Item
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Fill in the details below to report a lost or found item on campus.
          </p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {/* Type Toggle */}
            <div className="form-group">
              <label className="form-label">Item Type *</label>
              <div className="type-toggle">
                <button
                  type="button"
                  className={`type-btn ${form.type === 'LOST' ? 'lost-active' : ''}`}
                  onClick={() => set('type', 'LOST')}
                >
                  🔴 I Lost Something
                </button>
                <button
                  type="button"
                  className={`type-btn ${form.type === 'FOUND' ? 'found-active' : ''}`}
                  onClick={() => set('type', 'FOUND')}
                >
                  🟢 I Found Something
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Item Name / Title *</label>
              <input
                className="form-control"
                placeholder="e.g. Blue HP Laptop Bag"
                value={form.title}
                onChange={e => set('title', e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Describe the item — color, brand, distinctive marks..."
                value={form.description}
                onChange={e => set('description', e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Category + Location */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-control"
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Location *</label>
                <select
                  className="form-control"
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                >
                  <option value="">Select location...</option>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            {/* Date + Contact */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date Lost / Found</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.dateOccurred}
                  onChange={e => set('dateOccurred', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Info</label>
                <input
                  className="form-control"
                  placeholder="Email or phone number"
                  value={form.contactInfo}
                  onChange={e => set('contactInfo', e.target.value)}
                />
              </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
