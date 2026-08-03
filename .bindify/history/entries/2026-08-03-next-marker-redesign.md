# History Summary — Homepage COMING NEXT redesign

**Status:** `pr-open`  
**Date:** 2026-08-03  
**Primary Plan:** `development/fixes/homepage-timeline/plans/next-marker-redesign/plan.md`  
**Updates Log:** `development/fixes/homepage-timeline/plans/next-marker-redesign/updates.md`  
**PR:** https://github.com/den-ree/workroom/pull/9  
**Merge:** `pending`

---

## What Changed

- Homepage placeholder is now `COMING NEXT` with small breathing brackets (radar ping rings removed in review polish).
- Upcoming preview list under NEXT: `MM/YY - title - city [tbc]`, max 3, green fade by closeness.
- Timeline data gained `YYYY-MM` + `tentative`; month-precision events stay off the strip and appear on `/music` Upcoming.

---

## User / Feature Impact

- Visitors see a clearer near-future HUD instead of an idle ellipsis.
- Tentative shows are labeled `[tbc]` (to be confirmed) rather than emoji.
- First three upcoming items (Tapelet 1.0, Rotterdam/Amsterdam A/V) surface without inventing full dates as strip nodes.

---

## Architecture Impact

- `modified` [[architecture/modules/timeline-renderer]] — always-`_coming` head, list rendering, date helpers
- `modified` [[architecture/modules/homepage-universe]] — NEXT waypoint presentation
- `modified` [[architecture/data/timeline-events]] — month-precision + tentative contract
- `touches` [[architecture/standards/static-cache-busting]] — homepage `?v=` bumps

---

## Evidence

- `development/fixes/homepage-timeline/plans/next-marker-redesign/updates.md` — Steps 001–004
- `development/fixes/homepage-timeline/hotfixes.md` — post-verify polish (format, `[tbc]`, no circles)
- `development/fixes/homepage-timeline/plans/next-marker-redesign/plan.md`
- `development/fixes/homepage-timeline/plans/next-marker-redesign/verify.md`

---

## Related Features and Docs

- Features: `development/fixes/homepage-timeline/` — coordinator + vertical-swipe-scroll prior plan
- Docs/Research: none

---

## Follow-ups

- Human sign-off on `verify.md`
- Refresh this entry to `merged` after PR #9 lands

---

## Related

- [[../index.md]]
- [[../../development/fixes/homepage-timeline/plans/next-marker-redesign/plan.md]]
- [[../../development/fixes/homepage-timeline/plans/next-marker-redesign/updates.md]]
- [[../../development/fixes/homepage-timeline/plans/next-marker-redesign/verify.md]]
- [[../../development/fixes/homepage-timeline/hotfixes.md]]
- [[../../development/fixes/homepage-timeline/coordinator.md]]
