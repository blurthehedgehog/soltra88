import { useContext } from "react";
import { AuthContext } from "../../soltra/src/context/AuthContext";

const useAuth = () => {
  const { token } = useContext(AuthContext);
  const isLoggedIn = !!token;
  return { token, isLoggedIn };
};

export default useAuth; 