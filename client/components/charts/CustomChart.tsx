import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { DelhiAccidentPoint } from "@/datas/delhiAccidentData";

type Props = {
  datas: DelhiAccidentPoint[];
};

const barColors = [
  "#991b1b",
  "#b91c1c",
  "#dc2626",
  "#ef4444",
  "#f87171",
  "#fb7185",
  "#f97316",
  "#fb923c",
];

const CustomChart = ({ datas }: Props) => {
  const final = [...datas].sort((a, b) => b.accidents - a.accidents);

  return (
    <ResponsiveContainer width="100%" height={520}>
      <BarChart
        layout="vertical"
        data={final}
        margin={{
          top: 16,
          right: 24,
          left: 80,
          bottom: 16,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="area"
          width={150}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => [`${value}`, "Fatal accidents"]}
        />
        <Legend />
        <Bar
          dataKey="accidents"
          name="Fatal accidents"
          radius={[0, 10, 10, 0]}
          barSize={28}
        >
          {final.map((item, index) => (
            <Cell
              key={item.id}
              fill={barColors[index % barColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
