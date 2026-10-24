# proposals

Types-only proposals for framework-agnostic JavaScript servers built on the Fetch API.

Inspired by [`standard-schema`](https://standardschema.dev), the goal is to let library authors write utilities and middleware once and run them on any server framework (H3, Hono, Elysia, SvelteKit, Remix…) that implements the types.

| Package                                                 | Description                                                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`standard-context`](./packages/standard-context)       | `StandardContext` — a `~standard` property on a framework's `context`/`event` exposing request and prepared response. |
| [`standard-middleware`](./packages/standard-middleware) | `StandardMiddleware` and `StandardNext` — koa-style composable middleware built on `StandardContext`.                 |

## Development

```sh
pnpm install
pnpm check   # typecheck all packages
pnpm build   # build all packages
pnpm format  # sync README types, then format
```
