# AGENTS.md

**Types-only** proposals (inspired by [standard-schema](https://standardschema.dev)) that let library authors write framework-agnostic utilities and middleware for Fetch API based server frameworks (H3, Hono, Elysia, SvelteKit, Remix…).

## Layout

pnpm workspace; each proposal is a published package under `packages/`.

- `packages/standard-context/src/index.ts` — the entire `standard-context` API (types only, no runtime code):
  - `StandardContext<C, R, W>` — framework context `C` intersected with `{ readonly "~standard": StandardContext.Props<R, W> }`.
  - `StandardContext.Props` — `framework`, `req: Request`, assignable `res: PreparedResponse`, optional `runtime?: R`, optional `waitUntil?`.
  - `StandardContext.PreparedResponse` — readonly `body`, `status`, `headers` used to build the final `Response`.
- `packages/standard-middleware/src/index.ts` — `StandardNext` and koa-style `StandardMiddleware`, built on `StandardContext` (depends on `standard-context` via `workspace:^`).
  - `src/example/` — example `App` implementing the types (`pnpm --filter standard-middleware example`, requires Bun) and reusable example middleware.
  - `src/example/framework/` — sketches of H3/Hono/Remix adoption. Excluded from `check`, since those frameworks don't declare `~standard` yet.
- `packages/*/README.md` — rationale and docs. The `<!-- types -->` section is generated from `src/index.ts` by `scripts/readme.ts`; don't edit it by hand.
- `packages/*/dist/` — build output (`index.mjs` + `index.d.mts`, gitignored, published).
- Root `tsconfig.json` is shared by all packages and maps `standard-context` to its source, so no build is needed before `check`.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`). Run from the repo root.

- `pnpm install`
- `pnpm check` — typecheck all packages (`tsc --noEmit`). Run after every change.
- `pnpm build` — emit `dist/` with [obuild](https://github.com/unjs/obuild) (`build.config.mjs`).
- `pnpm readme` — sync each package's `src/index.ts` into its README `<!-- types -->` section.
- `pnpm format` — syncs README types, then [oxfmt](https://oxc.rs/docs/guide/usage/formatter) (`.oxfmtrc.json`, tabs).

## Guidelines

- These are specs: keep the surface minimal and **non-breaking for adopting frameworks**. Everything lives under `~standard`; never require changes to a framework's existing context shape.
- Prefer `readonly` for spec properties; only `Props.res` is assignable. `PreparedResponse` fields are readonly so a standard `Response` (e.g. Hono's `c.res`) satisfies it. Frameworks may optionally provide a mutable object, but portable code replaces `res` as a whole instead of mutating it.
- Use only Web-standard types (`Request`, `Headers`, `BodyInit`) — no runtime- or framework-specific imports. Runtime specifics go through the `R` generic.
- Every exported type/property gets a JSDoc comment; document generics with `@template`.
- Group related types in a namespace (`export declare namespace`) rather than adding top-level exports.
- API changes are breaking for implementers — bump `version` in the package's `package.json` accordingly, update its README, and update dependent packages and examples in the same change.
