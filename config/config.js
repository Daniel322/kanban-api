require('dotenv').config({ path: '.env' });

const {
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_NAME: database,
  DB_HOST: host,
  DB_PORT: port,
} = process.env;

const config = {
  username,
  password,
  database,
  host,
  port,
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
