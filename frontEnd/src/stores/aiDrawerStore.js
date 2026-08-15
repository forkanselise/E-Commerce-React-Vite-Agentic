import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { useCartStore } from './cartStore';

export const useAiDrawerStore = create((set, get) => ({
  isOpen: false,
  messages: [
    {
      id: 'welcome_msg',
      sender: 'RouterConcierge',
      role: 'assistant',
      text: "Hello! 🥐 I am the Nexus Bakery & Tech concierge. I can assist you with finding artisan baked goods, precision kitchen tools, streaming video masterclasses, or adding items directly to your cart.",
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
      .withUrl('/hubs/agent', {
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
      currentThought: 'Analyzing request and evaluating domain boundaries...'
    });

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (!res.ok) throw new Error('Failed to reach AI Agent');

      const data = await res.json();

      const assistantMsg = {
        id: 'ai_' + Date.now(),
        sender: data.respondingAgent || 'RouterConcierge',
        role: 'assistant',
        text: data.message,
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
      // Local fallback simulation if backend is booting or proxy disconnected
      const lower = userText.toLowerCase();
      let replyText = "I can only answer questions related to Nexus Bakery & Tech products, tools, baking tutorials, and your shopping cart. I can't assist with queries outside my domain.";
      let agent = 'RouterConcierge';
      let tools = [];

      const outOfContextKeywords = ["python", "javascript", "code", "weather", "math", "who is"];
      const isOut = outOfContextKeywords.some(k => lower.includes(k));

      if (!isOut) {
        if (lower.includes('add') && (lower.includes('cart') || lower.includes('buy'))) {
          agent = 'StorefrontInventory';
          tools = ['AddToCart'];
          replyText = "🛒 Done! I have added the item to your shopping cart.";
          // Trigger local cart update
          useCartStore.getState().addItem({
            id: 'mock_item_add',
            title: 'French Pure Butter Croissant (Box of 4)',
            price: 520,
            thumbnail: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'
          }, 1);
        } else if (lower.includes('tutorial') || lower.includes('macaron') || lower.includes('sourdough')) {
          agent = 'BakingMasterclass';
          tools = ['SearchTutorials'];
          replyText = "🎓 Masterclass Recommendation: Check out our French Macarons Masterclass by Chef Aminul Haque! Click on timestamp 15:40 for the Macaronage technique.";
        } else {
          agent = 'StorefrontInventory';
          tools = ['SearchProducts'];
          replyText = "🥐 We have fresh Artisan Sourdough Boules (380 BDT), Pure Butter Croissants (520 BDT), and Titanium Stand Mixers (14,999 BDT) ready for delivery!";
        }
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
      }, 700);
    }
  }
}));
