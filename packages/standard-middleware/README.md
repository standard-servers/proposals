# standard-middleware

An extension of [`standard-context`](https://github.com/standard-servers/proposals/tree/main/packages/standard-context) outlining `StandardMiddleware` and `StandardNext` types to allow users to make pluggable middleware for any server framework that implements the types.

Each `Middleware[]` would be _composed_ with a user defined `compose` function implemented to have the same functionality as [`koa-compose`](https://github.com/koajs/compose). Anything before `await next()` would run before subsequent middleware, anything after runs after.

For example, it would be great to be able to use all of the [Hono middleware](https://github.com/honojs/middleware/tree/main/packages) in other frameworks as well.

`src/example/app.ts` contains an example `App` class that implements the types to create a Fetch API based server. Run `pnpm example` (requires [Bun](https://bun.sh)) to start the example server.

`src/example/framework/` sketches how H3, Hono and Remix could adopt the types.

## Proposed Types

<!-- types -->

```ts
import type { StandardContext } from "standard-context";

/**
 * The Standard Next type.
 *
 * Any async function that runs the next middleware in the stack.
 *
 * @template Args Type of the optional arguments.
 * @template R Type of the resolved value.
 * @param args Optional arguments passed into `next`.
 * @returns Promise that resolves when the next middleware has executed.
 */
export type StandardNext<Args extends unknown[] = [], T = unknown> = (...args: Args) => Promise<T>;

/**
 * The Standard Middleware type.
 *
 * @template C Type of the context.
 * @template N Type of the `next` function.
 * @template R Type of the resolved value.
 * @param context Context of the current request.
 * @param next `next` function that calls the next middleware.
 * @returns Resolved value.
 */
export type StandardMiddleware<
	C extends StandardContext = StandardContext,
	N extends StandardNext = StandardNext,
	R = void,
> = (context: C, next: N) => Promise<R>;
```

<!-- /types -->

## Other options

### Remove context

```ts
type Middleware = (req: Request, next?: Next) => Promise<Response | undefined>;
```
