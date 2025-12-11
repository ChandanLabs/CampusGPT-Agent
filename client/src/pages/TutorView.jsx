import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import api from '../utils/api';
import clsx from 'clsx';

const TutorView = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am your AI Tutor. Ask me any topic, and I will explain it with examples! 🎓' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // "Explain this topic" flow
            const res = await api.post('/tutor/explain', { topic: userMsg.content });
            const data = res.data; // { explanation, examples, analogy, quiz_question }

            // Construct a rich response text from the structured data for the chat view
            let responseText = `${data.explanation}\n\n**Analogy:** ${data.analogy}\n\n`;

            // We can store structured data in the message object to render custom UI components later
            const aiMsg = {
                role: 'assistant',
                content: responseText,
                structured: data
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I faced an error explaining that.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-9rem)] md:h-[calc(100vh-8rem)] flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">AI Tutor Chat 💬</h1>

            <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col">
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={clsx("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "")}>
                            <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                msg.role === 'user' ? "bg-indigo-600" : "bg-emerald-600"
                            )}>
                                {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                            </div>

                            <div className={clsx(
                                "max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap leading-relaxed",
                                msg.role === 'user' ? "bg-indigo-600/20 text-indigo-100" : "bg-slate-800 text-slate-300"
                            )}>
                                {msg.content}

                                {/* Render Examples if structured data exists */}
                                {msg.structured?.examples && (
                                    <div className="mt-4 pt-4 border-t border-slate-700">
                                        <p className="font-semibold text-emerald-400 text-sm mb-2">Examples:</p>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            {msg.structured.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="bg-slate-800 p-4 rounded-2xl">
                                <Loader2 className="animate-spin w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-800/50 border-t border-slate-700/50">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500"
                            placeholder="Ask about a topic..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorView;
