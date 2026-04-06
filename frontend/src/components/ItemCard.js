import React from 'react';

const CATEGORIES = {
  Electronics: '💻',
  Documents: '📄',
  'Personal Items': '🎒',
  Accessories: '👜',
  Keys: '🔑',
  Clothing: '👕',
  Sports: '⚽',
  Other: '📦',
};

export default function ItemCard({ item, onClick }) {
  const isLost = item.type === 'LOST';
  const date = new Date(item.dateReported).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="item-card" onClick={() => onClick && onClick(item)}>
      <div className="item-card-header">
        <h3>{item.title}</h3>
        <span className={`badge badge-${item.type.toLowerCase()}`}>
          {isLost ? '🔴 LOST' : '🟢 FOUND'}
        </span>
      </div>

      {item.description && (
        <p className="item-desc">{item.description}</p>
      )}

      <div className="item-meta">
        <div className="item-meta-row">
          <span className="meta-icon">{CATEGORIES[item.category] || '📦'}</span>
          <span>{item.category}</span>
        </div>
        <div className="item-meta-row">
          <span className="meta-icon">📍</span>
          <span>{item.location}</span>
        </div>
        <div className="item-meta-row">
          <span className="meta-icon">👤</span>
          <span>{item.reportedByName}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>{date}</span>
        </div>
        {item.status !== 'ACTIVE' && (
          <div className="item-meta-row">
            <span className={`badge badge-${item.status.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
              {item.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
