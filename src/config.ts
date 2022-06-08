import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export enum EEnv {
  PRODUCTION = 'prod',
  DEVELOPMENT = 'dev',
}

export interface IEnvConfig {
  PORT: number;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  MONGO_HOST: string;
  MONGO_DB_NAME: string;
  SECRET_WORD: string;
  EXPIRATION_TIME: string;
}

export const joiSchemaEnv = Joi.object<IEnvConfig>({
  PORT: Joi.number().min(3000).max(5000).required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  SECRET_WORD: Joi.string().required(),
  EXPIRATION_TIME: Joi.string().required(),
});

export const config = registerAs('config', () => {
  return {
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    PORT: parseInt(process.env.PORT),
    SECRET_WORD: process.env.SECRET_WORD,
    EXPIRATION_TIME: process.env.EXPIRATION_TIME,
  };
});
