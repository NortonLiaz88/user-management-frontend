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

export const optionsPieChart = (data: KpiData) => {
  return {
    
    legend: {
      data: [data.labels],
      bottom: 0,
      icon: "circle",
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
        type: "pie",
        radius: "50%",
        smooth: true,
        data: data.values.map((value, index) => ({
          value,
          name: data.labels[index],
        })),
      },
    ],
  };
};

const PieChart = ({ data }) => {
  console.log(data);

  return (
    <ReactECharts
      option={data}
      notMerge={true}
      style={{ height: "400px", width: "100%"}}
    />
  );
};

export default PieChart;
