import { FC } from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

export const Input: FC<{
  name: string;
  label?: string;
  type?: string;
  multiline?: boolean;
}> = ({ name, label = "", type = "text", multiline = false }) => {
  const [{ value, onBlur, onChange }, { touched, error }] = useField(name);
  const isErrorShown = touched && !!error;

  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      error={isErrorShown}
      helperText={isErrorShown && error}
      multiline={multiline}
      variant="outlined"
    />
  );
};
