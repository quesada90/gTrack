import React, { useState } from 'react'
import { AppConfig, getCurrentWeek } from '../types'
import { BigButton } from '../components/BigButton'

interface Props {
  config: AppConfig
  onSave: (config: AppConfig) => void
  onBack: () => void
}

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  borderRadius: 12,
  padding: '12px 16px',
  width: '100%',
  outline: 'none',
  height: 48,
}

export const SetupScreen = ({ config, onSave, onBack }: Props) => {
  const [startDate, setStartDate]       = useState(config.startDate)
  const [phase, setPhase]               = useState<1 | 2>(config.currentPhase)
  const [weekOverride, setWeekOverride] = useState(config.manualWeekOverride?.toString() ?? '')

  const preview = getCurrentWeek({
    startDate,
    currentPhase: phase,
    manualWeekOverride: weekOverride ? parseInt(weekOverride) : undefined,
  })

  const handleSave = () => {
    onSave({
      startDate,
      currentPhase: phase,
      manualWeekOverride: weekOverride ? parseInt(weekOverride) : undefined,
    })
    onBack()
  }

  const PHASES = [
    { value: 1 as const, label: 'Fase 1', sub: 'Semanas 1-4 · Fullbody (We/On Balmes)' },
    { value: 2 as const, label: 'Fase 2', sub: 'Semanas 5-8 · Empuje / Tirón / Pierna' },
  ]

  return (
    <div className="flex flex-col min-h-screen px-5 pt-12 pb-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="text-sm active:opacity-70"
          style={{ color: 'var(--text-secondary)' }}
        >
          ← Volver
        </button>
      </div>

      <h1 className="text-2xl font-bold font-mono mb-8" style={{ color: 'var(--text-primary)' }}>
        ⚙️ Configuración
      </h1>

      <div className="flex-1 flex flex-col gap-6">
        {/* Start date */}
        <section>
          <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Fecha de inicio del programa
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={inputStyle}
          />
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Semana calculada:{' '}
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
              Semana {preview}
            </span>
          </p>
        </section>

        {/* Phase selector */}
        <section>
          <label className="block text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            Fase de entrenamiento activa
          </label>
          <div className="flex flex-col gap-3">
            {PHASES.map(opt => (
              <button
                key={opt.value}
                onClick={() => setPhase(opt.value)}
                className="w-full rounded-xl p-4 text-left active:opacity-70 transition-colors"
                style={{
                  background: phase === opt.value ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1.5px solid ${phase === opt.value ? '#F97316' : 'var(--border)'}`,
                }}
              >
                <div className="font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                  {opt.label}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Manual week override */}
        <section>
          <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Semana manual{' '}
            <span style={{ color: 'var(--text-muted)' }}>(opcional — sobreescribe el cálculo)</span>
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={12}
            placeholder={`Calculada: ${getCurrentWeek({ startDate, currentPhase: phase })}`}
            value={weekOverride}
            onChange={e => setWeekOverride(e.target.value)}
            style={inputStyle}
          />
        </section>
      </div>

      <div className="pt-8">
        <BigButton onClick={handleSave} color="#F97316">
          Guardar configuración
        </BigButton>
      </div>
    </div>
  )
}
