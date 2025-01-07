import { Link } from 'react-router-dom';
import { 
  VideoCameraIcon, 
  PhotoIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  DocumentTextIcon, 
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 scroll-smooth">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent animate-gradient bg-[length:200%] hover:bg-[length:400%] transition-all duration-1000">
            No-Code Architects Toolkit
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your all-in-one solution for media processing, code execution, and automation workflows
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div className="rounded-md shadow hover:shadow-lg transition-shadow group">
              <Link
                to="/media-processing"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-300 md:py-4 md:text-lg md:px-10 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Video Processing */}
          <div className="pt-6 animate-fade-in-up [animation-delay:300ms]">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform-gpu hover:scale-[1.02] border border-white/10 dark:border-gray-700/50 hover:border-primary-500/20">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <VideoCameraIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  Video Processing
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Advanced video editing tools including captioning, concatenation, and format conversion
                </p>
              </div>
            </div>
          </div>

          {/* Image Processing */}
          <div className="pt-6 animate-fade-in-up [animation-delay:400ms]">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform-gpu hover:scale-[1.02] border border-white/10 dark:border-gray-700/50 hover:border-primary-500/20">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <PhotoIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  Image Processing
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Convert images to videos, apply filters, and optimize media for various platforms
                </p>
              </div>
            </div>
          </div>

          {/* Code Execution */}
          <div className="pt-6 animate-fade-in-up [animation-delay:500ms]">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform-gpu hover:scale-[1.02] border border-white/10 dark:border-gray-700/50 hover:border-primary-500/20">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <CodeBracketIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  Code Execution
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Run Python code snippets with real-time output and error handling
                </p>
              </div>
            </div>
          </div>

          {/* Media Processing */}
          <div className="pt-6 animate-fade-in-up [animation-delay:600ms]">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform-gpu hover:scale-[1.02] border border-white/10 dark:border-gray-700/50 hover:border-primary-500/20">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <CpuChipIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  Media Processing
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Convert media formats, extract audio, and generate transcriptions
                </p>
              </div>
            </div>
          </div>

          {/* FFmpeg Compose */}
          <div className="pt-6 animate-fade-in-up [animation-delay:700ms]">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform-gpu hover:scale-[1.02] border border-white/10 dark:border-gray-700/50 hover:border-primary-500/20">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  FFmpeg Compose
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Build complex FFmpeg commands with an intuitive interface
                </p>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="pt-6 animate-fade-in-up [animation-delay:800ms]">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform-gpu hover:scale-[1.02] border border-white/10 dark:border-gray-700/50 hover:border-primary-500/20">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <DocumentTextIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                  Documentation
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Comprehensive guides and API references for all features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
