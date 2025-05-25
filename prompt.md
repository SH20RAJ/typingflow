

### ✅ AI Prompt: Build a Typing Master Web App

> **Prompt:**

You are a full-stack AI developer. Build a **Typing Master Progressive Web App (PWA)** using:

* `Next.js 15 (App Router)`
* `Tailwind CSS v4`
* `Next-PWA` plugin for full offline access
* **Interactive SVG animations**
* **Gamified user experience**
* **Typing Master features parity**

The project must:

* Be clean, modern, mobile-first, and responsive.
* Work fully offline with pre-cached assets and lessons.
* Store progress using `localStorage` or `IndexedDB`.
* Use `Framer Motion` and `SVGs` for animations.
* Allow dynamic lesson creation and practice modes.

---

### 🧱 Project Structure & Setup

 **Create PWA Manifest**
   Add `/public/manifest.json` and icons for install support.
   use sharp library create images for different sizes. and create images for the website and app icons. create scriptts and run it.

---

### 💡 Features to Implement (Based on Typing Master)

1. **Typing Lessons**

   * Beginner → Expert levels
   * Focus on Home Row, Top Row, Bottom Row, Numbers, Symbols
   * Accuracy & speed tracking per session
   * Highlight misclicked keys with colors
   * Display finger usage & keys to press via SVG keyboard

2. **Practice Modes**

   * Custom Text Typing
   * Paragraph Mode
   * Code Typing Mode (JS, Python)
   * Games Mode

3. **Progress Tracking**

   * Typing speed (WPM)
   * Accuracy (%)
   * Mistakes per key
   * Heatmap of keyboard errors
   * Daily streak tracking

4. **Interactive Keyboard (SVG)**

   * Display real-time feedback on keys pressed
   * Highlight fingers (color-coded per hand)
   * Animate keystrokes with Framer Motion

5. **Typing Games**

   * Falling Letters
   * Word Invaders
   * Time Attack
   * Ghost Racer (race against past self or friends)

6. **User Dashboard**

   * Statistics visualization (charts, streaks)
   * Custom lesson creation
   * Theme selection
   * Offline/Online toggle
   * Language settings

7. **Gamification**

   * Badges, levels, XP system
   * Daily challenges
   * Leaderboard (local first, optional online)

---

### 📚 Teaching Instructions & Learning UX

Use an **intelligent step-by-step approach** for teaching:

* **Lesson Flow:**

  1. Animated demo of what to type (hand movement, key highlight)
  2. User practices → mistakes highlighted in real-time
  3. After session → show report card: WPM, accuracy, weak keys

* **Lesson Content**:

  * Begin with simple 2-key drills (`f` and `j`)
  * Introduce fingers one-by-one
  * Show hand positioning diagram
  * Use **audio feedback** for mistakes & encouragement

* **After Each Lesson:**

  * Show animated feedback (e.g., confetti, level up)
  * Unlock next level if user gets >90% accuracy
  * Let users replay or move on

* **Accessibility Options:**

  * Font size control
  * Dark mode
  * Voice narration

---

### 🧩 Bonus: Developer Notes

* Use Tailwind’s **dark mode** class strategy
* Create reusable components: `<TypingBox />`, `<KeyboardSVG />`, `<StatChart />`
* Store user state in localStorage (add IndexedDB later for scalability)
* Precache lessons in service worker (via next-pwa)
* Optimize animations using Framer Motion + SVG paths
* Include lazy loading and code splitting for performance

---

### 📦 Output Deliverables

* `/app` folder structure using Next.js App Router
* PWA-compatible: installable on desktop/mobile
* Fully working offline (pre-cached lessons and keyboard)
* All core features of Typing Master in modern UI
* Complete documentation in `README.md`