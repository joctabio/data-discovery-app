import { useCallback, useEffect, useMemo, useState } from 'react';

export const useFetchData = (url: string, options?: RequestInit) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setLoading(false);

      if (result.success) {
        setData(result.results);
      } else {
        setError(result.message);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return useMemo(
    () => ({ data, loading, error, refetch: fetchData }),
    [data, loading, error, fetchData]
  );
};
