import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../lib/redis/redis.module';
import { UserModule } from './user';
// import { join } from 'path';
// import { configLoader } from './core/utils/config-loader';

// const CONFIG_PATH = join(__dirname, 'config/config.yml');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    UserModule,
  ],
})
export class AppModule {}
