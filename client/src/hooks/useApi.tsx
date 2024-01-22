import API_UTIL from '@/services/ApiUtil';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';

interface IApi {
  response: AxiosResponse | undefined;
  callApi: () => void;
}

export const useApi = (url: string, options: AxiosRequestConfig, callOnInit: boolean = true): IApi => {
  const [response, setResponse] = useState<AxiosResponse>();
  const isDataFetched = useRef(false);

  const callApi = async () => {
    try {
      const res: AxiosResponse = await API_UTIL(url, options);
      setResponse(res);
    } catch (error) {}
  };

  useEffect(() => {
    if (callOnInit) {
      if (isDataFetched.current) return;
      isDataFetched.current = true;
      callApi();
    }
  }, []);

  return { response, callApi };
};
