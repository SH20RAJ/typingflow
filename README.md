# ⌨️ TypingFlow

> A modern, interactive, and offline-first Typing Master PWA built with Next.js 15 (App Router), Tailwind CSS v4, and Next-PWA — designed to teach typing from scratch with engaging SVG animations, gamified lessons, and full offline support.

---

![TypingFlow Screenshot](./public/cover.png)

## 🚀 Features

- 🎯 **Beginner to Advanced Lessons** – Structured curriculum to master touch typing step-by-step.
- 🔑 **Interactive SVG Keyboard** – Real-time visual feedback with animated keystrokes and finger mapping.
- 📊 **Live WPM & Accuracy Stats** – Track your progress per session with beautiful visualizations.
- 🧠 **AI Teaching Flow** – Guided lessons, feedback, and adaptive practice based on user mistakes.
- 🎮 **Typing Games** – Improve speed and accuracy through fun game modes.
- 🌙 **Dark Mode & Accessibility** – Custom themes, screen reader support, and adjustable font sizes.
- 💾 **Offline-First PWA** – Works seamlessly offline with cached lessons and progress tracking.
- 📈 **Dashboard & Analytics** – Visual heatmaps, daily streaks, key weaknesses, and more.
- 🧩 **Custom Lesson Creator** – Create your own text or code lessons.

---

## 🧱 Tech Stack

- **Framework:** [Next.js 15 App Router](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **PWA:** [next-pwa](https://github.com/shadowwalker/next-pwa)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Storage:** `localStorage` (offline progress), future IndexedDB integration
- **Deployment Ready:** Fully responsive, installable on mobile/desktop

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sh20raj/TypingFlow.git
cd TypingFlow
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```bash
/app              # App Router-based pages & layout
/components       # Reusable components like TypingBox, KeyboardSVG
/lib              # Helper functions, stats logic, key mappings
/public           # Static assets, keyboard SVGs, icons
/styles           # Tailwind and global CSS
```

---

## 📚 Lesson Flow

TypingFlow follows a progressive learning system:

1. **Watch & Learn** – See a demo of which keys to press and fingers to use.
2. **Try It Yourself** – Practice with real-time feedback and animations.
3. **Track Progress** – Get post-lesson stats and suggestions.
4. **Unlock Levels** – Complete levels to unlock harder ones and mini-games.

---

## 🧠 Roadmap

* [x] SVG Keyboard with Framer Motion
* [x] Local typing lessons and progress tracking
* [x] PWA with full offline support
* [ ] Multiplayer typing race mode
* [ ] AI-based lesson adaptation
* [ ] Export stats and progress to CSV or cloud
* [ ] User authentication and sync (optional)

---

## 🌍 Live Demo

Coming soon at: [https://typingflow.pages.dev](https://typingflow.pages.dev)

---

## 🛠️ Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'add feature'`
4. Push: `git push origin feature-name`
5. Open a Pull Request

---

## 📜 License

MIT © 2025 [Shaswat Raj](https://github.com/sh20raj)

---

## ✨ Credits

Inspired by TypingMaster, MonkeyType, and Keybr — reimagined as a PWA for the next generation.

