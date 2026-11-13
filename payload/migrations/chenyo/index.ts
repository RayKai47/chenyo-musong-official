import * as migration_20261113_080736_init from './20261113_080736_init';

export const migrations = [
  {
    up: migration_20261113_080736_init.up,
    down: migration_20261113_080736_init.down,
    name: '20261113_080736_init'
  },
];
