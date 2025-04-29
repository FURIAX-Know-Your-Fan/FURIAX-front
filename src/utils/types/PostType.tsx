export interface PostType {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profile_picture: string;
    enthusiast_level: string;
    username: string;
  };
  likes: Array<{
    _id: string;
    name: string;
    email: string;
    profile_picture: string;
  }>;
  likes_count: number;
  comments_count: number;
  createdAt: Date;
  visualizations: number;
}
