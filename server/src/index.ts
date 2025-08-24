import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiRouter from '@/api/routes/index.js';
import sequelize from '@/config/database.js';
import '@/api/models/user.model.js';
import { config } from '@/config/index.js';

async function initializeDatabase() {
  try {
    // Sync all defined models to the database
    await sequelize.sync();
    console.log('[database]: Database synchronized successfully.');
  } catch (error) {
    console.error('[database]: Error synchronizing database:', error);
  }
}

const app: Express = express();
const port = 5005;

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', apiRouter);

async function startServer() {
  await initializeDatabase();

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

await startServer();