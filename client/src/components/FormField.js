import React from 'react';
import {
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const FormField = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  error,
  options,
  fullWidth = true,
  required = false,
  ...props
}) => {
  const handleChange = e => {
    const newValue = type === 'checkbox' ? e.target.checked : e.target.value;
    onChange({ target: { name, value: newValue } });
  };

  if (type === 'select') {
    return (
      <FormControl fullWidth={fullWidth} error={!!error} required={required}>
        <InputLabel>{label}</InputLabel>
        <Select name={name} value={value} label={label} onChange={handleChange} {...props}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }

  if (type === 'checkbox') {
    return (
      <FormControlLabel
        control={<Checkbox name={name} checked={value} onChange={handleChange} {...props} />}
        label={label}
      />
    );
  }

  return (
    <TextField
      type={type}
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      fullWidth={fullWidth}
      required={required}
      {...props}
    />
  );
};

export default FormField;
