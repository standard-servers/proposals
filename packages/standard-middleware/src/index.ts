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
export type StandardNext<Args extends unknown[] = [], T = unknown> = (
	...args: Args
) => Promise<T>;

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
