import fs from 'fs/promises';
import { pathToFileURL } from 'url';

export const importMetaUrlPlugin = {
	name: 'import-meta-url',
	setup(build) {
		build.onLoad({ filter: /\.js$/ }, async (args) => {
			let contents = await fs.readFile(args.path, 'utf8');

			// Replace import.meta.url with a CommonJS-compatible equivalent

			contents = contents.replace(
				/import\.meta\.url/g,
				'pathToFileURL(__filename).href'
			);

			return {
				contents,
				loader: 'js',
			};
		});
	},
};
