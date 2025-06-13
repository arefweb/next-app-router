import { mockEnabled } from "@/constants/env";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && mockEnabled) {
    const { server } = await import("./mock/node");
    server.listen();
  }
}