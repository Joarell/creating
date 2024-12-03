// import { rollup } from 'rollup';
import terser from '@rollup/plugin-terser';

export default {
	input: './app/main.mjs',
	wtach: {
		includes: './app/**',
		clearScreen: false
	},
	output: [
		{
			file: './app/main.min.mjs',
			format: 'esm',
			assetFileNames: './app/[name]-[hash][extname]',
			preserverModules: true,
			plugins: [terser({
				format: 'cjs',
				maxWorkers: 4,
				keep_classnames: true,
				ecma: 2023
			})],
		},
	],
	dir: "./app/",
	assetFileNames: "./app/[name]-[hash][extname]"
};
