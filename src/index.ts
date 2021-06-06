// @ts-ignore
import glob from 'fast-glob';
import { generateCoverages } from './generateCoverage';
import { join } from 'path';
import { findRules, moduleTypes } from './util';
import { CommandParams } from './typings';
import { runReductions } from './reduction';

const args = process.argv.slice(2);

// 还原修改
const printTransformResult = args.find((arg) => arg.indexOf('--log-replace') === 0);

export type Options = {
  cwd: string;
  antdDir: string;
  joinFullPathByAntdDir: (...v: string[]) => string;
  antdModuleTypes: typeof moduleTypes;
  commandParams: CommandParams;
};

export async function run(
  options = {} as { commandParams?: CommandParams; cwd?: string; isSuccessLog?: boolean },
) {
  const commandParams = {
    revert: args.includes('--revert'),
    // 强制覆盖
    forceGenerateCoverage: args.includes('--force'),
    debug: args.includes('--debug'),
    // 打印转换结果
    printTransformResult: !!printTransformResult,
    // 需要打印哪一个文件
    printTransformResultFileIndex: printTransformResult?.split('=')?.[1].trim(),
    ...(options.commandParams || {}),
  };

  const opts = {
    commandParams,
    cwd: options.cwd ?? process.cwd(),
    antdDir: join(process.cwd(), 'node_modules/antd'),
    joinFullPathByAntdDir: (...paths: string[]) => join(opts.antdDir, ...paths),
    antdModuleTypes: moduleTypes,
  };

  const fileRules = await findRules();

  try {
    if (commandParams.revert) {
      return runReductions(fileRules, opts).then(() => {
        options.isSuccessLog && console.info('还原 antd 样式变量文件成功');
      });
    }

    // 执行修改、覆盖
    return generateCoverages(fileRules, opts).then(() => {
      options.isSuccessLog && console.info('覆盖修改 antd 样式变量文件成功');
    });
  } catch (error) {
    console.error(`[@spark-build/transform-antd-theme-variable]: ${JSON.stringify(error)}`);
  }
}

if (args.includes('--initialRun')) {
  run();
}
