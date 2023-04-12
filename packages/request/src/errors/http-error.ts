import { AxiosError } from 'axios';

class HttpError<E> extends AxiosError {
  status: number;

  code: string;

  method: string | undefined;

  url: string | undefined;

  result: E;

  toJSON = () => {
    return {
      status: this.status,
      code: this.code,
      method: this.method,
      url: this.url,
      result: this.result,
    };
  };

  constructor(
    status: number,
    code: string,
    message: string | undefined,
    method: string | undefined,
    url: string | undefined,
    result: E,
  ) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    this.method = method;
    this.url = url;
    this.result = result;
  }
}

export default HttpError;
