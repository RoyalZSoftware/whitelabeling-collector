import React from "react";
import { Select as MSelect, MenuItem } from '@mui/material'

export const Select = (props) => {
  return (
    <MSelect
      label={props.label}
      onChange={(e) => {
        
        props.onChange(e.target.value);
      }}
      value={props.value?.id}
    >
      {props.allowEmpty && <MenuItem selected value=""></MenuItem>}
      {props.options.map((c) =>
        typeof c === "string" ? (
          <MenuItem value={c}>{c}</MenuItem>
        ) : (
          <MenuItem value={c.value}>{c.label}</MenuItem>
        )
      )}
    </MSelect>
  );
};
