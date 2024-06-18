import { Module } from '@nestjs/common';
import { ZohoCrmService } from './zoho-crm.service';

@Module({
  imports: [],
  providers: [ZohoCrmService],
  exports: [ZohoCrmService],
})
export class ZohoCrmModule {}
