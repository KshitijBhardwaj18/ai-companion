"use client";

import { useCompletion } from "ai/react"
import { Companion } from "@prisma/client";
import { Message } from "postcss";
import { ChatHeader } from "@/components/chat-header";
import { ChatForm } from "@/components/chat-form";
import { useRouter } from "next/navigation";
import { useState,  FormEvent } from "react";
import { ChatMessages } from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";



interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export const ChatClient = ({companion} : ChatClientProps) => {

  const router = useRouter();
  const [messages,setMessages] = useState<ChatMessageProps>(companion.messages);

  const {input,isLoading, handleInputChange, handleSubmit, setInput,  } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onFinish(prompt, completion){
      const systemMessage = {
        role: "system",
        content: completion,
      };

      setMessages((current) => [...current, systemMessage]);
      setInput("");

      router.refresh();


    }
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage ] );

    handleSubmit(e);
  }

  return(
    <div className="flex flex-col h-full p-4 space-y-2 ">
        <ChatHeader companion={companion} />
        <ChatMessages
          companion = {companion}
          isLoading={isLoading}
          messages={messages}
        
        />

        <ChatForm isLoading={isLoading} input={input} handleInputChange={handleInputChange} onSubmit={onSubmit}/>



    </div>
  )
};
