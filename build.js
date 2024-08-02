import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  external: ['fsevents'], // Exclude fsevents from the bundle
}).catch(() => process.exit(1));
