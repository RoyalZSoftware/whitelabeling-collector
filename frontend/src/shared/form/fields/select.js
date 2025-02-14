import React from "react";
import { Select as MSelect, MenuItem, FormControl, InputLabel } from '@mui/material'

export const Select = (props) => {
  return (
    <FormControl style={{minWidth: 228}}>
      <InputLabel>{props.label}</InputLabel>
      <MSelect
        label={props.label}
        onChange={(e) => {
          
          props.onChange(e.target.value);
        }}
        value={props.value?.id}
      >
        {props.allowEmpty && <MenuItem selected value="">Select</MenuItem>}
        {props.options.map((c) =>
          typeof c === "string" ? (
            <MenuItem value={c}>{c}</MenuItem>
          ) : (
            <MenuItem value={c.value}>{c.label}</MenuItem>
          )
        )}
      </MSelect>
    </FormControl>
  );
};
