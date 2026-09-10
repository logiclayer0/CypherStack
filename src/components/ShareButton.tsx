import { useState } from 'react'

interface Props {
  label?: string
  data: string
}

function ShareButton({ label = 'Share', data }: Props) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/verify?d=${encodeURIComponent(data)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      onClick={handleShare}
      style={{
        padding: '0.75rem 1.25rem',
        background: copied ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-secondary)',
        border: `1px solid ${copied ? '#22c55e60' : 'var(--border)'}`,
        color: copied ? '#22c55e' : 'var(--text-secondary)',
        borderRadius: '10px',
        fontSize: '0.85rem',
        fontWeight: 600,
      }}
    >
      {copied ? '✓ Link Copied' : label}
    </button>
  )
}

export default ShareButton