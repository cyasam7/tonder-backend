import { Injectable } from '@nestjs/common';
import { Match, MatchDocument } from '../schema/match';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DTOCreateMatch } from '../dto/match.dto';
@Injectable()
export class MatchRepository {
  constructor(@InjectModel(Match.name) private matchModel: Model<Match>) {}
  async create(data: DTOCreateMatch): Promise<MatchDocument> {
    const match = await this.matchModel.create(data);
    return await match.populate('users');
  }
  async listByUser(id: string): Promise<MatchDocument[]> {
    return await this.matchModel.find({ users: id }).populate('users').exec();
  }
  async getOne(query: any): Promise<MatchDocument> {
    return await this.matchModel.findOne(query).populate('users').exec();
  }
}
