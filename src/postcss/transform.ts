import postcss, { Plugin, Result } from 'postcss';
import * as syntax from 'postcss-less';

import { readFile, existsSync } from 'fs-extra';
import { ReplaceAntdVariableRules } from '../typings';

interface PluginOptions
  extends Pick<ReplaceAntdVariableRules, 'atRules' | 'resolveRoot' | 'formatResult' | 'decls'> {
  //
}

const transformPlugin = ({ resolveRoot, atRules, decls }: PluginOptions): Plugin => {
  return {
    postcssPlugin: 'transformAntdToCssVariablePlugin',
    Root(root) {
      resolveRoot?.(root);
    },
    async AtRule(atRule, helper) {
      if (atRules) {
        Promise.all(atRules.map((fn) => fn(atRule, helper)));
      }
    },
    Declaration(decl, helper) {
      if (decls) {
        Promise.all(decls.map((fn) => fn(decl, helper)));
      }
    },
  };
};

export const transformAntdToCssVariable = async (filePath: string, options: PluginOptions) => {
  if (!existsSync(filePath)) {
    throw new Error(`[transformAntdToCssVariable] ${filePath} 文件不存在`);
  }

  const fileContent = (await readFile(filePath)).toString('utf-8');

  return postcss([transformPlugin(options)])
    .process(fileContent, { syntax, from: filePath })
    .then((result): Result => options.formatResult?.(result) ?? result)
    .catch((e) => console.log('postcss error', e));
};
