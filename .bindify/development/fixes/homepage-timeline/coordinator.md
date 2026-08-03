# Coordinator — Homepage timeline

**Feature:** homepage-timeline  
**Category:** fixes  
**Status:** `verify`  
**Updated:** 2026-08-03

---

## Intent

Homepage universe interaction and NEXT waypoint presentation: vertical swipe driving the horizontal timeline, plus a clearer NEXT marker (breathing brackets + upcoming preview list).

---

## Decisions

- Keep axis-lock on first movement; map `'y'` axis onto `scrollLeft` instead of ignoring it.
- Change `.universe-strip` `touch-action` from `pan-x` to `pinch-zoom` so JS owns both axes while pinch-zoom still works.
- Bump homepage asset cache-busters so Safari picks up CSS/JS changes.
- NEXT label: `COMING NEXT`; brackets breathe; radar ping circles removed after review.
- Upcoming list under NEXT (max 3): format `MM/YY - title - city [tbc]` when tentative.
- Tentative marker: `[tbc]` (replaced 🤞 after perception review).
- Support `YYYY-MM` dates; month-precision events stay off the strip nodes.
- Swipe hint: static (no blink).

---

## Plans

| Plan | Status |
|---|---|
| [[plans/vertical-swipe-scroll/plan.md]] | `done` / verify |
| [[plans/next-marker-redesign/plan.md]] | `verify` → preparing PR |

---

## Session log

### 2026-08-03 — Polish + prepare PR

**Discussed:**
Ping radius/speed, bracket size, list copy format, 🤞 vs `[tbc]` perception, then prepare a product PR via bindify.

**Decided:**
No radar circles; breathing brackets only. List format `date - title - location [tbc]`. Dates as `MM/YY`. Replace 🤞 with `[tbc]`. Log polish in `hotfixes.md` and open PR from `main`.

**Pivots:**
Dropped target-lock ping rings; tentative marker changed from emoji to `[tbc]`.

**Next:**
Open product PR; human sign-off on `verify.md`.

**Linked plan:** `plans/next-marker-redesign/` — `verify`

### 2026-08-02 — Apply next-marker-redesign

**Discussed:**
Bindify apply of NEXT marker redesign after approving target-lock + upcoming list + 🤞.

**Decided:**
Executed Step-001 → Step-004; `verify.md` generated for human sign-off.

**Next:**
Human review on homepage + `/music` + reduced-motion.

**Linked plan:** `plans/next-marker-redesign/` — `verify`

### 2026-08-02 — NEXT marker redesign plan

**Discussed:**
Replace animated ellipsis on the homepage NEXT placeholder; whether to show upcoming shows/releases under NEXT; animation options (rotate brackets, animate cross, sci-fi nav).

**Decided:**
Target-lock animation (ping + breathe). Vertical upcoming list (max 3) auto-derived from timeline data. Keep 🤞 for tentative ("possibly might happen"). Bindify plan folder `plans/next-marker-redesign/`.

**Next:**
Apply Step-001 → Step-004 via bindify iterate + updates logging.

**Linked plan:** `plans/next-marker-redesign/` — `in progress`

### 2026-07-25 — Apply vertical-swipe-scroll

- Source plan: Claude plan `can-u-implement-fix-purrfect-prism.md`
- Bindify plan: `plans/vertical-swipe-scroll/`
- Status moved to `in progress`; executing Step-001 → Step-003 with `updates.md` logging

---

## Related

- [[plans/vertical-swipe-scroll/brief.md]]
- [[plans/vertical-swipe-scroll/proposal.md]]
- [[plans/vertical-swipe-scroll/plan.md]]
- [[plans/vertical-swipe-scroll/updates.md]]
- [[plans/next-marker-redesign/brief.md]]
- [[plans/next-marker-redesign/proposal.md]]
- [[plans/next-marker-redesign/plan.md]]
- [[plans/next-marker-redesign/updates.md]]
- [[plans/next-marker-redesign/verify.md]]
- [[hotfixes.md]]
