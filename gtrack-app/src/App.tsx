import { useState } from 'react'
import { Screen, DayRoutine, LastSession, SwimEntry } from './types'
import { RUTINA } from './data/rutina'
import { useLocalStorage } from './hooks/useLocalStorage'
import { HomeScreen } from './screens/HomeScreen'
import { OverviewScreen } from './screens/OverviewScreen'
import { WorkoutScreen } from './screens/WorkoutScreen'
import { RestScreen } from './screens/RestScreen'
import { TransitionScreen } from './screens/TransitionScreen'
import { FinishScreen } from './screens/FinishScreen'
import { SwimScreen } from './screens/SwimScreen'
import './index.css'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedDay, setSelectedDay] = useState<DayRoutine | null>(null)
  const [startedAt, setStartedAt] = useState<string>('')
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [serieIndex, setSerieIndex] = useState(0)
  // Track whether last rest was after the last serie of an exercise (triggers transition)
  const [pendingExerciseComplete, setPendingExerciseComplete] = useState(false)

  const [lastSession, setLastSession] = useLocalStorage<LastSession | null>('gtrack_last_session', null)
  const [, setSwimLog] = useLocalStorage<SwimEntry[]>('gtrack_swim_log', [])

  const handleSelectDay = (day: DayRoutine) => {
    setSelectedDay(day)
    setScreen('overview')
  }

  const handleStartWorkout = () => {
    if (!selectedDay) return
    setStartedAt(new Date().toISOString())
    setExerciseIndex(0)
    setSerieIndex(0)
    setPendingExerciseComplete(false)
    setScreen('workout')
  }

  const handleSerieDone = () => {
    if (!selectedDay) return
    const exercise = selectedDay.ejercicios[exerciseIndex]
    const isLastSerie = serieIndex >= exercise.series - 1

    if (isLastSerie) {
      // After rest, we need a transition
      setPendingExerciseComplete(true)
      setScreen('rest')
    } else {
      // More series to go
      setSerieIndex(s => s + 1)
      setPendingExerciseComplete(false)
      setScreen('rest')
    }
  }

  const handleRestDone = () => {
    if (pendingExerciseComplete) {
      setScreen('transition')
    } else {
      setScreen('workout')
    }
  }

  const handleTransitionDone = () => {
    if (!selectedDay) return
    const isLastExercise = exerciseIndex >= selectedDay.ejercicios.length - 1

    if (isLastExercise) {
      setLastSession({ day: selectedDay.id, date: new Date().toISOString() })
      setScreen('finish')
    } else {
      setExerciseIndex(i => i + 1)
      setSerieIndex(0)
      setPendingExerciseComplete(false)
      setScreen('workout')
    }
  }

  const handleSwimSave = (entry: SwimEntry) => {
    setSwimLog(log => [...log, entry])
    handleHome()
  }

  const handleHome = () => {
    setScreen('home')
    setSelectedDay(null)
    setExerciseIndex(0)
    setSerieIndex(0)
  }

  const currentExercise = selectedDay?.ejercicios[exerciseIndex]
  const nextExercise = selectedDay?.ejercicios[exerciseIndex + 1]

  const getRestNextLabel = () => {
    if (pendingExerciseComplete) return nextExercise?.nombre
    return currentExercise?.nombre
  }

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100dvh', position: 'relative' }}>
      {screen === 'home' && (
        <HomeScreen
          days={RUTINA}
          lastSession={lastSession}
          onSelectDay={handleSelectDay}
        />
      )}
      {screen === 'overview' && selectedDay && (
        <OverviewScreen
          day={selectedDay}
          onStart={handleStartWorkout}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'workout' && selectedDay && currentExercise && (
        <WorkoutScreen
          day={selectedDay}
          exerciseIndex={exerciseIndex}
          serieIndex={serieIndex}
          onSerieDone={handleSerieDone}
        />
      )}
      {screen === 'rest' && selectedDay && currentExercise && (
        <RestScreen
          key={`rest-${exerciseIndex}-${serieIndex}`}
          day={selectedDay}
          restSeconds={currentExercise.descanso}
          nextExerciseName={getRestNextLabel()}
          onDone={handleRestDone}
        />
      )}
      {screen === 'transition' && selectedDay && currentExercise && (
        <TransitionScreen
          day={selectedDay}
          completedExerciseName={currentExercise.nombre}
          nextExerciseName={nextExercise?.nombre}
          onContinue={handleTransitionDone}
        />
      )}
      {screen === 'finish' && selectedDay && (
        <FinishScreen
          day={selectedDay}
          startedAt={startedAt}
          onSwim={() => setScreen('swim')}
          onHome={handleHome}
        />
      )}
      {screen === 'swim' && (
        <SwimScreen
          onSave={handleSwimSave}
          onBack={handleHome}
        />
      )}
    </div>
  )
}

export default App
