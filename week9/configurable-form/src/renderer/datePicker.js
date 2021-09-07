import React from 'react';
import TextField from '@material-ui/core/TextField';

function DatePicker(props) {
  const { config, data } = props;
  const { id, label } = config;

  return (
    <TextField
      id={id}
      label={label}
      type="date"
      value={data}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}

export default DatePicker;
