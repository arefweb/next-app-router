import { mockEnabled } from "@/shared/constants/env";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && mockEnabled) {
    const { server } = await import("./shared/mock/node");
    server.listen();
  }
}