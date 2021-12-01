import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { styles } from "../../constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function Input({
  type,
  label,
  fullWidth,
  halfMargin,
  register,
  errors = {},
  rules,
  ...props
}) {
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { width } = useWindowDimensions();

  const xsWidth = width - width / 10;

  return (
    <Box
      mb={halfMargin ? 2 : 4}
      justifyContent="center"
      width={xsScreen ? xsWidth : 350}
      sx={{ mx: "auto" }}
    >
      <TextField
        fullWidth={fullWidth}
        type={type}
        label={label}
        variant="outlined"
        color="secondary"
        {...register?.(label, rules)}
        {...props}
        sx={
          ["description", "body"].includes(label) ? { ...styles.scrollbar } : {}
        }
      />

      {errors[label] && (
        <Typography variant="caption" color="error">
          {errors[label].message || errors[label]}
        </Typography>
      )}
    </Box>
  );
}

export default Input;
