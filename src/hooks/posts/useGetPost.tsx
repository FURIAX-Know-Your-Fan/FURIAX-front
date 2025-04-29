import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { PostType } from "../../utils/types/PostType";

export const useGetPost = (postId: string) => {
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_post = useCallback(async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.get(`/user/posts/${postId}`);
      setPost(res.data.post);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.message);
    }
  }, [postId]);

  useEffect(() => {
    fetch_post();
  }, [fetch_post]);

  return {
    post,
    loading,
    error,
    refetch: fetch_post,
  };
};
