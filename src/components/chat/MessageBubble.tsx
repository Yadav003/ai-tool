import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  avatar?: string;
}

export const MessageBubble = ({ role, content, timestamp, avatar }: MessageBubbleProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 message-slide-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback
          className={cn(
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={cn("flex flex-col gap-1 max-w-[70%]", isUser && "items-end")}>
        <div
          className={cn(
            "px-4 py-3 rounded-3xl shadow-sm",
            isUser
              ? "bg-bubble-user text-bubble-user-foreground"
              : "bg-bubble-ai text-bubble-ai-foreground border border-border/50"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>

        {/* Timestamp and Actions */}
        <div
          className={cn(
            "flex items-center gap-2 px-2",
            isUser ? "flex-row-reverse" : "flex-row"
          )}
        >
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          
          {!isUser && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                <RefreshCw className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                <Bookmark className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
