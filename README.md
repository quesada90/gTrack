# gTrack

A mobile-first gym tracker built for use at the gym between sets — no login, no backend, no distractions. Open it on your iPhone and go.

> Personal project by Javier Quesada. Built for We/On Balmes gym sessions.

---

## What it does

gTrack guides you through a structured 2-phase training program, exercise by exercise, serie by serie — with rest countdowns, technique tips, and a swim log for post-gym pool sessions.

**Phase 1 — Weeks 1–4:** Fullbody (3× per week, same exercises each session)  
**Phase 2 — Weeks 5–8:** Push / Pull / Legs split (Days A / B / C)

---

## Screens

| Screen | What it shows |
|---|---|
| **Home** | Today's date, current week, suggested next day (A→B→C cycle), last session info |
| **Overview** | Full exercise list for the selected day — series, reps, rest, muscle group |
| **Workout** | Exercise name, animated SVG illustration, series progress dots, technique tip accordion |
| **Rest** | Circular countdown timer, audio bip on finish, skip button, next exercise preview |
| **Transition** | Exercise completion screen, auto-advances after 1.5s |
| **Finish** | Workout summary (exercises, duration, total series), prompt to log a swim |
| **Swim** | Weekly swim protocol guide + form to log distance, time, calories, heart rate |
| **Setup** | Set program start date, active phase, manual week override |

---

## Stack

- **React 18** + TypeScript
- **Tailwind CSS 3.4**
- **Vite** (dev server) + **Parcel** + `html-inline` (single-file bundle)
- **localStorage only** — no backend, no accounts
- **Web Audio API** — 880Hz bip when rest countdown hits zero
- Zero external API calls — works offline after first load

---

## Project structure

```
gtrack-app/
└── src/
    ├── App.tsx                        ← screen router + state machine
    ├── types/index.ts                 ← all TypeScript types + AppConfig helpers
    ├── data/rutina.ts                 ← hardcoded workout data (Phase 1 + Phase 2)
    ├── hooks/
    │   ├── useLocalStorage.ts
    │   ├── useCountdown.ts            ← interval timer with bip callback
    │   └── useAudioBip.ts             ← Web Audio API bip
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── OverviewScreen.tsx
    │   ├── WorkoutScreen.tsx          ← GIF → SVG fallback for exercise media
    │   ├── RestScreen.tsx             ← circular SVG countdown
    │   ├── TransitionScreen.tsx
    │   ├── FinishScreen.tsx
    │   ├── SwimScreen.tsx             ← weekly swim protocol + log form
    │   └── SetupScreen.tsx
    └── components/
        ├── BigButton.tsx
        ├── DayCard.tsx
        ├── DayCard.tsx
        ├── SeriesDots.tsx
        ├── ProgressBar.tsx
        ├── TipAccordion.tsx
        ├── ExerciseIllustration.tsx   ← SVG wrapper
        └── illustrations/index.ts    ← 20 inline SVG exercise diagrams
```

---

## App state flow

```
home → overview → workout → rest → workout (loop per serie)
                                 ↓ (last serie)
                               rest → transition → workout (next exercise)
                                                 → finish (last exercise)
                                                     ↓
                                               swim / home
```

Config and last session are persisted to `localStorage`:

| Key | Value |
|---|---|
| `gtrack_last_session` | `{ day: 'A'\|'B'\|'C', date: ISO string }` |
| `gtrack_swim_log` | `SwimEntry[]` |
| `gtrack_config` | `{ startDate, currentPhase, manualWeekOverride? }` |

---

## Dev setup

```bash
cd gtrack-app
npm install
npm run dev
```

## Build to single HTML file

The entire app (React, CSS, JS) bundles into one self-contained `bundle.html`:

```bash
cd gtrack-app
npx vite build --outDir dist-vite
npx html-inline dist-vite/index.html > ../bundle.html
```

Open `bundle.html` directly in Safari on iPhone — no server needed.

---

## Design system

```css
--bg-primary:   #0A0A0A   /* screen backgrounds */
--bg-card:      #141414   /* cards */
--bg-elevated:  #1C1C1C   /* elevated surfaces */
--text-primary: #F5F5F5
--text-secondary: #888888
--text-muted:   #444444
--border:       #2A2A2A
--day-a:        #F97316   /* orange */
--day-b:        #06B6D4   /* cyan */
--day-c:        #22C55E   /* green */
--swim:         #3B82F6   /* blue */
```

Typography uses `font-mono` for all countdowns, exercise names, and display figures — prevents digit-jumping on live timers.

---

## iOS notes

- Viewport `maximum-scale=1` prevents zoom on input focus
- `AudioContext` is only created inside tap handlers (Safari requirement)
- Full-screen uses `100dvh` (dynamic viewport height, avoids browser chrome overlap)
- All tap targets are minimum 44px tall
