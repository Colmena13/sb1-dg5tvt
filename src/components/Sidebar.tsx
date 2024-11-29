import React from 'react';
import { Brain, CheckSquare, Menu } from 'lucide-react';
import { SidebarSection } from './SidebarSection';
import { useTask } from '../features/task/TaskProvider';
import { useMemory } from '../features/memory/MemoryProvider';

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const { tasks } = useTask();
  const { memories } = useMemory();

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4 flex items-center justify-between">
        <h2 className={`font-bold ${isOpen ? 'block' : 'hidden'}`}>Colmena AI</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="p-2 space-y-2">
        <SidebarSection title="Memorias" icon={Brain} isOpen={isOpen}>
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              {memory.content.slice(0, 30)}...
            </div>
          ))}
        </SidebarSection>

        <SidebarSection title="Tareas" icon={CheckSquare} isOpen={isOpen}>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                className="rounded text-blue-500"
                readOnly
              />
              <span>{task.title}</span>
            </div>
          ))}
        </SidebarSection>
      </nav>
    </div>
  );
}