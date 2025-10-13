# IMPWR - Empowered by You 
![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)
![Status](https://img.shields.io/badge/status-alpha-orange.svg)

**IMPWR** (pronounced "Empower") is a free, open-source personal intelligence platform that serves as a unified operating system for self-improvement. It securely aggregates your complete digital footprint across all devices and services, then transforms this data into actionable insights across six core pillars of well-being.

## 🌟 Six Pillars of Well-Being

- **⚡ Energy** - Vitality, rest, recovery
- **💰 Financial Health** - Stability, freedom, growth
- **💙 Emotions** - Awareness, regulation, expression
- **❤️ Physical Health** - Fitness, nutrition, body
- **🧠 Mental Health** - Clarity, learning, flow
- **✨ Spiritual Health** - Purpose, connection, peace

## 🎯 Core Features

### Universal Data Integration
- **Mobile**: Health data, app usage, screen time, battery stats
- **Desktop**: Document scanning, browser data, calendar integration
- **Cloud Services**: Social media, productivity tools, financial accounts (read-only via Plaid)

### Intelligent Analysis Engine
- Cross-pillar correlation detection
- Proactive insight generation
- Pattern recognition across your entire digital footprint
- Privacy-first, local-first processing

### Intuitive Visualization
- **Mind Map View**: Obsidian-like interface showing interconnections
- **Dashboard View**: Six-tile overview with key metrics
- **Timeline View**: Historical progress tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/impwr.git

# Navigate to the project directory
cd impwr

# Install dependencies
npm install

# Run the development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see IMPWR in action.

## 🏗️ Architecture

IMPWR is built with:
- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4
- **Database**: SQLite (local-first) with optional PostgreSQL cloud sync
- **Mobile**: React Native (coming soon)
- **Desktop**: Electron companion app (coming soon)

## 📊 Database Schema

The complete database schema includes:
- Core tables: Users, Data Sources, Raw Data Entries
- Pillar-specific tables for each of the six pillars
- Processed Insights table for cross-pillar correlations
- Goals and Mind Maps tables

See `lib/db/schema.ts` for the complete schema definition.

## 🔒 Privacy & Security

- **Local-first**: All data stored on your device by default
- **Explicit consent**: Granular, revocable permissions for every data source
- **End-to-end encryption**: Optional cloud sync is fully encrypted
- **Open source**: Complete transparency in how your data is handled

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

IMPWR is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).

This ensures the project remains free and open-source forever.

## 💖 Support

- **Core App**: Permanently free and open-source
- **IMPWR Cloud**: Optional paid subscription for seamless sync and advanced backup
- **Donations**: Support development via [Open Collective](https://opencollective.com/impwr)

## 🗺️ Roadmap

- [x] Core UI foundation (Mind Map, Dashboard, Timeline)
- [x] Database schema design
- [ ] Data ingestion layer
- [ ] Cross-pillar analysis engine
- [ ] Mobile app (React Native)
- [ ] Desktop companion (Electron)
- [ ] Cloud sync infrastructure
- [ ] Community marketplace for extensions

## 📞 Contact

- **Website**: [impwr.app](https://impwr.app)
- **GitHub**: [github.com/yourusername/impwr](https://github.com/yourusername/impwr)
- **Discord**: [Join our community](https://discord.gg/impwr)

---

**Built with ❤️ by the IMPWR community**
