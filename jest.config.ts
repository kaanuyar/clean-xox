import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    roots: [
        '<rootDir>/src/', 
        '<rootDir>/tests/'
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/entrypoint/**'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '@/src/(.*)': '<rootDir>/src/$1',
        '@/tests/(.*)': '<rootDir>/tests/$1'
    }
};

export default config;