import { Injectable } from '@nestjs/common';
import { UserDocument } from '../schema/user.schema';
export interface IUserBase {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

@Injectable()
export class UserMapper {
  mapTo(data: UserDocument): IUserBase {
    return {
      id: data._id.toString(),
      name: `${data.name} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      photo: data.profilePhoto,
    };
  }
}
