import React from 'react'

interface Props {
  total: number
  current: number
  color: string
}

export const SeriesDots: React.FC<Props> = ({ total, current, color }) => (
  <div className="flex gap-2 items-center">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="rounded-full transition-all duration-300"
        style={{
          width: i < current ? 10 : 8,
          height: i < current ? 10 : 8,
          background: i < current ? color : 'var(--bg-elevated)',
          border: i === current ? `2px solid ${color}` : i < current ? 'none' : '2px solid var(--border)',
        }}
      />
    ))}
  </div>
)
