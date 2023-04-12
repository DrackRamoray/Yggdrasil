import { MessageTypes } from '../../internals/constants';
import elementPlusMessages from './element-plus/element-plus';

export default {
  [MessageTypes.ElementPlusMessage]: elementPlusMessages,
  [MessageTypes.Message]: {},
};
