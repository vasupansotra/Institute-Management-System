import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../components/style.css';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Institute AI Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('uId') || localStorage.getItem('token');
      const role = localStorage.getItem('role') || 'student';

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/ai/chat`,
        {
          message: inputMessage,
          token: token,
          user_id: user_id,
          role: role
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'ai',
        timestamp: new Date(),
        provider: response.data.provider,
        fallback_used: response.data.fallback_used
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: error.response?.data?.error || 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your Institute AI Assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className='ai-chat-wrapper'>
      <div className='ai-chat-header'>
        <div>
          <h2>Institute AI Assistant</h2>
          <p className='ai-chat-subtitle'>Ask me anything about your institute</p>
        </div>
        <button className='ai-clear-btn' onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className='ai-messages-container'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`ai-message ${message.sender === 'user' ? 'ai-user-message' : 'ai-ai-message'} ${message.isError ? 'ai-error-message' : ''}`}
          >
            <div className='ai-message-content'>
              <p>{message.text}</p>
              <div className='ai-message-meta'>
                <span className='ai-message-time'>{formatTime(message.timestamp)}</span>
                {message.sender === 'ai' && message.provider && (
                  <span className='ai-message-provider'>
                    {message.fallback_used ? '🔄 Grok' : '✨ Gemini'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className='ai-message ai-ai-message'>
            <div className='ai-message-content'>
              <div className='ai-typing-indicator'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className='ai-input-container'>
        <textarea
          ref={textareaRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything... (Press Enter to send, Shift+Enter for new line)"
          rows={3}
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          disabled={!inputMessage.trim() || isLoading}
          className='ai-send-btn'
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIChat;