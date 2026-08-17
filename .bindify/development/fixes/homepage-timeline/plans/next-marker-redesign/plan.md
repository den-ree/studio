# Plan: NEXT marker redesign

**Feature:** `.bindify/development/fixes/homepage-timeline/`  
**Plan Folder:** `plans/next-marker-redesign/`  
**Generated From:** approved `proposal.md` (+ `brief.md`)  
**Date:** 2026-08-02

## Discussion Summary

- Homepage NEXT placeholder uses an animated ellipsis; want a sci-fi target-lock feel instead.
- Decide to surface upcoming shows/releases as a dim vertical list under NEXT (max 3).
- Tentative items use 🤞 ("fingers crossed" / possibly might happen).
- Selected animation: target lock (breathing brackets + radar ping; fixed cross).

## Scope

- In scope: `js/timeline-data.js` month dates + tentative + three events; `js/timeline.js` date helpers, head/list rendering, `/music` month-precision Upcoming; `css/style.css` target-lock + list styles; `index.html` homepage `?v=` bumps
- Out of scope: scroll/swipe handlers; layout constants; past-event redesign; tentative detail pages; `/music` cache pins

## Risks and Assumptions

- Risks: taller NEXT block on small viewports; 🤞 aesthetic may need a later swap
- Assumptions: month-precision anchors to day 1 for sort/upcoming; always-`_coming` head is acceptable even when a full-date upcoming exists

## Execution Steps

### Step-001: Month-precision dates + tentative flag + events
**Goal:** Data and date helpers support `YYYY-MM` and `tentative`; three upcoming events exist; month-precision excluded from strip nodes.
**Inputs/Dependencies:** approved `proposal.md`; `js/timeline-data.js`; `js/timeline.js` date helpers + `initUniverse`
**Implementation Tasks:**
- Document `YYYY-MM` and optional `tentative` in the data file header
- Extend `isUpcoming`, `eventDays`, `universeDate`, `logDate` for month precision
- Prepend Tapelet 1.0 (`2026-08`, software), Performance Rotterdam (`2026-09`, live, tentative), Performance Amsterdam (`2026-10`, live, tentative)
- Strip layout: filter out month-precision events; always use `_coming` head (stop promoting `nextUpcoming` into the head)
- `/music`: month-precision live events appear under Upcoming (with "more details soon" when tentative / month-only)
**Expected Outputs:**
- `js/timeline-data.js`
- `js/timeline.js`
**Done Criteria:**
- Month-precision upcoming detected; strip has no month-precision nodes; three new events in data

### Step-002: Target-lock animation
**Goal:** Replace ellipsis with ping ring + breathing brackets; title is `next.`.
**Inputs/Dependencies:** Step-001; `buildNode` `_coming` branch; `.tl-node--coming` CSS
**Implementation Tasks:**
- Remove `tl-node__ellipsis` span and `tl-coming-ellipsis` keyframes
- Set coming title text to `next.`
- Add `tl-node__ping` inside the coming marker; animate scale/opacity ~2.4s
- Animate coming marker `::before`/`::after` translateX breathe on the same rhythm
- Gate animations with `@media (prefers-reduced-motion: no-preference)`
**Expected Outputs:**
- `js/timeline.js`
- `css/style.css`
**Done Criteria:**
- No ellipsis animation; coming marker shows ping + breathe under reduced-motion off

### Step-003: Upcoming vertical list under NEXT
**Goal:** Dim max-3 list under NEXT with 🤞 on tentative rows.
**Inputs/Dependencies:** Step-001 upcoming set; Step-002 coming node structure
**Implementation Tasks:**
- Build `tl-node__upnext` from up to 3 soonest upcoming events
- Row format: title — short month; append 🤞 when `tentative`; optional "more details soon" sub-hint
- Style small, dim, monospace; tentative marker slightly dimmer
**Expected Outputs:**
- `js/timeline.js`
- `css/style.css`
**Done Criteria:**
- Homepage shows up to three upcoming rows under NEXT with tentative markers

### Step-004: Bump homepage cache-busters
**Goal:** Safari loads updated CSS, timeline.js, and timeline-data.js.
**Inputs/Dependencies:** Steps 001–003 complete
**Implementation Tasks:**
- Bump `css/style.css`, `js/timeline-data.js`, and `js/timeline.js` `?v=` on `index.html` (13 → 14)
- Do not change `/music` versions
**Expected Outputs:**
- `index.html`
**Done Criteria:**
- Homepage pins are `v=14` for the three assets

## Related

- [[brief.md]]
- [[proposal.md]]
- [[updates.md]]
- [[verify.md]]
- [[../../coordinator.md]]
