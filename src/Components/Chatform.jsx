import React from 'react';
import { useState,useEffect } from 'react';
import classes from '../index.module.css';

export default function Chatform({ onSendMessage, onBotMessage}) {
    const [message, setMessage] = useState('');

    const handleFormSubmit = (e) => {
        try {
            e.preventDefault();
            if (message.trim()) {
                onSendMessage(message);
                setMessage('');
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
    }

    return (<div className={classes.form}>
        <form onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                placeholder="Ask me anything..." 
                className={classes.input} 
                required 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className={classes.sendBtn}>
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    </div>);
}