import fs from "fs";
import path from "path";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Forbidden", { status: 403 });
  }
  const flagPath = path.join(process.cwd(), "restart.flag");
  fs.writeFileSync(flagPath, Date.now().toString());
  return new Response("Restart triggered", { status: 200 });
}