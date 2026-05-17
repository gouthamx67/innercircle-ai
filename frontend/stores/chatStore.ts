import { create } from "zustand";

type ChatState = {
  activeConversationId: number | null;
  setActiveConversation: (id: number) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  activeConversationId: null,
  setActiveConversation: (id) =>
    set({
      activeConversationId: id,
    }),
}));
