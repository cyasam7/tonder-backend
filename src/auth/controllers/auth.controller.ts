import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DTOQueryRefreshToken } from '../dto/auth.query.dto';
import { DTOCreateUser } from '../dto/create-user.dto';
import { IUserBase } from '../mappers/user.mapper';
import { UserDocument } from '../schema/user.schema';
import { AuthService, ILoginRespose } from '../services/auth.service';
import { IRefreshTokenResponse } from '../types';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(200)
  async logIn(@Req() req: Request): Promise<ILoginRespose> {
    return this.authService.login(req.user as UserDocument);
  }

  @Post('/register')
  @HttpCode(201)
  async signIn(@Body() data: DTOCreateUser): Promise<IUserBase> {
    return this.authService.register(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/whoami')
  async whoAmI(@Req() req: Request): Promise<IUserBase> {
    return this.authService.whoAmI(req.user as UserDocument);
  }

  @Get('/refresh-token')
  async refreshToken(
    @Query() query: DTOQueryRefreshToken,
  ): Promise<IRefreshTokenResponse> {
    return await this.authService.refreshToken(query.refreshToken);
  }
}
