import React, { useState } from 'react';
import { useDarkMode } from '../index';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  CodeBracketIcon,
  TrophyIcon,
  UserIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  UsersIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Practice', href: '/practice', icon: CodeBracketIcon },
    { name: 'Code Games', href: '/code-games', icon: PuzzlePieceIcon },
    { name: 'Contests', href: '/contests', icon: TrophyIcon },
    { name: 'Leaderboard', href: '/leaderboard', icon: ChartBarIcon },
    { name: 'Submissions', href: '/submissions', icon: CodeBracketIcon },
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', icon: Cog6ToothIcon },
    { name: 'Manage Problems', href: '/admin/problems', icon: CodeBracketIcon },
    { name: 'Manage Contests', href: '/admin/contests', icon: TrophyIcon },
    { name: 'Manage Users', href: '/admin/users', icon: UsersIcon },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-primary-500 text-white dark:bg-primary-700 dark:text-gray-200 shadow hover:bg-primary-600"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Competitive Platform</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive(item.href)
                    ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
            {user?.is_admin && (
              <>
                <div className="pt-4 pb-2">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin
                  </h3>
                </div>
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive(item.href)
                        ? 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                      }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Competitive Platform</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive(item.href)
                    ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
            {user?.is_admin && (
              <>
                <div className="pt-4 pb-2">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin
                  </h3>
                </div>
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive(item.href)
                        ? 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                      }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {isAuthenticated ? (
                <div className="flex items-center gap-x-4">
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    <span className="font-medium">{user?.username}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    <UserIcon className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary dark:bg-primary-700 dark:text-gray-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
