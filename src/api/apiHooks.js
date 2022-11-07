import { useCallback, useEffect, useState } from "react";
import AxiosInstance from "./api";

export const useGet = (url) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [backendErrors, setBackendErrors] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await AxiosInstance.get(url);
        setData(res.data.data);
        setSuccess(res.data.success);
        if (res.data?.errors) {
          setBackendErrors(res.data.errors);
        }
      } catch (err) {
        setError(err);
        if (err?.response?.data?.errors) {
          setBackendErrors(err.response.data.errors);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  return { success, data, backendErrors, error, loading };
};

export const usePost = (url) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [backendErrors, setBackendErrors] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = useCallback(
    async (incomingData) => {
      try {
        setLoading(true);
        const res = await AxiosInstance.post(url, { data: incomingData });
        setData(res.data.data);
        setSuccess(res.data.success);
        if (res.data?.errors) {
          setBackendErrors(res.data.errors);
        }
      } catch (err) {
        setError(err);
        if (err?.response?.data?.errors) {
          setBackendErrors(err.response.data.errors);
        }
      } finally {
        setLoading(false);
      }
      return { success, data, backendErrors, error, loading };
    },
    [url, data, success, backendErrors, error, loading]
  );

  return { postData };
};
