import { Link } from 'react-router-dom'
import { APP_NAME, ROUTES } from '../utils/constants'

function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'rgba(247, 147, 26, 0.1)',
            border: '1px solid rgba(247, 147, 26, 0.3)',
            borderRadius: '999px',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
              animation: 'pulse 2s infinite',
            }}
          />
          Live on Bitcoin + Nostr
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}
        >
          Reputation for a<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #f7931a 0%, #ffab3d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            trustless world
          </span>
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}
        >
          A Bitcoin-native trust layer for addresses, Nostr identities, and AI agents.
          Built on public data — no KYC, no oracles, no gatekeepers.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to={ROUTES.dashboard}
            style={{
              padding: '1rem 2rem',
              background: 'var(--accent)',
              color: '#0a0a0f',
              borderRadius: '12px',
              fontWeight: 600,
            }}
          >
            Try Bitcoin Scoring
          </Link>
          <Link
            to={ROUTES.nostr}
            style={{
              padding: '1rem 2rem',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              fontWeight: 600,
            }}
          >
            Explore Nostr Trust
          </Link>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '6rem',
        }}
      >
        {[
          {
            icon: '₿',
            title: 'Bitcoin Reputation',
            desc: 'Analyze any address using on-chain history, volume, and stability patterns.',
            accent: '#f7931a',
          },
          {
            icon: 'N',
            title: 'Nostr Trust Graph',
            desc: 'Derive social trust from follower networks and NIP-05 verification.',
            accent: '#8b5cf6',
          },
          {
            icon: '◈',
            title: 'AI Agent Scoring',
            desc: 'Verify autonomous agents by task completion, success rate, and stake.',
            accent: '#22c55e',
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '2rem',
              transition: 'border-color 0.2s',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${item.accent}20`,
                color: item.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              {item.icon}
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          padding: '3rem 2rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          marginBottom: '4rem',
        }}
      >
        {[
          { value: '3', label: 'Networks Connected' },
          { value: '0', label: 'KYC Required' },
          { value: '100%', label: 'On-chain Data' },
          { value: '∞', label: 'Trust Graph Depth' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}
            >
              {stat.value}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
    </div>
  )
}

export default Home