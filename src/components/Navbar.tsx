import { Link, useLocation } from 'react-router-dom'
import { APP_NAME, ROUTES } from '../utils/constants'

const links = [
  { path: ROUTES.home, label: 'Home' },
  { path: ROUTES.dashboard, label: 'Bitcoin' },
  { path: ROUTES.nostr, label: 'Nostr' },
  { path: ROUTES.agent, label: 'AI Agents' },
  { path: ROUTES.compare, label: 'Compare' },
]

function Navbar() {
  const location = useLocation()

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 1000,
      }}
    >
      <Link
        to={ROUTES.home}
        style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #f7931a, #ffab3d)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            color: '#0a0a0f',
            fontWeight: 800,
          }}
        >
          ◈
        </span>
        {APP_NAME}
      </Link>

      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {links.map((link) => {
          const active = location.pathname === link.path
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 500,
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                background: active ? 'rgba(247, 147, 26, 0.1)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar