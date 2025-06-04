import React, { useEffect, useRef } from "react";
import classes from "../index.module.css";

export default function Body({ messages }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={classes.msgs}>
            {messages.map((msg, index) => (
                <div 
                    key={index} 
                    className={msg.sender === 'bot' ? classes.left : classes.right}
                >
                    {msg.text}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}