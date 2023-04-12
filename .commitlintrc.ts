import getScopes from './scripts/get-scopes';

export default {
  extends: ['@commitlint/config-conventional'],
  utils: {getScopes},
  rules: {
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
    'scope-enum': (ctx: { cwd?: string }) => [2, 'always', getScopes(ctx?.cwd)],
  }
};
