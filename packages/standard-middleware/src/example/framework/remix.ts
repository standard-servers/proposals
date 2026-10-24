import * as standard from "../middleware.js";
import { type Middleware, createRouter } from "@remix-run/fetch-router";
import type { StandardContext } from "standard-context";

const addStandard: Middleware = (c, next) => {
	const props: StandardContext.Props<undefined> = {
		framework: "remix",
		req: c.request,
		res: {
			// this would need to be implemented internally
			// since users cannot set response properties in middleware
		},
	};

	c["~standard"] = props;

	return next();
};

const router = createRouter({
	middleware: [addStandard, standard.logger, standard.addFrameworkHeader],
});

router.get("/", (c) => {
	return new Response(c.url.pathname);
});

router.fetch("http://localhost:3000/");
