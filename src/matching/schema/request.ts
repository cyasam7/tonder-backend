import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { Document, Types } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema({ versionKey: false, timestamps: true })
export class Request {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument;
  @Prop({ type: Types.ObjectId, ref: User.name })
  userRequesed: UserDocument;
  @Prop({ type: Boolean })
  sent: boolean;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
