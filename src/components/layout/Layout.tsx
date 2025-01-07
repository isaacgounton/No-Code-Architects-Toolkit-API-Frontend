import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from 'react-hot-toast';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-hidden">
      <Header />
      <Sidebar />
      <main className="lg:pl-72 pt-16 transition-all duration-300">
        <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <Outlet />
          </div>
        </div>
      </main>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: '!bg-white !text-gray-900 dark:!bg-gray-800 dark:!text-gray-100 !border !border-gray-200/50 dark:!border-gray-700/50 !shadow-lg',
          duration: 4000,
        }}
      />
    </div>
  );
}
