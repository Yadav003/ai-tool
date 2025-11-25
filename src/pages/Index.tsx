import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatArea } from "@/components/chat/ChatArea";
import { ImageGenerationModal } from "@/components/modals/ImageGenerationModal";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showConversations, setShowConversations] = useState(false);

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />
      
      <div className="flex">
        <AppSidebar />
        
        <div className="flex-1 flex h-[calc(100vh-3.5rem)] relative">
          {/* Conversation List - Collapsible sidebar */}
          <div 
            className={cn(
              "absolute lg:relative z-10 h-full transition-all duration-300 ease-in-out",
              showConversations ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0"
            )}
            onMouseEnter={() => setShowConversations(true)}
            onMouseLeave={() => setShowConversations(false)}
          >
            <div className={cn(
              "h-full transition-all duration-300",
              showConversations ? "w-80" : "w-0 lg:w-0"
            )}>
              {showConversations && (
                <ConversationList
                  selectedId={selectedConversation}
                  onSelect={setSelectedConversation}
                />
              )}
            </div>
          </div>
          
          {/* Main Chat Area */}
          <div className="flex-1">
            <ChatArea />
          </div>
        </div>
      </div>

      <ImageGenerationModal open={showImageModal} onOpenChange={setShowImageModal} />
    </div>
  );
};

export default Index;
