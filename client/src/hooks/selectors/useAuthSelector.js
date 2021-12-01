import { useSelector } from "react-redux";

function useAuthSelector() {
  const authState = useSelector((state) => state.auth);
  return authState;
}

export default useAuthSelector;
