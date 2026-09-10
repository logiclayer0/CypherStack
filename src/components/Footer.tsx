import { APP_NAME } from '../utils/constants'

function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
      }}
    >
      <p>
        {APP_NAME} — Reputation for a trustless world.
      </p>
    </footer>
  )
}

export default Footer