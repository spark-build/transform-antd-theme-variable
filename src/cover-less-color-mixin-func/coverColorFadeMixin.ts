/*
+-----------------------------------------------------------------------------------------------------------------------
|
+-----------------------------------------------------------------------------------------------------------------------
| 自定义 less fade
|
| @see https://less.bootcss.com/functions/#color-operation-functions-fade
*/

import type { AtRuleUnionDeclaration, Result } from '../typings';
import { whenReplace } from './util';

export const coverFadeTemplate = `
.coverFadeMixin() {
  @functions: ~\`(function() {
    this.coverFade = function(color, amount) {
      if (String(color).indexOf('var(') === 0) {
        /*
          做这样的转化
          (var(--error-color), 30%) ===> var(--error-color--fade-7)
        */
        return color.replace(')',  '--fade-' + parseInt(amount) + ')')
      }

      return fade(color, amount)
    }
  })()\`;
}
.coverFadeMixin();

`;

/**
 * 注入 coverColorPaletteMixin 自定义函数
 *
 * @param {IPostcssRoot} root 经过 postcss-less 解析过的定点 ast 节点
 */
export const injectionFadeMixin = (result: Result) => {
  try {
    // postcss-less 无法解析 @functions 的用法
    // root.prepend(template);
    // 所以直接通过修改通配生成后的字符文件内容进行注入
    result.css = coverFadeTemplate + result.css;
  } catch (error) {
    console.log('injection fade error ', error);
  }

  return result;
};

// 将使用了 antd 定义的 fade 的 atRule 的 fade 转为自定义的 coverFade
// eslint-disable-next-line consistent-return
export const fadeToCoverFade = (atRule: AtRuleUnionDeclaration) => {
  return whenReplace(
    atRule,
    (str) => !!str && str.indexOf('fade(') !== -1,
    (str) => str.replace(/fade\(/g, 'coverFade('),
  );
};
