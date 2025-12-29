
import React from 'react';
import { Task, TaskStatus, DayOfWeek } from '../types';
import { X, Plus, Trash2, Save, MoveUp, MoveDown } from 'lucide-react';

interface RoutineEditorProps {
  day: DayOfWeek;
  tasks: Task[];
  onSave: (tasks: Task[]) => void;
  onClose: () => void;
}

export const RoutineEditor: React.FC<RoutineEditorProps> = ({ day, tasks, onSave, onClose }) => {
  const [localTasks, setLocalTasks] = React.useState<Task[]>([...tasks]);

  const addTask = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Objective',
      description: 'Describe the mission parameters...',
      startTime: '09:00',
      durationMinutes: 60,
      status: TaskStatus.PENDING,
      dependencies: [],
      requirements: []
    };
    setLocalTasks([...localTasks, newTask]);
  };

  const removeTask = (id: string) => {
    setLocalTasks(localTasks.filter(t => t.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setLocalTasks(localTasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="app-card w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#3c4043] flex justify-between items-center bg-[#1e1f20]">
          <div>
            <h2 className="text-xl font-bold text-[#e8eaed]">Routine Architect</h2>
            <p className="text-sm text-[#9aa0a6]">Editing schedule for <span className="text-[#8ab4f8] font-bold uppercase">{day}</span></p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#3c4043] rounded-full transition-colors">
            <X className="w-6 h-6 text-[#9aa0a6]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 terminal-scroll bg-[#0e1113]">
          {localTasks.map((task, index) => (
            <div key={task.id} className="p-4 bg-[#1e1f20] border border-[#3c4043] rounded-xl space-y-4 group transition-all hover:border-[#5f6368]">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1 flex flex-col items-center justify-center gap-2">
                  <div className="text-[10px] font-bold text-[#5f6368]">#{index + 1}</div>
                </div>
                <div className="col-span-5">
                  <label className="text-[10px] uppercase font-bold text-[#5f6368] mb-1 block">Title</label>
                  <input 
                    value={task.title}
                    onChange={(e) => updateTask(task.id, { title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-[#5f6368] mb-1 block">Start</label>
                  <input 
                    type="time"
                    value={task.startTime}
                    onChange={(e) => updateTask(task.id, { startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-[#5f6368] mb-1 block">Duration (m)</label>
                  <input 
                    type="number"
                    value={task.durationMinutes}
                    onChange={(e) => updateTask(task.id, { durationMinutes: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                  />
                </div>
                <div className="col-span-2 flex items-end justify-end pb-1">
                  <button 
                    onClick={() => removeTask(task.id)}
                    className="p-2 text-[#ea4335] hover:bg-[#ea4335]/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#5f6368] mb-1 block">Objectives / Description</label>
                <textarea 
                  value={task.description}
                  onChange={(e) => updateTask(task.id, { description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm h-16 resize-none"
                />
              </div>
            </div>
          ))}
          
          <button 
            onClick={addTask}
            className="w-full py-4 border-2 border-dashed border-[#3c4043] rounded-xl text-[#9aa0a6] hover:text-[#8ab4f8] hover:border-[#8ab4f8]/50 hover:bg-[#8ab4f8]/5 transition-all flex items-center justify-center gap-2 font-bold uppercase text-xs"
          >
            <Plus className="w-4 h-4" /> Add Mission Block
          </button>
        </div>

        <div className="p-6 border-t border-[#3c4043] flex justify-end gap-3 bg-[#1e1f20]">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(localTasks)}
            className="px-8 py-2 bg-[#8ab4f8] hover:bg-[#a2c5f9] text-[#202124] font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" /> Save Routine
          </button>
        </div>
      </div>
    </div>
  );
};
