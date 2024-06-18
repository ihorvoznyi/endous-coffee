/** Dependencies **/
import { ModuleMetadata, Type } from '@nestjs/common';

/** Interfaces **/
import type { RedisModuleOptions } from './redis-options.interface';
import type { RedisOptionsFactory } from './redis-options-factory.interface';

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<RedisOptionsFactory>;
  useExisting?: Type<RedisOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
}
