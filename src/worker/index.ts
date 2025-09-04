import { Hono } from 'hono';

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get('/api/ping', (c) => c.json({ name: 'pong' }));

export default app;
