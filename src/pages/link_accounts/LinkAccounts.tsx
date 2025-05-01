import { addToast, Button, Input } from "@heroui/react";
import { useState } from "react";
import { FaLink, FaSteam, FaTwitter } from "react-icons/fa";
import { useAuth } from "../../context/auth/AuthContext";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { motion } from "framer-motion";

const LinkAccounts = () => {
  const { user } = useAuth();

  const [twitterAccount, setTwitterAccount] = useState<string>(
    user?.twitter_account || ""
  );
  const [steamAccount, setSteamAccount] = useState<string>(
    user?.steam_account.vanity_url || ""
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const handleLinkSteam = async () => {
    if (!steamAccount) {
      addToast({
        title: "Erro",
        description: "Por favor, preencha o campo de Steam.",
        color: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/link/steam", {
        steam_account: steamAccount,
      });

      addToast({
        title: "Sucesso",
        description: res.data.message,
        color: "success",
      });
      if (!user) {
        return;
      }
      //
      user.steam_account = {
        vanity_url: steamAccount,
        steam_id: res.data.steam_account.steam_id,
      };
      setSteamAccount(res.data.steam_account.vanity_url);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      addToast({
        title: "Erro",
        description: error.response.data.message,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.div
        variants={fadeInUp}
        className="bg-content1 p-5 rounded-xl w-[50%]"
      >
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-2 mb-4"
        >
          <FaLink />
          <h2 className="font-bold text-xl">Vincular contas</h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <p className="text-sm text-start">
            Vincule sua conta do Twitter e Steam para ganhar mais pontos!
          </p>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2"
            custom={1}
          >
            <Input
              readOnly={user?.twitter_account !== ""}
              label="Twitter (X)"
              startContent={<FaTwitter />}
              value={twitterAccount}
              onChange={(e) => setTwitterAccount(e.target.value)}
            />
            <Button
              disabled={user?.twitter_account !== ""}
              className={user?.twitter_account !== "" ? "bg-gray-500" : ""}
            >
              Vincular
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2"
            custom={2}
          >
            <Input
              readOnly={user?.steam_account.vanity_url !== ""}
              label="Steam (vanity URL)"
              startContent={<FaSteam />}
              value={steamAccount}
              onChange={(e) => setSteamAccount(e.target.value)}
            />
            <Button
              disabled={user?.steam_account.vanity_url !== ""}
              isLoading={loading}
              onPress={handleLinkSteam}
              className={
                user?.steam_account.vanity_url !== "" ? "bg-gray-500" : ""
              }
            >
              Vincular
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LinkAccounts;
