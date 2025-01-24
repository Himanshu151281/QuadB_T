import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TasksState, Task } from '../../types';
import axios from 'axios';

const loadTasksState = (): TasksState => {
  try {
    const savedState = localStorage.getItem('tasksState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading tasks state:', error);
  }
  return {
    tasks: [],
    loading: false,
    error: null,
    filter: 'all',
  };
};

const initialState: TasksState = loadTasksState();

export const fetchWeather = async (city: string = 'London') => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    return {
      temp: response.data.current.temp_c,
      condition: response.data.current.condition.text,
    };
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
};

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id' | 'weather' | 'createdAt' | 'isImportant'>) => {
    try {
      let weather;
      if (task.title.toLowerCase().includes('outdoor') || 
          task.title.toLowerCase().includes('outside') ||
          task.title.toLowerCase().includes('walk') ||
          task.title.toLowerCase().includes('run')) {
        weather = await fetchWeather();
      }
      
      return {
        ...task,
        id: Date.now().toString(),
        weather,
        createdAt: new Date().toISOString(),
        isImportant: false,
      };
    } catch (error) {
      throw new Error('Failed to add task with weather data');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasksState', JSON.stringify(state));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasksState', JSON.stringify(state));
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
        localStorage.setItem('tasksState', JSON.stringify(state));
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      localStorage.setItem('tasksState', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        localStorage.setItem('tasksState', JSON.stringify(state));
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add task';
      });
  },
});

export const { toggleTask, deleteTask, toggleImportant, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;