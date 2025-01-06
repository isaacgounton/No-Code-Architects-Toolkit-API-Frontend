import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout } from './components/layout/Layout';
import { StationsProvider } from './context/StationsContext';

// Lazy load pages
const VideoProcessing = React.lazy(() => import('./pages/VideoProcessing'));
const ImageProcessing = React.lazy(() => import('./pages/ImageProcessing'));
const MediaProcessing = React.lazy(() => import('./pages/MediaProcessing'));
const FFmpegCompose = React.lazy(() => import('./pages/FFmpegCompose'));
const CodeExecution = React.lazy(() => import('./pages/CodeExecution'));
const JobHistory = React.lazy(() => import('./pages/JobHistory'));
const Settings = React.lazy(() => import('./pages/Settings'));

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading page...</p>
    </div>
  );
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <p className="text-red-600">Error loading page: {error.message}</p>
    </div>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StationsProvider>
        <BrowserRouter>
          <React.Suspense fallback={<LoadingFallback />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Navigate to="/video" replace />} />
                  <Route path="/video" element={<VideoProcessing />} />
                  <Route path="/image" element={<ImageProcessing />} />
                  <Route path="/media" element={<MediaProcessing />} />
                  <Route path="/ffmpeg" element={<FFmpegCompose />} />
                  <Route path="/code" element={<CodeExecution />} />
                  <Route path="/history" element={<JobHistory />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/video" replace />} />
                </Route>
              </Routes>
            </ErrorBoundary>
          </React.Suspense>
        </BrowserRouter>
      </StationsProvider>
    </QueryClientProvider>
  );
}

export default App;
