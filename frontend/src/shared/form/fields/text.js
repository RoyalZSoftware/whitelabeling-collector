import React from 'react';
import { TextField } from '@mui/material';

export const TextInput = ({value, onChange, label, error, hint}) => {
    return <TextField error={error} type="text" label={label} value={value} onChange={(e) => onChange(e.target.value)} helperText={error || hint}/>
}

export const TextArea = TextInput;