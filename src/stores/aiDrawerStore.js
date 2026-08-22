import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { useCartStore } from './cartStore';
import { API_BASE_URL, INITIAL_PRODUCTS, INITIAL_TUTORIALS } from '../services/api';

const backendOrigin = API_BASE_URL.replace(/\/api\/?$/, '');

export const useAiDrawerStore = create((set, get) => ({
  isOpen: false,
  activeModelId: 'smart-bakery-agent',
  activeModelName: 'Smart Bakery AI Multi-Agent Concierge',
  messages: [
    {
      id: 'welcome_msg',
      sender: 'RouterConcierge',
      role: 'assistant',
      text: "Hello! 🧁 Welcome to Smart Bakery Hub. I am your AI Concierge. Ask me about Callebaut chocolates, Anchor dairy, baking tools, video masterclasses, or adding items directly to your shopping cart.",
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
      currentThought: 'Analyzing query intent and searching Smart Bakery catalog...'
    });

    // Try backend endpoint first
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

      if (res.ok) {
        const data = await res.json();
        if (data && data.message) {
          let responseText = data.message;

          // If backend returns the generic default sentence, dynamically enrich it with matching items
          if (responseText.includes("Here are our top recommended products matching your inquiry")) {
            const matches = INITIAL_PRODUCTS.filter(p => 
              lower.includes(p.title.toLowerCase()) ||
              lower.includes(p.category.toLowerCase()) ||
              p.tags.some(t => lower.includes(t))
            );
            const displayProducts = matches.length > 0 ? matches.slice(0, 3) : INITIAL_PRODUCTS.slice(0, 3);

            responseText = `📦 **Smart Bakery Catalog Matches:**\n\n` +
              displayProducts.map(p => 
                `• **${p.title}**\n` +
                `  🏷️ Price: ৳${p.price.toLocaleString()} BDT | 📦 In Stock: ${p.warehouseStock} units\n` +
                `  📝 ${p.shortDescription}`
              ).join('\n\n') +
              `\n\n💡 *Tip: Ask me to add any of these to your cart!*`;
          }

          const assistantMsg = {
            id: 'ai_' + Date.now(),
            sender: data.respondingAgent || 'RouterConcierge',
            role: 'assistant',
            text: responseText,
            toolsExecuted: data.toolsExecuted || [],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          set({
            messages: [...get().messages, assistantMsg],
            isThinking: false,
            currentThought: null,
            activeToolName: null
          });
          return;
        }
      }
    } catch {
      // Proceed to Dynamic Intelligence Engine
    }

    // --- DYNAMIC AI AGENT INTENT & SEARCH ENGINE ---
    const lower = userText.toLowerCase().trim();
    let replyText = "";
    let agent = 'RouterConcierge';
    let tools = [];

    // 1. Domain Guardrail Check (Refusal for Out-of-Domain topics)
    const outOfDomainKeywords = [
      "python", "javascript", "c#", "java", "write code", "html", "css",
      "weather", "football", "cricket", "president", "capital of",
      "crypto", "bitcoin", "solve math", "calculate", "who won"
    ];
    if (outOfDomainKeywords.some(k => lower.includes(k))) {
      replyText = "I can only answer questions related to Smart Bakery products, tools, baking tutorials, and your shopping cart. I can't assist with queries outside my domain.";
      agent = 'RouterConcierge';
    } 
    // 2. Greetings Intent
    else if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'good morning') {
      replyText = "Hello! 🧁 Welcome to Smart Bakery Hub. I can help you find artisan chocolates, dairy ingredients, baking tools, fresh cakes, or enroll in masterclasses. What are you baking today?";
      agent = 'RouterConcierge';
    }
    // 3. Add to Cart Intent
    else if (lower.includes('add') && (lower.includes('cart') || lower.includes('buy') || lower.includes('bag'))) {
      agent = 'StorefrontInventory';
      tools = ['SearchProducts', 'AddToCart'];

      // Search matching product in catalog
      const matched = INITIAL_PRODUCTS.find(p => 
        lower.includes(p.title.toLowerCase()) || 
        lower.includes(p.category.toLowerCase()) || 
        p.tags.some(t => lower.includes(t))
      ) || INITIAL_PRODUCTS[0];

      useCartStore.getState().addItem({
        id: matched.id,
        title: matched.title,
        price: matched.price,
        thumbnail: matched.images[0]?.url
      }, 1);

      replyText = `🛒 **Added to Cart!**\n\nI have added **${matched.title}** (৳${matched.price.toLocaleString()} BDT) to your shopping cart. You can view your cart or proceed to checkout anytime!`;
    }
    // 4. Masterclass / Tutorial / Recipe Intent
    else if (lower.includes('class') || lower.includes('tutorial') || lower.includes('masterclass') || lower.includes('macaron') || lower.includes('sourdough') || lower.includes('croissant') || lower.includes('technique')) {
      agent = 'BakingMasterclass';
      tools = ['SearchTutorials'];

      const matchedCourses = INITIAL_TUTORIALS.filter(t => 
        lower.includes(t.title.toLowerCase()) ||
        lower.includes(t.category.toLowerCase()) ||
        lower.includes(t.skillLevel.toLowerCase())
      );

      const coursesToList = matchedCourses.length > 0 ? matchedCourses : INITIAL_TUTORIALS.slice(0, 2);

      replyText = `🎓 **Smart Bakery Academy Masterclasses Found:**\n\n` + 
        coursesToList.map(c => 
          `• **${c.title}** (${c.skillLevel})\n` +
          `  👨‍🍳 Instructor: ${c.instructor.name} | ⏱️ Duration: ${c.durationMinutes} mins | ৳${c.price.toLocaleString()} BDT\n` +
          `  📌 Chapters: ${c.chapters.map(ch => `[${ch.timestampDisplay}] ${ch.title}`).join(', ')}`
        ).join('\n\n');
    }
    // 5. Product & Stock Search Intent (Chocolates, Dairy, Tools, Bakery Items)
    else {
      agent = 'StorefrontInventory';
      tools = ['SearchProducts', 'CheckStock'];

      const matches = INITIAL_PRODUCTS.filter(p => 
        lower.includes(p.title.toLowerCase()) ||
        lower.includes(p.category.toLowerCase()) ||
        lower.includes(p.subCategory?.toLowerCase()) ||
        p.tags.some(t => lower.includes(t))
      );

      const displayProducts = matches.length > 0 ? matches.slice(0, 3) : INITIAL_PRODUCTS.slice(0, 3);

      replyText = `📦 **Smart Bakery Inventory Matches:**\n\n` +
        displayProducts.map(p => 
          `• **${p.title}**\n` +
          `  🏷️ Price: ৳${p.price.toLocaleString()} BDT | 📦 In Stock: ${p.warehouseStock} units | SKU: ${p.sku}\n` +
          `  📝 ${p.shortDescription}`
        ).join('\n\n') +
        `\n\n💡 *Tip: Type "Add ${displayProducts[0]?.title.split(' ')[0]} to cart" to purchase directly!*`;
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
    }, 350);
  }
}));
