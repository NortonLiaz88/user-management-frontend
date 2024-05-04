export interface UserMetricsResponse {
    totalUsers: number;
    totalActiveUsers: number;
    totalInactiveUsers: number;
    totalAdminUsers: number;
    totalGuestUsers: number;
    lastUsers: {
      total: number;
      users: string[];
    };
  }
  