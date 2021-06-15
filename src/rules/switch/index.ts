import { defineRuleOptions } from '../../util';
import { injectionFadeMixin, fadeToCoverFade } from '../../cover-less-color-mixin-func';

export default defineRuleOptions({
  styleFilePath: 'switch/style/index.less',
  formatResult: injectionFadeMixin,
  decls: [fadeToCoverFade],
});
