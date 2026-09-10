import { useState } from 'react'

interface Props {
  score: number
  onClose: () => void
}

function ZKProofModal({ score, onClose }: Props) {
  const [generating, setGenerating] = useState(false)
  const [proof, setProof] = useState<string | null>(null)
  const [threshold, setThreshold] = useState(80)

  const generateProof = () => {
    setGenerating(true)
    setProof(null)
    setTimeout(() => {
      const hash = Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('')
      setProof(hash)
      setGenerating(false)
    }, 1800)
  }

  const passing = score >= threshold

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '2rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '0.35rem 0.85rem',
            background: 'rgba(139, 92, 246, 0.15)',
            color: '#8b5cf6',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
          }}
        >
          ZERO-KNOWLEDGE PROOF
        </div>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Prove Your Score, Privately
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Prove your reputation exceeds a threshold without revealing the exact score.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.75rem',
            }}
          >
            Threshold: <strong style={{ color: 'var(--accent)' }}>{threshold}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
        </div>

        <div
          style={{
            padding: '1rem',
            background: passing ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${passing ? '#22c55e40' : '#ef444440'}`,
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            color: passing ? '#22c55e' : '#ef4444',
          }}
        >
          {passing
            ? `✓ Your score exceeds ${threshold}. You can generate a valid proof.`
            : `✗ Your score does not exceed ${threshold}. No proof possible.`}
        </div>

        <button
          onClick={generateProof}
          disabled={!passing || generating}
          style={{
            width: '100%',
            padding: '1rem',
            background: passing ? 'var(--accent)' : 'var(--bg-secondary)',
            color: passing ? '#0a0a0f' : 'var(--text-muted)',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: passing ? 'pointer' : 'not-allowed',
            marginBottom: proof ? '1.5rem' : 0,
          }}
        >
          {generating ? 'Generating proof...' : 'Generate ZK Proof'}
        </button>

        {proof && (
          <div
            style={{
              padding: '1rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ color: '#8b5cf6', marginBottom: '0.5rem', fontWeight: 600 }}>
              Proof (0x{proof.slice(0, 8)}...):
            </div>
            {proof}
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            borderRadius: '12px',
            fontSize: '0.9rem',
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ZKProofModal