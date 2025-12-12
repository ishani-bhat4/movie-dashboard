// src/components/SummaryStats.jsx
export default function SummaryStats({ movies }) {
    if (!movies || movies.length === 0) return null;

    const avgRating = (movies.reduce((a, b) => a + b.vote_average, 0) / movies.length).toFixed(2);
    const avgBudget = Math.round(movies.reduce((a, b) => a + b.budget, 0) / movies.length);
    const avgRevenue = Math.round(movies.reduce((a, b) => a + b.revenue, 0) / movies.length);

    return (
        <div className="summary-box">
            <h2>Summary Statistics</h2>
            <p><strong>Average Rating:</strong> {avgRating}</p>
            <p><strong>Average Budget:</strong> ${avgBudget.toLocaleString()}</p>
            <p><strong>Average Revenue:</strong> ${avgRevenue.toLocaleString()}</p>
        </div>
    );
}
