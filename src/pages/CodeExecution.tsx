import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeExecution() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Code Execution</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Execute Python code with custom parameters and view results.
        </p>
      </div>

      <div className="h-[500px] border rounded-lg overflow-hidden">
        <Editor
          defaultLanguage="python"
          defaultValue="# Enter your Python code here"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
}