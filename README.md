# Loudinsight — User Dashboard (Take-Home)

A customer dashboard built with the Next.js App Router, rendered
server-side from the [DummyJSON Users API](https://dummyjson.com/docs/users).

**Live:** <VERCEL_URL_HERE>

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/dashboard/customers`.
No environment variables required. Node 18+.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 ·
shadcn/ui (Radix, table primitives only) · iconsax-reactjs (the icon set
the Figma template is built on) · Poppins via `next/font`.

No TanStack Query and no state library — the sections below explain why
neither is needed here.

## Data fetching & caching

All data fetching happens in Server Components. There is no client-side
data fetching anywhere in the app.

Next.js 16 does not cache `fetch` by default, so caching is an explicit
opt-in: the single API function (`lib/api.ts`) requests with
`next: { revalidate: 60 }`. Because search, pagination, and sort state
live in the URL, every distinct query string is its own cache entry —
each page/search/sort combination is cached independently for 60 seconds.
The dataset is static demo data, so this is effectively free speed, while
still modeling the freshness decision you'd make against a real API.

I stayed on the standard fetch-caching model rather than enabling the
experimental Cache Components mode — for a reviewed exercise, the
well-documented model is easier to evaluate.

`getUsers()` is the only data entry point: it switches internally between
`/users` and `/users/search` depending on whether a query is present, and
uses the API's `select` parameter so the payload contains only the fields
the UI consumes (which are also the only fields typed in `lib/types.ts`).

## Architecture

**URL as the single source of truth.** `?q=`, `page`, `sortBy`, and
`order` drive the entire screen. Refreshing, sharing a link, or using the
back button reproduces exact table state. The header search and the table
search are two thin views over the same `?q=` param — no shared component
state, they simply read and write the same URL.

**Intentional client boundary.** Client components, exhaustively:

| Component         | Why it's client                                                        |
| ----------------- | ---------------------------------------------------------------------- |
| `DashboardShell`  | Sidebar open/hover/pin — three booleans of UI state (no state library) |
| `SearchInput`     | Debounced input, `useTransition` pending indicator                     |
| `SortSelect`      | Select interaction                                                     |
| `TablePagination` | Button handlers                                                        |
| `TableControls`   | Mobile filter disclosure toggle                                        |
| `error.tsx`       | Error boundaries are inherently client                                 |

Everything else renders on the server. The shell uses the
client-shell/server-children pattern: it's interactive, but `{children}`
are passed through as a slot and stay server-rendered — the interactive
wrapper doesn't pull the data-fetching tree into the client bundle.

**Two independent streaming sections.** The stats strip and the users
table are separate async Server Components with their own Suspense
boundaries. The stats boundary is unkeyed — it mounts once and never
re-suspends. The table boundary is keyed on the serialized query
(`key={JSON.stringify(query)}`): `loading.tsx` does not re-trigger when
only searchParams change, so re-keying the boundary is what forces the
skeleton fallback during search/pagination/sort transitions. Stats stay
stable while the table streams.

**Search behavior.** 350ms debounce; `router.replace` for keystrokes (no
history spam) versus `router.push` for pagination (page changes are real
navigation history); any new query or sort resets to page 1; the input
syncs from the URL during render (the recommended no-effect pattern), so
back/forward reconcile correctly.

## Assumptions & tradeoffs

- **Status column**: the API has no status field. Status is derived
  deterministically (`id % 3`) so it is stable across server renders —
  no hydration mismatch, no flicker.
- **Stats cards**: "Total Customers" is the real API total (208, not the
  Figma's 5,423). "Members", "Active Now", and the trend percentages have
  no API source and are static. Stats are global metrics and deliberately
  do not reflect the current search — query state is communicated by the
  table footer ("Showing data X to Y of Z entries").
- **Avatars** in "Active Now" come from the API's `image` field (DummyJSON
  serves generated identicons rather than photos).
- **Routes**: only the Customers screen is designed, so `/` and
  `/dashboard` redirect to `/dashboard/customers`; other nav items are
  stubbed.
- **"Short by"** label preserved verbatim from the Figma (sic).
- **Page size** is 8 rows per the design; the Figma's "256K entries"
  footer is replaced by real API totals.
- **Sidebar**: rests as an icon rail, expands on hover, with tap-to-pin
  for touch devices; below `lg` it becomes a drawer.
- **Native `<select>`** for sorting — one fewer client dependency for a
  three-option dropdown.
- **Plain `<img>`** for tiny remote avatars — avoids remote-image
  configuration for a 6-image use case (marked with an eslint-disable to
  show it's deliberate).

## With more time

- **Authentication** — the spec waives it, but a real dashboard would sit
  behind auth; middleware-protected routes with a session provider.
- **User detail page** — `/dashboard/customers/[id]` fetching
  `/users/:id` server-side for a fuller profile view per customer.
- **Designed `not-found` fallback** — a styled `not-found.tsx` matching
  the dashboard's visual language instead of the framework default.
  - **Gender/role filters** — Gender/role filters via /users/filter; user detail route; 
  sortable column headers; column visibility;

## AI usage

Built pair-programming style with an AI assistant (architecture
discussion, debugging, and review); all decisions and final integration
are my own.
