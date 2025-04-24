import { FaHome, FaUser } from "react-icons/fa";
import { useLocation } from "react-router";
import furia_logo from "../../assets/furia-logo.png";
import { Avatar, Button, Tooltip } from "@heroui/react";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../../context/auth/AuthContext";
import EnthusiastBadge from "../enthusiast_badge/EnthusiastBadge";
import { IoIosWarning } from "react-icons/io";

const SideBar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="h-screen w-64 bg-zinc-900 text-white shadow-lg p-4 flex flex-col">
      <div className="flex flex-col items-center mb-6 gap-5">
        <img src={furia_logo} className="h-16" />
        <h2 className="text-xl font-bold">FURIAX</h2>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col justify-center items-center mb-4 gap-5 bg-content2 p-4 rounded-xl">
          <Avatar size="lg" />
          <div className="flex flex-col gap-1 items-center">
            <p className="font-bold">{user?.username}</p>
            {user?.twitter_account ? (
              <p className="font-light text-sm">{user.twitter_account}</p>
            ) : (
              <Tooltip content="Vincule sua conta para ganhar mais pontos!">
                <p className="flex items-center text-xs bg-danger p-1 rounded-full gap-1">
                  <IoIosWarning className="text-sm" />
                  Twitter não vinculado
                </p>
              </Tooltip>
            )}
          </div>
          <EnthusiastBadge enthusiast_level={user?.enthusiast_level} />
        </div>

        <Button
          className={`font-bold ${
            location.pathname === "/home" ? "bg-primary" : ""
          }`}
        >
          <FaHome />
          Home
        </Button>

        <Button
          className={`font-bold ${
            location.pathname === "/perfil" ? "bg-primary" : ""
          }`}
        >
          <FaUser />
          Perfil
        </Button>
      </div>

      <div className="mt-auto">
        <Button
          onPress={() => logout()}
          color="danger"
          className="font-bold w-full"
        >
          <IoLogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
