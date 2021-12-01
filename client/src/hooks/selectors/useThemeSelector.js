import { useSelector } from "react-redux";

function useThemeSelector() {
  const themeState = useSelector((state) => state.theme);
  return themeState;
}

export default useThemeSelector;
