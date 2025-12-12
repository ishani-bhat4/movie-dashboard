// src/charts/TopDirectors.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function TopDirectors({ movies }) {
  const map = new Map();

  movies.forEach((m) => {
    const name = (m.director || "").trim();
    if (!name) return;
    if (!map.has(name))
      map.set(name, { director: name, sumRating: 0, count: 0 });
    const d = map.get(name);
    d.sumRating += m.vote_average;
    d.count += 1;
  });

  let data = Array.from(map.values())
    // require at least 3 films to be counted
    .filter((d) => d.count >= 3)
    .map((d) => ({
      director: d.director,
      avgRating: d.sumRating / d.count,
      count: d.count,
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 10);

  if (data.length === 0) {
    return (
      <div className="panel-body-empty">
        Not enough directors with multiple films.
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-title">Top Directors (min 3 films)</div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, left: 80, right: 20 }}
        >
          <CartesianGrid stroke="#233047" strokeDasharray="3 3" />
          <XAxis type="number" stroke="#9fb3d9" domain={[0, 10]} />
          <YAxis
            type="category"
            dataKey="director"
            stroke="#9fb3d9"
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b1220",
              border: "1px solid #243b5e",
            }}
            formatter={(value, name, p) =>
              name === "avgRating"
                ? [value.toFixed(2), "Avg rating"]
                : [value, "Films"]
            }
          />
          <Bar dataKey="avgRating" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
      <div className="panel-caption">
        Directors who consistently ship highly rated films stand out here.
      </div>
    </div>
  );
}
