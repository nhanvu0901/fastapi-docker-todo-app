import {useQuery} from '@tanstack/react-query';

const useCustomQuery= () => {
  const useQueryAPI = ({
    api,
    key,
    params,
    enabled,
    options = {},
    onSuccess,
    onError
  }) => {
    const queryKey = params ? [key,params] : null;
    return useQuery({
      queryKey: queryKey,
      queryFn: ({ signal }) =>
        api({
          ...params,
          signal,
        }).then(),
      enabled: enabled ?? Boolean(queryKey),
      onSuccess,
      onError,
      ...options,
    });
  }
  const useQueryWithoutParams = ({ api, key, options }) => {
    return useQuery({
      queryKey: key,
      queryFn: ({ signal }) =>
        api({
          signal,
        }).then(),
      ...options,
      staleTime: 30000,
      keepPreviousData: true,

    });
  };
  return {
    useQueryAPI,
    useQueryWithoutParams,
  };
}

export default useCustomQuery;