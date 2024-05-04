/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "react-query";
import api from "../../../services/api";
import { UserMetricsResponse } from "../../../models/user/user-dashboard";
import { useAuth } from "../../authentication/use-auth";
import { makeBarChart } from "../utils/make-active-users-bar-chart";
import { makePieChart } from "../utils/make-users-permission-pie-chart";
import { optionsBarChart } from "../components/bar";
import { optionsPieChart } from "../components/pie";
import { makeKpi } from "../utils/make-users-kpi";

export interface KpiData {
  labels: string[];
  values: number[];
}

interface UserDashboardContextValue {
  usersData: UserMetricsResponse;
  loading: boolean;
  barChart: KpiData;
  pieChart: KpiData;
  kpiData: KpiData;
  setUsersData: (users: UserMetricsResponse) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserMetricsResponse | undefined, unknown>>;
}

interface UserDashboardProviderProps {
  children: ReactNode;
}

const UserDashboardContext = createContext<
  UserDashboardContextValue | undefined
>(undefined);

export const UserDashboardProvider: React.FC<UserDashboardProviderProps> = ({
  children,
}) => {
  const [usersData, setUsersData] = useState<UserMetricsResponse>(
    {} as UserMetricsResponse
  );
  const [barChart, setBarChart] = useState<any>({
    data: [],
  } as any);

  const [pieChart, setPieChart] = useState<any>({
    data: [],
  } as any);

  const [kpiData, setKpiData] = useState<KpiData>({
    labels: [],
    values: [],
  });

  const { token } = useAuth();

  const loadDashboardData = async () => {
    try {
      const { data } = await api.get<UserMetricsResponse>("/users/metrics");
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar dados do dashboard");
    }
  };

  const handleDashboard = (data: UserMetricsResponse) => {
    setUsersData(data);
    setBarChart(optionsBarChart(makeBarChart(data)));
    setPieChart(optionsPieChart(makePieChart(data)));
    setKpiData(makeKpi(data));
  }

  const { isFetching, isLoading, refetch } = useQuery(
    ["user-dash-page", token],
    () => loadDashboardData(),
    {
      onSuccess(currentData) {
        handleDashboard(currentData);
      },
      enabled: !!token,
    }
  );

  const value: UserDashboardContextValue = {
    usersData,
    barChart,
    pieChart,
    loading: isFetching || isLoading,
    setUsersData,
    refetch,
  };

  return (
    <UserDashboardContext.Provider value={value}>
      {children}
    </UserDashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(UserDashboardContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
