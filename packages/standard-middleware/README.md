# standard-middleware

An extension of [`standard-context`](https://github.com/h3js/standard-context) outlining `StandardMiddleware` and `StandardNext` types to allow users to make pluggable middleware for any server framework that implements the types.

Each `Middleware[]` would be _composed_ with a user defined `compose` function implemented to have the same functionality as [`koa-compose`](https://github.com/koajs/compose). Anything before `await next()` would run before subsequent middleware, anything after runs after.

For example, it would be great to be able to use all of the [Hono middleware](https://github.com/honojs/middleware/tree/main/packages) in other frameworks as well.

`src/example/app.ts` contains an example `App` class that implements the types to create a Fetch API based server. Run `bun example` to start the example server.

## Proposed Types

[See the proposed types here](./src/index.ts)

## Other options

### Remove context

```ts
type Middleware = (req: Request, next?: Next) => Promise<Response | undefined>;
```
