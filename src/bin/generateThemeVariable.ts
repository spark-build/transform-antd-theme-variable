#!/usr/bin/env node

import { generateThemeVariable } from '../generateThemeVariable';

const args = process.argv.slice(2);

const primaryColorArg = args.find((arg) => arg.indexOf('--primary-color') === 0);

generateThemeVariable({ primaryColor: primaryColorArg?.split('=')?.[1].trim() }).then(() =>
  console.log('generate theme variable file success'),
);
