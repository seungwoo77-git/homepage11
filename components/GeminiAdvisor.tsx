import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { generateAdvice } from '../services/geminiService';
import { UserCategory, ChatMessage } from '../types';

interface GeminiAdvisorProps {
  category: UserCategory;
  systemInstruction: string;
  themeColor: string;
}

const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ category, systemInstruction, themeColor }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear chat when switching categories
  useEffect(() => {
    setMessages([{
      role: 'model',
      text: `안녕하세요! 저는 당신의 AI 멘토입니다. 무엇이든 물어보세요.`,
      timestamp: Date.now()
    }]);
  }, [category]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateAdvice(input, systemInstruction);
      const aiMessage: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col h-[500px] overflow-hidden">
      {/* Header */}
      <div className={`p-4 border-b border-gray-100 flex items-center gap-2 ${themeColor.replace('text-', 'bg-').replace('600', '50')}`}>
        <Sparkles className={`w-5 h-5 ${themeColor}`} />
        <h3 className={`font-semibold ${themeColor}`}>AI 맞춤 상담소</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div
            key={msg.timestamp + idx}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'model' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'
            }`}>
              {msg.role === 'model' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm ml-11">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI가 답변을 생각중입니다...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="고민이나 궁금한 점을 이야기해주세요..."
            className="flex-1 bg-transparent border-none outline-none text-sm py-1"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-2 rounded-full transition-colors ${
              isLoading || !input.trim() 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAdvisor;
