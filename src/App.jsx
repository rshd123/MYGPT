import { useState,useEffect } from 'react' 
import classes from './index.module.css'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'
import Chatform from './Components/Chatform.jsx'
import React from 'react'

function App() {
  const [messages, setMessages] = useState([]); 

  const addMessage = (messageText) => {
    const newMessage = {
      text: messageText,
      sender: "user",
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (messageText) => {
    const newMessage = {
      text: messageText,
      sender: "bot",
    };
    setMessages(prev => [...prev, newMessage]);
  };


  const generateBotResponse = async () => {
    try {
      const apiMessages = messages.map(({ sender, text }) => ({
        role: sender === "user" ? "user" : "model",
        parts: [{ text }]
      }));
      // console.log("API Messages:", apiMessages);

      if (apiMessages.length === 0) return; 

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: apiMessages })
      };

      const response = await fetch(import.meta.env.VITE_AI_API, requestOptions);
      const data = await response.json();

      addBotMessage(data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.");
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }
      
      console.log(data);

    } catch (error) {
      console.error("Error in API request:", error);
      addBotMessage("Sorry, I encountered an error. Please try again.");
    }
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      generateBotResponse();
    }
  }, [messages]);

  return (
    <>
      <div className={classes.start}>
        Start a conversation with MYGPT....!
        <button className={classes.startBtn}>
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
      {/* <div className={classes.container}>
        <Header />
        <Body messages={messages} />
        <Chatform onSendMessage={addMessage} onBotMessage={addBotMessage} />
      </div> */}
    </>
  )
}

export default App