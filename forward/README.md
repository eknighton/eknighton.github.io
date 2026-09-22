# Search the Movement v32

Changes in this version:

- Organization filters use AND logic, including multiple selections inside the same section.
- Specific Page Lists use OR logic: an organization qualifies when it has a page from any selected list, and matching pages from those lists are included in the results.
- The address bar remains on the clean page URL while selections change.
- Copy Share Link creates a state-carrying URL without navigating the current page to it.
- Opening a share link restores its selections and then removes the shared state from the address bar.
- The View Spreadsheet link is hidden.

Deployment files:

- `main.html`
- `app.js`
- `styles.css`
