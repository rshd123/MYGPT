import { useState } from 'react' 
import classes from './index.module.css'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'
import Chatform from './Components/Chatform.jsx'

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
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }
      
      console.log(data);
      // if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      //   addBotMessage(data.candidates[0].content.parts[0].text);
      // }
    } catch (error) {
      console.error("Error in API request:", error);
      addBotMessage("Sorry, I encountered an error. Please try again.");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Header />
        <Body messages={messages} />
        <Chatform onSendMessage={addMessage} onBotMessage={addBotMessage} generateBotResponse={generateBotResponse}/>
      </div>
    </>
  )
}

export default App