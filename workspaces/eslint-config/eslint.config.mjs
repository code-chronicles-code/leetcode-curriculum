import importPlugin from "eslint-plugin-import-x";
import jestPlugin from "eslint-plugin-jest";
import stylisticPluginJs from "@stylistic/eslint-plugin-js";
import stylisticPluginTs from "@stylistic/eslint-plugin-ts";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typeScriptEslintParser from "@typescript-eslint/parser";
import globals from "globals";

// TODO: see if we can get typechecking

const vanilla = {
  files: ["**/*.js", "**/*.jsx"],
  languageOptions: {
    globals: globals.node,
    parser: typeScriptEslintParser,
  },
  plugins: {
    "import-x": importPlugin,
    "@stylistic/js": stylisticPluginJs,
  },
  rules: {
    "@stylistic/js/quotes": [
      "warn",
      // Recommend double quotes, for consistency with Prettier's default.
      "double",
      {
        // Really what we're trying to do is prevent useless backticks.
        allowTemplateLiterals: false,
        // Prettier will take care of string literals.
        ignoreStringLiterals: true,
      },
    ],

    "import-x/exports-last": "off",
    "import-x/first": "error",
    "import-x/newline-after-import": [
      "warn",
      { count: 1, exactCount: true, considerComments: true },
    ],
    "import-x/no-amd": "error",
    "import-x/no-commonjs": [
      "error",
      {
        allowRequire: false,
        allowConditionalRequire: false,
        allowPrimitiveModules: false,
      },
    ],
    "import-x/no-import-module-exports": "error",
    "import-x/no-nodejs-modules": "off",
    "import-x/no-useless-path-segments": "warn",
    "import-x/no-webpack-loader-syntax": "error",
    "import-x/order": ["warn", { groups: ["builtin"] }],
    "import-x/unambiguous": "error",

    "accessor-pairs": [
      "error",
      {
        getWithoutSet: false,
        setWithoutGet: true,
        enforceForClassMembers: true,
      },
    ],
    "array-callback-return": [
      "error",
      { allowImplicit: false, checkForEach: true, allowVoid: false },
    ],
    "arrow-body-style": [
      "warn",
      "as-needed",
      { requireReturnForObjectLiteral: false },
    ],
    "block-scoped-var": "error",
    camelcase: [
      "warn",
      {
        properties: "always",
        ignoreDestructuring: false,
        ignoreImports: false,
        ignoreGlobals: false,
        allow: [],
      },
    ],
    "class-methods-use-this": [
      "warn",
      { exceptMethods: [], enforceForClassFields: true },
    ],
    complexity: ["warn", { max: 20 }],
    "consistent-return": ["error", { treatUndefinedAsUnspecified: false }],
    "consistent-this": ["warn", "self"],
    "constructor-super": "error",
    curly: ["warn", "all"],
    "default-case-last": "error",
    eqeqeq: ["error", "always", { null: "never" }],
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
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_$", varsIgnorePattern: "^_$" },
    ],

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
    "require-await": "error",
    "require-yield": "error",
    "symbol-description": "warn",
    "use-isnan": [
      "error",
      { enforceForSwitchCase: true, enforceForIndexOf: true },
    ],
    "valid-typeof": ["error", { requireStringLiterals: true }],
  },
  settings: {
    "import-x/resolver": {
      node: true,
      typescript: true,
    },
  },
};

const jest = {
  // Default pattern from https://jestjs.io/docs/configuration#testmatch-arraystring
  files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  languageOptions: {
    globals: globals.node,
    parser: typeScriptEslintParser,
  },
  plugins: {
    jest: jestPlugin,
  },
  rules: {
    // TODO: see what other rules from https://www.npmjs.com/package/eslint-plugin-jest are interesting
    "jest/expect-expect": "warn",
    "jest/no-export": "error",
    "jest/prefer-strict-equal": "error",
  },
};

const typescript = {
  ...vanilla,
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    ...vanilla.plugins,
    "@stylistic/ts": stylisticPluginTs,
    "@typescript-eslint": typescriptEslintPlugin,
  },
  rules: {
    ...vanilla.rules,

    // In TypeScript files, use the TypeScript version of the rule.
    "@stylistic/js/quotes": "off",
    "@stylistic/ts/quotes": vanilla.rules["@stylistic/js/quotes"],

    // In TypeScript files, TypeScript itself should take care of this.
    "no-undef": "off",

    // In TypeScript files, use the TypeScript version of the rule.
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": vanilla.rules["no-unused-vars"],

    // In TypeScript files, use the TypeScript version of the rule.
    "no-use-before-define": "off",
    // TODO: configure the additional options
    "@typescript-eslint/no-use-before-define":
      vanilla.rules["no-use-before-define"],
  },
};

export default [vanilla, typescript, jest];
