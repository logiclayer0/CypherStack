export interface ActivityItem {
  id: string
  type: 'bitcoin' | 'nostr' | 'agent'
  target: string
  score: number
  timestamp: number
}

const STORAGE_KEY = 'cypherstack_activity'

export function getActivity(): ActivityItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addActivity(item: Omit<ActivityItem, 'id' | 'timestamp'>): ActivityItem {
  const full: ActivityItem = {
    ...item,
    id: Math.random().toString(36).slice(2, 10),
    timestamp: Date.now(),
  }
  const existing = getActivity()
  const updated = [full, ...existing].slice(0, 20)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {}
  return full
}

export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}