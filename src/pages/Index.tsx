import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatArea } from "@/components/chat/ChatArea";
import { ImageGenerationModal } from "@/components/modals/ImageGenerationModal";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />
      
      <div className="flex">
        <AppSidebar />
        
        <div className="flex-1 flex h-[calc(100vh-3.5rem)]">
          {/* Conversation List - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:flex">
            <ConversationList
              selectedId={selectedConversation}
              onSelect={setSelectedConversation}
            />
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
