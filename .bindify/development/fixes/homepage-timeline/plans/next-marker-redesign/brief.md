# Brief — NEXT marker redesign

**Feature:** homepage-timeline  
**Plan path:** `.bindify/development/fixes/homepage-timeline/plans/next-marker-redesign/`  
**Created:** 2026-08-02  
**Status:** `ready for proposal`

---

## Problem statement

The homepage universe shows a static `[ + ]` marker with "next is coming" and an animated ellipsis when there is no single promoted upcoming node. That placeholder feels idle rather than navigational, and half-known future shows/releases have no place to surface under NEXT without inventing full dates or cluttering the strip.

---

## Goals

- [ ] Replace the ellipsis with a target-lock animation (breathing brackets + radar ping; fixed cross)
- [ ] Show a dim vertical list of up to 3 upcoming items under NEXT
- [ ] Support month-precision dates (`YYYY-MM`) and a `tentative` flag with 🤞 marker
- [ ] Keep strip layout free of month-precision nodes; respect `prefers-reduced-motion`
- [ ] Bump homepage cache-busters so Safari picks up CSS/JS/data changes

---

## Out of scope

- Not in scope: scroll/swipe input handling or node layout constants
- Not in scope: past-event rendering redesign
- Not in scope: detail pages/links for tentative shows
- Not in scope: `/music` independent cache-buster pins

---

## Constraints

- CSS-only animation; disabled under `prefers-reduced-motion: reduce`
- Upcoming list auto-derived from `js/timeline-data.js` (max 3, soonest first)
- Month-precision events feed the NEXT list (and `/music` Upcoming) only — not strip nodes
- Repo-relative paths only in bindify docs; no code dumps in plan files

---

## Inputs available

- `js/timeline.js` — `buildNode`, `initUniverse`, `isUpcoming`, date helpers, `/music` log
- `js/timeline-data.js` — `window.TIMELINE_EVENTS` source of truth
- `css/style.css` — `.tl-node--coming`, ellipsis keyframes, marker/cross styles
- `index.html` — homepage `?v=` pins for CSS + timeline scripts
- `.bindify/architecture/modules/homepage-universe.md` / `timeline-renderer.md` / `data/timeline-events.md`

---

## Success criteria

- Placeholder reads `NEXT.` with target-lock animation (no ellipsis)
- Up to 3 upcoming rows under NEXT; tentative rows show 🤞 and may hint "more details soon"
- `YYYY-MM` + `tentative` work in data; month-precision excluded from strip nodes
- `/music` lists month-precision live events under Upcoming
- Animation off when reduced-motion is preferred
- Homepage CSS/JS/data cache-busters bumped

---

## Open questions

- None for apply — 🤞 tentative marker kept for first pass; can swap to `Sep?` / `~` later if it feels off

---

## Related

- [[proposal.md]]
- [[plan.md]]
- [[updates.md]]
- [[verify.md]]
- [[../../coordinator.md]]
