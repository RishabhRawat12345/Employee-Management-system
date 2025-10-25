// Chats.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import axios from "axios";

const Chats = () => {
  const currentUser = 'me'; 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('https://employee-management-system-1nhc.onrender.com/api/messagesget');
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = {
      user: currentUser,
      message: input,
      timestamp: new Date(),
    };
    setInput('');
    try {
      const res = await axios.post('http://localhost:3001/api/messagessend', newMessage);
      setMessages((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [...prev, newMessage]); 
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="px-4 py-2 sm:px-6 sm:py-5">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center">Team Chat</h1>
          <p className="text-sm text-gray-500 text-center mt-1">3 members online</p>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-2 sm:px-6 pb-4 overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col h-full">
          <div className="flex-1 overflow-y-auto w-full">
            <div className="p-4 sm:p-6 space-y-6">
              {messages.map((msg, index) => {
                const isMe = msg.user === currentUser;
                const isLeftSide = index % 2 === 0;
                return (
                  <div 
                    key={index} 
                    className={`flex ${isLeftSide ? 'justify-start' : 'justify-end'} mb-4`}
                  >
                    <div 
                      className={`flex flex-col max-w-[75%] sm:max-w-md ${
                        isLeftSide ? 'items-start' : 'items-end'
                      }`}
                    >
                      <div className={`text-xs font-medium text-gray-600 mb-1 px-2 ${
                        isLeftSide ? 'text-left' : 'text-right'
                      }`}>
                        {msg.user === currentUser ? 'You' : msg.user}
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl relative ${
                          isLeftSide
                            ? 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                            : isMe 
                              ? 'bg-red-500 text-white rounded-br-none'
                              : 'bg-blue-500 text-white rounded-br-none'
                        }`}
                      >
                        <p className="text-sm sm:text-base leading-relaxed">{msg.message}</p>
                        <div className={`absolute top-4 w-0 h-0 ${
                          isLeftSide
                            ? '-left-2 border-r-8 border-t-8 border-b-8 border-t-transparent border-b-transparent border-r-gray-200'
                            : isMe
                              ? '-right-2 border-l-8 border-t-8 border-b-8 border-t-transparent border-b-transparent border-l-red-500'
                              : '-right-2 border-l-8 border-t-8 border-b-8 border-t-transparent border-b-transparent border-l-blue-500'
                        }`}></div>
                      </div>
                      <span className={`text-xs text-gray-500 mt-1 px-2 ${
                        isLeftSide ? 'text-left' : 'text-right'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="flex items-end space-x-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 p-3 sm:p-4 rounded-xl border border-gray-300 hover:border-red-500 focus:border-red-500 focus:outline-none resize-none text-sm sm:text-base transition-all duration-200"
                placeholder="Type your message..."
                rows="1"
                style={{
                  minHeight: '44px',
                  maxHeight: '120px',
                  overflowY: input.split('\n').length > 3 ? 'scroll' : 'hidden',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-3 sm:p-4 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
