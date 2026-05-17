"use client";

interface Conversation {
  id: number;
  name?: string;
  lastMessage?: string;
  updatedAt?: string;
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: number | null;
  onSelectConversation: (id: number) => void;
}

export default function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ConversationSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Messages
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No conversations yet</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                activeConversationId === conversation.id
                  ? "bg-blue-50 border-blue-100 shadow-sm"
                  : "hover:bg-gray-50 border-transparent"
              } border`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                  activeConversationId === conversation.id ? "bg-blue-600" : "bg-gray-400"
                }`}>
                  {(conversation.name || "C")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-semibold truncate ${
                      activeConversationId === conversation.id ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {conversation.name || `Conversation #${conversation.id}`}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {conversation.lastMessage || "No messages yet"}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
