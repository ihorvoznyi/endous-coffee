import { Inject, Injectable } from '@nestjs/common';
import { AirtableService } from 'src/lib/airtable';
import { RedisService } from 'src/lib/redis';

type User = {
  id: number;
  email: string;
};

const data: User[] = [
  { id: 1, email: 'ex@tt.com' },
  { id: 2, email: 'ex2@tt.com' },
];

@Injectable()
export class GetAllUsersUseCase {
  private cacheKey = 'get-all-users:users';

  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    @Inject(AirtableService) private readonly airtableService: AirtableService,
  ) {}

  public async execute() {
    return await this.airtableService.getRecords('TEAMS');
  }

  public async getAll() {
    const cache = await this.redisService.get(this.cacheKey);
    if (cache) {
      return JSON.parse(cache) as User;
    }

    const users = await this.getAsync();
    await this.redisService.setex(this.cacheKey, JSON.stringify(users), 15);

    return users;
  }

  private getAsync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 5000);
    });
  }
}
