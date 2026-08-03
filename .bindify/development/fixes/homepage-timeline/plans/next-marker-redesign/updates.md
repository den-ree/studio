## Updates Log — NEXT marker redesign

**Feature:** homepage-timeline  
**Plan:** `plans/next-marker-redesign/plan.md`  
**Created:** 2026-08-02T21:23:05Z

### Feature Overview

- Replace the homepage NEXT ellipsis with a target-lock animation and surface up to three upcoming items under the marker.
- Outcome: month-precision + tentative data support; always-`_coming` head; sci-fi ping/breathe marker; dim upcoming list.

---

## [2026-08-02T21:23:05Z] Step-001: Month-precision dates + tentative flag + events

### Summary

- Added `YYYY-MM` date support and optional `tentative` to the timeline data contract.
- Prepended Tapelet 1.0, Performance Rotterdam, Performance Amsterdam.
- Strip always uses `_coming` head; month-precision events excluded from strip nodes; `/music` shows them under Upcoming.

### File Changes

- `js/timeline-data.js` — documented `YYYY-MM` + `tentative`; prepended three upcoming events
- `js/timeline.js:hasMonthDate()` / `isUpcoming()` / `universeDate()` / `logDate()` / `shortMonth()` / `eventDays()` — month-precision helpers
- `js/timeline.js:upcomingSorted()` / `initUniverse()` — always-`_coming` head with `_upnext`; filter `hasMonthDate` from strip rest
- `js/timeline.js:buildRow()` — "More details soon." fallback for tentative / month-precision upcoming

### Key Components

- Methods: `hasMonthDate()`, `upcomingSorted()`, `isUpcoming()`, `eventDays()`, `initUniverse()`, `buildRow()`
- Properties: `ev.tentative`, `head._upnext`

### Impact & Connections

- Data contract expands: consumers of `TIMELINE_EVENTS` must treat month dates as upcoming when `YYYY-MM >= current month`.
- Homepage strip no longer promotes the soonest full-date upcoming into the head node — the NEXT waypoint is always the placeholder.
- `/music` Upcoming now includes month-precision live events. add-timeline-event skill still documents full dates primarily; header comment in data file is the contract source for this plan.
- Assumption: month-precision anchors to day 1 for sort/spacing math even though those events never become strip nodes.

### Architecture

- `modified` [[architecture/data/timeline-events]] — month-precision dates + tentative flag; three upcoming events
- `modified` [[architecture/modules/timeline-renderer]] — date helpers + strip head/rest selection
- `touches` [[architecture/modules/homepage-universe]] — NEXT head is always the coming placeholder

### Notes

- Decisions: always-`_coming` head even when full-date upcoming exists; month-precision off-strip only.
- Follow‑ups: Step-002 target-lock animation; Step-003 render `_upnext` list.

---

## [2026-08-02T21:28:00Z] Step-002: Target-lock animation

### Summary

- Replaced ellipsis with target-lock: ping ring expands from the coming marker; brackets breathe outward; `+` stays fixed.
- Coming title is now `next.` (CSS uppercases to `NEXT.`).
- Animations gated behind `prefers-reduced-motion: no-preference`.

### File Changes

- `js/timeline.js:buildNode()` — remove `tl-node__ellipsis`; add `tl-node__ping`; title text `next.`
- `js/timeline.js:initUniverse()` — synthetic head `title` aligned to `next.`
- `css/style.css` — removed `tl-coming-ellipsis`; added `tl-coming-ping`, `tl-coming-breathe-left/right`, `.tl-node__ping`

### Key Components

- Selectors: `.tl-node--coming .tl-node__ping`, `.tl-node--coming .tl-node__marker::before/::after`
- Keyframes: `tl-coming-ping`, `tl-coming-breathe-left`, `tl-coming-breathe-right`

### Impact & Connections

- Visual-only change to the NEXT waypoint; polyline still anchors on `.tl-node__marker`.
- Reduced-motion users see a static marker (ping hidden; no breathe).
- No data-contract change. Blast radius limited to coming-node chrome.

### Architecture

- `modified` [[architecture/modules/timeline-renderer]] — coming-node marker animation markup/CSS
- `touches` [[architecture/modules/homepage-universe]] — NEXT waypoint presentation

### Notes

- Decisions: ~2.4s shared period for ping + breathe; bracket travel ±2px.
- Follow‑ups: Step-003 upcoming list styles (list markup may already be present from shared buildNode pass).

---

## [2026-08-02T21:28:30Z] Step-003: Upcoming vertical list under NEXT

### Summary

- Rendered dim `tl-node__upnext` list (max 3) under NEXT from `head._upnext`.
- Tentative rows append 🤞 and a "more details soon" sub-hint.

### File Changes

- `js/timeline.js:buildNode()` — build `ul.tl-node__upnext` rows with title — month + optional hope/hint
- `css/style.css` — `.tl-node__upnext*` styles; coming `max-width` 260px for list width

### Key Components

- Methods: `buildNode()` coming branch; `shortMonth()`
- Selectors: `.tl-node__upnext`, `.tl-node__upnext-item`, `.tl-node__upnext-hope`, `.tl-node__upnext-hint`

### Impact & Connections

- Homepage NEXT becomes the preview surface for upcoming data; strip nodes still carry full-date history.
- Tentative marker is presentation-only (`ev.tentative`); swapping 🤞 later does not require data-model change.
- Taller coming node may sit closer to strip bottom on small phones — watch overflow; COMING_Y unchanged this plan.

### Architecture

- `modified` [[architecture/modules/timeline-renderer]] — upcoming list under coming node
- `touches` [[architecture/data/timeline-events]] — reads upcoming + tentative for list rows
- `touches` [[architecture/modules/homepage-universe]] — NEXT chrome gains vertical list

### Notes

- Decisions: hint only on tentative rows (not every month-precision item); Tapelet stays without 🤞.
- Follow‑ups: Step-004 cache-buster bump.

---

## [2026-08-02T21:29:00Z] Step-004: Bump homepage cache-busters

### Summary

- Homepage CSS, `timeline-data.js`, and `timeline.js` query params bumped `13` → `14`.
- `/music` left untouched (out of scope).

### File Changes

- `index.html:14` — `css/style.css?v=14`
- `index.html:73-74` — `js/timeline-data.js?v=14`, `js/timeline.js?v=14`

### Key Components

- Assets: homepage stylesheet link; timeline script tags

### Impact & Connections

- Required for Safari to observe Steps 001–003. Aligns with static cache-busting standard.
- No breaking contract; other pages keep independent version pins.

### Architecture

- `touches` [[architecture/standards/static-cache-busting]] — homepage pins advanced for three assets
- `touches` [[architecture/modules/homepage-universe]] — loads bumped CSS/JS/data

### Notes

- Decisions: bumped all three homepage timeline assets in lockstep.
- Follow‑ups: human verify on desktop + mobile Safari + reduced-motion + `/music` Upcoming.

---

## Related

- [[plan.md]]
- [[brief.md]]
- [[proposal.md]]
- [[verify.md]]
- [[../../coordinator.md]]
