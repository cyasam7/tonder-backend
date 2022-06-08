import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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

  /* @Prop({ required: true })
  profilePhoto: string; */

  @Prop({ required: true })
  photo: [string];

  @Prop()
  accessToken?: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
