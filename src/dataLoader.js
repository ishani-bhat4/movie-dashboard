// src/dataLoader.js
import Papa from "papaparse";

/**
 * Try to turn the genre_list field into a clean array of strings.
 */
export function parseGenres(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;

  const str = String(raw).trim();
  if (!str) return [];

  // Try JSON first: '["Action","Drama"]'
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) {
      return parsed
        .map((g) =>
          typeof g === "string"
            ? g
            : typeof g === "object" && g !== null
            ? g.name
            : ""
        )
        .filter(Boolean);
    }
  } catch (e) {
    // ignore
  }

  // Fallback: split on | or ,
  return str
    .split(/[|,]/)
    .map((g) => g.trim())
    .filter(Boolean);
}

/**
 * Load and lightly clean the movies dataset.
 * Returns a Promise<array>.
 */
export function loadMovies() {
  return new Promise((resolve, reject) => {
    Papa.parse("/data/clean_movies.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        let rows = results.data;

        // Basic sanity filtering
        rows = rows.filter(
          (r) =>
            r.title &&
            r.release_year &&
            r.vote_average != null &&
            !Number.isNaN(Number(r.vote_average))
        );

        // Normalise some fields
        const cleaned = rows.map((r) => ({
          ...r,
          vote_average: Number(r.vote_average) || 0,
          vote_count: Number(r.vote_count) || 0,
          budget: Number(r.budget) || 0,
          revenue: Number(r.revenue) || 0,
          runtime: Number(r.runtime) || 0,
          release_year: Number(r.release_year) || null,
          popularity: Number(r.popularity) || 0,
          genre_array: parseGenres(r.genre_list),
        }));

        resolve(cleaned);
      },
      error: (err) => {
        console.error("Papa parse error:", err);
        reject(err);
      },
    });
  });
}
