
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const pickUser = (data) =>
  data?.user || data?.data?.user || data?.data || data;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(
    () => !!localStorage.getItem("token")
  );

  // Restore user session
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");

        const loggedUser = pickUser(data);

        if (loggedUser?.role !== "admin") {
          throw new Error("Unauthorized");
        }

        setUser(loggedUser);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Save authenticated user
  const login = (loggedUser, newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    setToken(newToken);
    setUser(loggedUser);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
