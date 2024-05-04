/* eslint-disable react-refresh/only-export-components */
import { KpiData } from "../../hooks/user-dashboard";
import ReactECharts from "echarts-for-react";

export interface BaseChartProps {
  label: string;
  value: number;
  color: string;
}

export interface BarChartProps {
  data: BaseChartProps[];
}

export const optionsBarChart = (data: KpiData) => {
  return {
    legend: {
      data: [data.labels],
      bottom: 0,
      icon: "circle",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      containLabel: true,
      bottom: 100,
      top: 30,
    },
    xAxis: {
      type: "category",
      data: data?.labels ?? [],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} users",
      },
      axisPointer: {
        snap: true,
      },
      name: "users",
    },
    series: [
      {
        name: "Ativos",
        type: "bar",
        smooth: true,
        data: data.values,
      },
    ],
  };
};

const BarChart = ({ data }) => {
  return (
    <ReactECharts
      option={data}
      notMerge={true}
      style={{ height: "400px", width: "1000px"}}
    />
  );
};

export default BarChart;
