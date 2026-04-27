import { Circle, Clock, CheckCircle, PlayCircle, Coffee, XCircle } from 'lucide-react';

export type TaskStatus = 'not-started' | 'waiting-materials' | 'ready' | 'in-progress' | 'on-break' | 'completed';

interface TaskStatusBadgeProps {
  status: TaskStatus;
  size?: 'sm' | 'lg';
}

const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  'not-started': {
    label: 'Not Started',
    color: 'text-gray-700',
    bg: 'bg-gray-100',
    icon: <Circle className="w-5 h-5" />
  },
  'waiting-materials': {
    label: 'Waiting for Materials',
    color: 'text-red-700',
    bg: 'bg-red-100',
    icon: <XCircle className="w-5 h-5" />
  },
  'ready': {
    label: 'Ready',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    icon: <CheckCircle className="w-5 h-5" />
  },
  'in-progress': {
    label: 'In Progress',
    color: 'text-green-700',
    bg: 'bg-green-100',
    icon: <PlayCircle className="w-5 h-5" />
  },
  'on-break': {
    label: 'On Break',
    color: 'text-orange-700',
    bg: 'bg-orange-100',
    icon: <Coffee className="w-5 h-5" />
  },
  'completed': {
    label: 'Completed',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    icon: <CheckCircle className="w-5 h-5" />
  }
};

export function TaskStatusBadge({ status, size = 'sm' }: TaskStatusBadgeProps) {
  const config = statusConfig[status];
  const padding = size === 'lg' ? 'px-4 py-3' : 'px-3 py-1.5';
  const fontSize = size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className={`${config.bg} ${config.color} ${padding} rounded-lg flex items-center gap-2 ${fontSize} w-fit`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
