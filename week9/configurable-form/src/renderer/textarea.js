import TextField from '@material-ui/core/TextField';

function TextArea(props) {
  const { config, data = '' } = props;

  const { id, label, rows = 4, variant = 'outlined' } = config;

  return (
    <TextField
      id={id}
      label={label}
      multiline
      rows={rows}
      value={data}
      variant={variant}
    />
  );
}

export default TextArea;
