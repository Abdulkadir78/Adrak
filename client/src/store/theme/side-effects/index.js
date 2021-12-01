import { createAsyncThunk } from "@reduxjs/toolkit";

const toggle = createAsyncThunk("theme/toggle", (isDark) => {
  localStorage.setItem("darkMode", JSON.stringify(isDark));
  return { isDark };
});

export { toggle };
