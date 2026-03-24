import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewProps {
  data: {
    name: string;
    value: number; // Changed from 'total' to 'value' to match your usage
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function Overview({ data }: OverviewProps) {
  // Debugging - log the data to console


  // If no data, show a message
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <p className="text-muted-foreground">No category data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Categories</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px] pl-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          ><CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={true}
              axisLine={true}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={true}
              axisLine={true}
            />
            <Tooltip 
              formatter={(value) => [`${value} products`]}
              labelFormatter={(label) => `Category Name: ${label}`}
            />
            <Bar
              dataKey="value" // Changed from 'total' to 'value'
              fill="currentColor"
              className="fill-primary"
              barSize={40} // Adjusted bar size for better visibility
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart> 
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}