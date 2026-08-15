import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, ShoppingBag, Cpu, ShieldAlert, BookOpen, Layers } from 'lucide-react';
import { useAiDrawerStore } from '../stores/aiDrawerStore';
import { useCartStore } from '../stores/cartStore';

export function AiConciergeDrawer() {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const {
    isOpen,
    closeDrawer,
    messages,
    isThinking,
    currentThought,
    activeAgent,
    activeToolName,
    sendMessage
  } = useAiDrawerStore();

  const { addItem } = useCartStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    const text = inputText;
    setInputText('');
    sendMessage(text);
  };

  const handleQuickPrompt = (prompt) => {
    sendMessage(prompt);
  };

  const getAgentBadge = (agentName) => {
    switch (agentName) {
      case 'StorefrontInventory':
        return { label: 'Storefront Assistant', icon: <Layers size={13} />, color: '#F59E0B' };
      case 'BakingMasterclass':
        return { label: 'Masterclass Instructor', icon: <BookOpen size={13} />, color: '#22D3EE' };
      case 'WarehouseOps':
        return { label: 'Warehouse Admin Ops', icon: <ShieldAlert size={13} />, color: '#FB7185' };
      default:
        return { label: 'Concierge Router', icon: <Sparkles size={13} />, color: '#A855F7' };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      zIndex: 60,
      display: 'flex',
      justifyContent: 'flex-end'
    }} onClick={closeDrawer}>
      
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)'
            }}>
              <Bot size={20} color="#111" />
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>Nexus AI Concierge</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <span className="pulse-dot"></span>
                <span>Active: <strong>{activeAgent}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Real-Time Thinking & Tool Execution Indicator */}
        {isThinking && (
          <div style={{
            padding: '10px 20px',
            background: 'rgba(245, 158, 11, 0.1)',
            borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            color: 'var(--color-amber-400)'
          }}>
            <Cpu size={15} className="animate-spin" />
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700 }}>{activeAgent}: </span>
              <span>{currentThought || 'Processing query...'}</span>
            </div>
            {activeToolName && (
              <span className="badge badge-amber" style={{ fontSize: '10px' }}>
                Tool: {activeToolName}
              </span>
            )}
          </div>
        )}

        {/* Message Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {messages.map(msg => {
            const isUser = msg.role === 'user';
            const badge = getAgentBadge(msg.sender);

            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start'
                }}
              >
                {/* Agent Badge Header */}
                {!isUser && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '11px', color: badge.color, fontWeight: 700 }}>
                    {badge.icon}
                    <span>{badge.label}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>• {msg.timestamp}</span>
                  </div>
                )}

                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: isUser
                      ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                      : 'var(--bg-surface-elevated)',
                    color: isUser ? '#111' : 'var(--text-primary)',
                    border: isUser ? 'none' : '1px solid var(--glass-border)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {msg.text}

                  {/* Executed Tools Chip */}
                  {msg.toolsExecuted && msg.toolsExecuted.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                      {msg.toolsExecuted.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(34, 211, 238, 0.15)', color: '#22D3EE', border: '1px solid rgba(34, 211, 238, 0.3)' }}>
                          ⚡ {t} Executed
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div style={{ padding: '10px 16px', display: 'flex', gap: '8px', overflowX: 'auto', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
          <button
            onClick={() => handleQuickPrompt('Add Artisan Sourdough Boule to my cart')}
            style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '9999px', fontSize: '11px', color: 'var(--color-amber-400)', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            🛒 Add Sourdough to Cart
          </button>

          <button
            onClick={() => handleQuickPrompt('How do I master macaron folding technique?')}
            style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '9999px', fontSize: '11px', color: '#22D3EE', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            🎓 Macaron Technique
          </button>

          <button
            onClick={() => handleQuickPrompt('Write a python script to parse json')}
            style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '9999px', fontSize: '11px', color: '#FB7185', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            🛡️ Test Out-Of-Domain Refusal
          </button>
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Ask about products, masterclasses, or add to cart..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isThinking}
            style={{
              flex: 1,
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="btn btn-primary btn-icon"
            style={{ borderRadius: '10px', width: '42px', height: '42px' }}
          >
            <Send size={16} />
          </button>
        </form>

      </div>

    </div>
  );
}
