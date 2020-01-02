const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const sourceMaps = require('rollup-plugin-sourcemaps');

const extensions = ['.js', '.ts'];

const babelOptions = {
	extensions,
	exclude: /node_modules/,
	presets: [['@babel/env', {"modules": false}], '@babel/typescript'],
	plugins: [
		'annotate-pure-calls',
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread',
	],
};

function createRollupConfig(name, format, env = 'production') {
	let fileName = `${name}.js`;
	if (format === 'umd' && env === 'production') {
		fileName = `${name}.min.js`;
	}
	
	return {
		output: {
			file: `${format}/${fileName}`,
			format,
			freeze: false,
			esModule: false,
			treeshake: false,
			sourcemap: true,
		},
		plugins: [
			resolve({
				extensions,
				browser:true
			}),
			commonjs(),
			json(),
			babel(babelOptions),
			replace({
				'process.env.NODE_ENV': JSON.stringify(env),
				patterns: [
					{
						test: /eval.*\(moduleName\);/g,
						replace: 'undefined;'
					}
				]
			}),
			sourceMaps(),
			env === 'production' &&
			format === 'umd' &&
			terser({
				sourcemap: true,
				output: { comments: false },
				compress: {
					keep_infinity: true,
					pure_getters: true,
					collapse_vars: false,
				},
				ecma: 5,
				warnings: true,
			}),
		],
		onwarn: function(warning, warn) {},
		external: [],
	};
}

const config = createRollupConfig(
	process.env.BUILD_NAME,
	process.env.BUILD_FORMAT,
	process.env.BUILD_ENV
);

module.exports = config;
