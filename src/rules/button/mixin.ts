/* eslint-disable consistent-return */

import { defineRuleOptions } from '../../util';
import {
  injectionCoverColorPaletteMixin,
  colorPaletteToCoverColorPalette,
} from '../../cover-less-color-mixin-func/coverColorPaletteMixin';

export default defineRuleOptions({
  styleFilePath: 'button/style/mixin.less',
  atRules: [colorPaletteToCoverColorPalette],
  formatResult: injectionCoverColorPaletteMixin,
});
