import { SCORE_THRESHOLDS } from './constants'

export type TrustTier = 'gold' | 'silver' | 'bronze' | 'risky'

export interface ReputationScore {
  score: number
  tier: TrustTier
  factors: ReputationFactor[]
}

export interface ReputationFactor {
  label: string
  weight: number
  value: number
}

export function calculateBitcoinReputation(input: {
  balance: number
  txCount: number
  funded: number
  spent: number
}): ReputationScore {
  const factors: ReputationFactor[] = []

  const ageScore = Math.min(input.txCount * 2, 30)
  factors.push({ label: 'Transaction Activity', weight: 30, value: ageScore })

  const balanceScore = Math.min((input.balance / 100000000) * 10, 25)
  factors.push({ label: 'Balance Strength', weight: 25, value: balanceScore })

  const volumeScore = Math.min((input.funded / 100000000) * 5, 25)
  factors.push({ label: 'Volume History', weight: 25, value: volumeScore })

  const ratio = input.funded > 0 ? input.spent / input.funded : 0
  const stabilityScore = Math.max(0, 20 - Math.abs(ratio - 0.5) * 40)
  factors.push({ label: 'Flow Stability', weight: 20, value: stabilityScore })

  const total = Math.round(
    factors.reduce((sum, f) => sum + f.value, 0)
  )

  return {
    score: Math.min(total, 100),
    tier: getTier(total),
    factors,
  }
}

export function calculateNostrReputation(input: {
  followers: number
  following: number
  hasNip05: boolean
  hasPicture: boolean
}): ReputationScore {
  const factors: ReputationFactor[] = []

  const followerScore = Math.min(Math.log10(input.followers + 1) * 20, 40)
  factors.push({ label: 'Follower Reach', weight: 40, value: followerScore })

  const ratio =
    input.following > 0 ? input.followers / input.following : input.followers
  const networkScore = Math.min(ratio * 10, 25)
  factors.push({ label: 'Network Quality', weight: 25, value: networkScore })

  const nip05Score = input.hasNip05 ? 20 : 0
  factors.push({ label: 'NIP-05 Verified', weight: 20, value: nip05Score })

  const picScore = input.hasPicture ? 15 : 0
  factors.push({ label: 'Profile Complete', weight: 15, value: picScore })

  const total = Math.round(factors.reduce((sum, f) => sum + f.value, 0))

  return {
    score: Math.min(total, 100),
    tier: getTier(total),
    factors,
  }
}

export function calculateAgentReputation(input: {
  tasksCompleted: number
  successRate: number
  ageDays: number
  stakeAmount: number
}): ReputationScore {
  const factors: ReputationFactor[] = []

  const tasksScore = Math.min(input.tasksCompleted * 2, 30)
  factors.push({ label: 'Tasks Completed', weight: 30, value: tasksScore })

  const successScore = input.successRate * 30
  factors.push({ label: 'Success Rate', weight: 30, value: successScore })

  const ageScore = Math.min(input.ageDays / 3, 20)
  factors.push({ label: 'Agent Age', weight: 20, value: ageScore })

  const stakeScore = Math.min((input.stakeAmount / 1000000) * 20, 20)
  factors.push({ label: 'Stake Locked', weight: 20, value: stakeScore })

  const total = Math.round(factors.reduce((sum, f) => sum + f.value, 0))

  return {
    score: Math.min(total, 100),
    tier: getTier(total),
    factors,
  }
}

export function getTier(score: number): TrustTier {
  if (score >= SCORE_THRESHOLDS.gold) return 'gold'
  if (score >= SCORE_THRESHOLDS.silver) return 'silver'
  if (score >= SCORE_THRESHOLDS.bronze) return 'bronze'
  return 'risky'
}

export function getTierColor(tier: TrustTier): string {
  switch (tier) {
    case 'gold':
      return '#f7931a'
    case 'silver':
      return '#a0a0b0'
    case 'bronze':
      return '#cd7f32'
    default:
      return '#ef4444'
  }
}