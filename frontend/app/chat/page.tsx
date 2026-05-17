"use client";

import {
    useEffect,
    useState,
} from "react";

import ConversationSidebar
    from "@/components/ConversationSidebar";

import MessageList
    from "@/components/MessageList";

import ChatInput
    from "@/components/ChatInput";

import { apiFetch }
    from "@/lib/api";

import { useChatStore } from "@/stores/chatStore";

export default function ChatPage() {
    const [
        conversations,
        setConversations,
    ] = useState<any[]>([]);

    const activeConversationId = useChatStore(
        (state) => state.activeConversationId
    );

    const setActiveConversation = useChatStore(
        (state) => state.setActiveConversation
    );

    const [messages, setMessages] =
        useState<any[]>([]);

    useEffect(() => {
        async function loadConversations() {
            const response =
                await apiFetch(
                    "/conversations?userId=1"
                );

            const data =
                await response.json();

            setConversations(data);
        }

        loadConversations();
    }, []);

    async function loadMessages(
        conversationId: number
    ) {
        const response =
            await apiFetch(
                `/conversations?userId=1`
            );

        const data =
            await response.json();

        const conversation =
            data.find(
                (c: any) =>
                    c.id === conversationId
            );

        setMessages(
            conversation?.messages || []
        );
    }

    async function handleSelectConversation(
        id: number
    ) {
        setActiveConversation(id);

        await loadMessages(id);
    }

    async function handleSendMessage(
        content: string
    ) {
        if (!activeConversationId)
            return;

        await apiFetch("/messages", {
            method: "POST",
            body: JSON.stringify({
                conversationId:
                    activeConversationId,
                content,
            }),
        });

        await loadMessages(
            activeConversationId
        );
    }

    return (
        <main className="h-screen flex">
            {/* Sidebar */}
            <div className="w-[300px] border-r p-4">
                <ConversationSidebar
                    conversations={
                        conversations
                    }
                    activeConversationId={
                        activeConversationId
                    }
                    onSelectConversation={
                        handleSelectConversation
                    }
                />
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
                <MessageList
                    messages={messages}
                />

                <ChatInput
                    onSendMessage={
                        handleSendMessage
                    }
                />
            </div>
        </main>
    );
}