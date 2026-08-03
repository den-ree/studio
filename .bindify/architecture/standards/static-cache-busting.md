# Static cache busting

**id:** `static-cache-busting`
**type:** `standard`
**status:** `stable`
**repo:** `workroom`

---

## Responsibility

HTML pages pin CSS/JS with `?v=N` query params so CDNs and mobile Safari pick up asset changes after deploys. Bump the version on any page that loads a changed asset.

---

## Depends on

_None._

---

## Used by

- [[architecture/modules/homepage-universe]]
- [[architecture/modules/timeline-renderer]]

---

## Standards & patterns

_N/A (this is a standard)._

---

## Change log

- 2026-07-25 — bootstrap skeleton
- 2026-07-25 — [[development/fixes/homepage-timeline/plans/vertical-swipe-scroll/updates.md]] — `index.html` CSS + `timeline.js` → `v=12`

---

## Related

- [[architecture/_map.md]]
