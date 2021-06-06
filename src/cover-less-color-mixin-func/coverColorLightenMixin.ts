/*
+-----------------------------------------------------------------------------------------------------------------------
|
+-----------------------------------------------------------------------------------------------------------------------
| 自定义 less lighten
|
| @see https://less.bootcss.com/functions/#color-operation-functions-lighten
*/

import type { AtRule, Result } from '../typings';
import { whenReplace } from './util';

export const coverLightenTemplate = `
.coverLightenMixin() {
  @functions: ~\`(function() {
    this.coverLighten = function(color, amount) {
      if (String(color).indexOf('var(') === 0) {
        /*
          做这样的转化
          (var(--error-color), 30%) ===> var(--error-color--lighten-7)
        */
        return color.replace(')',  '--lighten-' + parseInt(amount) + ')')
      }

      return lighten(color, amount)
    }
  })()\`;
}
.coverLightenMixin();

`;

/**
 * 注入 coverColorPaletteMixin 自定义函数
 *
 * @param {IPostcssRoot} root 经过 postcss-less 解析过的定点 ast 节点
 */
export const injectionLightenMixin = (result: Result) => {
  try {
    // postcss-less 无法解析 @functions 的用法
    // root.prepend(template);
    // 所以直接通过修改通配生成后的字符文件内容进行注入
    result.css = coverLightenTemplate + result.css;
  } catch (error) {
    console.log('injection lighten error ', error);
  }

  return result;
};

// 将使用了 antd 定义的 lighten 的 atRule 的 lighten 转为自定义的 coverLighten
// eslint-disable-next-line consistent-return
export const lightenToCoverLighten = (atRule: AtRule) => {
  return whenReplace(
    atRule,
    (str) => !!str && str.indexOf('lighten(') !== -1,
    (str) => str.replace(/lighten\(/g, 'coverLighten('),
  );
};
