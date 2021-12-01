import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function CheckBox({ label, checked, onChange, ...props }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} {...props} />}
      label={label}
    />
  );
}

export default CheckBox;
