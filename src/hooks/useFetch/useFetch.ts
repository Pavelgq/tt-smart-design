import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

interface FetchInterface {
  isLoading: boolean;
  response: any;
  error: string;
  doFetch: (fetchOptions?: AxiosRequestConfig) => void;
}

const useFetch = (): FetchInterface => {
  const baseUrl = process.env.BASE_URL || "http://localhost:8080/api/v1";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<JSON>();
  const [error, setError] = useState('');
  const [options, setOptions] = useState<AxiosRequestConfig>({});

  const doFetch = useCallback((fetchOptions: AxiosRequestConfig = {}) => {
    setError('');
    setOptions(fetchOptions);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipAfterDestroy = false;
    
    if (!isLoading) {
      return () => false;
    }
    const requestOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(baseUrl + options.url, requestOptions)
      .then((res) => {
        console.log(res);
        if (!skipAfterDestroy) {
          setResponse(res.data);
          setIsLoading(false);
        }
      })
      .catch((resError) => {
        // Todo: What if this error is 4**
        console.log(skipAfterDestroy, resError);
        if (!skipAfterDestroy) {
          console.error(resError || new Error('Серверная ошибка'))
          setError('Сервер не отвечает');
          setIsLoading(false);
        }
      });
    return () => {
      skipAfterDestroy = true;
    };
  }, [isLoading, options]);

  return {
    isLoading,
    response,
    error,
    doFetch,
  };
};

export default useFetch;
