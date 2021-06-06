import type { AtRule as PostCssAtRule, Declaration, Result, Root, Helpers } from 'postcss';

export type TNorm = 'es' | 'lib';

export type AtRuleUnionDeclaration = AtRule | Declaration;

export type AtRule = PostCssAtRule & { value?: string }

type AtRuleProcessor = (
  atRule: AtRule,
  helper: Helpers,
) => Promise<void> | void;
type DeclarationProcessor = (decl: Declaration, helper: Helpers) => Promise<void> | void;

export type FormatResult = (result: Result) => Result;

export interface ReplaceAntdVariableRules {
  styleFilePath: string;
  backupStyleFilePath?: string;
  atRules?: AtRuleProcessor[];
  decls?: DeclarationProcessor[];
  resolveRoot?: (root: Root) => void;
  formatResult?: FormatResult;
}

export type CommandParams = {
  revert?: boolean;
  // 强制覆盖
  forceGenerateCoverage?: boolean;
  debug?: boolean;
  // 打印转换结果
  printTransformResult?: boolean;
  // 需要打印哪一个文件
  printTransformResultFileIndex?: string | number;
};

export type * from 'postcss';
