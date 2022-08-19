import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
const singOut = () => {
  Cookies.remove("reactauth.token");
  <Navigate to="/" replace />;
  window.location.reload();
};

export { singOut };
