import { api } from "../config/axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { singOut } from "../utils/singOut";
import parseJwt from "../utils/parseJWT";
import { getUserById } from "../service/userService";
import { toast } from "react-toastify";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;

  const fetchUser = async () => {
    const data = await getUserById(user.id);

    return setUser(data);
  };

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

  async function signIn({ email, password }, NavigateForHome) {
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

      return NavigateForHome();
    } catch (err) {
      toast.error(err.response.data.error, { autoClose: 2000 });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        user,
        isLoading,
        signOutUser,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
