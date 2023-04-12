const getParamsInUrl = (url: string): string[] | null => {
  return url.match(/(\B|\/):(\w+)/g);
};

const getKey = (matched: string): string => {
  return matched.startsWith('/') ? matched.slice(2) : matched.slice(1);
};

const replace = (
  url: string,
  matched: string,
  params: Record<string, unknown>,
): string => {
  return url.replace(matched, `/${params[getKey(matched)]}`);
};

export const getUrl = <R extends Record<string, unknown>>(
  url: string,
  referer: R,
): string => {
  const paramsInUrl = getParamsInUrl(url);

  if (!paramsInUrl) {
    return url;
  }

  let resURL = url;

  paramsInUrl.forEach((matched: string) => {
    resURL = replace(resURL, matched, referer);
  });

  return url;
};

export const getUrlAndParams = <T extends Record<string, unknown>>(
  url: string,
  params: T,
  shouldOmit: boolean = true,
): { url: string; params: Record<string, unknown> } => {
  const paramsInUrl = getParamsInUrl(url);

  if (!paramsInUrl) {
    return {
      url,
      params,
    };
  }

  let resURL = url;
  const keySet = new Set();

  paramsInUrl.forEach((matched: string) => {
    resURL = replace(resURL, matched, params);
    keySet.add(getKey(matched));
  });

  const keys = Object.keys(params);
  const resParams = shouldOmit
    ? keys.reduce((acc, key) => {
        if (keySet.has(key)) {
          return acc;
        }

        return {
          ...acc,
          [key]: params[key],
        };
      }, {})
    : params;

  return {
    url: url.startsWith(':') ? resURL.slice(1) : resURL,
    params: resParams,
  };
};
