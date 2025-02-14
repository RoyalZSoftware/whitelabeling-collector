import React, { useRef } from "react";
import {Snackbar as MSnackbar} from '@mui/material';
import { useState } from "react";

let listener = undefined;

// 100 words per minute
const USE_READ_SPEED = 'READSPEED';

export const SUCCESS = 0;
export const ERROR = 1;

export const pub = (msg, type, duration = USE_READ_SPEED) => {
    if (!listener) {
        console.warn("No Snackbar registered.");
        return;
    }
    if (duration == USE_READ_SPEED) {
        // calculate duration with 100 words per minute + recognize time of 1000ms
        const words = msg.split(' ').length
        const dur = ((words / 150) * 60 * 1000)+ 500;
        listener(msg, type, dur);
    } else
        listener(msg, type, duration);
}

export const Snackbar = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const timeout = useRef(null);
    listener = (msg, type, duration) => {
        setMessage(msg);
        setOpen(true);
        timeout.current && clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            setOpen(false);
        }, duration)
    };

    return <>
    <MSnackbar message={message} open={open} anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
    }} itemType='error'/>
    </>
}