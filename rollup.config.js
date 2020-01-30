import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';


module.exports = {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
		},
		{
			file: pkg.module,
			format: 'es',
		},
		{
			file: `dist/index.min.js`,
			format: 'iife',
			name: 'NumVer',
			plugins: [terser()]
		}
	],
	plugins: [
		typescript({
			typescript: require('typescript'),
			clean: true
		})
	]
};
