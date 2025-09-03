import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';
import Button from '../components/ui/Button';
import { PaperAirplaneIcon, SparklesIcon } from '../components/ui/Icons';
import { useAuth } from '../contexts/AuthContext';

const CHAT_HISTORY_KEY = 'pqrChatHistory';

const Chatbot: React.FC = () => {
    const { user } = useAuth();
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const systemInstruction = `You are the PQR Bank AI Assistant, a helpful and friendly guide for users of the PQR Bank application. Your primary goal is to help users understand and navigate the app's features.

You are knowledgeable about the following sections of the PQR Bank app:
- **Dashboard:** The main overview page with account summaries, spending charts, and recent transactions.
- **Accounts:** A page listing all of the user's accounts (Checking, Savings, Loan) with detailed balances.
- **Transactions:** A page with a detailed history of all transactions, including search and filter capabilities.
- **Transfer:** A feature for sending money. This is split into three tabs: transferring between the user's own accounts, sending money to another person's account, and withdrawing funds.
- **Settings:** A section where users can manage their Profile, Security (password, 2FA), Notification preferences, and Appearance (light/dark mode, theme colors).

Your responsibilities are:
1.  **Guide Users:** When a user asks how to do something (e.g., "how do I send money?"), explain the steps they need to take within the app (e.g., "You can send money by going to the 'Transfer' page and selecting the 'To Person' tab.").
2.  **Explain Features:** If a user asks what a feature is, provide a clear and concise explanation.
3.  **Be Polite and encouraging:** Always maintain a positive and helpful tone.
4.  **Do NOT give financial advice:** You must never advise users on how to manage their money, which stocks to buy, or whether a purchase is a good idea.
5.  **Do NOT perform actions:** You are a guide. You cannot transfer money, change settings, or perform any actions on behalf of the user. Politely decline any such requests and guide them on how to do it themselves.
6.  **Do NOT access personal data:** You do not have access to the user's account balances, transaction history, or personal information. If they ask about their specific data, explain that you can't see it for their security and privacy.

Start the conversation by greeting the user and asking how you can help them with the PQR Bank app today.`;

    // Load chat history from local storage on initial render
    useEffect(() => {
        const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
        let initialHistory: ChatMessage[] = [];
        if (storedHistory) {
            try {
                initialHistory = JSON.parse(storedHistory);
            } catch (error) {
                console.error("Failed to parse chat history:", error);
            }
        }

        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const chatInstance = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                    history: initialHistory,
                });
                setChat(chatInstance);

                if (initialHistory.length === 0) {
                    setIsLoading(true);
                    const result = await chatInstance.sendMessage({ message: "Hello!" });
                    setMessages([{ role: 'model', parts: [{ text: result.text }] }]);
                    setIsLoading(false);
                } else {
                    setMessages(initialHistory);
                }
            } catch (error) {
                console.error("Failed to initialize Gemini chat:", error);
                setMessages([{ role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting to the AI service right now. Please try again later." }] }]);
            }
        };
        initChat();
    }, []);

    // Save chat history to local storage whenever it changes
    useEffect(() => {
        if (messages.length > 0) {
            try {
                localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
            } catch (error) {
                console.error("Failed to save chat history:", error);
            }
        }
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || !chat || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', parts: [{ text: prompt }] };
        setMessages(prev => [...prev, userMessage]);
        setPrompt('');
        setIsLoading(true);

        try {
            const stream = await chat.sendMessageStream({ message: prompt });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].parts[0].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
             setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if(lastMsg.role === 'model' && lastMsg.parts[0].text === '') {
                   lastMsg.parts[0].text = "I'm sorry, I encountered an error. Could you please try again?";
                   return newMessages;
                }
                return [...prev, { role: 'model', parts: [{ text: "I'm sorry, I encountered an error. Could you please try again?" }] }];
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-11rem)] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                <h1 className="text-xl font-bold">PQR Bank AI Assistant</h1>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                             <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-secondary/20 text-secondary">
                                <SparklesIcon className="w-5 h-5"/>
                             </div>
                        )}
                        <div className={`max-w-lg p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                           <p style={{ whiteSpace: 'pre-wrap' }}>{msg.parts[0].text}</p>
                        </div>
                         {msg.role === 'user' && user && (
                            <img src={user.avatarUrl} alt="Your avatar" className="w-8 h-8 rounded-full flex-shrink-0" />
                        )}
                    </div>
                ))}
                 {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex items-start gap-3 justify-start">
                         <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-secondary/20 text-secondary">
                            <SparklesIcon className="w-5 h-5"/>
                         </div>
                         <div className="max-w-lg p-3 rounded-2xl bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                            <span className="animate-pulse">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask how to use the app..."
                        className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-slate-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !prompt.trim()}>
                        <PaperAirplaneIcon className="h-5 w-5"/>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;