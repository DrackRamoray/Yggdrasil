import type { DownloadFileData } from '@ygg/types';
import { clickAndDownload } from '../dom';

const Delay = 1000 * 4;

export const downloadBlob = (data: DownloadFileData, blob: Blob) => {
  const a = document.createElement('a');
  const URL = window.URL || window.webkitURL;
  const blobURL = URL.createObjectURL(blob);
  const canUseSaveLink = 'download' in a;

  if (canUseSaveLink) {
    return clickAndDownload(a, blobURL, data);
  }

  const win = window.open(blobURL, '_blank');

  if (!win) {
    window.location.href = blobURL;
  }

  setTimeout(() => {
    if (blobURL) {
      URL.revokeObjectURL(blobURL);
    }
  }, Delay);
};
