// This file will be run before each test file
import { beforeAll } from 'vitest';
import { config } from '@vue/test-utils';
import { Quasar } from 'quasar';

// Configure Vue Test Utils to use Quasar globally
beforeAll(() => {
  config.global.plugins = [
    [
      Quasar,
      {
        config: {},
        plugins: {},
      },
    ],
  ];
  config.global.stubs = {
    'router-view': true,
    'router-link': true,
  };
});
