import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface MonthlySalesProps {
  data: {
    name: string;
    sales: number;
    orders: number;
  }[];
}

export function MonthlySales({ data }: MonthlySalesProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        barSize={40}
        barGap={0}
        barCategoryGap={10}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={10}
          tickLine={true}
          axisLine={true}
        />
        {/* Left Y-axis for sales (revenue) */}
        <YAxis
          yAxisId="left"
          stroke="#888888"
          fontSize={10}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) =>
            `৳${new Intl.NumberFormat("en-IN").format(value)}`
          }
        />

        {/* Right Y-axis for orders */}
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#888888"
          fontSize={10}
          tickLine={true}
          axisLine={true}
        />

        <Tooltip
          formatter={(value, name) => {
            const formattedValue =
              typeof value === "number"
                ? new Intl.NumberFormat("en-IN").format(value)
                : value;
            if (name === "sales") return [`${formattedValue}৳`, "Revenue"];
            if (name === "orders")
              return [`${formattedValue} orders`, "Orders Count"];
            return [formattedValue, name];
          }}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />

        {/* Revenue bar on left Y-axis */}
        <Bar
          yAxisId="left"
          dataKey="sales"
          name="Revenue"
          fill="#000"
          barSize={40}
        />

        {/* Orders bar on right Y-axis */}
        <Bar
          yAxisId="right"
          dataKey="orders"
          name="Orders"
          fill="#888"
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
