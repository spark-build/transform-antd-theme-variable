import { defineRuleOptions } from '../../util';
import { fadeToCoverFade, injectionFadeMixin } from '../../cover-less-color-mixin-func';

export default defineRuleOptions({
  styleFilePath: 'radio/style/index.less',
  atRules: [fadeToCoverFade],
  formatResult: injectionFadeMixin,
});
