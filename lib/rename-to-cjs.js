import fs from 'fs';
import path from 'path';

export default function renamePlugin() {
	return {
		name: 'rename-to-cjs',
		writeBundle(options, bundle) {
			const dir = options.dir;

			Object.keys(bundle).forEach((fileName) => {
				const outputFile = bundle[fileName];

				// Rename .js files to .cjs
				if (outputFile.fileName.endsWith('.js')) {
					const oldPath = path.join(dir, outputFile.fileName);
					const newFileName = outputFile.fileName.replace(/\.js$/, '.cjs');
					const newPath = path.join(dir, newFileName);

					// Rename the file
					fs.renameSync(oldPath, newPath);

					// Read the file content
					let content = fs.readFileSync(newPath, 'utf8');

					// Update require statements
					content = content.replace(/require\((['"])(.*?\.js)\1\)/g, (match, p1, p2) => {
						return `require(${p1}${p2.replace(/\.js$/, '.cjs')}${p1})`;
					});

					// Write the updated content back to the file
					fs.writeFileSync(newPath, content, 'utf8');
				}

				// Rename .js.map files to .cjs.map
				if (outputFile.fileName.endsWith('.js.map')) {
					const oldMapPath = path.join(dir, outputFile.fileName);
					const newMapFileName = outputFile.fileName.replace(/\.js\.map$/, '.cjs.map');
					const newMapPath = path.join(dir, newMapFileName);

					// Rename the source map file
					fs.renameSync(oldMapPath, newMapPath);

					// Read the source map content
					let mapContent = fs.readFileSync(newMapPath, 'utf8');

					// Update the file reference inside the source map
					const map = JSON.parse(mapContent);
					map.file = map.file.replace(/\.js$/, '.cjs');
					mapContent = JSON.stringify(map, null, 2);

					// Write the updated content back to the source map file
					fs.writeFileSync(newMapPath, mapContent, 'utf8');
				}
			});
		},
	};
}
