import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' ;

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  injectGlobals: false,
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: './tsconfig.json'
    }]
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  extensionsToTreatAsEsm: ['.ts']
};

export default config;
