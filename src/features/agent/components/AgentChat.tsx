import React from 'react';
import { AgentResponse } from './AgentResponse';
import { AgentInput } from './AgentInput';
import { useAgentStore } from '../store/useAgentStore';

export function AgentChat() {
  const { responses } = useAgentStore();
  const chatRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {responses.map((response) => (
          <AgentResponse key={response.id} response={response} />
        ))}
      </div>
      <AgentInput />
    </div>
  );
}