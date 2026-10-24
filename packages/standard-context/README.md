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

<!-- types -->

````ts
/**
 * The Standard Context type.
 *
 * @template C Type of the framework defined `context` or `event`.
 * @template R Type of the JavaScript runtime.
 * @template W Return type of `waitUntil`.
 */
export type StandardContext<C = {}, R = unknown, W = unknown> = C & {
	/** The Standard Context properties. */
	readonly "~standard": StandardContext.Props<R, W>;
};

export declare namespace StandardContext {
	/**
	 * The Standard Context properties interface.
	 *
	 * @template R Type of the JavaScript runtime.
	 * @template W Return type of `waitUntil`.
	 */
	export interface Props<R = unknown, W = unknown> {
		/** The name of the server framework. */
		readonly framework: string;
		/** Incoming web `Request`. */
		readonly req: Request;
		/**
		 * Prepared response.
		 *
		 * Its fields are not guaranteed to be writable. Assign a new object to replace it.
		 */
		res: PreparedResponse;
		/**
		 * JavaScript runtime specific data.
		 *
		 * @example
		 *
		 * ```ts
		 * type Runtime = { node?: { req: IncomingMessage; res: ServerResponse } };
		 * ```
		 */
		readonly runtime?: R;
		/**
		 * Wait until a promise has resolved.
		 *
		 * @param promise Promise to resolve before exit.
		 */
		readonly waitUntil?: (promise: Promise<any>) => W;
	}

	/**
	 * The Prepared Response properties interface.
	 *
	 * Fields are readonly so that a standard `Response` (whose properties are readonly) is a valid value.
	 *
	 * Frameworks may optionally provide a mutable object, but portable code should not rely on it.
	 */
	export interface PreparedResponse {
		/** `Response` body. */
		readonly body?: BodyInit | null;
		/** `Response` status code. */
		readonly status?: number;
		/** `Response` headers. */
		readonly headers?: Headers;
	}
}
````

<!-- /types -->

## `StandardContext`

Just like `standard-schema`, the type adds an additional `~standard` property to the context to provide library authors standardized way to read values from the `Request` object, and set values to use to build the `Response`.

Library authors can also add additional information such as the `runtime` or a `waitUntil` method.

This allows server frameworks to adopt the type without any breaking changes.

## `PreparedResponse`

Each server framework provides a variety of different methods for users to update the final `Response`.

`StandardContext.res` is a `PreparedResponse`, an object describing the final response sent from the server (`body`, `status` and `headers`).

Its fields are readonly, since in some frameworks (like Hono) it is a standard `Response`. Other frameworks may optionally provide a mutable object, but portable code should not rely on it. To change the response, assign a new object to `res` (the `headers` object can still be mutated in place):

```ts
const std = ctx["~standard"];
std.res = { status: 404, body: "Not Found", headers: std.res.headers };
```

## Example

See complete example in [`standard-middleware`](https://github.com/h3js/standard-middleware/tree/main/src/example) repository.
