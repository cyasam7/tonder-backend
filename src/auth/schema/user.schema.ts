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
      'https://res.cloudinary.com/dtvbkgf9w/image/upload/v1654829463/tonder/Social_Media_Chatting_Online_Blank_Profile_Picture_Head_And_Body_Icon_People_Standing_Icon_Grey_Background_generated_fsjxib.jpg',
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
