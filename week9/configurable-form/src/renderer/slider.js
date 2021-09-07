import React from 'react';
import SliderMaterial from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

function Slider(props) {
  const { config, data = 0 } = props;
  const { id, label } = config;

  return (
    <>
      <Typography gutterBottom>
        {label}
      </Typography>
      <SliderMaterial id={id} name={id} value={data} style={{ width: '30%' }} />
    </>
  );
}

export default Slider;
