import { Clock, Users } from 'lucide-react';
import { TaskStatusBadge, type TaskStatus } from './TaskStatusBadge';

interface TaskRecord {
  id: string;
  taskName: string;
  startTime: string;
  endTime: string | null;
  technicians: string[];
  duration: string;
  status: TaskStatus;
}

const mockHistory: TaskRecord[] = [
  {
    id: '1',
    taskName: 'Assembly of Z-Axis Beam',
    startTime: '08:30 AM',
    endTime: '11:45 AM',
    technicians: ['Magdy', 'Abo Kareem'],
    duration: '3h 15m',
    status: 'completed'
  },
  {
    id: '2',
    taskName: 'Weld Frame Base',
    startTime: '12:30 PM',
    endTime: '03:15 PM',
    technicians: ['Mohamed Elsayedi'],
    duration: '2h 45m',
    status: 'completed'
  },
  {
    id: '3',
    taskName: 'Install Hydraulic System',
    startTime: '03:30 PM',
    endTime: null,
    technicians: ['Magdy', 'Ahmed Hassan'],
    duration: '1h 20m',
    status: 'in-progress'
  }
];

export function TaskHistory() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <h3>Task History & Tracking</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left p-4 bg-muted">Task Name</th>
              <th className="text-left p-4 bg-muted">Start Time</th>
              <th className="text-left p-4 bg-muted">End Time</th>
              <th className="text-left p-4 bg-muted">Duration</th>
              <th className="text-left p-4 bg-muted">Technicians</th>
              <th className="text-left p-4 bg-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map(record => (
              <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">{record.taskName}</td>
                <td className="p-4 text-muted-foreground">{record.startTime}</td>
                <td className="p-4 text-muted-foreground">{record.endTime || '—'}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                    {record.duration}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{record.technicians.join(', ')}</span>
                  </div>
                </td>
                <td className="p-4">
                  <TaskStatusBadge status={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
