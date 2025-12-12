// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { loadMovies } from "./dataLoader";
import RatingOverTime from "./components/RatingOverTime";
import GenreMix from "./components/GenreMix";
import BudgetRevenueScatter from "./components/BudgetRevenueScatter";
import TopDirectors from "./components/TopDirectors";
import SummaryStats from "./components/SummaryStats";
import "./index.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreFilter, setGenreFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");

  useEffect(() => {
    loadMovies()
      .then((rows) => {
        setMovies(rows);
      })
      .finally(() => setLoading(false));
  }, []);

  const allGenres = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => (m.genre_array || []).forEach((g) => set.add(g)));
    return ["All", ...Array.from(set).sort()];
  }, [movies]);

  const allLanguages = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => {
      if (m.original_language) set.add(String(m.original_language).toUpperCase());
    });
    return ["All", ...Array.from(set).sort()];
  }, [movies]);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      if (
        genreFilter !== "All" &&
        !(m.genre_array || []).includes(genreFilter)
      ) {
        return false;
      }
      if (
        languageFilter !== "All" &&
        String(m.original_language || "").toUpperCase() !== languageFilter
      ) {
        return false;
      }
      return true;
    });
  }, [movies, genreFilter, languageFilter]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">Netflix Movie Signals</h1>
          <p className="app-subtitle">
            Exploring how genre, language, budget and ratings interact across
            thousands of films.
          </p>
        </div>
        <div className="app-badge">DATA STORY</div>
      </header>

      <main className="app-main">
        <aside className="filters-panel">
          <div className="filters-title">Filters</div>

          {loading && <div className="panel-body-empty">Loading…</div>}

          {!loading && (
            <>
              <label className="filter-label">Genre</label>
              <select
                className="filter-select"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              >
                {allGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              <label className="filter-label">Original language</label>
              <select
                className="filter-select"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                {allLanguages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>

              <div className="filters-note">
                Filters apply to all charts, so you can drill into specific
                slices of the catalogue (e.g. French dramas vs global action).
              </div>

              <SummaryStats movies={filtered} />
            </>
          )}
        </aside>

        <section className="charts-grid">
          {loading ? (
            <div className="panel-body-empty">Loading movies…</div>
          ) : (
            <>
              <RatingOverTime movies={filtered} />
              <GenreMix movies={filtered} />
              <BudgetRevenueScatter movies={filtered} />
              <TopDirectors movies={filtered} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
