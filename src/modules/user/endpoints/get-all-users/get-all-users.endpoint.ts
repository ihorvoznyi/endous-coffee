import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllUsersUseCase } from './get-all-users.usecase';

@Controller('user')
export class GetAllUsersEndpoint {
  constructor(
    @Inject(GetAllUsersUseCase) private handler: GetAllUsersUseCase,
  ) {}

  @Get()
  getAll() {
    return this.handler.execute();
  }
}
