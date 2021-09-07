import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioMaterial from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function Radio(props) {
  const { config, data = {} } = props;
  const { id, label, values = [{ code: '', meaning: 'Radio'}] } = config;

  // const [value, setValue] = React.useState(data.code);

  const handleChange = (event) => {
    // setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup id={id} label={label} value={data.code} onChange={handleChange}>
        {values.map((valueInfo) => {
          return (
            <FormControlLabel
              key={valueInfo.code}
              value={valueInfo.code}
              control={<RadioMaterial />}
              label={valueInfo.meaning}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default Radio;
