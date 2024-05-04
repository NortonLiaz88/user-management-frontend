import { BaseDashboard } from "../../modules/users/components/dashboard";
import { UserDashboardProvider } from "../../modules/users/hooks/user-dashboard";

export const Dashboard: React.FC = () => {
  return (
    <UserDashboardProvider>
      <BaseDashboard />
    </UserDashboardProvider>
  );
};
