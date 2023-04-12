const Referer =
  '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
const MAX = Referer.length;

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const randomString = (length: number): string => {
  if (length <= 0) {
    throw new Error('length must > 0');
  }

  const res: string[] = [];

  for (let i = 0; i < length; i += 1) {
    res.push(Referer[getRandomInt(MAX)]);
  }

  return res.join('');
};

export const simpleUUID = (length: number = 16): string => {
  if (length < 8) {
    return randomString(length);
  }

  const timeStr = Date.now().toString(36);
  const extra = length > 8 ? randomString(length - 8) : '';

  return `${timeStr}${extra}`;
};

export const simpleUUIDWithSep = (
  length: number,
  n: number,
  sep: string = '-',
): string => {
  const uuid = simpleUUID(length);
  const matched = uuid.match(new RegExp(`.{1,${n}}`, 'g'));

  if (!matched) {
    throw new Error(`uuid = (${uuid}) is invalid.`);
  }

  return matched.join(sep);
};
