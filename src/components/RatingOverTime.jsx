// src/charts/RatingOverTime.jsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RatingOverTime({ movies }) {
  // Aggregate average rating per year
  const byYear = new Map();

  movies.forEach((m) => {
    const y = Number(m.release_year);
    if (!y || y < 1950 || y > 2025) return;
    if (!byYear.has(y)) byYear.set(y, { year: y, sum: 0, n: 0 });
    const entry = byYear.get(y);
    entry.sum += m.vote_average;
    entry.n += 1;
  });

  const data = Array.from(byYear.values())
    .map((d) => ({
      year: d.year,
      rating: d.sum / d.n,
    }))
    .sort((a, b) => a.year - b.year);

  if (data.length === 0) {
    return <div className="panel-body-empty">No rating data for selection.</div>;
  }

  return (
    <div className="panel">
      <div className="panel-title">Rating Trend Over Time</div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid stroke="#233047" strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            stroke="#9fb3d9"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            dataKey="rating"
            stroke="#9fb3d9"
            domain={[0, 10]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b1220",
              border: "1px solid #243b5e",
            }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#ffb92e"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="panel-caption">
        Average audience rating by release year for the current selection.
      </div>
    </div>
  );
}
