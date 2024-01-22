import API_UTIL from '@/services/ApiUtil';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';

interface IApi {
  response: AxiosResponse | undefined;
  callApi: () => void;
}

export const useApi = (url: string, options: AxiosRequestConfig, callOnInit: boolean = true) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const isDataFetched = useRef(false);

  const callApi = async (urlOverride?: string, optionsOverride?: AxiosRequestConfig) => {
    try {
      const res: AxiosResponse = await API_UTIL(urlOverride || url, optionsOverride || options);
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

  return [response, callApi] as const;
};
