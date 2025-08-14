import { useQuery } from "@tanstack/react-query";

import { getPortfolio } from './requests';

function useGetPortfolio() {
  const {
    data,
    isFetching,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getPortfolio(),
    queryKey: ['PORTFOLIO'],
    enabled: false,
  });

  return {
    data,
    isFetching,
    isError,
    isLoading,
    refetch,
  }
}

export default useGetPortfolio;