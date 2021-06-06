import { defineRuleOptions } from '../../util';
import { darkenToCoverDarken, injectionDarkenMixin } from '../../cover-less-color-mixin-func';

export default defineRuleOptions({
  styleFilePath: 'transfer/style/index.less',
  formatResult: injectionDarkenMixin,
  decls: [darkenToCoverDarken],
});
