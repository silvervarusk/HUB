# HUB

This repository contains a small static site with a homepage and a Data Visualisation page.

To view locally, open `index.html` in your browser (or serve the folder with a static server).

Files added:
- `index.html` — Homepage with a clickable menu to Data Visualisation.
- `data-visualisation.html` — Page with left navigation and featured walkthrough.
- `assets/style.css` — Styles for layout and navigation.
- `assets/script.js` — Small script for the Back button.

Additional pages and interactive charts added:
- `dashboard.html` — Dashboard with example charts.
- `work-projects.html` — Work Projects placeholder page.
- `excel-projects.html` — Excel Projects placeholder page.
- `sql-projects.html` — SQL Projects placeholder page.
- `examples.html` — focused Chart.js examples.
- `assets/charts.js` — Chart.js initializer for interactive charts.

To run the examples locally (serving is recommended so Chart.js loads reliably):
```powershell
python -m http.server 8000; start http://localhost:8000/index.html
```

The site uses Chart.js via CDN for interactive charts. Edit `assets/charts.js` to change datasets.

Dataset loading
- A sample CSV dataset is included at `assets/data/policy_sample.csv`.
- `assets/charts.js` attempts to fetch that CSV and will use it to populate the Policy charts (line + bar). If the CSV is not available the script falls back to embedded example data.

To try the CSV example, serve the folder and open `data-visualisation.html`:
```powershell
python -m http.server 8000; start http://localhost:8000/data-visualisation.html
```

If you have your own CSV, match the header format used in `policy_sample.csv` (Year,PolicyEvents,Health,Education,Transport,Energy) or modify `assets/charts.js` to map your columns.
