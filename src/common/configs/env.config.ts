import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

const config = registerAs('config', () => ({
  env: process.env.NODE_ENV,
  apiUrl: process.env.API_URL,
  frontendUrl: process.env.FRONTEND_URL,
  cookieDomain: process.env.COOKIE_DOMAIN,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisTtl: process.env.REDIS_TTL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessTtl: process.env.JWT_ACCESS_TTL,
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL,
}));

export const EnvConfig: ConfigModuleOptions = {
  envFilePath: '.env',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),
    COOKIE_DOMAIN: Joi.string().required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_ACCESS_TTL: Joi.number().required(),
    JWT_REFRESH_TTL: Joi.number().required(),

    API_URL: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),

    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.string().required(),
  }),
  load: [config],
  isGlobal: true,
};
