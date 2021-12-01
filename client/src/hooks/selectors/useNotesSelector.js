import { useSelector } from "react-redux";

function useNotesSelector() {
  const notessState = useSelector((state) => state.notes);
  return notessState;
}

export default useNotesSelector;
