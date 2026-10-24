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
