# Homepage universe

**id:** `homepage-universe`
**type:** `module`
**status:** `evolving`
**repo:** `workroom`
**layer:** `ui`

---

## Responsibility

Viewport-locked homepage surface: horizontal timeline strip, hero title/hint chrome, and input mapping (wheel, mouse drag, touch, arrows) that scrolls the strip through time.

---

## Depends on

- [[architecture/modules/timeline-renderer]] — builds nodes into the strip canvas
- [[architecture/data/timeline-events]] — event source shown on the strip

---

## Used by

- [[architecture/system/denree-site]] — primary landing experience

---

## Standards & patterns

- [[architecture/standards/static-cache-busting]] — CSS/JS linked from `index.html`

---

## Change log

- 2026-07-25 — bootstrap skeleton
- 2026-07-25 — [[development/fixes/homepage-timeline/plans/vertical-swipe-scroll/updates.md]] — strip `touch-action` → `pinch-zoom`; homepage asset pins bumped
- 2026-08-02 — [[development/fixes/homepage-timeline/plans/next-marker-redesign/updates.md]] — NEXT target-lock animation + upcoming list under coming node; always-`_coming` head

---

## Related

- [[architecture/_map.md]]
- [[architecture/modules/timeline-renderer]]
