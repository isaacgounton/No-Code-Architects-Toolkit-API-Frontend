import create from 'zustand';

interface AuthState {
  apiKey: string | null;
  isAuthenticated: boolean;
  setApiKey: (apiKey: string) => void;
  clearApiKey: () => void;
}

const validateApiKey = (apiKey: string | null) => {
  // Add your validation logic here
  return apiKey && apiKey.length > 10; // Example validation
};

export const useAuthStore = create<AuthState>((set) => ({
  apiKey: import.meta.env.VITE_API_KEY || null,
  isAuthenticated: validateApiKey(import.meta.env.VITE_API_KEY || null),
  setApiKey: (apiKey) => set({ apiKey, isAuthenticated: validateApiKey(apiKey) }),
  clearApiKey: () => set({ apiKey: null, isAuthenticated: false }),
}));