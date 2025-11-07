/**
 * Example of another library's standard middleware code
 */
import type { StandardMiddleware } from "../index.js";

export const standardLogger: StandardMiddleware = async (c, next) => {
	await next();

	console.log(
		c["~standard"].res.status,
		c["~standard"].req.method,
		c["~standard"].req.url,
	);
};
