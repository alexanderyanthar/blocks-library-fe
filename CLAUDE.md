# Blocks Library — Next.js Front-End

## Purpose
A learning sandbox for the headless WordPress + Next.js stack. The goal is to deeply understand the connection — its strengths, weaknesses, and when it's worth using — and to build a foundation for custom Gutenberg blocks (both WP-side and React-side). Not a production site.

The paired WordPress repo runs locally at `http://localhost:10018`. WP content is accessed via WPGraphQL.

## Stack
- **Next.js 16 / React 19** — App Router, server components throughout
- **TypeScript** — strict mode
- **Tailwind CSS v4** — no `tailwind.config.js`; theme tokens live in `app/globals.css` under `@theme`
- **Apollo Client** — server-side only via `getClient()` (no `ApolloProvider`, no client hydration)
- **React Compiler** — enabled in `next.config.ts`

## Environment
```
NEXT_PUBLIC_WP_URL=http://localhost:10018
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:10018/graphql
```
WordPress runs via Local by Flywheel. Start it there before running `npm run dev`.

## Architecture

### Apollo pattern
Every server component that needs data calls `getClient()` from `lib/apollo-client.ts`. This creates a fresh `ApolloClient` per request — correct for RSC. There is no singleton, no client-side Apollo.

### Block rendering
`components/blocks/BlockRenderer.tsx` holds a `blockMap` — a flat `Record<string, ComponentType<BlockProps>>` mapping WPGraphQL `__typename` block names to React components. Any unmapped block falls through to `FallbackBlock` (renders nothing, logs in dev).

Current block map:
- `core/paragraph` → `CoreParagraph`
- `core/heading` → `CoreHeading`
- `core/image` → `CoreImage`
- `core/list` → `CoreList` (uses `innerBlocks` for `CoreListItem` children)

**Important:** WPGraphQL `editorBlocks` returns ALL blocks as a flat list, including nested children. Only add top-level container types to `blockMap` — child-only types (e.g. `CoreListItem`, accordion sub-blocks) are intentionally left out so they render as nothing at the top level via `FallbackBlock`.

### TypeScript types
`types/blocks.ts` defines `Block`, `BlockAttribute`, and `BlockProps`. All block components use `BlockProps`.

## Routing

| URL | File |
|---|---|
| `/` | `app/page.tsx` — WP pages listing |
| `/[slug]` | `app/[slug]/page.tsx` — WP page by URI |
| `/projects` | `app/projects/page.tsx` — Project CPT listing |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` — single Project by SLUG |

No routing conflicts: exact match (`/projects`) takes precedence over `[slug]`; two-segment routes don't overlap with one-segment.

## GraphQL queries

| File | Purpose | Key note |
|---|---|---|
| `graphql/queries/GetPages.ts` | List all WP pages | |
| `graphql/queries/GetPageBySlug.ts` | Single page by URI | Uses `idType: URI` — pages only |
| `graphql/queries/GetProjects.ts` | List all Projects | |
| `graphql/queries/GetProjectBySlug.ts` | Single Project by slug | Uses `idType: SLUG` — CPTs use SLUG not URI |

**WPGraphQL idType gotcha:** Pages use `idType: URI`. Custom post types use `idType: SLUG`. Using SLUG on pages will throw `Value "SLUG" does not exist in "PageIdType" enum`.

## ACF
ACF field group **Page Hero** is attached to WP pages. Fields:
- `heroTitle` (text)
- `heroSubtitle` (text)
- `heroBackgroundColour` (color picker — note British spelling, registered before rename so the graphql field key is `heroBackgroundColour`)

Exposed via WPGraphQL for ACF plugin. Queried in `GetPageBySlug.ts` and rendered by `components/PageHero.tsx`.

## Custom Post Types
**Project** CPT — registered in the WP plugin `blocks-library-projects`. Exposes `projects` (plural) and `project` (singular) in GraphQL. Has `title`, `editor`, `excerpt`, `thumbnail` support.

## Current open problem — core/accordion
WordPress 6.9 added `core/accordion`. WPGraphQL registers its types (CoreAccordion, CoreAccordionItem, CoreAccordionHeading, CoreAccordionPanel) and `innerBlocks` nesting works correctly.

Problem: `CoreAccordionHeading` has no usable text attribute — `level` and `className` are both null. The heading text is only available via `renderedHtml`, which returns WordPress's full button markup HTML including `<span class="wp-block-accordion-heading__toggle-title">`. WordPress's own JS won't run in headless so the button is non-functional.

Three options (not yet decided):
- **A** — Use `renderedHtml` as-is, layer React `useState` on top to intercept button clicks
- **B** — Parse the title text out of `renderedHtml` with regex, build own markup
- **C** — Build a custom accordion Gutenberg block with clean attributes (most educational, recommended path)

## What's not built yet
- Shared layout / navigation component
- Any REST API integration (REST is better for mutations/forms where GraphQL support is thin)
- Custom Gutenberg blocks (the next major milestone after accordion)
- Interactive filtering or any client-side state beyond accordion
