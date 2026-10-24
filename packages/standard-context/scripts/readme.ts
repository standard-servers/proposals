// Syncs `src/index.ts` into the `<!-- types -->` section of `README.md`.
import { readFile, writeFile } from "node:fs/promises";

const readmeURL = new URL("../README.md", import.meta.url);
const typesURL = new URL("../src/index.ts", import.meta.url);

const readme = await readFile(readmeURL, "utf8");
const types = await readFile(typesURL, "utf8");

const section = /(<!-- types -->)[\s\S]*?(<!-- \/types -->)/;
if (!section.test(readme)) {
	throw new Error("Missing `<!-- types -->` ... `<!-- /types -->` section in README.md");
}

// Fence must be longer than any backtick run inside (e.g. JSDoc examples)
const longestRun = Math.max(...(types.match(/`+/g) ?? [""]).map((run) => run.length));
const fence = "`".repeat(Math.max(3, longestRun + 1));

const updated = readme.replace(
	section,
	(_, start: string, end: string) => `${start}\n\n${fence}ts\n${types.trim()}\n${fence}\n\n${end}`,
);

if (updated !== readme) {
	await writeFile(readmeURL, updated);
	console.log("Updated README.md types section");
}
