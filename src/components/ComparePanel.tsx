import { useState } from 'react'
import AddressInput from './AddressInput'
import ScoreCard from './ScoreCard'
import Loader from './Loader'
import { fetchAddressData, isValidBitcoinAddress } from '../utils/bitcoin'
import { calculateBitcoinReputation, ReputationScore } from '../utils/reputation'

function ComparePanel() {
  const [loading, setLoading] = useState(false)
  const [left, setLeft] = useState<{ address: string; rep: ReputationScore } | null>(null)
  const [right, setRight] = useState<{ address: string; rep: ReputationScore } | null>(null)
  const [error, setError] = useState('')

  const load = async (address: string, side: 'left' | 'right') => {
    if (!isValidBitcoinAddress(address)) {
      setError('Invalid address')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await fetchAddressData(address)
      const rep = calculateBitcoinReputation({
        balance: data.balance,
        txCount: data.txCount,
        funded: data.funded,
        spent: data.spent,
      })
      const entry = { address, rep }
      if (side === 'left') setLeft(entry)
      else setRight(entry)
    } catch {
      setError('Failed to load')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <AddressInput
          placeholder="First address..."
          buttonLabel="Load"
          onSubmit={(v) => load(v, 'left')}
        />
        <AddressInput
          placeholder="Second address..."
          buttonLabel="Load"
          onSubmit={(v) => load(v, 'right')}
        />
      </div>

      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      {loading && <Loader label="Comparing..." />}

      {left && right && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}
        >
          <div>
            <ScoreCard title="Address A" subtitle={left.address.slice(0, 20) + '...'} reputation={left.rep} />
          </div>
          <div>
            <ScoreCard title="Address B" subtitle={right.address.slice(0, 20) + '...'} reputation={right.rep} />
          </div>
        </div>
      )}

      {left && right && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Winner
          </div>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--accent)',
            }}
          >
            {left.rep.score === right.rep.score
              ? 'Tie'
              : left.rep.score > right.rep.score
              ? 'Address A'
              : 'Address B'}
          </div>
        </div>
      )}
    </div>
  )
}

export default ComparePanel