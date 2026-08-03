# Timeline renderer

**id:** `timeline-renderer`
**type:** `module`
**status:** `stable`
**repo:** `workroom`
**layer:** `domain`

---

## Responsibility

Renders `TIMELINE_EVENTS` into the homepage universe strip and the `/music` performance log. Owns layout of nodes, scroll/input helpers for the strip, and date formatting for both surfaces.

---

## Depends on

- [[architecture/data/timeline-events]] — event records to render

---

## Used by

- [[architecture/modules/homepage-universe]] — strip interaction + canvas
- [[architecture/system/denree-site]] — music page log

---

## Standards & patterns

- [[architecture/standards/static-cache-busting]] — script version query on pages that load it

---

## Change log

- 2026-07-25 — bootstrap skeleton
- 2026-07-25 — [[development/fixes/homepage-timeline/plans/vertical-swipe-scroll/updates.md]] — vertical touch axis maps onto strip `scrollLeft`
- 2026-08-02 — [[development/fixes/homepage-timeline/plans/next-marker-redesign/updates.md]] — month-precision helpers; target-lock coming marker; `_upnext` list; always-`_coming` head

---

## Related

- [[architecture/_map.md]]
- [[architecture/data/timeline-events]]
