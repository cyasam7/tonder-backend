import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { Match, MatchDocument } from './match';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: Types.ObjectId, required: true, ref: Match.name })
  match: MatchDocument;
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  user: UserDocument;
  @Prop({ trim: true, required: true })
  message: string;

  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
