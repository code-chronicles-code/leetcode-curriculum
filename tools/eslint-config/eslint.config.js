const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const typeScriptEslintParser = require("@typescript-eslint/parser");
const globals = require("globals");

// TODO: see if we can get typechecking

const vanilla = {
  files: ["**/*.js", "**/*.jsx"],
  languageOptions: {
    globals: globals.node,
    parser: typeScriptEslintParser,
  },
  rules: {
    "array-callback-return": [
      "error",
      { allowImplicit: false, checkForEach: true, allowVoid: false },
    ],
    "constructor-super": "error",
    "for-direction": "error",
    "getter-return": "error",
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-class-assign": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": ["error", "always"],
    "no-const-assign": "error",
    "no-constant-binary-expression": "error",
    "no-constant-condition": ["error", { checkLoops: "allExceptWhileTrue" }],
    "no-constructor-return": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-empty-character-class": "error",
    "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],
    "no-ex-assign": "error",
    "no-fallthrough": [
      "error",
      {
        allowEmptyCase: true,
        commentPattern: "^intentional fallthrough$",
        reportUnusedFallthroughComment: true,
      },
    ],
    "no-func-assign": "error",
    "no-import-assign": "error",
    "no-inner-declarations": [
      "error",
      "both",
      { blockScopedFunctions: "disallow" },
    ],
    "no-invalid-regexp": ["error", { allowConstructorFlags: [] }],
    "no-irregular-whitespace": [
      "error",
      {
        skipComments: false,
        skipJSXText: false,
        skipRegExps: false,
        skipStrings: false,
        skipTemplates: false,
      },
    ],
    "no-loss-of-precision": "error",
    "no-misleading-character-class": ["error", { allowEscape: false }],
    "no-new-native-nonconstructor": "error",
    "no-obj-calls": "error",
    "no-promise-executor-return": ["error", { allowVoid: false }],
    "no-prototype-builtins": "error",
    "no-self-assign": ["error", { props: true }],
    "no-self-compare": "error",
    "no-setter-return": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-this-before-super": "error",
    "no-undef": ["error", { typeof: true }],
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable": "error",
    "no-unreachable-loop": ["error", { ignore: [] }],
    "no-unsafe-finally": "error",
    "no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],
    "no-unsafe-optional-chaining": [
      "error",
      { disallowArithmeticOperators: true },
    ],
    "no-unused-private-class-members": "error",

    // TODO: explore the options in more detail
    "no-unused-vars": ["error", { argsIgnorePattern: "^_$" }],

    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],

    "no-useless-assignment": "error",
    "no-useless-backreference": "error",
    "require-atomic-updates": "error",
    "use-isnan": [
      "error",
      { enforceForSwitchCase: true, enforceForIndexOf: true },
    ],
    "valid-typeof": ["error", { requireStringLiterals: true }],
  },
};

const typescript = {
  ...vanilla,
  files: ["**/*.ts", "**/*.tsx"],
  rules: {
    ...vanilla.rules,

    // In TypeScript files, use the TypeScript version of the rule.
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": vanilla.rules["no-unused-vars"],

    // In TypeScript files, use the TypeScript version of the rule.
    "no-use-before-define": "off",
    // TODO: configure the additional options
    "@typescript-eslint/no-use-before-define":
      vanilla.rules["no-use-before-define"],
  },
  plugins: {
    ...vanilla.plugins,
    "@typescript-eslint": typescriptEslintPlugin,
  },
};

module.exports = [vanilla, typescript];
