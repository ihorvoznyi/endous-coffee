import { RedisModuleOptions } from './redis-options.interface';

export interface RedisOptionsFactory {
  createOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
}
