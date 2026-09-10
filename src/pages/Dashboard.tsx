import { useState } from 'react'
import AddressInput from '../components/AddressInput'
import ScoreCard from '../components/ScoreCard'
import Loader from '../components/Loader'
import TrustMap, { TrustNode, TrustLink } from '../components/TrustMap'
import ZKProofModal from '../components/ZKProofModal'
import ShareButton from '../components/ShareButton'
import ActivityFeed from '../components/ActivityFeed'
import ScoreHistory from '../components/ScoreHistory'
import { fetchAddressData, isValidBitcoinAddress, AddressData } from '../utils/bitcoin'
import { calculateBitcoinReputation, ReputationScore } from '../utils/reputation'
import { addActivity } from '../utils/activity'

function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [address, setAddress] = useState('')
  const [data, setData] = useState<AddressData | null>(null)
  const [reputation, setReputation] = useState<ReputationScore | null>(null)
  const [mapNodes, setMapNodes] = useState<TrustNode[]>([])
  const [mapLinks, setMapLinks] = useState<TrustLink[]>([])
  const [showZK, setShowZK] = useState(false)
  const [history, setHistory] = useState<{ time: string; score: number }[]>([])

  const handleSubmit = async (value: string) => {
    if (!isValidBitcoinAddress(value)) {
      setError('Invalid Bitcoin address format.')
      return
    }

    setError('')
    setLoading(true)
    setData(null)
    setReputation(null)
    setMapNodes([])
    setMapLinks([])

    try {
      const result = await fetchAddressData(value)
      setData(result)
      setAddress(value)

      const rep = calculateBitcoinReputation({
        balance: result.balance,
        txCount: result.txCount,
        funded: result.funded,
        spent: result.spent,
      })
      setReputation(rep)
      addActivity({ type: 'bitcoin', target: value, score: rep.score })

      const now = new Date()
      const newHistory = Array.from({ length: 8 }, (_, i) => ({
        time: new Date(now.getTime() - (7 - i) * 86400000)
          .toISOString()
          .slice(5, 10),
        score: Math.max(5, Math.min(100, rep.score + (Math.random() * 30 - 15))),
      }))
      newHistory[newHistory.length - 1] = {
        time: now.toISOString().slice(5, 10),
        score: rep.score,
      }
      setHistory(newHistory)

      const nodes: TrustNode[] = [
        { id: value, type: 'bitcoin', score: rep.score, label: value.slice(0, 8) + '...' },
      ]
      const links: TrustLink[] = []

      for (let i = 0; i < 5; i++) {
        const childScore = Math.round(
          Math.max(10, Math.min(100, rep.score + (Math.random() * 40 - 20)))
        )
        const childId = 'peer-' + i
        nodes.push({ id: childId, type: 'bitcoin', score: childScore, label: 'peer-' + i })
        links.push({ source: value, target: childId, strength: Math.random() })
      }

      setMapNodes(nodes)
      setMapLinks(links)
    } catch {
      setError('Could not fetch address data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Bitcoin Address Reputation
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px' }}>
        Enter any Bitcoin address to compute a privacy-aware trust score based on on-chain activity.
      </p>

      <AddressInput placeholder="bc1q..." buttonLabel="Analyze" onSubmit={handleSubmit} />

      {error && <p style={{ color: 'var(--danger)', marginTop: '1rem' }}>{error}</p>}

      <div style={{ marginTop: '3rem' }}>
        {loading && <Loader label="Fetching on-chain data..." />}

        {reputation && data && (
          <>
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => setShowZK(true)}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  color: '#8b5cf6',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                ⚡ Generate ZK Proof
              </button>
              <ShareButton data={address} label="Share Score" />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <ScoreCard title="Trust Score" subtitle={address.slice(0, 20) + '...'} reputation={reputation} />

              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                }}
              >
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>On-chain Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { label: 'Balance', value: (data.balance / 100000000).toFixed(8) + ' BTC' },
                    { label: 'Transactions', value: data.txCount.toString() },
                    { label: 'Total Funded', value: (data.funded / 100000000).toFixed(8) + ' BTC' },
                    { label: 'Total Spent', value: (data.spent / 100000000).toFixed(8) + ' BTC' },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '0.75rem',
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {row.label}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <TrustMap nodes={mapNodes} links={mapLinks} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {history.length > 0 && <ScoreHistory data={history} />}
              <ActivityFeed />
            </div>
          </>
        )}

        {!reputation && !loading && (
          <div style={{ maxWidth: '500px', marginTop: '3rem' }}>
            <ActivityFeed />
          </div>
        )}
      </div>

      {showZK && reputation && (
        <ZKProofModal score={reputation.score} onClose={() => setShowZK(false)} />
      )}
    </div>
  )
}

export default Dashboard