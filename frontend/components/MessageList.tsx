"use client";

interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400 italic">
          Select a conversation to start chatting
        </div>
      ) : (
        messages.map((message) => {
          const isMe = message.senderId === 1; // Assuming current user ID is 1
          
          return (
            <div
              key={message.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                  isMe
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div
                  className={`text-[10px] mt-2 opacity-70 ${
                    isMe ? "text-blue-100 text-right" : "text-gray-500"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
