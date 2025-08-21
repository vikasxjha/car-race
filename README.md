# 🏎️ Road Racer

<div align="center">

**A modern, high-performance web-based car racing game built with React & TypeScript**

*Experience the thrill of classic arcade racing with modern web technologies*

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF.svg)](https://vitejs.dev/)

[🎮 Play Now](#installation) • [📖 Documentation](#features) • [🤝 Contributing](#contributing) • [📄 License](#license)

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### � **Gameplay**
- 🏁 Classic top-down racing mechanics
- 🚗 Multiple unique cars with different stats
- � Dynamic day/night racing modes
- ⚡ Power-ups and fuel collection
- � Achievement system with 15+ challenges
- 📈 Progressive difficulty scaling

</td>
<td width="50%">

### 💻 **Technical**
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎵 Immersive audio system with 7 sound effects
- 🔥 Real-time Firebase leaderboard
- ⚡ Smooth 60fps animations
- 🎨 Beautiful UI with Framer Motion
- 🌐 PWA-ready for offline play

</td>
</tr>
</table>

## 🚀 Quick Start

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/road-racer.git

# 2️⃣ Navigate to project directory
cd road-racer

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start development server
npm run dev

# 🌐 Open http://localhost:3000 in your browser
```

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | UI Framework |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | Type Safety |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | CSS Framework |
| **Animation** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) | Motion Library |
| **Backend** | ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=flat&logo=firebase&logoColor=white) | Database & Auth |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Build System |
| **Game Engine** | ![HTML5 Canvas](https://img.shields.io/badge/HTML5_Canvas-E34F26?style=flat&logo=html5&logoColor=white) | Rendering |

</div>

## 🎮 Game Controls

<table>
<tr>
<td width="50%">

### 🖥️ **Desktop**
| Action | Keys |
|--------|------|
| Steer Left/Right | `←→` or `A/D` |
| Accelerate | `↑` or `W` |
| Brake | `↓` or `S` |
| Pause/Resume | `Space` |
| Toggle Music | `M` |
| Toggle SFX | `N` |

</td>
<td width="50%">

### 📱 **Mobile**
| Action | Gesture |
|--------|---------|
| Steer | Swipe Left/Right |
| Accelerate | Tap & Hold |
| Pause | Tap Screen |
| Menu | Touch UI Buttons |

</td>
</tr>
</table>

## 🏗️ Project Architecture

```
road-racer/
├── 📁 src/
│   ├── 🎯 components/          # React UI components
│   │   ├── Achievements.tsx    # Achievement system
│   │   ├── CarSelection.tsx    # Vehicle selection
│   │   ├── GameCanvas.tsx      # Main game renderer
│   │   ├── GameOverScreen.tsx  # End game screen
│   │   ├── HomePage.tsx        # Landing page
│   │   ├── HUD.tsx            # Game overlay UI
│   │   ├── Leaderboard.tsx    # Score rankings
│   │   └── PauseMenu.tsx      # Game pause menu
│   ├── 🎮 game/               # Core game engine
│   │   ├── CollisionDetector.ts # Physics system
│   │   ├── GameEngine.ts      # Main game loop
│   │   ├── InputHandler.ts    # Control management
│   │   └── Renderer.ts        # Canvas rendering
│   ├── 🔄 contexts/           # React state management
│   │   ├── GameContext.tsx    # Game state
│   │   └── SoundContext.tsx   # Audio management
│   ├── 📊 data/              # Game configuration
│   │   ├── achievements.ts    # Achievement definitions
│   │   └── cars.ts           # Vehicle specifications
│   ├── 🌐 services/          # External integrations
│   │   └── firebase.ts       # Database connection
│   └── 📝 types/             # TypeScript definitions
│       └── game.ts           # Game type system
├── 📁 public/
│   └── 🔊 sounds/            # Audio assets
└── ⚙️ Configuration files
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | 🔍 Run ESLint checks |

## 🎨 Game Features Detail

### 🚗 **Vehicle Selection**
Choose from 4 unique cars, each with different stats:
- **Speedster**: High speed, low handling
- **Cruiser**: Balanced performance
- **Thunder**: Quick acceleration
- **Shadow**: Superior handling

### 🏆 **Achievement System**
Unlock achievements by completing challenges:
- 🏁 Road Warrior: Drive 5KM without crashing
- ⛽ Fuel Master: Collect 10 fuel cans
- 🌙 Night Owl: Complete night mode
- And many more!

### 🎵 **Audio Experience**
- Background music with loop functionality
- 7 different sound effects:
  - Engine sounds
  - Collision effects
  - Power-up collection
  - Level progression
  - Game over notifications

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Road Fighter arcade game
- Built with modern web technologies for optimal performance
- Special thanks to the open-source community

---

<div align="center">

**[⬆ Back to Top](#-road-racer)**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>