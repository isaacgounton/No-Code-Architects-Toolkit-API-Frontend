# GitHub Copilot Instructions for Media Processing App

## General Coding Guidelines
- Follow TypeScript best practices with strict type checking
- Use functional components with React hooks
- Maintain consistent code formatting (Prettier config provided)
- Write clear, descriptive commit messages
- Document complex logic with JSDoc comments

## React/TypeScript Patterns
- Use Context API for shared state (see src/context/)
- Follow component composition patterns
- Type all props and state explicitly
- Use TypeScript utility types where appropriate
- Prefer TypeScript enums over string literals for fixed sets of values

## Media Processing Domain Knowledge
- Understand FFmpeg concepts for video/audio processing
- Familiarize with common media formats and codecs
- Know image processing fundamentals (resizing, compression, etc.)
- Understand video concatenation and captioning workflows
- Be aware of MinIO storage integration patterns

## API Integration Patterns
- Use src/lib/api.ts as the base for API calls
- Follow RESTful conventions for endpoints
- Handle errors gracefully with proper error boundaries
- Use axios interceptors for request/response handling
- Implement proper loading states and error handling

## Testing & Debugging
- Write unit tests for utility functions
- Use React Testing Library for component tests
- Test media processing edge cases
- Use VSCode debugger for TypeScript debugging
- Monitor network requests in browser dev tools

## Code Examples

### React Component with TypeScript
```tsx
interface MediaUploadProps {
  onUpload: (file: File) => void;
  acceptedFormats: string[];
}

const MediaUpload: React.FC<MediaUploadProps> = ({ 
  onUpload, 
  acceptedFormats 
}) => {
  // Component implementation
}
```

### API Service Example
```typescript
export const processImage = async (file: File, options: ImageOptions) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('options', JSON.stringify(options));
  
  return api.post<ProcessedImage>('/image/process', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
```

### Media Processing Utility
```typescript
export const concatenateVideos = async (videoUrls: string[]) => {
  const inputFiles = videoUrls.map(url => `-i ${url}`).join(' ');
  const outputFile = `output-${Date.now()}.mp4`;
  
  const command = `ffmpeg ${inputFiles} \
    -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" ${outputFile}`;

  return execCommand(command);
};
