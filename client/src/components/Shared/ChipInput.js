import { useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import Input from "./Input";

function ChipInput({
  chips,
  handleAddChip,
  handleDeleteChip,
  xsScreen,
  xsWidth,
  ...props
}) {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !errors["technologies"] && input.length) {
      e.preventDefault();
      const newChip = { technology: input, id: uuidv4() };
      handleAddChip(newChip);
      setInput("");
    }
  };

  const handleChange = (e) => {
    if (chips.length >= 5) {
      setErrors({ technologies: "Maximum 5 technologies are allowed" });
      return;
    }
    if (e.target.value.length > 12) {
      setErrors({
        technologies: "Technology name cannot be more than 12 characters long",
      });
      return;
    }

    setInput(e.target.value);
    errors["technologies"] && setErrors({});
  };

  const handleBlur = () => {
    errors["technologies"] && setErrors({});
  };

  return (
    <>
      <Input
        value={input}
        errors={errors}
        onSubmit={(e) => e.stopPropagation()}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...props}
        {...(!errors["technologies"] && {
          helperText: "Maximum 5 technologies",
        })}
      />

      <Box width={xsScreen ? xsWidth : 350}>
        {chips.map((chip) => (
          <Chip
            key={chip.id || chip._id}
            size="small"
            label={chip.technology}
            variant="outlined"
            onDelete={() => handleDeleteChip(chip.id || chip._id)}
            sx={{ mr: 2, mb: 1.5 }}
          />
        ))}
      </Box>
    </>
  );
}

export default memo(ChipInput);
