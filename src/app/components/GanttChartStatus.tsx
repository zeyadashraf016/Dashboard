import { X, Calendar, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

interface ProjectTask {
  name: string;
  planned: number;
  actual: number;
  status: 'completed' | 'in-progress' | 'delayed' | 'upcoming';
}

interface GanttChartStatusProps {
  onClose: () => void;
}

const projectTasks: ProjectTask[] = [
  { name: 'Assembly of Z-Axis Beam', planned: 150, actual: 145, status: 'completed' },
  { name: 'Weld Frame Base', planned: 180, actual: 195, status: 'completed' },
  { name: 'Install Hydraulic System', planned: 240, actual: 180, status: 'in-progress' },
  { name: 'Quality Inspection - Batch A', planned: 90, actual: 0, status: 'upcoming' },
  { name: 'Paint and Finish', planned: 120, actual: 0, status: 'upcoming' },
  { name: 'Final Assembly', planned: 300, actual: 0, status: 'upcoming' }
];

export function GanttChartStatus({ onClose }: GanttChartStatusProps) {
  const completedTasks = projectTasks.filter(t => t.status === 'completed');
  const totalPlanned = completedTasks.reduce((sum, t) => sum + t.planned, 0);
  const totalActual = completedTasks.reduce((sum, t) => sum + t.actual, 0);
  const variance = totalActual - totalPlanned;
  const variancePercentage = totalPlanned > 0 ? ((variance / totalPlanned) * 100) : 0;

  const isOnTrack = variance <= totalPlanned * 0.1;
  const isCritical = variance > totalPlanned * 0.2;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-6 rounded-t-lg border-b-4 ${
          isOnTrack ? 'bg-green-50 border-green-600' : isCritical ? 'bg-red-50 border-red-600' : 'bg-orange-50 border-orange-600'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isOnTrack ? 'bg-green-600' : isCritical ? 'bg-red-600' : 'bg-orange-600'
              }`}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={isOnTrack ? 'text-green-900' : isCritical ? 'text-red-900' : 'text-orange-900'}>
                  Daily Project Status
                </h2>
                <p className={`text-sm ${isOnTrack ? 'text-green-700' : isCritical ? 'text-red-700' : 'text-orange-700'}`}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={`p-4 rounded-lg flex items-center gap-4 ${
            isOnTrack ? 'bg-green-100' : isCritical ? 'bg-red-100' : 'bg-orange-100'
          }`}>
            {isOnTrack ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-green-900 mb-1">Project On Track</h3>
                  <p className="text-green-700">
                    You're doing great! Currently {Math.abs(variance)} minutes {variance < 0 ? 'ahead of' : 'within'} schedule.
                  </p>
                </div>
              </>
            ) : isCritical ? (
              <>
                <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 animate-pulse" />
                <div>
                  <h3 className="text-red-900 mb-1">Critical Delay</h3>
                  <p className="text-red-700">
                    Project is {variance} minutes ({Math.abs(Math.round(variancePercentage))}%) behind schedule. Immediate action required.
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-orange-900 mb-1">Minor Delay</h3>
                  <p className="text-orange-700">
                    Project is {variance} minutes ({Math.abs(Math.round(variancePercentage))}%) behind schedule. Monitor closely.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-4">Task Summary</h3>

          <div className="space-y-3 mb-6">
            {projectTasks.map((task, index) => {
              const taskVariance = task.actual - task.planned;
              const isTaskDelayed = task.status === 'completed' && taskVariance > 0;
              const isTaskAhead = task.status === 'completed' && taskVariance < 0;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    task.status === 'completed'
                      ? isTaskDelayed
                        ? 'bg-red-50 border-l-red-600'
                        : 'bg-green-50 border-l-green-600'
                      : task.status === 'in-progress'
                      ? 'bg-blue-50 border-l-blue-600'
                      : 'bg-gray-50 border-l-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4>{task.name}</h4>
                        <span
                          className={`px-2 py-0.5 text-xs rounded ${
                            task.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : task.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {task.status === 'completed' ? 'COMPLETED' : task.status === 'in-progress' ? 'IN PROGRESS' : 'UPCOMING'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Planned: {task.planned} min</span>
                        {task.actual > 0 && <span>Actual: {task.actual} min</span>}
                        {task.status === 'completed' && taskVariance !== 0 && (
                          <span className={`flex items-center gap-1 ${isTaskDelayed ? 'text-red-600' : 'text-green-600'}`}>
                            {isTaskDelayed ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {Math.abs(taskVariance)} min {isTaskDelayed ? 'over' : 'under'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Planned</p>
              <p className="text-xl">{totalPlanned} min</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Actual</p>
              <p className="text-xl">{totalActual} min</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Variance</p>
              <p className={`text-xl ${variance > 0 ? 'text-red-600' : variance < 0 ? 'text-green-600' : ''}`}>
                {variance > 0 ? '+' : ''}{variance} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
