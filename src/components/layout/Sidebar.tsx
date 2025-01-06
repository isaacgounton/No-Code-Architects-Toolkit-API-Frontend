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
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:bg-gray-950 dark:border-gray-800">
        <nav className="flex flex-1 flex-col pt-8">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                          isActive
                            ? 'bg-gray-50 text-blue-600 dark:bg-gray-800'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                        )
                      }
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
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