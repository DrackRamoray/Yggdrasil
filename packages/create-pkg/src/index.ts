import { exit } from 'node:process';
import { red } from 'kolorist';
import { init } from './utils';

init().catch((e: Error) => {
  console.log(red(`\ncreate package failed: ${e}\n`));
  exit(1);
});
