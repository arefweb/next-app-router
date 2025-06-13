import http from "@/services/http";

async function getAbout() {
  const resp = await http.get("/address");
  const address = resp.data.data;
  return { address };
}

export default getAbout;