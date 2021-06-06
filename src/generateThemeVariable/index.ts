import { join } from 'path';
import { writeFile } from 'fs-extra';

import { getThemeVariable, getThemeVariable2StrByVariables } from './getThemeVariable';

import { run } from '../index';

export const generateThemeVariable = async (opts?: { primaryColor?: string; cwd?: string }) => {
  await run({ isSuccessLog: false, commandParams: { forceGenerateCoverage: true } });

  // console.log(logAllReplaceVariables);

  const variables = getThemeVariable({ primaryColor: opts?.primaryColor ?? '#1890ff' });
  const variablesToStr = getThemeVariable2StrByVariables(variables);

  const fileContent = `export const variables = ${JSON.stringify(variables)
    .replace(/",/g, '",\n  ')
    .replace(/"/g, `'`)
    .replace(/\'\:/g, `': `)
    .replace(/\{/, '{\n  ')
    .replace(/\}/, ',\n}')};

export const variablesToStr =
  '${variablesToStr}';
`;

  return writeFile(join(opts?.cwd ?? process.cwd(), 'antdThemeVariables.js'), fileContent);
};
