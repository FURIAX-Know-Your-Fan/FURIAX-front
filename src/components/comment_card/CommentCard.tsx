import { CommentType } from "../../utils/types/CommentType";
import { Avatar } from "@heroui/react";

const CommentCard = ({ comment }: { comment: CommentType }) => {
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
  return (
    <div className="p-2 bg-content2 rounded-lg">
      <div className="flex  gap-2">
        <Avatar size="sm" />
        <div className="flex items-center gap-2">
          <p>@{comment.user.username}</p>
          <div
            className={`rounded-full p-1 flex items-center ${
              levelColors[comment.user.enthusiast_level as string]
            }`}
          >
            {levelIcons[comment.user.enthusiast_level as string]}{" "}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-light text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          {new Date(comment.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
