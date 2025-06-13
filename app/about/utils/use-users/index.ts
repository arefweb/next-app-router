import { useQuery } from "@tanstack/react-query";

import { getUsers } from "./requests";

function useUsers() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['USERS'],
    queryFn: () => getUsers(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export default useUsers;