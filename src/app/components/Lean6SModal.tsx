import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Lean6SModalProps {
  onComplete: () => void;
}

const sixSSteps = [
  {
    id: 1,
    title: 'Sort',
    description: 'Remove unnecessary items from workspace',
    icon: '🗂️'
  },
  {
    id: 2,
    title: 'Set in Order',
    description: 'Organize and label everything',
    icon: '📋'
  },
  {
    id: 3,
    title: 'Shine',
    description: 'Clean and inspect workspace',
    icon: '✨'
  },
  {
    id: 4,
    title: 'Standardize',
    description: 'Create consistent procedures',
    icon: '📐'
  },
  {
    id: 5,
    title: 'Sustain',
    description: 'Maintain and review standards',
    icon: '🔄'
  },
  {
    id: 6,
    title: 'Safety',
    description: 'Ensure safe working conditions',
    icon: '🛡️'
  }
];

export function Lean6SModal({ onComplete }: Lean6SModalProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const allComplete = completedSteps.length === sixSSteps.length;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg max-w-3xl w-full p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h2 className="mb-2">Daily Lean 6S Checklist</h2>
          <p className="text-muted-foreground">
            Complete all steps before starting your shift
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {sixSSteps.map(step => (
            <button
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                completedSteps.includes(step.id)
                  ? 'border-green-600 bg-green-50'
                  : 'border-border hover:border-primary'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{step.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{step.title}</h4>
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {completedSteps.length} of {sixSSteps.length} steps completed
          </div>
          <button
            onClick={onComplete}
            disabled={!allComplete}
            className={`px-6 py-3 rounded-lg transition-all ${
              allComplete
                ? 'bg-primary text-primary-foreground hover:opacity-90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {allComplete ? 'Start Shift' : 'Complete All Steps'}
          </button>
        </div>
      </div>
    </div>
  );
}
