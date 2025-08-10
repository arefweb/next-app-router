import http, {CustomAxiosError, CustomAxiosResult} from "@/shared/services/http";

type Data = { data: string }

async function getAddress(): Promise<CustomAxiosResult<Data>> {
  try {
    return await http.get("/address");
  } catch (e) {
    return e as CustomAxiosError;
  }
}

export default getAddress;