"use client";

import { Companion } from "@prisma/client";

import { useState,useEffect } from "react";

import { ChatMessage, ChatMessageProps } from "@/components/chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
    const [fakeLoading, setFakeLoading] = useState(message.length === 0 ? true : false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 100)
    }, [])
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />

      


    </div>
  );
};
