import http, {
  CustomAxiosError,
  CustomAxiosResult,
} from "@/shared/services/http";

type Data = { data: string };

async function getServerInfo(): Promise<CustomAxiosResult<Data, { message?: string }>> {
  try {
    const resp = await http.get<Data>('/server-info', undefined);
    return resp;
  } catch (e) {
    const error = e as CustomAxiosError;
    console.log('getServerInfo hook >> ', {
      status: error.status,
      ok: error.ok,
      message: error.message,
    });
    return error;
  }
}

export default getServerInfo;