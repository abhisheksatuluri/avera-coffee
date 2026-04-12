import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_SYSTEM_PROMPT } from '../constants';
import { ChatMessage } from '../types';
import { getWhatsAppLink } from '../utils/whatsapp';

const API_KEY = (process as any).env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

const MODELS_TO_TRY = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

async function callGeminiWithRetry(
  messages: ChatMessage[],
  userText: string
): Promise<string> {
  const chatHistory = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' as const : 'user' as const,
    parts: [{ text: m.content }],
  }));

  for (const modelName of MODELS_TO_TRY) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: GEMINI_SYSTEM_PROMPT,
      });

      const chat = model.startChat({
        history: chatHistory.slice(0, -1),
      });

      const result = await chat.sendMessage(userText);
      return result.response.text();
    } catch (error: any) {
      const isRateLimit = error?.message?.includes('429') || error?.message?.includes('quota');
      if (isRateLimit && modelName !== MODELS_TO_TRY[MODELS_TO_TRY.length - 1]) {
        // Try next model
        continue;
      }

      // For rate limits on last model, wait and retry once
      if (isRateLimit) {
        await new Promise(r => setTimeout(r, 3000));
        try {
          const model = genAI.getGenerativeModel({
            model: MODELS_TO_TRY[0],
            systemInstruction: GEMINI_SYSTEM_PROMPT,
          });
          const chat = model.startChat({ history: chatHistory.slice(0, -1) });
          const result = await chat.sendMessage(userText);
          return result.response.text();
        } catch {
          throw error;
        }
      }
      throw error;
    }
  }
  throw new Error('All models failed');
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setMessages([{
        role: 'assistant',
        content: "Welcome to Avera. I'm your coffee concierge — ask me anything about our blends, brewing tips, or I can help you find your perfect match. What kind of coffee experience are you looking for?",
        timestamp: Date.now(),
      }]);
      setHasGreeted(true);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, hasGreeted]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text, timestamp: Date.now() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callGeminiWithRetry(updatedMessages, text);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm briefly unavailable — our team is just a WhatsApp message away and would love to help you personally!",
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold text-obsidian rounded-full shadow-lg shadow-gold/20 flex items-center justify-center hover:bg-gold/90 hover:scale-110 transition-all duration-300"
            aria-label="Open chat"
          >
            <MessageCircle size={24} strokeWidth={1.5} />
            {!hasGreeted && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber rounded-full animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] max-h-[80vh] bg-espresso border border-white/10 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-espresso/95 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold text-sm">A</span>
                </div>
                <div>
                  <h4 className="text-cream font-serif text-sm font-medium">Avera Concierge</h4>
                  <span className="text-[10px] text-gold uppercase tracking-widest">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={getWhatsAppLink("Hi! I'd like to place an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-dim hover:text-gold transition-colors p-1"
                  title="Chat on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-cream-dim hover:text-cream transition-colors p-1"
                  aria-label="Close chat"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold/15 border border-gold/20 text-cream rounded-2xl rounded-br-sm'
                        : 'bg-white/5 border border-white/10 text-cream-dim rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gold/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gold/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gold/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/5 bg-espresso/95">
              <div className="flex items-center gap-2 bg-obsidian border border-white/10 rounded-full px-4 py-2 focus-within:border-gold/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our coffees..."
                  className="flex-1 bg-transparent text-cream text-sm placeholder-cream-dim/40 outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="text-gold hover:text-gold/80 transition-colors disabled:text-white/20 disabled:cursor-not-allowed p-1"
                  aria-label="Send message"
                >
                  <Send size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
