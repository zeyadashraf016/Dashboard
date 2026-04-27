import { Bell, User } from 'lucide-react';

interface TopBarProps {
  technicianName: string;
  currentTime: string;
}

export function TopBar({ technicianName, currentTime }: TopBarProps) {
  return (
    <div className="h-16 bg-primary text-primary-foreground border-b border-primary/20 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-primary-foreground">Technician Dashboard</h1>
        <div className="h-6 w-px bg-primary-foreground/20" />
        <span className="text-primary-foreground/80">{currentTime}</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-primary-foreground/20">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <span>{technicianName}</span>
        </div>
      </div>
    </div>
  );
}
