import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { PostType } from "../../utils/types/PostType";
import {
  addToast,
  Avatar,
  Button,
  Divider,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { IoArrowBack } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import { FaComment, FaRegComment } from "react-icons/fa";
import CommentCard from "../../components/comment_card/CommentCard";
import { motion } from "framer-motion";

const PostDetail = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const levelColors: { [key: string]: string } = {
    "Não Medido": "bg-gray-400 text-content3",
    Casual: "bg-yellow-400",
    Engajado: "bg-green-400",
    Hardcore: "bg-red-600",
  };
  const levelIcons: { [key: string]: string } = {
    "Não Medido": "❓",
    Casual: "😌",
    Engajado: "😃",
    Hardcore: "🤩",
  };

  const handleGetPost = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.get(`/user/posts/${post_id}`);
      setPost(res.data.post);
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

  const handleCommentPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() === "") {
      addToast({
        title: "Atenção",
        description: "Escreva algo para comentar",
        color: "warning",
      });
      return;
    }
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.post(
        `/user/post/comment/${post?._id}`,
        {
          content: commentText,
        }
      );

      addToast({
        title: "Sucesso",
        description: res.data.message,
        color: "success",
      });
      setCommentText("");
      await handleGetPost();
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

  const handleLikePost = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.post(
        `/user/posts/like/${post?._id}`
      );

      addToast({
        title: "Sucesso",
        description: res.data.message,
        color: "success",
      });
      await handleGetPost();
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
    handleGetPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_id]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex flex-col gap-2 items-center justify-center p-5"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="flex flex-col gap-6 bg-content1 p-2 rounded-lg w-[90%]"
      >
        {/* Voltar */}
        <motion.div variants={fadeInUp} className="flex items-center gap-2">
          <Button onPress={() => navigate(-1)}>
            <IoArrowBack />
            <h3 className="text-xl font-bold">Post</h3>
          </Button>
        </motion.div>

        {/* Avatar + Info */}
        <motion.div variants={fadeInUp} className="flex gap-2">
          <Avatar size="lg" />
          {loading ? (
            <div className="flex flex-col gap-2">
              <Spinner size="lg" />
            </div>
          ) : (
            <div>
              <div className="flex gap-2 items-center">
                <h3 className="text-xl font-light">@{post?.user.username}</h3>
                <div
                  className={`rounded-full p-1 flex items-center ${
                    levelColors[post?.user.enthusiast_level as string]
                  }`}
                >
                  {levelIcons[post?.user.enthusiast_level as string]}
                </div>
              </div>
              <h3 className="text-sm font-light text-gray-500">
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : ""}
              </h3>
            </div>
          )}
        </motion.div>

        {/* Conteúdo */}
        <motion.div variants={fadeInUp} className="p-2 break-words">
          {loading ? (
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
          ) : (
            <p>{post?.content}</p>
          )}
        </motion.div>

        <Divider />

        {/* Ações */}
        <motion.div variants={fadeInUp}>
          <div className="flex gap-6 mt-2 items-center">
            <button
              onClick={handleLikePost}
              className="flex items-center gap-2 text-md text-gray-500"
            >
              <IoIosHeartEmpty />
              {loading ? <Spinner size="sm" /> : post?.likes_count} curtidas
            </button>
            <div className="flex items-center gap-2 text-md text-gray-500">
              <FaRegComment />
              {loading ? <Spinner size="sm" /> : post?.comments_count}{" "}
              comentários
            </div>
            <div className="flex items-center gap-2 text-md text-gray-500">
              <BsGraphUp />
              {loading ? <Spinner size="sm" /> : post?.visualizations}{" "}
              visualizações
            </div>
          </div>
        </motion.div>

        <Divider />

        {/* Comentar */}
        <motion.div variants={fadeInUp}>
          <form onSubmit={handleCommentPost} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Avatar />
              <Textarea
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
            </div>
            <Button isLoading={loading} type="submit" color="primary">
              <FaComment />
              Comentar
            </Button>
          </form>
        </motion.div>

        <Divider />

        {/* Comentários */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Comentários</h3>
          {loading && (
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
          )}
          {!loading &&
            post?.comments.map((comment, index) => (
              <motion.div
                key={comment._id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <CommentCard comment={comment} />
              </motion.div>
            ))}
          {post?.comments.length === 0 && (
            <motion.div
              variants={fadeInUp}
              className="flex flex-1 justify-center"
            >
              <h4 className="text-xl font-light text-gray-500">
                Nenhum comentário encontrado
              </h4>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PostDetail;
