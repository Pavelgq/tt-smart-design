import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

interface FetchInterface {
  isLoading: boolean;
  response: any;
  error: Error | null;
  doFetch: (fetchOptions?: AxiosRequestConfig) => void;
}

const useFetch = (): FetchInterface => {
  const baseUrl = process.env.BASE_URL || "http://localhost:8080/api/v1";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<JSON>();
  const [error, setError] = useState(null);
  const [options, setOptions] = useState<AxiosRequestConfig>();

  const doFetch = useCallback((fetchOptions: AxiosRequestConfig = {}) => {
    setOptions(fetchOptions);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipAfterDestroy = false;
    if (!isLoading) {
      return;
    }
    const requestOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(baseUrl + options?.url, requestOptions)
      .then((res) => {
        console.log(res);
        if (!skipAfterDestroy) {
          setResponse(res.data);
          setIsLoading(false);
        }
      })
      .catch((resError) => {
        // Todo: What if this error is 4**
        if (!skipAfterDestroy) {
          setError(resError.response.data);
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
