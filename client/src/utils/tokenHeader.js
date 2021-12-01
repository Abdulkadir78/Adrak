import axios from "axios";

// Set authorization token to every request
const setTokenHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeTokenHeader = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export { setTokenHeader, removeTokenHeader };
