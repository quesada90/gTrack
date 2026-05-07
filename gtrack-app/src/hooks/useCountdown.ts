import { useState, useEffect, useRef, useCallback } from 'react'
import { useAudioBip } from './useAudioBip'

export function useCountdown(initialSeconds: number, onComplete: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)
  const { playBip } = useAudioBip()

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current!)
            setIsActive(false)
            playBip()
            setTimeout(() => onCompleteRef.current(), 0)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive])

  const start = useCallback(() => {
    setTimeLeft(initialSeconds)
    setIsActive(true)
  }, [initialSeconds])

  const skip = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsActive(false)
    setTimeLeft(0)
    onCompleteRef.current()
  }, [])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsActive(false)
    setTimeLeft(initialSeconds)
  }, [initialSeconds])

  return { timeLeft, isActive, start, skip, reset }
}
