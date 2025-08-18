import { RuleTester } from "eslint";
import rule from "../rules/ban-comments.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

ruleTester.run("ban-comments", rule, {
  valid: [
    {
      code: '#!/usr/bin/env node\nconsole.log("hello");',
      options: [{}],
    },
    {
      code: '#!/bin/bash\nconsole.log("test");',
      options: [{}],
    },
    {
      code: "const x = 1;",
      options: [{}],
    },

    {
      code: "// eslint-disable-next-line\nconst x = 1;",
      options: [{}],
    },
    {
      code: "/* eslint-disable */\nconst x = 1;",
      options: [{}],
    },

    {
      code: "// @ts-ignore\nconst x = 1;",
      options: [{}],
    },
    {
      code: "// @ts-expect-error\nconst x = 1;",
      options: [{}],
    },

    {
      code: "/**\n * This is a JSDoc comment\n */\nfunction test() {}",
      options: [{ allowJSDoc: true }],
    },

    {
      code: "// TODO: fix this\nconst x = 1;",
      options: [{ allowedPatterns: ["^TODO:"] }],
    },

    {
      code: "// HACK: temporary fix\nconst x = 1;",
      options: [{ allowedPrefixes: ["HACK:"] }],
    },

    {
      code: "const x = 1;",
      options: [{ allowShebang: false }],
    },

    {
      code: "#!/usr/bin/env node\n// eslint-disable-next-line\n// @ts-ignore\nconst x = 1;",
      options: [
        {
          allowShebang: true,
          allowEslintDirectives: true,
          allowTypeScriptDirectives: true,
        },
      ],
    },
  ],
  invalid: [
    {
      code: "// This is a regular comment\nconst x = 1;",
      options: [{}],
      errors: [{ messageId: "noComments" }],
      output: "\nconst x = 1;",
    },
    {
      code: "/* Block comment */\nconst x = 1;",
      options: [{}],
      errors: [{ messageId: "noComments" }],
      output: "\nconst x = 1;",
    },

    {
      code: "// Comment 1\n// Comment 2\nconst x = 1;",
      options: [{}],
      errors: [{ messageId: "noComments" }, { messageId: "noComments" }],
      output: "\n\nconst x = 1;",
    },

    {
      code: "#!/usr/bin/env node\nconst x = 1;",
      options: [{ allowShebang: false }],
      errors: [{ messageId: "noComments" }],
      output: "\nconst x = 1;",
    },

    {
      code: "/**\n * This is a JSDoc comment\n */\nfunction test() {}",
      options: [{}],
      errors: [{ messageId: "noComments" }],
      output: "\nfunction test() {}",
    },

    {
      code: "// eslint-disable-next-line\nconst x = 1;",
      options: [{ allowEslintDirectives: false }],
      errors: [{ messageId: "noComments" }],
      output: "\nconst x = 1;",
    },

    {
      code: "// @ts-ignore\nconst x = 1;",
      options: [{ allowTypeScriptDirectives: false }],
      errors: [{ messageId: "noComments" }],
      output: "\nconst x = 1;",
    },

    {
      code: "// FIXME: this needs work\nconst x = 1;",
      options: [{ allowedPatterns: ["^TODO:"] }],
      errors: [{ messageId: "noComments" }],
      output: "\nconst x = 1;",
    },

    {
      code: "// NOTE: important info\nconst x = 1;",
      options: [{ allowedPrefixes: ["HACK:"] }],
      errors: [{ messageId: "noComments" }],
      output: "\nconst x = 1;",
    },

    {
      code: "#!/usr/bin/env node\n// Regular comment\n// eslint-disable-next-line\nconst x = 1;",
      options: [{}],
      errors: [{ messageId: "noComments" }],
      output:
        "#!/usr/bin/env node\n\n// eslint-disable-next-line\nconst x = 1;",
    },
  ],
});

