import config from './jest.config';

config.testMatch = ['**/*.test.ts'];
config.globalSetup = '<rootDir>/tests/integration/setup-infra.ts';
config.setupFilesAfterEnv = ['<rootDir>/tests/integration/setup-env.ts'];
config.setupFiles = ['dotenv/config'];

export default config;