import React from 'react';
import { useState,useEffect } from 'react';
import classes from '../index.module.css';

export default function Chatform({ onSendMessage, onBotMessage, generateBotResponse }) {
    const [message, setMessage] = useState('');

    const handleFormSubmit = (e) => {
        try {
            e.preventDefault();
            if (message.trim()) {
                onSendMessage(message);
                setMessage('');
            }

            setTimeout(() => {
                    let botMessage="thinking..."
                    onBotMessage(botMessage);
                    generateBotResponse();
            }, 600);
        } catch (err) {
            console.error("Error sending message:", err);
        }
    }

    return (<div className={classes.form}>
        <form onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                placeholder="Type a message..." 
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