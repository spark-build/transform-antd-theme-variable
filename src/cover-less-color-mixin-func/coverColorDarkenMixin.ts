/*
+-----------------------------------------------------------------------------------------------------------------------
|
+-----------------------------------------------------------------------------------------------------------------------
| 自定义 less darken
|
| @see https://less.bootcss.com/functions/#color-operation-functions-darken
*/

import type { AtRuleUnionDeclaration, Result } from '../typings';
import { whenReplace } from './util';

export const coverDarkenTemplate = `
.coverDarkenMixin() {
  @functions: ~\`(function() {
    this.coverDarken = function(color, amount) {
      if (String(color).indexOf('var(') === 0) {
        /*
          做这样的转化
          (var(--error-color), 30%) ===> var(--error-color--darken-7)
        */
        return color.replace(')',  '--darken-' + parseInt(amount) + ')')
      }

      return darken(color, amount)
    }
  })()\`;
}
.coverDarkenMixin();

`;

/**
 * 注入 coverColorPaletteMixin 自定义函数
 *
 * @param {IPostcssRoot} root 经过 postcss-less 解析过的定点 ast 节点
 */
export const injectionDarkenMixin = (result: Result) => {
  try {
    // postcss-less 无法解析 @functions 的用法
    // root.prepend(template);
    // 所以直接通过修改通配生成后的字符文件内容进行注入
    result.css = coverDarkenTemplate + result.css;
  } catch (error) {
    console.log('injection darken error ', error);
  }

  return result;
};

// 将使用了 antd 定义的 lighten 的 atRule 的 darken 转为自定义的 coverDarken
// eslint-disable-next-line consistent-return
export const darkenToCoverDarken = (atRule: AtRuleUnionDeclaration) => {
  return whenReplace(
    atRule,
    (str) => !!str && str.indexOf('darken(') !== -1,
    (str) => str.replace(/darken\(/g, 'coverDarken('),
  );
};
