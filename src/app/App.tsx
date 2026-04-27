import { useState, useEffect } from 'react';
import { Lean6SModal } from './components/Lean6SModal';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TimeTrackingPanel } from './components/TimeTrackingPanel';
import { TaskSelectionPanel, type Task } from './components/TaskSelectionPanel';
import { EnhancedBOMPanel } from './components/EnhancedBOMPanel';
import { TimerPanel } from './components/TimerPanel';
import { TechnicianAssignment, type Technician } from './components/TechnicianAssignment';
import { AssemblyBeginButton } from './components/AssemblyBeginButton';
import { TaskStatusBadge, type TaskStatus } from './components/TaskStatusBadge';
import { BreakControl } from './components/BreakControl';
import { TaskHistory } from './components/TaskHistory';
import { SkillMatrix } from './components/SkillMatrix';
import { PDFViewer } from './components/PDFViewer';
import { GanttChartStatus } from './components/GanttChartStatus';

export default function App() {
  const [showLean6S, setShowLean6S] = useState(true);
  const [showGanttStatus, setShowGanttStatus] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [totalWorkedSeconds, setTotalWorkedSeconds] = useState(0);
  const [taskElapsedSeconds, setTaskElapsedSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTechnicians, setSelectedTechnicians] = useState<Technician[]>([]);
  const [materialsValid, setMaterialsValid] = useState(false);
  const [taskTimerActive, setTaskTimerActive] = useState(false);
  const [breakTimerActive, setBreakTimerActive] = useState(false);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('not-started');
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [lastGanttCheck, setLastGanttCheck] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      if (isClockedIn && !isOnBreak && taskTimerActive) {
        setTotalWorkedSeconds(prev => prev + 1);
        setTaskElapsedSeconds(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isClockedIn, isOnBreak, taskTimerActive]);

  useEffect(() => {
    const today = new Date().toDateString();
    if (isClockedIn && lastGanttCheck !== today) {
      const timer = setTimeout(() => {
        setShowGanttStatus(true);
        setLastGanttCheck(today);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isClockedIn, lastGanttCheck]);

  useEffect(() => {
    if (!selectedTask) {
      setTaskStatus('not-started');
    } else if (!materialsValid) {
      setTaskStatus('waiting-materials');
    } else if (materialsValid && !taskTimerActive) {
      setTaskStatus('ready');
    } else if (taskTimerActive && !isOnBreak) {
      setTaskStatus('in-progress');
    } else if (isOnBreak) {
      setTaskStatus('on-break');
    }
  }, [selectedTask, materialsValid, taskTimerActive, isOnBreak]);

  const handleLean6SComplete = () => {
    setShowLean6S(false);
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setIsOnBreak(false);
    setTaskTimerActive(false);
    setBreakTimerActive(false);
  };

  const handleBreakStart = () => {
    setIsOnBreak(true);
    setBreakTimerActive(true);
    setTaskTimerActive(false);
  };

  const handleBreakEnd = () => {
    setIsOnBreak(false);
    setBreakTimerActive(false);
    if (materialsValid && selectedTask) {
      setTaskTimerActive(true);
    }
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setMaterialsValid(false);
    setTaskTimerActive(false);
    setShowPDFViewer(false);
    setTaskElapsedSeconds(0);
  };

  const handleAssemblyBegin = () => {
    if (materialsValid && !taskTimerActive) {
      setTaskTimerActive(true);
      setShowPDFViewer(true);
      setTaskElapsedSeconds(0);
    }
  };

  const getAssemblyButtonState = () => {
    if (!materialsValid || !selectedTask) return 'disabled';
    if (taskTimerActive) return 'active';
    return 'ready';
  };

  const formatTotalHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="size-full flex bg-background">
      {showLean6S && <Lean6SModal onComplete={handleLean6SComplete} />}
      {showGanttStatus && <GanttChartStatus onClose={() => setShowGanttStatus(false)} />}
      {showPDFViewer && selectedTask && (
        <PDFViewer
          pdfUrl={selectedTask.pdfUrl}
          taskName={selectedTask.name}
          pdfType={selectedTask.pdfType}
          estimatedMinutes={selectedTask.estimatedMinutes}
          elapsedSeconds={taskElapsedSeconds}
          onClose={() => setShowPDFViewer(false)}
        />
      )}

      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 flex flex-col">
        <TopBar technicianName="Zeyad Ashraf" currentTime={currentTime} />

        <TimerPanel
          taskTimerActive={taskTimerActive}
          taskName={selectedTask?.name || ''}
          breakTimerActive={breakTimerActive}
          onBreakEnd={handleBreakEnd}
        />

        <main className="flex-1 overflow-auto p-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            {activeView === 'dashboard' && (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2>Manufacturing Dashboard</h2>
                      <p className="text-muted-foreground mt-1">
                        {new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <TaskStatusBadge status={taskStatus} size="lg" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <TimeTrackingPanel
                    isClockedIn={isClockedIn}
                    isOnBreak={isOnBreak}
                    totalHours={formatTotalHours(totalWorkedSeconds)}
                    onClockIn={() => setIsClockedIn(true)}
                    onClockOut={handleClockOut}
                    onBreakStart={handleBreakStart}
                    onBreakEnd={handleBreakEnd}
                  />

                  <BreakControl
                    isOnBreak={isOnBreak}
                    onBreakStart={handleBreakStart}
                    onBreakEnd={handleBreakEnd}
                    disabled={!taskTimerActive}
                  />

                  <TechnicianAssignment
                    selectedTechnicians={selectedTechnicians}
                    onTechniciansChange={setSelectedTechnicians}
                  />
                </div>

                <div className="mb-6">
                  <TaskSelectionPanel
                    selectedTask={selectedTask}
                    onTaskSelect={handleTaskSelect}
                  />
                </div>

                <div className="mb-6">
                  <EnhancedBOMPanel
                    taskId={selectedTask?.id || null}
                    onValidationChange={setMaterialsValid}
                  />
                </div>

                <AssemblyBeginButton
                  state={getAssemblyButtonState()}
                  onClick={handleAssemblyBegin}
                />
              </>
            )}

            {activeView === 'history' && <TaskHistory />}

            {activeView === 'skills' && <SkillMatrix />}

            {activeView === 'settings' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="mb-4">Settings</h2>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
