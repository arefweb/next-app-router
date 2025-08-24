import supertest from 'supertest';
import express from 'express';

import apiRouter from './index.js';

// We create a minimal express app to test our router
const app = express();
app.use('/api/v1', apiRouter);

describe('GET /api/v1/health', () => {
  it('should respond with a 200 status code and a status message', async () => {
    const response = await supertest(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body).toHaveProperty('uptime');
  });
});