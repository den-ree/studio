---
name: add-timeline-event
description: Use when adding a performance, gig, show, release, track, software launch, or journal note to the denree.nl timeline — the homepage universe and the /music performance log. Also use when editing, reordering, or removing timeline events, or when a past show needs details filled in (date, venue, link, photo).
---

# Add a timeline event

All timeline content lives in **one file**: `js/timeline-data.js`. It drives both the homepage universe (`/`) and the performance log on `/music` (events with `type: 'live'` only — `public` talks/sessions stay on the homepage). Never add event HTML to `index.html` or `music/index.html` — they only contain the render containers.

## Workflow

1. **Prepend** a new object to `window.TIMELINE_EVENTS` in `js/timeline-data.js` — the array is ordered **newest first**, and node positions on the homepage are computed from array order.
2. If the event is notable (festival, museum programme, release), add a line to `llms.txt` (see the `review-blog-post` skill).
3. Verify (see below).

## Event fields

```js
{
    type: 'live',                  // REQUIRED: live | public | journal | software | release
    date: '2026-07-09',            // REQUIRED: 'YYYY-MM-DD', or 'YYYY' if only the year is known
    importance: 'major',           // optional: major | normal | minor (node size, see below)
    title: 'Event Name — Detail',  // REQUIRED: plain text, use real em dashes
    city: 'Rotterdam',             // optional, shown next to the date
    venue: 'Vondelbunker',         // optional, plain badge on /music
    link: 'https://...',           // optional: event page / tickets / recap / post / app
    description: 'One sentence.',  // optional, /music page only
    badges: ['livecoding', 'a/v'], // optional, /music page only
    images: ['/images/a.jpg',      // optional: 1-3 images pinned to the node as a
             '/images/b.jpg'],     //   photo stack; first image is on top
    imageFit: 'contain',           // optional, for screenshots/logos (no crop, dark padding)
    imageRatio: '6/5',             // optional: CSS aspect-ratio for the frame (width fixed,
                                   //   height follows), e.g. '2276/1898' from pixel size.
                                   // Use when asset isn't ~3:2
    chip: '▶ listen',              // optional media hint on the homepage node
}
```

## Importance (node size)

| Level | Use for | Marker |
|---|---|---|
| `major` | Main performances, festivals, museum programmes, premieres | big (44px) |
| `normal` (default) | Small events, app releases, tracks | 28px |
| `minor` | Blog/journal posts, small notes | 18px, muted title |

Journal events default to `minor`, everything else to `normal` — only set `importance` explicitly for `major` events or exceptions. Roughly 1 in 3-4 events should be major; if everything is major, nothing is.

## Rules

- **Upcoming is automatic.** An event with a full `YYYY-MM-DD` date in the future gets the green "upcoming" treatment on both pages, and moves to Past by itself after the show. Never add a manual upcoming flag. Year-only dates are never "upcoming".
- **Keep the array newest-first.** A future-dated event goes at the very top.
- **No placeholder text.** If the exact date is unknown, use the year (`'2025'`); if the venue is unknown, omit `venue`.
- **Types and colors:** `live` #2073FF dark blue (performances — shown on /music), `public` #5EEAD4 teal (talks, residencies, from-scratch sessions — homepage only), `journal` #52D0FA light blue (notes — also add the note itself per the `review-blog-post` skill), `software` #FF82D2 pink (app launches), `release` #B49CFF purple (tracks, records).
- **Badges:** `livecoding`, `ai`, `newmedia` render colored; anything else (`a/v`, `algorave`) renders plain. Badges appear on /music only.
- **Internal links** (`/journal/...`) open in the same tab; `https://` links open in a new tab — handled automatically.
- **Images:** up to 3 per event (extras are ignored); 2-3 render as a photo stack that fans out on hover. Landscape crops work best (thumbnails default to cover-cropped ~3:2). Use `imageFit: 'contain'` for screenshots/logos in the default 3:2 box (letterboxes). If you also set `imageRatio` from the asset’s pixel size (e.g. `'2276/1898'`), the frame matches the image and fills edge-to-edge — no crop, no gutter.

## Verify

```bash
python3 -m http.server 8000
```

- `http://localhost:8000/` — new node appears at the correct position (newest = leftmost, after the title screen on mobile), connected by lines, correct color; upcoming events blink green.
- `http://localhost:8000/music/` — `live` events appear under Upcoming/Past correctly with date, city, venue badge, and description.
- No console errors (`window.TIMELINE_EVENTS` must stay valid JS — watch for a missing comma).

## Common mistakes

| Mistake | Fix |
|---|---|
| Editing HTML in `index.html` / `music/index.html` | Events live only in `js/timeline-data.js` |
| Appending to the end of the array | Prepend — newest first |
| Manual "upcoming" flag or status field | Derived from `date` automatically |
| `date: 'TBD'` or invented dates | Year-only string `'2025'` is the fallback |
| Portrait photo looks cropped | That's expected (150×100 cover); pick a landscape-ish crop |
