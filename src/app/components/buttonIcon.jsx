"use client"; 

import React, { useState } from 'react';
import styles from './components.module.css';
import ChatbotPage from './chatbot';
const BotIcon = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot);
  };

  return (
    <div>
      <button className={styles.botButton} onClick={toggleChatbot}>
        <img
          src="/chatbot.png" // Ensure the icon image is correctly located
          alt="Bot Icon"
          className={styles.botImage}
        />
      </button>
      {showChatbot && (
        <div className={styles.chatbotContainer}>
          {/* Assuming ChatbotPage is imported */}
          <ChatbotPage />
        </div>
      )}
    </div>
  );
};

export default BotIcon;
