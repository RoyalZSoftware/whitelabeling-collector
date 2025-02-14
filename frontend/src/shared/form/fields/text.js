import React from 'react';
import { TextField } from '@mui/material';

export const TextInput = ({value, onChange, label, error}) => {
    return <TextField error={error} type="text" label={label} value={value} onChange={(e) => onChange(e.target.value)}/>
}

export const TextArea = ({value, onChange, label}) => {
    return <TextField label={label}multiline={true} onChange={(e) => onChange(e.target.value)}>{value}</TextField>
}