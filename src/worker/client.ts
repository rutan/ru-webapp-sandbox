// @see https://hono.dev/docs/guides/rpc#compile-your-code-before-using-it-recommended

import { hc } from 'hono/client';
import type { api } from './api';

export type Client = ReturnType<typeof hc<typeof api>>;

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args);
