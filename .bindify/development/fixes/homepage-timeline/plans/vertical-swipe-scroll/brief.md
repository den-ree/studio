# Brief — Vertical swipe scrolls homepage timeline

**Feature:** homepage-timeline  
**Plan path:** `.bindify/development/fixes/homepage-timeline/plans/vertical-swipe-scroll/`  
**Created:** 2026-07-25  
**Status:** `ready for proposal`

---

## Problem statement

The homepage universe is viewport-locked with a horizontal timeline. Desktop wheel-down scrolls the timeline deeper. On mobile Safari, the touch handler axis-locks and **drops vertical swipes**, so users must swipe horizontally. Vertical swipe should mirror desktop wheel behavior.

---

## Goals

- [ ] Vertical swipe on the strip drives `scrollLeft` (swipe up → deeper)
- [ ] Horizontal swipe behavior unchanged
- [ ] Native pinch-zoom still available; JS owns single-finger pan
- [ ] Mobile Safari picks up CSS/JS via cache-buster bump on homepage

---

## Out of scope

- Not in scope: redesign of desktop wheel/mouse drag/arrow controls
- Not in scope: `/music` page layout or its older cache-buster versions
- Not in scope: changing timeline data or node rendering

---

## Constraints

- Keep existing axis-lock (prevents diagonal jitter)
- Prefer `touch-action: pinch-zoom` over `none` so two-finger zoom remains
- Repo-relative paths only in bindify docs; no code dumps in plan files

---

## Inputs available

- `js/timeline.js` — wheel + touch handlers on `#timelineStrip`
- `css/style.css` — `.universe-strip` touch/overflow rules
- `index.html` — stylesheet + timeline script `?v=` query params

---

## Success criteria

- Vertical swipe in touch emulation scrolls the timeline horizontally
- Horizontal swipe still pans
- Wheel / mouse drag / arrows unchanged
- No console errors
- Cache-busters bumped on homepage for changed assets

---

## Open questions

- None for apply; real-device iPhone Safari confirmation after deploy

---

## Related

- [[proposal.md]]
- [[plan.md]]
- [[updates.md]]
- [[../../coordinator.md]]
