import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	{
		rules: {
			"no-useless-catch": "off",
			"no-mixed-spaces-and-tabs": "off",
			"no-useless-escape": "off",
			"no-unsafe-optional-chaining": "off",
			"no-prototype-builtins": "off",
		},
	},
];
