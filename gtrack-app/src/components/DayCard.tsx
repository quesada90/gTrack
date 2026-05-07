import React from 'react'
import { DayRoutine } from '../types'

interface Props {
  day: DayRoutine
  suggested: boolean
  onTap: () => void
}

export const DayCard: React.FC<Props> = ({ day, suggested, onTap }) => (
  <button
    onClick={onTap}
    className="w-full text-left rounded-xl p-4 active:opacity-80 transition-opacity relative overflow-hidden"
    style={{
      background: suggested ? `${day.color}18` : 'var(--bg-card)',
      border: suggested ? `1.5px solid ${day.color}55` : '1px solid var(--border)',
    }}
  >
    {suggested && (
      <div
        className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
        style={{ background: day.color, color: '#000' }}
      >
        HOY
      </div>
    )}
    <div className="flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black font-mono flex-shrink-0"
        style={{ background: `${day.color}22`, color: day.color }}
      >
        {day.id}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
          {day.nombre}
        </div>
        <div className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {day.bloque}
        </div>
        <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          {day.ejercicios.length} ejercicios
        </div>
      </div>
    </div>
  </button>
)
