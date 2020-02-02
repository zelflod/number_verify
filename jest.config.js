module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	reporters: [
		"default",
		["./node_modules/jest-html-reporter", {
			"pageTitle": "Test Report",
			"outputPath": "dist/test.html"
		}]
	],
	"moduleNameMapper": {
		"\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
	}
};
