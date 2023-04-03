import { Module } from '@nestjs/common';
import { CubeController } from './cube.controller';
import { CubeService } from './cube.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '../../database/database.module';
import { AuthModule } from '../../api/auth/auth.module';
import { UserModule } from '../../api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_SCHEMA: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: [
        '.env',
        'env/.env.server',
        'env/.env.payment',
        'env/.env.social',
        'env/.env.cloud',
      ],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [CubeController],
  providers: [CubeService],
  exports: [CubeService],
})
export class CubeModule {}
