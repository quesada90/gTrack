# gTrack — Product Requirements Document
**Version:** 1.1  
**Date:** Mayo 2026  
**Owner:** Javier Quesada  
**Status:** Ready for development

---

## 1. Visión del producto

gTrack es una webapp mobile-first para uso en el gimnasio. Permite a Javier seguir su rutina de entrenamiento en tiempo real: ver el ejercicio activo, marcar series completadas, gestionar el descanso con countdown automático, y registrar sesiones de natación con datos del Apple Watch.

**Principio de diseño:** Una sola cosa a la vez. El móvil en el gym tiene que funcionar con un pulgar, pantalla brillante, sin pensar.

---

## 2. Usuarios

Usuario único: Javier Quesada, 36 años, Madrid.
- Entrena 3 días/semana en We/On Balmes
- Nada 30 min después de cada sesión de pesas
- Usa iPhone con Apple Watch
- No lleva el móvil a la piscina

---

## 3. Contexto de uso real

| Situación | Necesidad |
|---|---|
| Entre series en el gym | Ver qué toca, marcar serie, ver countdown |
| Antes de empezar | Saber qué día toca hoy |
| Después de nadar | Registrar datos del Apple Watch |
| Final de sesión | Confirmar que todo está hecho |

---

## 4. Funcionalidades — Fase 1 (MVP)

### 4.1 Selección de día
- Pantalla home con 3 tarjetas: Día A, Día B, Día C
- Cada tarjeta muestra: nombre del bloque, color identificativo, número de ejercicios
- **Smart suggestion:** La app recuerda el último día entrenado (localStorage) y sugiere el siguiente
- Indicador visual "último entrenamiento: hace X días · Día X"

### 4.2 Vista overview del día
- Lista completa de ejercicios del día seleccionado
- Nombre, series × reps, músculo trabajado
- Botón "Empezar sesión"

### 4.3 Ejercicio activo (pantalla principal)
- Barra de progreso de sesión (ej: "3 de 7")
- **Ilustración SVG del ejercicio** — ver sección 4.8
- Nombre del ejercicio — tipografía grande, legible desde lejos
- Subtítulo de músculo trabajado
- Series × reps
- Dots de progreso de series (●●○○)
- Tip técnico colapsable
- Nombre del ejercicio siguiente (contexto mínimo)
- **Botón grande: "✓ SERIE HECHA"** — ocupa al menos 40% del ancho

### 4.8 Ilustraciones SVG de ejercicios
**Decisión:** SVG inline generados y embebidos directamente en el código React.

**Justificación de la elección frente a alternativas:**
- Funciona 100% offline (crítico — señal irregular en gym)
- Animable con CSS sin dependencias externas
- Coherente con el dark theme de la app
- Sin licencias de terceros ni APIs externas
- Bundle HTML único, sin assets externos

**Especificación visual:**
- Estilo: silueta esquemática minimalista — figura humana + máquina simplificada
- Fondo: transparente (hereda `--bg-card` de la pantalla)
- Figura humana: `#4B4B4B` (gris medio sobre fondo oscuro)
- Máquina/equipo: `#2A2A2A` (gris muy oscuro, líneas estructurales)
- **Músculo(s) trabajados: color del día** (naranja/cyan/verde según Día A/B/C)
- Animación: `@keyframes muscle-pulse` — opacity 1.0 → 0.6 → 1.0, 2s infinite, solo en el músculo activo
- Tamaño en pantalla: 160×160px, centrado, encima del nombre del ejercicio
- ViewBox: `0 0 200 200` para todos los SVGs (consistencia)

**Los 21 SVGs a crear (uno por ejercicio):**

| Ejercicio | Músculo resaltado | Nota visual |
|---|---|---|
| Leg press | Cuádriceps anterior | Figura reclinada, piernas extendidas contra plataforma |
| Chest press | Pectorales | Figura sentada, brazos empujando hacia adelante |
| Shoulder press | Deltoides superior | Figura sentada, brazos subiendo sobre la cabeza |
| Pec deck | Pectorales | Figura sentada, brazos en arco frontal |
| Triceps pushdown | Tríceps posterior | Figura de pie, codos fijos, brazos hacia abajo |
| Plancha frontal | Core/abdomen | Figura horizontal, apoyo en codos |
| Dead bug | Core/abdomen | Figura en suelo boca arriba, pierna y brazo opuestos |
| Pull down | Dorsales | Figura sentada, barra bajando desde arriba |
| Low row | Espalda media | Figura sentada, tirando hacia el pecho |
| Assisted pull-up | Dorsales + Bíceps | Figura colgando de barra, rodillas en soporte |
| Curl bíceps polea | Bíceps | Figura de pie, codos fijos, curling hacia arriba |
| Face pull polea | Deltoides posterior | Figura de pie, tirando hacia la cara |
| Dead hang barra | Agarre (manos) | Figura colgando, brazos estirados |
| Plancha lateral | Core lateral | Figura de lado, apoyo en codo lateral |
| Leg extension | Cuádriceps anterior | Figura sentada, piernas subiendo horizontales |
| Leg curl | Isquiotibiales posterior | Figura tumbada boca abajo, piernas curvándose |
| Hip abduction | Abductores (exterior muslo) | Figura sentada, piernas abriéndose lateralmente |
| Hip thrust | Glúteos | Figura semi-reclinada, caderas empujando arriba |
| Elevación talones | Gemelos (pantorrilla) | Figura de pie, subiendo sobre los talones |
| Hollow body hold | Core | Figura en suelo, espalda plana, piernas y brazos extendidos |
| Plancha lateral | Core lateral | Figura de lado, apoyo en codo |

### 4.4 Countdown de descanso
- Se activa automáticamente al marcar serie
- Tiempo configurable por ejercicio (45s / 60s / 75s / 90s)
- Display grande con cuenta regresiva (MM:SS)
- **Bip de audio al llegar a 0** (Web Audio API)
- Botón "Saltar →" visible en todo momento
- Muestra: "Serie X completada · Siguiente: Serie Y de Z"

### 4.5 Transición entre ejercicios
- Al completar todas las series → pantalla de transición breve (1.5s)
- Muestra: "✓ [Nombre ejercicio] completado"
- Pasa automáticamente al siguiente ejercicio

### 4.6 Fin de sesión
- Pantalla de celebración
- Resumen: ejercicios completados, series totales, tiempo transcurrido
- Recordatorio: "Ahora: 30 min croll 🏊"
- Botón "Registrar natación" → abre módulo swim
- Botón "Volver al inicio"

### 4.7 Módulo de natación (post-gym)
- Accesible desde fin de sesión O desde home (tarjeta Swim)
- Checkbox: "¿Nadé hoy?"
- Inputs para datos del Apple Watch:
  - Distancia (metros)
  - Tiempo total (mm:ss)
  - Calorías activas
  - Frecuencia cardíaca promedio (opcional)
- Progresión visible: "Semana 5 · Objetivo: 4×50m"
- Botón "Guardar sesión de natación"

---

## 5. Datos y storage

### localStorage schema
```json
{
  "lastSession": {
    "day": "B",
    "date": "2026-05-07",
    "completedAt": "2026-05-07T10:45:00"
  },
  "swimLog": [
    {
      "date": "2026-05-07",
      "swam": true,
      "distance": 800,
      "time": "28:30",
      "calories": 245,
      "heartRate": 142
    }
  ]
}
```

### Rutina hardcoded (JSON interno)
Los ejercicios de los 3 días están definidos en el código. No hay backend ni CMS en Fase 1.

---

## 6. Rutina completa — datos para hardcodear

### Día A — Empuje + Core 🟠
| # | Ejercicio | Músculo | Series | Reps | Descanso | Tip |
|---|---|---|---|---|---|---|
| 1 | Leg press | Cuádriceps · Glúteos | 2 | 15 | 45s | Calentamiento — pies a anchura de hombros |
| 2 | Chest press | Pectorales · Tríceps | 4 | 10 | 75s | Escápulas juntas, no elevar hombros |
| 3 | Shoulder press | Deltoides · Tríceps | 4 | 10 | 75s | Core activado, no arquear la espalda |
| 4 | Pec deck | Pectorales | 3 | 12 | 60s | Movimiento controlado, no rebotar |
| 5 | Triceps pushdown | Tríceps | 3 | 12 | 60s | Barra EZ o cuerda — muñeca neutra |
| 6 | Plancha frontal | Core | 4 | 30s | 45s | Cadera alineada, respiración continua |
| 7 | Dead bug | Core | 3 | 10/lado | 45s | Espalda baja pegada al suelo |

### Día B — Tirón + Pull-up 🔵
| # | Ejercicio | Músculo | Series | Reps | Descanso | Tip |
|---|---|---|---|---|---|---|
| 1 | Pull down | Dorsales · Bíceps | 4 | 10 | 75s | Agarre ancho, lleva el codo hacia la cadera |
| 2 | Low row | Espalda media · Bíceps | 4 | 10 | 75s | No redondear la espalda al tirar |
| 3 | Assisted pull-up | Dorsales · Bíceps | 4 | 8 | 90s | ⭐ Progresión pull-up — baja contrapeso c/semana |
| 4 | Curl bíceps polea | Bíceps | 3 | 12 | 60s | Codos fijos, muñeca neutra |
| 5 | Face pull polea | Deltoides posterior | 3 | 15 | 60s | Codos altos, lleva manos a las orejas |
| 6 | Dead hang barra | Agarre · Descompresión | 3 | Máx tiempo | 60s | Relaja los hombros, respira |
| 7 | Plancha lateral | Core lateral | 3 | 25s/lado | 45s | Cadera arriba, cuerpo recto |

### Día C — Pierna + Cadera 🟢
| # | Ejercicio | Músculo | Series | Reps | Descanso | Tip |
|---|---|---|---|---|---|---|
| 1 | Leg press | Cuádriceps · Glúteos | 4 | 10 | 75s | Empuja con el talón, no con la punta |
| 2 | Leg extension | Cuádriceps | 3 | 12 | 60s | Contrae el cuádriceps arriba, baja lento |
| 3 | Leg curl | Isquiotibiales | 4 | 10 | 75s | No levantar la cadera al subir |
| 4 | Hip abduction | Abductores · Glúteo medio | 3 | 15 | 60s | Movimiento lento y controlado |
| 5 | Hip thrust | Glúteo mayor | 4 | 10 | 75s | Empuja con los talones, contrae glúteo arriba |
| 6 | Elevación talones | Gemelos | 3 | 15 | 45s | Pausa 1s arriba |
| 7 | Hollow body hold | Core | 3 | 20s | 45s | Espalda baja pegada al suelo |

---

## 7. Diseño visual

### Identidad
- **Nombre:** gTrack
- **Modo:** Dark first (gym con luz artificial)
- **Estética:** Industrial / utilitarian — números grandes, alta legibilidad, sin ornamentos
- **Fuente display:** Algo con carácter — no Inter, no Roboto
- **Color base:** Gris oscuro casi negro (#0F0F0F)
- **Colores de día:**
  - Día A (Empuje): Naranja — #F97316
  - Día B (Tirón): Azul cyan — #06B6D4
  - Día C (Pierna): Verde — #22C55E
  - Swim: Azul profundo — #3B82F6

### Principios UI
- Botón principal: mínimo 64px de alto, ocupa todo el ancho
- Texto de ejercicio: mínimo 32px
- Contraste alto en todo — fondo oscuro + texto blanco/gris claro
- Sin animaciones complejas — solo transiciones de estado simples
- Feedback táctil visual claro (cambio de color al marcar serie)

---

## 8. Flujo de navegación

```
HOME
 ├── [Tarjeta Día A/B/C] → OVERVIEW DEL DÍA → EJERCICIO ACTIVO → COUNTDOWN → ... → FIN SESIÓN → SWIM LOG
 └── [Tarjeta Swim] → SWIM LOG
```

---

## 9. Stack técnico

- **Framework:** React 18 + TypeScript
- **Estilos:** Tailwind CSS
- **Bundling:** Single HTML file (sin servidor)
- **Storage:** localStorage (sin backend)
- **Audio:** Web Audio API (bip generado programáticamente, sin assets externos)
- **Deploy:** Estático — puede abrirse como archivo HTML o hostearse en Netlify/Vercel

---

## 10. Fuera de scope — Fase 1

- Login / autenticación
- Backend / base de datos
- Sincronización en la nube
- Historial de progresión con gráficas
- Imágenes de ejercicios
- Edición de rutina desde la UI
- Notificaciones push
- Integración directa con Apple Health / Watch

---

## 11. Criterios de éxito — Fase 1

- [ ] Javier puede completar una sesión completa sin confusión
- [ ] El countdown suena al terminar
- [ ] La app recuerda el último día entrenado
- [ ] Funciona bien en iPhone Safari (viewport móvil)
- [ ] Puede registrar datos de natación manualmente
- [ ] No requiere conexión a internet para funcionar

---

## 12. Fases futuras (backlog)

| Fase | Feature |
|---|---|
| 2 | Historial de sesiones con gráfica de progresión |
| 2 | Registro de peso por ejercicio (ej: "usé 40kg en leg press") |
| 2 | Progresión pull-up tracker con visualización |
| 3 | Backend simple (Supabase) para persistencia real |
| 3 | PWA installable (icono en home screen) |
| 4 | Integración Apple Health API |
| 4 | Nuevas rutinas / fases de entrenamiento |
