// Syncs each package's `src/index.ts` into the `<!-- types -->` section of its `README.md`.
import { readdir, readFile, writeFile } from "node:fs/promises";

const packagesURL = new URL("../packages/", import.meta.url);

for (const name of await readdir(packagesURL)) {
	const readmeURL = new URL(`${name}/README.md`, packagesURL);
	const typesURL = new URL(`${name}/src/index.ts`, packagesURL);

	const readme = await readFile(readmeURL, "utf8");
	const types = await readFile(typesURL, "utf8");

	const section = /(<!-- types -->)[\s\S]*?(<!-- \/types -->)/;
	if (!section.test(readme)) {
		throw new Error(
			`Missing \`<!-- types -->\` ... \`<!-- /types -->\` section in ${name}/README.md`,
		);
	}

	// Fence must be longer than any backtick run inside (e.g. JSDoc examples)
	const longestRun = Math.max(...(types.match(/`+/g) ?? [""]).map((run) => run.length));
	const fence = "`".repeat(Math.max(3, longestRun + 1));

	const updated = readme.replace(
		section,
		(_, start: string, end: string) =>
			`${start}\n\n${fence}ts\n${types.trim()}\n${fence}\n\n${end}`,
	);

	if (updated !== readme) {
		await writeFile(readmeURL, updated);
		console.log(`Updated ${name}/README.md types section`);
	}
}
