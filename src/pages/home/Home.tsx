import {
  addToast,
  Avatar,
  Button,
  Skeleton,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useAuth } from "../../context/auth/AuthContext";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { useGetPosts } from "../../hooks/posts/useGetPosts";
import { FaSignsPost } from "react-icons/fa6";
import { PostType } from "../../utils/types/PostType";
import PostCard from "../../components/post_card/PostCard";
import { MdPostAdd } from "react-icons/md";
import InterestsModal from "../../components/modal/interests_modal/InterestsModal";
import { motion } from "framer-motion";

const Home = () => {
  const [content, setContent] = useState<string>("");
  const { user } = useAuth();
  const [loading_create, setLoading] = useState<boolean>(false);
  const { posts, loading, refetch } = useGetPosts();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim() === "") {
      addToast({
        title: "Atenção",
        description: "Escreva algo para postar",
        color: "warning",
      });
      return;
    }

    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.post("/user/post/", {
        user_id: user?.id,
        content: content,
      });

      addToast({
        title: "Sucesso",
        description: res.data.message,
        color: "success",
      });

      setContent("");
      await refetch();
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

  useEffect(() => {
    if (!user?.answered_questions) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col h-screen items-center gap-6 p-7">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="justify-center bg-content1 w-[90%] p-4 rounded-lg gap-5"
      >
        <h1 className="mb-2 font-bold text-xl flex items-center gap-2">
          <MdPostAdd />
          Criar Post
        </h1>
        <form onSubmit={handleCreatePost} className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Avatar />
            <Textarea
              isDisabled={loading_create}
              onChange={(e) => setContent(e.target.value)}
              placeholder="FURIA?!"
              value={content}
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button isLoading={loading_create} type="submit" color="primary">
              <IoIosSend />
              Postar
            </Button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-content1 p-5 w-[90%] rounded-lg h-[46em] flex flex-col"
      >
        <h1 className="font-bold text-xl flex items-center gap-2">
          <FaSignsPost />
          Posts Recentes
        </h1>

        <div className="mt-5 flex-1 w-full overflow-y-auto flex flex-col gap-4">
          {loading &&
            Array.from({ length: 7 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
              </motion.div>
            ))}

          {!loading && posts.length === 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-1 items-center justify-center"
            >
              <h4 className="text-2xl font-bold text-gray-500">
                Nenhum post encontrado
              </h4>
            </motion.div>
          )}

          {!loading &&
            posts.length > 0 &&
            posts.map((post: PostType, index: number) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex-shrink-0"
              >
                <PostCard post={post} refetch={refetch} />
              </motion.div>
            ))}
        </div>
      </motion.div>

      <InterestsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default Home;
