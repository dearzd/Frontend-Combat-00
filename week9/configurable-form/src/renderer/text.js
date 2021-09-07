import TextField from '@material-ui/core/TextField';

function Text(props) {
  const { config, data = '' } = props;

  const { id, label } = config;

  return (
    <TextField id={id} label={label} value={data} />
  );
}

export default Text;
