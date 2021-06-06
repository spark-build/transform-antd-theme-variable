import { AtRule } from '../typings';
import { logAllReplaceVariables } from '../logAllReplaceVariables';
import {
  defineRuleOptions,
  darkenCssVariableName,
  fadeCssVariableName,
  lightenCssVariableName,
  tintCssVariableName,
} from '../util';

const matchVariableName = (vrn: string) => vrn.match(/^var\(--(.*)\)$/)?.[1] ?? vrn;

const whenReplace = (atRule: AtRule, condition: boolean, format: () => string) => {
  if (condition) {
    const v = format();

    atRule.value = v;
    logAllReplaceVariables.add(matchVariableName(atRule.value));
  }
};

export default defineRuleOptions({
  styleFilePath: 'style/themes/default.less',
  atRules: [
    (atRule) => {
      if ((atRule.name === '@primary-color')) {
        logAllReplaceVariables.add('primary-color');
      }

      // 主题色 --- primary-color
      if (atRule.value === '@blue-6') {
        atRule.value = 'var(--primary-color)';
      }
    },
    (atRule) => {
      // antd 的主题色系列
      // 跳过 ===> @primary-6: @primary-color;
      whenReplace(
        atRule,
        /primary-(\d)/.test(atRule.name) && atRule.params !== '@primary-color',
        () => `var(--${atRule.name.replace('@', '')})`,
      );
    },

    /**
      @link-hover-color: color(~`colorPalette('@{link-color}', 5) `);
      @link-active-color: color(~`colorPalette('@{link-color}', 7) `);
     */
    (atRule) => {
      // link 的主题色
      whenReplace(
        atRule,
        /link-(hover|active)-color/.test(atRule.name),
        () => `var(--${atRule.name.replace('@', '')})`,
      );
    },

    // Table
    (atRule) => {
      // primary-1 darken 2%
      whenReplace(atRule, atRule.name === 'table-selected-row-hover-bg', () =>
        darkenCssVariableName('table-selected-row-bg', 2),
      );
    },

    // Slider
    (atRule) => {
      whenReplace(atRule, atRule.name === 'slider-handle-color-focus-shadow', () =>
        fadeCssVariableName('primary-color', 12),
      );
    },
    (atRule) => {
      whenReplace(atRule, atRule.name === 'slider-handle-color-focus', () =>
        tintCssVariableName('primary-color', 20),
      );
    },
    (atRule) => {
      whenReplace(atRule, atRule.name === 'slider-dot-border-color-active', () =>
        tintCssVariableName('primary-color', 50),
      );
    },

    // Picker
    (atRule) => {
      whenReplace(atRule, atRule.name === 'picker-basic-cell-hover-with-range-color', () =>
        lightenCssVariableName('primary-color', 35),
      );
    },
    (atRule) => {
      whenReplace(atRule, atRule.name === 'picker-date-hover-range-border-color', () =>
        lightenCssVariableName('primary-color', 20),
      );
    },
  ],
});
