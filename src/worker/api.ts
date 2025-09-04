import { Hono } from 'hono';

const api = new Hono<{ Bindings: CloudflareBindings }>().get('/api/ping', (c) => {
  return c.json({
    message: 'pong',
  });
});

export type ApiType = typeof api;

export { api };
