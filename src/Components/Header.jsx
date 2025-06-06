import React from 'react';
import classes from '../index.module.css';

export default function Header(){
    return (
        <div className={classes.header}>
            {/* <i className="fa-solid fa-robot"></i> */}
            <span className={classes.logo_name}>
                MYGPT
            </span>
        </div>
    );
}