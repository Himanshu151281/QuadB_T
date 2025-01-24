import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { toggleDarkMode } from './store/slices/themeSlice';
import LoginForm from './components/Auth/LoginForm';
import TaskInput from './components/Tasks/TaskInput';
import TaskList from './components/Tasks/TaskList';
import Sidebar from './components/Layout/Sidebar';
import TaskDetails from './components/Tasks/TaskDetails';
import { Search, Grid2X2, Moon, Sun } from 'lucide-react';

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  // Close task details on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const detailsPanel = document.getElementById('task-details-panel');
      if (detailsPanel && !detailsPanel.contains(e.target as Node)) {
        setShowDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
    setShowDetails(true);
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      
      <main className="flex-1 md:ml-64">
        <header className={`h-16 flex items-center justify-between px-4 sm:px-6 border-b ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <h1 className={`text-xl font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>To Do</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className={`p-2 rounded-full ${
              darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}>
              <Search className="h-5 w-5" />
            </button>
            <button className={`p-2 rounded-full ${
              darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}>
              <Grid2X2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-2 rounded-full ${
                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1 px-4 sm:px-6 py-8">
            <TaskInput />
            <TaskList onSelectTask={handleTaskSelect} selectedTask={selectedTask} />
          </div>
          {selectedTask && (
            <div
              id="task-details-panel"
              className={`fixed md:relative inset-y-0 right-0 w-full md:w-80 transform transition-transform duration-300 ease-in-out ${
                showDetails ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
              }`}
            >
              <TaskDetails taskId={selectedTask} onClose={() => setShowDetails(false)} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;