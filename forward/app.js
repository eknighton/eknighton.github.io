/*
 * Search the Movement
 * Static GitHub Pages app backed by a public Google Sheet.
 *
 * Key behavior:
 * - Regions / Issues / Types are independent facets.
 * - Aliases EXPAND matches; they do not merge or suppress the alias tag.
 * - Page tags work the same way: an alias remains a page-list option unless
 *   that alias tag itself is disabled with Searchable = N.
 * - Everything starts unselected except Homepages.
 * - Site Sections affect Goggle generation but never appear in page cards.
 */

const SHEET_ID = "1b1yxtBRgMwIRZuvyXQPIHN1d7NqYmNcg8xW444sSjw0";
const ORGS_SHEET_NAME = "Orgs List";
const SEARCH_CONFIG_SHEET_NAME = "Search Config";
const PAGE_TAG_CONFIG_SHEET_NAMES = [
  "Page Tags Config",
  "Page Tag Config",
  "Page Tags",
];

const FACET_NAMES = ["Regions", "Issues", "Types"];
const NOT_FOUND_VALUES = new Set([
  "not found",
  "not_found",
  "notfound",
  "n/a - not found",
]);

let data = null;
let gvizCallbackCounter = 0;

const elements = {
  loading: document.querySelector("#loading"),
  error: document.querySelector("#error"),
  controls: document.querySelector("#controls"),
  facets: document.querySelector("#facets"),
  exactLists: document.querySelector("#exactLists"),
  scopeLists: document.querySelector("#scopeLists"),
  selectionSummary: document.querySelector("#selectionSummary"),
  viewPagesButton: document.querySelector("#viewPagesButton"),
  goggleButton: document.querySelector("#goggleButton"),
  gogglePanel: document.querySelector("#gogglePanel"),
  copyGoggleButton: document.querySelector("#copyGoggleButton"),
  downloadGoggleButton: document.querySelector("#downloadGoggleButton"),
  goggleMeta: document.querySelector("#goggleMeta"),
  goggleText: document.querySelector("#goggleText"),
  diagnosticsBox: document.querySelector("#diagnosticsBox"),
  diagnosticsSummary: document.querySelector("#diagnosticsSummary"),
  diagnosticsBody: document.querySelector("#diagnosticsBody"),
  resultsPanel: document.querySelector("#resultsPanel"),
  localFilter: document.querySelector("#localFilter"),
  closeResultsButton: document.querySelector("#closeResultsButton"),
  resultsMeta: document.querySelector("#resultsMeta"),
  resultGrid: document.querySelector("#resultGrid"),
};

// ---------------------------------------------------------------------------
// Google Sheets loading
// ---------------------------------------------------------------------------

function loadSheet(sheetName, required = true) {
  return new Promise((resolve, reject) => {
    const callbackName = `__gviz_callback_${++gvizCallbackCounter}_${Date.now()}`;
    const script = document.createElement("script");
    let finished = false;

    function cleanup() {
      script.remove();
      try {
        delete window[callbackName];
      } catch {
        // No action needed.
      }
    }

    window[callbackName] = (response) => {
      if (finished) return;
      finished = true;

      try {
        if (!response || response.status === "error" || !response.table) {
          cleanup();
          if (required) {
            reject(new Error(`Could not read sheet "${sheetName}".`));
          } else {
            resolve(null);
          }
          return;
        }

        const columnNames = (response.table.cols || []).map((column, index) =>
          String(column.label || column.id || `Column ${index + 1}`).trim(),
        );

        const rows = (response.table.rows || [])
          .map((row) => {
            const record = {};
            columnNames.forEach((columnName, index) => {
              const cell = row.c?.[index];
              record[columnName] = cell?.v == null ? "" : String(cell.v).trim();
            });
            return record;
          })
          .filter((record) => Object.values(record).some(Boolean));

        cleanup();
        resolve(rows);
      } catch (error) {
        cleanup();
        reject(error);
      }
    };

    script.onerror = () => {
      if (finished) return;
      finished = true;
      cleanup();

      if (required) {
        reject(new Error(`Could not load sheet "${sheetName}".`));
      } else {
        resolve(null);
      }
    };

    const responseHandler = encodeURIComponent(`out:json;responseHandler:${callbackName}`);
    script.src =
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?` +
      `tqx=${responseHandler}&headers=1&sheet=${encodeURIComponent(sheetName)}`;

    document.head.appendChild(script);
  });
}

// ---------------------------------------------------------------------------
// General parsing helpers
// ---------------------------------------------------------------------------

function parseBoolean(value, defaultValue = true) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return defaultValue;
  if (["y", "yes", "true", "1", "on"].includes(normalized)) return true;
  if (["n", "no", "false", "0", "off"].includes(normalized)) return false;
  return defaultValue;
}

function splitMultiValueCell(value) {
  return String(value || "")
    .split(/[,;|\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeScope(value) {
  const normalized = String(value || "").trim().toLowerCase();
  const scopeWords = [
    "subdomain",
    "domain",
    "site",
    "scope",
    "directory",
    "path",
    "section",
  ];
  return scopeWords.includes(normalized) ? "scope" : "exact";
}

function normalizeUrlForDeduplication(rawUrl) {
  try {
    const url = new URL(rawUrl);
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return String(rawUrl || "").replace(/\/$/, "");
  }
}

function hostnameFromUrl(rawUrl) {
  try {
    const candidate = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
    const hostname = new URL(candidate).hostname.toLowerCase();
    return hostname.includes(".") ? hostname : "";
  } catch {
    return "";
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------------------------------------------------------------------------
// Config parsing
// ---------------------------------------------------------------------------

async function loadSearchConfig() {
  const rows = (await loadSheet(SEARCH_CONFIG_SHEET_NAME, false)) || [];

  return rows
    .map((row) => ({
      tag: String(row.Tag || row.Value || row.Name || "").trim(),
      category: String(row.Category || row.Facet || "").trim(),
      label: String(row.Label || "").trim(),
      searchable: parseBoolean(row.Searchable, true),
      aliases: splitMultiValueCell(row.Aliases),
    }))
    .filter((rule) => rule.tag);
}

async function loadPageTagConfig() {
  let rows = null;

  for (const sheetName of PAGE_TAG_CONFIG_SHEET_NAMES) {
    rows = await loadSheet(sheetName, false);
    if (rows !== null) break;
  }

  return (rows || [])
    .map((row) => {
      const tag = String(
        row["Page Tag"] || row.Tag || row["Page Type"] || row.Type || "",
      ).trim();

      return {
        tag,
        label: String(row.Label || tag).trim() || tag,
        searchable: parseBoolean(row.Searchable, true),
        scope: normalizeScope(row.Scope),
        aliases: splitMultiValueCell(row.Aliases),
      };
    })
    .filter((rule) => rule.tag);
}

function findSearchConfigRule(configRules, category, tag) {
  const normalizedTag = String(tag || "").trim().toLowerCase();
  const normalizedCategory = String(category || "").trim().toLowerCase();

  const candidates = configRules.filter((rule) => {
    if (rule.tag.toLowerCase() !== normalizedTag) return false;
    if (!rule.category) return true;
    return rule.category.toLowerCase() === normalizedCategory;
  });

  // Prefer a category-specific rule when one exists.
  return (
    candidates.find((rule) => rule.category.toLowerCase() === normalizedCategory) ||
    candidates.find((rule) => !rule.category) ||
    null
  );
}

function findPageTagConfigRule(configRules, tag) {
  const normalizedTag = String(tag || "").trim().toLowerCase();
  return configRules.find((rule) => rule.tag.toLowerCase() === normalizedTag) || null;
}

function tagIsVisible(configRules, category, tag) {
  const rule = findSearchConfigRule(configRules, category, tag);
  return rule ? rule.searchable : true;
}

function pageTagIsVisible(configRules, tag) {
  const rule = findPageTagConfigRule(configRules, tag);
  return rule ? rule.searchable : true;
}

function tagDisplayLabel(configRules, category, tag) {
  const rule = findSearchConfigRule(configRules, category, tag);
  return rule?.label || tag;
}

function pageTagDisplayLabel(configRules, tag) {
  const rule = findPageTagConfigRule(configRules, tag);
  return rule?.label || tag;
}

/*
 * IMPORTANT ALIAS SEMANTICS
 *
 * If A lists B as an alias:
 *   - A still exists.
 *   - B still exists.
 *   - Selecting A matches rows/pages tagged A OR B.
 *   - Selecting B matches B (plus aliases configured on B, if any).
 *   - B only disappears if B itself has Searchable = N.
 */
function expandedTagMatchSet(configRules, category, tag) {
  const matches = new Set([String(tag || "").trim().toLowerCase()]);
  const rule = findSearchConfigRule(configRules, category, tag);

  for (const alias of rule?.aliases || []) {
    matches.add(alias.toLowerCase());
  }

  return matches;
}

function expandedPageTagMatchSet(configRules, tag) {
  const matches = new Set([String(tag || "").trim().toLowerCase()]);
  const rule = findPageTagConfigRule(configRules, tag);

  for (const alias of rule?.aliases || []) {
    matches.add(alias.toLowerCase());
  }

  return matches;
}

// ---------------------------------------------------------------------------
// Organization/page parsing
// ---------------------------------------------------------------------------

function parsePagesCell(value, pageTagConfig) {
  return String(value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      let rawUrl = line;
      let rawPageTag = "Other";

      if (line.includes(";")) {
        const separatorIndex = line.lastIndexOf(";");
        rawUrl = line.slice(0, separatorIndex).trim();
        rawPageTag = line.slice(separatorIndex + 1).trim() || "Other";
      }

      const configRule = findPageTagConfigRule(pageTagConfig, rawPageTag);
      const notFound = NOT_FOUND_VALUES.has(rawUrl.toLowerCase());
      const validUrl = /^https?:\/\//i.test(rawUrl);

      return {
        url: notFound ? "" : rawUrl,
        rawPageTag,
        displayLabel: pageTagDisplayLabel(pageTagConfig, rawPageTag),
        scope: configRule?.scope || "exact",
        notFound,
        invalid: !notFound && !validUrl,
      };
    });
}

async function buildDataset() {
  const [organizationRows, searchConfig, pageTagConfig] = await Promise.all([
    loadSheet(ORGS_SHEET_NAME, true),
    loadSearchConfig(),
    loadPageTagConfig(),
  ]);

  const organizations = [];
  const diagnostics = [];

  for (const [index, row] of organizationRows.entries()) {
    const website = String(row.Website || "").trim();

    if (website && !/^https?:\/\//i.test(website)) {
      diagnostics.push({
        row: index + 2,
        field: "Website",
        value: website,
        message: "Website should begin with http:// or https://.",
      });
    }

    const tags = {};
    for (const facetName of FACET_NAMES) {
      tags[facetName] = [...new Set(splitMultiValueCell(row[facetName]))];
    }

    const pages = parsePagesCell(row.Pages, pageTagConfig);
    for (const page of pages) {
      if (page.invalid) {
        diagnostics.push({
          row: index + 2,
          field: `Pages / ${page.rawPageTag}`,
          value: page.url,
          message: "This page entry is not a valid http:// or https:// URL.",
        });
      }
    }

    organizations.push({
      rowNumber: index + 2,
      website,
      websiteHost: hostnameFromUrl(website),
      tags,
      pages,
    });
  }

  const facets = buildFacetDefinitions(organizations, searchConfig);
  const pageLists = buildPageListDefinitions(organizations, pageTagConfig);

  return {
    organizations,
    facets,
    pageLists,
    searchConfig,
    pageTagConfig,
    diagnostics,
  };
}

function buildFacetDefinitions(organizations, searchConfig) {
  return FACET_NAMES.map((facetName) => {
    const rawValues = new Set();

    for (const organization of organizations) {
      for (const tag of organization.tags[facetName] || []) {
        rawValues.add(tag);
      }
    }

    const options = [...rawValues]
      .filter((tag) => tagIsVisible(searchConfig, facetName, tag))
      .map((tag) => ({
        value: tag,
        label: tagDisplayLabel(searchConfig, facetName, tag),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    options.unshift({ value: "__NOT_GIVEN__", label: "Not Given" });

    return {
      category: facetName,
      label: facetName,
      options,
    };
  });
}

function buildPageListDefinitions(organizations, pageTagConfig) {
  const discoveredTags = new Set();

  for (const organization of organizations) {
    for (const page of organization.pages) {
      discoveredTags.add(page.rawPageTag);
    }
  }

  const pageLists = [
    {
      tag: "__HOMEPAGES__",
      label: "Homepages",
      scope: "exact",
      builtIn: true,
    },
    {
      tag: "__WEBSITES__",
      label: "Websites",
      scope: "scope",
      builtIn: true,
    },
  ];

  const configuredLists = [...discoveredTags]
    .filter((tag) => pageTagIsVisible(pageTagConfig, tag))
    .map((tag) => {
      const rule = findPageTagConfigRule(pageTagConfig, tag);
      return {
        tag,
        label: pageTagDisplayLabel(pageTagConfig, tag),
        scope: rule?.scope || "exact",
        builtIn: false,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  return [...pageLists, ...configuredLists];
}

// ---------------------------------------------------------------------------
// Selection state and matching
// ---------------------------------------------------------------------------

function selectedFacetValues() {
  const selected = {};

  document.querySelectorAll("input[data-facet-category]:checked").forEach((input) => {
    const category = input.dataset.facetCategory;
    selected[category] ||= new Set();
    selected[category].add(input.dataset.facetValue);
  });

  return selected;
}

function selectedPageListTags() {
  return [...document.querySelectorAll('input[name="pageList"]:checked')].map(
    (input) => input.value,
  );
}

function organizationMatchesFacetSelection(
  organization,
  selectedFacets,
  ignoredCategory = null,
) {
  for (const [category, selectedOptions] of Object.entries(selectedFacets)) {
    if (category === ignoredCategory || selectedOptions.size === 0) continue;

    const rawTags = organization.tags[category] || [];
    const normalizedRawTags = new Set(rawTags.map((tag) => tag.toLowerCase()));
    const isNotGiven = rawTags.length === 0;

    let optionMatched = false;

    for (const selectedOption of selectedOptions) {
      if (selectedOption === "__NOT_GIVEN__") {
        if (isNotGiven) optionMatched = true;
        continue;
      }

      const expandedMatches = expandedTagMatchSet(
        data.searchConfig,
        category,
        selectedOption,
      );

      if ([...expandedMatches].some((tag) => normalizedRawTags.has(tag))) {
        optionMatched = true;
      }
    }

    if (!optionMatched) return false;
  }

  return true;
}

function pageListDefinition(tag) {
  return data.pageLists.find((pageList) => pageList.tag === tag);
}

function organizationContext(organization) {
  return FACET_NAMES.flatMap((facetName) => organization.tags[facetName] || []);
}

function contributionsForPageList(organization, pageListTag) {
  const definition = pageListDefinition(pageListTag);
  if (!definition) return [];

  const context = organizationContext(organization);

  if (pageListTag === "__HOMEPAGES__") {
    if (!/^https?:\/\//i.test(organization.website || "")) return [];

    return [
      {
        key: `exact:${normalizeUrlForDeduplication(organization.website)}`,
        url: organization.website,
        pageListLabel: "Homepages",
        kind: "exact",
        scopeMode: "exact",
        context,
      },
    ];
  }

  if (pageListTag === "__WEBSITES__") {
    if (!organization.websiteHost || !organization.website) return [];

    return [
      {
        key: `site:${organization.websiteHost}`,
        url: organization.website,
        pageListLabel: "Websites",
        kind: "scope",
        scopeMode: "host",
        context,
      },
    ];
  }

  const acceptedPageTags = expandedPageTagMatchSet(data.pageTagConfig, pageListTag);
  const contributions = [];

  for (const page of organization.pages) {
    if (page.notFound || page.invalid || !page.url) continue;
    if (!acceptedPageTags.has(page.rawPageTag.toLowerCase())) continue;

    contributions.push({
      key: `${definition.scope}:${normalizeUrlForDeduplication(page.url)}`,
      url: page.url,
      pageListLabel: definition.label,
      kind: definition.scope === "exact" ? "exact" : "scope",
      scopeMode: definition.scope === "exact" ? "exact" : "auto",
      context,
    });
  }

  return contributions;
}

function selectedItems() {
  const selectedFacets = selectedFacetValues();
  const selectedPageLists = selectedPageListTags();
  const itemsByKey = new Map();

  for (const organization of data.organizations) {
    if (!organizationMatchesFacetSelection(organization, selectedFacets)) continue;

    for (const pageListTag of selectedPageLists) {
      for (const item of contributionsForPageList(organization, pageListTag)) {
        if (!itemsByKey.has(item.key)) {
          itemsByKey.set(item.key, {
            ...item,
            pageListLabels: new Set(),
            contexts: new Set(),
          });
        }

        const storedItem = itemsByKey.get(item.key);
        storedItem.pageListLabels.add(item.pageListLabel);
        for (const contextTag of item.context || []) {
          storedItem.contexts.add(contextTag);
        }
      }
    }
  }

  return [...itemsByKey.values()].map((item) => ({
    ...item,
    pageListLabels: [...item.pageListLabels],
    contexts: [...item.contexts],
  }));
}

// ---------------------------------------------------------------------------
// Facet-aware counts
// ---------------------------------------------------------------------------

function pageListsForCounting() {
  const selected = selectedPageListTags();
  return selected.length > 0 ? selected : data.pageLists.map((pageList) => pageList.tag);
}

function organizationHasContribution(organization, pageListTags) {
  return pageListTags.some(
    (pageListTag) => contributionsForPageList(organization, pageListTag).length > 0,
  );
}

function countFacetOption(category, optionValue) {
  const selectedFacets = selectedFacetValues();
  const relevantPageLists = pageListsForCounting();
  let count = 0;

  for (const organization of data.organizations) {
    if (!organizationMatchesFacetSelection(organization, selectedFacets, category)) continue;
    if (!organizationHasContribution(organization, relevantPageLists)) continue;

    const rawTags = organization.tags[category] || [];

    if (optionValue === "__NOT_GIVEN__") {
      if (rawTags.length === 0) count += 1;
      continue;
    }

    const expandedMatches = expandedTagMatchSet(
      data.searchConfig,
      category,
      optionValue,
    );
    const normalizedRawTags = new Set(rawTags.map((tag) => tag.toLowerCase()));

    if ([...expandedMatches].some((tag) => normalizedRawTags.has(tag))) {
      count += 1;
    }
  }

  return count;
}

function countPageList(pageListTag) {
  const selectedFacets = selectedFacetValues();
  const uniqueItems = new Set();

  for (const organization of data.organizations) {
    if (!organizationMatchesFacetSelection(organization, selectedFacets)) continue;

    for (const item of contributionsForPageList(organization, pageListTag)) {
      uniqueItems.add(item.key);
    }
  }

  return uniqueItems.size;
}

function refreshCountsAndSummary() {
  document.querySelectorAll("input[data-facet-category]").forEach((input) => {
    const count = countFacetOption(
      input.dataset.facetCategory,
      input.dataset.facetValue,
    );

    const control = input.closest(".tag-control");
    control.querySelector(".tag-count").textContent = `(${count})`;
    control.classList.toggle("zero-results", count === 0);
  });

  document.querySelectorAll('input[name="pageList"]').forEach((input) => {
    const count = countPageList(input.value);
    const definition = pageListDefinition(input.value);
    const noun = definition.scope === "scope" ? "section" : "page";

    const control = input.closest(".page-list-control");
    control.querySelector(".page-list-meta").textContent =
      `${count} ${noun}${count === 1 ? "" : "s"}`;
    control.classList.toggle("zero-results", count === 0);
  });

  const selected = selectedItems();
  const exactCount = selected.filter((item) => item.kind === "exact").length;
  const scopeCount = selected.filter((item) => item.kind === "scope").length;
  const selectedFacetCount = document.querySelectorAll(
    "input[data-facet-category]:checked",
  ).length;
  const selectedPageListCount = selectedPageListTags().length;

  elements.selectionSummary.textContent =
    `${selectedPageListCount} page list${selectedPageListCount === 1 ? "" : "s"} selected` +
    `${selectedFacetCount ? ` · ${selectedFacetCount} filter${selectedFacetCount === 1 ? "" : "s"} selected` : ""}` +
    ` · ${exactCount} specific page${exactCount === 1 ? "" : "s"}` +
    ` + ${scopeCount} site section${scopeCount === 1 ? "" : "s"}`;
}

// ---------------------------------------------------------------------------
// Rendering controls
// ---------------------------------------------------------------------------

function renderControls() {
  renderFacets();
  renderPageLists();
  attachControlListeners();
  refreshCountsAndSummary();
}

function renderFacets() {
  elements.facets.innerHTML = "";

  for (const facet of data.facets) {
    const facetElement = document.createElement("section");
    facetElement.className = "facet";

    const optionHtml = facet.options
      .map(
        (option) => `
          <label class="tag-control">
            <input
              type="checkbox"
              data-facet-category="${escapeHtml(facet.category)}"
              data-facet-value="${escapeHtml(option.value)}"
            >
            <span class="tag-name">${escapeHtml(option.label)}</span>
            <span class="tag-count">(0)</span>
          </label>
        `,
      )
      .join("");

    facetElement.innerHTML = `
      <div class="facet-heading">
        <div class="facet-title">${escapeHtml(facet.label)}</div>
        <div class="button-row">
          <button class="secondary small" type="button" data-facet-action="all">All</button>
          <button class="secondary small" type="button" data-facet-action="none">None</button>
        </div>
      </div>
      <div class="tag-values">${optionHtml}</div>
    `;

    elements.facets.appendChild(facetElement);
  }
}

function renderPageLists() {
  elements.exactLists.innerHTML = "";
  elements.scopeLists.innerHTML = "";

  for (const pageList of data.pageLists) {
    const container = pageList.scope === "exact" ? elements.exactLists : elements.scopeLists;
    const control = document.createElement("label");
    control.className = "page-list-control";

    // Requested default state: ONLY Homepages starts selected.
    const checked = pageList.tag === "__HOMEPAGES__";

    control.innerHTML = `
      <input
        type="checkbox"
        name="pageList"
        value="${escapeHtml(pageList.tag)}"
        data-page-scope="${escapeHtml(pageList.scope)}"
        ${checked ? "checked" : ""}
      >
      <span>
        <span class="page-list-label">${escapeHtml(pageList.label)}</span>
        <span class="page-list-meta">0</span>
      </span>
    `;

    container.appendChild(control);
  }
}

function attachControlListeners() {
  document
    .querySelectorAll('input[data-facet-category], input[name="pageList"]')
    .forEach((input) => {
      input.addEventListener("change", handleSelectionChanged);
    });

  document.querySelectorAll("button[data-facet-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const checked = button.dataset.facetAction === "all";
      const facet = button.closest(".facet");

      facet.querySelectorAll("input[data-facet-category]").forEach((input) => {
        input.checked = checked;
      });

      handleSelectionChanged();
    });
  });

  document.querySelectorAll("button[data-page-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const [scope, action] = button.dataset.pageAction.split("-");
      const checked = action === "all";

      document
        .querySelectorAll(`input[name="pageList"][data-page-scope="${scope}"]`)
        .forEach((input) => {
          input.checked = checked;
        });

      handleSelectionChanged();
    });
  });
}

function handleSelectionChanged() {
  refreshCountsAndSummary();

  if (!elements.resultsPanel.hidden) {
    renderSelectedPages();
  }

  if (!elements.gogglePanel.hidden) {
    refreshGogglePanel();
  }
}

// ---------------------------------------------------------------------------
// Page cards
// ---------------------------------------------------------------------------

function screenshotUrl(url) {
  return `https://image.thum.io/get/width/640/crop/360/maxAge/168/noanimate/${url}`;
}

function faviconUrl(hostname) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`;
}

function humanizeUrl(url, hostname) {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    if (pathParts.length === 0) return hostname || "Homepage";

    const lastPart = decodeURIComponent(pathParts[pathParts.length - 1])
      .replace(/[-_]+/g, " ")
      .trim();

    if (!lastPart) return hostname || url;

    return lastPart.replace(/\b\w/g, (letter) => letter.toUpperCase());
  } catch {
    return hostname || url;
  }
}

function pageCardHtml(item) {
  let hostname = "";
  try {
    hostname = new URL(item.url).hostname;
  } catch {
    // Keep blank.
  }

  const searchableText = [
    hostname,
    item.url,
    ...item.pageListLabels,
    ...item.contexts,
  ]
    .join(" ")
    .toLowerCase();

  const contextChips = item.contexts.slice(0, 6);

  return `
    <a
      class="page-card"
      href="${escapeHtml(item.url)}"
      target="_blank"
      rel="noopener"
      data-search="${escapeHtml(searchableText)}"
    >
      <div class="preview-media">
        <img
          class="page-screenshot"
          src="${escapeHtml(screenshotUrl(item.url))}"
          alt=""
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.style.display='none'"
        >
        <img
          class="site-favicon"
          src="${escapeHtml(faviconUrl(hostname))}"
          alt=""
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.style.display='none'"
        >
      </div>
      <div class="card-body">
        <div class="card-domain">${escapeHtml(hostname)}</div>
        <div class="card-title">${escapeHtml(humanizeUrl(item.url, hostname))}</div>
        <div class="card-url">${escapeHtml(item.url)}</div>
        <div class="chips">
          ${item.pageListLabels
            .map((label) => `<span class="chip">${escapeHtml(label)}</span>`)
            .join("")}
          ${contextChips
            .map((label) => `<span class="chip context">${escapeHtml(label)}</span>`)
            .join("")}
        </div>
      </div>
    </a>
  `;
}

function renderSelectedPages() {
  // Site Sections are intentionally excluded from the browse display.
  const exactPages = selectedItems().filter((item) => item.kind === "exact");

  elements.resultGrid.innerHTML = exactPages.length
    ? exactPages.map(pageCardHtml).join("")
    : '<div class="empty-state">No specific pages match the current selections.</div>';

  elements.localFilter.value = "";
  applyLocalFilter();
}

function applyLocalFilter() {
  const query = elements.localFilter.value.trim().toLowerCase();
  let visibleCount = 0;

  elements.resultGrid.querySelectorAll(".page-card").forEach((card) => {
    const visible = !query || card.dataset.search.includes(query);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  elements.resultsMeta.textContent =
    `${visibleCount} displayed page${visibleCount === 1 ? "" : "s"}` +
    (query ? ` matching "${elements.localFilter.value.trim()}"` : "");
}

// ---------------------------------------------------------------------------
// Goggle generation
// ---------------------------------------------------------------------------

function exactGoggleRules(rawUrl) {
  try {
    const url = new URL(rawUrl);
    url.hash = "";

    const versions = new Set([url.toString()]);

    if (!url.search) {
      const serialized = url.toString();
      versions.add(serialized.endsWith("/") ? serialized.slice(0, -1) : `${serialized}/`);
    }

    return [...versions].filter(Boolean).map((version) => `|${version}|$boost=10`);
  } catch {
    return [];
  }
}

function scopeGoggleRules(item) {
  try {
    const url = new URL(item.url);
    url.hash = "";
    url.search = "";

    const hostname = url.hostname.toLowerCase();

    if (item.scopeMode === "host" || !url.pathname || url.pathname === "/") {
      return hostname ? [`$boost=10,site=${hostname}`] : [];
    }

    const path = url.pathname.replace(/\/+$/, "");
    return [`|${url.protocol}//${url.host}${path}^$boost=10`];
  } catch {
    return [];
  }
}

function buildGoggleText() {
  const rules = ["$discard"];

  for (const item of selectedItems()) {
    if (item.kind === "exact") {
      rules.push(...exactGoggleRules(item.url));
    } else {
      rules.push(...scopeGoggleRules(item));
    }
  }

  return [...new Set(rules)].join("\n");
}

function refreshGogglePanel() {
  const text = buildGoggleText();
  elements.goggleText.value = text;

  const ruleCount = Math.max(0, text.split("\n").filter(Boolean).length - 1);
  elements.goggleMeta.textContent =
    `${ruleCount} allow rule${ruleCount === 1 ? "" : "s"} generated from the current selection.`;
}

async function copyGoggle() {
  refreshGogglePanel();

  try {
    await navigator.clipboard.writeText(elements.goggleText.value);
    elements.copyGoggleButton.textContent = "Copied";
    setTimeout(() => {
      elements.copyGoggleButton.textContent = "Copy Goggle";
    }, 1200);
  } catch {
    elements.goggleText.focus();
    elements.goggleText.select();
    document.execCommand("copy");
  }
}

function downloadGoggle() {
  refreshGogglePanel();

  const blob = new Blob([`${elements.goggleText.value}\n`], {
    type: "text/plain;charset=utf-8",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = "search-the-movement.goggle";
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
}

// ---------------------------------------------------------------------------
// Diagnostics
// ---------------------------------------------------------------------------

function renderDiagnostics() {
  if (data.diagnostics.length === 0) return;

  elements.diagnosticsBox.hidden = false;
  elements.diagnosticsSummary.textContent = `Data diagnostics (${data.diagnostics.length})`;
  elements.diagnosticsBody.innerHTML = data.diagnostics
    .slice(0, 100)
    .map(
      (diagnostic) => `
        <div class="diagnostic-item">
          <strong>Row ${diagnostic.row} · ${escapeHtml(diagnostic.field)}</strong><br>
          ${escapeHtml(diagnostic.value)}<br>
          ${escapeHtml(diagnostic.message)}
        </div>
      `,
    )
    .join("");
}

// ---------------------------------------------------------------------------
// Event wiring and startup
// ---------------------------------------------------------------------------

elements.viewPagesButton.addEventListener("click", () => {
  renderSelectedPages();
  elements.resultsPanel.hidden = false;
  elements.resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.closeResultsButton.addEventListener("click", () => {
  elements.resultsPanel.hidden = true;
});

elements.localFilter.addEventListener("input", applyLocalFilter);

elements.goggleButton.addEventListener("click", () => {
  elements.gogglePanel.hidden = !elements.gogglePanel.hidden;
  if (!elements.gogglePanel.hidden) refreshGogglePanel();
});

elements.copyGoggleButton.addEventListener("click", copyGoggle);
elements.downloadGoggleButton.addEventListener("click", downloadGoggle);

async function initialize() {
  try {
    data = await buildDataset();

    elements.loading.textContent =
      `Loaded ${data.organizations.length} organizations from the public spreadsheet.`;
    elements.controls.hidden = false;

    renderControls();
    renderDiagnostics();
  } catch (error) {
    elements.loading.hidden = true;
    elements.error.textContent =
      "Could not load the public spreadsheet. Confirm that the Google Sheet is publicly readable. " +
      `(${error.message})`;
  }
}

initialize();
