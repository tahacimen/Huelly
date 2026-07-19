# Huely

Hyper-casual color sequence matching game. Single-file HTML/CSS/JS prototype — no build step required.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Structure

- `index.html` — the entire game (styles, markup, and logic in one file)

## Tech notes

- **Storage** is layered so progress survives everywhere: `window.storage` (Claude
  Artifacts) → `localStorage` (real browsers + Android WebView) → in-memory fallback.
  A published build persists via `localStorage`.
- **Global leaderboard** runs on Supabase (project `Huely`, region `eu-central-1`),
  called directly over the REST API — no SDK, so the single-file build stays intact.
  All writes go through the `submit_score()` RPC (`SECURITY DEFINER`), which only ever
  raises a player's score, so a tampered client cannot lower anyone. The publishable
  key shipped in the client is safe by design; row-level security blocks direct writes.
  Offline play still saves locally and syncs on the next save.
- No external dependencies, no build tools.

## Roadmap

- [x] Localize UI to Turkish
- [x] Persistent local storage (works off-Claude / on Android)
- [x] Real global leaderboard (Supabase)
- [ ] Branding pass (icon, splash)
- [ ] Capacitor wrap for Android APK
- [ ] Balance tuning (Extreme tier at high levels is near-impossible)
