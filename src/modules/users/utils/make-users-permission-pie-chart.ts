import { UserMetricsResponse } from "../../../models/user/user-dashboard";

export const makePieChart = (data: UserMetricsResponse) => {
  return {
    labels: ["Usuários Administradores", "Usuários Convidados"],
    values: [data.totalAdminUsers, data.totalGuestUsers],
  };
};
