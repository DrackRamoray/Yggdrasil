import type { DownloadFileData } from '@ygg/types';
import { click } from './click';

export const clickAndDownload = (
  a: HTMLAnchorElement,
  url: string,
  data: DownloadFileData,
) => {
  a.href = url;
  a.download = data.filename;
  a.target = '_blank';
  click(a);
};

export const download = (url: string, data: DownloadFileData) => {
  const URL = window.URL || window.webkitURL;
  const a = document.createElement('a');
  const canUseSaveLink = 'download' in a;
  const { origin: downloadOrigin } = new URL(url);
  const { origin: siteOrigin } = window.location;

  const canDownloadDirectly = () => {
    return downloadOrigin === siteOrigin && canUseSaveLink;
  };

  const downloadDirectly = () => clickAndDownload(a, url, data);

  return {
    canDownloadDirectly,
    downloadDirectly,
  };
};
