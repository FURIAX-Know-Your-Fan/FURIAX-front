import { addToast, Avatar, Button, Skeleton, Textarea } from "@heroui/react";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useAuth } from "../../context/auth/AuthContext";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { useGetPosts } from "../../hooks/posts/useGetPosts";
import { FaSignsPost } from "react-icons/fa6";
import { PostType } from "../../utils/types/PostType";
import PostCard from "../../components/post_card/PostCard";

const Home = () => {
  const [content, setContent] = useState<string>("");
  const { user } = useAuth();
  const [loading_create, setLoading] = useState<boolean>(false);
  const { posts, loading, refetch } = useGetPosts();
  console.log(posts);
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
  return (
    <div className="flex flex-col h-screen items-center gap-6 p-7">
      <div className=" justify-center bg-content1 w-[90%] p-4 rounded-lg gap-5">
        <h1 className="mb-2 font-bold text-xl flex items-center gap-2">
          <FaSignsPost />
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
      </div>

      <div className="bg-content1 p-5 w-[90%] rounded-lg h-[46em] flex flex-col">
        <h1 className="font-bold text-xl flex items-center gap-2">
          <FaSignsPost />
          Posts Recentes
        </h1>

        <div className="mt-5 flex-1 w-full overflow-y-auto flex flex-col gap-4">
          {loading && (
            <div className="flex flex-col gap-4">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="flex flex-1 items-center justify-center">
              <h4 className="text-2xl font-bold text-gray-500">
                Nenhum post encontrado
              </h4>
            </div>
          )}

          {!loading &&
            posts.length > 0 &&
            posts.map((post: PostType) => (
              <div key={post._id} className="flex-shrink-0">
                <PostCard post={post} refetch={refetch} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
