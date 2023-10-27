export default {
  workerIdleMemoryLimit: '1024mb',
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '@tests/(.*)': ['<rootDir>/tests/$1'],
    '@src/(.*)': ['<rootDir>/src/$1'],
  },
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[tj]s?(x)'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        compiler: 'ts-patch/compiler',
      },
    ],
  },
};
