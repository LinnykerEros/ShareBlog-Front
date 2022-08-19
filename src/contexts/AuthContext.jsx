import { api } from "../config/axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { singOut } from "../utils/singOut";
import { Navigate } from "react-router-dom";
import parseJwt from "../utils/parseJWT";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  // const navigate = useNavigate();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = Cookies.get("reactauth.token");
    (async () => {
      if (token) {
        setIsLoading(true);
        const id = parseJwt(token).id;

        await api
          .get(`/users/${id}`)
          .then((res) => {
            setUser(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            singOut();
          });
      } else {
        setUser(undefined);
      }
    })();
  }, []);

  const signOutUser = () => {
    setUser(undefined);
    singOut();
  };

  async function signIn({ email, password }) {
    try {
      const res = await api.post("/token", {
        email,
        password,
      });
      const { token } = res.data;

      Cookies.set("reactauth.token", token, {
        expires: 60 * 60 * 24 * 30,
        path: "/",
      });
      // console.log(parseJwt(token).id);
      setUser(parseJwt(token));

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      return <Navigate to="/" replace />;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user, isLoading, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
