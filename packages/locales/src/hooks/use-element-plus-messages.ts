import type { ElementPlusMessage } from '../languages';
import getMessages from '../internals/get-messages';
import { MessageTypes } from '../internals/constants';

const useElementPlusMessages = () => {
  return getMessages<ElementPlusMessage>(MessageTypes.ElementPlusMessage);
};

export default useElementPlusMessages;
