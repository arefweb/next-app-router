import http from "@/shared/services/http";

import {CREATE_REFRESH_ENDPOINT} from "./constants";

export const createRefreshToken = async () => {
  const url = CREATE_REFRESH_ENDPOINT;

  return http.post(
    url,
    undefined,
    { noAuth: true },
  );
}