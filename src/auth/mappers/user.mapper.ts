import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/user.schema';
export interface IUserBase {
  id: string;
  name: string;
  phone: string;
  email: string;
}

@Injectable()
export class UserMapper {
  mapTo(data: UserDocument): IUserBase {
    return {
      id: data._id,
      name: `${data.name} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
    };
  }
}
