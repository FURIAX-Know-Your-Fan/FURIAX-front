export interface DashboardResponseType {
  enthusiast_levels: {
    count: number;
    level: string;
  }[];
  growth_rate: {
    _id: string;
    month: number;
    year: number;
    userGrowth: number;
    createdAt: Date;
  }[];
  popular_interests: {
    interest: string;
    count: number;
  }[];
  user_locations: {
    location: string;
    count: number;
  }[];
  total_users: number;
  total_posts: number;
  total_interactions: number;
}
