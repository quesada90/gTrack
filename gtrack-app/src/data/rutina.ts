import { DayRoutine } from '../types'

// Fase 1 — Fullbody (semanas 1-4, We/On Balmes)
// Same exercises across all 3 days; day letter is used for cycle tracking only
const FASE1_EJERCICIOS_BASE = (prefix: string) => [
  { id:`${prefix}1`, nombre:'Leg press',      musculo:'Cuádriceps · Glúteos',  series:4, reps:12, descanso:60, tip:'Pies a anchura de hombros, rodillas sin bloquear',  gifUrl:'/videos/leg-press.gif',      illustrationId:'leg-press' },
  { id:`${prefix}2`, nombre:'Pull down',       musculo:'Dorsales · Bíceps',     series:4, reps:12, descanso:60, tip:'Agarre ancho, lleva el codo hacia la cadera',       gifUrl:'/videos/pull-down.gif',      illustrationId:'pull-down' },
  { id:`${prefix}3`, nombre:'Chest press',     musculo:'Pectorales · Tríceps',  series:4, reps:12, descanso:60, tip:'Escápulas juntas, no elevar hombros',               gifUrl:'/videos/chest-press.gif',    illustrationId:'chest-press' },
  { id:`${prefix}4`, nombre:'Leg extension',   musculo:'Cuádriceps',            series:4, reps:12, descanso:60, tip:'Contrae el cuádriceps arriba, baja lento',          gifUrl:'/videos/leg-extension.gif',  illustrationId:'leg-extension' },
  { id:`${prefix}5`, nombre:'Shoulder press',  musculo:'Deltoides · Tríceps',   series:4, reps:12, descanso:60, tip:'Core activado, no arquear la espalda',              gifUrl:'/videos/shoulder-press.gif', illustrationId:'shoulder-press' },
  { id:`${prefix}6`, nombre:'Low row',         musculo:'Espalda media · Bíceps',series:4, reps:12, descanso:60, tip:'No redondear la espalda al tirar',                  gifUrl:'/videos/low-row.gif',        illustrationId:'low-row' },
  { id:`${prefix}7`, nombre:'Hip abduction',   musculo:'Abductores · Glúteo',   series:4, reps:12, descanso:60, tip:'Movimiento lento y controlado',                     gifUrl:'/videos/hip-abduction.gif',  illustrationId:'hip-abduction' },
]

export const RUTINA_FASE1: DayRoutine[] = [
  { id: 'A', nombre: 'Fullbody', bloque: 'Semanas 1-4', color: '#F97316', ejercicios: FASE1_EJERCICIOS_BASE('f1a') },
  { id: 'B', nombre: 'Fullbody', bloque: 'Semanas 1-4', color: '#06B6D4', ejercicios: FASE1_EJERCICIOS_BASE('f1b') },
  { id: 'C', nombre: 'Fullbody', bloque: 'Semanas 1-4', color: '#22C55E', ejercicios: FASE1_EJERCICIOS_BASE('f1c') },
]

// Fase 2 — Empuje / Tirón / Pierna (semanas 5-8)
export const RUTINA_FASE2: DayRoutine[] = [
  {
    id: 'A',
    nombre: 'Empuje + Core',
    bloque: 'Fuerza y Estabilidad',
    color: '#F97316',
    ejercicios: [
      { id: 'a1', nombre: 'Leg press',        musculo: 'Cuádriceps · Glúteos',  series: 2, reps: 15,        descanso: 45, tip: 'Pies a anchura de hombros, rodillas sin bloquear',  gifUrl: '/videos/leg-press.gif',        illustrationId: 'leg-press' },
      { id: 'a2', nombre: 'Chest press',      musculo: 'Pectorales · Tríceps',  series: 4, reps: 10,        descanso: 75, tip: 'Escápulas juntas, no elevar hombros',               gifUrl: '/videos/chest-press.gif',      illustrationId: 'chest-press' },
      { id: 'a3', nombre: 'Shoulder press',   musculo: 'Deltoides · Tríceps',   series: 4, reps: 10,        descanso: 75, tip: 'Core activado, no arquear la espalda',              gifUrl: '/videos/shoulder-press.gif',   illustrationId: 'shoulder-press' },
      { id: 'a4', nombre: 'Pec deck',         musculo: 'Pectorales',            series: 3, reps: 12,        descanso: 60, tip: 'Movimiento controlado, no rebotar',                 gifUrl: '/videos/pec-deck.gif',         illustrationId: 'pec-deck' },
      { id: 'a5', nombre: 'Triceps pushdown', musculo: 'Tríceps',               series: 3, reps: 12,        descanso: 60, tip: 'Usa barra EZ o cuerda — muñeca neutra',             gifUrl: '/videos/triceps-pushdown.gif', illustrationId: 'triceps-pushdown' },
      { id: 'a6', nombre: 'Plancha frontal',  musculo: 'Core',                  series: 4, reps: '30s',     descanso: 45, tip: 'Cadera alineada, respiración continua', isTime: true, gifUrl: '/videos/plank.gif',           illustrationId: 'plancha-frontal' },
      { id: 'a7', nombre: 'Dead bug',         musculo: 'Core',                  series: 3, reps: '10/lado', descanso: 45, tip: 'Espalda baja pegada al suelo',                      gifUrl: '/videos/dead-bug.gif',         illustrationId: 'dead-bug' },
    ],
  },
  {
    id: 'B',
    nombre: 'Tirón + Pull-up',
    bloque: 'Espalda y Bíceps',
    color: '#06B6D4',
    ejercicios: [
      { id: 'b1', nombre: 'Pull down',         musculo: 'Dorsales · Bíceps',      series: 4, reps: 10,         descanso: 75, tip: 'Agarre ancho, lleva el codo hacia la cadera',           gifUrl: '/videos/pull-down.gif',        illustrationId: 'pull-down' },
      { id: 'b2', nombre: 'Low row',            musculo: 'Espalda media · Bíceps', series: 4, reps: 10,         descanso: 75, tip: 'No redondear la espalda al tirar',                     gifUrl: '/videos/low-row.gif',          illustrationId: 'low-row' },
      { id: 'b3', nombre: 'Assisted pull-up',   musculo: 'Dorsales · Bíceps',      series: 4, reps: 8,          descanso: 90, tip: '⭐ Baja 5kg de asistencia cada 2 semanas',               gifUrl: '/videos/assisted-pull-up.gif', illustrationId: 'assisted-pull-up' },
      { id: 'b4', nombre: 'Curl bíceps polea',  musculo: 'Bíceps',                 series: 3, reps: 12,         descanso: 60, tip: 'Codos fijos, muñeca neutra',                            gifUrl: '/videos/bicep-curl.gif',       illustrationId: 'curl-biceps' },
      { id: 'b5', nombre: 'Face pull polea',    musculo: 'Deltoides posterior',    series: 3, reps: 15,         descanso: 60, tip: 'Codos altos, lleva manos a las orejas',                 gifUrl: '/videos/face-pull.gif',        illustrationId: 'face-pull' },
      { id: 'b6', nombre: 'Dead hang barra',    musculo: 'Agarre · Columna',       series: 3, reps: 'máx',      descanso: 60, tip: 'Relaja los hombros, respira', isTime: true,              gifUrl: '/videos/dead-hang.gif',        illustrationId: 'dead-hang' },
      { id: 'b7', nombre: 'Plancha lateral',    musculo: 'Core lateral',           series: 3, reps: '25s/lado',  descanso: 45, tip: 'Cadera arriba, cuerpo recto', isTime: true,             gifUrl: '/videos/side-plank.gif',       illustrationId: 'plancha-lateral' },
    ],
  },
  {
    id: 'C',
    nombre: 'Pierna + Cadera',
    bloque: 'Tren Inferior',
    color: '#22C55E',
    ejercicios: [
      { id: 'c1', nombre: 'Leg press',          musculo: 'Cuádriceps · Glúteos',      series: 4, reps: 10,    descanso: 75, tip: 'Empuja con el talón, no con la punta',               gifUrl: '/videos/leg-press.gif',      illustrationId: 'leg-press' },
      { id: 'c2', nombre: 'Leg extension',       musculo: 'Cuádriceps',                series: 3, reps: 12,    descanso: 60, tip: 'Contrae el cuádriceps arriba, baja lento',           gifUrl: '/videos/leg-extension.gif',  illustrationId: 'leg-extension' },
      { id: 'c3', nombre: 'Leg curl',            musculo: 'Isquiotibiales',            series: 4, reps: 10,    descanso: 75, tip: 'No levantar la cadera al subir',                    gifUrl: '/videos/leg-curl.gif',       illustrationId: 'leg-curl' },
      { id: 'c4', nombre: 'Hip abduction',       musculo: 'Abductores · Glúteo medio', series: 3, reps: 15,    descanso: 60, tip: 'Movimiento lento y controlado',                     gifUrl: '/videos/hip-abduction.gif',  illustrationId: 'hip-abduction' },
      { id: 'c5', nombre: 'Hip thrust',          musculo: 'Glúteo mayor',              series: 4, reps: 10,    descanso: 75, tip: 'Empuja con talones, contrae glúteo arriba',         gifUrl: '/videos/hip-thrust.gif',     illustrationId: 'hip-thrust' },
      { id: 'c6', nombre: 'Elevación talones',   musculo: 'Gemelos',                   series: 3, reps: 15,    descanso: 45, tip: 'Pausa 1 segundo arriba',                            gifUrl: '/videos/calf-raise.gif',     illustrationId: 'elevacion-talones' },
      { id: 'c7', nombre: 'Hollow body hold',    musculo: 'Core',                      series: 3, reps: '20s', descanso: 45, tip: 'Espalda baja pegada al suelo', isTime: true,          gifUrl: '/videos/hollow-body.gif',    illustrationId: 'hollow-body' },
    ],
  },
]

// Default export used by App.tsx (resolved at runtime based on config)
export const RUTINA = RUTINA_FASE2

export const CYCLE: ('A' | 'B' | 'C')[] = ['A', 'B', 'C']
