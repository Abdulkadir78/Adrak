import { useSelector } from "react-redux";

function useUserSelector() {
  const usertate = useSelector((state) => state.user);
  return usertate;
}

export default useUserSelector;
