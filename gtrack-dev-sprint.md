# gTrack — Development Sprint Guide
**Repo:** https://github.com/quesada90/gTrack  
**Stack:** React 18 + TypeScript + Tailwind CSS + Vite  
**Deploy target:** Netlify (from GitHub, auto-deploy on push to main)  
**Last updated:** Mayo 2026

> Este documento es el briefing completo para Claude Code.  
> Contiene todo el contexto necesario — no hace falta leer otros archivos.  
> Referencia adicional: `CLAUDE.md` en la raíz del repo.

---

## Estado actual del repo

```
quesada90/gTrack/
├── bundle.html          ← build actual (generado manualmente, hay que migrar)
├── gtrack-app/          ← source React/TypeScript
│   ├── src/
│   │   ├── screens/     ← HomeScreen, OverviewScreen, WorkoutScreen,
│   │   │                   RestScreen, TransitionScreen, FinishScreen, SwimScreen
│   │   ├── components/
│   │   │   └── illustrations/  ← SVGs inline actuales (hay que reemplazar con GIFs)
│   │   ├── data/
│   │   │   └── rutina.ts       ← ejercicios hardcodeados FASE 2 (semanas 5-8)
│   │   ├── hooks/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
├── CLAUDE.md            ← contexto completo del proyecto
├── gtrack-PRD.md
└── gtrack-plan-tecnico.md
```

**Lo que funciona hoy:**
- ✅ Flujo completo workout → countdown → siguiente ejercicio → fin sesión
- ✅ Smart suggestion de día (localStorage)
- ✅ Módulo natación al final de sesión
- ✅ Dots de progreso de series
- ✅ Tips técnicos colapsables
- ✅ SVG ilustraciones (básicas, pendiente de reemplazar con GIFs)

**Lo que NO existe todavía:**
- ❌ Deploy en Netlify
- ❌ PWA (manifest + service worker)
- ❌ GIFs reales del dataset de ejercicios
- ❌ SetupScreen (semana actual, fase, fecha de inicio)
- ❌ Rutina Fase 1 (semanas 1-4) en paralelo a Fase 2

---

## Sprints de desarrollo

---

### 🟠 SPRINT 1 — Netlify deploy
**Objetivo:** La app accesible en URL pública desde el móvil  
**Tiempo estimado:** 1-2h  
**Prerequisito:** Ninguno — hacer primero

#### 1.1 Crear `netlify.toml` en la raíz del repo

```toml
[build]
  base      = "gtrack-app"
  command   = "npm run build"
  publish   = "gtrack-app/dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options        = "DENY"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/videos/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

#### 1.2 Verificar `vite.config.ts`

Asegurarse de que el build output es correcto:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  base: '/',
})
```

#### 1.3 Verificar `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

#### 1.4 Conectar en Netlify (manual — hace Javier)
1. netlify.com → "Add new site" → "Import from Git"
2. Seleccionar repo `quesada90/gTrack`
3. Build settings se leen de `netlify.toml` automáticamente
4. Deploy. URL resultante: `https://gtrack.netlify.app` o similar

---

### 🔵 SPRINT 2 — PWA instalable
**Objetivo:** "Añadir a pantalla de inicio" en iPhone Safari  
**Tiempo estimado:** 1h  
**Prerequisito:** Sprint 1 completado (necesita HTTPS para SW)

#### 2.1 Crear `gtrack-app/public/manifest.json`

```json
{
  "name": "gTrack",
  "short_name": "gTrack",
  "description": "Entrenamiento personal de gym para Javier",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0A0A0A",
  "theme_color": "#0A0A0A",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

#### 2.2 Generar iconos

Crear dos PNG con canvas o con herramienta de diseño:
- Fondo: `#0A0A0A`
- Texto: "gT" en tipografía mono, color blanco o naranja `#F97316`
- Tamaños: 192×192 y 512×512
- Guardar en `gtrack-app/public/icon-192.png` y `icon-512.png`

Si Claude Code no puede generar PNGs, usar este HTML generador temporal:
```html
<canvas id="c" width="512" height="512"></canvas>
<script>
const c = document.getElementById('c').getContext('2d');
c.fillStyle = '#0A0A0A'; c.fillRect(0,0,512,512);
c.fillStyle = '#F97316'; c.font = 'bold 200px monospace';
c.textAlign = 'center'; c.textBaseline = 'middle';
c.fillText('gT', 256, 256);
document.getElementById('c').toBlob(b => {
  const a = document.createElement('a'); a.href = URL.createObjectURL(b);
  a.download = 'icon-512.png'; a.click();
});
</script>
```

#### 2.3 Añadir `<link>` al `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <meta name="theme-color" content="#0A0A0A" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="gTrack" />
  <link rel="apple-touch-icon" href="/icon-192.png" />
  <link rel="manifest" href="/manifest.json" />
  <title>gTrack</title>
</head>
```

#### 2.4 Crear Service Worker `gtrack-app/public/sw.js`

**Estrategia: Cache agresivo en primera carga (todo se cachea al instalar)**

```javascript
const CACHE_NAME = 'gtrack-v1';

// Todos los assets a cachear en la primera carga
// IMPORTANTE: actualizar esta lista cuando se añadan GIFs
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // GIFs — se completa en Sprint 3
  '/videos/leg-press.gif',
  '/videos/chest-press.gif',
  '/videos/shoulder-press.gif',
  '/videos/pec-deck.gif',
  '/videos/triceps-pushdown.gif',
  '/videos/plank.gif',
  '/videos/dead-bug.gif',
  '/videos/pull-down.gif',
  '/videos/low-row.gif',
  '/videos/assisted-pull-up.gif',
  '/videos/bicep-curl.gif',
  '/videos/face-pull.gif',
  '/videos/dead-hang.gif',
  '/videos/side-plank.gif',
  '/videos/leg-extension.gif',
  '/videos/leg-curl.gif',
  '/videos/hip-abduction.gif',
  '/videos/hip-thrust.gif',
  '/videos/calf-raise.gif',
  '/videos/hollow-body.gif',
];

// INSTALL — cachea todo de golpe en primera carga
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE — limpia caches viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH — cache first, network fallback
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cachear nuevos assets dinámicamente
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
```

#### 2.5 Registrar Service Worker en `src/main.tsx`

```typescript
// Al final del archivo, después del ReactDOM.render
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW error:', err));
  });
}
```

#### 2.6 Verificar en iPhone (hace Javier)
1. Abrir la URL de Netlify en Safari iOS
2. Icono compartir → "Añadir a pantalla de inicio"
3. Confirmar que abre en modo standalone (sin barra de Safari)

---

### 🟢 SPRINT 3 — GIFs del dataset
**Objetivo:** Reemplazar SVGs básicos con GIFs animados del dataset  
**Tiempo estimado:** 1-2h  
**Prerequisito:** Dataset `hasaneyldrm/exercises-dataset` clonado localmente

#### Contexto del dataset

Repo: https://github.com/hasaneyldrm/exercises-dataset  
Estructura:
```
exercises-dataset/
├── data/exercises.json   ← 1,324 ejercicios con metadata
├── images/               ← thumbnails JPG
└── videos/               ← GIFs animados del movimiento
```

Licencia: educacional/no comercial. OK para uso personal.

#### 3.1 Script para extraer los 21 GIFs

Crear `scripts/extract-gifs.js` en la raíz del repo y ejecutarlo:

```javascript
// Uso: node scripts/extract-gifs.js <ruta-al-dataset>
// Ejemplo: node scripts/extract-gifs.js ../exercises-dataset

const fs = require('fs');
const path = require('path');

const datasetPath = process.argv[2];
if (!datasetPath) {
  console.error('Usage: node data/extract-gifs.js ../exercises-dataset');
  process.exit(1);
}

// Ejercicios que necesitamos y sus nombres normalizados
// Formato: { buscar: 'término de búsqueda', guardar: 'nombre-normalizado' }
const EXERCISES_NEEDED = [
  { buscar: 'leg press',          guardar: 'leg-press' },
  { buscar: 'chest press',        guardar: 'chest-press' },
  { buscar: 'shoulder press',     guardar: 'shoulder-press' },
  { buscar: 'pec deck',           guardar: 'pec-deck' },
  { buscar: 'tricep pushdown',    guardar: 'triceps-pushdown' },
  { buscar: 'plank',              guardar: 'plank' },
  { buscar: 'dead bug',           guardar: 'dead-bug' },
  { buscar: 'lat pulldown',       guardar: 'pull-down' },
  { buscar: 'seated row',         guardar: 'low-row' },
  { buscar: 'assisted pull',      guardar: 'assisted-pull-up' },
  { buscar: 'bicep curl',         guardar: 'bicep-curl' },
  { buscar: 'face pull',          guardar: 'face-pull' },
  { buscar: 'dead hang',          guardar: 'dead-hang' },
  { buscar: 'side plank',         guardar: 'side-plank' },
  { buscar: 'leg extension',      guardar: 'leg-extension' },
  { buscar: 'leg curl',           guardar: 'leg-curl' },
  { buscar: 'hip abduction',      guardar: 'hip-abduction' },
  { buscar: 'hip thrust',         guardar: 'hip-thrust' },
  { buscar: 'calf raise',         guardar: 'calf-raise' },
  { buscar: 'hollow body',        guardar: 'hollow-body' },
  { buscar: 'front plank',        guardar: 'plank-frontal' },
];

const exercisesJson = JSON.parse(
  fs.readFileSync(path.join(datasetPath, 'data', 'exercises.json'), 'utf8')
);

const outputDir = path.join(__dirname, '../gtrack-app/public/videos');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

let found = 0;
let missing = [];

EXERCISES_NEEDED.forEach(({ buscar, guardar }) => {
  // Buscar en el JSON por nombre (case insensitive)
  const match = exercisesJson.find(ex =>
    ex.name?.toLowerCase().includes(buscar.toLowerCase())
  );

  if (match) {
    // El GIF tiene el mismo nombre que la imagen pero en /videos/
    const gifFileName = match.images?.[0]?.replace('images/', 'videos/')
      || `videos/${match.id}.gif`;
    const sourcePath = path.join(datasetPath, gifFileName);
    const destPath = path.join(outputDir, `${guardar}.gif`);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ ${guardar}.gif (from: ${match.name})`);
      found++;
    } else {
      console.log(`⚠️  Found in JSON but no GIF file: ${match.name}`);
      missing.push(guardar);
    }
  } else {
    console.log(`❌ Not found: ${buscar}`);
    missing.push(guardar);
  }
});

console.log(`\n✅ ${found}/${EXERCISES_NEEDED.length} GIFs extracted`);
if (missing.length) {
  console.log(`❌ Missing: ${missing.join(', ')}`);
  console.log('→ For missing ones, keep the SVG fallback or search manually in the dataset');
}
```

**Ejecutar:**
```bash
cd /path/to/gTrack
node scripts/extract-gifs.js /path/to/exercises-dataset
```

#### 3.2 Añadir campo `gifUrl` a `src/data/rutina.ts`

Añadir el campo a la interfaz `Exercise` en `src/types/index.ts`:
```typescript
export interface Exercise {
  // ... campos existentes ...
  gifUrl: string        // ruta al GIF: '/videos/leg-press.gif'
  illustrationId: string  // mantener como fallback
}
```

Actualizar cada ejercicio en `rutina.ts`:
```typescript
// Día A
{ id: 'a1', nombre: 'Leg press',      gifUrl: '/videos/leg-press.gif',      illustrationId: 'leg-press', ... },
{ id: 'a2', nombre: 'Chest press',    gifUrl: '/videos/chest-press.gif',    illustrationId: 'chest-press', ... },
{ id: 'a3', nombre: 'Shoulder press', gifUrl: '/videos/shoulder-press.gif', illustrationId: 'shoulder-press', ... },
{ id: 'a4', nombre: 'Pec deck',       gifUrl: '/videos/pec-deck.gif',       illustrationId: 'pec-deck', ... },
{ id: 'a5', nombre: 'Triceps pushdown',gifUrl: '/videos/triceps-pushdown.gif',illustrationId:'triceps-pushdown',...},
{ id: 'a6', nombre: 'Plancha frontal',gifUrl: '/videos/plank.gif',          illustrationId: 'plancha-frontal', ... },
{ id: 'a7', nombre: 'Dead bug',       gifUrl: '/videos/dead-bug.gif',       illustrationId: 'dead-bug', ... },
// Día B
{ id: 'b1', nombre: 'Pull down',      gifUrl: '/videos/pull-down.gif',      illustrationId: 'pull-down', ... },
{ id: 'b2', nombre: 'Low row',        gifUrl: '/videos/low-row.gif',        illustrationId: 'low-row', ... },
{ id: 'b3', nombre: 'Assisted pull-up',gifUrl:'/videos/assisted-pull-up.gif',illustrationId:'assisted-pull-up',...},
{ id: 'b4', nombre: 'Curl bíceps',    gifUrl: '/videos/bicep-curl.gif',     illustrationId: 'curl-biceps', ... },
{ id: 'b5', nombre: 'Face pull',      gifUrl: '/videos/face-pull.gif',      illustrationId: 'face-pull', ... },
{ id: 'b6', nombre: 'Dead hang',      gifUrl: '/videos/dead-hang.gif',      illustrationId: 'dead-hang', ... },
{ id: 'b7', nombre: 'Plancha lateral',gifUrl: '/videos/side-plank.gif',     illustrationId: 'plancha-lateral', ... },
// Día C
{ id: 'c1', nombre: 'Leg press',      gifUrl: '/videos/leg-press.gif',      illustrationId: 'leg-press', ... },
{ id: 'c2', nombre: 'Leg extension',  gifUrl: '/videos/leg-extension.gif',  illustrationId: 'leg-extension', ... },
{ id: 'c3', nombre: 'Leg curl',       gifUrl: '/videos/leg-curl.gif',       illustrationId: 'leg-curl', ... },
{ id: 'c4', nombre: 'Hip abduction',  gifUrl: '/videos/hip-abduction.gif',  illustrationId: 'hip-abduction', ... },
{ id: 'c5', nombre: 'Hip thrust',     gifUrl: '/videos/hip-thrust.gif',     illustrationId: 'hip-thrust', ... },
{ id: 'c6', nombre: 'Elevación talones',gifUrl:'/videos/calf-raise.gif',    illustrationId:'elevacion-talones',...},
{ id: 'c7', nombre: 'Hollow body',    gifUrl: '/videos/hollow-body.gif',    illustrationId: 'hollow-body', ... },
```

#### 3.3 Reemplazar SVG con GIF + fallback en `WorkoutScreen.tsx`

```tsx
// Nuevo componente ExerciseMedia — reemplaza ExerciseIllustration
const ExerciseMedia = ({ 
  gifUrl, 
  illustrationId, 
  dayColor, 
  nombre 
}: { 
  gifUrl: string; 
  illustrationId: string; 
  dayColor: string; 
  nombre: string; 
}) => {
  const [gifError, setGifError] = useState(false);

  if (!gifError) {
    return (
      <div className="flex justify-center mb-4">
        <div 
          className="rounded-xl overflow-hidden"
          style={{ 
            width: 200, 
            height: 200, 
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={gifUrl}
            alt={nombre}
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
            onError={() => setGifError(true)}
          />
        </div>
      </div>
    );
  }

  // Fallback al SVG si el GIF no carga
  return (
    <ExerciseIllustration
      illustrationId={illustrationId}
      dayColor={dayColor}
      size={160}
      animate={true}
    />
  );
};
```

#### 3.4 Actualizar lista PRECACHE_ASSETS en `sw.js`

Después de copiar los GIFs, actualizar la lista en el Service Worker con las rutas exactas de todos los GIFs que existen en `/videos/`.

---

### 🟣 SPRINT 4 — Setup Screen
**Objetivo:** Configurar semana actual, fase y fecha de inicio  
**Tiempo estimado:** 2h  
**Prerequisito:** Sprints 1-2 completados

#### Contexto

Javier está en **semana 2-3** pero la app tiene hardcodeada la rutina de **semanas 5-8**.  
Necesitamos:
1. Guardar la semana/fase actual en localStorage
2. Mostrar la rutina correcta según la fase
3. Calcular automáticamente la semana desde la fecha de inicio

#### 4.1 Añadir tipos a `src/types/index.ts`

```typescript
export interface AppConfig {
  startDate: string          // ISO date — fecha primer día de gym
  currentPhase: 1 | 2        // 1 = semanas 1-4, 2 = semanas 5-8
  manualWeekOverride?: number // override manual si el cálculo auto está mal
}

// Semana calculada (no se guarda, se calcula en runtime)
export function getCurrentWeek(config: AppConfig): number {
  if (config.manualWeekOverride) return config.manualWeekOverride;
  const days = Math.floor(
    (Date.now() - new Date(config.startDate).getTime()) / 86400000
  );
  return Math.min(Math.floor(days / 7) + 1, 12); // cap en semana 12
}
```

#### 4.2 Datos de Fase 1 en `src/data/rutina.ts`

Añadir la rutina original de las semanas 1-4 (la del PDF de We/On Balmes):

```typescript
export const RUTINA_FASE1: Record<'A' | 'B' | 'C', DayRoutine> = {
  A: {
    id: 'A',
    nombre: 'Fullbody',
    bloque: 'Semanas 1-4',
    color: '#F97316',
    ejercicios: [
      { id:'f1a1', nombre:'Leg press',     gifUrl:'/videos/leg-press.gif',     musculo:'Cuádriceps · Glúteos', series:4, reps:12, descanso:60, tip:'Pies a anchura de hombros' },
      { id:'f1a2', nombre:'Pull down',     gifUrl:'/videos/pull-down.gif',     musculo:'Dorsales · Bíceps',    series:4, reps:12, descanso:60, tip:'Agarre ancho' },
      { id:'f1a3', nombre:'Chest press',   gifUrl:'/videos/chest-press.gif',   musculo:'Pectorales · Tríceps', series:4, reps:12, descanso:60, tip:'Escápulas juntas' },
      { id:'f1a4', nombre:'Leg extension', gifUrl:'/videos/leg-extension.gif', musculo:'Cuádriceps',           series:4, reps:12, descanso:60, tip:'Contrae arriba' },
      { id:'f1a5', nombre:'Shoulder press',gifUrl:'/videos/shoulder-press.gif',musculo:'Deltoides · Tríceps',  series:4, reps:12, descanso:60, tip:'Core activado' },
      { id:'f1a6', nombre:'Low row',       gifUrl:'/videos/low-row.gif',       musculo:'Espalda media',        series:4, reps:12, descanso:60, tip:'No redondear' },
      { id:'f1a7', nombre:'Hip abduction', gifUrl:'/videos/hip-abduction.gif', musculo:'Abductores',           series:4, reps:12, descanso:60, tip:'Movimiento lento' },
    ]
  },
  // Fase 1 es Fullbody — mismo día A para B y C (con variación si se quiere)
  B: { /* igual que A, o copia con IDs distintos */ },
  C: { /* igual que A, o copia con IDs distintos */ },
}

// La Fase 2 ya existe — es la RUTINA actual (renombrar a RUTINA_FASE2)
export const RUTINA_FASE2: Record<'A' | 'B' | 'C', DayRoutine> = {
  // ... el contenido actual de RUTINA ...
}
```

#### 4.3 Crear `src/screens/SetupScreen.tsx`

```tsx
// SetupScreen — accesible desde el icono ⚙️ en el Home
// Guarda config en localStorage key: 'gtrack_config'

interface SetupScreenProps {
  config: AppConfig;
  onSave: (config: AppConfig) => void;
  onBack: () => void;
}

export const SetupScreen = ({ config, onSave, onBack }: SetupScreenProps) => {
  const [startDate, setStartDate] = useState(config.startDate || '2026-04-27');
  const [phase, setPhase] = useState<1 | 2>(config.currentPhase || 1);
  const [weekOverride, setWeekOverride] = useState<string>(
    config.manualWeekOverride?.toString() || ''
  );

  const calculatedWeek = getCurrentWeek({ startDate, currentPhase: phase });

  const handleSave = () => {
    onSave({
      startDate,
      currentPhase: phase,
      manualWeekOverride: weekOverride ? parseInt(weekOverride) : undefined,
    });
    onBack();
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100dvh', padding: '20px' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack}>← Volver</button>
        <h1 className="text-xl font-bold font-mono">⚙️ Configuración</h1>
      </div>

      {/* Fecha de inicio */}
      <section className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">
          Fecha de inicio del programa
        </label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="w-full h-12 rounded-xl px-4 text-white"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        />
        <p className="text-xs text-gray-500 mt-1">
          Semana actual calculada: <strong className="text-white">Semana {calculatedWeek}</strong>
        </p>
      </section>

      {/* Fase activa */}
      <section className="mb-6">
        <label className="text-sm text-gray-400 mb-3 block">
          Fase de entrenamiento activa
        </label>
        <div className="flex flex-col gap-3">
          {[
            { value: 1, label: 'Fase 1', sub: 'Semanas 1-4 · Fullbody inicial (We/On Balmes)' },
            { value: 2, label: 'Fase 2', sub: 'Semanas 5-8 · Empuje / Tirón / Pierna' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setPhase(opt.value as 1 | 2)}
              className="w-full rounded-xl p-4 text-left"
              style={{
                background: phase === opt.value ? 'var(--bg-elevated)' : 'var(--bg-card)',
                border: `1px solid ${phase === opt.value ? '#F97316' : 'var(--border)'}`,
              }}
            >
              <div className="font-bold font-mono">{opt.label}</div>
              <div className="text-xs text-gray-400 mt-1">{opt.sub}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Override manual de semana */}
      <section className="mb-8">
        <label className="text-sm text-gray-400 mb-2 block">
          Semana manual (opcional — sobreescribe el cálculo)
        </label>
        <input
          type="number"
          inputMode="numeric"
          min="1"
          max="12"
          placeholder={`Calculada: ${calculatedWeek}`}
          value={weekOverride}
          onChange={e => setWeekOverride(e.target.value)}
          className="w-full h-12 rounded-xl px-4 text-white"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        />
      </section>

      {/* Guardar */}
      <button
        onClick={handleSave}
        className="w-full h-16 rounded-xl font-bold font-mono text-lg"
        style={{ background: '#F97316', color: '#0A0A0A' }}
      >
        Guardar configuración
      </button>
    </div>
  );
};
```

#### 4.4 Conectar config en `App.tsx`

```tsx
// Estado global de config
const [config, setConfig] = useLocalStorage<AppConfig>('gtrack_config', {
  startDate: '2026-04-27',  // fecha primer entreno de Javier
  currentPhase: 1,          // empieza en fase 1 hasta que cambie en Setup
});

// Rutina activa según fase
const RUTINA_ACTIVA = config.currentPhase === 1 ? RUTINA_FASE1 : RUTINA_FASE2;

// Pasar rutina activa a todas las pantallas que la necesitan
// Pasar config a SwimScreen para mostrar progresión correcta de natación
```

#### 4.5 Añadir botón ⚙️ en `HomeScreen`

```tsx
// En el header del HomeScreen, esquina superior derecha
<button 
  onClick={() => navigate('setup')}
  className="absolute top-5 right-5 text-gray-400 text-xl"
>
  ⚙️
</button>
```

#### 4.6 Actualizar `SwimScreen` para mostrar semana correcta

```tsx
// La progresión de natación depende de la semana actual
const currentWeek = getCurrentWeek(config);

const SWIM_PROGRESSION = [
  { semana: 1,  descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 2,  descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 3,  descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 4,  descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 5,  descripcion: '4 × 50m con 30s descanso, luego 2 × 25m' },
  { semana: 6,  descripcion: '3 × 75m con 30s descanso' },
  { semana: 7,  descripcion: '2 × 100m con 45s descanso + 1 × 50m' },
  { semana: 8,  descripcion: '1 × 200m continuo + 1 × 100m' },
];

const weekProtocol = SWIM_PROGRESSION.find(p => p.semana === currentWeek)
  || SWIM_PROGRESSION[SWIM_PROGRESSION.length - 1];
```

---

## Orden de ejecución recomendado

```
Día 1:  Sprint 1 (Netlify)     → app en URL pública
Día 1:  Sprint 2 (PWA)         → instalable en iPhone
Día 2:  Sprint 3 (GIFs)        → imágenes reales
Día 2:  Sprint 4 (Setup)       → configurar semana/fase
```

## Checklist final antes de usar en gym

- [ ] `netlify.toml` en raíz del repo
- [ ] Build funciona con `npm run build` en `gtrack-app/`
- [ ] App accesible en URL de Netlify
- [ ] manifest.json y iconos presentes
- [ ] Service Worker registrado (verificar en DevTools → Application → SW)
- [ ] "Añadir a pantalla de inicio" funciona en iPhone Safari
- [ ] App abre en modo fullscreen (sin barra de Safari)
- [ ] GIFs cargan en WorkoutScreen
- [ ] SVG fallback funciona cuando GIF no carga
- [ ] SetupScreen accesible desde Home (⚙️)
- [ ] Cambiar a Fase 1 muestra la rutina original de We/On Balmes
- [ ] Semana calculada correcta desde fecha 27/04/2026
- [ ] App funciona offline después de primera carga (probar con wifi off)
- [ ] Natación muestra progresión correcta según semana

---

## Notas para Gemini (planning) vs Claude (build)

**Pasarle a Gemini para planear:**
- Nuevas fases de entrenamiento (semanas 9-12)
- Diseño del módulo de historial con gráficas
- Estructura de datos para Supabase (fase 2)
- Estrategia de integración Apple Health

**Pasarle a Claude Code para construir:**
- Este documento completo
- El `CLAUDE.md` del repo
- El `gtrack-PRD.md` para contexto de producto
- Cualquier sprint específico de esta lista

**Cómo invocar Claude Code con este doc:**
```
"Build gTrack following the sprint guide. 
Start with Sprint 1 (Netlify deploy). 
Full context in CLAUDE.md and gtrack-dev-sprint.md"
```
