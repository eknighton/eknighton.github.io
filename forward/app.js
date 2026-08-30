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
 * - Site-section controls are intentionally hidden from the public interface.
 * - Goggle generation uses the homepage domains of organizations that have at
 *   least one page in any currently selected page list.
 */

const SHEET_ID = "1b1yxtBRgMwIRZuvyXQPIHN1d7NqYmNcg8xW444sSjw0";

const UPCOMING_EVENTS_PROMPT = "You are an Upcoming Events Research Assistant.\n\nAsk me to provide:\n\n1. A list of webpages containing event listings.\n2. Any special instructions, such as topics, locations, audiences, prices, dates, or types of events to highlight.\n\nAfter I provide them:\n\n- Visit and review every webpage.\n- Use today’s date to exclude events that have already happened.\n- Check embedded calendars, expandable sections, and pagination when accessible.\n- Remove duplicate events.\n- Do not guess missing details.\n- Clearly identify uncertain, inaccessible, broken, or outdated listings.\n- Organize upcoming events chronologically.\n\nFor every event, include:\n\n- Date and day of the week\n- Start and end time, including time zone\n- Event title\n- Location or online status\n- Organizer\n- Price, when available\n- A concise plain-language summary\n- A direct source or registration link\n- A note explaining why it matches any special highlighting instructions\n\nConclude with:\n\n- Pages that contained no upcoming events\n- Pages that could not be fully accessed\n- Any ongoing or anytime opportunities listed separately\n\nMake the final result polished and easy to share.\n\nBegin by asking me for my webpages and special instructions.";
const RECENT_NEWS_PROMPT = "You are a Recent News Research Assistant.\n\nBegin by asking me for:\n\n1. A list of news, press-release, blog, newsletter, or updates pages.\n2. The timeframe to review, such as “the last seven days,” “since August 1,” or a specific start and end date.\n3. Topics I want specially highlighted.\n4. Topics, people, locations, or types of content I want ignored.\n5. Any optional geographic focus or preferred output format.\n\nIf I omit the timeframe, ask for it rather than choosing one silently. Treat date boundaries as inclusive unless I say otherwise.\n\nAfter I answer:\n\n- State the exact date range you will use.\n- Visit and review every supplied page.\n- Look beyond pinned or featured material and identify each item’s actual publication date.\n- Check pagination, “load more” controls, newsletter archives, and relevant category sections when accessible.\n- Include only items published within the requested date range.\n- Remove duplicate or substantially identical items.\n- Apply my exclusions before preparing the final report.\n- Clearly mark items matching my highlighted topics.\n- Do not infer that an undated item is recent.\n- Do not invent missing dates, authors, details, or conclusions.\n- Identify inaccessible, broken, outdated, or ambiguous pages.\n\nOpen qualifying articles when possible rather than summarizing them from headlines alone.\n\nFor every included update, provide:\n\n- Publication date\n- Headline\n- Publishing organization\n- Content type, such as news report, press release, organizational update, opinion, campaign advocacy, newsletter, research, event announcement, or job posting\n- A concise, neutral summary of the substantive development\n- The people, organizations, legislation, ballot measures, places, or policies involved\n- A direct link to the article\n- A clearly visible highlight marker when it matches one of my requested topics\n\nMaintain source awareness:\n\n- Attribute claims, predictions, accusations, endorsements, and interpretations to the organization or author making them.\n- Do not present a political organization’s claims as independently verified facts.\n- Distinguish factual announcements from opinion and advocacy.\n- Note when an article mainly republishes or links to another source.\n- Preserve meaningful differences between sources covering the same development.\n- Avoid commentary about whether a political viewpoint is good or bad unless I explicitly request analysis.\n\nOrganize the result with:\n\n1. A short overview of the most important developments.\n2. A chronological or topic-based list of qualifying updates.\n3. A separate section for specially highlighted items, if useful.\n4. A “No qualifying updates” section naming pages that had nothing within the timeframe.\n5. A “Could not fully verify” section for access or date problems.\n6. A brief methodology note stating when the review was performed and what date range was used.\n\nMake the report polished, skimmable, neutral, and easy to share.\n\nBegin by asking me for the webpages, timeframe, highlighted topics, and exclusions.";
const GENERAL_PURPOSE_PROMPT = "You are a research assistant.\n\nUsers will give you lists of links and make research requests relating to them.\n\nTo fulfill the requests, you are to open the pages in a browser; viewing them in the way a human would. This ensures that javascript elements function properly, and makes sure the user does not have to open them in a browser themself to correct your results.\n\nUsers might not anticipate that they might have to grant permission for each access, so please let them know before hand and be sure to ask for permission right away after a request, so they can then be free to step away. If their device does not support this kind of viewing, let them know and explain why it will be a problem.\n\nThese requests may involve a lot of work, but it is very important that you do a good job. These users may have a very low tolerance for poor performance. Oh, one last tip! Don’t let yourself get carried away copying down dozens of items from one unusually rich page- it’s ok to move on as long you note that you did so.\n\nSend a message once you believe you are ready!";

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
  selectionSummary: document.querySelector("#selectionSummary"),
  viewPagesButton: document.querySelector("#viewPagesButton"),
  goggleButton: document.querySelector("#goggleButton"),
  gogglePanel: document.querySelector("#gogglePanel"),
  downloadGoggleButton: document.querySelector("#downloadGoggleButton"),
  goggleMeta: document.querySelector("#goggleMeta"),
  goggleText: document.querySelector("#goggleText"),
  copyListButton: document.querySelector("#copyListButton"),
  shareButton: document.querySelector("#shareButton"),
  aiButton: document.querySelector("#aiButton"),
  aiPanel: document.querySelector("#aiPanel"),
  copyEventsPromptButton: document.querySelector("#copyEventsPromptButton"),
  copyNewsPromptButton: document.querySelector("#copyNewsPromptButton"),
  copyGeneralPromptButton: document.querySelector("#copyGeneralPromptButton"),
  downloadSearchAppButton: document.querySelector("#downloadSearchAppButton"),
  toolStatus: document.querySelector("#toolStatus"),
  homeLink: document.querySelector("#homeLink"),
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
      const parts = line.split(";").map((part) => part.trim());
      const rawUrl = parts.shift() || "";

      // Every value after the URL is an independent page tag.
      // Example: "https://example.org/news; News; Updates"
      const rawPageTags = parts.filter(Boolean);
      if (rawPageTags.length === 0) {
        rawPageTags.push("Other");
      }

      const notFound = NOT_FOUND_VALUES.has(rawUrl.toLowerCase());
      const validUrl = /^https?:\/\//i.test(rawUrl);

      return {
        url: notFound ? "" : rawUrl,
        rawPageTags,

        // Keep the first-tag fields for backward readability/debugging.
        rawPageTag: rawPageTags[0],
        displayLabel: pageTagDisplayLabel(pageTagConfig, rawPageTags[0]),

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
    /*
     * An Exclude value of Y/Yes/True/1 removes the entire row from the public
     * dataset. Because the row never enters `organizations`, it contributes
     * to no counts, page lists, previews, copies, or Goggle rules.
     */
    const excluded = parseBoolean(
      row.Exclude ?? row.exclude ?? row.EXCLUDE,
      false,
    );
    if (excluded) continue;

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
          field: `Pages / ${page.rawPageTags.join("; ")}`,
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
      }));

    options.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: "base" }),
    );

    // "Not Given" is always the first option in each facet.
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
      for (const rawPageTag of page.rawPageTags) {
        discoveredTags.add(rawPageTag);
      }
    }
  }

  const builtInLists = [
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

  /*
   * Page Tags Config is a true definition source.
   *
   * A configured Page Tag appears as its own page-list option even if that
   * canonical tag never occurs literally in Orgs List. Its aliases determine
   * what raw page tags it can match when selected.
   *
   * Example:
   *   Civic Reform | Electoral Reform; Election Reform
   *
   * creates a Civic Reform option even if every actual page is tagged only
   * Electoral Reform or Election Reform.
   */
  const configuredDefinitions = pageTagConfig
    .filter((rule) => rule.searchable)
    .map((rule) => ({
      tag: rule.tag,
      label: rule.label || rule.tag,
      scope: rule.scope || "exact",
      builtIn: false,
    }));

  const configuredCanonicalTags = new Set(
    pageTagConfig.map((rule) => rule.tag.toLowerCase()),
  );

  /*
   * Raw tags discovered in Orgs List still remain independent options.
   * Merely being listed as another tag's alias does NOT merge or suppress
   * them. A raw tag disappears only if its own config row says Searchable=N.
   *
   * If a discovered tag already has its own config row, its configured
   * definition above is used instead of creating a duplicate here.
   */
  const discoveredDefinitions = [...discoveredTags]
    .filter((tag) => !configuredCanonicalTags.has(tag.toLowerCase()))
    .filter((tag) => pageTagIsVisible(pageTagConfig, tag))
    .map((tag) => ({
      tag,
      label: tag,
      scope: "exact",
      builtIn: false,
    }));

  const userPageLists = [...configuredDefinitions, ...discoveredDefinitions]
    .sort((a, b) => a.label.localeCompare(b.label));

  return [...builtInLists, ...userPageLists];
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

    const pageMatches = page.rawPageTags.some((rawPageTag) =>
      acceptedPageTags.has(rawPageTag.toLowerCase()),
    );
    if (!pageMatches) continue;

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
    control.querySelector(".tag-count").textContent = `${count}`;
    control.classList.toggle("zero-results", count === 0);
  });

  document.querySelectorAll('input[name="pageList"]').forEach((input) => {
    const count = countPageList(input.value);
    const control = input.closest(".page-list-control");
    control.querySelector(".page-list-meta").textContent = `${count}`;
    control.classList.toggle("zero-results", count === 0);
  });

  const exactCount = selectedItems().filter((item) => item.kind === "exact").length;
  const selectedFacetCount = document.querySelectorAll(
    "input[data-facet-category]:checked",
  ).length;
  const selectedPageListCount = selectedPageListTags().length;

  elements.selectionSummary.textContent =
    `${selectedPageListCount} page list${selectedPageListCount === 1 ? "" : "s"} selected` +
    `${selectedFacetCount ? ` · ${selectedFacetCount} filter${selectedFacetCount === 1 ? "" : "s"} selected` : ""}` +
    ` · ${exactCount} specific page${exactCount === 1 ? "" : "s"}`;
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
            <span class="tag-count">0</span>
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

  // Site-section page lists still exist in the data model/config, but the
  // public interface intentionally shows only specific-page lists.
  const visiblePageLists = data.pageLists.filter(
    (pageList) => pageList.scope === "exact",
  );

  for (const pageList of visiblePageLists) {
    const control = document.createElement("label");
    control.className = "page-list-control";

    // Requested default state: ONLY Homepages starts selected.
    const checked = pageList.tag === "__HOMEPAGES__";

    control.innerHTML = `
      <input
        type="checkbox"
        name="pageList"
        value="${escapeHtml(pageList.tag)}"
        data-page-scope="exact"
        ${checked ? "checked" : ""}
      >
      <span>
        <span class="page-list-label">${escapeHtml(pageList.label)}</span>
        <span class="page-list-meta">0</span>
      </span>
    `;

    elements.exactLists.appendChild(control);
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
      const checked = button.dataset.pageAction === "exact-all";

      document.querySelectorAll('input[name="pageList"]').forEach((input) => {
        input.checked = checked;
      });

      handleSelectionChanged();
    });
  });
}

function handleSelectionChanged() {
  refreshCountsAndSummary();
  updateUrlFromSelections({ replace: true });

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
        <div
          class="card-excerpt"
          data-preview-url="${escapeHtml(item.url)}"
          aria-live="polite"
        ></div>
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
  attachPagePreviewObserver();
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
// Text previews
// ---------------------------------------------------------------------------

/*
 * Static GitHub Pages cannot reliably fetch arbitrary websites directly
 * because most sites do not permit cross-origin browser requests.
 *
 * For a best-effort text preview, we lazily request a readable version through
 * Jina Reader only when a card approaches the viewport. If the request fails,
 * the card simply keeps its existing screenshot/title/URL presentation.
 *
 * Results are cached in memory for the current visit so scrolling or
 * re-rendering does not repeatedly request the same page.
 */
const pagePreviewCache = new Map();

function jinaReaderUrl(url) {
  return `https://r.jina.ai/${url}`;
}

function cleanReaderExcerpt(text) {
  if (!text) return "";

  let content = text;

  // Reader responses commonly contain a metadata preamble followed by the
  // main page text. Prefer content after this marker when it is present.
  const marker = "Markdown Content:";
  const markerIndex = content.indexOf(marker);
  if (markerIndex !== -1) {
    content = content.slice(markerIndex + marker.length);
  }

  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^#{1,6}\s/.test(line))
    .filter((line) => !/^(Title|URL Source|Published Time|Markdown Content):/i.test(line))
    .filter((line) => !/^!\[/.test(line))
    .filter((line) => !/^\[.*\]\(.*\)$/.test(line));

  let excerpt = lines.join(" ")
    .replace(/\s+/g, " ")
    .replace(/\[(.*?)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .trim();

  if (excerpt.length > 320) {
    excerpt = excerpt.slice(0, 317).trimEnd() + "…";
  }

  return excerpt;
}

async function loadPageExcerpt(url) {
  if (pagePreviewCache.has(url)) {
    return pagePreviewCache.get(url);
  }

  const promise = fetch(jinaReaderUrl(url), {
    headers: {
      Accept: "text/plain",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Preview request failed: ${response.status}`);
      }
      return response.text();
    })
    .then(cleanReaderExcerpt)
    .catch(() => "");

  pagePreviewCache.set(url, promise);
  return promise;
}

function attachPagePreviewObserver() {
  const excerpts = [...elements.resultGrid.querySelectorAll(".card-excerpt")];
  if (!excerpts.length) return;

  const populateExcerpt = async (element) => {
    if (element.dataset.previewLoaded === "true") return;
    element.dataset.previewLoaded = "true";

    const excerpt = await loadPageExcerpt(element.dataset.previewUrl);
    if (!excerpt || !element.isConnected) return;

    element.textContent = excerpt;

    // Include the excerpt in the card's local-search metadata too.
    const card = element.closest(".page-card");
    if (card) {
      card.dataset.search = `${card.dataset.search} ${excerpt.toLowerCase()}`;
    }
  };

  if (!("IntersectionObserver" in window)) {
    excerpts.slice(0, 12).forEach(populateExcerpt);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        populateExcerpt(entry.target);
      });
    },
    {
      rootMargin: "500px 0px",
    },
  );

  excerpts.forEach((element) => observer.observe(element));
}

// ---------------------------------------------------------------------------
// Goggle generation
// ---------------------------------------------------------------------------

/*
 * The page-list selection decides WHICH ORGANIZATIONS enter the Goggle.
 *
 * Example:
 *   - User selects "Resources".
 *   - An organization qualifies if it matches the active facets and has at
 *     least one Resources page (including aliases configured for Resources).
 *   - The generated Goggle then searches that organization's whole website,
 *     using the homepage hostname from the Website column.
 *
 * This keeps the Goggle broad enough to search the selected organizations
 * without exposing the hidden Site Sections UI.
 */
function organizationsForGoggle() {
  const selectedFacets = selectedFacetValues();
  const selectedPageLists = selectedPageListTags();

  if (selectedPageLists.length === 0) return [];

  return data.organizations.filter((organization) => {
    if (!organizationMatchesFacetSelection(organization, selectedFacets)) {
      return false;
    }

    if (!organization.websiteHost) return false;

    return selectedPageLists.some(
      (pageListTag) =>
        contributionsForPageList(organization, pageListTag).length > 0,
    );
  });
}

function buildGoggleText() {
  const rules = ["$discard"];
  const websiteHosts = new Set(
    organizationsForGoggle()
      .map((organization) => organization.websiteHost)
      .filter(Boolean),
  );

  for (const hostname of websiteHosts) {
    rules.push(`$boost=10,site=${hostname}`);
  }

  return rules.join("\n");
}

function refreshGogglePanel() {
  const organizations = organizationsForGoggle();
  const uniqueHosts = new Set(
    organizations.map((organization) => organization.websiteHost).filter(Boolean),
  );

  elements.goggleText.value = buildGoggleText();
  elements.goggleMeta.textContent =
    `${uniqueHosts.size} website${uniqueHosts.size === 1 ? "" : "s"} included ` +
    `from ${organizations.length} qualifying organization${organizations.length === 1 ? "" : "s"}.`;
}

async function copyGoggle({ openPanel = false } = {}) {
  refreshGogglePanel();
  if (openPanel) {
    elements.gogglePanel.hidden = false;
  }

  try {
    await navigator.clipboard.writeText(elements.goggleText.value);
    setToolStatus("Goggle copied.");

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
// Facet column layout
// ---------------------------------------------------------------------------

/*
 * Keep the tag sections in genuine columns while avoiding the two problems
 * from earlier attempts:
 *
 * - no horizontal scrollbar
 * - no equal-width columns stretching sparse sections apart
 *
 * The number of columns adapts to the available width. Once the column count
 * is chosen, the number of rows is calculated so CSS Grid can fill
 * top-to-bottom before moving to the next column.
 */
function layoutFacetColumns() {
  /*
   * Every selectable section uses the SAME number of columns.
   *
   * Determine that shared count from:
   * - the narrowest available section width
   * - the widest selectable item anywhere on the page
   *
   * Then each individual section calculates only how many ROWS it needs.
   * This keeps Regions / Issues / Types / Specific Page Lists visually aligned.
   */
  const containers = [
    ...document.querySelectorAll(".tag-values"),
    elements.exactLists,
  ].filter(Boolean);

  const allControls = containers.flatMap((container) => [
    ...container.querySelectorAll(".tag-control, .page-list-control"),
  ]);

  if (!containers.length || !allControls.length) return;

  const availableWidth = Math.min(
    ...containers.map(
      (container) =>
        container.clientWidth ||
        container.parentElement?.clientWidth ||
        800,
    ),
  );

  const widestItem = Math.max(
    ...allControls.map((control) =>
      Math.ceil(control.getBoundingClientRect().width),
    ),
    120,
  );

  const columnGap = 28;
  const columnWidth = Math.max(140, widestItem);

  let sharedColumns = Math.floor(
    (availableWidth + columnGap) / (columnWidth + columnGap),
  );

  sharedColumns = Math.max(1, sharedColumns);

  containers.forEach((container) => {
    const count = container.querySelectorAll(
      ".tag-control, .page-list-control",
    ).length;

    if (!count) return;

    const rows = Math.ceil(count / sharedColumns);

    container.style.setProperty("--shared-columns", sharedColumns);
    container.style.setProperty("--section-rows", rows);
    container.style.setProperty("--shared-column-width", `${columnWidth}px`);
  });
}

let facetLayoutResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(facetLayoutResizeTimer);
  facetLayoutResizeTimer = setTimeout(layoutFacetColumns, 80);
});

// ---------------------------------------------------------------------------
// Shareable URL state + utility actions
// ---------------------------------------------------------------------------

function currentSelectionState() {
  const facets = {};

  document.querySelectorAll("input[data-facet-category]:checked").forEach((input) => {
    const category = input.dataset.facetCategory;
    if (!facets[category]) facets[category] = [];
    facets[category].push(input.dataset.facetValue);
  });

  return { facets, pageLists: selectedPageListTags() };
}

function encodeSelectionState(state) {
  const bytes = new TextEncoder().encode(JSON.stringify(state));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodeSelectionState(encoded) {
  try {
    const padded =
      encoded.replace(/-/g, "+").replace(/_/g, "/") +
      "=".repeat((4 - (encoded.length % 4)) % 4);

    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

function updateUrlFromSelections({ replace = true } = {}) {
  const state = currentSelectionState();
  const params = new URLSearchParams(window.location.search);

  const isDefault =
    Object.values(state.facets).every((values) => values.length === 0) &&
    state.pageLists.length === 1 &&
    state.pageLists[0] === "__HOMEPAGES__";

  if (isDefault) params.delete("s");
  else params.set("s", encodeSelectionState(state));

  const nextUrl =
    window.location.pathname +
    (params.toString() ? `?${params.toString()}` : "") +
    window.location.hash;

  history[replace ? "replaceState" : "pushState"]({}, "", nextUrl);
}

function applySelectionStateFromUrl() {
  const encoded = new URLSearchParams(window.location.search).get("s");
  if (!encoded) return;

  const state = decodeSelectionState(encoded);
  if (!state) return;

  document.querySelectorAll("input[data-facet-category]").forEach((input) => {
    const selected = state.facets?.[input.dataset.facetCategory] || [];
    input.checked = selected.includes(input.dataset.facetValue);
  });

  document.querySelectorAll('input[name="pageList"]').forEach((input) => {
    input.checked = (state.pageLists || []).includes(input.value);
  });
}

function resetToDefaultSelection() {
  document.querySelectorAll("input[data-facet-category]").forEach((input) => {
    input.checked = false;
  });

  document.querySelectorAll('input[name="pageList"]').forEach((input) => {
    input.checked = input.value === "__HOMEPAGES__";
  });

  updateUrlFromSelections({ replace: false });
  handleSelectionChanged();
}

function setToolStatus(message) {
  elements.toolStatus.textContent = message;
  clearTimeout(setToolStatus.timeout);
  setToolStatus.timeout = setTimeout(() => {
    elements.toolStatus.textContent = "";
  }, 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

async function copySelectedList() {
  const urls = selectedItems()
    .filter((item) => item.kind === "exact")
    .map((item) => item.url);

  if (!urls.length) {
    setToolStatus("No selected pages to copy.");
    return;
  }

  await copyText(urls.join("\n"));
  setToolStatus(`Copied ${urls.length} page${urls.length === 1 ? "" : "s"}.`);
}

async function copyShareLink() {
  updateUrlFromSelections({ replace: true });
  await copyText(window.location.href);
  setToolStatus("Share link copied.");
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

elements.copyListButton.addEventListener("click", copySelectedList);
elements.shareButton.addEventListener("click", copyShareLink);
elements.aiButton.addEventListener("click", () => {
  const wasOpen = !elements.aiPanel.hidden;

  elements.gogglePanel.hidden = true;

  if (wasOpen) {
    elements.aiPanel.hidden = true;
    return;
  }

  elements.aiPanel.hidden = false;
  elements.aiPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.copyGeneralPromptButton.addEventListener("click", async () => {
  await copyText(GENERAL_PURPOSE_PROMPT);
  setToolStatus("General-purpose prompt copied.");
});

elements.homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  resetToDefaultSelection();
});

elements.closeResultsButton.addEventListener("click", () => {
  elements.resultsPanel.hidden = true;
});

elements.localFilter.addEventListener("input", applyLocalFilter);

elements.goggleButton.addEventListener("click", async () => {
  const wasOpen = !elements.gogglePanel.hidden;

  elements.aiPanel.hidden = true;

  if (wasOpen) {
    elements.gogglePanel.hidden = true;
    return;
  }

  await copyGoggle({ openPanel: true });
  elements.gogglePanel.scrollIntoView({ behavior: "smooth", block: "start" });
});
elements.downloadGoggleButton.addEventListener("click", downloadGoggle);

async function initialize() {
  try {
    data = await buildDataset();

    elements.loading.textContent =
      `Loaded ${data.organizations.length} organizations from the public spreadsheet.`;
    elements.controls.hidden = false;

    renderControls();
    layoutFacetColumns();
    applySelectionStateFromUrl();
    refreshCountsAndSummary();
    renderDiagnostics();
  } catch (error) {
    elements.loading.hidden = true;
    elements.error.textContent =
      "Could not load the public spreadsheet. Confirm that the Google Sheet is publicly readable. " +
      `(${error.message})`;
  }
}

initialize();


window.addEventListener("popstate", () => {
  if (!data) return;

  document.querySelectorAll("input[data-facet-category]").forEach((input) => {
    input.checked = false;
  });

  document.querySelectorAll('input[name="pageList"]').forEach((input) => {
    input.checked = input.value === "__HOMEPAGES__";
  });

  applySelectionStateFromUrl();
  refreshCountsAndSummary();

  if (!elements.resultsPanel.hidden) renderSelectedPages();
  if (!elements.gogglePanel.hidden) refreshGogglePanel();
});
