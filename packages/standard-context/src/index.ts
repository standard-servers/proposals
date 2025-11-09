/**
 * The Standard Context type.
 *
 * @template C Type of the vendor defined `context` or `event`.
 */
export type StandardContext<C = {}> = C & {
	/** The Standard Context properties. */
	readonly "~standard": StandardContext.Props;
};

export declare namespace StandardContext {
	/** The Standard Context properties interface. */
	export interface Props {
		/** The vendor name of the server framework library. */
		readonly vendor: string;
		/** Incoming web `Request`. */
		readonly req: StandardRequest;
		/** Prepared response modifiers. */
		readonly res: PreparedResponse;
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

/** The Standard Request interface. */
export interface StandardRequest<R = unknown, W = unknown> extends Request {
	/** The optional Standard Request properties. */
	readonly "~standard"?: StandardRequest.Props<R, W>;
}

export declare namespace StandardRequest {
	/**
	 * The optional Standard Request properties interface.
	 *
	 * @template R Type of the JavaScript runtime.
	 * @template W Return type of `waitUntil`.
	 */
	export interface Props<R = unknown, W = unknown> {
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
}
