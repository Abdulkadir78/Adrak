import { useSelector } from "react-redux";

function useCollabSelector() {
  const collabState = useSelector((state) => state.collaborators);
  return collabState;
}

export default useCollabSelector;
