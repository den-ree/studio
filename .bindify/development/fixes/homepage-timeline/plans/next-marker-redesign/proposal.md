# Proposal — NEXT marker redesign

**Brief:** `plans/next-marker-redesign/brief.md`  
**Generated:** 2026-08-02  
**Status:** `approved`

---

## Approach

Keep the synthetic `_coming` head node as the permanent NEXT waypoint (never promote a real event into the head). Replace the ellipsis with a CSS target-lock treatment: a ping ring expands from the marker while the bracket pseudo-elements breathe outward; the `+` cross stays fixed. Derive a max-3 upcoming list from `TIMELINE_EVENTS` (soonest first) and render it under the NEXT title. Extend the data model with `YYYY-MM` dates and optional `tentative: true` (🤞). Month-precision events appear in the list and on `/music` Upcoming only — not as strip nodes.

---

## Options considered

### Option A — Target lock (ping + breathe) ✅ recommended

Brackets breathe; faint radar ring expands; cross fixed. Sci-fi nav / waypoint feel.

**Tradeoffs:**
- Pro: Matches the existing bracket marker; readable as "acquiring next destination"
- Con: Slightly more CSS than a cross-only pulse

### Option B — Orbit scanner

Dot/line sweeps inside the brackets.

**Tradeoffs:**
- Pro: Strong "finding coordinates" metaphor
- Con: Busier; weaker "locked destination" read; rejected for first pass

### Option C — Cross-only animation

Static brackets; animate the `+` only.

**Tradeoffs:**
- Pro: Minimal CSS
- Con: Less distinctive; rejected in favor of target lock

---

## Proposed steps

| Step | Description | Outputs |
|---|---|---|
| 1 | Month-precision dates, `tentative` flag, three upcoming events; exclude month-precision from strip | `js/timeline-data.js`, `js/timeline.js` |
| 2 | Replace ellipsis with target-lock marker animation | `js/timeline.js`, `css/style.css` |
| 3 | Vertical upcoming list under NEXT with 🤞 for tentative | `js/timeline.js`, `css/style.css` |
| 4 | Bump homepage cache-busters; ready for human verify | `index.html` |

---

## Risks and unknowns

- Taller NEXT node (list under title) may crowd the strip vertically — watch COMING_Y / overflow on small phones
- 🤞 may feel odd in the terminal aesthetic; easy to swap later without data-model change
- Month-precision sorting vs full dates: anchor month to day 1 for comparisons

---

## Human review

**Decision:** `approved`

**Changes to approach:**
_None — decisions confirmed in session: target-lock animation, upcoming list, keep 🤞 for tentative._

**Changes to steps:**
_None._

**Notes for the agent:**
_Always use `_coming` head (list replaces single-event head promotion). Follow bindify: append `updates.md` after each step; do not edit `plan.md` during apply. Bump `timeline-data.js` cache pin with CSS/JS._

---

## Related

- [[brief.md]]
- [[plan.md]]
- [[updates.md]]
- [[verify.md]]
- [[../../coordinator.md]]
