import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { MENTORS } from './mentors';
import { createChatHistory, sendMessageToMentor } from './chat-service';
import type { ChatHistory, Message, Mentor } from './types';

interface ChatState {
  // Current active chat
  activeChatId: string | null;
  // All chat histories
  chatHistories: Record<string, ChatHistory>;
  // Active mentor
  activeMentor: Mentor | null;
  // Loading state
  isLoading: boolean;
  // Error message
  error: string | null;

  // Actions
  setActiveMentor: (mentor: Mentor) => void;
  startNewChat: (mentor: Mentor) => string;
  sendMessage: (content: string) => Promise<void>;
  selectChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  clearChats: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  activeChatId: null,
  chatHistories: {},
  activeMentor: null,
  isLoading: false,
  error: null,

  setActiveMentor: (mentor) => {
    set({ activeMentor: mentor });
    
    // If there's no active chat for this mentor, start a new one
    const mentorChats = Object.values(get().chatHistories).filter(
      chat => chat.messages.find(msg => msg.role === 'system')?.content.includes(mentor.name)
    );
    
    if (mentorChats.length === 0) {
      get().startNewChat(mentor);
    } else {
      // Select the most recent chat with this mentor
      const mostRecentChat = mentorChats.sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      )[0];
      set({ activeChatId: mostRecentChat.id });
    }
  },

  startNewChat: (mentor) => {
    const chatId = uuidv4();
    const newChat = createChatHistory(mentor);
    
    set((state) => ({
      activeChatId: chatId,
      activeMentor: mentor,
      chatHistories: {
        ...state.chatHistories,
        [chatId]: {
          ...newChat,
          id: chatId,
        },
      },
    }));
    
    return chatId;
  },

  sendMessage: async (content) => {
    const { activeChatId, chatHistories, activeMentor } = get();
    
    if (!activeChatId || !activeMentor) {
      set({ error: 'No active chat or mentor selected' });
      return;
    }
    
    const chatHistory = chatHistories[activeChatId];
    if (!chatHistory) {
      set({ error: 'Chat history not found' });
      return;
    }
    
    // Set loading state
    set({ isLoading: true, error: null });
    
    try {
      const updatedChat = await sendMessageToMentor(content, chatHistory);
      
      // Update chat history
      set((state) => ({
        chatHistories: {
          ...state.chatHistories,
          [activeChatId]: updatedChat,
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  },

  selectChat: (chatId) => {
    const chat = get().chatHistories[chatId];
    if (!chat) {
      set({ error: 'Chat not found' });
      return;
    }
    
    // Find mentor for this chat
    const systemMsg = chat.messages.find(msg => msg.role === 'system');
    let mentor = null;
    
    if (systemMsg) {
      // Extract mentor name from system message
      for (const m of Object.values(MENTORS)) {
        if (systemMsg.content.includes(m.name)) {
          mentor = m;
          break;
        }
      }
    }
    
    set({ 
      activeChatId: chatId, 
      activeMentor: mentor 
    });
  },

  deleteChat: (chatId) => {
    set((state) => {
      const newChatHistories = { ...state.chatHistories };
      delete newChatHistories[chatId];
      
      // If deleting active chat, set active chat to null
      const newState: Partial<ChatState> = {
        chatHistories: newChatHistories,
      };
      
      if (state.activeChatId === chatId) {
        newState.activeChatId = null;
      }
      
      return newState as ChatState;
    });
  },

  clearChats: () => {
    set({
      chatHistories: {},
      activeChatId: null,
    });
  },
})); 