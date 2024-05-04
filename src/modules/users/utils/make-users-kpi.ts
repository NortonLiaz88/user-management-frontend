import { UserMetricsResponse } from "../../../models/user/user-dashboard";

export const makeKpi = (data: UserMetricsResponse) => {
  return {
    labels: ["Total de Usuários", "Total de Usuários Ativos", "Total de Usuários Inativos"],
    values: [
      data.totalUsers,
      data.totalActiveUsers,
      data.totalInactiveUsers
    ]
  };
};
