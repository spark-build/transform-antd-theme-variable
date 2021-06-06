import { AtRule, Declaration } from '../typings';

export const whenReplace = (
  node: AtRule | Declaration,
  condition: (str: string) => boolean,
  cb: (str: string) => string,
) => {
  const str = (node as AtRule).params || (node as Declaration).value;

  const conditionResult = condition(str);
  if (conditionResult) {
    const format = cb(str);

    if ((node as Declaration).value) {
      (node as Declaration).value = format;
    }

    if ((node as AtRule).params) {
      (node as AtRule).params = format;
    }
  }

  return;
};
