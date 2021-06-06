/* eslint-disable consistent-return */

import { compose, defineRuleOptions } from '../../util';
import {
  injectionCoverColorPaletteMixin,
  colorPaletteToCoverColorPalette,
  fadeToCoverFade,
  injectionFadeMixin,
} from '../../cover-less-color-mixin-func';

export default defineRuleOptions({
  styleFilePath: 'input/style/mixin.less',
  decls: [colorPaletteToCoverColorPalette, fadeToCoverFade],
  formatResult: compose(injectionCoverColorPaletteMixin, injectionFadeMixin),
});
