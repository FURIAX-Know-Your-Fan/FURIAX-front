import { FaHome, FaLink, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import furia_logo from "../../assets/furia-logo.png";
import { Avatar, Button, Tooltip } from "@heroui/react";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../../context/auth/AuthContext";
import EnthusiastBadge from "../enthusiast_badge/EnthusiastBadge";
import { IoIosWarning } from "react-icons/io";
import { motion } from "framer-motion";

const SideBar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const fadeScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="h-screen w-64 bg-zinc-900 text-white shadow-lg p-4 flex flex-col"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div
        role="button"
        onClick={() => navigate("/home")}
        className="flex flex-col items-center mb-6 gap-5"
      >
        <motion.img
          src={furia_logo}
          className="h-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.h2
          className="text-xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          FURIAX
        </motion.h2>
      </div>

      <motion.div
        className="flex flex-col gap-4 flex-grow"
        variants={fadeScale}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col justify-center items-center mb-4 gap-5 bg-content2 p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Avatar size="lg" />
          <div className="flex flex-col gap-1 items-center">
            <p className="font-bold">{user?.username}</p>
            {user?.twitter_account ? (
              <p className="font-light text-sm">{user.twitter_account}</p>
            ) : (
              <Tooltip content="Vincule sua conta para ganhar mais pontos!">
                <motion.p
                  className="flex items-center text-xs bg-danger p-1 rounded-full gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <IoIosWarning className="text-sm" />
                  Twitter não vinculado
                </motion.p>
              </Tooltip>
            )}
          </div>
          <EnthusiastBadge enthusiast_level={user?.enthusiast_level} />
        </motion.div>

        {/* Botões com leve animação ao passar e selecionar */}
        {/* {[["/home", "Home", <FaHome />],
      ["/profile", "Perfil", <FaUser />],
      ["/link/accounts", "Vincular contas", <FaLink />]].map(
      ([path, label, icon]) => (
        <motion.div
          key={path}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onPress={() => navigate(path)}
            className={`font-bold w-full ${
              location.pathname === path ? "bg-primary" : ""
            }`}
          >
            {icon}
            {label}
          </Button>
        </motion.div>
      )
    )} */}
        <Button
          onPress={() => navigate("/home")}
          className={`font-bold ${
            location.pathname === "/home" ? "bg-primary" : ""
          }`}
        >
          <FaHome />
          Home
        </Button>

        <Button
          onPress={() => navigate("/profile")}
          className={`font-bold ${
            location.pathname === "/profile" ? "bg-primary" : ""
          }`}
        >
          <FaUser />
          Perfil
        </Button>

        <Button
          onPress={() => navigate("/link/accounts")}
          className={`font-bold flex ${
            location.pathname === "/link/accounts" ? "bg-primary" : ""
          }`}
        >
          <FaLink />
          Vincular contas
        </Button>
      </motion.div>

      <motion.div
        className="mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button onPress={logout} color="danger" className="font-bold w-full">
          <IoLogOut />
          Logout
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SideBar;
