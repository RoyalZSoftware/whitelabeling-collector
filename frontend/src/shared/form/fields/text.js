import React from 'react';

export const TextInput = ({value, onChange}) => {
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
}

export const TextArea = ({value, onChange}) => {
    return <textarea onChange={(e) => onChange(e.target.value)}>{value}</textarea>
}