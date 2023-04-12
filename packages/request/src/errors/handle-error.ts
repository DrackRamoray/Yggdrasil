import { useTranslate } from '@ygg/locales';
import type HttpError from './http-error';

const Skip = new Set<string>([]);

const goToLogin = () => {
  console.error('Not Implement');
};

const tipNotFound = () => {
  console.error('Not Implement');
};

const tipBadGateway = () => {
  console.error('Not Implement');
};

const reportError = <T = unknown>(error: HttpError<T>) => {
  if (Skip.has(error.code)) {
    return;
  }

  console.error(useTranslate(`errors.codes.${error.code}`) || 'unknown error');
};

const handleError = <T = unknown>(error: HttpError<T>) => {
  switch (error.status) {
    case 401:
      return goToLogin();
    case 404:
      return tipNotFound();
    case 502:
      return tipBadGateway();
    default:
      return reportError(error);
  }
};

export default handleError;
