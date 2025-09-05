import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sampleTables = sqliteTable('samples', {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
});
