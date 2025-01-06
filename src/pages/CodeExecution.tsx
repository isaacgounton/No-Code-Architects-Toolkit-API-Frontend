import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function CodeExecution() {
  const [code, setCode] = useState(`// Write your code here
console.log('Hello World!');`);

  const handleExecute = () => {
    try {
      // TODO: Implement actual code execution
      toast.success('Code execution started');
    } catch (error) {
      toast.error(`Failed to execute code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Code Execution</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write and execute code snippets.
        </p>
      </div>

      <div className="h-[500px] border rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <Button onClick={handleExecute} className="w-full md:w-auto">
        Execute Code
      </Button>
    </div>
  );
}