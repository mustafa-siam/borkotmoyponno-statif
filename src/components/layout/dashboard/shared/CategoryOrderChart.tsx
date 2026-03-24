"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  data: any;
};

export const CategoryOrderChart = ({ data }: Props) => {
  const categoryChartData = data?.payload?.categories;
  const overallData = data?.payload?.overall;

  if (categoryChartData && categoryChartData.length > 0) {
    const formatted = categoryChartData.map((item: any) => ({
      name: item.categoryName,
      orders: item.orderCount,
      revenue: item.totalRevenue,
    }));

    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={formatted} barCategoryGap={10} barGap={4}>
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="orders"
            fill="#000"
            name="Order Count"
            barSize={40}
          />
          <Bar
            yAxisId="right"
            dataKey="revenue"
            fill="#555"
            name="Total Revenue"
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  const filtered = [
    {
      name: "Filtered Result",
      orders: overallData?.orderCount || 0,
      revenue: overallData?.totalRevenue || 0,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={filtered} barGap={4} barCategoryGap={20}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#ff7300" name="Order Count" barSize={20} />
        <Bar
          dataKey="revenue"
          fill="#387908"
          name="Total Revenue"
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
