export interface UserType {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  enthusiast_level: string;
  twitter_account?: string;
  description?: string;
  answered_questions?: boolean;
  interests?: string[];
}
