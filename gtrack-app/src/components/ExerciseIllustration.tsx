import React from 'react'
import { ILLUSTRATION_MAP } from './illustrations'

interface Props {
  illustrationId: string
  dayColor: string
  size?: number
  animate?: boolean
}

export const ExerciseIllustration: React.FC<Props> = ({
  illustrationId,
  dayColor,
  size = 160,
  animate = true,
}) => {
  const Component = ILLUSTRATION_MAP[illustrationId]
  if (!Component) return null

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{ background: 'var(--bg-elevated)', borderRadius: 12 }}
    >
      <Component muscleColor={dayColor} animate={animate} />
    </svg>
  )
}
