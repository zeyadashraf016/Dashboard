import { Play, Loader2, CheckCircle } from 'lucide-react';

type ButtonState = 'disabled' | 'ready' | 'active';

interface AssemblyBeginButtonProps {
  state: ButtonState;
  onClick: () => void;
}

export function AssemblyBeginButton({ state, onClick }: AssemblyBeginButtonProps) {
  const buttonConfig = {
    disabled: {
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      cursor: 'cursor-not-allowed',
      icon: <Play className="w-6 h-6" />,
      label: 'Assembly Begin',
      subtitle: 'Waiting for validation...'
    },
    ready: {
      bg: 'bg-green-600 hover:bg-green-700',
      text: 'text-white',
      cursor: 'cursor-pointer',
      icon: <Play className="w-6 h-6" />,
      label: 'Assembly Begin',
      subtitle: 'Ready to start'
    },
    active: {
      bg: 'bg-blue-600',
      text: 'text-white',
      cursor: 'cursor-default',
      icon: <CheckCircle className="w-6 h-6 animate-pulse" />,
      label: 'Assembly In Progress',
      subtitle: 'Task running...'
    }
  };

  const config = buttonConfig[state];

  return (
    <button
      onClick={onClick}
      disabled={state === 'disabled' || state === 'active'}
      className={`w-full ${config.bg} ${config.text} ${config.cursor} px-8 py-6 rounded-lg transition-all shadow-lg disabled:shadow-none border-2 ${
        state === 'ready' ? 'border-green-700' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-center gap-4">
        {config.icon}
        <div className="text-left">
          <div className="text-xl">{config.label}</div>
          <div className="text-sm opacity-90">{config.subtitle}</div>
        </div>
      </div>
    </button>
  );
}
