import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { join } from 'path';
import * as http from 'http';
import serverConfig from './api/cube/config/server';
import logging from './log/cube.logging';
import { setupSwagger } from './config/config/swagger.config';
import { setupConsole } from './log/console.logging';
import { setupNodemailer } from './config/config/nodemailer.config';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const NAMESPACE = 'TH²';
  // const httpsOptions = {
  //   // local keys
  //   key: fs.readFileSync('./.secrets/key.pem'),
  //   cert: fs.readFileSync('./.secrets/cert.pem'),
  // };
  // const httpsOptions = {
  //   Server keys
  //   key: fs.readFileSync('./.secrets/Lets_Encrypt_metacubic.org.pem'),
  //   cert: fs.readFileSync('./.secrets/Lets_Encrypt_metacubic.org.pem'),
  // };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
    },
    // httpsOptions,
  });

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.NODE_PORT || 3021;

  app.use(cookieParser());
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', './web/assets'));
  app.setBaseViewsDir(join(__dirname, '..', './web'));
  app.setViewEngine('ejs');

  const httpServer = http.createServer();

  // ----| [ CONNECTION ] |----
  setupSwagger(app);
  setupConsole();
  setupNodemailer();
  await app.listen(port);

  httpServer.listen(serverConfig.server.port, () =>
    logging.info(
      NAMESPACE,
      `Server is running ${serverConfig.server.hostname}:${serverConfig.server.port}`,
    ),
  );
}

void bootstrap();
