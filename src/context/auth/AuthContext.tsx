import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../../pages/loading/Loading";
import { UserType } from "../../utils/types/UserType";
import { addToast } from "@heroui/react";
import { API_URL } from "../../utils/constants";
import axiosInstance from "../../utils/axios/AxiosInstance";

interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);

  const login = async (email: string, password: string) => {
    if (email.trim() === "" || password.trim() === "") {
      addToast({
        title: "Atenção",
        description: "Preencha todos os campos",
        color: "warning",
      });
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axiosInstance.post(
        `${API_URL}/user/auth/login`,
        {
          email,
          password,
        }
      );
      setUser(response.data.user);
      addToast({
        title: "Sucesso",
        description: response.data.message,
        color: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      addToast({
        title: "Erro",
        description: err.response.data.message,
        color: "danger",
      });
    }
  };

  const logout = () => {
    setUser(null);
    axiosInstance.post(`${API_URL}/user/auth/logout`);
    addToast({
      title: "Sucesso",
      description: "Logout realizado com sucesso",
      color: "success",
    });
  };

  useEffect(() => {
    const refresh = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${API_URL}/user/auth/refresh`
        );
        setUser(response.data.user);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
