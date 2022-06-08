import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MatchController } from './controller/match.controller';
import { RequestController } from './controller/request.controller';
import { MatchMapper } from './mapper/match.mapper';
import { RequestMapper } from './mapper/request.mapper';
import { MatchRepository } from './repository/match.repository';
import { RequestRepository } from './repository/request.repository';
import { Match, MatchSchema } from './schema/match';
import { Request, RequestSchema } from './schema/request';
import { MatchService } from './service/match.service';
import { RequestService } from './service/request.service';

@Module({
  controllers: [RequestController, MatchController],
  imports: [
    MongooseModule.forFeature([
      { schema: MatchSchema, name: Match.name },
      { schema: RequestSchema, name: Request.name },
    ]),
    AuthModule,
  ],
  providers: [
    MatchRepository,
    RequestRepository,
    MatchService,
    RequestService,
    MatchMapper,
    RequestMapper,
  ],
})
export class MatchingModule {}
