# standard-context

Modern server JavaScript frameworks have standardized around the Fetch API. Each framework provides users with a `context` or `event` object that is passed through `Middleware` (or "handlers") for users to access during the request.

Inspired by [`standard-schema`](https://standardschema.dev), this proposes a `StandardContext` type to allow library authors to write utilities (like [H3 Utils](https://h3.dev/utils)) that run on any framework that implements the type.

## Framework context/event examples

- H3: https://h3.dev/guide/api/h3event
- Hono: https://hono.dev/docs/api/context
- Elysia: https://elysiajs.com/essential/handler.html#context
- SvelteKit: https://svelte.dev/docs/kit/@sveltejs-kit#RequestEvent
- Remix v3: https://github.com/remix-run/remix/tree/main/packages/fetch-router#middleware-and-route-handlers

## Proposed Types

[See the proposed types here](./src/index.ts)

## `StandardContext`

Just like `standard-schema`, the type adds an additional `~standard` property to the context to provide library authors standardized way to read values from the `Request` object, and set values to use to build the `Response`.

This allows vendor server framework libraries to adopt the type without any breaking changes.

## `StandardRequest`

`StandardContext.req` is a `StandardRequest`, this is an _optional_ superset of the web `Request` where library authors can add additional information such as the `runtime` or a `waitUntil` method.

## `PreparedResponse`

Each server framework provides a variety of different methods for users to update the final `Response`.

`StandardContext.res` is a `PreparedResponse`, this is an object containing getter and setter methods to modify the final response sent from the server.

## Example

See complete example in [`standard-middleware`](https://github.com/h3js/standard-middleware/tree/main/src/example) repository.
