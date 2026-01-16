# 🎬 Netflix Movie Analytics Dashboard

Interactive analytics dashboard exploring how **genre**, **language**, **budget**, and **audience ratings** interact across a large movie catalogue.

🔗 **Live Demo:** https://dancing-pixie-0f86ce.netlify.app/  
📦 **Status:** Active / Deployed

---

## 📌 Overview

This project analyzes movie catalog data and visualizes trends across multiple decades, highlighting:

- Rating behavior over time
- Variation across genres and languages
- Budget vs. revenue relationships
- Top directors by catalog representation

The dashboard supports interactive filtering to allow deeper exploration of catalog slices (e.g., “French thrillers”, “Korean dramas”, etc.).

---

## ✨ Features

- Genre and language filters
- Rating trend visualization (1950–present)
- Budget vs. revenue scatter analysis
- Top genres and top directors
- Summary statistics for the current selection
- Deployed as a static app via Netlify

---

## 🛠 Tech Stack

**Data Processing:** Python, pandas, NumPy  
**Visualization:** Plotly, Matplotlib, Seaborn  
**Frontend/UI:** HTML, CSS, Bootstrap, Plotly.js  
**Deployment:** Netlify

---

## 📁 Dataset

**Source:** *https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata*

Processing steps included:

- Handling missing values (rating, budget, revenue, language)
- Standardizing language & genre fields
- Converting release dates → release years
- Budget/revenue normalization
- Removing duplicates
- Extracting categorical metadata

Processed CSVs live in `data/processed/` if present.

---

## ⚙️ Running Locally

Clone and install:

```bash
git clone https://github.com/<user>/<repo>.git
cd <repo>
pip install -r requirements.txt


## 📊 Key Insights

Some notable patterns from the dataset:

- Average movie rating remains relatively stable over time (~6.0–6.5)
- Drama, Thriller, and Comedy dominate catalog volume
- Budget vs. revenue shows large variance with heavy outliers
- Non-English titles increase significantly after 2010

---

## 🚀 Potential Extensions

- Metadata embeddings for similarity search
- Simple content-based recommendation prototype
- Causal inference (budget → rating relationship)
- NLP on movie overviews for clustering

---

## 👤 Author

**Ishani Bhat**  
Data Science @ University of Washington  
Email: `ishanibhat4@gmail.com`

