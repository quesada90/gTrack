import React from 'react'
import { DayRoutine, LastSession } from '../types'
import { DayCard } from '../components/DayCard'
import { CYCLE } from '../data/rutina'

interface Props {
  days: DayRoutine[]
  lastSession: LastSession | null
  onSelectDay: (day: DayRoutine) => void
}

function getNextDay(last: LastSession | null): 'A' | 'B' | 'C' {
  if (!last) return 'A'
  return CYCLE[(CYCLE.indexOf(last.day) + 1) % 3]
}

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

function isToday(dateStr: string): boolean {
  return daysSince(dateStr) === 0
}

export const HomeScreen: React.FC<Props> = ({ days, lastSession, onSelectDay }) => {
  const suggestedDay = getNextDay(lastSession)
  const trainedToday = lastSession && isToday(lastSession.date)

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
  const dateFormatted = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)

  return (
    <div className="flex flex-col min-h-screen px-5 pt-safe-top" style={{ background: 'var(--bg-primary)' }}>
      <div className="pt-12 pb-6">
        <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
          {dateFormatted}
        </div>
        <h1 className="text-4xl font-black tracking-tight font-mono" style={{ color: 'var(--text-primary)' }}>
          gTrack
        </h1>
        {lastSession && (
          <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {trainedToday
              ? '✅ Ya entrenaste hoy'
              : `Último entreno: Día ${lastSession.day} · hace ${daysSince(lastSession.date)}d`}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-3 pb-10">
        {days.map(day => (
          <DayCard
            key={day.id}
            day={day}
            suggested={!trainedToday && day.id === suggestedDay}
            onTap={() => onSelectDay(day)}
          />
        ))}
      </div>

      <div className="pb-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        gTrack · Solo para Javier
      </div>
    </div>
  )
}
