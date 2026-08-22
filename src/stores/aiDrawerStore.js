import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { useCartStore } from './cartStore';
import { API_BASE_URL } from '../services/api';

const backendOrigin = API_BASE_URL.replace(/\/api\/?$/, '');

export const useAiDrawerStore = create((set, get) => ({
  isOpen: false,
  messages: [
    {
      id: 'welcome_msg',
      sender: 'RouterConcierge',
      role: 'assistant',
      text: "Hello! 🧁 Welcome to Smart Bakery Hub. I am your AI Concierge. I can assist you with finding baking supplies (Callebaut chocolate, Anchor butter), fresh bakery goods, video masterclasses, or adding items directly to your shopping cart.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  isThinking: false,
  currentThought: null,
  activeAgent: 'RouterConcierge',
  activeToolName: null,
  connection: null,

  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  toggleDrawer: () => set({ isOpen: !get().isOpen }),

  initAgentHub: (token) => {
    if (get().connection) return;

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${backendOrigin}/hubs/agent`, {
        accessTokenFactory: () => token || ''
      })
      .withAutomaticReconnect()
      .build();

    hubConnection.on('AgentThinking', (data) => {
      set({ isThinking: true, currentThought: data.thought, activeAgent: data.agentName });
    });

    hubConnection.on('AgentToolCall', (data) => {
      set({ activeToolName: data.toolName, activeAgent: data.agentName });
    });

    hubConnection.on('AgentToolResult', () => {
      set({ activeToolName: null });
    });

    hubConnection.on('AgentDelegation', (data) => {
      set({ activeAgent: data.toAgent });
    });

    hubConnection.on('ClientAction', (data) => {
      if (data.action === 'AddToCart' && data.payload) {
        useCartStore.getState().addItem(data.payload, data.payload.quantity || 1);
      }
    });

    hubConnection.start()
      .then(() => set({ connection: hubConnection }))
      .catch((err) => console.warn('AgentHub fallback:', err.message));
  },

  sendMessage: async (userText) => {
    if (!userText.trim()) return;

    const userMessage = {
      id: 'user_' + Date.now(),
      sender: 'User',
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set({
      messages: [...get().messages, userMessage],
      isThinking: true,
      currentThought: 'Searching Smart Bakery catalog and evaluating query...'
    });

    try {
      const res = await fetch(`${API_BASE_URL}/Agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
      });

      if (!res.ok) throw new Error('Failed to reach AI Agent');

      const data = await res.json();

      const assistantMsg = {
        id: 'ai_' + Date.now(),
        sender: data.respondingAgent || 'RouterConcierge',
        role: 'assistant',
        text: data.reply || data.message,
        toolsExecuted: data.toolsExecuted || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      set({
        messages: [...get().messages, assistantMsg],
        isThinking: false,
        currentThought: null,
        activeToolName: null
      });
    } catch {
      // Local fallback simulation if backend is booting
      const lower = userText.toLowerCase();
      let replyText = "I can answer questions related to Smart Bakery products, Callebaut chocolates, baking tools, masterclasses, and your cart.";
      let agent = 'RouterConcierge';
      let tools = [];

      if (lower.includes('add') && (lower.includes('cart') || lower.includes('buy'))) {
        agent = 'StorefrontInventory';
        tools = ['AddToCart'];
        replyText = "🛒 Added! I have placed the item into your Smart Bakery shopping cart.";
        useCartStore.getState().addItem({
          id: 'prod_1',
          title: 'Callebaut Dark Chocolate 1kg (54.5% Cocoa)',
          price: 1250,
          thumbnail: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400'
        }, 1);
      } else if (lower.includes('tutorial') || lower.includes('macaron') || lower.includes('sourdough')) {
        agent = 'BakingMasterclass';
        tools = ['SearchTutorials'];
        replyText = "🎓 Masterclass Recommendation: Check out our French Macarons Masterclass by Chef Aminul Haque! Jump to 15:40 for the Macaronage folding technique.";
      } else {
        agent = 'StorefrontInventory';
        tools = ['SearchProducts'];
        replyText = "🧁 We have Callebaut Dark Chocolate 1kg (1,250 BDT), Anchor Whipping Cream 1L (780 BDT), and fresh Chocolate Donuts (120 BDT) ready for delivery!";
      }

      setTimeout(() => {
        set({
          messages: [
            ...get().messages,
            {
              id: 'ai_' + Date.now(),
              sender: agent,
              role: 'assistant',
              text: replyText,
              toolsExecuted: tools,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ],
          isThinking: false,
          currentThought: null,
          activeToolName: null
        });
      }, 600);
    }
  }
}));
