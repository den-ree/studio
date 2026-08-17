# Architecture Map — denree.nl

**id:** `architecture-map`
**type:** `system`
**status:** `evolving`
**repo:** `workroom`

---

## Overview

Static personal site for Den Ree (denree.nl): HTML/CSS/JS pages for homepage timeline universe, music log, software, about, and journal. No app server — pages are static assets. The homepage is a viewport-locked horizontal timeline driven by `js/timeline.js` from `js/timeline-data.js`.

---

## Layers

- **UI** — [[architecture/modules/homepage-universe]]
- **Domain** — [[architecture/modules/timeline-renderer]]
- **Data** — [[architecture/data/timeline-events]]

---

## Top-level objects

### Systems
- [[architecture/system/denree-site]]

### Modules & services
- [[architecture/modules/homepage-universe]]
- [[architecture/modules/timeline-renderer]]

### Data models
- [[architecture/data/timeline-events]]

### Standards & patterns
- [[architecture/standards/static-cache-busting]]

---

## Conventions

- One object = one file. Filenames are the object `id`.
- Edges are derived from `[[wiki-links]]` in **Depends on**, **Used by**, and **Standards & patterns**.
- Object **Responsibility** is stable; `scan-architecture fill` only appends to **Change log** and adds edges.

---

## Related

- [[architecture/system/denree-site]]
