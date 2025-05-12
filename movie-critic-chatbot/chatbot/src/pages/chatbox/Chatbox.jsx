import React, { useState } from 'react';
import styles from './chatbox.module.css';
import send from '../../assets/send.png'; // ✅ Fixed incorrect import
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Optional loading state
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleBack = () => {
    navigate('/'); // ✅ Navigate back to the welcome page
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true); // ✅ disable button while waiting

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      console.log("API result:", data); // ✅ Debugging log

      setMessages([...newMessages, { type: 'bot', text: data.reply }]);
    } catch (err) {
      console.error("Chat fetch error:", err); // ✅ Error log
      setMessages([...newMessages, { type: 'bot', text: "⚠️ Failed to get response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <span className={styles.backArrow} onClick={handleBack}>↩</span>
      </div>

      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.type === 'user' ? styles.userMsg : styles.botMsg}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about movies..."
          className={styles.inputBox}
          disabled={loading} // ✅ Prevents input during loading
        />
        <button onClick={handleSend} className={styles.sendButton} disabled={loading}>
          <img src={send} alt='sendbtn'/>
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
