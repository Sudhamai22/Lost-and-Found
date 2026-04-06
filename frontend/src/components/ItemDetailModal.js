import React from 'react';

export default function ItemDetailModal({ item, onClose }) {
  if (!item) return null;

  const isLost = item.type === 'LOST';
  const date = new Date(item.dateReported).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{item.title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div>
          <span
            className="detail-type-badge"
            style={{
              background: isLost ? 'var(--lost-bg)' : 'var(--found-bg)',
              color: isLost ? 'var(--lost)' : 'var(--found)',
              border: `1.5px solid ${isLost ? 'var(--lost-border)' : 'var(--found-border)'}`,
            }}
          >
            {isLost ? '🔴 LOST ITEM' : '🟢 FOUND ITEM'}
          </span>

          {item.description && (
            <div className="detail-field">
              <div className="detail-label">Description</div>
              <div className="detail-value">{item.description}</div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="detail-field">
              <div className="detail-label">Category</div>
              <div className="detail-value">{item.category}</div>
            </div>
            <div className="detail-field">
              <div className="detail-label">Status</div>
              <div className="detail-value">
                <span className={`badge badge-${item.status.toLowerCase()}`}>{item.status}</span>
              </div>
            </div>
            <div className="detail-field">
              <div className="detail-label">📍 Location</div>
              <div className="detail-value">{item.location}</div>
            </div>
            {item.dateOccurred && (
              <div className="detail-field">
                <div className="detail-label">📅 Date Lost/Found</div>
                <div className="detail-value">{item.dateOccurred}</div>
              </div>
            )}
          </div>

          <div className="detail-field" style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '10px', marginTop: '0.5rem' }}>
            <div className="detail-label">👤 Reported By</div>
            <div className="detail-value" style={{ fontWeight: 600 }}>{item.reportedByName}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Reported on {date}</div>
          </div>

          {item.contactInfo && (
            <div className="detail-field" style={{ background: '#fffbeb', padding: '1rem', borderRadius: '10px', border: '1px solid #fde68a' }}>
              <div className="detail-label">📞 Contact Information</div>
              <div className="detail-value" style={{ fontWeight: 600, color: '#92400e' }}>{item.contactInfo}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
