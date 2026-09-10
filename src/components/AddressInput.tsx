import { useState } from 'react'

interface Props {
  placeholder: string
  buttonLabel: string
  onSubmit: (value: string) => void
}

function AddressInput({ placeholder, buttonLabel, onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        maxWidth: '720px',
        width: '100%',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: '1rem 1.25rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '1rem 1.75rem',
          background: 'var(--accent)',
          color: '#0a0a0f',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.95rem',
        }}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default AddressInput