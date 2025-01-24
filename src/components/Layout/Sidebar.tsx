import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { setFilter } from '../../store/slices/tasksSlice';
import { ListTodo, Calendar, Star, Map, Users, Plus, LogOut, Menu } from 'lucide-react';

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { filter } = useSelector((state: RootState) => state.tasks);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClasses = `fixed top-0 bottom-0 border-r transition-all duration-300 ${
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  } ${isOpen ? 'left-0 w-64' : '-left-64 w-64 md:left-0'}`;

  const menuButtonClasses = `fixed top-4 left-4 z-50 p-2 rounded-lg md:hidden ${
    darkMode ? 'text-gray-200 bg-gray-800' : 'text-gray-600 bg-white'
  }`;

  return (
    <>
      <button onClick={toggleSidebar} className={menuButtonClasses}>
        <Menu className="h-6 w-6" />
      </button>

      <div className={sidebarClasses}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hey,</div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name}</div>
            </div>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => dispatch(setFilter('all'))}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                filter === 'all' 
                  ? (darkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-gray-900')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
              }`}
            >
              <ListTodo className="h-5 w-5" />
              <span>All Tasks</span>
            </button>
            <button 
              onClick={() => dispatch(setFilter('today'))}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                filter === 'today'
                  ? (darkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-gray-900')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Today</span>
            </button>
            <button 
              onClick={() => dispatch(setFilter('important'))}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                filter === 'important'
                  ? (darkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-gray-900')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
              }`}
            >
              <Star className="h-5 w-5" />
              <span>Important</span>
            </button>
            <button 
              onClick={() => dispatch(setFilter('planned'))}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                filter === 'planned'
                  ? (darkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-gray-900')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Planned</span>
            </button>
            <button 
              onClick={() => dispatch(setFilter('assigned'))}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                filter === 'assigned'
                  ? (darkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-gray-900')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Assigned to me</span>
            </button>
          </nav>

          <div className="mt-8">
            <button className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
              darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
            }`}>
              <Plus className="h-5 w-5" />
              <span>Add list</span>
            </button>
          </div>

          <div className="mt-8">
            <div className={`rounded-lg p-4 ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
              <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-green-100' : 'text-gray-900'}`}>Today Tasks</div>
              <div className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>11</div>
              <div className="w-full h-4 bg-green-900 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
              </div>
              <div className={`flex justify-between mt-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>Pending</span>
                <span>Done</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => dispatch(logout())}
              className={`flex items-center space-x-2 w-full p-2 ${
                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;