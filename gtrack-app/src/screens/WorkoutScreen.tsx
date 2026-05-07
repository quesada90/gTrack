import React from 'react'
import { DayRoutine } from '../types'
import { BigButton } from '../components/BigButton'
import { SeriesDots } from '../components/SeriesDots'
import { TipAccordion } from '../components/TipAccordion'
import { ExerciseIllustration } from '../components/ExerciseIllustration'
import { ProgressBar } from '../components/ProgressBar'

interface Props {
  day: DayRoutine
  exerciseIndex: number
  serieIndex: number
  onSerieDone: () => void
}

export const WorkoutScreen: React.FC<Props> = ({
  day,
  exerciseIndex,
  serieIndex,
  onSerieDone,
}) => {
  const exercise = day.ejercicios[exerciseIndex]
  const totalExercicios = day.ejercicios.length
  const totalSeries = exercise.series
  const progressValue = exerciseIndex * 10 + serieIndex
  const progressTotal = totalExercicios * 10

  return (
    <div className="flex flex-col min-h-screen px-5 pt-12" style={{ background: 'var(--bg-primary)' }}>
      {/* Top progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2 font-mono" style={{ color: 'var(--text-muted)' }}>
          <span>Ejercicio {exerciseIndex + 1} / {totalExercicios}</span>
          <span style={{ color: day.color }}>Día {day.id}</span>
        </div>
        <ProgressBar value={progressValue} total={progressTotal} color={day.color} />
      </div>

      {/* Illustration */}
      <div className="flex justify-center mb-6">
        <ExerciseIllustration
          illustrationId={exercise.illustrationId}
          dayColor={day.color}
          size={160}
          animate={true}
        />
      </div>

      {/* Exercise info */}
      <div className="flex-1">
        <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
          {exercise.musculo}
        </div>
        <h2
          className="text-4xl font-bold font-mono leading-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {exercise.nombre}
        </h2>

        {/* Series progress */}
        <div
          className="rounded-xl px-4 py-4 mb-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Serie {serieIndex + 1} de {totalSeries}
            </span>
            <span className="font-mono font-bold text-2xl" style={{ color: day.color }}>
              {exercise.reps} {exercise.isTime ? '' : 'reps'}
            </span>
          </div>
          <SeriesDots total={totalSeries} current={serieIndex} color={day.color} />
        </div>

        {/* Tip */}
        {exercise.tip && <TipAccordion tip={exercise.tip} />}
      </div>

      {/* CTA */}
      <div className="pb-10 pt-6">
        <BigButton onClick={onSerieDone} color={day.color}>
          Serie hecha ✓
        </BigButton>
      </div>
    </div>
  )
}
