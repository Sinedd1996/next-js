import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
// import { processErrorHandle } from './process-error-handle';

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

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // getToken срабатывает на кликете, для запросов на сервере тянем token с куки в getServerSideProps
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        // processErrorHandle(error.response.data.message);
        console.log('SHOW ERROR TOAST')
      }

      throw error;
    }
  );

  return api;
};

export const apiAxios = createAPI();
