# Standard Fetch API Based Middleware

Backend server JavaScript frameworks are standardizing around the Fetch API. Each framework provides users with a `context` or `event` object that is passed through `Middleware` (or "handlers") for the user to access during the request.

Inspired by [standard-schema](https://standardschema.dev/), this proposes a standard `Middleware` signature to allow library authors to write one middleware and have it run on any framework that implements the types.

Each `Middleware[]` would be _composed_ with a user defined `compose` function implemented to have the same functionality as [`koa-compose`](https://github.com/koajs/compose). Anything before `await next()` would run before subsequent middleware, anything after runs after.

Open to suggestions or contributions. `src/example/app.ts` contains an example `App` class that implements the types to create a Fetch API based server. Run `bun example` to start the example server.

## Framework context/event examples

- H3: https://h3.dev/guide/api/h3event
- Hono: https://hono.dev/docs/api/context
- Elysia: https://elysiajs.com/essential/handler.html#context
- SvelteKit: https://svelte.dev/docs/kit/@sveltejs-kit#RequestEvent
- Remix v3: https://github.com/remix-run/remix/tree/main/packages/fetch-router#middleware-and-route-handlers

Currently, all of these frameworks require different middleware to be authored. It would be great for example to be able to use all of the [Hono middleware](https://github.com/honojs/middleware/tree/main/packages) in other frameworks as well.

## Proposed Types

[See the proposed types here](./src/index.ts)

## Other options

### Remove context

```ts
type Middleware = (req: Request, next?: Next) => Promise<Response | undefined>;
```
