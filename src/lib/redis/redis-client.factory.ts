import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.di-token';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: REDIS_CLIENT,
  useFactory: () => {
    const redisInstance = new Redis(process.env['REDIS_HOST']);

    redisInstance.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });

    redisInstance.on('connect', () => {
      console.info('Redis connected successfully');
    });

    return redisInstance;
  },
};
