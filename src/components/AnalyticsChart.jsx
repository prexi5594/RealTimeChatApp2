import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AnalyticsChart({ analytics }) {

  const data = [
    { name: "Admins", value: analytics.admins },
    { name: "Users", value: analytics.users },
  ];

  return (
    <div className="bg-white p-4 rounded shadow mb-6">

      <h2 className="text-xl font-bold mb-4">
        User Analytics
      </h2>

      <div style={{ width: "100%", height: 250 }}>

        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value" fill="#0052CC" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}