/**
 * The Standard Context type.
 *
 * @template C Type of the vendor defined `context` or `event`.
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
		/** The vendor name of the server framework library. */
		readonly vendor: string;
		/** Incoming web `Request`. */
		readonly req: Request;
		/** Prepared response modifiers. */
		readonly res: PreparedResponse;
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

	/** The Prepared Response properties interface. */
	export interface PreparedResponse {
		/** `Response` body. */
		body?: BodyInit | null;
		/** `Response` status code. */
		status?: number;
		/** `Response` headers. */
		headers?: Headers;
	}
}
