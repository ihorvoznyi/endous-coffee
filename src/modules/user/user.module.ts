import { Module } from '@nestjs/common';
import { USER_ENDPOINTS, USER_USECASES } from './endpoints';

@Module({
  imports: [],
  providers: [...USER_USECASES],
  controllers: [...USER_ENDPOINTS],
})
export class UserModule {}
