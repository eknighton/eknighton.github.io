# Search the Movement — static GitHub Pages version

A static directory backed by a public Google Sheet.

No Python server, Brave API key, build system, or package installation is required.

## Page text

- Title: **Search the Movement**
- Description: **Find webpages from around the movement.**
- Disclaimer: **Many sites only have their homepage indexed.**

## Default selections

Everything starts unselected **except Homepages**.

That includes:

- Regions: none selected
- Issues: none selected
- Types: none selected
- Page tags: none selected
- Site Sections: none selected
- Homepages: selected

With no facet values selected, that facet does not restrict the results.

## Data sheet

Public Google Sheet ID:

`1b1yxtBRgMwIRZuvyXQPIHN1d7NqYmNcg8xW444sSjw0`

Required tab:

`Orgs List`

Expected columns:

`Website | Regions | Issues | Types | Pages`

Pages are one entry per line:

```text
https://example.org/resources; Resources
https://example.org/events; Events
Not Found; People
```

## Website column

Every Website contributes to two built-in lists:

- **Homepages** — exact pages; shown in the page browser
- **Websites** — whole-site scopes; used for Goggle generation only

## Alias behavior

Aliases expand matching. They do **not** rename or merge tags.

Example Search Config:

```text
Tag | Searchable | Aliases
A   | Y          | B
B   | Y          |
```

The UI still shows both **A** and **B**.

- Selecting A matches organizations tagged A **or B**.
- Selecting B matches organizations tagged B (plus aliases configured on B).
- B disappears only if B itself has `Searchable = N`.

The same rule applies to page tags.

## Search Config

Supported columns:

`Tag | Searchable | Aliases | Label | Category`

Only `Tag` is required.

- `Searchable = N` hides that tag itself.
- `Aliases` expands matching for that tag.
- `Label` optionally changes the displayed label for that tag.
- `Category` optionally limits the config row to one facet, such as `Regions`, `Issues`, or `Types`.

Unconfigured tags remain visible by default.

## Page Tags Config

Recognized tab names:

- `Page Tags Config`
- `Page Tag Config`
- `Page Tags`

Supported columns:

`Page Tag | Searchable | Scope | Aliases | Label`

- `Searchable = N` hides that page tag itself.
- `Aliases` expands matching for that page tag.
- `Label` changes its display label.
- `Scope` defaults to exact.
- Scope values such as `subdomain`, `site`, `directory`, `path`, or `section` make it a Site Section.

Unconfigured page tags default to exact pages.

## Site Sections

Site Sections are **not shown in the page-card browser**.

They are included when generating a Goggle.

- Root site URL -> hostname rule
- URL containing a path -> path-prefix rule

## Rich previews

The static site cannot reliably scrape arbitrary websites' OpenGraph metadata because of browser cross-origin restrictions.

The cards therefore use:

- screenshot thumbnails from `image.thum.io`
- site favicons from Google's favicon service
- the stored URL and spreadsheet tags for labeling/searching

## Publish on GitHub Pages

Upload these three files to the root of your GitHub Pages repository:

- `index.html`
- `styles.css`
- `app.js`

Then commit and push.


## v6 change

Facet tags and page-list options whose current live count is `0` remain visible
and selectable, but are highlighted in red. Counts update with the existing
facet-aware filtering logic.
