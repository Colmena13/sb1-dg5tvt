import { useState } from 'react';
import type { Message } from '../types';

export function useMessages(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addMessage = (content: string, role: Message['role']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateResponse = (content: string) => {
    setTimeout(() => {
      addMessage(content, 'assistant');
    }, 1000);
  };

  return {
    messages,
    addMessage,
    simulateResponse,
  };
}