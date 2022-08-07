const { defaults } = require('jest-config');

module.exports = {
    setupFilesAfterEnv: ['./jest.setup.redis-mock.cjs'],
    testEnvironment: 'jest-environment-node',
    moduleFileExtensions: [...defaults.moduleFileExtensions,'ts', 'tsx', 'js', 'jsx', 'json', 'node', 'cjs'],
    transform: {
        '\\.(js|cjs)$': ['babel-jest', { configFile: './babel-jest.config.cjs' }],
    },
    testMatch: [
        '<rootDir>/**/*.test.js',
        '<rootDir>/**/*.test.jsx',
        '<rootDir>/**/*.test.cjs',
    ],
    "verbose": true
};