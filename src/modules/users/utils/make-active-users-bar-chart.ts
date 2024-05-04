import { UserMetricsResponse } from "../../../models/user/user-dashboard";
import { KpiData } from "../hooks/user-dashboard";

export const makeBarChart = (data: UserMetricsResponse): KpiData => {
  return {
    labels: ["Usuários ativos", "Usuários inativos"],
    values: [data.totalActiveUsers, data.totalInactiveUsers]
  };
};
