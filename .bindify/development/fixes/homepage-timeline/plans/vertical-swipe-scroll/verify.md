# Verify — Vertical swipe scrolls homepage timeline

**Plan:** `plans/vertical-swipe-scroll/plan.md`  
**Generated:** 2026-07-25  
**Status:** `pending`

---

## How to use this file

This checklist was generated from `updates.md` entries after all steps completed.
Go through each file, open it, and check the box when satisfied.
Add a note if something needs fixing — then decide whether it's a new `fix/` or an additional step.

---

## Files to review

### Step-001: Map vertical swipe onto scrollLeft

- [ ] `js/timeline.js`  
  _Why: Vertical axis now sets `scrollLeft` — confirm swipe up goes deeper and horizontal swipe still pans; axis-lock still prevents diagonal jitter_

---

### Step-002: Allow vertical gestures to reach JS

- [ ] `css/style.css`  
  _Why: `.universe-strip` is `pinch-zoom` — confirm single-finger vertical swipe reaches JS and two-finger pinch still zooms_

---

### Step-003: Bump homepage cache-busters

- [ ] `index.html`  
  _Why: CSS and `timeline.js` are `?v=12` — confirm `/music` versions were not changed and `timeline-data.js` stays at prior pin_

---

## Overall checklist

- [ ] All steps have a corresponding `updates.md` entry
- [ ] No unresolved notes flagged in any update
- [ ] Vertical swipe on the strip drives `scrollLeft` (swipe up → deeper)
- [ ] Horizontal swipe behavior unchanged
- [ ] Native pinch-zoom still available; JS owns single-finger pan
- [ ] Homepage cache-busters bumped for changed CSS/JS
- [ ] Wheel / mouse drag / arrows still work (desktop regression)
- [ ] No console errors
- [ ] No new scope was introduced during apply

---

## Outcome

**Result:** _pending human sign-off_

**Issues:**

- [ ] Issue: Real-device iPhone Safari not yet confirmed  
  → Action: Owner checks after deploy

---

## Related

- [[plan.md]]
- [[updates.md]]
- [[brief.md]]
- [[proposal.md]]
- [[../../coordinator.md]]
