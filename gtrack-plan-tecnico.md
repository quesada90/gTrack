# gTrack — Plan Técnico Paso a Paso
**Para:** Claude Code  
**Stack:** React 18 + TypeScript + Tailwind CSS → Single HTML file

---

## Arquitectura de componentes

```
App
├── screens/
│   ├── HomeScreen          ← selección de día + smart suggestion
│   ├── OverviewScreen      ← lista de ejercicios del día
│   ├── WorkoutScreen       ← ejercicio activo (pantalla principal)
│   ├── RestScreen          ← countdown de descanso
│   ├── TransitionScreen    ← "ejercicio completado" (1.5s)
│   ├── FinishScreen        ← resumen de sesión
│   └── SwimScreen          ← registro datos natación
├── components/
│   ├── DayCard             ← tarjeta en home (A/B/C/Swim)
│   ├── ProgressBar         ← barra de progreso de sesión
│   ├── SeriesDots          ← dots ●●○○
│   ├── CountdownTimer      ← display MM:SS
│   ├── BigButton           ← botón principal reutilizable
│   └── TipAccordion        ← tip técnico colapsable
├── data/
│   └── rutina.ts           ← datos hardcoded de los 3 días
├── hooks/
│   ├── useWorkoutSession   ← estado completo de la sesión activa
│   ├── useCountdown        ← lógica del timer
│   ├── useLocalStorage     ← wrapper typed para localStorage
│   └── useAudioBip         ← Web Audio API bip
└── types/
    └── index.ts            ← interfaces TypeScript
```

---

## Paso 1 — Setup del proyecto

```bash
bash /mnt/skills/examples/web-artifacts-builder/scripts/init-artifact.sh gtrack
cd gtrack
```

---

## Paso 2 — Types (`src/types/index.ts`)

```typescript
export interface Exercise {
  id: string
  nombre: string
  subtitulo?: string
  musculo: string
  series: number
  reps: number | string   // string para "Máx tiempo" o "30s"
  descanso: number        // segundos
  tip?: string
  isTime?: boolean        // true si reps es tiempo (plancha, dead hang)
}

export interface DayRoutine {
  id: 'A' | 'B' | 'C'
  nombre: string
  bloque: string
  color: string
  colorDark: string
  ejercicios: Exercise[]
}

export interface WorkoutSession {
  dayId: 'A' | 'B' | 'C'
  startedAt: Date
  currentExerciseIndex: number
  currentSerieIndex: number     // 0-based
  completedExercises: string[]  // exercise ids
  phase: 'overview' | 'exercise' | 'rest' | 'transition' | 'finish'
}

export interface LastSession {
  day: 'A' | 'B' | 'C'
  date: string   // ISO date string
}

export interface SwimEntry {
  date: string
  swam: boolean
  distance?: number      // metros
  time?: string          // "mm:ss"
  calories?: number
  heartRate?: number
}
```

---

## Paso 3 — Datos de rutina (`src/data/rutina.ts`)

Hardcodear los 3 días completos con todos los campos del PRD.
Exportar como `RUTINA: Record<'A'|'B'|'C', DayRoutine>`.

También incluir:
```typescript
export const SWIM_PROGRESSION = [
  { semana: 5, descripcion: "4 × 50m con 30s descanso, luego 2 × 25m" },
  { semana: 6, descripcion: "3 × 75m con 30s descanso" },
  { semana: 7, descripcion: "2 × 100m con 45s descanso + 1 × 50m" },
  { semana: 8, descripcion: "1 × 200m continuo + 1 × 100m" },
]
```

---

## Paso 3b — Ilustraciones SVG (`src/components/illustrations/`)

Crear un archivo SVG inline por ejercicio, como componentes React tipados.

**Estructura:**
```
src/components/illustrations/
├── index.ts                    ← exporta todos los componentes
├── ExerciseIllustration.tsx    ← wrapper con animación
├── LegPress.tsx
├── ChestPress.tsx
├── ShoulderPress.tsx
├── PecDeck.tsx
├── TricepsPushdown.tsx
├── PlanchaFrontal.tsx
├── DeadBug.tsx
├── PullDown.tsx
├── LowRow.tsx
├── AssistedPullUp.tsx
├── CurlBiceps.tsx
├── FacePull.tsx
├── DeadHang.tsx
├── PlanchaLateral.tsx
├── LegExtension.tsx
├── LegCurl.tsx
├── HipAbduction.tsx
├── HipThrust.tsx
├── ElevacionTalones.tsx
└── HollowBody.tsx
```

**Interfaz del componente wrapper:**
```typescript
interface ExerciseIllustrationProps {
  exerciseId: string      // mapea al componente correcto
  dayColor: string        // color CSS del día (para músculo activo)
  size?: number           // default 160
  animate?: boolean       // default true — pulso en músculo
}
```

**Convención interna de cada SVG:**
```tsx
// Ejemplo: LegPress.tsx
export const LegPress = ({ muscleColor, animate }: IllustrationProps) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {/* Máquina — gris muy oscuro */}
    <rect x="20" y="80" width="160" height="8" fill="#2A2A2A" rx="2"/>
    
    {/* Figura humana — gris medio */}
    <circle cx="60" cy="40" r="12" fill="#4B4B4B"/>  {/* cabeza */}
    <line x1="60" y1="52" x2="60" y2="100" stroke="#4B4B4B" strokeWidth="4"/>
    
    {/* Músculo activo — color del día + animación */}
    <path 
      d="M60,100 L100,140 L120,120 L80,90 Z" 
      fill={muscleColor}
      className={animate ? 'muscle-pulse' : ''}
    />
  </svg>
)
```

**CSS para la animación (en index.css):**
```css
@keyframes muscle-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}
.muscle-pulse {
  animation: muscle-pulse 2s ease-in-out infinite;
}
```

**Mapa de ejercicio → componente (en rutina.ts):**
```typescript
// Añadir campo illustrationId a cada Exercise
{
  id: "a1",
  nombre: "Leg press",
  illustrationId: "leg-press",   // ← nuevo campo
  ...
}
```

---

## Paso 4 — Hooks

### `useLocalStorage<T>(key, defaultValue)`
- Wrapper typed sobre localStorage
- Serializa/deserializa JSON automáticamente
- Returns: [value, setValue]

### `useAudioBip()`
- Usa Web Audio API para generar bip programáticamente (sin archivos externos)
- Bip: oscillator de 880Hz, 0.15s de duración, fade out suave
- Returns: `{ playBip: () => void }`

### `useCountdown(seconds, onComplete)`
- Recibe segundos iniciales y callback al llegar a 0
- Returns: `{ timeLeft, isRunning, start, pause, reset, skip }`
- Llama a `playBip()` en onComplete

### `useWorkoutSession(dayId)`
- Estado central de la sesión
- Maneja: ejercicio actual, serie actual, fase
- Returns: `{ session, markSerieComplete, skipRest, nextExercise, finishSession }`

---

## Paso 5 — Pantallas

### HomeScreen
- Logo "gTrack" en esquina superior
- Smart suggestion: leer `lastSession` de localStorage
  - Si existe: "Último: Día X · hace Y días · Hoy toca: Día Z"
  - Si no: "¿Qué entrenas hoy?"
- 4 tarjetas: A (naranja), B (cyan), C (verde), Swim (azul)
- Cada tarjeta: color de fondo sutil, nombre, bloque, N ejercicios
- Al tap → navigate a OverviewScreen (o SwimScreen para Swim)

### OverviewScreen
- Header con color del día + nombre + botón back
- Lista de ejercicios numerados
- Cada item: número, nombre, series×reps, músculo
- Botón "EMPEZAR" grande al fondo → inicia WorkoutSession

### WorkoutScreen
- ProgressBar arriba (ejercicio X de Y)
- Chip pequeño: nombre del músculo
- Nombre ejercicio: tipografía 36-40px, bold
- Reps: "× 10 repeticiones" o "× 30 segundos"
- SeriesDots: ●●○○ + texto "Serie 2 de 4"
- TipAccordion: "💡 Ver tip técnico" colapsable
- Texto pequeño abajo: "siguiente → [nombre siguiente ejercicio]"
- BigButton: "✓ SERIE HECHA" → marca serie y lanza countdown

### RestScreen
- Header: "DESCANSANDO"
- CountdownTimer: display enorme MM:SS (font 72px mínimo)
- Barra de progreso del countdown (va vaciándose)
- Texto: "Serie X completada · Serie Y de Z en [nombre ejercicio]"
- BigButton secundario: "SALTAR →"

### TransitionScreen (auto 1.5s)
- Fondo del color del día
- "✓ [Nombre ejercicio]" con checkmark animado
- "completado" debajo
- Fade automático al siguiente ejercicio

### FinishScreen
- Emoji grande (🎉 o 💪)
- "¡Sesión completa, Javier!"
- Nombre del día
- Stats: ejercicios ✓, series totales ✓, tiempo total
- Recordatorio: "Ahora: 30 min croll 🏊"
- Dos botones: "Registrar natación" y "Volver al inicio"
- Al volver: guarda lastSession en localStorage

### SwimScreen
- Header "Natación 🏊"
- Chip: semana actual + protocolo (de SWIM_PROGRESSION)
- Toggle grande: "¿Nadé hoy?"
- Si toggle ON → aparecen inputs:
  - Distancia (número, metros)
  - Tiempo (text, "mm:ss")
  - Calorías (número)
  - Frec. cardíaca (número, opcional)
- Botón "Guardar" → append a swimLog en localStorage
- Confirmación visual

---

## Paso 6 — Estilos y tokens de diseño

```css
/* CSS Variables */
--bg-primary: #0A0A0A
--bg-card: #141414
--bg-elevated: #1C1C1C
--text-primary: #F5F5F5
--text-secondary: #888888
--text-muted: #444444
--border: #2A2A2A

--day-a: #F97316      /* Naranja — Empuje */
--day-b: #06B6D4      /* Cyan — Tirón */
--day-c: #22C55E      /* Verde — Pierna */
--swim: #3B82F6       /* Azul — Natación */

/* Typography */
--font-display: 'Space Mono' o 'DM Mono' (monoespaciada para números)
--font-body: 'Geist' o 'IBM Plex Sans'

/* Spacing */
--button-height: 64px
--card-radius: 12px
--screen-padding: 20px
```

**Fuente recomendada para números del countdown:** Monoespaciada para que no "baile" al cambiar dígitos.

---

## Paso 7 — Lógica de smart suggestion

```typescript
function getSuggestedDay(lastSession: LastSession | null): 'A' | 'B' | 'C' {
  if (!lastSession) return 'A'
  const cycle: ('A' | 'B' | 'C')[] = ['A', 'B', 'C']
  const lastIndex = cycle.indexOf(lastSession.day)
  return cycle[(lastIndex + 1) % 3]
}

function daysSince(dateString: string): number {
  const last = new Date(dateString)
  const now = new Date()
  return Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
}
```

---

## Paso 8 — Web Audio bip

```typescript
function playBip() {
  const ctx = new AudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.frequency.value = 880        // Hz — tono agudo pero no molesto
  osc.type = 'sine'
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
  
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.15)
}
```

---

## Paso 9 — Bundle y deploy

```bash
bash /mnt/skills/examples/web-artifacts-builder/scripts/bundle-artifact.sh
```

Output: `bundle.html` — archivo único, sin dependencias externas, funciona offline.

---

## Paso 10 — Testing manual (checklist)

- [ ] Home muestra sugerencia correcta según lastSession
- [ ] Seleccionar día A/B/C navega a overview correcto
- [ ] "Empezar" inicia en ejercicio 1, serie 1
- [ ] "Serie hecha" activa countdown con tiempo correcto
- [ ] Countdown cuenta hacia atrás correctamente
- [ ] Bip suena al llegar a 0
- [ ] "Saltar" cancela countdown y vuelve al ejercicio
- [ ] Al completar 4 series → pasa al siguiente ejercicio
- [ ] Pantalla de transición dura ~1.5s y avanza sola
- [ ] Al completar todos los ejercicios → FinishScreen
- [ ] FinishScreen guarda lastSession en localStorage
- [ ] SwimScreen guarda datos en swimLog
- [ ] Recarga de página → home normal (no rompe nada)
- [ ] Funciona en Safari iOS (viewport, audio)

---

## Consideraciones Safari iOS

- `AudioContext` requiere ser creado dentro de un user gesture (tap) — crear al primer tap del usuario, no al cargar
- `vh` en Safari tiene comportamiento especial con la barra del browser — usar `dvh` o calcular con JS
- Inputs de tipo `number` en iOS pueden mostrar teclado numérico con `inputMode="numeric"`
