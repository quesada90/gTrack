import React from 'react'

interface Props {
  value: number
  total: number
  color: string
}

export const ProgressBar: React.FC<Props> = ({ value, total, color }) => (
  <div className="w-full h-1 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
    <div
      className="h-1 rounded-full transition-all duration-500"
      style={{ width: `${(value / total) * 100}%`, background: color }}
    />
  </div>
)
