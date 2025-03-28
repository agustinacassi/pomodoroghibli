'use client'
import { useState } from 'react'
import Timer from '@/components/Timer'
import TaskList from '@/components/TaskList'
import { TimerMode } from '@/types';
import TiniStudy from '../../public/tinistudy.png'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [pomodoroCount, setPomodoroCount] = useState(1);

    const handleTimerComplete = () => {
    if (mode === 'pomodoro') {
      setPomodoroCount(count => count + 1);
      setMode(pomodoroCount % 4 === 0 ? 'longBreak' : 'shortBreak');
    } else {
      setMode('pomodoro');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 font-fredoka"
      style={{ backgroundImage: `url(${TiniStudy.src})` }}
    >
      <div className="max-w-md w-full space-y-6">
        {/* Timer modes */}
        <div className="flex gap-2 bg-cream/90 rounded-3xl p-3 shadow-md">
          {(['pomodoro', 'shortBreak', 'longBreak'] as TimerMode[]).map((timerMode) => (
            <button
              key={timerMode}
              onClick={() => setMode(timerMode)}
              className={`flex-1 py-2 rounded-full transition-colors text-teal-700 ${
                mode === timerMode ? 'font-medium' : 'font-normal'
              }`}
            >
              {timerMode === 'pomodoro' ? 'Pomodoro' : 
               timerMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </button>
          ))}
        </div>

        <div className="bg-teal-700/90 rounded-3xl p-8 text-center shadow-md">
          <Timer mode={mode} onComplete={handleTimerComplete} />
        </div>
        
        <div className="text-center text-cream font-medium text-xl">
          #{pomodoroCount} Time to {mode === 'pomodoro' ? 'focus!' : 'take a break!'}
        </div>
        
        <div className="bg-cream/90 rounded-3xl p-6 shadow-md">
          <h2 className="text-teal-700 text-xl font-medium mb-4">Tasks</h2>
          <TaskList />
        </div>
      </div>
    </div>
  );
}