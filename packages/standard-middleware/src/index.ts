export type StandardRequest<R = {}> = Request & {
	"~standard"?: {
		/**
		 * @param promise to resolve before closing the connection.
		 */
		waitUntil?: (promise: Promise<void>) => {};

		/** JavaScript runtime. */
		runtime?: R;
	};
};

export type StandardContext<T = {}> = T & {
	"~standard": {
		/** Incoming web `Request` */
		req: StandardRequest;

		res: {
			/** Response body */
			body?: BodyInit | null;

			/** Response status */
			status?: number;

			/** Response headers */
			headers?: Headers;
		};
	};
};

/** Dispatch the next middleware in the stack. */
export type StandardNext<T = void> = () => Promise<T>;

export type StandardMiddleware<
	C extends StandardContext = StandardContext,
	N extends StandardNext = StandardNext,
	R = any,
> = (context: C, next: N) => Promise<R>;
