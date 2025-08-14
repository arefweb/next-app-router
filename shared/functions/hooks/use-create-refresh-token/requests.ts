import http from "@/shared/services/http";

export const createRefreshToken = async () => {
  const url = '/token/refresh';

  return http.post(
    url
  );
}