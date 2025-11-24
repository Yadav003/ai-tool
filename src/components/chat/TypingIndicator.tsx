import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-4 message-slide-in">
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback className="bg-muted">AI</AvatarFallback>
      </Avatar>
      
      <div className="bg-bubble-ai border border-border/50 px-4 py-3 rounded-3xl shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-primary rounded-full typing-dot" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-primary rounded-full typing-dot" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary rounded-full typing-dot" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};
