import { useState } from 'react'
import ScoreCard from '../components/ScoreCard'
import { calculateAgentReputation, ReputationScore } from '../utils/reputation'

interface AgentInput {
  name: string
  tasksCompleted: number
  successRate: number
  ageDays: number
  stakeAmount: number
}

function AgentVerify() {
  const [input, setInput] = useState<AgentInput>({
    name: '',
    tasksCompleted: 0,
    successRate: 0,
    ageDays: 0,
    stakeAmount: 0,
  })
  const [reputation, setReputation] = useState<ReputationScore | null>(null)

  const handleSubmit = () => {
    if (!input.name.trim()) return

    setReputation(
      calculateAgentReputation({
        tasksCompleted: input.tasksCompleted,
        successRate: input.successRate / 100,
        ageDays: input.ageDays,
        stakeAmount: input.stakeAmount,
      })
    )
  }

  const field = (
    label: string,
    key: keyof AgentInput,
    type: string = 'number'
  ) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        {label}
      </label>
      <input
        type={type}
        value={input[key] as string | number}
        onChange={(e) =>
          setInput({
            ...input,
            [key]: type === 'number' ? Number(e.target.value) : e.target.value,
          })
        }
        style={{
          padding: '0.75rem 1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  )

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        AI Agent Verification
      </h1>
      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: '2.5rem',
          maxWidth: '600px',
        }}
      >
        Score autonomous AI agents based on task history, success rate, age, and
        staked collateral.
      </p>

      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        {field('Agent Name', 'name', 'text')}
        {field('Tasks Completed', 'tasksCompleted')}
        {field('Success Rate (%)', 'successRate')}
        {field('Age (Days)', 'ageDays')}
        {field('Stake Amount', 'stakeAmount')}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: '1rem 2rem',
          background: 'var(--accent)',
          color: '#0a0a0f',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.95rem',
        }}
      >
        Compute Trust Score
      </button>

      {reputation && (
        <div style={{ marginTop: '3rem', maxWidth: '500px' }}>
          <ScoreCard title={input.name} subtitle="AI Agent" reputation={reputation} />
        </div>
      )}
    </div>
  )
}

export default AgentVerify