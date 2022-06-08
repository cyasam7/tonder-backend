import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userRepository.findByEmail(email);
    const isMatch = bcrypt.compareSync(password, user.password);
    return !user || !isMatch ? null : user;
  }
}
