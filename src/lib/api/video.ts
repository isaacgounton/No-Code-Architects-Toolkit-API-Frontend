import { useAuthStore } from '../store';

export interface CaptionVideoRequest {
  video_url: string;
  captions?: string;
  settings?: {
    line_color?: string;
    word_color?: string;
    outline_color?: string;
    all_caps?: boolean;
    max_words_per_line?: number;
    x?: number;
    y?: number;
    position?: string;
    alignment?: string;
    font_family?: string;
    font_size?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikeout?: boolean;
    style?: string;
    outline_width?: number;
    spacing?: number;
    angle?: number;
    shadow_offset?: number;
  };
  replace?: Array<{
    find: string;
    replace: string;
  }>;
  webhook_url?: string;
  id?: string;
  language?: string;
}

export interface ConcatenateVideosRequest {
  video_urls: Array<{video_url: string}>;
  webhook_url?: string;
  id?: string;
}

export interface ApiResponse {
  code: number;
  id: string;
  job_id: string;
  response?: string;
  message: string;
  run_time?: number;
  queue_time?: number;
  total_time?: number;
  pid: number;
  queue_id: number;
  queue_length: number;
  build_number: string;
}

export interface ProgressResponse {
  progress: number;
  preview_url?: string;
  output_url?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  message?: string;
}

export const captionVideo = async (params: CaptionVideoRequest): Promise<ApiResponse> => {
  const { apiKey } = useAuthStore.getState();
  
  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/video/caption`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('CORS error: Not allowed to access this resource');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('CORS')) {
      console.error('CORS Error:', error);
      throw new Error('Unable to access the API due to CORS restrictions. Please check the API configuration.');
    }
    throw error;
  }
};

export const concatenateVideos = async (params: ConcatenateVideosRequest): Promise<ApiResponse> => {
  const { apiKey } = useAuthStore.getState();
  
  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/video/concatenate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('CORS error: Not allowed to access this resource');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('CORS')) {
      console.error('CORS Error:', error);
      throw new Error('Unable to access the API due to CORS restrictions. Please check the API configuration.');
    }
    throw error;
  }
};

export const getJobProgress = async (jobId: string): Promise<ProgressResponse> => {
  const { apiKey } = useAuthStore.getState();
  
  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/jobs/${jobId}/progress`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('CORS error: Not allowed to access this resource');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('CORS')) {
      console.error('CORS Error:', error);
      throw new Error('Unable to access the API due to CORS restrictions. Please check the API configuration.');
    }
    throw error;
  }
};
