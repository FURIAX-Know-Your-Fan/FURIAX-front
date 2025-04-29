export interface CommentType {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
    email: string;
    enthusiast_level: string;
    username: string;
  };
  createdAt: Date;
}
