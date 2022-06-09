import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ERoles } from '../../components/decorators/role.decorator';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ERoles, default: ERoles.GUEST_USER })
  role: ERoles;

  @Prop()
  phone: string;

  @Prop({
    default:
      'https://res.cloudinary.com/dtvbkgf9w/image/upload/v1654743915/tonder/857ccbec-cambio-personas-conducta-1160x773_sqnyxy.jpg',
  })
  profilePhoto: string;

  @Prop({ required: true })
  photo: [string];

  @Prop()
  accessToken?: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
