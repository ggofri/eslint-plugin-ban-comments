import { Rule } from 'eslint';

interface BanCommentsRuleOptions {
  allowedPatterns?: string[];
  allowedPrefixes?: string[];
  allowEslintDirectives?: boolean;
  allowTypeScriptDirectives?: boolean;
  allowJSDoc?: boolean;
}

declare const plugin: {
  rules: {
    'ban-comments': Rule.RuleModule;
  };
};

export = plugin;