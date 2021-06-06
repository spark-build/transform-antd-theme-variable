// @ts-ignore
import glob from 'fast-glob';

import type { FormatResult, ReplaceAntdVariableRules } from './typings';

export const moduleTypes = {
  esm: 'es',
  lib: 'lib',
} as const;

export const getBackupFilePath = (mainPath: string, backupPath?: string) => {
  if (backupPath) {
    return backupPath;
  }

  // style/themes/default.less ==> style/themes/_default.less
  return mainPath.replace(/\/\w+\.less/, (v) => {
    return v.replace('/', '/_');
  });
};

const colorFunctionNameToCssVariableName =
  (type: 'darken' | 'fade' | 'lighten' | 'tint') => (name: string, percentage: string | number) =>
    `var(--${name}--${type}-${percentage})`;

// 生成 darken、fade 变量名
export const darkenCssVariableName = colorFunctionNameToCssVariableName('darken');
export const fadeCssVariableName = colorFunctionNameToCssVariableName('fade');
export const lightenCssVariableName = colorFunctionNameToCssVariableName('lighten');
export const tintCssVariableName = colorFunctionNameToCssVariableName('tint');

export const defineRuleOptions = (options: ReplaceAntdVariableRules) => options;

export const compose =
  <F extends FormatResult>(...args: F[]) =>
  (params: ReturnType<FormatResult>) =>
    args.reduce((prev, current) => {
      const result = typeof prev === 'function' ? prev(params) : prev;

      return current(result) as any;
    }) as any;

export const findRules = async () => {
  const files = ((await glob('./rules/**/*.{ts,js}', { cwd: __dirname })) as string[]) || [];

  const rules = [] as ReplaceAntdVariableRules[];

  for (let i = 0; i < files.length; i += 1) {
    if (/\.d\.ts$/.test(files[i])) {
      continue;
    }

    rules.push(await import(files[i].replace(/^\./, __dirname)).then((r) => r.default));
  }

  return rules;
};
