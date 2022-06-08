import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DTOQueryUser } from '../dto/query-user.dto';
import { UserService } from '../services/user.service';

import { ERoles, Roles } from '../../components/decorators/role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/components/guards/roles.guard';
import { JwtAuthGuard } from 'src/components/guards/auth-jwt.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/')
  async getUsersQuery(@Query() query: DTOQueryUser): Promise<any> {
    return this.userService.getListByQuery(query);
  }

  @Roles(ERoles.GUEST_USER)
  @Get('/:id')
  async signIn(@Param('id') id: string): Promise<any> {
    return this.userService.getById(id);
  }
}
