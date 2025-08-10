import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "./requests";

function useGetUserInfo() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getUserInfo(),
    queryKey: ['USER_INFO'],
    enabled: false,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}

export default useGetUserInfo;