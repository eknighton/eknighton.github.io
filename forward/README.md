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


## v10 change — config-defined page lists

`Page Tags Config` now creates page-list options directly.

For example:

| Page Tag | Aliases | Searchable | Label |
| --- | --- | --- | --- |
| Civic Reform | Electoral Reform; Election Reform; Ballot Reform | | Civic Reform |

will display **Civic Reform** even if no page in `Orgs List` is literally tagged
`Civic Reform`.

Selecting it matches pages tagged any of:

- Civic Reform
- Electoral Reform
- Election Reform
- Ballot Reform

Alias tags remain independent page-list options when they appear in the data,
unless their own config row explicitly sets `Searchable = N`.


## v11 change

Updated the Goggle helper text to:

> Use these instructions with Brave Goggles to filter a web search to within the websites of the selected pages.

`Brave Goggles` links to the official Brave Goggles creation page.


## v12
- Spacing-led visual cleanup; section headers remain left-aligned.
- Counts are italic without parentheses.
- Zero-result state marks only the checkbox red.
- Search the Movement resets to the default selection.
- Added View Spreadsheet and Recommend a Website header actions.
- Added Copy List, Copy Share Link, and disabled Use AI placeholder.
- Current selections are encoded in a shareable `?s=` URL.
- Browser back/forward restores selections.


## v13 readability pass

- Zero-result options now show a red `×` inside the checkbox, with no red outline.
- Selectable labels and checkboxes are larger.
- Page-list rows now use the same single-line motif as facets:
  `Homepages 5` rather than `Homepages / 5 pages`.
- Counts remain italic.
- Increased spacing between separate choices while keeping checkbox-to-label spacing tighter.


## v14

- Background intentionally unchanged; a replacement image will be handled later.
- Zero-result `×` is softer and less saturated.
- Regions / Issues / Types now use the same responsive column grid as page lists.
- Tools order is now:
  1. View Selected Pages
  2. Copy List
  3. Copy Share Link
  4. Use AI
  5. Generate Goggle
- Page cards now make a best-effort attempt to load a short text excerpt.
  - Excerpts lazy-load only near the viewport.
  - They use Jina Reader because arbitrary websites generally block direct
    browser-side cross-origin fetches.
  - Failure is silent; the existing preview remains intact.
  - Loaded excerpt text is also included in the local card search.


## v15

- Regions / Issues / Types now use true column-major layout: items read
  top-to-bottom within a column before moving to the next column.
- Facet items are sorted descending alphabetically (`Z → A`).
- The whole width of each facet item is clickable, including whitespace after
  the label/count.
- Tag labels are slightly larger and heavier.
- Column and item spacing is tighter so the available space feels more
  deliberate.
- Specific Page Lists are left unchanged.


## v16

- Removed the bold facet labels from v15.
- `Not Given` is always first in Regions / Issues / Types.
- Remaining facet options sort alphabetically A → Z.
- Facets use a compact responsive grid that fills top-to-bottom within each
  column, then moves to the next column.
- The grid breaks into a controlled number of rows so it stays readable rather
  than creating long newspaper-style columns.
- Whole-item clickability remains.


## v17

- Removed the horizontal scrollbar entirely.
- Removed forced equal-width / column-major facet layout.
- Regions / Issues / Types now wrap naturally into compact rows and columns,
  using the same simpler visual language that already worked well elsewhere.
- Eliminated the large artificial gap between sparse Regions items.
- Specific Page List labels are no longer bold.
- Tag labels remain normal weight.


## v18

- Restored true tag columns.
- Items fill top-to-bottom within a column, then move to the next column.
- `Not Given` remains first.
- No horizontal scrollbar.
- Columns use content width rather than equal fractions, avoiding huge gaps in
  sparse sections such as Regions.
- Column count adapts to available width, up to four columns.
- Specific Page Lists remain normal weight.


## v19

- Removed the arbitrary four-column cap.
- Each facet now measures the real width of its longest item.
- The layout uses as many columns as genuinely fit in the available width.
- Short-label facets such as Regions can therefore use many columns.
- Long-label facets naturally use fewer.
- Items still fill top-to-bottom, then move to the next column.
- No horizontal scrollbar.


## v20

- All selectable sections now use one shared column count:
  - Regions
  - Issues
  - Types
  - Specific Page Lists
- The shared count is calculated once from page width and the widest item.
- Each section fills top-to-bottom within that same number of columns.
- No section independently chooses a different number of columns.
- No horizontal scrolling.


## v21
- `SPECIFIC PAGE LISTS` → `Specific Page Lists`, matching other heading formatting.
- `Region` → `Regionality`.
- `Generate Goggle` → `Copy Goggle`.
- Main `Copy Goggle` copies the current Goggle and opens its detail section.
- Removed the redundant inner `Copy Goggle` button.
- Added disabled `Download our Goggle Search App`.
- Added `Get an API Key` → https://api-dashboard.search.brave.com/register
- `Use AI` now opens an AI options section.
- First AI option: `Find Upcoming Events using ChatGPT Plus`
  → https://chatgpt.com/s/cx_6a8e9b5865fc81918c27a88fd4186887


## v22

- Restyled the `Use AI` panel to mirror the Goggle panel.
- It now uses the same heading + explanatory note + action-row structure.
- The ChatGPT Plus event-finding action remains the first AI option.


## v23
- `Download .goggle` → `Download instructions as file`.
- That download action is now last in the Goggle action row.
- Use AI and Goggle are mutually exclusive accordion panels.
- Clicking an already-open panel button closes it.
- Use AI now uses the same panel class/structure as Goggle.
- ChatGPT AI action uses the same neutral secondary styling as Goggle actions.


## v24

- Use AI description changed to:
  `These tools are designed to work on copied lists of pages.`
- Added:
  `Check for News Updates with ChatGPT Plus`
  → https://chatgpt.com/s/cx_6a8ea01c2ebc8191b3f5efc498aab97d


## v27

- Renamed `Use AI` to `AI Prompts`.
- The two AI actions now copy their full prompt text to the clipboard.
- The ChatGPT shared links are no longer opened.
- Copy confirmation uses the site's existing tool-status message.


## v29

- `AI Prompts` → `Copy AI Prompts`.
- Added `General Purpose Assistant Prompt (ChatGPT Plus)`.
- Pages now support multiple tags on one line:
  `URL; Tag; Tag; Tag`
  - all tags are parsed independently;
  - the page is included when any applicable tag/alias matches;
  - the URL is still deduplicated in selected results.
- Added support for an `Exclude` column in `Orgs List`.
  - rows marked `Y` (also Yes/True/1) are removed before the public dataset is built;
  - excluded rows contribute to no counts, displays, copied lists, previews, or Goggles.
- Expanded disclaimer:
  `Many sites only have their homepage indexed. Some sites are not yet labeled at all.`


## v30

- Hidden the two older AI prompt buttons; only the General Purpose Assistant Prompt remains visible.
- Added `Download a Mac App for using Goggles` linking to TinyGoggles Alpha.
- Changed loaded-status wording from `organizations` to `sites`.
