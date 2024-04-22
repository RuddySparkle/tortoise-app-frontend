import { AxiosRequestConfig } from 'axios';

export const requestConfig: AxiosRequestConfig = {
  timeout: 60000,
  baseURL: 'http://35.171.56.239:8080',
};

export const DEFAULT_DEV_TOKEN = 'dev-token';
