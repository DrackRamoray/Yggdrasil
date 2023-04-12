export const getEndIndex = (path: string, sep: string = '/'): number => {
  const lastIndex = path.lastIndexOf(sep);

  return lastIndex === -1 ? path.length : lastIndex;
};

export const sanitizePath = (
  rawPath: string,
  prefix: string = '.',
  sep: string = '/',
): string => {
  return rawPath
    .slice(prefix.length, getEndIndex(rawPath, sep))
    .replace(/\[(\w+)]/, ($1, $2) => `:${$2}`);
};

export const getFilename = (path: string, prefix: string): string => {
  return path.slice(prefix.length, getEndIndex(path, '.'));
};

export const pathToName = (rawPath: string): string => {
  const path = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;

  return path.replace(/\/\w/g, ($1) => $1.slice(1).toUpperCase());
};
