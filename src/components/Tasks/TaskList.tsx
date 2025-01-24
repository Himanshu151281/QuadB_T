import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleTask, deleteTask, toggleImportant } from '../../store/slices/tasksSlice';
import { Star, Cloud, Trash2 } from 'lucide-react';

interface TaskListProps {
  onSelectTask: (taskId: string) => void;
  selectedTask: string | null;
}

const TaskList: React.FC<TaskListProps> = ({ onSelectTask, selectedTask }) => {
  const { tasks, loading, error, filter } = useSelector((state: RootState) => state.tasks);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg ${
        darkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-600'
      }`}>
        {error}
      </div>
    );
  }

  const filterTasks = (tasks: Task[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return tasks.filter(task => {
      switch (filter) {
        case 'today':
          const taskDate = new Date(task.createdAt);
          return taskDate >= today;
        case 'important':
          return task.isImportant;
        case 'planned':
          return task.dueDate;
        case 'assigned':
          return false; // Implement assigned logic if needed
        default:
          return true;
      }
    });
  };

  const filteredTasks = filterTasks(tasks);
  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incompleteTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onSelectTask(task.id)}
            className={`rounded-lg p-4 cursor-pointer transition-shadow duration-200 ${
              darkMode 
                ? `bg-gray-800 ${selectedTask === task.id ? 'ring-2 ring-green-500' : 'hover:bg-gray-700'}`
                : `bg-white ${selectedTask === task.id ? 'ring-2 ring-green-500' : 'hover:shadow-md'}`
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {task.title}
                </span>
                {task.dueDate && (
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                {task.weather && (
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Cloud className="h-4 w-4 mr-1" />
                    {task.weather.temp}°C, {task.weather.condition}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleImportant(task.id));
                }}
                className={`p-1 rounded-full ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Star 
                  className={`h-5 w-5 ${
                    task.isImportant 
                      ? 'text-yellow-500 fill-yellow-500' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteTask(task.id));
                }}
                className={`p-1 rounded-full ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-8">
          <h3 className={`text-lg font-medium mb-4 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Completed</h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center space-x-3 p-4 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                  className="h-4 w-4 text-gray-400 rounded border-gray-300"
                />
                <span className={`flex-1 line-through ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>{task.title}</span>
                <button
                  onClick={() => dispatch(toggleImportant(task.id))}
                  className={`p-1 rounded-full ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Star 
                    className={`h-5 w-5 ${
                      task.isImportant 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className={`p-1 rounded-full ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;