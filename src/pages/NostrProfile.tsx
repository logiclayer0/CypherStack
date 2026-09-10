import { useState } from 'react'
import AddressInput from '../components/AddressInput'
import ScoreCard from '../components/ScoreCard'
import Loader from '../components/Loader'
import { fetchNostrProfile, isValidNostrPubkey, NostrProfile as Profile } from '../utils/nostr'
import { calculateNostrReputation, ReputationScore } from '../utils/reputation'

function NostrProfile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [reputation, setReputation] = useState<ReputationScore | null>(null)

  const handleSubmit = async (value: string) => {
    if (!isValidNostrPubkey(value)) {
      setError('Invalid Nostr pubkey. Must be 64 hex characters.')
      return
    }

    setError('')
    setLoading(true)
    setProfile(null)
    setReputation(null)

    try {
      const result = await fetchNostrProfile(value)
      setProfile(result)
      setReputation(
        calculateNostrReputation({
          followers: result.followers,
          following: result.following,
          hasNip05: result.nip05.length > 0,
          hasPicture: result.picture.length > 0,
        })
      )
    } catch {
      setError('Could not fetch Nostr profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Nostr Identity Trust
      </h1>
      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: '2.5rem',
          maxWidth: '600px',
        }}
      >
        Enter a Nostr public key to compute a social trust score from profile
        completeness and network signals.
      </p>

      <AddressInput
        placeholder="npub or hex pubkey..."
        buttonLabel="Analyze"
        onSubmit={handleSubmit}
      />

      {error && <p style={{ color: 'var(--danger)', marginTop: '1rem' }}>{error}</p>}

      <div style={{ marginTop: '3rem' }}>
        {loading && <Loader label="Querying Nostr relays..." />}

        {reputation && profile && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <ScoreCard
              title={profile.name}
              subtitle={profile.nip05 || 'No NIP-05'}
              reputation={reputation}
            />

            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.75rem',
              }}
            >
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Profile
              </h3>
              {profile.picture && (
                <img
                  src={profile.picture}
                  alt={profile.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                    objectFit: 'cover',
                  }}
                />
              )}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {profile.about || 'No bio available.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NostrProfile