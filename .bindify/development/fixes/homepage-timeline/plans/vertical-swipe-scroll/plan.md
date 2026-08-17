# Plan: Vertical swipe scrolls homepage timeline

**Feature:** `.bindify/development/fixes/homepage-timeline/`  
**Plan Folder:** `plans/vertical-swipe-scroll/`  
**Generated From:** approved `proposal.md` (+ `brief.md`)  
**Date:** 2026-07-25

## Discussion Summary

- Mobile Safari users must swipe horizontally; vertical swipes are ignored by the touch handler.
- Desktop already maps wheel-down to deeper timeline scroll via `window` `wheel` listener.
- Selected approach: keep axis-lock, map `'y'` onto `scrollLeft`, free native pan via `touch-action: pinch-zoom`, bump homepage cache-busters.

## Scope

- In scope: `js/timeline.js` touchmove mapping; `.universe-strip` `touch-action`; `index.html` `?v=` for CSS + `timeline.js`
- Out of scope: wheel/mouse/arrows; `/music` page versions; timeline data/rendering

## Risks and Assumptions

- Risks: Safari may still cache aggressively; real device needed for final proof
- Assumptions: single-finger touch path already bails on multi-touch; scroll event still fires when setting `scrollLeft`

## Execution Steps

### Step-001: Map vertical swipe onto scrollLeft
**Goal:** Vertical swipes drive the timeline horizontally with desktop-equivalent direction.
**Inputs/Dependencies:** approved `proposal.md`; `js/timeline.js` touch handlers
**Implementation Tasks:**
- In strip `touchmove`, after axis lock, use `dx` for `'x'` and `dy` for `'y'`
- Set `strip.scrollLeft = touchStartScroll - delta` and `preventDefault`
- Keep axis-lock and multi-touch bail unchanged
**Expected Outputs:**
- `js/timeline.js`
**Done Criteria:**
- `'y'` axis no longer early-returns; swipe-up increases `scrollLeft`

### Step-002: Allow vertical gestures to reach JS
**Goal:** Stop Safari from claiming pan on `.universe-strip` while keeping pinch-zoom.
**Inputs/Dependencies:** Step-001; `css/style.css` `.universe-strip` rule
**Implementation Tasks:**
- Change `touch-action: pan-x` to `touch-action: pinch-zoom`
- Leave overflow / overscroll-behavior rules unchanged
**Expected Outputs:**
- `css/style.css`
**Done Criteria:**
- `.universe-strip` uses `touch-action: pinch-zoom`

### Step-003: Bump homepage cache-busters
**Goal:** Mobile Safari loads the new CSS and timeline.js.
**Inputs/Dependencies:** Step-001 and Step-002 complete
**Implementation Tasks:**
- Bump `css/style.css?v=` and `js/timeline.js?v=` on `index.html` (11 → 12)
- Do not change `/music` versions
**Expected Outputs:**
- `index.html`
**Done Criteria:**
- Homepage CSS and timeline.js query params are `v=12`

## Related

- [[brief.md]]
- [[proposal.md]]
- [[updates.md]]
- [[../../coordinator.md]]
