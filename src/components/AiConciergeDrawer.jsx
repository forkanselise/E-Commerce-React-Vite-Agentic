import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, ShieldAlert, BookOpen, Layers, Cpu } from 'lucide-react';
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
        return { label: 'Storefront Assistant', icon: <Layers size={13} />, color: '#e05297' };
      case 'BakingMasterclass':
        return { label: 'Academy Instructor', icon: <BookOpen size={13} />, color: '#d97706' };
      case 'WarehouseOps':
        return { label: 'Warehouse Admin Ops', icon: <ShieldAlert size={13} />, color: '#dc2626' };
      default:
        return { label: 'Smart Concierge Router', icon: <Sparkles size={13} />, color: '#3d2314' };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(61, 35, 20, 0.7)',
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
          background: '#ffffff',
          borderLeft: '1px solid rgba(61, 35, 20, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 35px rgba(61, 35, 20, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(61, 35, 20, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#faf6f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #e05297 0%, #3d2314 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(224, 82, 151, 0.3)'
            }}>
              <Bot size={20} color="#ffffff" />
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#3d2314' }}>Smart Bakery AI Concierge</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6e5849' }}>
                <span className="pulse-dot"></span>
                <span>Active: <strong>{activeAgent}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#3d2314'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Real-Time Thinking & Tool Execution Indicator */}
        {isThinking && (
          <div style={{
            padding: '10px 20px',
            background: '#fdf2f8',
            borderBottom: '1px solid #f472b6',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            color: '#e05297'
          }}>
            <Cpu size={15} className="animate-spin" />
            <div style={{ flex: 1, fontWeight: 600 }}>
              <span style={{ fontWeight: 800 }}>{activeAgent}: </span>
              <span>{currentThought || 'Searching inventory & courses...'}</span>
            </div>
            {activeToolName && (
              <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', background: '#e05297', color: '#ffffff', borderRadius: '4px' }}>
                Tool: {activeToolName}
              </span>
            )}
          </div>
        )}

        {/* Message Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#faf6f0' }}>
          
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
                {!isUser && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '11px', color: badge.color, fontWeight: 800 }}>
                    {badge.icon}
                    <span>{badge.label}</span>
                    <span style={{ color: '#9e8c80', fontWeight: 400 }}>• {msg.timestamp}</span>
                  </div>
                )}

                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: isUser ? '#e05297' : '#ffffff',
                    color: isUser ? '#ffffff' : '#3d2314',
                    border: isUser ? 'none' : '1px solid rgba(61, 35, 20, 0.08)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 8px rgba(61, 35, 20, 0.04)'
                  }}
                >
                  {msg.text}

                  {msg.toolsExecuted && msg.toolsExecuted.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                      {msg.toolsExecuted.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', fontWeight: 700 }}>
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
        <div style={{ padding: '10px 16px', display: 'flex', gap: '8px', overflowX: 'auto', borderTop: '1px solid rgba(61, 35, 20, 0.08)', background: '#ffffff' }}>
          <button
            onClick={() => handleQuickPrompt('Do you have Callebaut dark chocolate in stock?')}
            style={{ padding: '6px 12px', background: '#fdf2f8', border: '1px solid #f472b6', borderRadius: '9999px', fontSize: '11px', color: '#e05297', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            🍫 Check Callebaut Stock
          </button>

          <button
            onClick={() => handleQuickPrompt('Recommend a baking class for beginner cake decorating')}
            style={{ padding: '6px 12px', background: '#faf6f0', border: '1px solid rgba(61, 35, 20, 0.1)', borderRadius: '9999px', fontSize: '11px', color: '#3d2314', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            🎓 Beginner Baking Class
          </button>
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid rgba(61, 35, 20, 0.08)', display: 'flex', gap: '10px', background: '#ffffff' }}>
          <input
            type="text"
            placeholder="Ask about Callebaut, Anchor, baking classes..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isThinking}
            style={{
              flex: 1,
              background: '#faf6f0',
              border: '1px solid rgba(61, 35, 20, 0.15)',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '13px',
              color: '#3d2314',
              outline: 'none'
            }}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="btn btn-rose btn-icon"
            style={{ borderRadius: '10px', width: '42px', height: '42px' }}
          >
            <Send size={16} />
          </button>
        </form>

      </div>

    </div>
  );
}
