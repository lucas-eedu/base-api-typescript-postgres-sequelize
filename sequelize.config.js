const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
  migrationStorageTableName: 'sequelize_meta',
  seederStorageTableName: 'sequelize_seeders',
  migrationsPath: path.resolve('./src/app/database/migrations'),
  seedersPath: path.resolve('./src/app/database/seeds'),
};
