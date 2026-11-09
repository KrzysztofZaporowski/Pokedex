# PokéBuilder — Pokédex & Team Builder

A responsive React + TypeScript web application for browsing Pokémon via [PokéAPI](https://pokeapi.co/) and building custom 6-Pokémon teams.

🔗 **Live Demo:** [[DEMO](https://pokedex-vert-omega-93.vercel.app/)]

---

## ✨ Features

- **Paginated Pokédex List** — browse Pokémon with smooth pagination powered by TanStack Query (`keepPreviousData`).
- **Debounced Search & URL Filtering** — search Pokémon by name (with a custom `useDebounce` hook) and filter by elemental type synchronized with URL query parameters (`?type=fire&page=2`).
- **Detailed Pokémon View (`/pokemon/:name`)** — inspect official artwork, types, height, weight, abilities, and animated base stat bars.
- **Global Team Builder (`Zustand` + `localStorage`)** — recruit up to 6 unique Pokémon directly from the list or details page, with persistent state across browser reloads.
- **Validated Team Creation Form (`React Hook Form` + `Zod`)** — save named squads with strategy descriptions and full field/squad validation.
- **Complete UX States** — dedicated loading spinners, error retry boundaries, empty filter states, and a custom 404 page.

---

## 🛠️ Tech Stack & Architecture Decisions

| Category                 | Technology                     | Why it was chosen                                                                                                                     |
| :----------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework & Language** | React 19 + TypeScript (Strict) | End-to-end type safety (`verbatimModuleSyntax`, zero `any`) for API payloads and component props.                                     |
| **Server State**         | TanStack Query v5              | Automatic caching (`staleTime: 5 min`), request deduplication, background refetching, and flicker-free pagination.                    |
| **Routing & URL State**  | React Router v7                | Shareable URLs (`?type=fire&page=2`) and preserved browser Back/Forward navigation history via `useSearchParams`.                     |
| **Global Client State**  | Zustand + `persist`            | Lightweight global store for the active 6-Pokémon squad and saved teams, automatically synced with `localStorage`.                    |
| **Form & Validation**    | React Hook Form + Zod          | Declarative schema validation (`teamFormSchema`) with static type inference (`z.infer`) and minimal re-renders.                       |
| **Styling**              | CSS Modules + CSS3 Variables   | Scoped component styles (`*.module.css`), responsive CSS Grid (`auto-fill, minmax`), and design tokens without external UI libraries. |

---

## 📂 Project Structure

```text
src/
  api/            # PokéAPI fetchers, mappers, and TypeScript interfaces
  components/     # Reusable UI components (PokemonCard, SearchBar, Pagination, Loader, ErrorMessage)
  features/team/  # Team Builder store (Zustand), Zod schema, TeamForm, and SavedTeamsList
  hooks/          # Custom hooks (usePokemonList, usePokemonDetails, useDebounce)
  pages/          # Route views (ListPage, DetailsPage, TeamPage, ErrorPage)
  styles/         # Global CSS custom properties (design tokens)
```
