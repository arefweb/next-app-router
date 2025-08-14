import { useMutation } from "@tanstack/react-query";

import { createRefreshToken } from "./requests";

function useCreateRefreshToken() {
  const {
    data,
    isError,
    isPending,
    error,
    mutate,
  } = useMutation({
    mutationFn: () => createRefreshToken(),
  });

  return {
    data,
    isError,
    isPending,
    error,
    mutate,
  }
}

export default useCreateRefreshToken;