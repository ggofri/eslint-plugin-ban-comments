import { Rule } from "eslint";

interface BanCommentsRuleOptions {
  allowedPatterns?: string[];

  allowedPrefixes?: string[];

  /** @default true */
  allowEslintDirectives?: boolean;

  /** @default true */
  allowTypeScriptDirectives?: boolean;

  /** @default false */
  allowJSDoc?: boolean;

  /** @default true */
  allowShebang?: boolean;
}

declare const plugin: {
  rules: {
    "ban-comments": Rule.RuleModule<"noComments", [BanCommentsRuleOptions?]>;
  };
};

export = plugin;
