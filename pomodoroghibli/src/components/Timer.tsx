'use client'
import { useState, useEffect, useCallback } from 'react'
import { TimerMode } from '@/types'

interface TimerProps {
  mode: TimerMode;
  onComplete: () => void;
}

const TIMER_DURATION = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
} as const;

export default function Timer({ mode, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION[mode]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const resetTimer = useCallback(() => {
    setTimeLeft(TIMER_DURATION[mode]);
    setIsActive(false);
    setIsPaused(false);
  }, [mode]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsPaused(false);
            // Play notification sound
            const audio = new Audio('/notification.mp3');
            audio.play().catch(() => console.log('Audio play failed'));
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  return (
    <div className="bg-teal-700 rounded-lg p-8 text-center shadow-lg">
      <div className="text-6xl font-mono text-cream mb-6">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="space-x-4">
        {!isActive ? (
          <button 
            onClick={startTimer}
            className="px-8 py-2 bg-cream text-teal-700 rounded-lg hover:bg-cream/90 transition-colors font-medium"
          >
            START
          </button>
        ) : isPaused ? (
          <>
            <button 
              onClick={resumeTimer}
              className="px-8 py-2 bg-cream text-teal-700 rounded-lg hover:bg-cream/90 transition-colors font-medium"
            >
              RESUME
            </button>
            <button 
              onClick={resetTimer}
              className="px-8 py-2 bg-cream/20 text-cream rounded-lg hover:bg-cream/30 transition-colors font-medium"
            >
              RESET
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={pauseTimer}
              className="px-8 py-2 bg-cream text-teal-700 rounded-lg hover:bg-cream/90 transition-colors font-medium"
            >
              PAUSE
            </button>
            <button 
              onClick={resetTimer}
              className="px-8 py-2 bg-cream/20 text-cream rounded-lg hover:bg-cream/30 transition-colors font-medium"
            >
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
}