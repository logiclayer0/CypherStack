# CypherStack

**Reputation for a trustless world.**

A Bitcoin-native trust layer that scores Bitcoin addresses, Nostr identities, and AI agents using only public data — no KYC, no oracles, no gatekeepers.

**Live Demo:** [https://cypherstack-woad.vercel.app/](https://cypherstack-woad.vercel.app/)

---

## The Problem

Bitcoin has transparency, but no trust. Nostr has identity, but no verification. AI agents have power, but no accountability.

Today, you cannot tell if a Bitcoin address is a scammer, if a Nostr profile is a bot, or if an AI agent is reliable.

There is no native trust system that spans these three networks.

---

## The Solution

CypherStack computes trust scores from public data across three layers:

- **Bitcoin addresses** — analyzed using on-chain history, transaction volume, and flow stability
- **Nostr identities** — derived from follower networks, NIP-05 verification, and profile completeness
- **AI agents** — scored by task completion, success rate, age, and staked collateral

Scores are transparent, deterministic, and computed entirely from public information. No personal data. No identity providers. No gatekeepers.

---

## Features

- **Multi-layer reputation engine** — Bitcoin, Nostr, and AI agents in one platform
- **Zero-knowledge proofs** — prove your reputation exceeds a threshold without revealing the exact score
- **Live trust graph** — interactive D3 force-directed visualization of connected entities
- **Score history** — track how reputation evolves over time
- **Side-by-side comparison** — compare two Bitcoin addresses in real time
- **Shareable results** — every score has a verifiable share link
- **Cross-layer reputation bridge** — link Bitcoin and Nostr trust without KYC
- **Multi-relay Nostr fallback** — queries three relays in parallel with graceful degradation

---

## Live Demo

**URL:** [https://cypherstack-woad.vercel.app/](https://cypherstack-woad.vercel.app/)

### Try It

| Section | Example Input |
|---------|---------------|
| **Bitcoin** | `bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh` |
| **Nostr** | `3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d` |
| **Compare** | Two addresses side-by-side |
| **AI Agent** | Any custom parameters |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Routing | React Router v6 |
| Visualization | D3.js |
| Bitcoin Data | mempool.space API |
| Nostr Protocol | Native WebSocket, NIP-01 and NIP-02 |
| Storage | Browser localStorage |
| Styling | Inline CSS with custom design system |
| Deployment | Vercel |

---

## Architecture

```
User Input
    |
    v
+----------------------------------+
|  Bitcoin  |  Nostr  |  AI Agent  |
+-----------------+----------------+
                  |
                  v
         Data Fetchers
      (mempool.space, relays)
                  |
                  v
         Reputation Engine
       (weighted scoring factors)
                  |
                  v
         Trust Tier Output
      (Gold | Silver | Bronze | Risky)
                  |
                  v
           UI Components
   (ScoreCard, TrustMap, ZK Proof, Charts)
                  |
                  v
        Cross-Layer Bridge
       (Bitcoin <-> Nostr <-> AI)
```

---

## Scoring Model

Each score is computed from weighted factors totaling 100 points.

### Bitcoin Reputation

| Factor | Weight |
|--------|--------|
| Transaction Activity | 30 |
| Balance Strength | 25 |
| Volume History | 25 |
| Flow Stability | 20 |

### Nostr Reputation

| Factor | Weight |
|--------|--------|
| Follower Reach | 40 |
| Network Quality | 25 |
| NIP-05 Verified | 20 |
| Profile Complete | 15 |

### AI Agent Reputation

| Factor | Weight |
|--------|--------|
| Tasks Completed | 30 |
| Success Rate | 30 |
| Agent Age | 20 |
| Stake Locked | 20 |

### Trust Tiers

| Score Range | Tier |
|-------------|------|
| 80 - 100 | Gold |
| 60 - 79 | Silver |
| 40 - 59 | Bronze |
| 0 - 39 | Risky |

---

## Screenshots

### Home Page
![Home](docs/screenshots/01-home-hero.png)

### Home Page — Full View
![Home Full](docs/screenshots/02-home-full.png)

### Bitcoin Address Scoring
![Bitcoin Scoring](docs/screenshots/03-bitcoin-scoring.png)

### Live Trust Graph
![Trust Graph](docs/screenshots/04-trust-graph.png)

### Score History and Activity Feed
![History Feed](docs/screenshots/05-score-history-activity.png)

### Zero-Knowledge Proof — Threshold Selection
![ZK Threshold](docs/screenshots/06-zk-proof-threshold.png)

### Zero-Knowledge Proof — Generated
![ZK Generated](docs/screenshots/07-zk-proof-generated.png)

### Nostr Identity Trust
![Nostr](docs/screenshots/08-nostr-profile.png)

### Compare Addresses
![Compare](docs/screenshots/09-compare.png)

### AI Agent Verification — Input
![Agent Input](docs/screenshots/10-ai-agent-input.png)

### AI Agent Verification — Result
![Agent Result](docs/screenshots/11-ai-agent-result.png)

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
git clone https://github.com/logiclaya0/CypherStack.git
cd CypherStack
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

---

## Project Structure

```
cypherstack/
|
+-- public/
|   +-- favicon.ico
|   +-- logo.svg
|
+-- src/
|   |
|   +-- components/
|   |   +-- ActivityFeed.tsx
|   |   +-- AddressInput.tsx
|   |   +-- ComparePanel.tsx
|   |   +-- Footer.tsx
|   |   +-- Loader.tsx
|   |   +-- Navbar.tsx
|   |   +-- ScoreCard.tsx
|   |   +-- ScoreHistory.tsx
|   |   +-- ShareButton.tsx
|   |   +-- TrustMap.tsx
|   |   +-- ZKProofModal.tsx
|   |
|   +-- pages/
|   |   +-- AgentVerify.tsx
|   |   +-- Compare.tsx
|   |   +-- Dashboard.tsx
|   |   +-- Home.tsx
|   |   +-- NotFound.tsx
|   |   +-- NostrProfile.tsx
|   |
|   +-- utils/
|   |   +-- activity.ts
|   |   +-- bitcoin.ts
|   |   +-- constants.ts
|   |   +-- nostr.ts
|   |   +-- reputation.ts
|   |
|   +-- App.tsx
|   +-- index.css
|   +-- main.tsx
|
+-- index.html
+-- package.json
+-- tsconfig.json
+-- vercel.json
+-- vite.config.ts
```

---

## Privacy

CypherStack uses **only public data**. No personal information is collected, transmitted, or stored.

- All scoring happens locally in the browser
- Activity history is stored in `localStorage` and never leaves the device
- Zero-knowledge proofs allow verification without revealing underlying scores
- No accounts, no sign-ups, no tracking

---

## Hackathon Tracks

Built for **BOSS Battle 2026** — covering three tracks:

- **Privacy** — zero-knowledge proofs for reputation without disclosure
- **Nostr** — multi-relay identity trust and social graph analysis
- **AI** — verifiable trust scoring for autonomous agents

---

## Roadmap

- [ ] On-chain reputation registry (Bitcoin ordinals or Nostr events)
- [ ] Real Noir circuits for ZK proofs
- [ ] Cross-layer identity bridge with cryptographic attestations
- [ ] API for third-party integrations
- [ ] Nostr NIP proposal for portable reputation events

---

## Contributing

Contributions are welcome. Open an issue or submit a pull request.

---

## License

MIT License

Copyright (c) 2026 CypherStack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
