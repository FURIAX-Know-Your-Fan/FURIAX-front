import { PostType } from "../../utils/types/PostType";
import { addToast, Avatar, Card, CardBody, CardHeader } from "@heroui/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { useNavigate } from "react-router";

const PostCard = ({
  post,
  refetch,
}: {
  post: PostType;
  refetch: () => void;
}) => {
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

  const handleLikePost = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.post(`/user/posts/like/${post._id}`);

      addToast({
        title: "Sucesso",
        description: res.data.message,
        color: "success",
      });
      await refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      addToast({
        title: "Erro",
        description: error.response.data.message,
        color: "danger",
      });
    }
  };

  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/post/${post._id}`)} className="w-full">
      <Card className="bg-background hover:bg-[#0c0c0c] transition-all duration-300 w-full">
        <CardHeader>
          <div className="flex gap-2">
            <Avatar />
            <div className="flex gap-2 items-center">
              <h2 className="font-extralight text-sm">@{post.user.username}</h2>

              <div
                className={`rounded-full p-1 flex items-center ${
                  levelColors[post.user.enthusiast_level as string]
                }`}
              >
                {levelIcons[post.user.enthusiast_level as string]}{" "}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <p>{post.content}</p>

          <div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleLikePost}
                className="flex gap-2 text-xs items-center text-gray-500"
              >
                <IoIosHeartEmpty /> {post.likes_count} curtidas
              </button>
              <span className="flex gap-2 text-xs text-gray-500">
                <FaRegComment /> {post.comments_count} comentários
              </span>
              <div className="flex gap- ">
                <span className="flex gap-2 text-xs text-gray-500">
                  <BsGraphUp /> {post.visualizations} visualizações
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <span className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </CardBody>
      </Card>
    </button>
  );
};

export default PostCard;
