import React from "react";
import classes from "../index.module.css";
export default function Body() {
    return (
        <div className={classes.msgs}>
            <div className={classes.left}>Hi, how are are you ?</div>
            <div className={classes.right}>Hello</div>
        </div>
    );
}