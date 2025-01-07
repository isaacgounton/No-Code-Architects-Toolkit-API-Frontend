import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../lib/store';
import toast from 'react-hot-toast';

const settingsSchema = z.object({
  apiKey: z.string().min(1, 'API Key is required'),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function Settings() {
  const { apiKey, setApiKey } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      apiKey: apiKey || '',
    },
  });

  const onSubmit = (data: SettingsForm) => {
    setApiKey(data.apiKey);
    toast.success('API Key saved successfully');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            API Key
          </label>
          <div className="mt-1">
            <input
              type="password"
              {...register('apiKey')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.apiKey && (
              <p className="mt-1 text-sm text-red-600">{errors.apiKey.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
