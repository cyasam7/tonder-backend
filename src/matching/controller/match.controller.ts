import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUserBase } from 'src/auth/mappers/user.mapper';
import { IUserMatchedBase } from '../mapper/user-matched.mapper';
import { MatchService } from '../service/match.service';

@Controller('/match')
@ApiTags('Match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('/matches/user/:id')
  async getListUsersById(@Param('id') id: string): Promise<IUserBase[]> {
    return await this.matchService.getListByUser(id);
  }
  @Get('/user/:id')
  async getListMatchesById(
    @Param('id') id: string,
  ): Promise<IUserMatchedBase[]> {
    return await this.matchService.getListMatches(id);
  }
  @Get('/chat/:id')
  async getListChatById(@Param('id') id: string): Promise<IUserMatchedBase[]> {
    return await this.matchService.getListChatByMatch(id);
  }
}
