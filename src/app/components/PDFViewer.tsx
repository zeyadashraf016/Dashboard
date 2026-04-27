import { X, FileText, Timer, AlertTriangle } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  taskName: string;
  pdfType: 'manual' | 'drawing';
  estimatedMinutes: number;
  elapsedSeconds: number;
  onClose: () => void;
}

export function PDFViewer({
  pdfUrl,
  taskName,
  pdfType,
  estimatedMinutes,
  elapsedSeconds,
  onClose
}: PDFViewerProps) {

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const remainingMinutes = estimatedMinutes - elapsedMinutes;
  const isLate = remainingMinutes < 0;
  const isWarning = remainingMinutes <= estimatedMinutes * 0.2 && !isLate;

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.min((elapsedMinutes / estimatedMinutes) * 100, 100);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">

      {/* HEADER */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-4">
          <FileText className="w-6 h-6" />
          <div>
            <h3>{taskName}</h3>
            <p className="text-sm opacity-80">
              {pdfType === 'manual' ? 'Assembly Manual' : 'Technical Drawing'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ✅ PDF VIEWER (THIS IS THE FIX) */}
      <div className="flex-1 bg-gray-900">
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          style={{ border: "none" }}
        />
      </div>

      {/* TIMER CARD */}
      <div
        className={`fixed top-24 right-6 rounded-lg shadow-2xl p-6 min-w-[320px] border-2 ${
          isLate
            ? 'bg-red-600 border-red-700 text-white'
            : isWarning
            ? 'bg-orange-600 border-orange-700 text-white'
            : 'bg-green-600 border-green-700 text-white'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            {isLate ? (
              <AlertTriangle className="w-7 h-7 animate-pulse" />
            ) : (
              <Timer className="w-7 h-7 animate-pulse" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-xs opacity-90 mb-1">
              {isLate ? 'TASK OVERDUE' : isWarning ? 'TIME WARNING' : 'TASK TIMER'}
            </p>
            <p className="text-3xl font-mono tracking-wider">
              {formatTime(elapsedSeconds)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Estimated:</span>
            <span>{estimatedMinutes} min</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Elapsed:</span>
            <span>{elapsedMinutes} min</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Remaining:</span>
            <span className={isLate ? 'font-bold' : ''}>
              {isLate ? `+${Math.abs(remainingMinutes)}` : remainingMinutes} min
            </span>
          </div>

          <div className="pt-3 border-t border-white/30">
            <div className="flex justify-between text-xs mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>

            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  isLate ? 'bg-white' : isWarning ? 'bg-yellow-300' : 'bg-white'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
