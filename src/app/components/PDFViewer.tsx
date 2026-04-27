import { useState } from 'react';
import { X, FileText, Timer, AlertTriangle } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  taskName: string;
  pdfType: 'manual' | 'drawing';
  estimatedMinutes: number;
  elapsedSeconds: number;
  onClose: () => void;
}

export function PDFViewer({ pdfUrl, taskName, pdfType, estimatedMinutes, elapsedSeconds, onClose }: PDFViewerProps) {

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
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-4">
          <FileText className="w-6 h-6" />
          <div>
            <h3 className="text-primary-foreground">{taskName}</h3>
            <p className="text-sm text-primary-foreground/80">
              {pdfType === 'manual' ? 'Assembly Manual' : 'Technical Drawing'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-foreground/10 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-800 p-8 flex items-center justify-center">
        <div className="bg-white p-12 rounded-lg shadow-2xl max-w-4xl w-full text-center">
          <FileText className="w-24 h-24 mx-auto mb-6 text-primary" />
          <h2 className="text-primary mb-4">
            {pdfType === 'manual' ? 'Assembly Manual' : 'Technical Drawing'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            This is a demonstration interface. In production, the PDF document would be displayed here from:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <code className="text-sm break-all">{pdfUrl}</code>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">Document Type</p>
              <p className="text-blue-900">{pdfType === 'manual' ? 'Assembly Manual' : 'Technical Drawing'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 mb-1">Task</p>
              <p className="text-green-900">{taskName}</p>
            </div>
          </div>
        </div>
      </div>

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
            <p className="text-3xl font-mono tracking-wider">{formatTime(elapsedSeconds)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Estimated Time:</span>
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
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {isLate && (
            <div className="pt-3 border-t border-white/30 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                Task is running {Math.abs(remainingMinutes)} minutes over estimated time
              </p>
            </div>
          )}

          {isWarning && !isLate && (
            <div className="pt-3 border-t border-white/30 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                Less than 20% of estimated time remaining
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
