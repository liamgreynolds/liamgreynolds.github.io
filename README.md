# Liam Reynolds — Portfolio

A standalone static copy of Liam Reynolds' cartography portfolio
(originally built on WordPress). Plain HTML, CSS, and a little
JavaScript — no frameworks, no build step. It works by simply opening
`index.html` in a browser or serving the folder with any static host.

## Structure

```
index.html                  Home — banner, "What I Do", About Me
cartography.html            Cartography and Design project grid
spatial-analysis.html       Spatial Analysis projects
other-work.html             Photography gallery
resume.html                 Resume (web version — no street address)
projects/                   One page per project (10 pages)
  chebeague-island.html     Great Chebeague Island (Shabig) — includes
                            "View Full Map" front-and-back toggle and
                            the print PDF download
  stampede-map.html         Syrup Stampede
  dusky-track.html          The Dusky Track
  buzz-networks.html        Uganda (Buzz Networks)
  hachure-maps.html         Hachure maps series
  casco-bay.html            Casco Bay
  vermont-landslides.html   Vermont Landslides pamphlet (12-page slideshow)
  drive-to-survive.html     Drive to Survive
  detroit-gentrification.html
  flood-risk-analysis.html  In progress — text only
assets/
  css/style.css             The one shared stylesheet
  js/main.js                Lightbox, full-map toggle, slideshow
  img/                      All images (64), downloaded at full resolution
  files/                    Downloads: resume PDF, Chebeague print PDF,
                            Detroit R code PDF and full-piece document
```

All internal links and asset paths are relative, so the site works from
any folder or subpath.

## Publishing on GitHub Pages

1. Create a new repository on GitHub (sign in as Liam). For a personal
   site at `https://<username>.github.io/`, name the repo
   `<username>.github.io`; any other repo name publishes at
   `https://<username>.github.io/<repo-name>/` — either works, since
   every path in the site is relative.
2. Push the **contents of this folder** (not the folder itself) to the
   repo's `main` branch, so `index.html` sits at the repository root.
3. In the repo, go to **Settings → Pages**, set Source to
   "Deploy from a branch", choose `main` and `/ (root)`, and save.
4. GitHub Pages builds and publishes within a minute or two; the Pages
   settings screen shows the live URL.

The empty `.nojekyll` file in the root tells GitHub Pages to serve the
files exactly as they are, with no Jekyll processing.

## Updating the site

Edit the HTML files directly — each page is self-contained apart from
the shared stylesheet (`assets/css/style.css`) and script
(`assets/js/main.js`). To add a project: drop the image in
`assets/img/`, copy an existing page in `projects/` as a template, and
add a card linking to it in `cartography.html` (or
`spatial-analysis.html`).

## Note

The WordPress site is untouched and still live; this folder is an
independent copy. Content was taken from the public WordPress pages —
no text was rewritten.
