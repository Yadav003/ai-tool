import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { MultiActionInput } from "./MultiActionInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "user",
    content: "Can you help me design a modern landing page?",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    role: "assistant",
    content: "Of course! I'd be happy to help you design a modern landing page. Let's start by discussing your goals and target audience. What type of product or service will this landing page be for?",
    timestamp: "10:31 AM",
  },
];

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm processing your request. This is a demo response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="border-b border-border px-6 py-4 bg-card/50">
        <h2 className="text-lg font-semibold">AI Workspace</h2>
        <p className="text-sm text-muted-foreground">Ask anything, create anything</p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6">
        <div className="py-6 space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} {...message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border px-6 py-6 bg-card/30">
        <MultiActionInput
          onSend={handleSend}
          onVoiceStart={() => console.log("Voice recording started")}
          onImageGenerate={() => console.log("Image generation modal")}
          onFileUpload={() => console.log("File upload")}
        />
      </div>
    </div>
  );
};
