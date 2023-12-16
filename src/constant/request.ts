import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, {AxiosResponse, AxiosError} from 'axios';

const BASE_URL: string = 'https://dev.profescipta.co.id/so-api';

Axios.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  },
);

export const GetRequest = async (
  url: string,
  config: any = null,
): Promise<any> => {
  return Axios.get(`${BASE_URL}/${url}`, config)
    .then((response: AxiosResponse<any>): any => {
      return response;
    })
    .catch((err: AxiosError) => err);
};

export const PostRequest = async (
  url: string,
  data: any,
  config: any = null,
): Promise<any> => {
  return Axios.post(`${BASE_URL}/${url}`, data, config)
    .then((response: AxiosResponse<any>): any => {
      return response;
    })
    .catch((error: AxiosError): any => {
      return error;
    });
};
