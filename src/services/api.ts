import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { errorToastHandle } from './error-toast-handle';
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        // на клиенте показываем ошибку ui/error-toast
        errorToastHandle(error.response.data?.error || 'Произошла ошибка');
      }

      throw error;
    }
  );

  return api;
};

export const apiAxios = createAPI();

export const fetcherSwr = (url: string) => {
  console.log(url, ' ==== url fetcherSwr ====')
  return apiAxios.get(url).then((res) => res.data)
};
