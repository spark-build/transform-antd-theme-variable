import { existsSync, copyFile, remove } from 'fs-extra';

import { getBackupFilePath } from './util';

import type { ReplaceAntdVariableRules } from './typings';
import type { Options } from '.';
// 还原
const reduction = async (ruleOption: ReplaceAntdVariableRules, options: Options) => {
  // 获取真实的备份 less 文件路径
  const backupStyleFilePath = getBackupFilePath(
    ruleOption.styleFilePath,
    ruleOption.backupStyleFilePath,
  );

  return Promise.all(
    // antd 打包的模块规范有两种，都要覆盖，避免错误引用导致出现问题
    Object.values(options.antdModuleTypes).map(async (norm) => {
      const realStyleFilePathByNorm = options.joinFullPathByAntdDir(norm, ruleOption.styleFilePath);
      const backupFilePath = options.joinFullPathByAntdDir(norm, backupStyleFilePath);

      if (!existsSync(backupFilePath)) {
        return Promise.resolve();
      }

      // 复制覆盖
      await copyFile(backupFilePath, realStyleFilePathByNorm);

      return remove(backupFilePath);
    }),
  );
};

// 批量还原
export const runReductions = (
  replaceAntdVariableRules: ReplaceAntdVariableRules[],
  options: Options,
) => {
  return Promise.all(replaceAntdVariableRules.map((item) => reduction(item, options)));
};
