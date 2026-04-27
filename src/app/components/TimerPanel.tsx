import { useEffect, useState } from 'react';
import { Timer, Coffee, Play } from 'lucide-react';

interface TimerPanelProps {
  taskTimerActive: boolean;
  taskName: string;
  breakTimerActive: boolean;
  onBreakEnd: () => void;
}

export function TimerPanel({ taskTimerActive, taskName, breakTimerActive, onBreakEnd }: TimerPanelProps) {
  const [taskElapsed, setTaskElapsed] = useState(0);
  const [breakRemaining, setBreakRemaining] = useState(30 * 60);

  useEffect(() => {
    if (!taskTimerActive) {
      setTaskElapsed(0);
      return;
    }
    const interval = setInterval(() => {
      setTaskElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [taskTimerActive]);

  useEffect(() => {
    if (!breakTimerActive) {
      setBreakRemaining(30 * 60);
      return;
    }
    const interval = setInterval(() => {
      setBreakRemaining(prev => {
        if (prev <= 1) {
          onBreakEnd();
          return 30 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [breakTimerActive, onBreakEnd]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!taskTimerActive && !breakTimerActive) {
    return null;
  }

  return (
    <div className="fixed top-20 right-6 w-80 space-y-3 z-40">
      {taskTimerActive && (
        <div className="bg-green-600 text-white rounded-lg shadow-2xl p-5 border-2 border-green-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Timer className="w-7 h-7 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-xs opacity-90 mb-1">ACTIVE TASK TIMER</p>
              <p className="text-3xl font-mono tracking-wider">{formatTime(taskElapsed)}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="text-xs">RUNNING</span>
            </div>
          </div>
          <div className="pt-3 border-t border-white/30">
            <p className="text-sm truncate">{taskName}</p>
          </div>
        </div>
      )}

      {breakTimerActive && (
        <div className="bg-orange-600 text-white rounded-lg shadow-2xl p-5 border-2 border-orange-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Coffee className="w-7 h-7 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-xs opacity-90 mb-1">BREAK TIME REMAINING</p>
              <p className="text-3xl font-mono tracking-wider">{formatTime(breakRemaining)}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-white/30">
            <p className="text-sm">30-minute break in progress</p>
          </div>
        </div>
      )}
    </div>
  );
}
