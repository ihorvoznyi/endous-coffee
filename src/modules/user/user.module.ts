import { Module } from '@nestjs/common';
import { USER_ENDPOINTS, USER_USECASES } from './endpoints';
import { AirtableModule } from 'src/lib/airtable';

@Module({
  imports: [AirtableModule],
  providers: [...USER_USECASES],
  controllers: [...USER_ENDPOINTS],
})
export class UserModule {}
