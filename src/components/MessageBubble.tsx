import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex items-start gap-3 ${
      isAssistant ? 'flex-row' : 'flex-row-reverse'
    }`}>
      <div className={`p-2 rounded-full ${
        isAssistant ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        {isAssistant ? (
          <Bot className="w-5 h-5 text-blue-600" />
        ) : (
          <User className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div className={`flex-1 p-4 rounded-lg ${
        isAssistant ? 'bg-blue-50 text-blue-900' : 'bg-gray-50 text-gray-900'
      }`}>
        {message.content}
      </div>
    </div>
  );
}