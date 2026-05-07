import React from 'react'
import { DayRoutine } from '../types'
import { BigButton } from '../components/BigButton'

interface Props {
  day: DayRoutine
  startedAt: string
  onSwim: () => void
  onHome: () => void
}

function formatDuration(startedAt: string): string {
  const ms = Date.now() - new Date(startedAt).getTime()
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return `${mins}m ${secs}s`
}

export const FinishScreen: React.FC<Props> = ({ day, startedAt, onSwim, onHome }) => {
  const duration = formatDuration(startedAt)

  return (
    <div
      className="flex flex-col min-h-screen px-5 pt-16 pb-10 items-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center slide-up">
        <div className="text-7xl mb-6">💪</div>
        <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          ¡Entrenamiento completado!
        </h1>
        <div className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          Día {day.id} — {day.nombre}
        </div>

        <div
          className="w-full max-w-sm rounded-xl p-5 mb-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="flex justify-around">
            <div>
              <div className="text-3xl font-mono font-bold" style={{ color: day.color }}>
                {day.ejercicios.length}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>ejercicios</div>
            </div>
            <div
              className="w-px"
              style={{ background: 'var(--border)' }}
            />
            <div>
              <div className="text-3xl font-mono font-bold" style={{ color: day.color }}>
                {duration}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>duración</div>
            </div>
            <div
              className="w-px"
              style={{ background: 'var(--border)' }}
            />
            <div>
              <div className="text-3xl font-mono font-bold" style={{ color: day.color }}>
                {day.ejercicios.reduce((acc, e) => acc + e.series, 0)}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>series</div>
            </div>
          </div>
        </div>

        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          ¿Hoy nadas también?
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <BigButton onClick={onSwim} color={day.color}>
          🏊 Registrar natación
        </BigButton>
        <BigButton onClick={onHome} variant="ghost">
          Volver al inicio
        </BigButton>
      </div>
    </div>
  )
}
