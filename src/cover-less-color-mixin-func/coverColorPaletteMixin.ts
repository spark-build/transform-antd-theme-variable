import type { AtRuleUnionDeclaration, Result } from '../typings';
import { whenReplace } from './util';

/**
 * @see https://github.com/ant-design/ant-design/blob/master/components/style/color/colorPalette.less
 * @see https://github.com/ant-design/ant-design-colors
 * @see https://zhuanlan.zhihu.com/p/32422584
 *
 * 为什么不直接通过 modifyVars 将 var 变量传入的原因就是因为 antd 会对自定义的颜色变量通过 colorPalette 颜色系统生成算法进行生成
 * 如果直接传入 var，使用了 colorPalette、fade 等 color 处理就会失效
 * 所以使用进行这样的转化，才能使 antd 的主题转为 css var
 * 这里创建一个自定义的 colorPalette 来取代原有的处理
 */
export const coverColorPaletteMixinTemplate = `
.coverColorPaletteMixin() {
  @functions: ~\`(function() {
    this.coverColorPalette = function(color, index) {
      if (color.indexOf('var(') === 0) {
        /*
          如果传入的是 (var(--primary-color), 7) 的时候
          就将生成 var(--primary-7) ---> 对应在 themes/default.less 内设置的变量
        */
        if (color.indexOf('--primary-color') !== -1) {
          return color.replace('-color)',  '-' + index + ')')
        }

        /*
          不然的话，就默认做这样的转化
          (var(--error-color), 7) ===> var(--error-color-7)
        */
        return color.replace(')',  '-' + index + ')')
      }
    }
  })()\`;
}
.coverColorPaletteMixin();

`;

/**
 * 注入 coverColorPaletteMixin 自定义函数
 *
 * @param {IPostcssRoot} root 经过 postcss-less 解析过的定点 ast 节点
 */
export const injectionCoverColorPaletteMixin = (result: Result) => {
  try {
    // postcss-less 无法解析 @functions 的用法
    // root.prepend(coverColorPaletteMixinTemplate);
    // 所以直接通过修改通配生成后的字符文件内容进行注入
    result.css = coverColorPaletteMixinTemplate + result.css;
  } catch (error) {
    console.log('injection error ', error);
  }

  return result;
};

// 将使用了 antd 定义的 colorPalette 的 atRule 的 colorPalette 转为自定义的 coverColorPalette
// eslint-disable-next-line consistent-return
export const colorPaletteToCoverColorPalette = (atRule: AtRuleUnionDeclaration) => {
  return whenReplace(
    atRule,
    (str) => str.indexOf('colorPalette(') !== -1,
    (str) => str.replace(/colorPalette\(/g, 'coverColorPalette('),
  );
};
