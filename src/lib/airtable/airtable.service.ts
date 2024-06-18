import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Airtable from 'airtable';
import { AirtableConfig } from 'src/common/constants/airtable.constants';

@Injectable()
export class AirtableService {
  private readonly logger = new Logger(AirtableService.name);
  private readonly base: Airtable.Base;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('AIRTABLE_API_KEY');
    const baseId = this.configService.get<string>('AIRTABLE_BASE_ID');

    if (!apiKey || !baseId) {
      this.logger.error('Airtable API key or Base ID is missing.');
      throw new Error('Airtable API key or Base ID is missing');
    }

    Airtable.configure({ apiKey });
    this.base = Airtable.base(baseId);
  }

  public async getRecords(tableName: AirtableConfig) {
    try {
      const records = await this.base(tableName).select().all();
      return records.map((record) => record.fields);
    } catch (error) {
      this.logger.error('Failed to get records', error.message);
      throw new InternalServerErrorException('Failed to get records from CRM');
    }
  }

  public getRecordById() {
    //
  }

  public createRecord() {
    //
  }

  public updateRecord() {
    //
  }

  public deleteRecord() {
    //
  }
}
