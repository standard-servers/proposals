/**
 * Example of another library's standard middleware code
 */
import type { StandardMiddleware } from "../index.js";

export const logger: StandardMiddleware = async (c, next) => {
	await next();

	console.log(c["~standard"].res.status ?? 200, c["~standard"].req.method, c["~standard"].req.url);
};

export const addVendorHeader: StandardMiddleware = async (c, next) => {
	c["~standard"].res.headers?.set("x-vendor", c["~standard"].vendor);

	await next();
};
