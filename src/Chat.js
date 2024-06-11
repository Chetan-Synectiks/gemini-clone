import React, { useState, useRef, useEffect } from "react";
import { ClearOutlined } from "@ant-design/icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Chat.css';

const API_KEY = "add your api key here ";
const genAI = new GoogleGenerativeAI(API_KEY);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedPrompts = [
    "Fill the missing letters",
    "Is this an English word or not?",
    "Synonyms for this word",
    "Explain me about any topic."
  ];

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
    ]);

    setLoading(true);

    // Generate bot response
    const response = await generateResponse(message);

    setLoading(false);

    // Add bot response to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, isUser: false },
    ]);

    setInput('');
  };

  const generateResponse = async (message) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const resultText = await result.response.text();
    return formatText(resultText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(input);
      e.target.value = '';
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    inputRef.current.focus();
  };

  const formatText = (text) => {
    return text
      .replace(/## (.+)/g, '<h2>$1</h2>') // Headers
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/(?:\r\n|\r|\n){2}/g, '<p></p>') // Paragraph breaks
      .replace(/(?:\r\n|\r|\n)/g, '<br/>') // Line breaks
      .replace(/\* (.+)/g, '<li>$1</li>'); // List items
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
      {messages.length === 0 && (
        <>
          <div className="message-welcome-message">
            Hey buddy! 
            </div>
           <div className="message-welcome-message1">
            How can I help you today?
         </div>
         </>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        ))}
        {loading && (
          <div className="message bot-message loading-dots">
            Bot is typing
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="predefined-prompts">
        {predefinedPrompts.map((prompt, index) => (
          <button
            key={index}
            className="prompt-button"
            onClick={() => handlePromptClick(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
      <input
      ref={inputRef} // Assign the ref to the input element
        type="text"
        className="message-input"
        placeholder="Enter a prompt here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div onClick={refreshPage} className="refresh" >
       <ClearOutlined style={{ fontSize: "20px" }}  />
       </div>
    </div>
  );
};

export default Chat;
