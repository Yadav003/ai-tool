import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  avatar?: string;
  type?: "text" | "image";
}

export const MessageBubble = ({ role, content, timestamp, avatar, type = "text" }: MessageBubbleProps) => {
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
          {type === "image" ? (
            <div className="relative">
              <img 
                src={content} 
                alt="Generated image" 
                className="rounded-2xl max-w-full h-auto max-h-96 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage failed to load%3C/text%3E%3C/svg%3E";
                }}
              />
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-2"
                onClick={() => window.open(content, '_blank')}
              >
                Open Full Size
              </Button>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          )}
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
