import React, { useState } from 'react'

interface Props {
  tip: string
}

export const TipAccordion: React.FC<Props> = ({ tip }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        style={{ background: 'var(--bg-card)' }}
      >
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          💡 Técnica
        </span>
        <span style={{ color: 'var(--text-muted)' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div
          className="px-4 py-3 text-sm leading-relaxed fade-in"
          style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
        >
          {tip}
        </div>
      )}
    </div>
  )
}
