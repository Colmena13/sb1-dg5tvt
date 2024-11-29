import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAgentActions } from '../hooks/useAgentActions';
import { useAgentStore } from '../store/useAgentStore';

interface AgentInputProps {
  onResponse?: (response: any) => void;
}

export function AgentInput({ onResponse }: AgentInputProps) {
  const [input, setInput] = useState('');
  const { executeAction } = useAgentActions();
  const isProcessing = useAgentStore((state) => state.isProcessing);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    try {
      const response = await executeAction({
        type: 'query',
        content: input,
      });
      
      setInput('');
      onResponse?.(response);
    } catch (error) {
      console.error('Error al procesar la consulta:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="¿En qué puedo ayudarte?"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isProcessing 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={isProcessing}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}