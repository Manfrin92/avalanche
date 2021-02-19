/* eslint-disable import/prefer-default-export */

import moment from 'moment';
import * as winston from 'winston';
import isJson from './app.util';

export const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(
      info =>
        `${info.level}: [${moment(info.timestamp)
          .utcOffset('-03:00')
          .format('YYYY-MM-DD HH:mm:ss')}]  ${
          isJson(info.message) ? JSON.stringify(info.message) : info.message
        }`,
    ),
  ),

  transports: [
    new winston.transports.File({
      maxFiles: 5,
      maxsize: 5120000,
      filename: 'avalanche/avalanche-api.log',
    }),
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
});
