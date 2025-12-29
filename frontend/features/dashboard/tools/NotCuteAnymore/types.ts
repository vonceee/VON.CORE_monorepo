
export enum TaskStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED'
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface TaskDependency {
  taskId: string;
  type: 'finish_to_start';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  startTime: string; // HH:mm
  durationMinutes: number;
  status: TaskStatus;
  dependencies: TaskDependency[];
  requirements: string[];
}

export interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
}

export interface ScheduleMetrics {
  completionRate: number;
  timeEfficiency: number;
  currentStreak: number;
}

export type DailyRoutines = Record<DayOfWeek, Task[]>;
