# CypherStack

**Reputation for a trustless world.**

CypherStack is a Bitcoin-native trust layer that scores Bitcoin addresses, Nostr identities, and AI agents using only public data — no KYC, no oracles, no gatekeepers.

---

## The Problem

Bitcoin has transparency, but no trust. Nostr has identity, but no verification. AI agents have power, but no accountability. Today, you can't tell if a Bitcoin address is a scammer, if a Nostr profile is a bot, or if an AI agent is reliable.

## The Solution

CypherStack computes trust scores from public data:

- **Bitcoin addresses** — analyzed using on-chain history, volume, and stability patterns
- **Nostr identities** — derived from follower networks, NIP-05 verification, and profile completeness
- **AI agents** — scored by task completion, success rate, age, and staked collateral

Scores are transparent, deterministic, and computed entirely from public information.

---

## Features

- **Multi-layer reputation** — Bitcoin, Nostr, and AI agents in one platform
- **Zero-knowledge proofs** — prove your score exceeds a threshold without revealing it
- **Live trust graph** — interactive D3 visualization of connected entities
- **Score history** — track how reputation evolves over time
- **Compare mode** — side-by-side comparison of two addresses
- **Shareable results** — every score has a verifiable share link
- **Cross-layer bridge** — Bitcoin and Nostr reputation linked without KYC

---

## Tech Stack

- **Frontend** — React, TypeScript, Vite
- **Visualization** — D3.js
- **Routing** — React Router
- **Bitcoin data** — mempool.space API
- **Nostr data** — Multi-relay WebSocket queries
- **Styling** — Pure CSS with custom design system

---

## Getting Started

```bash
git clone https://github.com/yourusername/cypherstack.git
cd cypherstack
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Architecture

```
User Input
    ↓
┌──────────────────────┐
│  Bitcoin | Nostr | AI │
└──────────┬───────────┘
           ↓
    Data Fetchers
    (mempool.space, relays)
           ↓
    Reputation Engine
    (weighted scoring factors)
           ↓
    Trust Tier Output
    (Gold | Silver | Bronze | Risky)
           ↓
    UI Components
    (ScoreCard, TrustMap, ZK, Charts)
```

---

## Scoring Model

Each score is computed from weighted factors:

### Bitcoin
- Transaction Activity (30)
- Balance Strength (25)
- Volume History (25)
- Flow Stability (20)

### Nostr
- Follower Reach (40)
- Network Quality (25)
- NIP-05 Verified (20)
- Profile Complete (15)

### AI Agent
- Tasks Completed (30)
- Success Rate (30)
- Agent Age (20)
- Stake Locked (20)

Tiers: **Gold** (80+), **Silver** (60-79), **Bronze** (40-59), **Risky** (0-39).

---

## Privacy

CypherStack does not require any personal information. All scores are computed from publicly available on-chain and social graph data. Zero-knowledge proofs allow users to verify reputation claims without revealing underlying scores.

---

## License

MIT