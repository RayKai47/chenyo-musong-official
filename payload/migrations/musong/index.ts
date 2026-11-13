import * as migration_20261113_080738_init from './20261113_080738_init';

export const migrations = [
  {
    up: migration_20261113_080738_init.up,
    down: migration_20261113_080738_init.down,
    name: '20261113_080738_init'
  },
];
