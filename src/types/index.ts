export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  isImportant: boolean;
  weather?: {
    temp: number;
    condition: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
}

export interface ThemeState {
  darkMode: boolean;
}