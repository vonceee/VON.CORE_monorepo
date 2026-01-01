import axios from "axios";
import {
  Task,
  DailyRoutines,
  DayOfWeek,
} from "../../features/dashboard/tools/NotCuteAnymore/types";

const API_URL = "http://localhost:8000/api/v1/not-cute-anymore";

export const routineApi = {
  async fetchRoutines(): Promise<DailyRoutines> {
    const response = await axios.get(`${API_URL}/routines`);
    const routinesData = response.data.data;

    // Transform array to DailyRoutines object
    const routinesMap: DailyRoutines = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    routinesData.forEach((routine: any) => {
      routinesMap[routine.day_of_week as DayOfWeek] = routine.tasks.map(
        (task: any) => ({
          id: task.id,
          title: task.title,
          notes: task.notes,
          startTime: task.start_time,
          durationMinutes: task.duration_minutes,
          status: task.status,
          requirements: task.requirements || [],
          dependencies: task.dependencies || [],
        })
      );
    });

    return routinesMap;
  },

  async saveRoutine(day: DayOfWeek, tasks: Task[]): Promise<void> {
    const payload = {
      tasks: tasks.map((task) => ({
        title: task.title,
        notes: task.notes,
        start_time: task.startTime,
        duration_minutes: task.durationMinutes,
        status: task.status,
        requirements: task.requirements,
        dependencies: task.dependencies,
      })),
    };
    await axios.put(`${API_URL}/routines/${day}`, payload);
  },

  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    await axios.patch(`${API_URL}/tasks/${taskId}/status`, { status });
  },

  async fetchLogs(): Promise<any[]> {
    const response = await axios.get(`${API_URL}/logs`);
    return response.data.data;
  },

  async logEvent(level: string, message: string): Promise<void> {
    await axios.post(`${API_URL}/logs`, { level, message });
  },
};
