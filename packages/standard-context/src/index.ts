/**
 * A superset of web `Request` optional `~standard` properties.
 *
 * @template R Type of the JavaScript runtime.
 * @template W Return type of `waitUntil`.
 */
export type StandardRequest<R = {}, W = void> = Request & {
	/** Optionally add additional values to the `Request`. */
	"~standard"?: {
		/**
		 * JavaScript runtime specific data.
		 *
		 * @example
		 *
		 * ```ts
		 * type Runtime = { node?: { req: IncomingMessage; res: ServerResponse } };
		 * ```
		 */
		runtime?: R;

		/**
		 * Tell the runtime about an ongoing async operation to `waitUntil`
		 * finished before closing the connection.
		 *
		 * @param promise Promise to resolve before closing.
		 */
		waitUntil?: (promise: Promise<any>) => W;
	};
};

/**
 * Standardized request context with additional `~standard` property.
 *
 * @template C Type of the framework defined `context` or `event`.
 */
export type StandardContext<C = {}> = C & {
	/**
	 * Contains the current `StandardRequest` and the properties to
	 * construct a `Response`.
	 */
	"~standard": {
		/**
		 * Incoming web `Request` with optional `~standard` property.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Request)
		 */
		req: StandardRequest;

		/**
		 * Prepared response modifiers. The inputs to `new Response()`
		 * constructor can be modified or referenced directly.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Response)
		 */
		res: {
			/**
			 * `Response` body.
			 *
			 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#body)
			 */
			body?: BodyInit | null;

			/**
			 * `Response` status code.
			 *
			 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
			 */
			status?: number;

			/**
			 * `Response` headers.
			 *
			 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#headers)
			 */
			headers?: Headers;
		};
	};
};
