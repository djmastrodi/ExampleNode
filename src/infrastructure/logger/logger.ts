/* eslint-disable no-new */
import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

export const Logger = () => {
  const winstonLog = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    exitOnError: true,
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });

  if (process.env.LOG_CLOUD_WATCH === 'true') {
    new WinstonCloudWatch({
      logGroupName: 'ExampleNode',
      logStreamName: 'Api',
      awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
      awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
      awsRegion: process.env.CLOUDWATCH_REGION,
      // awsConfig: {
      //   accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
      //   secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
      //   region: process.env.CLOUDWATCH_REGION
      // },
      // formatLog: function (item) {
      //   return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
      // }
    });
  }

  if (process.env.LOG_FILE === 'true') {
    winstonLog.add(
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    );
    winstonLog.add(new winston.transports.File({ filename: 'combined.log' }));
  }

  return {
    error: (msg, object) => {
      winstonLog.log('error', `${msg} ${JSON.stringify(object)}`);
    },
    info: msg=>{//(msg, object) => {
      winstonLog.log('info',  `${msg}`);//${JSON.stringify(object)}`);
    },
    warn: (msg, object) => {
      winstonLog.log('warn',  `${msg} ${JSON.stringify(object)}`);
    },
    verbose: (msg, object) => {
      winstonLog.log('verbose',  `${msg} ${JSON.stringify(object)}`);
    },
    debug: (msg, object) => {
      winstonLog.log('debug',  `${msg} ${JSON.stringify(object)}`);
    },
    silly: (msg, object) => {
      winstonLog.log('silly',  `${msg} ${JSON.stringify(object)}`);
    },
  };
};

export default { Logger };
