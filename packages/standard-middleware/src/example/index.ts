/**
 * Example of end user code.
 */
import { App } from "./app.js";
import { standardLogger } from "./middleware.js";

const app = new App();

app.use(standardLogger, async (c, _next) => {
	c.body = c.req.url;
	c.status = 200;
});

export default app;
