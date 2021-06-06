import { generate } from '@ant-design/colors';
// @ts-ignore
import colorFunctions from 'less/lib/less/functions/color';
// @ts-ignore
import Color from 'less/lib/less/tree/color';
// import { logAllReplaceVariables } from './logAllReplaceVariables';

interface Params {
  primaryColor: string;
}

export const getThemeVariable = ({ primaryColor }: Params) => {
  if (
    !/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})$/i.test(primaryColor)
    // !Color.fromKeyword(primaryColor)
  ) {
    throw new Error('[generateThemeVariable] primaryColor 不是一个合法的颜色值');
  }

  const primaryColorNode = new Color(primaryColor.slice(1), undefined, primaryColor);

  const primaryColorLightenColors = [20, 35, 50, 70].reduce(
    (prev, value) => ({
      ...prev,
      [value]: colorFunctions.lighten(primaryColorNode, { value }).toCSS(),
    }),
    {} as Record<string, string>,
  );

  // antd 的 primary 1 ~ 10
  const colors = generate(primaryColor) as string[];

  const variable = {
    '--primary-color': primaryColor,
    '--primary-color-fade': colorFunctions.fade(primaryColorNode, { value: 4 }).toCSS(),
    '--primary-active-color': primaryColorLightenColors[70],
    '--primary-hover-color': primaryColorLightenColors[50],
    '--primary-color-lighten-20': primaryColorLightenColors[20],
    '--primary-color-lighten-35': primaryColorLightenColors[35],
    '--link-hover-color': colors[4],
    '--link-active-color': colors[6],
    '--table-selected-row-bg--darken-2': colorFunctions
      .darken(primaryColorNode, { value: 35 })
      .toCSS(),
    '--primary-color--lighten-20': colorFunctions.lighten(primaryColorNode, { value: 20 }).toCSS(),
    '--primary-color--lighten-35': colorFunctions.lighten(primaryColorNode, { value: 35 }).toCSS(),
    '--primary-color--fade-12': colorFunctions.fade(primaryColorNode, { value: 12 }).toCSS(),
    // '--primary-color--tint-20': colorFunctions.tint(primaryColor, '20%'),
    // '--primary-color--tint-50': colorFunctions.tint(primaryColor, '50%'),
  } as Record<string, string>;

  colors.forEach((color, index) => {
    variable[`--primary-${index + 1}`] = color;
  });

  return variable;
};

export const getThemeVariable2StrByVariables = (variables: Record<string, string>) => {
  /**
   *
   * { --primary-color: red, --primary-active-color: ..... } ===>
   *
   *  "--primary-color: red; --primary-active-color: ....."
   */
  return Object.keys(variables)
    .map((key) => `${key}: ${variables[key]}`)
    .join('; ');
};

export const getThemeVariable2StrByPrimaryColor = (primaryColor: Params['primaryColor']) => {
  const variables = getThemeVariable({ primaryColor });

  /**
   *
   * { --primary-color: red, --primary-active-color: ..... } ===>
   *
   *  "--primary-color: red; --primary-active-color: ....."
   */
  return getThemeVariable2StrByVariables(variables);
};
