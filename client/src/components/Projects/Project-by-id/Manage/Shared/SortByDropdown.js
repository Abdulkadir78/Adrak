import { useState } from "react";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { taskActions } from "../../../../../store/tasks/tasks-slice";

function SortByDropdown({ taskType, ...props }) {
  const [sortBy, setSortBy] = useState("updatedAtNF");
  const dispatch = useDispatch();

  const actionsMap = {
    updatedAtNF() {
      dispatch(taskActions.sortTasksByDateNewestFirst({ taskType }));
    },
    updatedAtOF() {
      dispatch(taskActions.sortTasksByDateOldestFirst({ taskType }));
    },
    priorityLH() {
      dispatch(taskActions.sortTasksByPriorityLowHigh({ taskType }));
    },
    priorityHL() {
      dispatch(taskActions.sortTasksByPriorityHighLow({ taskType }));
    },
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    actionsMap[value]?.();
  };

  return (
    <>
      <FormControl fullWidth color="secondary" sx={{ mt: 3 }} {...props}>
        <InputLabel id="sortBy">Sort By</InputLabel>

        <Select
          labelId="sortBy"
          label="Sort by"
          value={sortBy}
          onChange={handleChange}
        >
          <MenuItem value="updatedAtNF">Date - Newest first</MenuItem>
          <MenuItem value="updatedAtOF">Date - Oldest first</MenuItem>
          <MenuItem value="priorityLH">Priority - Low to high</MenuItem>
          <MenuItem value="priorityHL">Priority - High to low</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default SortByDropdown;
