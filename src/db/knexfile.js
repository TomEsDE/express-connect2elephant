// Update with your config settings.
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
console.log('pw', process.env.DB_ELEPHANT_PW);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  elephant: {
    client: 'postgresql',
    connection: `postgres://ssgvnznd:${process.env.DB_ELEPHANT_PW}@balarama.db.elephantsql.com/ssgvnznd`,
    pool: {
      min: 2,
      max: 5,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
