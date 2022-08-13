import axios from "../config/axios";
import { createContext, useEffect, useState } from "react";

// import { singOut } from "../utils/singOut";
import { Navigate } from "react-router-dom";
import parseJwt from "../utils/parseJWT";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  // const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [tokken, setTokken] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    (async () => {
      if (tokken) {
        setIsLoading(true);
        const id = parseJwt(tokken).id;

        await axios
          .get(`/users/${id}`)
          .then((res) => {
            setUser(parseJwt(tokken));
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            // singOut();
          });
      } else {
        setUser(undefined);
      }
    })();
  }, [tokken]);

  const signOutUser = () => {
    setIsLoading(false);
    setUser(undefined);
    // singOut();
    return <Navigate to="/" replace />;
  };

  async function signIn({ email, password }) {
    try {
      const res = await axios.post("/token", {
        email,
        password,
      });
      const { token } = res.data;

      // setCookie(undefined, "reactauth.token", token, {
      //   maxAge: 60 * 60 * 24 * 30,
      //   path: "/",
      // });

      setUser(parseJwt(token));
      setTokken(token);
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      return <Navigate to="/" replace />;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user, signOutUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
