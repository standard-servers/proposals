import * as standard from "../middleware.js";
import { H3, type Middleware } from "h3";
import type { StandardContext } from "standard-context";

const addStandard: Middleware = (c, next) => {
	const props: StandardContext.Props<undefined, void> = {
		framework: "h3",
		req: c.req,
		waitUntil: c.waitUntil,
		res: c.res,
	};

	c["~standard"] = props;

	return next();
};

const app = new H3();

app.use(addStandard);
app.use(standard.logger);
app.use(standard.addFrameworkHeader);

app.get("/", (c) => {
	console.log(c.res.headers.get("x-framework"));
	return c.url.pathname;
});

app.request("/");
