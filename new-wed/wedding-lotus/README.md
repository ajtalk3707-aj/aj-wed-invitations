# Lotus Bloom — Animated Wedding Invitation Website (React + Vite + Framer Motion)

Theme: dark emerald night → ivory, marigold & lotus-pink. A full wedding website (not paged slides).

## Suspense opening
Dark emerald night with floating fireflies. Guests **tap three clay diyas** (Love · Joy · Togetherness).
Each lamp redraws a ring of a golden rangoli; the hint text changes each time.
When the third lamp is lit, a pink **lotus blooms** from the centre, light floods the screen and the
ivory invitation website appears. Music starts at the first tap.

## Website sections
Hero (toran, falling petals, live countdown, add-to-calendar) → I Invitation → II Events (swipe rail)
→ III Venue (map) → IV Family (accordion) → V RSVP form (sends via WhatsApp) + call.
Floating bottom dock for navigation; top bar with Gujarati/English switch + music.

## Run
    npm install
    npm run dev       # http://localhost:5173
    npm run build     # dist/ → upload to Vercel / Netlify

## Edit
`src/copy.js` → all text (gu + en), phone, map query, countdown date (`weddingISO`), music file option.
`src/styles.css` → colours at the top (`--em`, `--gold`, `--rose` …).
Music: built-in soft bell/tanpura ambient (no file). To use your own: put `public/music.mp3`, set `musicUrl: '/music.mp3'`.
