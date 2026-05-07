# CLAUDE.md — gTrack Gym Tracker App

## What you're building

gTrack is a mobile-first single-page workout tracker webapp for use at the gym. No backend, no login. Pure React + TypeScript + Tailwind, bundled into a single HTML file.

**Primary user:** Javier Quesada, uses this on his iPhone at the gym between sets.

---

## Stack

- React 18 + TypeScript
- Tailwind CSS 3.4
- Vite (dev) + Parcel (bundle to single HTML)
- localStorage only — no backend
- Web Audio API for bip sound
- Zero external API calls

---

## Project structure

```
src/
├── App.tsx                  ← router/screen switcher
├── main.tsx                 ← entry point
├── index.css                ← tailwind directives + CSS vars
├── types/index.ts           ← all TypeScript interfaces
├── data/rutina.ts           ← hardcoded workout data
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useCountdown.ts
│   ├── useAudioBip.ts
│   └── useWorkoutSession.ts
├── screens/
│   ├── HomeScreen.tsx
│   ├── OverviewScreen.tsx
│   ├── WorkoutScreen.tsx
│   ├── RestScreen.tsx
│   ├── TransitionScreen.tsx
│   ├── FinishScreen.tsx
│   └── SwimScreen.tsx
└── components/
    ├── DayCard.tsx
    ├── ProgressBar.tsx
    ├── SeriesDots.tsx
    ├── CountdownTimer.tsx
    ├── BigButton.tsx
    └── TipAccordion.tsx
```

---

## Design system

### Colors (CSS variables in index.css)

```css
:root {
  --bg-primary: #0A0A0A;
  --bg-card: #141414;
  --bg-elevated: #1C1C1C;
  --text-primary: #F5F5F5;
  --text-secondary: #888888;
  --text-muted: #444444;
  --border: #2A2A2A;
  --day-a: #F97316;
  --day-b: #06B6D4;
  --day-c: #22C55E;
  --swim: #3B82F6;
}
```

### Typography
- Display / exercise names: `font-mono` — prevents digit jumping in countdowns
- Body: `font-sans` with `antialiased`
- Exercise name on workout screen: `text-4xl font-bold` minimum
- Countdown display: `text-8xl font-mono font-bold`

### Spacing and sizing
- Screen padding: `px-5` (20px)
- BigButton height: minimum `h-16` (64px), full width `w-full`
- Cards: `rounded-xl` with `border border-[var(--border)]`
- Background on all screens: `bg-[var(--bg-primary)]`

### Never use
- White or light backgrounds
- Inter or Roboto as primary font
- Purple or generic gradient schemes
- Small tap targets (anything interactive must be min 44px tall)

---

## Data structures

### Types (src/types/index.ts)

```typescript
export interface Exercise {
  id: string
  nombre: string
  subtitulo?: string
  musculo: string
  series: number
  reps: number | string
  descanso: number        // seconds
  tip?: string
  isTime?: boolean        // true when reps is duration (plank, dead hang)
}

export interface DayRoutine {
  id: 'A' | 'B' | 'C'
  nombre: string
  bloque: string
  color: string
  ejercicios: Exercise[]
}

export interface WorkoutSession {
  dayId: 'A' | 'B' | 'C'
  startedAt: string
  currentExerciseIndex: number
  currentSerieIndex: number
  phase: 'overview' | 'exercise' | 'rest' | 'transition' | 'finish'
}

export interface LastSession {
  day: 'A' | 'B' | 'C'
  date: string
}

export interface SwimEntry {
  date: string
  swam: boolean
  distance?: number
  time?: string
  calories?: number
  heartRate?: number
}
```

---

## Rutina data (src/data/rutina.ts)

### Día A — Empuje + Core | color: #F97316

1. Leg press | Cuádriceps · Glúteos | 2×15 | 45s | "Pies a anchura de hombros, rodillas sin bloquear"
2. Chest press | Pectorales · Tríceps | 4×10 | 75s | "Escápulas juntas, no elevar hombros"
3. Shoulder press | Deltoides · Tríceps | 4×10 | 75s | "Core activado, no arquear la espalda"
4. Pec deck | Pectorales | 3×12 | 60s | "Movimiento controlado, no rebotar"
5. Triceps pushdown | Tríceps | 3×12 | 60s | "Usa barra EZ o cuerda — muñeca neutra"
6. Plancha frontal | Core | 4×30s | 45s | isTime:true | "Cadera alineada, respiración continua"
7. Dead bug | Core | 3×10/lado | 45s | "Espalda baja pegada al suelo"

### Día B — Tirón + Pull-up | color: #06B6D4

1. Pull down | Dorsales · Bíceps | 4×10 | 75s | "Agarre ancho, lleva el codo hacia la cadera"
2. Low row | Espalda media · Bíceps | 4×10 | 75s | "No redondear la espalda al tirar"
3. Assisted pull-up | Dorsales · Bíceps | 4×8 | 90s | "⭐ Baja 5kg de asistencia cada 2 semanas"
4. Curl bíceps polea | Bíceps | 3×12 | 60s | "Codos fijos, muñeca neutra"
5. Face pull polea | Deltoides posterior | 3×15 | 60s | "Codos altos, lleva manos a las orejas"
6. Dead hang barra | Agarre · Columna | 3×max | 60s | isTime:true | "Relaja los hombros, respira"
7. Plancha lateral | Core lateral | 3×25s/lado | 45s | isTime:true | "Cadera arriba, cuerpo recto"

### Día C — Pierna + Cadera | color: #22C55E

1. Leg press | Cuádriceps · Glúteos | 4×10 | 75s | "Empuja con el talón, no con la punta"
2. Leg extension | Cuádriceps | 3×12 | 60s | "Contrae el cuádriceps arriba, baja lento"
3. Leg curl | Isquiotibiales | 4×10 | 75s | "No levantar la cadera al subir"
4. Hip abduction | Abductores · Glúteo medio | 3×15 | 60s | "Movimiento lento y controlado"
5. Hip thrust | Glúteo mayor | 4×10 | 75s | "Empuja con talones, contrae glúteo arriba"
6. Elevación talones | Gemelos | 3×15 | 45s | "Pausa 1 segundo arriba"
7. Hollow body hold | Core | 3×20s | 45s | isTime:true | "Espalda baja pegada al suelo"

---

## Exercise illustrations (SVG inline)

All exercise illustrations are **inline SVG React components**. No external images, no API calls. Works offline.

### Location
```
src/components/illustrations/
├── index.ts                 ← re-exports all + ILLUSTRATION_MAP
├── ExerciseIllustration.tsx ← wrapper component
└── [ExerciseName].tsx       ← one file per exercise (21 total)
```

### ExerciseIllustration wrapper
```tsx
interface ExerciseIllustrationProps {
  illustrationId: string   // from exercise data
  dayColor: string         // hex color of current day (A/B/C)
  size?: number            // default 160
  animate?: boolean        // default true
}
```

### SVG conventions for each illustration
- ViewBox: always `0 0 200 200`
- Machine/equipment: `fill="#2A2A2A"` or `stroke="#333333"`
- Human figure (body): `fill="#4B4B4B"` or `stroke="#555555"`
- **Active muscle**: `fill={muscleColor}` — receives the day color as prop
- Active muscle element: `className={animate ? 'muscle-pulse' : ''}`

### CSS animation (add to index.css)
```css
@keyframes muscle-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
.muscle-pulse {
  animation: muscle-pulse 2s ease-in-out infinite;
}
```

### Illustration map (in index.ts)
```typescript
export const ILLUSTRATION_MAP: Record<string, React.FC<IllustrationProps>> = {
  'leg-press': LegPress,
  'chest-press': ChestPress,
  'shoulder-press': ShoulderPress,
  'pec-deck': PecDeck,
  'triceps-pushdown': TricepsPushdown,
  'plancha-frontal': PlanchaFrontal,
  'dead-bug': DeadBug,
  'pull-down': PullDown,
  'low-row': LowRow,
  'assisted-pull-up': AssistedPullUp,
  'curl-biceps': CurlBiceps,
  'face-pull': FacePull,
  'dead-hang': DeadHang,
  'plancha-lateral': PlanchaLateral,
  'leg-extension': LegExtension,
  'leg-curl': LegCurl,
  'hip-abduction': HipAbduction,
  'hip-thrust': HipThrust,
  'elevacion-talones': ElevacionTalones,
  'hollow-body': HollowBody,
}
```

### Updated Exercise type (add illustrationId)
```typescript
export interface Exercise {
  id: string
  nombre: string
  subtitulo?: string
  musculo: string
  series: number
  reps: number | string
  descanso: number
  tip?: string
  isTime?: boolean
  illustrationId: string   // ← NEW: maps to ILLUSTRATION_MAP key
}
```

### What each SVG should convey
Each SVG needs to show at a glance: what machine/position to use + which muscle fires.
Keep paths simple — 10-20 elements max per SVG. Schematic > realistic.

| illustrationId | Muscle highlighted | Key visual element |
|---|---|---|
| leg-press | Quadriceps (front thigh) | Reclined figure, legs extended against platform |
| chest-press | Pectorals (chest) | Seated figure, arms pushing forward |
| shoulder-press | Deltoids (shoulders) | Seated figure, arms raised overhead |
| pec-deck | Pectorals (chest) | Seated figure, arms in frontal arc |
| triceps-pushdown | Triceps (back upper arm) | Standing figure, elbows fixed, pushing down |
| plancha-frontal | Core (abdomen) | Horizontal figure on elbows |
| dead-bug | Core (abdomen) | Figure on back, opposite arm+leg extended |
| pull-down | Lats (back) | Seated figure, bar pulling down from above |
| low-row | Mid-back | Seated figure, pulling bar toward chest |
| assisted-pull-up | Lats + biceps | Figure hanging from bar, knees on pad |
| curl-biceps | Biceps (front upper arm) | Standing figure, curling upward |
| face-pull | Rear deltoids | Standing figure, pulling rope to face height |
| dead-hang | Hands/grip | Figure hanging straight from bar |
| plancha-lateral | Lateral core | Side figure, one elbow support |
| leg-extension | Quadriceps (front thigh) | Seated figure, legs lifting horizontally |
| leg-curl | Hamstrings (back thigh) | Prone figure, legs curling up |
| hip-abduction | Outer thigh/glute med | Seated figure, legs spreading apart |
| hip-thrust | Glutes (buttocks) | Semi-reclined figure, hips pushing up |
| elevacion-talones | Calves (lower leg) | Standing figure, rising on toes |
| hollow-body | Core | Flat-back figure, arms+legs extended low |

### Usage in WorkoutScreen
```tsx
<ExerciseIllustration
  illustrationId={exercise.illustrationId}
  dayColor={currentDay.color}
  size={160}
  animate={true}
/>
```



```
App state: screen = 'home' | 'overview' | 'workout' | 'rest' | 'transition' | 'finish' | 'swim'

home → overview (on day card tap)
overview → workout (on "Empezar" tap)
workout → rest (on "Serie hecha" tap)
rest → workout (on countdown end OR "Saltar" tap)
workout → transition (when all series of exercise complete)
transition → workout (auto after 1500ms, next exercise)
transition → finish (auto after 1500ms, if last exercise)
finish → swim (on "Registrar natación" tap)
finish → home (on "Volver" tap) ← saves lastSession here
swim → home (on "Guardar" or "Volver" tap)
```

---

## Key implementation details

### Smart day suggestion
```typescript
const CYCLE: ('A' | 'B' | 'C')[] = ['A', 'B', 'C']

function getNextDay(last: LastSession | null): 'A' | 'B' | 'C' {
  if (!last) return 'A'
  return CYCLE[(CYCLE.indexOf(last.day) + 1) % 3]
}

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}
```

### Audio bip (must be triggered inside user gesture)
```typescript
function playBip() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  } catch (e) {
    // Safari may block — fail silently
  }
}
```

### Countdown hook
```typescript
// useCountdown(initialSeconds, onComplete)
// Returns: { timeLeft, isActive, start, skip }
// Uses setInterval with cleanup on unmount
// Calls onComplete() and playBip() when timeLeft reaches 0
```

### localStorage keys
- `gtrack_last_session` → LastSession JSON
- `gtrack_swim_log` → SwimEntry[] JSON

---

## Safari iOS gotchas

1. **AudioContext**: Must be created inside a click/tap handler. Never on mount.
2. **Viewport height**: Use `min-h-screen` but also set `height: 100dvh` via inline style or CSS var for full-screen feel without browser chrome overlap.
3. **Number inputs**: Add `inputMode="numeric"` for proper iOS keyboard.
4. **Prevent zoom on input focus**: Add `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">` to the HTML.

---

## What NOT to build (out of scope)

- No login or authentication
- No backend or API calls  
- No workout history charts or graphs (Phase 2)
- No weight logging per exercise (Phase 2)
- No push notifications
- No Apple Health integration
- No exercise images or videos
- No editing workout data from UI

---

## Bundle command

```bash
bash scripts/bundle-artifact.sh
```

Output: `bundle.html` — self-contained, works offline, share directly.
