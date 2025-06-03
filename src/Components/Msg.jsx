import React from 'react';
import classes from '../index.module.css';

export default function Msg() {
    return (<div className={classes.form}>
        <form>
            <input type="text" placeholder="Type a message..." className={classes.input} required />
            <button type="submit" className={classes.sendBtn}>
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    </div>);
}