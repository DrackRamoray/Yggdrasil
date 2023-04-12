import type { UploadFileData } from '@ygg/types';
import { isArray } from '../assert';

export const getUploadFormData = (data: UploadFileData): FormData => {
  const formData = new window.FormData();

  const name = data.name || 'file';

  if (data.filename) {
    formData.append(name, data.file, data.filename);
  } else {
    formData.append(name, data.file);
  }

  if (data.fields) {
    Object.entries(data.fields).forEach(([key, value]) => {
      if (isArray(value)) {
        value.forEach((v: any) => {
          formData.append(`${key}[]`, v);
        });
        return;
      }

      formData.append(key, value);
    });
  }

  return formData;
};
