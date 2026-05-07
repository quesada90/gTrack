import React from 'react'
import { DayRoutine } from '../types'
import { BigButton } from '../components/BigButton'

interface Props {
  day: DayRoutine
  onStart: () => void
  onBack: () => void
}

export const OverviewScreen: React.FC<Props> = ({ day, onStart, onBack }) => (
  <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-primary)' }}>
    {/* Header */}
    <div className="px-5 pt-12 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-4 text-sm active:opacity-70"
        style={{ color: 'var(--text-secondary)' }}
      >
        ← Volver
      </button>
      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black font-mono"
          style={{ background: `${day.color}22`, color: day.color }}
        >
          {day.id}
        </div>
        <div>
          <div className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
            {day.nombre}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {day.bloque}
          </div>
        </div>
      </div>
    </div>

    {/* Exercise list */}
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <div className="space-y-2">
        {day.ejercicios.map((ex, i) => (
          <div
            key={ex.id}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: `${day.color}20`, color: day.color }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                {ex.nombre}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {ex.musculo}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>
                {ex.series}×{ex.reps}{ex.isTime ? '' : ''}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {ex.descanso}s descanso
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="px-5 pb-10 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
      <BigButton onClick={onStart} color={day.color}>
        Empezar
      </BigButton>
    </div>
  </div>
)
