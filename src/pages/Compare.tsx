import ComparePanel from '../components/ComparePanel'

function Compare() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Compare Addresses
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px' }}>
        Load two Bitcoin addresses side-by-side and compare their trust scores.
      </p>
      <ComparePanel />
    </div>
  )
}

export default Compare