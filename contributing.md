# Contributing to CypherStack

First off, thank you for considering contributing to CypherStack. It's people like you that make open source such a great community.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and beginners
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or insulting comments
- Public or private harassment
- Publishing others' private information without permission
- Any conduct which could reasonably be considered inappropriate

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Note your browser and operating system**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating one, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` — simple tasks for newcomers
- `help wanted` — issues that need attention
- `documentation` — improvements to docs

### Pull Requests

- Fill in the required template
- Follow the TypeScript and React style guides
- Include screenshots for UI changes
- End all files with a newline
- Avoid platform-specific code

---

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/logiclaya0/CypherStack.git
cd CypherStack

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Running Tests

```bash
npm run build
```

This performs a TypeScript check and production build.

---

## Style Guidelines

### TypeScript

- Use strict TypeScript
- Prefer `const` over `let`
- Use functional components with hooks
- Avoid `any` unless absolutely necessary
- Use meaningful variable and function names

### React

- One component per file
- Use inline styles with CSS variables
- Keep components under 300 lines
- Extract reusable logic into custom hooks
- No comments in production code

### File Naming

- Components: `PascalCase.tsx` (e.g., `ScoreCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `bitcoin.ts`)
- Pages: `PascalCase.tsx` (e.g., `Dashboard.tsx`)

### Code Organization

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level pages
├── utils/          # Helper functions and constants
├── App.tsx         # Main app with routes
└── main.tsx        # Entry point
```

---

## Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>
```

### Type

- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `style` — formatting, no code change
- `refactor` — code restructuring
- `perf` — performance improvement
- `test` — adding tests
- `chore` — maintenance tasks

### Examples

```
feat: add Nostr follower count to trust score
fix: resolve WebSocket connection timeout
docs: update README with demo video
refactor: extract reputation logic into utils
```

---

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
2. **Name your branch** descriptively (`feature/nostr-followers`, `fix/zk-modal`)
3. **If you've added code**, ensure the build passes (`npm run build`)
4. **Update the README.md** with details of changes if applicable
5. **Ensure your code follows** the style guidelines
6. **Write a clear PR description** explaining what and why
7. **Link any related issues** in the PR description
8. **Wait for review** — maintainers will respond within 3-5 days

### PR Title Format

```
[Type] Short description

Examples:
[Feature] Add cross-layer reputation bridge
[Fix] Resolve memory leak in TrustMap component
[Docs] Add architecture diagram
```

---

## Recognition

Contributors will be:

- Listed in the README's acknowledgments section
- Credited in the release notes
- Given a shoutout on our social channels (coming soon)

---

## Questions?

Feel free to open an issue with the `question` label, or reach out to the maintainers directly.

---

## Thank You

Your contributions — no matter how small — make CypherStack better. Whether it's fixing a typo, adding a feature, or improving documentation, every contribution counts.

**Happy coding!** 🚀
