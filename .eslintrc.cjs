module.exports = {
	root: true,
	env: {browser: true, es2020: true},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
		'linebreak-style': ['error', 'unix'],
		'require-await': 'error',
		'no-warning-comments': [1, {terms: ['todo', 'fixme', 'fix'], location: 'start'}],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [1, {argsIgnorePattern: '(^_|^this$)'}],
	},
};
