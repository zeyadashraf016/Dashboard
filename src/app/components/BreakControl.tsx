import { Coffee, Play } from 'lucide-react';

interface BreakControlProps {
  isOnBreak: boolean;
  onBreakStart: () => void;
  onBreakEnd: () => void;
  disabled: boolean;
}

export function BreakControl({ isOnBreak, onBreakStart, onBreakEnd, disabled }: BreakControlProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Coffee className="w-6 h-6 text-primary" />
        <h3>Break Management</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Break Duration</p>
          <p>30 minutes</p>
        </div>

        {isOnBreak ? (
          <button
            onClick={onBreakEnd}
            className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5" />
            End Break & Resume Work
          </button>
        ) : (
          <button
            onClick={onBreakStart}
            disabled={disabled}
            className={`w-full px-6 py-4 rounded-lg transition-all flex items-center justify-center gap-3 ${
              disabled
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            <Coffee className="w-5 h-5" />
            Take 30-Minute Break
          </button>
        )}
      </div>
    </div>
  );
}
