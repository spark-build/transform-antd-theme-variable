/* eslint-disable consistent-return */

import { defineRuleOptions } from '../../util';
import { lightenToCoverLighten, injectionLightenMixin } from '../../cover-less-color-mixin-func';

export default defineRuleOptions({
  styleFilePath: 'table/style/index.less',
  formatResult: injectionLightenMixin,
  atRules: [lightenToCoverLighten],
});
