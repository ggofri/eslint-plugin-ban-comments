module.exports = {
  meta: {
    type: "suggestion",
    docs: { 
      description: "Disallow comments in JavaScript and TypeScript files",
      category: "Stylistic Issues",
      recommended: false
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          allowedPatterns: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Array of regex patterns for comments that should be allowed"
          },
          allowedPrefixes: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Array of prefixes for comments that should be allowed"
          },
          allowEslintDirectives: {
            type: "boolean",
            description: "Allow ESLint directive comments (eslint-disable, etc.)",
            default: true
          },
          allowTypeScriptDirectives: {
            type: "boolean", 
            description: "Allow TypeScript directive comments (@ts-ignore, etc.)",
            default: true
          },
          allowJSDoc: {
            type: "boolean",
            description: "Allow JSDoc comments (/** ... */)",
            default: false
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      noComments: "Comments are not allowed."
    }
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    const options = context.options[0] || {};
    const {
      allowedPatterns = [],
      allowedPrefixes = [],
      allowEslintDirectives = true,
      allowTypeScriptDirectives = true,
      allowJSDoc = false
    } = options;

    const compiledPatterns = allowedPatterns.map(pattern => new RegExp(pattern));

    const defaultPatterns = [];
    if (allowEslintDirectives) {
      defaultPatterns.push(/^\s*eslint/);
    }
    if (allowTypeScriptDirectives) {
      defaultPatterns.push(/^\s*@ts-/);
    }

    function isCommentAllowed(comment) {
      if (allowJSDoc && comment.type === 'Block') {
        const rawComment = sourceCode.getText(comment);
        if (rawComment.startsWith('/**')) {
          return true;
        }
      }

      const commentText = comment.value.trim();

      for (const prefix of allowedPrefixes) {
        if (commentText.startsWith(prefix)) {
          return true;
        }
      }

      for (const pattern of defaultPatterns) {
        if (pattern.test(commentText)) {
          return true;
        }
      }

      for (const pattern of compiledPatterns) {
        if (pattern.test(commentText)) {
          return true;
        }
      }

      return false;
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments();
        comments.forEach((comment) => {
          if (!isCommentAllowed(comment)) {
            context.report({
              node: comment,
              messageId: "noComments",
              fix(fixer) {
                return fixer.remove(comment);
              }
            });
          }
        });
      }
    };
  }
};