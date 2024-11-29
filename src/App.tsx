import React from 'react';
import { AgentProvider } from './features/agent/AgentProvider';
import { MemoryProvider } from './features/memory/MemoryProvider';
import { TaskProvider } from './features/task/TaskProvider';
import { AgentChat } from './features/agent/components/AgentChat';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <AgentProvider>
      <MemoryProvider>
        <TaskProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6">
              <AgentChat />
            </main>
          </div>
        </TaskProvider>
      </MemoryProvider>
    </AgentProvider>
  );
}

export default App;