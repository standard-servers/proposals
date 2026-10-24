/**
 * Example of end user code.
 */
import { App } from "./app.js";
import * as standard from "./middleware.js";

const app = new App();

app.use(standard.logger, standard.addVendorHeader, async (c) => {
	c.body = c.req.url;
	c.status = 200;
});

export default app;
