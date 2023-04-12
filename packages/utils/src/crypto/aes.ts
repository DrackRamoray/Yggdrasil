import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const Key = Utf8.parse(YGG_STORAGE_SECRET);
const IV = Utf8.parse(YGG_STORAGE_IV);

export const encrypt = (plain: string): string => {
  const cipher = AES.encrypt(plain, Key, {
    iv: IV,
  });

  return cipher.toString();
};

export const decrypt = (cipher: string): string => {
  const plain = AES.decrypt(cipher, Key, {
    iv: IV,
  });

  return plain.toString(Utf8);
};
