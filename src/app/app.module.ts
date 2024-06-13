import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_MODULES } from './modules';
import { RedisModule } from './infra/redis/redis.module';
// import { join } from 'path';
// import { configLoader } from './core/utils/config-loader';

// const CONFIG_PATH = join(__dirname, 'config/config.yml');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    ...APP_MODULES,
  ],
})
export class AppModule {}
