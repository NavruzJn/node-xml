import { createServer } from './app';

import {port} from './config'

async function main() {
  try {
    const server = (await createServer()).listen(port);
    console.log(`Server listening on ${server.address().port}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

if (!module.parent) {
  main();
}
