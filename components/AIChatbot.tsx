import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { chatWithAIPharmacist } from '../services/geminiService';

export const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
        { role: 'model', text: "Hello! I'm your AI Pharmacist. Ask me about medicines, side effects, or alternatives." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            // Convert internal message format to Gemini history format
            // Filter out the initial greeting if it's just a UI placeholder, or map it if it's real history.
            // Here we map all previous messages except the very last user message which is sent separately.
            // However, the chatWithAIPharmacist function takes the *entire* history including the new message context if we were using a stateless call,
            // but here we are using a stateful chat session helper.
            // Actually, looking at geminiService, it takes `history` and a new `message`.
            // So we should pass all *previous* messages as history.

            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const response = await chatWithAIPharmacist(history, userMessage);
            setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare size={24} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-teal-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <span className="font-semibold">AI Pharmacist</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-teal-700 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-teal-600 text-white rounded-br-none'
                                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-slate-200">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about medicines..."
                                className="flex-1 px-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
