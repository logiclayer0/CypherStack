import { ReputationScore, getTierColor } from '../utils/reputation'

interface Props {
  title: string
  subtitle?: string
  reputation: ReputationScore
}

function ScoreCard({ title, subtitle, reputation }: Props) {
  const color = getTierColor(reputation.tier)

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.75rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {subtitle}
            </p>
          )}
        </div>
        <div
          style={{
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            background: `${color}20`,
            color,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {reputation.tier}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <span
          style={{
            fontSize: '3.5rem',
            fontWeight: 700,
            color,
            lineHeight: 1,
          }}
        >
          {reputation.score}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          / 100
        </span>
      </div>

      <div
        style={{
          height: '8px',
          background: 'var(--bg-secondary)',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            width: `${reputation.score}%`,
            height: '100%',
            background: color,
            transition: 'width 0.6s ease',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {reputation.factors.map((factor) => (
          <div key={factor.label}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                marginBottom: '0.35rem',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>
                {factor.label}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>
                {Math.round(factor.value)} / {factor.weight}
              </span>
            </div>
            <div
              style={{
                height: '4px',
                background: 'var(--bg-secondary)',
                borderRadius: '999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(factor.value / factor.weight) * 100}%`,
                  height: '100%',
                  background: 'var(--accent)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScoreCard