const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    '@typescript-eslint/consistent-type-exports:': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/type-annotation-spacing': 0,
    '@typescript-eslint//ban-types': 0,
    'react/no-array-index-key': 0,
    'react/sort-comp': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'react/no-find-dom-node': 0,
    'react/require-default-props': 0,
    'no-confusing-arrow': 0,
    'import/no-named-as-default-member': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
  },
};
