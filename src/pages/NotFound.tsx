import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

function NotFound() {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '8rem 2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #f7931a, #ffab3d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        404
      </div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to={ROUTES.home}
        style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          background: 'var(--accent)',
          color: '#0a0a0f',
          borderRadius: '12px',
          fontWeight: 600,
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound