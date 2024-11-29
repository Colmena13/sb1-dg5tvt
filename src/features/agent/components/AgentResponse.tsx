import React from 'react';
import { Bot } from 'lucide-react';
import type { AgentResponse as AgentResponseType } from '../types';

interface AgentResponseProps {
  response: AgentResponseType;
}

export function AgentResponse({ response }: AgentResponseProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-blue-100">
        <Bot className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1 p-4 rounded-lg bg-blue-50">
        <div className="prose prose-blue max-w-none">
          {response.content}
        </div>
        {response.metadata && (
          <div className="mt-2 text-sm text-blue-600">
            {Object.entries(response.metadata).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="font-medium">{key}:</span>
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-2 text-xs text-blue-400">
          {new Date(response.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}