# Search the Movement — GitHub Pages v7

Static GitHub Pages app backed by the public Google Sheet.

## v7 changes

- Added an **Add an organization** link to the Google Form.
- Removed the public **Site Sections** interface.
- Goggle generation now works from organization homepages:
  - active facets filter organizations;
  - selected page lists determine whether an organization qualifies;
  - if an organization has at least one matching page, its homepage hostname
    is included as a whole-site Goggle rule (`site=hostname`).
- Page browsing still displays only exact/specific pages.
- Everything remains unselected by default except **Homepages**.
- Zero-result tags/page lists remain red.
- Background changed to a subtle Forward-inspired lavender/purple.

## Google Form

The responder link points to:

https://docs.google.com/forms/d/e/1FAIpQLScpz9UVHnB1I3bYEtu4hgvUasfOc3h5uM8jtZtMzyZ5-8sLnQ/viewform?usp=dialog

## Files

- `index.html`
- `app.js`
- `styles.css`

Upload all three to the same GitHub Pages directory.


## v8 change

The public-facing `Configuration behavior` section was removed from the webpage.
Configuration remains supported and documented in the code/README.


## v9 changes

- Removed the public `Configuration behavior` section completely.
- Renamed the Google Form CTA to **Recommend a Website**.
- Moved the CTA into the page hero/header, aligned opposite the title and description
  on desktop and full-width below them on mobile.
