import * as standard from "../middleware.js";
import { Hono, type MiddlewareHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import type { StandardContext } from "standard-context";

const addStandard: MiddlewareHandler = (c, next) => {
	const props: StandardContext.Props<undefined, void> = {
		framework: "hono",
		req: c.req.raw,
		get waitUntil() {
			try {
				return c.executionCtx.waitUntil;
			} catch {
				// hono throws when accessing execution context if it
				// doesn't exist.
			}
		},
		res: {
			get body() {
				return c.res.body;
			},
			set body(b) {
				c.body(b);
			},
			get status() {
				return c.res.status as StatusCode;
			},
			set status(s) {
				c.status(s);
			},
			headers: c.res.headers,
		},
	};

	c["~standard"] = props;

	return next();
};

const app = new Hono();

app.use(addStandard, standard.logger, standard.addFrameworkHeader);

app.get("/", addStandard, (c) => {
	console.log(c.res.headers.get("x-framework"));
	return c.text(c.req.path);
});

app.request("/");
