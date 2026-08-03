# Verify — NEXT marker redesign

**Plan:** `plans/next-marker-redesign/plan.md`  
**Generated:** 2026-08-02  
**Status:** `in review`

---

## How to use this file

This checklist was generated from `updates.md` entries after all steps completed.
Go through each file, open it, and check the box when satisfied.
Add a note if something needs fixing — then decide whether it's a new `fix/` or an additional step.

Post-verify polish is logged in [[../../hotfixes.md]] (2026-08-03). Review against the **current** UI, not the original step descriptions.

---

## Files to review

### Step-001: Month-precision dates + tentative flag + events

- [ ] `js/timeline-data.js`  
  _Why: `YYYY-MM` + `tentative`; events titled `A/V performance` + city; Tapelet 1.0 — confirm month-precision stays off the strip_

- [ ] `js/timeline.js`  
  _Why: Date helpers, always-`_coming` head, month-precision strip filter, `/music` "More details soon." fallback_

### Step-002 / polish: Coming marker motion

- [ ] `css/style.css`  
  _Why: Ellipsis gone; breathing brackets on small marker; **no ping circles** (removed in hotfix) — confirm reduced-motion still quiet_

### Step-003 / polish: Upcoming vertical list

- [ ] `js/timeline.js` / `css/style.css` (list chrome)  
  _Why: Format `MM/YY - title - city [tbc]`; green fade by closeness; no emoji_

### Step-004: Cache-busters

- [ ] `index.html`  
  _Why: Homepage CSS/JS/data `?v=` bumped through polish — confirm `/music` pins unchanged_

---

## Overall checklist

- [ ] All steps have a corresponding `updates.md` entry
- [ ] Hotfix polish logged in `hotfixes.md`
- [ ] Label reads `COMING NEXT` with breathing brackets (no ellipsis, no ping rings)
- [ ] Up to 3 rows: `date - title - location [tbc]` when tentative
- [ ] `YYYY-MM` + `tentative` work; month-precision excluded from strip nodes
- [ ] `/music` lists month-precision live events under Upcoming
- [ ] Animation off when reduced-motion is preferred
- [ ] Homepage cache-busters bumped
- [ ] No new scope beyond NEXT redesign + documented polish

---

## Outcome

**Result:** _pending human review (PR)_

**Issues:**
_List anything that needs follow-up. Each issue should become a new entry in `fixes/` or a new plan step._

---

## Related

- [[plan.md]]
- [[updates.md]]
- [[brief.md]]
- [[proposal.md]]
- [[../../coordinator.md]]
- [[../../hotfixes.md]]
