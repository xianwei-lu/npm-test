const path = require('path');
const execSync = require('child_process').execSync;

process.chdir(path.resolve(__dirname, '..'));

const exec = (command, extraEnv) =>
	execSync(command, {
		stdio: 'inherit',
		env: Object.assign({}, process.env, extraEnv),
	});

const build = (src, packageName) => {
	console.log('\nBuilding ES modules...');

	exec(`rollup -c scripts/config.js -i ${src}`, {
		BUILD_NAME: packageName,
		BUILD_FORMAT: 'esm',
	});

	console.log('\nBuilding CommonJS modules...');

	exec(`rollup -c scripts/config.js -i ${src}`, {
		BUILD_NAME: packageName,
		BUILD_FORMAT: 'cjs',
	});
};

[
	{
		src: 'src/index.ts',
		packageName: 'test',
	},
].forEach(task => build(task.src, task.packageName));
