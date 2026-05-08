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

export type Screen = 'home' | 'overview' | 'workout' | 'rest' | 'transition' | 'finish' | 'swim'
