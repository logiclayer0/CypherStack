import { NOSTR_RELAYS } from './constants'

export interface NostrProfile {
  pubkey: string
  name: string
  about: string
  picture: string
  nip05: string
  followers: number
  following: number
}

const emptyProfile = (pubkey: string): NostrProfile => ({
  pubkey,
  name: 'Unknown',
  about: '',
  picture: '',
  nip05: '',
  followers: 0,
  following: 0,
})

async function queryRelay(
  relay: string,
  pubkey: string,
  kinds: number[],
  timeoutMs: number
): Promise<any[] | null> {
  return new Promise((resolve) => {
    let resolved = false
    let socket: WebSocket
    const events: any[] = []

    try {
      socket = new WebSocket(relay)
    } catch {
      resolve(null)
      return
    }

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true
        try { socket.close() } catch {}
        resolve(events.length > 0 ? events : null)
      }
    }, timeoutMs)

    const subId = 's-' + Math.random().toString(36).slice(2, 10)

    socket.onopen = () => {
      try {
        socket.send(
          JSON.stringify([
            'REQ',
            subId,
            { kinds, authors: [pubkey], limit: 1 },
          ])
        )
        socket.send(
          JSON.stringify([
            'REQ',
            subId + '-f',
            { kinds: [3], '#p': [pubkey], limit: 500 },
          ])
        )
      } catch {
        clearTimeout(timer)
        if (!resolved) { resolved = true; resolve(null) }
      }
    }

    socket.onmessage = (event) => {
      if (resolved) return
      try {
        const message = JSON.parse(event.data)
        if (message[0] === 'EVENT' && message[1].startsWith(subId)) {
          events.push(message[2])
        }
        if (message[0] === 'EOSE' && message[1].startsWith(subId)) {
          if (events.length > 0) {
            resolved = true
            clearTimeout(timer)
            try { socket.close() } catch {}
            resolve(events)
          }
        }
      } catch {}
    }

    socket.onerror = () => {
      clearTimeout(timer)
      if (!resolved) {
        resolved = true
        resolve(events.length > 0 ? events : null)
      }
    }

    socket.onclose = () => {
      clearTimeout(timer)
      if (!resolved) {
        resolved = true
        resolve(events.length > 0 ? events : null)
      }
    }
  })
}

export async function fetchNostrProfile(pubkey: string): Promise<NostrProfile> {
  const results = await Promise.all(
    NOSTR_RELAYS.map((relay) => queryRelay(relay, pubkey, [0, 3], 7000))
  )

  const allEvents = results.flat().filter(Boolean)
  if (allEvents.length === 0) return emptyProfile(pubkey)

  const profileEvent = allEvents.find((e) => e.kind === 0)
  const contactEvents = allEvents.filter((e) => e.kind === 3)

  let name = 'Unknown'
  let about = ''
  let picture = ''
  let nip05 = ''

  if (profileEvent) {
    try {
      const content = JSON.parse(profileEvent.content)
      name = content.name || content.display_name || 'Anonymous'
      about = content.about || ''
      picture = content.picture || ''
      nip05 = content.nip05 || ''
    } catch {}
  }

  let following = 0
  if (contactEvents.length > 0) {
    const latest = contactEvents.sort((a, b) => b.created_at - a.created_at)[0]
    following = latest.tags.filter((t: string[]) => t[0] === 'p').length
  }

  let followers = 0
  contactEvents.forEach((e) => {
    followers = Math.max(followers, e.tags.filter((t: string[]) => t[0] === 'p').length)
  })

  return {
    pubkey,
    name,
    about,
    picture,
    nip05,
    followers,
    following,
  }
}

export function isValidNostrPubkey(pubkey: string): boolean {
  return /^[0-9a-f]{64}$/i.test(pubkey)
}
