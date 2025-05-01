import { useAuth } from "../../context/auth/AuthContext";
import { addToast, Avatar, Divider, Link, Skeleton } from "@heroui/react";
import EnthusiastBadge from "../../components/enthusiast_badge/EnthusiastBadge";
import { FaSteam, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SteamStatsType } from "../../utils/types/SteamStatsType";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { API_URL } from "../../utils/constants";
import { MdGames } from "react-icons/md";
import GameCard from "../../components/game_card/GameCard";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();
  const [steamStats, setSteamStats] = useState<SteamStatsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("user", user);
  console.log("steamStats", steamStats);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const get_steam_stats = async () => {
    if (!user?.steam_account.vanity_url) {
      return;
    }

    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axiosInstance.get(
        `${API_URL}/user/steam/${user?.steam_account.steam_id}`
      );

      setSteamStats(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      addToast({
        title: "Erro",
        description:
          error.response.data.message || "Erro ao buscar dados do Steam",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_steam_stats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex flex-col items-center justify-center min-h-screen gap-5 py-10"
    >
      {/* Perfil */}
      <motion.div
        variants={fadeInUp}
        className="bg-content1 p-4 rounded-lg flex flex-col items-center w-8/12 gap-5"
      >
        <Avatar size="lg" />
        <motion.h1
          variants={fadeInUp}
          className="text-2xl font-bold text-center mt-4"
        >
          {user?.name}
        </motion.h1>
        <motion.div variants={fadeInUp}>
          <EnthusiastBadge enthusiast_level={user?.enthusiast_level} />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center mt-4 gap-1"
        >
          <p className="text-gray-600 text-center mt-2 flex gap-2 items-center">
            <FaTwitter />@{user?.twitter_account || "Sem conta vinculada"}
          </p>
          <p className="text-gray-600 text-center mt-2 flex gap-2 items-center">
            <FaSteam />
            {user?.steam_account.vanity_url || "Sem conta vinculada"}
          </p>
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="text-gray-600 text-center mt-2"
        >
          {user?.description || "Sem descrição"}
        </motion.p>
      </motion.div>

      {/* Steam Stats */}
      {user?.steam_account.vanity_url && (
        <motion.div
          variants={fadeInUp}
          className="bg-content1 p-4 rounded-lg flex flex-col items-center w-8/12 gap-5"
        >
          <div className="flex items-center gap-2">
            <FaSteam />
            <h2 className="font-bold text-xl">Dados Steam</h2>
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            {loading ? (
              <Skeleton className="rounded-full">
                <div className="w-24 h-24 rounded-full bg-default-300" />
              </Skeleton>
            ) : (
              <motion.img
                src={steamStats?.player.avatarfull}
                alt="Avatar"
                className="rounded-full w-24 h-24"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}

            <motion.p variants={fadeInUp} className="font-bold">
              {steamStats?.player.personaname}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                isExternal
                showAnchorIcon
                href={steamStats?.player.profileurl}
                className="font-light"
              >
                {steamStats?.player.profileurl}
              </Link>
            </motion.div>

            <Divider />

            {/* Jogos mais jogados */}
            <motion.div className="w-full" variants={fadeInUp}>
              <div className="flex items-center gap-2">
                <MdGames />
                <h2 className="font-bold text-xl">Jogos mais jogados</h2>
              </div>

              {loading && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                    >
                      <Skeleton className="rounded-xl">
                        <div className="bg-content2 p-2 rounded-xl flex flex-col items-center justify-center gap-2 w-full h-32" />
                      </Skeleton>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && steamStats?.games.length === 0 && (
                <p className="text-gray-600 text-center mt-2">
                  Nenhum jogo encontrado
                </p>
              )}

              {!loading && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {steamStats?.games.map((game, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <GameCard game={game} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;
