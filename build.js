const { readFile, writeFile } = require('fs').promises;
const fsExtra = require('node-fs-extra');
const path = require('path');
const mustache = require('mustache');
const dotenv = require('dotenv');


dotenv.config();

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

const {
  STYLESHEETS = '',
} = process.env;

(async () => {
  const ITEMS = [
    'assets',
    'iframe.html',
    'script.js',
  ];

  ITEMS.forEach((item) => {
    fsExtra.copy(
      path.resolve(SRC_PATH, item),
      path.resolve(DIST_PATH, item),
    );
  });

  const stylesheets = STYLESHEETS.split(',').map(item => ({ item }));

  const template = await readFile(path.resolve(SRC_PATH, 'index.html'), 'utf-8');
  const result = mustache.render(template, { stylesheets });

  await writeFile(path.resolve(DIST_PATH, 'index.html'), result);
})();
