
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = Boolean(user);

  const login = async ({ username, password }) => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: {
          userName: username,
          password: password,
        },
      });

      const matchedUser = response.data[0];

      if (!matchedUser) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است.");
      }

      setUser(matchedUser);

      return matchedUser;
    } catch (error) {
      if (error.response) {
        throw new Error("خطا در دریافت اطلاعات از سرور.");
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
