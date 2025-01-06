import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';

// Lazy load pages
const VideoProcessing = React.lazy(() => import('./pages/VideoProcessing'));
const ImageProcessing = React.lazy(() => import('./pages/ImageProcessing'));
const MediaProcessing = React.lazy(() => import('./pages/MediaProcessing'));
const FFmpegCompose = React.lazy(() => import('./pages/FFmpegCompose'));
const CodeExecution = React.lazy(() => import('./pages/CodeExecution'));
const JobHistory = React.lazy(() => import('./pages/JobHistory'));
const Settings = React.lazy(() => import('./pages/Settings'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/video" replace />} />
            <Route
              path="video"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <VideoProcessing />
                </React.Suspense>
              }
            />
            <Route
              path="image"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ImageProcessing />
                </React.Suspense>
              }
            />
            <Route
              path="media"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <MediaProcessing />
                </React.Suspense>
              }
            />
            <Route
              path="ffmpeg"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <FFmpegCompose />
                </React.Suspense>
              }
            />
            <Route
              path="code"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <CodeExecution />
                </React.Suspense>
              }
            />
            <Route
              path="history"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <JobHistory />
                </React.Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Settings />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;