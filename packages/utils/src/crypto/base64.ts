import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

export const encodeBase64 = (text: string): string => {
  return Base64.stringify(Utf8.parse(text));
};

export const decodeBase64 = (text: string): string => {
  return Base64.parse(text).toString(Utf8);
};
