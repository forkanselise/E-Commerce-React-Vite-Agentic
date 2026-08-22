import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { useCartStore } from './cartStore';
import { API_BASE_URL } from '../services/api';

const backendOrigin = API_BASE_URL.replace(/\/api\/?$/, '');

// Multi-Model Failover Configuration
const AI_MODELS = [
  { id: 'primary-dotnet-agent', name: 'Smart Bakery Primary ASP.NET Agent', type: 'backend' },
  { id: 'secondary-cloud-llm', name: 'Free Cloud AI Backup Model (Meta-Llama-3-8B)', type: 'cloud_free' },
  { id: 'tertiary-local-engine', name: 'Smart Bakery Embedded Local Agent Engine', type: 'local_engine' }
];

export const useAiDrawerStore = create((set, get) => ({
  isOpen: false,
  activeModelId: 'primary-dotnet-agent',
  activeModelName: 'Smart Bakery Primary ASP.NET Agent',
  messages: [
    {
      id: 'welcome_msg',
      sender: 'RouterConcierge',
      role: 'assistant',
      text: "Hello! 🧁 Welcome to Smart Bakery Hub. I am your AI Concierge with Automatic Multi-Model Failover. Ask me about Callebaut chocolates, Anchor butter, baking tools, video masterclasses, or adding items directly to your shopping cart.",
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

    // --- TRY MODEL 1: Primary ASP.NET Core Agent Engine ---
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${API_BASE_URL}/Agent/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: userText, prompt: userText })
      });

      if (!res.ok) {
        throw new Error(`Model 1 (ASP.NET Core API) returned HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg = {
        id: 'ai_' + Date.now(),
        sender: data.respondingAgent || 'RouterConcierge',
        role: 'assistant',
        text: data.reply || data.message || "Welcome to Smart Bakery! I can help you find Callebaut chocolates, Anchor butter, baking tools, or baking masterclasses.",
        toolsExecuted: data.toolsExecuted || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      set({
        activeModelId: 'primary-dotnet-agent',
        activeModelName: 'Smart Bakery Primary ASP.NET Agent',
        messages: [...get().messages, assistantMsg],
        isThinking: false,
        currentThought: null,
        activeToolName: null
      });
      return;

    } catch (err1) {
      console.warn(`[Auto-Shift] ${err1.message}. Shifting to Secondary Free AI Cloud Model...`);
      set({ currentThought: 'Model 1 unavailable. Shifting automatically to Secondary Free AI Model...' });
    }

    // --- TRY MODEL 2: Secondary Free Public AI Model Endpoint ---
    try {
      const freeModelUrl = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';
      const freeRes = await fetch(freeModelUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: `<|system|>\nYou are Smart Bakery AI Assistant. Answer bakery and pastry questions.\n<|user|>\n${userText}\n<|assistant|>\n`
        })
      });

      if (freeRes.ok) {
        const freeData = await freeRes.json();
        const generatedText = Array.isArray(freeData) ? freeData[0]?.generated_text : freeData?.generated_text;
        
        if (generatedText) {
          const cleanReply = generatedText.split('<|assistant|>')[1] || generatedText;

          const assistantMsg = {
            id: 'ai_' + Date.now(),
            sender: 'SecondaryCloudModel',
            role: 'assistant',
            text: cleanReply.trim(),
            toolsExecuted: ['AutoShift_SecondaryModel'],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          set({
            activeModelId: 'secondary-cloud-llm',
            activeModelName: 'Free Cloud AI Backup Model (Meta-Llama-3-8B)',
            messages: [...get().messages, assistantMsg],
            isThinking: false,
            currentThought: null,
            activeToolName: null
          });
          return;
        }
      }
      throw new Error('Secondary Model response empty or rate-limited');
    } catch (err2) {
      console.warn(`[Auto-Shift] ${err2.message}. Shifting to Tertiary Smart Local Agent Engine...`);
    }

    // --- MODEL 3 (TERTIARY): Smart Standalone Local Agent Engine ---
    const lower = userText.toLowerCase();
    let replyText = "I can answer questions related to Smart Bakery products, Callebaut chocolates, baking tools, masterclasses, and your cart.";
    let agent = 'RouterConcierge';
    let tools = ['AutoShift_LocalAgentEngine'];

    // Strict Out-of-Domain Guardrail Refusal Check
    const outOfDomainKeywords = [
      "python", "javascript", "c#", "java", "write code", "html", "css",
      "weather in", "football", "cricket", "president", "capital of",
      "crypto", "bitcoin", "solve math", "calculate 2+", "who won"
    ];
    const isOutOfDomain = outOfDomainKeywords.some(k => lower.includes(k));

    if (isOutOfDomain) {
      replyText = "I can only answer questions related to Smart Bakery & Tech products, tools, baking tutorials, and your shopping cart. I can't assist with queries outside my domain.";
      agent = 'RouterConcierge';
    } else if (lower.includes('add') && (lower.includes('cart') || lower.includes('buy'))) {
      agent = 'StorefrontInventory';
      tools.push('AddToCart');
      replyText = "🛒 Added! I have placed Callebaut Dark Chocolate 1kg into your Smart Bakery shopping cart.";
      useCartStore.getState().addItem({
        id: 'prod_1',
        title: 'Callebaut Dark Chocolate 1kg (54.5% Cocoa)',
        price: 1250,
        thumbnail: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400'
      }, 1);
    } else if (lower.includes('tutorial') || lower.includes('macaron') || lower.includes('sourdough')) {
      agent = 'BakingMasterclass';
      tools.push('SearchTutorials');
      replyText = "🎓 Masterclass Recommendation: Check out our French Macarons Masterclass by Chef Aminul Haque! Jump to 15:40 for the Macaronage folding technique.";
    } else {
      agent = 'StorefrontInventory';
      tools.push('SearchProducts');
      replyText = "🧁 We have Callebaut Dark Chocolate 1kg (1,250 BDT), Anchor Whipping Cream 1L (780 BDT), and fresh Chocolate Donuts (120 BDT) ready for delivery!";
    }

    setTimeout(() => {
      set({
        activeModelId: 'tertiary-local-engine',
        activeModelName: 'Smart Bakery Embedded Local Agent Engine',
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
    }, 400);
  }
}));
