// Tipos para el temporizador
export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  isPaused: boolean;
}

// Configuración del temporizador
export interface TimerSettings {
  pomodoro: number;    // duración en minutos
  shortBreak: number;  // duración en minutos
  longBreak: number;   // duración en minutos
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number; // número de pomodoros antes de un descanso largo
}

// Tipos para las tareas
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: {
    completed: number;
    estimated: number;
  };
  createdAt: Date;
  completedAt?: Date;
}

// Tipos para las estadísticas
export interface PomodoroStats {
  date: Date;
  completedPomodoros: number;
  completedTasks: number;
  totalFocusTime: number; // en minutos
}

// Tipos para los reportes
export interface Report {
  daily: PomodoroStats[];
  weekly: {
    startDate: Date;
    endDate: Date;
    totalPomodoros: number;
    totalTasks: number;
    totalFocusTime: number;
  };
}

// Props para componentes
export interface TimerProps {
  mode: TimerMode;
  onComplete: () => void;
  settings: TimerSettings;
}

export interface TaskListProps {
  tasks: Task[];
  onTaskAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

// Estado global de la aplicación
export interface AppState {
  currentTimer: TimerState;
  tasks: Task[];
  settings: TimerSettings;
  stats: PomodoroStats[];
}