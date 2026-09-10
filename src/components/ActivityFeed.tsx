import { useEffect, useState } from 'react'
import { getActivity, ActivityItem, timeAgo } from '../utils/activity'

function ActivityFeed() {
  const [items, setItems] = useState<ActivityItem[]>([])

  useEffect(() => {
    setItems(getActivity())
    const interval = setInterval(() => setItems(getActivity()), 3000)
    return () => clearInterval(interval)
  }, [])

  const typeColor = (type: string) => {
    if (type === 'bitcoin') return '#f7931a'
    if (type === 'nostr') return '#8b5cf6'
    return '#22c55e'
  }

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <h3 style={{ fontSize: '1rem' }}>Recent Activity</h3>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            animation: 'pulse 2s infinite',
          }}
        />
      </div>

      {items.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          No activity yet. Start by scoring an address.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.slice(0, 6).map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.85rem',
              }}
            >
              <div>
                <div
                  style={{
                    color: typeColor(item.type),
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.type}
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  {item.target.slice(0, 12)}...{item.target.slice(-6)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: typeColor(item.type) }}>
                  {item.score}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  {timeAgo(item.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>
        {`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}
      </style>
    </div>
  )
}

export default ActivityFeed