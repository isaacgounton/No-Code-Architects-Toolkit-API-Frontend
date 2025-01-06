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
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gray-100 dark:bg-gray-900 pt-16"> {/* Added pt-16 for spacing */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 px-6 py-4">
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      end
                      className={({ isActive }) =>
                        cn(
                          'relative flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-200 dark:hover:bg-gray-800',
                          isActive
                            ? 'text-blue-600 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{item.name}</span>
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
