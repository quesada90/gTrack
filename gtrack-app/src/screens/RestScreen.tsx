import React, { useEffect } from 'react'
import { DayRoutine } from '../types'
import { useCountdown } from '../hooks/useCountdown'
import { BigButton } from '../components/BigButton'

interface Props {
  day: DayRoutine
  restSeconds: number
  nextExerciseName?: string
  onDone: () => void
}

export const RestScreen: React.FC<Props> = ({
  day,
  restSeconds,
  nextExerciseName,
  onDone,
}) => {
  const { timeLeft, start, skip } = useCountdown(restSeconds, onDone)

  useEffect(() => {
    start()
  }, [])

  const pct = timeLeft / restSeconds

  return (
    <div
      className="flex flex-col min-h-screen px-5 items-center justify-between pt-16 pb-10"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="text-center w-full">
        <div className="text-sm font-mono tracking-widest uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
          Descansando
        </div>

        {/* Circular countdown */}
        <div className="relative flex items-center justify-center mx-auto mb-8" style={{ width: 200, height: 200 }}>
          <svg width="200" height="200" className="absolute inset-0 -rotate-90">
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--bg-elevated)" strokeWidth="8" />
            <circle
              cx="100" cy="100" r="90" fill="none"
              stroke={day.color} strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - pct)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span
            className="text-7xl font-mono font-bold relative z-10"
            style={{ color: 'var(--text-primary)' }}
          >
            {timeLeft}
          </span>
        </div>

        {nextExerciseName && (
          <div
            className="rounded-xl px-5 py-4 mx-auto max-w-xs"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
              Siguiente
            </div>
            <div className="font-mono font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              {nextExerciseName}
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <BigButton onClick={() => skip()} variant="ghost">
          Saltar descanso →
        </BigButton>
      </div>
    </div>
  )
}
