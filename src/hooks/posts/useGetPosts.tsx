import { useCallback, useEffect, useState } from "react";
import { PostType } from "../../utils/types/PostType";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { addToast } from "@heroui/react";

export const useGetPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_posts = useCallback(async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.get(`/user/posts`);
      setPosts(res.data.posts);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.message);
      addToast({
        title: "Erro",
        description: err.response.data.message,
        color: "danger",
      });
    }
  }, []);

  useEffect(() => {
    fetch_posts();
  }, [fetch_posts]);

  return {
    posts,
    loading,
    error,
    refetch: fetch_posts,
  };
};
