import { Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.di-token';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor(@Inject(REDIS_CLIENT) redisClient: Redis) {
    this.redisClient = redisClient;
  }

  public async get(key: string) {
    return this.redisClient.get(key);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  public async setex(
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.setex(key, expiry, value);
  }

  public async del(key: string) {
    await this.redisClient.del(key);
  }
}
