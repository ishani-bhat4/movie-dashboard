// src/charts/GenreMix.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function GenreMix({ movies }) {
  const genreMap = new Map();

  movies.forEach((m) => {
    (m.genre_array || []).forEach((g) => {
      if (!genreMap.has(g))
        genreMap.set(g, { genre: g, count: 0, sumRating: 0 });
      const entry = genreMap.get(g);
      entry.count += 1;
      entry.sumRating += m.vote_average;
    });
  });

  const data = Array.from(genreMap.values())
    .map((d) => ({
      genre: d.genre,
      count: d.count,
      avgRating: d.sumRating / d.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  if (data.length === 0) {
    return <div className="panel-body-empty">No genre data for selection.</div>;
  }

  return (
    <div className="panel">
      <div className="panel-title">Top Genres (by number of films)</div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ left: -20 }}>
          <CartesianGrid stroke="#233047" strokeDasharray="3 3" />
          <XAxis
            dataKey="genre"
            stroke="#9fb3d9"
            tick={{ fontSize: 11 }}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={70}
          />
          <YAxis stroke="#9fb3d9" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b1220",
              border: "1px solid #243b5e",
            }}
            formatter={(value, name) =>
              name === "count"
                ? [value, "Movies"]
                : [value.toFixed(2), "Avg rating"]
            }
          />
          <Bar dataKey="count" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
      <div className="panel-caption">
        Hover to see average rating within each genre.
      </div>
    </div>
  );
}
