import { getBackupFilePath } from './util';
import { transformAntdToCssVariable } from './postcss/transform';
import type { ReplaceAntdVariableRules } from './typings';
import type { Options } from '.';
import { copyFile, existsSync, writeFile } from 'fs-extra';

// 生成覆盖
const generateCoverage = async (params: {
  index: number;
  ruleOption: ReplaceAntdVariableRules;
  options: Options;
}) => {
  const { ruleOption, options, index } = params;
  const { commandParams } = options;

  const { styleFilePath, backupStyleFilePath, ...lastOptions } = ruleOption;

  // 获取真实的备份 less 文件路径
  const realBackupStyleFilePath = getBackupFilePath(styleFilePath, backupStyleFilePath);
  // 拼接完整备份 less 文件路径
  const backupFilePath = options.joinFullPathByAntdDir(
    options.antdModuleTypes.esm,
    realBackupStyleFilePath,
  );

  // 如果备份文件存在，并且不是强制覆盖的话，就跳过
  if (existsSync(backupFilePath) && !commandParams.forceGenerateCoverage) {
    return Promise.resolve();
  }

  // 拼接完整的less 文件路径
  const realStyleFilePath = options.joinFullPathByAntdDir(
    options.antdModuleTypes.esm,
    styleFilePath,
  );

  // 如果有备份，那就读取备份的文件内容
  const readFilePath = existsSync(backupFilePath) ? backupFilePath : realStyleFilePath;

  const transformResult = await transformAntdToCssVariable(readFilePath, lastOptions);

  if (!transformResult) {
    throw new Error('');
  }

  if (
    commandParams.printTransformResultFileIndex &&
    Number(commandParams.printTransformResultFileIndex) === index
  ) {
    console.log(transformResult);
  }

  // 写入内容
  return Promise.all(
    // antd 打包的模块规范有两种，都要覆盖，避免错误引用导致出现问题
    Object.values(options.antdModuleTypes).map(async (norm) => {
      const realStyleFilePathByNorm = options.joinFullPathByAntdDir(norm, styleFilePath);
      const backupFilePathByNorm = options.joinFullPathByAntdDir(norm, realBackupStyleFilePath);

      // 调试模式，不执行文件替换
      if (commandParams.debug) {
        return Promise.resolve();
      }

      if (!(commandParams.forceGenerateCoverage && existsSync(backupFilePathByNorm))) {
        // 先备份
        await copyFile(realStyleFilePathByNorm, backupFilePathByNorm);
      }

      return writeFile(realStyleFilePathByNorm, transformResult.css || transformResult.content || '');
    }),
  );
};

export const generateCoverages = (
  replaceAntdVariableRules: ReplaceAntdVariableRules[],
  options: Options,
) => {
  return Promise.all(
    replaceAntdVariableRules.map((ruleOption, index) =>
      generateCoverage({ options, index, ruleOption }),
    ),
  );
};
