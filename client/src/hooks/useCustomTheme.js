import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { toggle } from "../store/theme/side-effects";
import { colors } from "../constants";
import useThemeSelector from "../hooks/selectors/useThemeSelector";

function useCustomTheme() {
  const dispatch = useDispatch();
  const { isDark } = useThemeSelector();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    // isDark is null at the start because we get it from local storage
    // and it won't be there
    if (prefersDarkMode && isDark === null) dispatch(toggle(prefersDarkMode));
  }, [prefersDarkMode, isDark, dispatch]);

  let theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: isDark ? colors.secondaryWhite : colors.secondary,
      },
      background: {
        default: isDark ? colors.dark : colors.light,
      },
    },
    shape: {
      borderRadius: 0,
    },
  });

  theme = responsiveFontSizes(theme);

  return theme;
}

export default useCustomTheme;
