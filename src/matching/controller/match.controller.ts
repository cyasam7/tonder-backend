import { Controller, Get, Param } from '@nestjs/common';
import { IUserBase } from 'src/auth/mappers/user.mapper';
import { MatchService } from '../service/match.service';

@Controller('/match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('/matches/user/:id')
  async getListMatchesById(@Param('id') id: string): Promise<IUserBase[]> {
    return await this.matchService.getListByUser(id);
  }
}
