import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Terminal } from 'lucide-react';
import { useAuthStore } from '../../lib/store';
import { cn } from '../../lib/utils';

export function Header() {
  const [isDark, setIsDark] = React.useState(false);
  const { isAuthenticated } = useAuthStore();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 dark:bg-gray-950/95 shadow-sm border-white/10 dark:border-gray-800/20">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <Terminal className="h-8 w-8 text-primary-600 dark:text-primary-400 transition-transform hover:scale-105" />
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            No-Code Architects Toolkit
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <div className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md",
            isAuthenticated ? 
              "bg-green-100/80 text-green-800 hover:bg-green-200/80 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30" : 
              "bg-red-100/80 text-red-800 hover:bg-red-200/80 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          )}>
            {isAuthenticated ? "Authenticated" : "Not Authenticated"}
          </div>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 h-10 w-10 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 hover:scale-105 hover:shadow-sm"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400 hover:text-yellow-500 transition-transform" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
