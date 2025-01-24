import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addTask } from '../../store/slices/tasksSlice';
import { Bell, RotateCcw, Calendar, Star } from 'lucide-react';
import { AppDispatch } from '../../store';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await dispatch(addTask({
          title: title.trim(),
          completed: false,
          priority,
          dueDate,
        })).unwrap();
        setTitle('');
        setPriority('medium');
        setDueDate('');
        setShowOptions(false);
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    }
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date: string) => {
    setDueDate(date);
    setShowCalendar(false);
  };

  return (
    <div className={`rounded-lg p-4 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
      <div className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Add A Task</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            className={`flex-1 p-2 rounded-md border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-700 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            ADD TASK
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className={`p-2 rounded-full ${
              darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-green-100'
            }`}
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`p-2 rounded-full ${
              darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-green-100'
            }`}
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={handleCalendarClick}
              className={`p-2 rounded-full ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-green-100'
              }`}
            >
              <Calendar className="h-5 w-5" />
            </button>
            {showCalendar && (
              <div className={`absolute z-50 mt-2 p-4 rounded-lg shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                  className={`w-full p-2 rounded-md border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-200 text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
            )}
          </div>
        </div>

        {showOptions && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className={`w-full p-2 rounded-md border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-200 text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div className="flex-1">
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`w-full p-2 rounded-md border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-200 text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskInput;