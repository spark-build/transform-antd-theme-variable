import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import { clamp01 } from '@ctrl/tinycolor/dist/util';
// import { logAllReplaceVariables } from './logAllReplaceVariables';

interface Params {
  primaryColor: string;
}

const lighten = (color: string, amount?: number): string =>
  new TinyColor(color).lighten(amount).toString();

const darken = (color: string, amount?: number): string =>
  new TinyColor(color).darken(amount).toString();

// https://github.com/less/less.js/blob/b37922cfb2932f00d1e8b340f4799ff24a2af0f2/packages/less/src/less/functions/color.js#L318
const fade = (color: string, amount: number = 10): string => {
  const hsl = new TinyColor(color).toHsl();
  hsl.a = amount / 100;
  hsl.a = clamp01(hsl.a);

  return new TinyColor(hsl).toString();
};

export const getThemeVariable = ({ primaryColor }: Params) => {
  if (
    !/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})$/i.test(primaryColor)
    // !Color.fromKeyword(primaryColor)
  ) {
    throw new Error('[generateThemeVariable] primaryColor 不是一个合法的颜色值');
  }

  const primaryColorLightenColors = [20, 35, 50, 70].reduce(
    (prev, value) => ({
      ...prev,
      [value]: lighten(primaryColor, value),
    }),
    {} as Record<string, string>,
  );

  // antd 的 primary 1 ~ 10
  const colors = generate(primaryColor) as string[];

  const variable = {
    '--primary-color': primaryColor,
    '--primary-color-fade': fade(primaryColor, 4),
    '--primary-active-color': primaryColorLightenColors[70],
    '--primary-hover-color': primaryColorLightenColors[50],
    '--primary-color-lighten-20': primaryColorLightenColors[20],
    '--primary-color-lighten-35': primaryColorLightenColors[35],
    '--link-hover-color': colors[4],
    '--link-active-color': colors[6],
    '--table-selected-row-bg--darken-2': darken(primaryColor, 35),
    '--primary-color--lighten-20': lighten(primaryColor, 20),
    '--primary-color--lighten-35': lighten(primaryColor, 35),
    '--primary-color--fade-12': fade(primaryColor, 12),
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
