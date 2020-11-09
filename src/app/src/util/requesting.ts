import axios from 'axios';

export const IotApi = axios.create({
  baseURL: 'http://localhost:5000',
});

export const EomApi = axios.create({
  baseURL: 'http://localhost:8080',
});

export const proxyApi = axios.create({
  baseURL: 'http://localhost:8080',
});

export const mockApi = axios.create({
  baseURL: 'http://localhost:4000',
});

export const buildEomUrlParams = (selection: string) => `/${selection}`;

export const buildIotUrlParams = (selection: string) => `/${selection}`;
