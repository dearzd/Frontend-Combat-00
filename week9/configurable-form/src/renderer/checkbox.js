import React from 'react';
import CheckboxMaterial from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function Checkbox(props) {
  const { config, data = false } = props;
  const { id, label } = config;

  // const [checked, setChecked] = React.useState(data);

  const handleChange = (event) => {
    // setChecked(event.target.checked);
  };

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={<CheckboxMaterial checked={data} onChange={handleChange} id={id} name={id} />}
        label={label}
      />
    </FormControl>
  );
}

export default Checkbox;
