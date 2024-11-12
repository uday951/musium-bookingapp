import React from 'react';
import styles from './components.module.css';

const ChatbotPage = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h3>ASTHRA-THE CHATBOT</h3>
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className={styles.dataRow}>
            DATA
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Buttons */}
        <div className={styles.topButtons}>
          <button className={styles.topButton}>Show Tickets</button>
          <button className={styles.topButton}>Book Tickets</button>
          <button className={styles.topButton}>SIGN IN</button>
        </div>

        {/* Chatbot Display */}
        <div className={styles.chatbotDisplay}>
          <div className={styles.chatbot}>
            <img
              src="/chatbot.png" // Ensure this is correctly located in the public folder
              alt="Chatbot"
              className={styles.chatbotImage}
            />
            <div className={styles.chatBubble}>
              <p>Chat message text here</p>
            </div>
          </div>

          {/* Chat Input Box */}
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Type your message here!"
              className={styles.inputField}
            />
            <button className={styles.micButton}>
              <span role="img" aria-label="Microphone">
                🎤
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;
