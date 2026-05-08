export type Exercise = {
  id: string
  nombre: string
  subtitulo?: string
  musculo: string
  series: number
  reps: number | string
  descanso: number
  tip?: string
  isTime?: boolean
  gifUrl: string
  illustrationId: string
}

export type DayRoutine = {
  id: 'A' | 'B' | 'C'
  nombre: string
  bloque: string
  color: string
  ejercicios: Exercise[]
}

export type WorkoutSession = {
  dayId: 'A' | 'B' | 'C'
  startedAt: string
  currentExerciseIndex: number
  currentSerieIndex: number
  phase: 'overview' | 'exercise' | 'rest' | 'transition' | 'finish'
}

export type LastSession = {
  day: 'A' | 'B' | 'C'
  date: string
}

export type SwimEntry = {
  date: string
  swam: boolean
  distance?: number
  time?: string
  calories?: number
  heartRate?: number
}

export type Screen = 'home' | 'overview' | 'workout' | 'rest' | 'transition' | 'finish' | 'swim' | 'setup'

export type AppConfig = {
  startDate: string
  currentPhase: 1 | 2
  manualWeekOverride?: number
}

export function getCurrentWeek(config: AppConfig): number {
  if (config.manualWeekOverride) return config.manualWeekOverride
  const days = Math.floor(
    (Date.now() - new Date(config.startDate).getTime()) / 86400000
  )
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), 12)
}
