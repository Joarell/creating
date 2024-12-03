import Inspect from 'vite-plugin-inspect';

export default {
	root: 'src',
	build: {
		outDir: 'dist',
	},
	plugins: [
		Inspect()
	],
}
