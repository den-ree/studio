## Updates Log — Vertical swipe scrolls homepage timeline

**Feature:** homepage-timeline  
**Plan:** `plans/vertical-swipe-scroll/plan.md`  
**Created:** 2026-07-25T20:58:35Z

### Feature Overview

- Mobile Safari ignored vertical swipes on the homepage universe; users had to swipe horizontally.
- Outcome: vertical swipe maps onto `scrollLeft` like desktop wheel-down; CSS lets JS own pan; homepage cache-busters bumped.

---

## [2026-07-25T20:58:35Z] Step-001: Map vertical swipe onto scrollLeft

### Summary

- Touch axis-lock kept; `'y'` axis now drives `scrollLeft` via `dy` (swipe up → deeper).
- Horizontal `'x'` path unchanged (`dx`).

### File Changes

- `js/timeline.js:315-320` — replace `'x'`-only early return with `delta = touchAxis === 'x' ? dx : dy` then `scrollLeft = touchStartScroll - delta`

### Key Components

- Methods: strip `touchmove` listener
- Properties/Enums: `touchAxis`, `touchStartScroll`, `dragMoved`

### Impact & Connections

- Same scroll path as mouse drag / wheel: hint fade and title hide still follow the strip `scroll` event.
- Assumptions: single-finger only (multi-touch still bails); sign of `dy` matches desktop wheel-down. No data-contract or `/music` log impact.
- Blast radius limited to homepage strip touch input; desktop listeners untouched.

### Architecture

- `modified` [[architecture/modules/timeline-renderer]] — touch → `scrollLeft` mapping now includes vertical axis
- `touches` [[architecture/modules/homepage-universe]] — strip interaction contract for mobile gestures

### Notes

- Decisions: kept axis-lock; did not remove early threshold (`6px`).
- Follow‑ups: Step-002 CSS `touch-action` so Safari does not claim pans.

---

## [2026-07-25T20:58:36Z] Step-002: Allow vertical gestures to reach JS

### Summary

- `.universe-strip` `touch-action` changed from `pan-x` to `pinch-zoom` so JS owns single-finger pan on both axes while pinch-zoom remains native.

### File Changes

- `css/style.css:1224` — `touch-action: pinch-zoom` on `.universe-strip`

### Key Components

- Selectors: `.universe-strip`

### Impact & Connections

- Without this, Safari may make `touchmove` non-cancelable / claim horizontal pan, defeating Step-001.
- Overflow and overscroll-behavior unchanged; page remains viewport-locked. No effect on `/music` list layout.
- Assumption: multi-touch still reaches browser for pinch because handler returns when `touches.length !== 1`.

### Architecture

- `modified` [[architecture/modules/homepage-universe]] — touch-action policy for the strip
- `touches` [[architecture/modules/timeline-renderer]] — depends on cancelable `touchmove` for custom scroll

### Notes

- Decisions: `pinch-zoom` over `none` per proposal.
- Follow‑ups: Step-003 cache-buster bump.

---

## [2026-07-25T20:58:37Z] Step-003: Bump homepage cache-busters

### Summary

- Homepage CSS and `timeline.js` query params bumped `11` → `12` so Safari loads both changes.
- `/music` left at `v=5` (out of scope).

### File Changes

- `index.html:14` — `css/style.css?v=12`
- `index.html:74` — `js/timeline.js?v=12`

### Key Components

- Assets: homepage stylesheet link; homepage timeline script tag

### Impact & Connections

- Required for mobile Safari to observe Steps 001–002; `timeline-data.js` remains `v=11` (unchanged).
- No breaking contract; other pages keep independent version pins.
- Aligns with static cache-busting standard.

### Architecture

- `touches` [[architecture/standards/static-cache-busting]] — homepage pins advanced for changed assets
- `touches` [[architecture/modules/homepage-universe]] — loads bumped CSS/JS

### Notes

- Decisions: also bumped `timeline.js` (proposal note) not only CSS.
- Follow‑ups: human verify on touch emulation + real iPhone Safari after deploy.

---

## [2026-07-25T21:53:13Z] Step-004: Momentum glide + rubber-band overscroll

### Summary

- Added iOS-like inertia: a flick keeps gliding after release and decelerates (free scroll, no snapping, per owner decision).
- Added rubber-band overscroll at both ends: resisted visual overshoot while dragging past 0/max, spring-back on release, and a bounce when a glide hits an edge.
- Introduced a single scroll-state writer so wheel, mouse drag, arrows, and touch cancel any running animation instead of fighting it.

### File Changes

- `js/timeline.js:239-333` — new helpers inside `initUniverse()`: `maxScroll()`, `cancelAnimation()`, `renderOvershoot()`, `setScroll(pos, allowOverscroll)`, `springBack()`, `bounce(peak)`, `startGlide(v)`; arrow click handlers now cancel animations first
- `js/timeline.js:335-345` — wheel handler routed through `setScroll` + `cancelAnimation`
- `js/timeline.js:348-356` — `mousedown` cancels a running glide before drag
- `js/timeline.js:395-463` — touch handlers: velocity tracking (smoothed px/ms along the locked axis), overshoot folded into `touchStartScroll` on `touchstart`, `touchmove` writes via `setScroll(..., true)`, shared `touchRelease` starts glide (>0.3 px/ms, skipped for stale holds and `prefers-reduced-motion`) or springs back overshoot

### Key Components

- Methods: `setScroll()`, `startGlide()`, `bounce()`, `springBack()`, `cancelAnimation()`, `touchRelease()`
- Properties: `overshoot`, `touchVelocity`, `animRaf`, `reduceMotion`

### Impact & Connections

- Native `strip.scrollLeft` stays clamped, so the existing strip `scroll` listener (hint fade + title hide) and `drawLines()` keep working unchanged; overscroll is rendered only as a `translateX` on `#tlCanvas`, which the SVG polyline lives inside.
- Assumption: only one animation runs at a time (`animRaf` slot); every input path must call `cancelAnimation()` first — future input handlers (e.g. keyboard) must follow the same contract.
- Desktop wheel feel intentionally unchanged (1:1, no momentum). Blast radius limited to the homepage strip; `/music` untouched.

### Architecture

- `modified` [[architecture/modules/timeline-renderer]] — strip gains a single-writer scroll model with momentum + overscroll animation
- `touches` [[architecture/modules/homepage-universe]] — interaction contract now includes glide/bounce states

### Notes

- Decisions: overshoot resistance `o / (1 + |o| / 150)`; glide decay `0.95^(dt/16)`; bounce peak capped at ±120 logical px; `prefers-reduced-motion` skips glide but keeps the spring-back.
- Follow‑ups: real iPhone Safari check after deploy.

---

## [2026-07-25T21:53:13Z] Step-005: Placeholder copy + cache-busters

### Summary

- `_coming` placeholder now reads "next is coming" (CSS renders it uppercase with the existing animated ellipsis).
- Homepage cache-busters bumped to `v=13` in lockstep, including `timeline-data.js`.

### File Changes

- `js/timeline.js:120` — placeholder text node `'next'` → `'next is coming'`
- `js/timeline.js:179` — synthetic head cosmetic `title` aligned to `'next is coming…'`
- `index.html:14` — `css/style.css?v=13`
- `index.html:73-74` — `js/timeline-data.js?v=13`, `js/timeline.js?v=13`

### Key Components

- Methods: `buildNode()` (`_coming` branch)
- Assets: homepage stylesheet link; timeline script tags

### Impact & Connections

- Copy-only + version pins; no logic or data-contract change. A real upcoming event in `timeline-data.js` still replaces the placeholder (unchanged logic).
- `/music` keeps its independent version pins.

### Architecture

- `touches` [[architecture/modules/timeline-renderer]] — placeholder label copy
- `touches` [[architecture/standards/static-cache-busting]] — homepage pins advanced for all three changed/served assets

### Notes

- Decisions: bumped `timeline-data.js` too so all homepage timeline assets share `v=13`.
- Follow‑ups: none.

---

## Related

- [[plan.md]]
- [[brief.md]]
- [[proposal.md]]
- [[verify.md]]
- [[../../coordinator.md]]
