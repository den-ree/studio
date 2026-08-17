# Bindify — Agent Entry Point

Use this file as a quick entry point, not as the full specification.

- Canonical protocol lives in the Bindify skill (`SKILL.md`).
- Project history and plans live under `.bindify/development/` and `.bindify/history/`.
- Architecture object graph lives under `.bindify/architecture/`.

## Hard rules

- Never modify `plan.md` during apply; execution state belongs in `updates.md`.
- `updates.md` and `hotfixes.md` are append-only.
- Every update entry carries **Impact & Connections** + **Architecture** sections.
- Architecture object **Responsibility** is human-owned; `scan-architecture fill` only appends change-log lines and edges.
- Use repo-relative paths only.
- Keep context docs markdown-only (paths and symbols, not code dumps).
- When required input is missing or ambiguous, stop and ask.
