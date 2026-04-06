import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyItems, updateItemStatus, deleteItem } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ItemFormModal from '../components/ItemFormModal';
import ItemDetailModal from '../components/ItemDetailModal';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMyItems();
      setItems(res.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateItemStatus(id, status);
      fetchItems();
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setConfirmDelete(null);
      fetchItems();
    } catch {
      alert('Failed to delete item');
    }
  };

  const lost = items.filter(i => i.type === 'LOST');
  const found = items.filter(i => i.type === 'FOUND');
  const active = items.filter(i => i.status === 'ACTIVE');
  const resolved = items.filter(i => i.status === 'RESOLVED');

  const formatDate = (dt) => new Date(dt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="page">
      {/* Dashboard header */}
      <div className="dashboard-header">
        <h1>👋 Hello, {user?.name?.split(' ')[0]}!</h1>
        <p>{user?.email} • Manage all your reported items here</p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{items.length}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--lost)' }}>{lost.length}</div>
          <div className="stat-label">Lost Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--found)' }}>{found.length}</div>
          <div className="stat-label">Found Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--accent)' }}>{active.length}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--resolved)' }}>{resolved.length}</div>
          <div className="stat-label">Resolved</div>
        </div>
      </div>

      {/* Items list */}
      <div className="section-header">
        <span className="section-title">My Reported Items</span>
        <button className="btn btn-accent" onClick={() => { setEditItem(null); setShowForm(true); }}>
          + Report New Item
        </button>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No items yet</h3>
          <p>You haven't reported any lost or found items.</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setShowForm(true)}>
            Report Your First Item
          </button>
        </div>
      ) : (
        <div className="my-items-list">
          {items.map(item => (
            <div key={item.id} className="my-item-row">
              <span className={`badge badge-${item.type.toLowerCase()}`} style={{ flexShrink: 0 }}>
                {item.type === 'LOST' ? '🔴 LOST' : '🟢 FOUND'}
              </span>

              <div className="my-item-info">
                <div className="my-item-title">{item.title}</div>
                <div className="my-item-sub">
                  📍 {item.location} &nbsp;•&nbsp; 🗓 {formatDate(item.dateReported)} &nbsp;•&nbsp; {item.category}
                </div>
              </div>

              <span className={`badge badge-${item.status.toLowerCase()}`}>
                {item.status}
              </span>

              <div className="my-item-actions">
                <button className="btn btn-outline btn-sm" onClick={() => setViewItem(item)}>
                  View
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => { setEditItem(item); setShowForm(true); }}>
                  Edit
                </button>
                {item.status === 'ACTIVE' && (
                  <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(item.id, 'RESOLVED')}>
                    Mark Resolved
                  </button>
                )}
                {item.status === 'RESOLVED' && (
                  <button className="btn btn-outline btn-sm" onClick={() => handleStatusChange(item.id, 'ACTIVE')}>
                    Reopen
                  </button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm delete dialog */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Item?</h2>
              <button className="modal-close" onClick={() => setConfirmDelete(null)}>✕</button>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              This action cannot be undone. The item will be permanently removed.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmDelete)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <ItemFormModal
          editItem={editItem}
          onClose={() => { setShowForm(false); setEditItem(null); }}
          onSuccess={() => { setShowForm(false); setEditItem(null); fetchItems(); }}
        />
      )}

      {viewItem && (
        <ItemDetailModal item={viewItem} onClose={() => setViewItem(null)} />
      )}
    </div>
  );
}
