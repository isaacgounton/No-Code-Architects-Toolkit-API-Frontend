import { useAuthStore } from '../store';

export interface ImageToVideoRequest {
  image_url: string;
  length?: number;
  frame_rate?: number;
  zoom_speed?: number;
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

export const convertImageToVideo = async (params: ImageToVideoRequest): Promise<ApiResponse> => {
  const { apiKey } = useAuthStore.getState();
  
  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/image/transform/video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'include', // Include credentials if needed
      body: JSON.stringify(params), // Add the params to the request body
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
