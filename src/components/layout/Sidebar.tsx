import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Video,
  Image as ImageIcon,
  Music,
  Terminal,
  Code,
  History,
  Settings
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Video Processing', href: '/video', icon: Video },
  { name: 'Image Processing', href: '/image', icon: ImageIcon },
  { name: 'Media Processing', href: '/media', icon: Music },
  { name: 'FFmpeg Compose', href: '/ffmpeg', icon: Terminal },
  { name: 'Code Execution', href: '/code', icon: Code },
  { name: 'Job History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 dark:bg-gray-950/95 shadow-sm pt-16 border-r border-white/10 dark:border-gray-800/20">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-6">
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            <li>
              <ul role="list" className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      end
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 transition-all duration-200',
                          'hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm',
                          isActive
                            ? 'text-primary-600 bg-primary-50/50 dark:bg-primary-900/20 dark:text-primary-400 shadow-sm hover:shadow-md'
                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0 transition-colors',
                              isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                          <span className="absolute inset-y-0 right-4 flex items-center">
                            <span className={cn(
                              'h-2 w-2 rounded-full transition-colors',
                              isActive 
                                ? 'bg-primary-600 dark:bg-primary-400'
                                : 'bg-transparent'
                            )} />
                          </span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
