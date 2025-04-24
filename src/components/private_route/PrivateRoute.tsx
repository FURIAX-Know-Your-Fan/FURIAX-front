import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";
import NavBar from "../navbar/NavBar";
import SideBar from "../sidebar/SideBar";

const PrivateRoute = ({ roles }: { roles: string[] }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Não faz nada enquanto estiver carregando

    if (!user) {
      navigate("/login");
      return;
    }

    if (!roles.includes(user.role)) {
      navigate("/unauthorized");
    }
  }, [user, loading, navigate, roles]);

  // Enquanto carrega, renderiza algo vazio ou loading
  if (loading) return null;

  if (!user || !roles.includes(user.role)) return null;

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRoute;
