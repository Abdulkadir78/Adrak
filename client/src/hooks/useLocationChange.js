import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function useLocationChange(action) {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = history.listen(() => action());
    return () => unsubscribe();
  }, [history, action]);
}

export default useLocationChange;
