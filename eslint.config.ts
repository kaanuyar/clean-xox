import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        files: ['src/**/*.ts', 'tests/**/*.ts'],
        extends: [...tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-namespace': 'off'
        }
    },
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        ignores: ['**/*.js', 'dist', 'coverage']
    }
);