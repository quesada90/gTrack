import React, { useEffect } from 'react'
import { DayRoutine } from '../types'

interface Props {
  day: DayRoutine
  completedExerciseName: string
  nextExerciseName?: string
  onContinue: () => void
}

export const TransitionScreen: React.FC<Props> = ({
  day,
  completedExerciseName,
  nextExerciseName,
  onContinue,
}) => {
  useEffect(() => {
    const timer = setTimeout(onContinue, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center px-5 text-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="slide-up">
        <div className="text-6xl mb-6">✅</div>
        <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          ¡Ejercicio completado!
        </div>
        <div className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          {completedExerciseName}
        </div>
        {nextExerciseName && (
          <div
            className="rounded-xl px-6 py-4"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
              A continuación
            </div>
            <div className="font-mono font-bold text-lg" style={{ color: day.color }}>
              {nextExerciseName}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
