// src/charts/BudgetRevenueScatter.jsx
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function BudgetRevenueScatter({ movies }) {
  const points = movies
    .filter((m) => m.budget > 0 && m.revenue > 0)
    .map((m) => ({
      title: m.title,
      rating: m.vote_average,
      budgetM: m.budget / 1_000_000,
      revenueM: m.revenue / 1_000_000,
    }));

  // To avoid everything crushed at origin, sometimes it’s worth
  // clipping absurd outliers, but let's keep it simple for now.

  if (points.length === 0) {
    return (
      <div className="panel-body-empty">
        No budget/revenue data for selection.
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-title">Budget vs Revenue</div>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid stroke="#233047" strokeDasharray="3 3" />
          <XAxis
            dataKey="budgetM"
            name="Budget"
            unit="M"
            stroke="#9fb3d9"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            dataKey="revenueM"
            name="Revenue"
            unit="M"
            stroke="#9fb3d9"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#0b1220",
              border: "1px solid #243b5e",
            }}
            formatter={(value, name) =>
              name === "rating"
                ? [value.toFixed(1), "Rating"]
                : [value.toFixed(1), name]
            }
            labelFormatter={(_, p) => (p && p[0] ? p[0].payload.title : "")}
          />
          <Scatter data={points} fill="#38bdf8" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="panel-caption">
        Each dot is a film. Use this to show how hits (top-right) compare to
        costly flops (high budget, low revenue).
      </div>
    </div>
  );
}
