import { Clock, Play, Pause, Coffee } from 'lucide-react';

interface TimeTrackingPanelProps {
  isClockedIn: boolean;
  isOnBreak: boolean;
  totalHours: string;
  onClockIn: () => void;
  onClockOut: () => void;
  onBreakStart: () => void;
  onBreakEnd: () => void;
}

export function TimeTrackingPanel({
  isClockedIn,
  isOnBreak,
  totalHours,
  onClockIn,
  onClockOut,
  onBreakStart,
  onBreakEnd
}: TimeTrackingPanelProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-primary" />
        <h3>Time Tracking</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Current Status</p>
            <p className="mt-1">
              {!isClockedIn ? (
                <span className="text-muted-foreground">Not Clocked In</span>
              ) : isOnBreak ? (
                <span className="text-orange-600 flex items-center gap-2">
                  <Coffee className="w-4 h-4" /> On Break
                </span>
              ) : (
                <span className="text-green-600 flex items-center gap-2">
                  <Play className="w-4 h-4" /> Working
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Hours Today</p>
            <p className="mt-1">{totalHours}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {!isClockedIn ? (
            <button
              onClick={onClockIn}
              className="col-span-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Clock In
            </button>
          ) : (
            <>
              <button
                onClick={onClockOut}
                className="bg-destructive text-destructive-foreground px-6 py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Pause className="w-5 h-5" />
                Clock Out
              </button>
              {isOnBreak ? (
                <button
                  onClick={onBreakEnd}
                  className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  End Break
                </button>
              ) : (
                <button
                  onClick={onBreakStart}
                  className="bg-orange-600 text-white px-6 py-4 rounded-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
                >
                  <Coffee className="w-5 h-5" />
                  Start Break
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
