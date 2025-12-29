# AI Futures Simulator

**Explore how different choices shape the future of AI.**

An interactive narrative engine that simulates diverging AI futures based on six key factors: capability scaling, safety investment, governance, economic response, power distribution, and AGI timeline.

🔗 **Live Demo:** [ai-futures.vercel.app](https://ai-futures.vercel.app)

---

## 🎯 Purpose

Help people navigate the AI transition by showing that **the future isn't fixed** — different actions lead to different outcomes. Built to expand understanding from the 1% to 5-10%+ of people actively thinking about AI futures.

## ✨ Features

### Interactive Simulation
- **6 Key Factors**: Adjust sliders to configure different AI future scenarios
- **Dynamic Narrative**: Real-time story generation based on your choices
- **Multiple Timelines**: Explore outcomes across 2026-2030
- **Outcome Visualization**: See probability distributions for different futures

### Research-Backed
- Grounded in December 2024-2025 AI discourse
- Expert perspectives from leading researchers
- Scenario planning based on real trends and signals
- Comprehensive source citations

### Shareable Scenarios
- Generate unique URLs for your configurations
- Share on social media
- Export and compare different futures

---

## 🚀 Quick Start

### Run Locally

```bash
# Clone the repository
git clone https://github.com/lout33/ai-futures-simulator.git
cd ai-futures-simulator

# Open in browser (no build step required)
open index.html
# Or use a simple HTTP server
python -m http.server 8000
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lout33/ai-futures-simulator)

Or manually:
```bash
npm install -g vercel
vercel
```

---

## 📊 How It Works

### The Six Factors

| Factor | Range | Impact |
|--------|-------|--------|
| **Capability Scaling** | Plateau → Exponential | Rate of AI improvement (weight: 0.15) |
| **Safety Investment** | Minimal → Alignment-First | Resources for alignment (weight: 0.22) |
| **Global Governance** | Fragmented → Coordinated | International cooperation (weight: 0.18) |
| **Economic Response** | Market Shock → Managed Transition | Job displacement handling (weight: 0.15) |
| **Power Distribution** | Concentrated → Distributed | Control of frontier AI (weight: 0.15) |
| **AGI Timeline** | Gradual (2030+) → Fast (2026) | When transformative AI emerges (weight: 0.15) |

### Outcome Categories

The simulator calculates probability distributions across four futures:

- 🌟 **Flourishing** - Positive outcomes, broad benefit
- ⚠️ **Dystopian** - Negative outcomes, concentrated power
- 💥 **Catastrophic** - Existential risks materialize
- 🤝 **Muddling Through** - Mixed outcomes, managed but uneven

---

## 🏗️ Project Structure

```
ai_futures_v4/
├── index.html              # Main application
├── css/
│   └── style.css          # Mission control aesthetic
├── js/
│   ├── simulator.js       # Core simulation engine
│   ├── content.js         # Factor definitions & scenarios
│   └── sources.js         # Research citations
├── data/
│   └── research/          # JSON research database
│       ├── scenarios_and_experts.json
│       ├── safety_governance.json
│       ├── compute_scaling.json
│       ├── economic_impact.json
│       ├── geopolitics.json
│       └── energy_environment.json
└── public/                # Icons and social images
```

---

## 🎨 Design Philosophy

### Mission Control Aesthetic
- Dark theme with cyan/blue accents
- Futuristic data visualization
- Responsive, tactile interface
- Subtle grid overlay and animations

### Narrative-First Approach
Unlike traditional prediction tools, this simulator tells **stories** about possible futures, making complex AI scenarios more relatable and actionable.

---

## 🔬 Research Sources

Built on research from:
- Future of Humanity Institute
- Center for AI Safety
- AI Impacts
- Epoch AI
- Leading AI researchers (Hinton, Bengio, Russell, Sutskever, Amodei, etc.)
- Current discourse from Dec 2024-Jan 2025

All sources cited in-app via the "View Sources" button.

---

## 🛠️ Tech Stack

- **Pure HTML/CSS/JS** - No frameworks, no build step
- **Vanilla JavaScript** - Clean, readable, maintainable
- **CSS Grid & Flexbox** - Modern responsive layout
- **SVG Graphics** - Scalable vector icons

---

## 🤝 Contributing

Contributions welcome! This is an open-source project aimed at helping humanity navigate the AI transition.

### Areas to Improve
- [ ] Add more expert perspectives
- [ ] Improve narrative generation algorithms
- [ ] Create more granular timeline options
- [ ] Add data export features
- [ ] Mobile UX improvements
- [ ] Localization/translations

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Luis** ([@lout33](https://github.com/lout33))

Built with the mission: *"Help humanity thrive through the AI transition."*

---

## 🙏 Acknowledgments

Inspired by:
- [EN-ROADS Climate Simulator](https://en-roads.climateinteractive.org/)
- AI safety research community
- Future of Life Institute
- All the experts and researchers working on alignment

---

## 📬 Contact

Questions? Feedback? Want to collaborate?

- GitHub: [@lout33](https://github.com/lout33)
- Project Issues: [GitHub Issues](https://github.com/lout33/ai-futures-simulator/issues)

---

**Remember: The future isn't written. Your choices matter.**
