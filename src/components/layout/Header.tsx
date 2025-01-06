import React from 'react';
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
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Terminal className="h-8 w-8" />
          <span className="text-xl font-bold">No-Code Architects Toolkit</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className={cn(
            "px-3 py-1 rounded-full text-sm",
            isAuthenticated ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {isAuthenticated ? "Authenticated" : "Not Authenticated"}
          </div>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 w-9"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}