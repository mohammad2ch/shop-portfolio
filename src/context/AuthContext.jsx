import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// هوک اختصاصی برای دسترسی به اطلاعات احراز هویت
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
      if (!username || !password) {
        throw new Error("نام کاربری و رمز عبور الزامی است.");
      }

      // فعلاً فقط وضعیت کاربر را در فرانت‌اند تنظیم می‌کنیم
      setUser({ username });

      return true;
    } finally {
      setIsLoading(false);
    }
  };

  // خروج از حساب
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