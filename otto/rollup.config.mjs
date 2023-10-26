// import { rollup } from 'rollup';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
// import OMT from '@surma/rollup-plugin-off-main-thread';

export default {
	input: './app/main.mjs',
	wtach: {
		includes: './**',
		clearScreen: false
	},
	output: [
		{
			file: './app/bundle.mjs',
			format: 'esm'
		},
		{
			file: './app/main.min.mjs',
			format: 'esm',
			plugins: [terser({
				format: {
					quote_style: 3,
				},
				ecma: 2023
			})],
		}
		// {
		// 	input: 'css.js',
		// 	output: {
		// 		file: 'output.js',
		// 		format: 'esm',
		// 		assetFileNames: 'assets/[name]-[hash].css'
		// 	},
		// 	plugins: [css({
		// 		output: 'index.css'
		// 	})]
		// }
	],
	dir: "app",
	assetFileNames: "app/[name]-[hash][extname]"
};
