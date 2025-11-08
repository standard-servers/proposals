/**
 * This is an example of a server framework library code.
 */

import type { StandardMiddleware, StandardNext } from "../index.js";
import type { StandardContext } from "standard-context";

type Next = StandardNext;

type Middleware = StandardMiddleware<Context, Next, void>;

class Context implements StandardContext {
	req: Request;
	body: BodyInit | null = null;
	status?: number;
	headers = new Headers();
	"~standard": StandardContext["~standard"];

	constructor(req: Request) {
		this.req = req;
		const context = this;

		context["~standard"] = {
			req: context.req,
			res: {
				get body() {
					return context.body;
				},
				set body(body) {
					context.body = body;
				},
				get status() {
					return context.status;
				},
				set status(status) {
					context.status = status;
				},
				headers: context.headers,
			},
		};
	}

	/**
	 * Copied from koa-compose
	 * https://github.com/koajs/compose/blob/master/index.js
	 *
	 * @param middleware Stack of Middleware to compose.
	 * @returns Single composed Middleware
	 */
	static #compose(middleware: Middleware[]): Middleware {
		return async (context: Context, next: Next) => {
			const dispatch = (i: number) => () => {
				const fn = i === middleware.length ? next : middleware[i]!;
				return fn(context, dispatch(i + 1));
			};

			return dispatch(0)();
		};
	}

	/**
	 * Creates the final `Response` after context is modified by the user.
	 *
	 * @param middleware Stack of user middleware to compose and run.
	 */
	async build(middleware: Middleware[]) {
		const composed = Context.#compose(middleware);

		await composed(this, Promise.resolve);

		return new Response(this.body, this);
	}
}

export class App {
	middleware: Middleware[] = [];

	/**
	 * @param middleware Middleware to add to stack.
	 */
	use(...middleware: Middleware[]) {
		this.middleware.push(...middleware);
	}

	fetch = async (req: Request): Promise<Response> => {
		const context = new Context(req);

		return context.build(this.middleware);
	};
}
