# Proposal — Vertical swipe scrolls homepage timeline

**Brief:** `plans/vertical-swipe-scroll/brief.md`  
**Generated:** 2026-07-25  
**Status:** `approved`

---

## Approach

Extend the existing touch axis-lock in `js/timeline.js` so the `'y'` axis maps onto `scrollLeft` with the same sign convention as desktop wheel-down (swipe up → deeper). Relax `.universe-strip` `touch-action` from `pan-x` to `pinch-zoom` so Safari does not claim pans natively while JS drives both axes. Bump homepage `?v=` for CSS and the changed timeline script.

---

## Options considered

### Option A — Map vertical delta onto scrollLeft ✅ recommended

Keep axis-lock; use `dx` or `dy` based on locked axis.

**Tradeoffs:**
- Pro: Mirrors desktop wheel; minimal change; preserves diagonal jitter guard
- Con: Overrides native vertical gesture on the strip (acceptable — page is viewport-locked)

### Option B — Remove axis-lock and always use dominant delta each move

**Tradeoffs:**
- Pro: Slightly more fluid
- Con: Diagonal jitter returns; rejected in source plan

---

## Proposed steps

| Step | Description | Outputs |
|---|---|---|
| 1 | Map vertical swipe delta onto `scrollLeft` in touchmove | `js/timeline.js` |
| 2 | Set `.universe-strip` `touch-action` to `pinch-zoom` | `css/style.css` |
| 3 | Bump homepage cache-busters for CSS + timeline.js | `index.html` |

---

## Risks and unknowns

- Mobile Safari quirks around `touchmove` cancelability — mitigated by `touch-action: pinch-zoom`
- Real-device confirmation still needed after deploy

---

## Human review

**Decision:** `approved`

**Changes to approach:**
_None — approved as specified in the Claude plan `can-u-implement-fix-purrfect-prism.md` via “implement this plan using /bindify updates”._

**Changes to steps:**
_Also bump `js/timeline.js?v=` (not only CSS) so Safari loads the new touch handler._

**Notes for the agent:**
_Do not change `/music` cache-busters. Log every step to `updates.md`._

---

## Related

- [[brief.md]]
- [[plan.md]]
- [[updates.md]]
- [[../../coordinator.md]]
