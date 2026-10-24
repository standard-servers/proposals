# AGENTS.md

`standard-context` is a **types-only** proposal (inspired by [standard-schema](https://standardschema.dev)) for a `StandardContext` type that server frameworks (H3, Hono, Elysia, SvelteKit, Remix…) can add to their `context`/`event` object via a `~standard` property, so library authors can write framework-agnostic utilities.

## Layout

- `src/index.ts` — the entire public API (types only, no runtime code):
  - `StandardContext<C, R, W>` — framework context `C` intersected with `{ readonly "~standard": StandardContext.Props<R, W> }`.
  - `StandardContext.Props` — `framework`, `req: Request`, `res: PreparedResponse`, optional `runtime?: R`, optional `waitUntil?`.
  - `StandardContext.PreparedResponse` — mutable `body`, `status`, `headers` used to build the final `Response`.
- `README.md` — rationale and docs. The `<!-- types -->` section is generated from `src/index.ts` by `scripts/readme.ts`; don't edit it by hand.
- `dist/` — build output (`index.mjs` + `index.d.mts`, gitignored, published).

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`).

- `pnpm install`
- `pnpm check` — typecheck (`tsc --noEmit`). Run after every change.
- `pnpm build` — emit `dist/` with [obuild](https://github.com/unjs/obuild) (`build.config.mjs`).
- `pnpm readme` — sync `src/index.ts` into the README `<!-- types -->` section.
- `pnpm format` — syncs README types, then [oxfmt](https://oxc.rs/docs/guide/usage/formatter) (`.oxfmtrc.json`, tabs).

## Guidelines

- This is a spec: keep the surface minimal and **non-breaking for adopting frameworks**. Everything lives under `~standard`; never require changes to a framework's existing context shape.
- Prefer `readonly` for spec properties; only `PreparedResponse` fields are mutable.
- Use only Web-standard types (`Request`, `Headers`, `BodyInit`) — no runtime- or framework-specific imports. Runtime specifics go through the `R` generic.
- Every exported type/property gets a JSDoc comment; document generics with `@template`.
- Group related types in the `StandardContext` namespace (`export declare namespace`) rather than adding top-level exports.
- API changes are breaking for implementers — bump `version` in `package.json` accordingly and update the README.
- Examples live in [`h3js/standard-middleware`](https://github.com/h3js/standard-middleware), not here.
