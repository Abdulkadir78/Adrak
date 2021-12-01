import { useDispatch } from "react-redux";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import IconButton from "@mui/material/IconButton";

import { toggle } from "../../../store/theme/side-effects";
import useThemeSelector from "../../../hooks/selectors/useThemeSelector";

function DarkModeSwitch() {
  const { isDark } = useThemeSelector();
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggle(!isDark));
  };

  return (
    <IconButton onClick={toggleTheme}>
      {isDark ? (
        <Brightness2Icon color="inherit" sx={{ fontSize: 25 }} />
      ) : (
        <WbSunnyIcon color="warning" sx={{ fontSize: 25 }} />
      )}
    </IconButton>
  );
}

export default DarkModeSwitch;
