import React from 'react'

interface Props {
  onClick: () => void
  children: React.ReactNode
  color?: string
  variant?: 'primary' | 'ghost'
  disabled?: boolean
}

export const BigButton: React.FC<Props> = ({
  onClick,
  children,
  color,
  variant = 'primary',
  disabled = false,
}) => {
  if (variant === 'ghost') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full h-14 flex items-center justify-center rounded-xl text-base font-medium transition-opacity active:opacity-70"
        style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-16 flex items-center justify-center rounded-xl text-lg font-bold tracking-wide transition-opacity active:opacity-70 disabled:opacity-40"
      style={{ background: color || 'var(--text-primary)', color: color ? '#000' : 'var(--bg-primary)' }}
    >
      {children}
    </button>
  )
}
