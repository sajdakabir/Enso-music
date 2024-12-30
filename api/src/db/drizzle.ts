import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { environment } from '../loaders/environment.loader';
import * as schema from './schema';

const { DATABASE_URL } = environment();

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle(pool, { schema, logger: true });
