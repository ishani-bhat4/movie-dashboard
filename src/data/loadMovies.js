export async function loadMovies() {
    const file = await fetch("/data/clean_movies.csv");
    const text = await file.text();

    const rows = text.split("\n").map(r => r.split(","));
    const headers = rows[0].map(h => h.trim());

    return rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i]; });

        // Convert numbers
        obj.vote_average = Number(obj.vote_average);
        obj.vote_count = Number(obj.vote_count);
        obj.release_year = Number(obj.release_year);
        obj.runtime = Number(obj.runtime);
        obj.revenue = Number(obj.revenue);
        obj.budget = Number(obj.budget);

        // Parse lists
        obj.genre_list = obj.genre_list ? obj.genre_list.split("|") : [];
        obj.top_cast = obj.top_cast ? obj.top_cast.split("|") : [];

        return obj;
    });
}
