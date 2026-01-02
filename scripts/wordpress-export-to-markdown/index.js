#!/usr/bin/env node

import path from 'path';
import process from 'process';
import { getConfig } from './_wizard.js';
import { parseFilePromise } from './_parser.js';
import { writeFilesPromise } from './_writer.js';

(async () => {
  // parse any command line arguments and run wizard
  const config = await getConfig(process.argv);

  // parse data from XML and do Markdown translations
  const posts = await parseFilePromise(config);

  // write files, downloading images as needed
  await writeFilesPromise(posts, config);

  // happy goodbye
  console.log('\nAll done!');
  console.log('Look for your output files in: ' + path.resolve(config.output));
})().catch(ex => {
  // sad goodbye
  console.log('\nSomething went wrong, execution halted early.');
  console.error(ex);
});
