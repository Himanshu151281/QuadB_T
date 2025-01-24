import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Plus, Bell, Calendar, RotateCcw, X, Trash } from 'lucide-react';

interface TaskDetailsProps {
  taskId: string;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId, onClose }) => {
  const task = useSelector((state: RootState) => 
    state.tasks.tasks.find(t => t.id === taskId)
  );
  const { darkMode } = useSelector((state: RootState) => state.theme);

  if (!task) return null;

  return (
    <div className={`w-80 border-l ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-green-50 border-gray-200'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {task.title}
          </div>
          <button onClick={onClose} className={
            darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
          }>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <button className={`flex items-center space-x-2 w-full p-2 rounded ${
            darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-green-100'
          }`}>
            <Plus className="h-5 w-5" />
            <span>Add Step</span>
          </button>

          <button className={`flex items-center space-x-2 w-full p-2 rounded ${
            darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-green-100'
          }`}>
            <Bell className="h-5 w-5" />
            <span>Set Reminder</span>
          </button>

          <button className={`flex items-center space-x-2 w-full p-2 rounded ${
            darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-green-100'
          }`}>
            <Calendar className="h-5 w-5" />
            <span>Add Due Date</span>
          </button>

          <button className={`flex items-center space-x-2 w-full p-2 rounded ${
            darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-green-100'
          }`}>
            <RotateCcw className="h-5 w-5" />
            <span>Repeat</span>
          </button>

          <div className="pt-4">
            <textarea
              placeholder="Add Notes"
              className={`w-full p-2 rounded border focus:outline-none focus:ring-1 focus:ring-green-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-700 placeholder-gray-500'
              }`}
              rows={4}
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Created Today
          </div>
          <button className={
            darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
          }>
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;