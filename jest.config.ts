export default {
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
        '@/tests/(.*)': '<rootDir>/tests/$1',
        '@/(.*)': '<rootDir>/src/$1'
    }
} as any;