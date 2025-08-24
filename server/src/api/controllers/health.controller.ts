import { Request, Response } from 'express';

export const healthCheckController = (req: Request, res: Response) => {
  const uptime = process.uptime(); // Gets the server's uptime in seconds

  return res.status(200).json({
    status: 'ok',
    uptime: `${Math.floor(uptime)}s`,
  });
};