import { useEffect, useState } from 'react';
import { Timer, Play, Pause } from 'lucide-react';

interface WorkTimerProps {
  isActive: boolean;
  taskName: string;
}

export function WorkTimer({ isActive, taskName }: WorkTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed top-20 right-6 bg-green-600 text-white rounded-lg shadow-xl p-4 min-w-[280px] z-40">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
          <Timer className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-xs opacity-90 mb-1">Active Task Timer</p>
          <p className="text-2xl font-mono tracking-wider">{formatTime(elapsed)}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-xs">RUNNING</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/20">
        <p className="text-sm opacity-90 truncate">{taskName}</p>
      </div>
    </div>
  );
}
