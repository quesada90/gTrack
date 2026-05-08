import React, { useState } from 'react'
import { SwimEntry } from '../types'
import { BigButton } from '../components/BigButton'

const SWIM_PROGRESSION = [
  { semana: 1, descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 2, descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 3, descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 4, descripcion: 'Nada cómodo, sin objetivo de distancia' },
  { semana: 5, descripcion: '4 × 50m con 30s descanso, luego 2 × 25m' },
  { semana: 6, descripcion: '3 × 75m con 30s descanso' },
  { semana: 7, descripcion: '2 × 100m con 45s descanso + 1 × 50m' },
  { semana: 8, descripcion: '1 × 200m continuo + 1 × 100m' },
]

interface Props {
  currentWeek: number
  onSave: (entry: SwimEntry) => void
  onBack: () => void
}

const fieldStyle: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  borderRadius: 12,
  padding: '12px 16px',
  width: '100%',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  fontSize: 13,
  marginBottom: 6,
  display: 'block',
}

export const SwimScreen: React.FC<Props> = ({ currentWeek, onSave, onBack }) => {
  const protocol = SWIM_PROGRESSION.find(p => p.semana === currentWeek)
    ?? SWIM_PROGRESSION[SWIM_PROGRESSION.length - 1]
  const [swam, setSwam] = useState(true)
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [calories, setCalories] = useState('')
  const [heartRate, setHeartRate] = useState('')

  const handleSave = () => {
    const entry: SwimEntry = {
      date: new Date().toISOString(),
      swam,
      distance: distance ? parseInt(distance) : undefined,
      time: time || undefined,
      calories: calories ? parseInt(calories) : undefined,
      heartRate: heartRate ? parseInt(heartRate) : undefined,
    }
    onSave(entry)
  }

  return (
    <div className="flex flex-col min-h-screen px-5 pt-12 pb-10" style={{ background: 'var(--bg-primary)' }}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm active:opacity-70"
        style={{ color: 'var(--text-secondary)' }}
      >
        ← Volver
      </button>

      <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        🏊 Natación
      </div>
      <div className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        Registra tu sesión de piscina
      </div>

      {/* Week protocol */}
      <div
        className="rounded-xl px-4 py-3 mb-6"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>
          SEMANA {currentWeek} · PROTOCOLO
        </div>
        <div className="text-sm font-medium" style={{ color: '#3B82F6' }}>
          {protocol.descripcion}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {/* Swam toggle */}
        <div>
          <span style={labelStyle}>¿Nadaste hoy?</span>
          <div className="flex gap-3">
            {[true, false].map(v => (
              <button
                key={String(v)}
                onClick={() => setSwam(v)}
                className="flex-1 h-12 rounded-xl font-medium text-sm transition-colors active:opacity-70"
                style={{
                  background: swam === v ? '#3B82F620' : 'var(--bg-elevated)',
                  border: swam === v ? '1.5px solid #3B82F6' : '1px solid var(--border)',
                  color: swam === v ? '#3B82F6' : 'var(--text-secondary)',
                }}
              >
                {v ? 'Sí' : 'No'}
              </button>
            ))}
          </div>
        </div>

        {swam && (
          <>
            <div>
              <label style={labelStyle}>Distancia (metros)</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="ej. 1500"
                value={distance}
                onChange={e => setDistance(e.target.value)}
                style={fieldStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Tiempo (mm:ss)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="ej. 35:00"
                value={time}
                onChange={e => setTime(e.target.value)}
                style={fieldStyle}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label style={labelStyle}>Calorías</label>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="ej. 400"
                  value={calories}
                  onChange={e => setCalories(e.target.value)}
                  style={fieldStyle}
                />
              </div>
              <div className="flex-1">
                <label style={labelStyle}>FC media (bpm)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="ej. 140"
                  value={heartRate}
                  onChange={e => setHeartRate(e.target.value)}
                  style={fieldStyle}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <BigButton onClick={handleSave} color="#3B82F6">
          Guardar
        </BigButton>
        <BigButton onClick={onBack} variant="ghost">
          Saltar
        </BigButton>
      </div>
    </div>
  )
}
