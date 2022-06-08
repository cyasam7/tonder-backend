import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { DTOQueryUser } from '../dto/query-user.dto';
import { DTOCreateUser, DTOUpdateUser } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: DTOCreateUser): Promise<UserDocument | null> {
    return await this.userModel.create(data);
  }
  async update(id: string, data: DTOUpdateUser): Promise<void> {
    await this.userModel.updateOne({ id }, data);
  }
  async findByPhone(phone: number): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ phone });
    return user ? user : null;
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    return user ? user : null;
  }
  async findById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id);
    return user ? user : null;
  }
  async findOne(query: DTOQueryUser): Promise<UserDocument | null> {
    const user = await this.userModel.findOne(query);
    return user ? user : null;
  }
  async getByQuery(query: DTOQueryUser): Promise<UserDocument[]> {
    return await this.userModel.find(query);
  }
  async listFiltered(ids: string[]): Promise<UserDocument[]> {
    return await this.userModel.find().where('_id').nin(ids);
  }
}
