import { Injectable, ForbiddenException } from '@nestjs/common';
import { DTOCreateUser } from '../dto/create-user.dto';
import { DTOQueryUser } from '../dto/query-user.dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { IUserBase, UserMapper } from '../mappers/user.mapper';
@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userMapper: UserMapper,
  ) {}

  async create(data: DTOCreateUser): Promise<IUserBase> {
    const userData: DTOCreateUser = {
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    };
    const user = await this.userRepository.create(userData);
    return this.userMapper.mapTo(user);
  }

  async getListByQuery(query: DTOQueryUser): Promise<IUserBase[]> {
    const users = await this.userRepository.getByQuery(query);
    if (!users.length)
      throw new ForbiddenException('No existe entidades con ese query');
    return users.map((user) => this.userMapper.mapTo(user));
  }
  async getById(id: string): Promise<IUserBase> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new ForbiddenException('No existe la entidad');
    return this.userMapper.mapTo(user);
  }
  async getByEmail(email: string): Promise<IUserBase> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ForbiddenException('No existe la entidad');
    return this.userMapper.mapTo(user);
  }
  async getOne(query: DTOQueryUser): Promise<IUserBase> {
    const user = await this.userRepository.findOne(query);
    if (!user) throw new ForbiddenException('No existe la entidad');
    return this.userMapper.mapTo(user);
  }
}
