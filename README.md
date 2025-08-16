# eslint-plugin-ban-comments

An ESLint plugin that disallows comments in JavaScript and TypeScript files, with configurable exceptions for specific patterns and directives.

## Why Use This Plugin?

This plugin is useful in scenarios where you want to enforce a strict "self-documenting code" approach:

- **Code clarity**: Forces developers to write code that is inherently readable without relying on comments
- **Prevents outdated comments**: Eliminates the risk of comments becoming stale or misleading as code evolves
- **Consistent codebase**: Ensures a uniform approach to code documentation across your project
- **Forces better naming**: Encourages more descriptive variable and function names instead of explanatory comments
- **Minimal codebases**: Useful for libraries or modules where you want to keep the code as clean and minimal as possible

Note: This approach works best for teams that prioritize clean, self-explanatory code. It may not be suitable for all projects, especially those requiring extensive documentation or complex business logic explanations.

## Installation

```bash
npm install eslint-plugin-ban-comments --save-dev
```

Or with other package managers:

```bash
# Using Yarn
yarn add eslint-plugin-ban-comments --dev

# Using pnpm
pnpm add eslint-plugin-ban-comments --save-dev

# Using Bun
bun add eslint-plugin-ban-comments --dev
```

## Usage

Add `ban-comments` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["ban-comments"]
}
```

Then configure the rule under the rules section:

```json
{
  "rules": {
    "ban-comments/ban-comments": "error"
  }
}
```

## Rule Details

This rule disallows comments in your code. By default, it allows ESLint directive comments (like `eslint-disable`) and TypeScript directive comments (like `@ts-ignore`).

Examples of **incorrect** code for this rule:

```js
// This is a regular comment
const x = 1;

/* 
 * This is a block comment
 */
const y = 2;

const z = 3; // Inline comment
```

Examples of **correct** code for this rule (with default options):

```js
// eslint-disable-next-line no-console
console.log('Hello');

/* eslint-disable */
const allowedCode = true;
/* eslint-enable */

// @ts-ignore
const tsCode: any = something;

/**
 * This is a JSDoc comment describing the function
 * @param {string} name - The name parameter
 * @returns {string} A greeting message
 */
function greet(name) {
  return `Hello, ${name}!`;
}
```

## Options

The rule accepts an options object with the following properties:

### `allowedPatterns`

An array of regex patterns for comments that should be allowed.

```json
{
  "ban-comments/ban-comments": ["error", {
    "allowedPatterns": ["^TODO:", "^FIXME:"]
  }]
}
```

With this configuration, these comments would be allowed:

```js
// TODO: Implement this feature
// FIXME: Bug in calculation
```

### `allowedPrefixes`

An array of prefixes for comments that should be allowed.

```json
{
  "ban-comments/ban-comments": ["error", {
    "allowedPrefixes": ["DEBUG:", "NOTE:"]
  }]
}
```

With this configuration, these comments would be allowed:

```js
// DEBUG: This is a debug comment
// NOTE: Important information
```

### `allowEslintDirectives`

Boolean flag to allow ESLint directive comments. Default: `true`.

```json
{
  "ban-comments/ban-comments": ["error", {
    "allowEslintDirectives": false
  }]
}
```

### `allowTypeScriptDirectives`

Boolean flag to allow TypeScript directive comments. Default: `true`.

```json
{
  "ban-comments/ban-comments": ["error", {
    "allowTypeScriptDirectives": false
  }]
}
```

### `allowJSDoc`

Boolean flag to allow JSDoc comments (`/** ... */`). Default: `false`.

```json
{
  "ban-comments/ban-comments": ["error", {
    "allowJSDoc": true
  }]
}
```

With `allowJSDoc: true`, these comments are allowed:

```js
/**
 * Calculate the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum
 */
function add(a, b) {
  return a + b;
}
```

But regular block comments are still disallowed:

```js
/* This is not allowed */
const x = 1;
```

## Complete Example

```json
{
  "plugins": ["ban-comments"],
  "rules": {
    "ban-comments/ban-comments": ["error", {
      "allowedPatterns": ["^TODO:", "^FIXME:", "^NOTE:"],
      "allowedPrefixes": ["DEBUG:", "HACK:"],
      "allowEslintDirectives": true,
      "allowTypeScriptDirectives": true,
      "allowJSDoc": false
    }]
  }
}
```

## Auto-fixing

This rule supports auto-fixing. When run with the `--fix` flag, ESLint will automatically remove disallowed comments from your code.

```bash
eslint --fix your-file.js
```

## Requirements

- ESLint >= 6.0.0
- JavaScript runtime (Node.js >= 10.0.0, Bun, etc.)

## License

MIT © ggofri