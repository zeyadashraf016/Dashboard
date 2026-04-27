import { useState } from 'react';
import { ListChecks, ChevronDown, Info } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
  pdfUrl: string;
  pdfType: 'manual' | 'drawing';
}

const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Assembly of Z-Axis Beam',
    description: 'Complete assembly of vertical beam component with mounting brackets',
    estimatedTime: '2.5 hours',
    estimatedMinutes: 150,
    priority: 'high',
    pdfUrl: '/assembly-manuals/z-axis-beam.pdf',
    pdfType: 'manual'
  },
  {
    id: '2',
    name: 'Weld Frame Base',
    description: 'Weld main frame base sections according to specification WD-401',
    estimatedTime: '3 hours',
    estimatedMinutes: 180,
    priority: 'high',
    pdfUrl: '/drawings/frame-base-wd401.pdf',
    pdfType: 'drawing'
  },
  {
    id: '3',
    name: 'Install Hydraulic System',
    description: 'Install and test hydraulic pump and line connections',
    estimatedTime: '4 hours',
    estimatedMinutes: 240,
    priority: 'medium',
    pdfUrl: '/assembly-manuals/hydraulic-system.pdf',
    pdfType: 'manual'
  },
  {
    id: '4',
    name: 'Quality Inspection - Batch A',
    description: 'Perform quality inspection on completed units from Batch A',
    estimatedTime: '1.5 hours',
    estimatedMinutes: 90,
    priority: 'medium',
    pdfUrl: '/drawings/inspection-checklist.pdf',
    pdfType: 'drawing'
  }
];

interface TaskSelectionPanelProps {
  selectedTask: Task | null;
  onTaskSelect: (task: Task) => void;
}

export function TaskSelectionPanel({ selectedTask, onTaskSelect }: TaskSelectionPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="w-6 h-6 text-primary" />
        <h3>Task Selection</h3>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-input-background rounded-lg hover:bg-muted transition-all"
        >
          <span className={selectedTask ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedTask ? selectedTask.name : 'Select a task to begin...'}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-96 overflow-auto">
            {mockTasks.map(task => (
              <button
                key={task.id}
                onClick={() => {
                  onTaskSelect(task);
                  setIsOpen(false);
                }}
                className="w-full p-4 hover:bg-accent transition-all text-left border-b border-border last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{task.name}</h4>
                      <span
                        className={`px-2 py-0.5 text-xs rounded ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'medium'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <p className="text-xs text-muted-foreground">Est. Time: {task.estimatedTime}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTask && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-900 mb-1">Task Details</h4>
              <p className="text-sm text-blue-700">{selectedTask.description}</p>
              <p className="text-sm text-blue-600 mt-2">
                Estimated time: {selectedTask.estimatedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export type { Task };
