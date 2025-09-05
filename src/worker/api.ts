import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { sampleTables } from './db';

const api = new Hono<{ Bindings: CloudflareBindings }>().get('/api/ping', async (c) => {
  const db = drizzle(c.env.DB);
  const records = await db.select().from(sampleTables).limit(1).all();

  return c.json({
    message: 'pong',
    record: records[0] || null,
  });
});

export type ApiType = typeof api;

export { api };
