module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['google', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'max-len': [
            'error',
            {
                code: 120
            }
        ],
        'operator-linebreak': [2, 'after', { overrides: { '?': 'ignore', ':': 'ignore' } }],
        'require-jsdoc': 0
    }
};
